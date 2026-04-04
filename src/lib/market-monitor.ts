import { promises as fs } from "node:fs";
import path from "node:path";

export type MonitorSourceStatus = {
  source: string;
  status: string;
  rows?: number;
  note?: string;
};

export type MonitorObservation = {
  date: string;
  value: number;
};

export type MonitorForecastPoint = {
  date: string;
  value: number;
};

export type SelectedModel = {
  display_name: string;
  name: string;
  label: string;
  mae: number | null;
  rmse: number | null;
  used_exog: string[];
  forecast: MonitorForecastPoint[];
};

export type FinancialCrimeSummary = {
  sanctions: {
    ofac: {
      entries: number | null;
      programs: number | null;
      published_on: string | null;
      url: string;
    };
    un: {
      individuals: number | null;
      entities: number | null;
      total: number | null;
      generated_at: string | null;
      url: string;
    };
  };
  fatf: {
    snapshot_date: string;
    grey_list_count: number;
    high_risk_count: number;
    grey_list: string[];
    high_risk: string[];
    grey_list_url: string;
    high_risk_url: string;
  };
  governance: {
    year: string | null;
    source_updated: string | null;
    countries: Record<
      string,
      {
        name: string;
        percentile_rank: number;
      }
    >;
    url: string;
  };
  public_bases: Array<{
    category: string;
    label: string;
    description: string;
    url: string;
  }>;
};

export type MarketMonitorSummary = {
  run_timestamp: string;
  targets: string[];
  latest_observations: Record<string, MonitorObservation>;
  forecast_horizon_months: number;
  model_metrics: Record<
    string,
    Record<string, { mae: number | null; rmse: number | null; n_test_points: number }>
  >;
  selected_models: Record<string, SelectedModel>;
  financial_crime: FinancialCrimeSummary;
  source_status: MonitorSourceStatus[];
  chart_files: string[];
};

export type MarketMonitorData = {
  summary: MarketMonitorSummary;
  report: string;
  reportSections: Record<string, string[]>;
};

function parseReportSections(markdown: string) {
  const sections: Record<string, string[]> = {};
  let current = "Overview";

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line) {
      continue;
    }

    if (line.startsWith("## ")) {
      current = line.slice(3);
      sections[current] = [];
      continue;
    }

    if (line.startsWith("# ")) {
      continue;
    }

    if (!sections[current]) {
      sections[current] = [];
    }

    sections[current].push(line.replace(/^- /, ""));
  }

  return sections;
}

export async function loadMarketMonitor(): Promise<MarketMonitorData | null> {
  const monitorDir = path.join(process.cwd(), "public", "market-monitor");

  try {
    const [summaryRaw, report] = await Promise.all([
      fs.readFile(path.join(monitorDir, "summary.json"), "utf-8"),
      fs.readFile(path.join(monitorDir, "report.md"), "utf-8"),
    ]);

    const summary = JSON.parse(summaryRaw) as MarketMonitorSummary;
    return {
      summary,
      report,
      reportSections: parseReportSections(report),
    };
  } catch {
    return null;
  }
}
