from __future__ import annotations

import warnings

import numpy as np
import pandas as pd
from statsmodels.tsa.statespace.sarimax import SARIMAX


def sarimax_forecast(
    train_y: pd.Series,
    train_exog: pd.DataFrame | None,
    forecast_exog: pd.DataFrame | None,
    order: tuple[int, int, int],
    seasonal_order: tuple[int, int, int, int],
    horizon: int,
) -> np.ndarray:
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        model = SARIMAX(
            train_y.astype(float),
            exog=train_exog.astype(float) if train_exog is not None else None,
            order=order,
            seasonal_order=seasonal_order,
            enforce_stationarity=False,
            enforce_invertibility=False,
        )
        fitted = model.fit(disp=False)
        forecast = fitted.get_forecast(
            steps=horizon,
            exog=forecast_exog.astype(float) if forecast_exog is not None else None,
        )
    return np.asarray(forecast.predicted_mean)
