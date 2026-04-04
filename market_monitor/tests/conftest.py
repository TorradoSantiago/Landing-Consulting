from __future__ import annotations

from dataclasses import replace
from pathlib import Path

import numpy as np
import pandas as pd
import pytest

from src.config import PipelineSettings, get_settings


def _make_frame(
    series_id: str,
    dates: pd.DatetimeIndex,
    values: np.ndarray,
    source: str,
    frequency: str,
    unit: str,
) -> pd.DataFrame:
    return pd.DataFrame(
        {
            "date": dates,
            "series_id": series_id,
            "source": source,
            "value": values,
            "frequency": frequency,
            "unit": unit,
        }
    )


@pytest.fixture()
def pipeline_settings(tmp_path: Path) -> PipelineSettings:
    project_dir = tmp_path / "market_monitor"
    repo_dir = tmp_path

    for relative in (
        "data/raw",
        "data/processed",
        "data/features",
        "outputs/charts",
        "public/market-monitor/charts",
    ):
        (project_dir / relative).mkdir(parents=True, exist_ok=True)

    (project_dir / "README.md").write_text(
        "# Test Monitor\n\n<!-- LAST_UPDATED_START -->\nLast updated: not generated yet.\n<!-- LAST_UPDATED_END -->\n",
        encoding="utf-8",
    )

    base = get_settings()
    return replace(
        base,
        project_dir=project_dir,
        repo_dir=repo_dir,
        raw_dir=project_dir / "data" / "raw",
        processed_dir=project_dir / "data" / "processed",
        features_dir=project_dir / "data" / "features",
        outputs_dir=project_dir / "outputs",
        charts_dir=project_dir / "outputs" / "charts",
        public_dir=repo_dir / "public" / "market-monitor",
        public_charts_dir=repo_dir / "public" / "market-monitor" / "charts",
        fred_api_key="test-key",
    )


@pytest.fixture()
def sample_source_frames() -> dict[str, pd.DataFrame]:
    monthly_dates = pd.date_range("2022-01-31", periods=48, freq="ME")
    annual_dates = pd.to_datetime(["2022-01-01", "2023-01-01", "2024-01-01", "2025-01-01"])

    bcra = pd.concat(
        [
            _make_frame(
                "bcra_official_fx",
                monthly_dates,
                np.linspace(110, 1450, len(monthly_dates)),
                "BCRA",
                "D",
                "ARS per USD",
            ),
            _make_frame(
                "bcra_reserves",
                monthly_dates,
                np.linspace(38000, 25000, len(monthly_dates)),
                "BCRA",
                "D",
                "USD mn",
            ),
            _make_frame(
                "bcra_badlar",
                monthly_dates,
                np.linspace(35, 42, len(monthly_dates)),
                "BCRA",
                "D",
                "Percent nominal annual rate",
            ),
            _make_frame(
                "bcra_policy_rate",
                monthly_dates,
                np.linspace(38, 45, len(monthly_dates)),
                "BCRA",
                "D",
                "Percent nominal annual rate",
            ),
        ],
        ignore_index=True,
    )

    datos = pd.concat(
        [
            _make_frame(
                "datos_inflation_mom",
                monthly_dates,
                3 + np.sin(np.arange(len(monthly_dates)) / 4),
                "datos.gob.ar",
                "M",
                "Monthly percent change",
            ),
            _make_frame(
                "datos_cpi_index",
                monthly_dates,
                np.linspace(100, 520, len(monthly_dates)),
                "datos.gob.ar",
                "M",
                "Index",
            ),
            _make_frame(
                "datos_emae_index",
                monthly_dates,
                np.linspace(120, 145, len(monthly_dates)) + np.sin(np.arange(len(monthly_dates)) / 6),
                "datos.gob.ar",
                "M",
                "Index base 2004",
            ),
        ],
        ignore_index=True,
    )

    fred = pd.concat(
        [
            _make_frame(
                "fred_fedfunds",
                monthly_dates,
                np.linspace(1.5, 4.5, len(monthly_dates)),
                "FRED",
                "M",
                "Percent",
            ),
            _make_frame(
                "fred_us10y",
                monthly_dates,
                np.linspace(2.0, 4.8, len(monthly_dates)),
                "FRED",
                "M",
                "Percent",
            ),
            _make_frame(
                "fred_vix",
                monthly_dates,
                18 + np.cos(np.arange(len(monthly_dates)) / 5),
                "FRED",
                "D",
                "Index",
            ),
        ],
        ignore_index=True,
    )

    world_bank = pd.concat(
        [
            _make_frame(
                "wb_arg_gdp_growth",
                annual_dates,
                np.array([-2.0, 5.0, 3.2, 2.1]),
                "World Bank",
                "A",
                "Annual percent",
            ),
            _make_frame(
                "wb_us_gdp_growth",
                annual_dates,
                np.array([1.9, 2.5, 2.3, 2.0]),
                "World Bank",
                "A",
                "Annual percent",
            ),
        ],
        ignore_index=True,
    )

    return {
        "bcra": bcra,
        "datos_gob_ar": datos,
        "fred": fred,
        "world_bank": world_bank,
    }


@pytest.fixture()
def financial_crime_fixture() -> tuple[dict[str, object], list[dict[str, object]]]:
    return (
        {
            "sanctions": {
                "ofac": {
                    "entries": 18698,
                    "programs": 38,
                    "published_on": "04/03/2026",
                    "url": "https://sanctionslistservice.ofac.treas.gov/api/PublicationPreview/exports/SDN.XML",
                },
                "un": {
                    "individuals": 733,
                    "entities": 272,
                    "total": 1005,
                    "generated_at": "2026-04-03T23:00:07.299Z",
                    "url": "https://scsanctions.un.org/resources/xml/en/consolidated.xml",
                },
            },
            "fatf": {
                "snapshot_date": "2026-02-13",
                "grey_list_count": 22,
                "high_risk_count": 3,
                "grey_list": ["Algeria", "Angola"],
                "high_risk": ["Iran", "Myanmar"],
                "grey_list_url": "https://www.fatf-gafi.org/",
                "high_risk_url": "https://www.fatf-gafi.org/",
            },
            "governance": {
                "year": "2023",
                "source_updated": "2026-02-24",
                "countries": {
                    "AR": {"name": "Argentina", "percentile_rank": 41.98},
                    "US": {"name": "United States", "percentile_rank": 88.21},
                    "SG": {"name": "Singapore", "percentile_rank": 96.70},
                },
                "url": "https://api.worldbank.org/",
            },
            "public_bases": [
                {
                    "category": "Sanctions screening",
                    "label": "OFAC SDN XML",
                    "description": "Official U.S. sanctions source.",
                    "url": "https://sanctionslistservice.ofac.treas.gov/api/PublicationPreview/exports/SDN.XML",
                }
            ],
        },
        [
            {"source": "fatf_snapshot", "status": "snapshot", "note": "Fixture snapshot"},
            {"source": "ofac_sdn", "status": "live", "note": "Fixture"},
            {"source": "un_consolidated", "status": "live", "note": "Fixture"},
            {"source": "world_bank_governance", "status": "live", "note": "Fixture"},
        ],
    )
