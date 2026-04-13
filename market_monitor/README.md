# Argentina Market Monitor

Weekly Argentina macro and market monitor embedded inside the `Landing-Consulting` repository. The project turns public data into a repeatable research asset: data ingestion, cleaning, light forecasting, chart generation, and a portfolio-ready Markdown brief.

<!-- LAST_UPDATED_START -->
Last updated: 2026-04-13T13:43:35+00:00
<!-- LAST_UPDATED_END -->

## Project purpose

The monitor is designed to publish fresh evidence of applied economics and market intelligence work. Each run downloads public data, standardizes the time series into a common monthly layer, estimates simple forecasting models, and writes updated outputs that can be surfaced by the website.

## Data sources

- BCRA public monetary statistics
- datos.gob.ar time-series API
- FRED API
- World Bank Indicators API

## Pipeline overview

Run the full pipeline from the `market_monitor` directory:

```bash
python -m src.pipeline
```

The pipeline:

1. pulls source data;
2. stores raw tables in `data/raw`;
3. harmonizes frequency into a monthly long table in `data/processed`;
4. builds a feature panel in `data/features`;
5. runs baseline and SARIMAX forecasts;
6. generates charts, `report.md`, and `summary.json`;
7. mirrors public artifacts into `../public/market-monitor`.

## Modeling approach

- Naive baseline
- 3-month moving-average baseline
- SARIMAX with a fixed exogenous set
- Rolling backtest with MAE and RMSE

The v1 targets are:

- monthly inflation
- official USD/ARS level

## Outputs

- `outputs/report.md`
- `outputs/summary.json`
- `outputs/charts/*.png`
- `public/market-monitor/*`

## Why this matters

This project is useful for portfolio positioning because it combines:

- data ingestion from real public APIs;
- explicit cleaning and feature engineering;
- simple but defensible forecasting;
- automated reporting that reads like a research deliverable;
- a publication loop that feeds a public-facing site.

That combination is relevant for roles in data analytics, economics, strategy, market intelligence, and applied research.
