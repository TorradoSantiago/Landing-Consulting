from __future__ import annotations

import json
import shutil
from pathlib import Path


def write_summary(summary: dict[str, object], destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(summary, indent=2), encoding="utf-8")


def write_report(report_markdown: str, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(report_markdown, encoding="utf-8")


def update_readme_timestamp(readme_path: Path, run_timestamp: str) -> None:
    if not readme_path.exists():
        return

    content = readme_path.read_text(encoding="utf-8")
    start_marker = "<!-- LAST_UPDATED_START -->"
    end_marker = "<!-- LAST_UPDATED_END -->"

    if start_marker not in content or end_marker not in content:
        return

    prefix, remainder = content.split(start_marker, maxsplit=1)
    _, suffix = remainder.split(end_marker, maxsplit=1)
    replacement = f"{start_marker}\nLast updated: {run_timestamp}\n{end_marker}"
    readme_path.write_text(prefix + replacement + suffix, encoding="utf-8")


def publish_public_artifacts(
    outputs_dir: Path,
    charts_dir: Path,
    public_dir: Path,
    public_charts_dir: Path,
) -> None:
    public_dir.mkdir(parents=True, exist_ok=True)
    public_charts_dir.mkdir(parents=True, exist_ok=True)

    for filename in ("report.md", "summary.json"):
        shutil.copy2(outputs_dir / filename, public_dir / filename)

    for chart in charts_dir.glob("*.png"):
        shutil.copy2(chart, public_charts_dir / chart.name)
