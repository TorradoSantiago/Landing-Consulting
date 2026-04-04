from __future__ import annotations

from dataclasses import replace

from src.ingest.bcra import fetch_bcra_data
from src.ingest.datos_gob_ar import fetch_datos_gob_ar_data
from src.ingest.fred import fetch_fred_data
from src.ingest.world_bank import fetch_world_bank_data


class MockResponse:
    def __init__(self, payload: object) -> None:
        self.payload = payload

    def json(self) -> object:
        return self.payload

    def raise_for_status(self) -> None:
        return None


class BcraSession:
    def get(self, url: str, params: dict[str, object], timeout: int) -> MockResponse:
        del params, timeout
        payloads = {
            "/1": {"results": [{"detalle": [{"fecha": "2026-01-31", "valor": 25000}]}]},
            "/4": {"results": [{"detalle": [{"fecha": "2026-01-31", "valor": 1100}]}]},
            "/7": {"results": [{"detalle": [{"fecha": "2026-01-31", "valor": 32}]}]},
            "/160": {"results": [{"detalle": [{"fecha": "2026-01-31", "valor": 29}]}]},
        }
        for suffix, payload in payloads.items():
            if url.endswith(suffix):
                return MockResponse(payload)
        return MockResponse({"results": []})


class SinglePayloadSession:
    def __init__(self, payload: object) -> None:
        self.payload = payload

    def get(self, url: str, params: dict[str, object], timeout: int) -> MockResponse:
        del url, params, timeout
        return MockResponse(self.payload)


def test_fetch_bcra_data_contract(pipeline_settings) -> None:
    frame = fetch_bcra_data(pipeline_settings, session=BcraSession())
    assert list(frame.columns) == ["date", "series_id", "source", "value", "frequency", "unit"]
    assert set(frame["series_id"]) == {
        "bcra_official_fx",
        "bcra_reserves",
        "bcra_badlar",
        "bcra_policy_rate",
    }


def test_fetch_datos_data_contract(pipeline_settings) -> None:
    session = SinglePayloadSession(
        {
            "data": [
                ["2026-01-01", 2.2, 150.0, 123.5],
                ["2026-02-01", 2.4, 154.0, 124.0],
            ]
        }
    )
    frame = fetch_datos_gob_ar_data(pipeline_settings, session=session)
    assert list(frame.columns) == ["date", "series_id", "source", "value", "frequency", "unit"]
    assert frame["series_id"].nunique() == 3


def test_fetch_fred_data_contract(pipeline_settings) -> None:
    session = SinglePayloadSession(
        {
            "observations": [
                {"date": "2026-01-31", "value": "4.3"},
                {"date": "2026-02-28", "value": "4.4"},
            ]
        }
    )
    frame = fetch_fred_data(pipeline_settings, session=session)
    assert list(frame.columns) == ["date", "series_id", "source", "value", "frequency", "unit"]
    assert frame["series_id"].nunique() == 3


def test_fetch_world_bank_data_contract(pipeline_settings) -> None:
    payload = [
        {"lastupdated": "2026-01-01"},
        [
            {"date": "2024", "value": 2.3},
            {"date": "2023", "value": 1.8},
        ],
    ]
    frame = fetch_world_bank_data(pipeline_settings, session=SinglePayloadSession(payload))
    assert list(frame.columns) == ["date", "series_id", "source", "value", "frequency", "unit"]
    assert frame["series_id"].nunique() == 2


def test_fetch_fred_without_key_returns_empty(pipeline_settings) -> None:
    frame = fetch_fred_data(replace(pipeline_settings, fred_api_key=None))
    assert frame.empty
