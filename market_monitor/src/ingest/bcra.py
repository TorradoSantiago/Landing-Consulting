from __future__ import annotations

import logging

import pandas as pd
import requests

from src.config import BCRA_SERIES, PipelineSettings

LOGGER = logging.getLogger(__name__)
BASE_URL = "https://api.bcra.gob.ar/estadisticas/v4.0/monetarias"


def fetch_bcra_data(
    settings: PipelineSettings, session: requests.Session | None = None
) -> pd.DataFrame:
    client = session or requests.Session()
    frames: list[pd.DataFrame] = []
    end_date = pd.Timestamp.utcnow().date().isoformat()

    for series_id, metadata in BCRA_SERIES.items():
        response = client.get(
            f"{BASE_URL}/{metadata['id']}",
            params={
                "desde": settings.start_date,
                "hasta": end_date,
                "limit": 3000,
            },
            timeout=30,
        )
        response.raise_for_status()
        payload = response.json()
        rows = payload.get("results", [])

        if not rows:
            LOGGER.warning("BCRA returned no rows for %s", series_id)
            continue

        if len(rows) == 1 and "detalle" in rows[0]:
            frame = pd.DataFrame(rows[0]["detalle"])
        else:
            frame = pd.DataFrame(rows)

        frames.append(
            pd.DataFrame(
                {
                    "date": pd.to_datetime(frame["fecha"]),
                    "series_id": series_id,
                    "source": "BCRA",
                    "value": pd.to_numeric(frame["valor"], errors="coerce"),
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
