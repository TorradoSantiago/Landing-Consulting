from __future__ import annotations

from src.pipeline import run_pipeline


def test_pipeline_smoke(
    sample_source_frames, pipeline_settings, financial_crime_fixture
) -> None:
    summary = run_pipeline(
        settings_override=pipeline_settings,
        preloaded_sources=sample_source_frames,
        financial_crime_override=financial_crime_fixture,
    )

    assert summary["targets"] == ["datos_inflation_mom", "bcra_official_fx"]
    assert "financial_crime" in summary
    assert (pipeline_settings.outputs_dir / "report.md").exists()
    assert (pipeline_settings.outputs_dir / "summary.json").exists()
    assert any(pipeline_settings.charts_dir.glob("*.png"))
