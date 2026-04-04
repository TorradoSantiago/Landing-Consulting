from __future__ import annotations

import logging
from typing import Any

import numpy as np
import pandas as pd

from src.config import PipelineSettings, TARGET_CONFIG
from src.models.baselines import moving_average_forecast, naive_forecast
from src.models.metrics import mean_absolute_error, root_mean_squared_error
from src.models.sarimax_model import sarimax_forecast

LOGGER = logging.getLogger(__name__)
MODEL_LABELS = {
    "naive": "Naive baseline",
    "moving_average": "3M moving average",
    "sarimax": "SARIMAX",
}


def _available_exog(panel: pd.DataFrame, target_key: str) -> list[str]:
    configured = TARGET_CONFIG[target_key]["exog"]
    return [
        column
        for column in configured
        if column in panel.columns and panel[column].notna().sum() >= 12
    ]


def _prepare_model_frame(
    panel: pd.DataFrame, target_key: str
) -> tuple[pd.DataFrame, list[str]]:
    if target_key not in panel.columns:
        return pd.DataFrame(), []

    exog_columns = _available_exog(panel, target_key)
    selected_columns = [target_key, *exog_columns]
    frame = panel[selected_columns].copy()
    frame = frame.dropna(subset=[target_key])

    if exog_columns:
        frame = frame.dropna(subset=exog_columns)

    return frame.sort_index(), exog_columns


def _evaluate_metrics(
    actuals: list[float], predictions: list[float]
) -> dict[str, float | int | None]:
    if not predictions:
        return {"mae": None, "rmse": None, "n_test_points": 0}

    actual_array = np.asarray(actuals, dtype=float)
    prediction_array = np.asarray(predictions, dtype=float)
    return {
        "mae": mean_absolute_error(actual_array, prediction_array),
        "rmse": root_mean_squared_error(actual_array, prediction_array),
        "n_test_points": len(predictions),
    }


def _forecast_with_model(
    model_name: str,
    target_key: str,
    model_frame: pd.DataFrame,
    exog_columns: list[str],
    horizon: int,
) -> np.ndarray:
    target_series = model_frame[target_key]
    train_exog = model_frame[exog_columns] if exog_columns else None

    if model_name == "naive":
        return naive_forecast(target_series, horizon)

    if model_name == "moving_average":
        return moving_average_forecast(target_series, horizon)

    if model_name == "sarimax":
        last_exog = (
            pd.DataFrame(
                np.repeat(train_exog.iloc[[-1]].to_numpy(), horizon, axis=0),
                columns=exog_columns,
            )
            if train_exog is not None and not train_exog.empty
            else None
        )
        return sarimax_forecast(
            train_y=target_series,
            train_exog=train_exog,
            forecast_exog=last_exog,
            order=TARGET_CONFIG[target_key]["sarimax_order"],
            seasonal_order=TARGET_CONFIG[target_key]["seasonal_order"],
            horizon=horizon,
        )

    raise ValueError(f"Unknown model: {model_name}")


def _backtest_model(
    model_name: str,
    target_key: str,
    model_frame: pd.DataFrame,
    exog_columns: list[str],
    settings: PipelineSettings,
) -> dict[str, float | int | None]:
    start = max(settings.min_train_size, len(model_frame) - settings.backtest_windows)
    actuals: list[float] = []
    predictions: list[float] = []

    for idx in range(start, len(model_frame)):
        train = model_frame.iloc[:idx]
        test = model_frame.iloc[idx : idx + 1]

        if len(train) < settings.min_train_size or test.empty:
            continue

        try:
            if model_name == "sarimax":
                predicted = sarimax_forecast(
                    train_y=train[target_key],
                    train_exog=train[exog_columns] if exog_columns else None,
                    forecast_exog=test[exog_columns] if exog_columns else None,
                    order=TARGET_CONFIG[target_key]["sarimax_order"],
                    seasonal_order=TARGET_CONFIG[target_key]["seasonal_order"],
                    horizon=1,
                )[0]
            elif model_name == "naive":
                predicted = naive_forecast(train[target_key], 1)[0]
            else:
                predicted = moving_average_forecast(train[target_key], 1)[0]
        except Exception as exc:
            LOGGER.warning(
                "Backtest failed for %s / %s at split %s: %s",
                target_key,
                model_name,
                idx,
                exc,
            )
            continue

        actuals.append(float(test[target_key].iloc[0]))
        predictions.append(float(predicted))

    return _evaluate_metrics(actuals, predictions)


