from __future__ import annotations

import pandas as pd
import requests

from src.config import FRED_SERIES, PipelineSettings

API_URL = "https://api.stlouisfed.org/fred/series/observations"


def fetch_fred_data(
    settings: PipelineSettings, session: requests.Session | None = None
) -> pd.DataFrame:
    if not settings.fred_api_key:
        return pd.DataFrame(
            columns=["date", "series_id", "source", "value", "frequency", "unit"]
        )

    client = session or requests.Session()
    frames: list[pd.DataFrame] = []

    for series_id, metadata in FRED_SERIES.items():
        response = client.get(
            API_URL,
            params={
                "series_id": metadata["id"],
                "api_key": settings.fred_api_key,
                "file_type": "json",
                "observation_start": settings.start_date,
            },
            timeout=30,
        )
        response.raise_for_status()
        payload = response.json()
        observations = payload.get("observations", [])

        if not observations:
            continue

        frame = pd.DataFrame(observations)
        frames.append(
            pd.DataFrame(
                {
                    "date": pd.to_datetime(frame["date"]),
                    "series_id": series_id,
                    "source": "FRED",
                    "value": pd.to_numeric(frame["value"], errors="coerce"),
                    "frequency": metadata["frequency"],
                    "unit": metadata["unit"],
                }
            )
        )

    if not frames:
        return pd.DataFrame(
            columns=["date", "series_id", "source", "value", "frequency", "unit"]
        )

    result = pd.concat(frames, ignore_index=True)
    result = result.dropna(subset=["value"]).sort_values(["series_id", "date"])
    return result.reset_index(drop=True)
