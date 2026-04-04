from __future__ import annotations

import pandas as pd
import requests

from src.config import PipelineSettings, WORLD_BANK_SERIES

API_URL = "https://api.worldbank.org/v2/country/{country}/indicator/{indicator}"


def fetch_world_bank_data(
    settings: PipelineSettings, session: requests.Session | None = None
) -> pd.DataFrame:
    client = session or requests.Session()
    frames: list[pd.DataFrame] = []

    for series_id, metadata in WORLD_BANK_SERIES.items():
        response = client.get(
            API_URL.format(
                country=metadata["country"],
                indicator=metadata["indicator"],
            ),
            params={
                "format": "json",
                "per_page": 100,
                "mrv": max(5, pd.Timestamp.utcnow().year - settings.world_bank_start_year),
            },
            timeout=30,
        )
        response.raise_for_status()
        payload = response.json()
        entries = payload[1] if isinstance(payload, list) and len(payload) > 1 else []

        if not entries:
            continue

        frame = pd.DataFrame(entries)
        frame = frame.loc[frame["value"].notna()].copy()
        if frame.empty:
            continue

        frames.append(
            pd.DataFrame(
                {
                    "date": pd.to_datetime(frame["date"].astype(str) + "-01-01"),
                    "series_id": series_id,
                    "source": "World Bank",
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
