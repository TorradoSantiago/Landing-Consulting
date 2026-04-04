from __future__ import annotations

from pathlib import Path

import pandas as pd


def save_table(df: pd.DataFrame, destination_without_suffix: Path) -> None:
    destination_without_suffix.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(destination_without_suffix.with_suffix(".csv"), index=False)
    df.to_parquet(destination_without_suffix.with_suffix(".parquet"), index=False)


def load_table(destination_without_suffix: Path) -> pd.DataFrame | None:
    parquet_path = destination_without_suffix.with_suffix(".parquet")
    csv_path = destination_without_suffix.with_suffix(".csv")

    if parquet_path.exists():
        return pd.read_parquet(parquet_path)

    if csv_path.exists():
        return pd.read_csv(csv_path, parse_dates=["date"])

    return None
