from __future__ import annotations

import numpy as np
import pandas as pd

from src.clean import harmonize_monthly
from src.config import SERIES_CATALOG
from src.features import build_feature_panel
from src.models import (
    mean_absolute_error,
    moving_average_forecast,
    naive_forecast,
    run_target_models,
)


def test_baseline_forecasts_are_deterministic() -> None:
    series = pd.Series([1.0, 2.0, 3.0, 4.0])
    assert np.allclose(naive_forecast(series, 3), np.array([4.0, 4.0, 4.0]))
    assert np.allclose(moving_average_forecast(series, 2), np.array([3.0, 3.0]))
    assert mean_absolute_error(np.array([1.0, 2.0]), np.array([1.0, 3.0])) == 0.5


def test_run_target_models_returns_forecast(sample_source_frames, pipeline_settings) -> None:
    raw = pd.concat(sample_source_frames.values(), ignore_index=True)
    monthly = harmonize_monthly(raw, SERIES_CATALOG)
    panel = build_feature_panel(monthly)

    result = run_target_models(panel, "datos_inflation_mom", pipeline_settings)

    assert result["selected_model"]["forecast"]
    assert set(result["metrics"].keys()) == {"naive", "moving_average", "sarimax"}
