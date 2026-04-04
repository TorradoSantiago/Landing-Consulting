from __future__ import annotations

import pandas as pd

from src.clean import harmonize_monthly
from src.features import build_feature_panel
from src.config import SERIES_CATALOG


def test_build_feature_panel_creates_lags_and_transforms(sample_source_frames) -> None:
    raw = pd.concat(sample_source_frames.values(), ignore_index=True)
    monthly = harmonize_monthly(raw, SERIES_CATALOG)
    panel = build_feature_panel(monthly)

    assert "bcra_official_fx_mom" in panel.columns
    assert "datos_emae_mom" in panel.columns
    assert "bcra_badlar_lag1" in panel.columns
    assert panel.index.name == "date"
