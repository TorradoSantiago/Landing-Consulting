from __future__ import annotations

import pandas as pd

from src.clean import harmonize_monthly
from src.config import SERIES_CATALOG
from src.features import build_feature_panel
from src.models import run_all_models
from src.reporting import (
    create_charts,
    publish_public_artifacts,
    render_report,
    update_readme_timestamp,
    write_report,
    write_summary,
)


def test_reporting_outputs(
    sample_source_frames, pipeline_settings, financial_crime_fixture
) -> None:
    raw = pd.concat(sample_source_frames.values(), ignore_index=True)
    monthly = harmonize_monthly(raw, SERIES_CATALOG)
    panel = build_feature_panel(monthly)
    model_results = run_all_models(panel, pipeline_settings)
    chart_files = create_charts(panel, model_results, pipeline_settings.charts_dir)

    summary = {
        "run_timestamp": "2026-04-04T18:00:00",
        "targets": ["datos_inflation_mom", "bcra_official_fx"],
        "latest_observations": {
            "datos_inflation_mom": {"date": "2025-12-31", "value": 3.1},
            "bcra_official_fx": {"date": "2025-12-31", "value": 1450},
            "bcra_badlar": {"date": "2025-12-31", "value": 42},
        },
        "forecast_horizon_months": 3,
        "model_metrics": {
            key: value["metrics"] for key, value in model_results.items()
        },
        "selected_models": {
            key: {"display_name": value["display_name"], **value["selected_model"]}
            for key, value in model_results.items()
        },
        "financial_crime": financial_crime_fixture[0],
        "source_status": [
            {"source": "bcra", "status": "live"},
            {"source": "datos_gob_ar", "status": "live"},
            {"source": "fred", "status": "live"},
            {"source": "world_bank", "status": "live"},
        ],
        "chart_files": chart_files,
    }
    report = render_report(summary)

    write_summary(summary, pipeline_settings.outputs_dir / "summary.json")
    write_report(report, pipeline_settings.outputs_dir / "report.md")
    publish_public_artifacts(
        pipeline_settings.outputs_dir,
        pipeline_settings.charts_dir,
        pipeline_settings.public_dir,
        pipeline_settings.public_charts_dir,
    )
    update_readme_timestamp(
        pipeline_settings.project_dir / "README.md",
        summary["run_timestamp"],
    )

    assert "## What changed this week" in report
    assert "## Global financial crime signals" in report
    assert (pipeline_settings.outputs_dir / "summary.json").exists()
    assert (pipeline_settings.outputs_dir / "report.md").exists()
    assert (pipeline_settings.public_dir / "summary.json").exists()
    assert chart_files
