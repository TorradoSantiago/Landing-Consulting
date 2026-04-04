from __future__ import annotations

import numpy as np
import pandas as pd


def naive_forecast(train: pd.Series, horizon: int) -> np.ndarray:
    value = float(train.iloc[-1])
    return np.repeat(value, horizon)


def moving_average_forecast(
    train: pd.Series, horizon: int, window: int = 3
) -> np.ndarray:
    value = float(train.tail(window).mean())
    return np.repeat(value, horizon)
