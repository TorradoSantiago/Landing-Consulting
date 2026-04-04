from __future__ import annotations

from datetime import datetime


def _format_number(value: float) -> str:
    return f"{value:,.2f}"


def render_report(summary: dict[str, object]) -> str:
    timestamp = datetime.fromisoformat(summary["run_timestamp"])
    latest = summary["latest_observations"]
    selected_models = summary["selected_models"]
    source_status = summary["source_status"]
    financial_crime = summary["financial_crime"]

    live_count = sum(1 for source in source_status if source["status"] == "live")
    fallback_count = sum(1 for source in source_status if source["status"] == "fallback")
    skipped_count = sum(1 for source in source_status if source["status"] == "skipped")

    inflation = latest.get("datos_inflation_mom")
    official_fx = latest.get("bcra_official_fx")
    inflation_model = selected_models["datos_inflation_mom"]
    fx_model = selected_models["bcra_official_fx"]
    ofac = financial_crime["sanctions"]["ofac"]
    un_list = financial_crime["sanctions"]["un"]
    fatf = financial_crime["fatf"]

    inflation_forecast = ", ".join(
        f"{entry['date']}: {_format_number(entry['value'])}"
        for entry in inflation_model["forecast"]
    )
    fx_forecast = ", ".join(
        f"{entry['date']}: {_format_number(entry['value'])}"
        for entry in fx_model["forecast"]
    )

    risks = []
    if "bcra_official_fx_mom" in latest:
        risks.append(
            f"Official FX monthly change last printed {_format_number(latest['bcra_official_fx_mom']['value'])}, which may affect short-term inflation momentum."
        )
    if "fred_vix" in latest:
        risks.append(
            f"Global volatility proxy VIX is at {_format_number(latest['fred_vix']['value'])}, so external financial conditions should still be monitored."
        )
    if "bcra_badlar" in latest:
        risks.append(
            f"BADLAR stands at {_format_number(latest['bcra_badlar']['value'])}, keeping domestic rates as a key local conditioning variable."
        )

    methodology_sources = ", ".join(source["source"] for source in source_status)

    inflation_line = (
        f"- Monthly inflation: {_format_number(inflation['value'])} on {inflation['date']}."
        if inflation
        else "- Monthly inflation: unavailable in this run."
    )
    fx_line = (
        f"- Official USD/ARS: {_format_number(official_fx['value'])} on {official_fx['date']}."
        if official_fx
        else "- Official USD/ARS: unavailable in this run."
    )
    inflation_model_line = (
        f"- Selected model for inflation: {inflation_model['label']} (MAE {_format_number(inflation_model['mae'])})."
        if inflation_model["mae"] is not None
        else f"- Selected model for inflation: {inflation_model['label']}."
    )
    fx_model_line = (
        f"- Selected model for official USD/ARS: {fx_model['label']} (MAE {_format_number(fx_model['mae'])})."
        if fx_model["mae"] is not None
        else f"- Selected model for official USD/ARS: {fx_model['label']}."
    )
    inflation_forecast_line = (
        f"- Inflation forecast path: {inflation_forecast}."
        if inflation_model["forecast"]
        else "- Inflation forecast path: unavailable in this run."
    )
    fx_forecast_line = (
        f"- Official USD/ARS forecast path: {fx_forecast}."
        if fx_model["forecast"]
        else "- Official USD/ARS forecast path: unavailable in this run."
    )

    return f"""# Argentina Market Monitor

Run timestamp: {timestamp.strftime("%Y-%m-%d %H:%M:%S")}

## What changed this week

- The pipeline refreshed public data and updated the monthly analytical layer.
- Live sources: {live_count}. Fallback sources: {fallback_count}. Skipped sources: {skipped_count}.
- The two v1 forecast targets remain monthly inflation and official USD/ARS.
- Financial-crime coverage refreshed around sanctions screening, FATF monitoring, and governance benchmarks.

## Latest readings

{inflation_line}
{fx_line}
{inflation_model_line}
{fx_model_line}

## Model outlook

{inflation_forecast_line}
{fx_forecast_line}

## Risks to the base case

{chr(10).join(f"- {risk}" for risk in risks) if risks else "- Risk commentary stayed neutral because there were not enough corroborating public signals beyond the targets."}

## Global financial crime signals

- OFAC SDN coverage: {ofac['entries'] if ofac['entries'] is not None else 'unavailable'} entries across {ofac['programs'] if ofac['programs'] is not None else 'unavailable'} programs{f" (published {ofac['published_on']})" if ofac['published_on'] else ""}.
- UN consolidated sanctions list: {un_list['total'] if un_list['total'] is not None else 'unavailable'} total entries{f" (generated {un_list['generated_at']})" if un_list['generated_at'] else ""}.
- FATF monitored jurisdictions snapshot: {fatf['grey_list_count']} grey-list jurisdictions and {fatf['high_risk_count']} high-risk jurisdictions in the verified {fatf['snapshot_date']} snapshot.

## How this supports client work

- Turn public data into concise market-entry, country-risk, or screening-support briefs.
- Add a lightweight sanctions and jurisdictional context layer to consulting decks, diligence memos, and onboarding reviews.
- Show clients the difference between live official feeds, validated snapshots, and slow-moving structural benchmarks.

## Methodology note

- Sources used: {methodology_sources}.
- All series are standardized to a monthly analytical layer.
- Models included: naive baseline, 3-month moving average, and SARIMAX.
- Backtesting uses rolling one-step evaluation over the latest valid windows with MAE and RMSE.
- Forecast exogenous inputs are held constant at the latest observed lagged values for the 3-month horizon.
"""
