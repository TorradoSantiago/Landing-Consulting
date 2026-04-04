from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()


@dataclass(frozen=True)
class PipelineSettings:
    project_dir: Path
    repo_dir: Path
    raw_dir: Path
    processed_dir: Path
    features_dir: Path
    outputs_dir: Path
    charts_dir: Path
    public_dir: Path
    public_charts_dir: Path
    fred_api_key: str | None
    start_date: str = "2015-01-01"
    world_bank_start_year: int = 2010
    forecast_horizon_months: int = 3
    backtest_windows: int = 24
    min_train_size: int = 24


def get_settings() -> PipelineSettings:
    project_dir = Path(__file__).resolve().parents[1]
    repo_dir = project_dir.parent

    return PipelineSettings(
        project_dir=project_dir,
        repo_dir=repo_dir,
        raw_dir=project_dir / "data" / "raw",
        processed_dir=project_dir / "data" / "processed",
        features_dir=project_dir / "data" / "features",
        outputs_dir=project_dir / "outputs",
        charts_dir=project_dir / "outputs" / "charts",
        public_dir=repo_dir / "public" / "market-monitor",
        public_charts_dir=repo_dir / "public" / "market-monitor" / "charts",
        fred_api_key=os.getenv("FRED_API_KEY"),
    )


BCRA_SERIES = {
    "bcra_official_fx": {
        "id": 4,
        "label": "Official retail USD/ARS",
        "frequency": "D",
        "unit": "ARS per USD",
        "aggregation": "month_end",
    },
    "bcra_reserves": {
        "id": 1,
        "label": "International reserves",
        "frequency": "D",
        "unit": "USD mn",
        "aggregation": "month_end",
    },
    "bcra_badlar": {
        "id": 7,
        "label": "BADLAR private banks",
        "frequency": "D",
        "unit": "Percent nominal annual rate",
        "aggregation": "month_avg",
    },
    "bcra_policy_rate": {
        "id": 160,
        "label": "Monetary policy rate",
        "frequency": "D",
        "unit": "Percent nominal annual rate",
        "aggregation": "month_end",
    },
}

DATOS_SERIES = {
    "datos_inflation_mom": {
        "id": "145.3_INGNACUAL_DICI_M_38",
        "label": "National CPI monthly change",
        "frequency": "M",
        "unit": "Monthly percent change",
        "aggregation": "monthly_passthrough",
    },
    "datos_cpi_index": {
        "id": "148.3_INIVELNAL_DICI_M_26",
        "label": "National CPI index",
        "frequency": "M",
        "unit": "Index",
        "aggregation": "monthly_passthrough",
    },
    "datos_emae_index": {
        "id": "143.3_NO_PR_2004_A_31",
        "label": "EMAE deseasonalized index",
        "frequency": "M",
        "unit": "Index base 2004",
        "aggregation": "monthly_passthrough",
    },
}

FRED_SERIES = {
    "fred_fedfunds": {
        "id": "FEDFUNDS",
        "label": "Fed funds rate",
        "frequency": "M",
        "unit": "Percent",
        "aggregation": "monthly_passthrough",
    },
    "fred_us10y": {
        "id": "GS10",
        "label": "US 10Y Treasury rate",
        "frequency": "M",
        "unit": "Percent",
        "aggregation": "monthly_passthrough",
    },
    "fred_vix": {
        "id": "VIXCLS",
        "label": "VIX close",
        "frequency": "D",
        "unit": "Index",
        "aggregation": "month_avg",
    },
}

WORLD_BANK_SERIES = {
    "wb_arg_gdp_growth": {
        "country": "AR",
        "indicator": "NY.GDP.MKTP.KD.ZG",
        "label": "Argentina GDP growth",
        "frequency": "A",
        "unit": "Annual percent",
        "aggregation": "annual_forward_fill",
    },
    "wb_us_gdp_growth": {
        "country": "US",
        "indicator": "NY.GDP.MKTP.KD.ZG",
        "label": "US GDP growth",
        "frequency": "A",
        "unit": "Annual percent",
        "aggregation": "annual_forward_fill",
    },
}

TARGET_CONFIG = {
    "datos_inflation_mom": {
        "display_name": "Monthly inflation",
        "exog": [
            "bcra_badlar_lag1",
            "bcra_official_fx_mom_lag1",
            "datos_emae_mom_lag1",
            "fred_fedfunds_lag1",
            "fred_vix_lag1",
        ],
        "sarimax_order": (1, 0, 0),
        "seasonal_order": (0, 0, 0, 0),
    },
    "bcra_official_fx": {
        "display_name": "Official USD/ARS",
        "exog": [
            "datos_inflation_mom_lag1",
            "bcra_badlar_lag1",
            "bcra_reserves_mom_lag1",
            "fred_us10y_lag1",
            "fred_vix_lag1",
        ],
        "sarimax_order": (1, 1, 0),
        "seasonal_order": (0, 0, 0, 0),
    },
}

SERIES_CATALOG = {
    **BCRA_SERIES,
    **DATOS_SERIES,
    **FRED_SERIES,
    **WORLD_BANK_SERIES,
}

TARGET_SERIES = tuple(TARGET_CONFIG.keys())