def run_target_models(
    panel: pd.DataFrame, target_key: str, settings: PipelineSettings
) -> dict[str, Any]:
    model_frame, exog_columns = _prepare_model_frame(panel, target_key)
    target_meta = TARGET_CONFIG[target_key]

    if target_key not in panel.columns or model_frame.empty:
        return {
            "target": target_key,
            "display_name": target_meta["display_name"],
            "metrics": {
                "naive": {"mae": None, "rmse": None, "n_test_points": 0},
                "moving_average": {"mae": None, "rmse": None, "n_test_points": 0},
                "sarimax": {"mae": None, "rmse": None, "n_test_points": 0},
            },
            "selected_model": {
                "name": "naive",
                "label": MODEL_LABELS["naive"],
                "mae": None,
                "rmse": None,
                "used_exog": [],
                "forecast": [],
            },
            "latest_observation": {
                "date": "n/a",
                "value": 0.0,
            },
            "history": [],
        }

    metrics: dict[str, dict[str, float | int | None]] = {}

    for model_name in ("naive", "moving_average", "sarimax"):
        metrics[model_name] = _backtest_model(
            model_name=model_name,
            target_key=target_key,
            model_frame=model_frame,
            exog_columns=exog_columns,
            settings=settings,
        )

    valid_models = {
        name: values for name, values in metrics.items() if values["mae"] is not None
    }
    selected_model = (
        min(valid_models, key=lambda name: (valid_models[name]["mae"], valid_models[name]["rmse"]))
        if valid_models
        else "naive"
    )

    latest_date = model_frame.index.max()
    latest_value = float(model_frame[target_key].iloc[-1])

    try:
        forecast_values = _forecast_with_model(
            selected_model,
            target_key,
            model_frame,
            exog_columns,
            settings.forecast_horizon_months,
        )
    except Exception as exc:
        LOGGER.warning("Final forecast failed for %s with %s: %s", target_key, selected_model, exc)
        selected_model = "naive"
        forecast_values = _forecast_with_model(
            selected_model,
            target_key,
            model_frame,
            exog_columns,
            settings.forecast_horizon_months,
        )

    forecast_index = pd.date_range(
        latest_date + pd.offsets.MonthEnd(1),
        periods=settings.forecast_horizon_months,
        freq="ME",
    )
    forecast = [
        {"date": date.strftime("%Y-%m-%d"), "value": float(value)}
        for date, value in zip(forecast_index, forecast_values, strict=True)
    ]

    return {
        "target": target_key,
        "display_name": target_meta["display_name"],
        "metrics": metrics,
        "selected_model": {
            "name": selected_model,
            "label": MODEL_LABELS[selected_model],
            "mae": metrics[selected_model]["mae"],
            "rmse": metrics[selected_model]["rmse"],
            "used_exog": exog_columns,
            "forecast": forecast,
        },
        "latest_observation": {
            "date": latest_date.strftime("%Y-%m-%d"),
            "value": latest_value,
        },
        "history": (
            model_frame[target_key]
            .tail(24)
            .rename("value")
            .reset_index()
            .assign(date=lambda frame: frame["date"].dt.strftime("%Y-%m-%d"))
            .to_dict(orient="records")
        ),
    }


def run_all_models(panel: pd.DataFrame, settings: PipelineSettings) -> dict[str, dict[str, Any]]:
    return {
        target_key: run_target_models(panel, target_key, settings)
        for target_key in TARGET_CONFIG
    }
