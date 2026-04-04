from __future__ import annotations

import logging
from pathlib import Path
from typing import Any

import pandas as pd
import requests

from src.clean import harmonize_monthly
from src.config import PipelineSettings, SERIES_CATALOG, TARGET_SERIES, get_settings
from src.features import build_feature_panel
from src.ingest import (
    fetch_bcra_data,
    fetch_datos_gob_ar_data,
    fetch_fred_data,
    fetch_financial_crime_snapshot,
    fetch_world_bank_data,
    load_table,
    save_table,
)
from src.logging_utils import configure_logging
from src.models import run_all_models
from src.reporting import (
    create_charts,
    publish_public_artifacts,
    render_report,
    update_readme_timestamp,
    write_report,
    write_summary,
)

LOGGER = logging.getLogger(__name__)


def _empty_source_frame() -> pd.DataFrame:
    return pd.DataFrame(columns=["date", "series_id", "source", "value", "frequency", "unit"])


def _ensure_directories(settings: PipelineSettings) -> None:
    for path in (
        settings.raw_dir,
        settings.processed_dir,
        settings.features_dir,
        settings.outputs_dir,
        settings.charts_dir,
        settings.public_dir,
        settings.public_charts_dir,
    ):
        path.mkdir(parents=True, exist_ok=True)


def _persist_feature_panel(panel: pd.DataFrame, destination: Path) -> None:
    save_table(panel.reset_index(), destination)


def _load_source(
    source_name: str,
    fetcher,
    settings: PipelineSettings,
    session: requests.Session,
    preloaded_sources: dict[str, pd.DataFrame] | None = None,
) -> tuple[pd.DataFrame, dict[str, Any]]:
    destination = settings.raw_dir / source_name

    if preloaded_sources and source_name in preloaded_sources:
        frame = preloaded_sources[source_name].copy()
        save_table(frame, destination)
        return frame, {
            "source": source_name,
            "status": "fixture",
            "rows": len(frame),
            "note": "Loaded from test fixture.",
        }

    try:
        frame = fetcher(settings, session=session)
        if source_name == "fred" and frame.empty and not settings.fred_api_key:
            snapshot = load_table(destination)
            if snapshot is not None and not snapshot.empty:
                return snapshot, {
                    "source": source_name,
                    "status": "fallback",
                    "rows": len(snapshot),
                    "note": "Used last saved snapshot because FRED_API_KEY is not configured.",
                }
            return _empty_source_frame(), {
                "source": source_name,
                "status": "skipped",
                "rows": 0,
                "note": "Skipped because FRED_API_KEY is not configured.",
            }

        if frame.empty:
            raise ValueError("Fetcher returned no rows.")

        save_table(frame, destination)
        return frame, {
            "source": source_name,
            "status": "live",
            "rows": len(frame),
            "note": "Fetched from live public API.",
        }
    except Exception as exc:
        snapshot = load_table(destination)
        if snapshot is not None and not snapshot.empty:
            LOGGER.warning("Using fallback snapshot for %s: %s", source_name, exc)
            return snapshot, {
                "source": source_name,
                "status": "fallback",
                "rows": len(snapshot),
                "note": f"Loaded previous snapshot after fetch error: {exc}",
            }

        LOGGER.warning("No data available for %s: %s", source_name, exc)
        return _empty_source_frame(), {
            "source": source_name,
            "status": "failed",
            "rows": 0,
            "note": str(exc),
        }


def _latest_observations(panel: pd.DataFrame) -> dict[str, dict[str, float | str]]:
    observations: dict[str, dict[str, float | str]] = {}

    for column in panel.columns:
        series = panel[column].dropna()
        if series.empty:
            continue
        observations[column] = {
            "date": series.index[-1].strftime("%Y-%m-%d"),
            "value": float(series.iloc[-1]),
        }

    return observations


def _build_summary(
    settings: PipelineSettings,
    model_results: dict[str, dict[str, Any]],
    source_status: list[dict[str, Any]],
    chart_files: list[str],
    panel: pd.DataFrame,
    financial_crime: dict[str, Any],
) -> dict[str, Any]:
    return {
        "run_timestamp": pd.Timestamp.utcnow().replace(microsecond=0).isoformat(),
        "targets": list(TARGET_SERIES),
        "latest_observations": _latest_observations(panel),
        "forecast_horizon_months": settings.forecast_horizon_months,
        "model_metrics": {
            target_key: result["metrics"] for target_key, result in model_results.items()
        },
        "selected_models": {
            target_key: {
                "display_name": result["display_name"],
                **result["selected_model"],
            }
            for target_key, result in model_results.items()
        },
        "financial_crime": financial_crime,
        "source_status": source_status,
        "chart_files": chart_files,
    }


def run_pipeline(
    settings_override: PipelineSettings | None = None,
    preloaded_sources: dict[str, pd.DataFrame] | None = None,
    financial_crime_override: tuple[dict[str, Any], list[dict[str, Any]]] | None = None,
) -> dict[str, Any]:
    settings = settings_override or get_settings()
    _ensure_directories(settings)
    session = requests.Session()

    ingestors = {
        "bcra": fetch_bcra_data,
        "datos_gob_ar": fetch_datos_gob_ar_data,
        "fred": fetch_fred_data,
        "world_bank": fetch_world_bank_data,
    }

    source_status: list[dict[str, Any]] = []
    raw_frames: list[pd.DataFrame] = []

    for source_name, fetcher in ingestors.items():
        frame, status = _load_source(
            source_name=source_name,
            fetcher=fetcher,
            settings=settings,
            session=session,
            preloaded_sources=preloaded_sources,
        )
        source_status.append(status)
        if not frame.empty:
            raw_frames.append(frame)

    if not raw_frames:
        raise RuntimeError("The pipeline could not collect any source data.")

    raw_long = pd.concat(raw_frames, ignore_index=True).sort_values(["series_id", "date"])
    monthly_long = harmonize_monthly(raw_long, SERIES_CATALOG)
    save_table(monthly_long, settings.processed_dir / "monthly_long")

    feature_panel = build_feature_panel(monthly_long)
    _persist_feature_panel(feature_panel, settings.features_dir / "feature_panel")

    model_results = run_all_models(feature_panel, settings)
    if financial_crime_override is not None:
        financial_crime, financial_crime_status = financial_crime_override
    else:
        financial_crime, financial_crime_status = fetch_financial_crime_snapshot(session=session)
    source_status.extend(financial_crime_status)
    chart_files = create_charts(feature_panel, model_results, settings.charts_dir)
    summary = _build_summary(
        settings,
        model_results,
        source_status,
        chart_files,
        feature_panel,
        financial_crime,
    )
    report_markdown = render_report(summary)

    write_summary(summary, settings.outputs_dir / "summary.json")
    write_report(report_markdown, settings.outputs_dir / "report.md")
    publish_public_artifacts(
        outputs_dir=settings.outputs_dir,
        charts_dir=settings.charts_dir,
        public_dir=settings.public_dir,
        public_charts_dir=settings.public_charts_dir,
    )
    update_readme_timestamp(
        settings.project_dir / "README.md",
        summary["run_timestamp"],
    )

    return summary


def main() -> None:
    configure_logging()
    summary = run_pipeline()
    LOGGER.info("Pipeline completed successfully at %s", summary["run_timestamp"])


if __name__ == "__main__":
    main()
