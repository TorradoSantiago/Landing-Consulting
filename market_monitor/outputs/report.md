# Argentina Market Monitor

Run timestamp: 2026-04-20 13:47:09

## What changed this week

- The pipeline refreshed public data and updated the monthly analytical layer.
- Live sources: 5. Fallback sources: 0. Skipped sources: 1.
- The two v1 forecast targets remain monthly inflation and official USD/ARS.
- Financial-crime coverage refreshed around sanctions screening, FATF monitoring, and governance benchmarks.

## Latest readings

- Monthly inflation: 3.38 on 2026-03-31.
- Official USD/ARS: 1,409.48 on 2026-03-31.
- Selected model for inflation: Naive baseline (MAE 0.74).
- Selected model for official USD/ARS: Naive baseline (MAE 29.68).

## Model outlook

- Inflation forecast path: 2026-03-31: 2.90, 2026-04-30: 2.90, 2026-05-31: 2.90.
- Official USD/ARS forecast path: 2026-04-30: 1,409.48, 2026-05-31: 1,409.48, 2026-06-30: 1,409.48.

## Risks to the base case

- Official FX monthly change last printed -1.19, which may affect short-term inflation momentum.
- BADLAR stands at 27.57, keeping domestic rates as a key local conditioning variable.

## Global financial crime signals

- OFAC SDN coverage: 18758 entries across 73 programs (published 04/17/2026).
- UN consolidated sanctions list: 1005 total entries (generated 2026-04-20T08:11:12.754Z).
- FATF monitored jurisdictions snapshot: 22 grey-list jurisdictions and 3 high-risk jurisdictions in the verified 2026-02-13 snapshot.

## How this supports client work

- Turn public data into concise market-entry, country-risk, or screening-support briefs.
- Add a lightweight sanctions and jurisdictional context layer to consulting decks, diligence memos, and onboarding reviews.
- Show clients the difference between live official feeds, validated snapshots, and slow-moving structural benchmarks.

## Methodology note

- Sources used: bcra, datos_gob_ar, fred, world_bank, fatf_snapshot, ofac_sdn, un_consolidated, world_bank_governance.
- All series are standardized to a monthly analytical layer.
- Models included: naive baseline, 3-month moving average, and SARIMAX.
- Backtesting uses rolling one-step evaluation over the latest valid windows with MAE and RMSE.
- Forecast exogenous inputs are held constant at the latest observed lagged values for the 3-month horizon.
