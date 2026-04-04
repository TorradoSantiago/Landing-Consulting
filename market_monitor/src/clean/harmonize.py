from __future__ import annotations

from collections.abc import Mapping

import pandas as pd


def _drop_incomplete_current_month(
    monthly_frame: pd.DataFrame, source_frame: pd.DataFrame
) -> pd.DataFrame:
    latest_actual = pd.to_datetime(source_frame["date"]).max()
    if pd.isna(latest_actual):
        return monthly_frame

    now = pd.Timestamp.utcnow().tz_localize(None)
    latest_month_end = latest_actual.to_period("M").to_timestamp("M")

    if (
        latest_actual.to_period("M") == now.to_period("M")
        and latest_actual.normalize() < latest_month_end.normalize()
    ):
        return monthly_frame.loc[monthly_frame["date"] != latest_month_end].copy()

    return monthly_frame


def _monthly_passthrough(series_frame: pd.DataFrame) -> pd.DataFrame:
    frame = series_frame.copy()
    frame["date"] = frame["date"].dt.to_period("M").dt.to_timestamp("M")
    return (
        frame.groupby(["date", "series_id", "source", "unit"], as_index=False)["value"]
        .last()
        .assign(frequency="M")
    )


def _month_end(series_frame: pd.DataFrame) -> pd.DataFrame:
    frame = series_frame.sort_values("date").copy()
    frame["month"] = frame["date"].dt.to_period("M")
    result = frame.groupby("month", as_index=False).tail(1).copy()
    result["date"] = result["month"].dt.to_timestamp("M")
    result = result[["date", "series_id", "source", "value", "unit"]].assign(frequency="M")
    return _drop_incomplete_current_month(result, frame)


def _month_average(series_frame: pd.DataFrame) -> pd.DataFrame:
    frame = series_frame.copy()
    frame["date"] = frame["date"].dt.to_period("M").dt.to_timestamp("M")
    result = (
        frame.groupby(["date", "series_id", "source", "unit"], as_index=False)["value"]
        .mean()
        .assign(frequency="M")
    )
    return _drop_incomplete_current_month(result, series_frame)


def _annual_forward_fill(series_frame: pd.DataFrame) -> pd.DataFrame:
    records: list[dict[str, object]] = []

    for row in series_frame.sort_values("date").itertuples(index=False):
        for month_end in pd.date_range(
            f"{row.date.year}-01-31",
            f"{row.date.year}-12-31",
            freq="ME",
        ):
            records.append(
                {
                    "date": month_end,
                    "series_id": row.series_id,
                    "source": row.source,
                    "value": row.value,
                    "frequency": "M",
                    "unit": row.unit,
                }
            )

    return pd.DataFrame.from_records(records)


def harmonize_monthly(
    raw_df: pd.DataFrame, series_catalog: Mapping[str, Mapping[str, object]]
) -> pd.DataFrame:
    if raw_df.empty:
        return pd.DataFrame(columns=["date", "series_id", "source", "value", "frequency", "unit"])

    raw_df = raw_df.copy()
    raw_df["date"] = pd.to_datetime(raw_df["date"])
    frames: list[pd.DataFrame] = []

    for series_id, series_frame in raw_df.groupby("series_id"):
        metadata = series_catalog[series_id]
        aggregation = metadata["aggregation"]

        if aggregation == "month_end":
            monthly_frame = _month_end(series_frame)
        elif aggregation == "month_avg":
            monthly_frame = _month_average(series_frame)
        elif aggregation == "monthly_passthrough":
            monthly_frame = _monthly_passthrough(series_frame)
        elif aggregation == "annual_forward_fill":
            monthly_frame = _annual_forward_fill(series_frame)
        else:
            raise ValueError(f"Unsupported aggregation method: {aggregation}")

        frames.append(monthly_frame)

    monthly = pd.concat(frames, ignore_index=True)
    monthly["date"] = pd.to_datetime(monthly["date"])
    monthly = monthly.sort_values(["date", "series_id"]).reset_index(drop=True)
    return monthly[["date", "series_id", "source", "value", "frequency", "unit"]]
