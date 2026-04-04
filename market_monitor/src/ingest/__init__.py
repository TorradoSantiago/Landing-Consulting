"""Source connectors for public APIs."""

from src.ingest.bcra import fetch_bcra_data
from src.ingest.datos_gob_ar import fetch_datos_gob_ar_data
from src.ingest.fred import fetch_fred_data
from src.ingest.financial_crime import fetch_financial_crime_snapshot
from src.ingest.storage import load_table, save_table
from src.ingest.world_bank import fetch_world_bank_data

__all__ = [
    "fetch_bcra_data",
    "fetch_datos_gob_ar_data",
    "fetch_fred_data",
    "fetch_financial_crime_snapshot",
    "fetch_world_bank_data",
    "load_table",
    "save_table",
]
