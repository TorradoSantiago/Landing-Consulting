from __future__ import annotations

import pandas as pd

from src.clean import harmonize_monthly
from src.config import SERIES_CATALOG


def test_harmonize_monthly_rules() -> None:
    raw = pd.DataFrame(
        [
            {
                "date": "2026-01-10",
                "series_id": "bcra_official_fx",
                "source": "BCRA",
                "value": 100,
                "frequency": "D",
                "unit": "ARS per USD",
            },
            {
                "date": "2026-01-31",
                "series_id": "bcra_official_fx",
                "source": "BCRA",
                "value": 110,
                "frequency": "D",
                "unit": "ARS per USD",
            },
            {
                "date": "2026-01-10",
                "series_id": "bcra_badlar",
                "source": "BCRA",
                "value": 30,
                "frequency": "D",
                "unit": "Rate",
            },
            {
                "date": "2026-01-20",
                "series_id": "bcra_badlar",
                "source": "BCRA",
                "value": 34,
                "frequency": "D",
                "unit": "Rate",
            },
            {
                "date": "2026-01-01",
                "series_id": "datos_inflation_mom",
                "source": "datos.gob.ar",
                "value": 2.5,
                "frequency": "M",
                "unit": "Percent",
            },
            {
                "date": "2025-01-01",
                "series_id": "wb_arg_gdp_growth",
                "source": "World Bank",
                "value": 2.8,
                "frequency": "A",
                "unit": "Annual percent",
            },
        ]
    )
    raw["date"] = pd.to_datetime(raw["date"])

    monthly = harmonize_monthly(raw, SERIES_CATALOG)

    fx_value = monthly.loc[monthly["series_id"] == "bcra_official_fx", "value"].iloc[0]
    badlar_value = monthly.loc[monthly["series_id"] == "bcra_badlar", "value"].iloc[0]
    wb_rows = monthly.loc[monthly["series_id"] == "wb_arg_gdp_growth"]

    assert fx_value == 110
    assert badlar_value == 32
    assert len(wb_rows) == 12
    assert (monthly["frequency"] == "M").all()
