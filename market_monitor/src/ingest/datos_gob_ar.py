from __future__ import annotations

import pandas as pd
import requests

from src.config import DATOS_SERIES, PipelineSettings

API_URL = "https://apis.datos.gob.ar/series/api/series"


def fetch_datos_gob_ar_data(
    settings: PipelineSettings, session: requests.Session | None = None
) -> pd.DataFrame:
    del settings
    client = session or requests.Session()
    requested_series = list(DATOS_SERIES.items())
    response = client.get(
        API_URL,
        params={
            "ids": ",".join(metadata["id"] for _, metadata in requested_series),
            "limit": 5000,
        },
        timeout=30,
    )
    response.raise_for_status()
    payload = response.json()
    rows = payload.get("data", [])

    if not rows:
        return pd.DataFrame(
            columns=["date", "series_id", "source", "value", "frequency", "unit"]
        )

    wide_frame = pd.DataFrame(rows, columns=["date", *[key for key, _ in requested_series]])
    wide_frame["date"] = pd.to_datetime(wide_frame["date"])

    frames: list[pd.DataFrame] = []
    for series_id, metadata in requested_series:
        series_frame = wide_frame[["date", series_id]].copy()
        series_frame["series_id"] = series_id
        series_frame["source"] = "datos.gob.ar"
        series_frame["value"] = pd.to_numeric(series_frame[series_id], errors="coerce")
        if series_id == "datos_inflation_mom":
            series_frame["value"] = series_frame["value"] * 100
        series_frame["frequency"] = metadata["frequency"]
        series_frame["unit"] = metadata["unit"]
        frames.append(
            series_frame[
                ["date", "series_id", "source", "value", "frequency", "unit"]
            ]
        )

    result = pd.concat(frames, ignore_index=True)
    result = result.dropna(subset=["value"]).sort_values(["series_id", "date"])
    return result.reset_index(drop=True)
