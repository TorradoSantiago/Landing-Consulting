from __future__ import annotations

from pathlib import Path

import matplotlib

matplotlib.use("Agg")

import matplotlib.pyplot as plt
import pandas as pd


def _plot_target_forecast(result: dict[str, object], destination: Path) -> None:
    history = pd.DataFrame(result["history"])
    forecast = pd.DataFrame(result["selected_model"]["forecast"])

    fig, ax = plt.subplots(figsize=(10, 5))

    if not history.empty:
        history["date"] = pd.to_datetime(history["date"])
        ax.plot(
            history["date"],
            history["value"],
            label="History",
            linewidth=2.2,
            color="#0f172a",
        )

    if not forecast.empty:
        forecast["date"] = pd.to_datetime(forecast["date"])
        ax.plot(
            forecast["date"],
            forecast["value"],
            label="Forecast",
            linewidth=2.2,
            linestyle="--",
            color="#c2410c",
        )

    if history.empty and forecast.empty:
        ax.text(0.5, 0.5, "No forecast available", ha="center", va="center")
        ax.axis("off")

    ax.set_title(result["display_name"])
    ax.set_ylabel("Value")
    ax.grid(alpha=0.2)
    if not history.empty or not forecast.empty:
        ax.legend()
    fig.tight_layout()
    fig.savefig(destination, dpi=160)
    plt.close(fig)


def _plot_metrics(results: dict[str, dict[str, object]], destination: Path) -> None:
    rows: list[dict[str, object]] = []
    for target_key, result in results.items():
        for model_name, metrics in result["metrics"].items():
            if metrics["mae"] is None:
                continue
            rows.append(
                {
                    "target": result["display_name"],
                    "model": model_name,
                    "mae": metrics["mae"],
                }
            )

    frame = pd.DataFrame(rows)
    fig, ax = plt.subplots(figsize=(10, 5))

    if frame.empty:
        ax.text(0.5, 0.5, "No model metrics available", ha="center", va="center")
        ax.axis("off")
    else:
        pivot = frame.pivot(index="target", columns="model", values="mae").fillna(0)
        pivot.plot(kind="bar", ax=ax, color=["#0f766e", "#0ea5e9", "#f97316"])
        ax.set_title("Backtest MAE by target and model")
        ax.set_ylabel("MAE")
        ax.grid(axis="y", alpha=0.2)
        ax.legend(title="Model")

    fig.tight_layout()
    fig.savefig(destination, dpi=160)
    plt.close(fig)


def _plot_macro_snapshot(panel: pd.DataFrame, destination: Path) -> None:
    snapshot_columns = [
        ("datos_inflation_mom", "Monthly inflation"),
        ("bcra_official_fx", "Official USD/ARS"),
        ("bcra_badlar", "BADLAR"),
        ("datos_emae_mom", "EMAE MoM"),
    ]
    available = [(column, label) for column, label in snapshot_columns if column in panel.columns]

    if not available:
        fig, axis = plt.subplots(figsize=(10, 4))
        axis.text(0.5, 0.5, "No snapshot series available", ha="center", va="center")
        axis.axis("off")
        fig.tight_layout()
        fig.savefig(destination, dpi=160)
        plt.close(fig)
        return

    fig, axes = plt.subplots(len(available), 1, figsize=(10, 3 * len(available)))
    if len(available) == 1:
        axes = [axes]

    for axis, (column, label) in zip(axes, available, strict=True):
        series = panel[column].dropna().tail(24)
        axis.plot(series.index, series.values, color="#1d4ed8", linewidth=2)
        axis.set_title(label)
        axis.grid(alpha=0.2)

    fig.tight_layout()
    fig.savefig(destination, dpi=160)
    plt.close(fig)


def create_charts(
    panel: pd.DataFrame,
    model_results: dict[str, dict[str, object]],
    charts_dir: Path,
) -> list[str]:
    charts_dir.mkdir(parents=True, exist_ok=True)
    chart_files: list[str] = []

    for target_key, result in model_results.items():
        destination = charts_dir / f"{target_key}_forecast.png"
        _plot_target_forecast(result, destination)
        chart_files.append(destination.name)

    metrics_destination = charts_dir / "model_metrics.png"
    _plot_metrics(model_results, metrics_destination)
    chart_files.append(metrics_destination.name)

    snapshot_destination = charts_dir / "macro_snapshot.png"
    _plot_macro_snapshot(panel, snapshot_destination)
    chart_files.append(snapshot_destination.name)

    return chart_files
