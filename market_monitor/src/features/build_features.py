from __future__ import annotations

import pandas as pd

from src.config import SERIES_CATALOG


def build_feature_panel(monthly_long: pd.DataFrame) -> pd.DataFrame:
    if monthly_long.empty:
        return pd.DataFrame()

    panel = (
        monthly_long.pivot_table(
            index="date",
            columns="series_id",
            values="value",
            aggfunc="last",
        )
        .sort_index()
        .copy()
    )

    full_index = pd.date_range(panel.index.min(), panel.index.max(), freq="ME")
    panel = panel.reindex(full_index)
    panel.index.name = "date"

    for series_id, metadata in SERIES_CATALOG.items():
        if metadata["aggregation"] == "annual_forward_fill" and series_id in panel.columns:
            panel[series_id] = panel[series_id].ffill()

    if "bcra_official_fx" in panel.columns:
        panel["bcra_official_fx_mom"] = (
            panel["bcra_official_fx"].pct_change(fill_method=None) * 100
        )

    if "bcra_reserves" in panel.columns:
        panel["bcra_reserves_mom"] = (
            panel["bcra_reserves"].pct_change(fill_method=None) * 100
        )

    if "datos_emae_index" in panel.columns:
        panel["datos_emae_mom"] = (
            panel["datos_emae_index"].pct_change(fill_method=None) * 100
        )

    lag_candidates = list(panel.columns)
    for column in lag_candidates:
        panel[f"{column}_lag1"] = panel[column].shift(1)

    return panel
