import Image from "next/image";
import Link from "next/link";

import { loadMarketMonitor } from "@/lib/market-monitor";

export const revalidate = 3600;

const SIGNAL_CARDS = [
  {
    key: "datos_inflation_mom",
    label: "Monthly inflation",
    context: "Useful for pricing, scenario notes, and local operating assumptions.",
    format: (value: number) => `${value.toFixed(2)}%`,
  },
  {
    key: "bcra_official_fx",
    label: "Official USD/ARS",
    context: "Useful for treasury context, market-entry timing, and budget framing.",
    format: (value: number) =>
      `$${value.toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })}`,
  },
  {
    key: "bcra_badlar",
    label: "BADLAR",
    context: "Useful for local rates context and short-form market commentary.",
    format: (value: number) => `${value.toFixed(2)}%`,
  },
];

const GOVERNANCE_ORDER = ["SG", "GB", "US", "BR", "AR"];

const CLIENT_USE_CASES = [
  {
    title: "Market-entry and country-risk briefs",
    detail:
      "Short memos that combine macro, jurisdiction, and sanctions context before a team commits time, capital, or partners.",
  },
  {
    title: "Compliance and screening support",
    detail:
      "Context layers for onboarding, sanctions screening, enhanced due-diligence notes, and control discussions.",
  },
  {
    title: "Executive materials",
    detail:
      "Deck-ready summaries for founders, managers, or consulting teams that need something sharper than a raw dashboard.",
  },
];

const DELIVERY_ITEMS = [
  "A concise market and risk brief built from public official sources",
  "Short-horizon signal interpretation for pricing, treasury, or operating decisions",
  "Jurisdiction and sanctions context for diligence, onboarding, and internal review",
  "Charts and commentary that can go into a deck, memo, or client note",
];

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatMetric(value: number | null) {
  if (value === null) {
    return "n/a";
  }

  return value.toFixed(2);
}

function formatInteger(value: number | null) {
  if (value === null) {
    return "n/a";
  }

  return value.toLocaleString("en-US");
}

export default async function MarketMonitorPage() {
  const monitor = await loadMarketMonitor();

  if (!monitor) {
    return (
      <main className="min-h-screen bg-[#f6f2ea] px-6 py-20 text-slate-900 sm:px-8">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-[#ddd3c4] bg-white p-10 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
          <p className="text-sm uppercase tracking-[0.22em] text-slate-500">
            Client-ready signals
          </p>
          <h1 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
            The page is ready, but the latest generated brief is not in place yet.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Once the weekly refresh runs, this page will show market, sanctions,
            and jurisdiction signals in a format that is easier to use in a
            consulting conversation.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full border border-[#d5c8b7] bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
          >
            Back to landing
          </Link>
        </div>
      </main>
    );
  }

  const { summary } = monitor;
  const financialCrime = summary.financial_crime;
  const governanceEntries = GOVERNANCE_ORDER.map((code) => ({
    code,
    ...financialCrime.governance.countries[code],
  })).filter((entry) => entry.name);

  return (
    <main className="min-h-screen bg-[#f6f2ea] text-slate-900">
      <section className="border-b border-[#ddd3c4] bg-[radial-gradient(circle_at_top_left,rgba(14,118,168,0.12),transparent_24%),radial-gradient(circle_at_top_right,rgba(196,108,58,0.14),transparent_30%)]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-4xl">
              <p className="inline-flex rounded-full border border-[#d9cfbf] bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-500">
                consulting-focused market and financial-crime intelligence
              </p>
              <h1 className="mt-8 font-[family:var(--font-display)] text-6xl leading-none text-slate-950 sm:text-7xl">
                Signals I can turn into a brief, memo, or risk note for your team.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                This page is built to show the kind of output I can produce for
                consulting, compliance, strategy, or research clients: current
                Argentina market context, global sanctions coverage, jurisdiction
                benchmarks, and short-horizon projections based on public data.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:santiagotorradouba@gmail.com?subject=Need%20an%20Argentina%20market%20or%20risk%20brief"
                  className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Request a client brief
                </a>
                <a
                  href="/market-monitor/report.md"
                  className="rounded-full border border-[#d5c8b7] bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
                >
                  Download latest brief
                </a>
                <a
                  href="/market-monitor/summary.json"
                  className="rounded-full border border-transparent px-4 py-3 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
                >
                  Open source snapshot
                </a>
              </div>
              <p className="mt-6 text-sm text-slate-500">
                Latest automated refresh: {formatDateTime(summary.run_timestamp)}
              </p>
            </div>

            <div className="rounded-[30px] border border-[#ddd3c4] bg-white/90 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                What companies can use this for
              </p>
              <div className="mt-6 space-y-4">
                {CLIENT_USE_CASES.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[22px] border border-[#ece3d7] bg-[#f8f5ef] p-5"
                  >
                    <h2 className="font-[family:var(--font-display)] text-3xl leading-none text-slate-950">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Argentina operating context
            </p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
              Current signals a client would care about
            </h2>
          </div>
          <Link
            href="/"
            className="rounded-full border border-[#d5c8b7] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
          >
            Back to landing
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {SIGNAL_CARDS.map((card) => {
            const observation = summary.latest_observations[card.key];
            if (!observation) {
              return null;
            }

            return (
              <article
                key={card.key}
                className="rounded-[24px] border border-[#ddd3c4] bg-white p-6 shadow-[0_8px_24px_rgba(24,32,43,0.04)]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {card.label}
                </p>
                <p className="mt-3 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
                  {card.format(observation.value)}
                </p>
                <p className="mt-3 text-xs text-slate-400">{observation.date}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {card.context}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-[#ddd3c4] bg-white p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    Forecast-ready view
                  </p>
                  <h2 className="mt-3 font-[family:var(--font-display)] text-4xl leading-none text-slate-950">
                    What I would hand to a client today
                  </h2>
                </div>
                <p className="text-sm text-slate-500">
                  Horizon: {summary.forecast_horizon_months}-month working outlook
                </p>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {Object.entries(summary.selected_models).map(([key, model]) => (
                  <article
                    key={key}
                    className="rounded-[22px] border border-[#e3dbd0] bg-[#f8f5ef] p-6"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {model.display_name}
                    </p>
                    <p className="mt-2 font-[family:var(--font-display)] text-3xl leading-none text-slate-950">
                      {model.label}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      Useful as a short-horizon reference when a team needs a
                      defendable starting point, not a grand macro claim.
                    </p>
                    <div className="mt-4 flex gap-6 text-sm text-slate-600">
                      <span>MAE {formatMetric(model.mae)}</span>
                      <span>RMSE {formatMetric(model.rmse)}</span>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      {model.forecast.map((point) => (
                        <div
                          key={`${key}-${point.date}`}
                          className="flex items-center justify-between rounded-xl border border-white bg-white px-4 py-3"
                        >
                          <span>{point.date}</span>
                          <strong className="text-slate-950">
                            {point.value.toFixed(2)}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-[#ddd3c4] bg-white p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    Global financial-crime snapshot
                  </p>
                  <h2 className="mt-3 font-[family:var(--font-display)] text-4xl leading-none text-slate-950">
                    Sanctions and jurisdiction signals that matter in real client work
                  </h2>
                </div>
                <p className="text-sm text-slate-500">
                  Live where possible, snapshot where official access is protected
                </p>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-[22px] border border-[#e3dbd0] bg-[#f8f5ef] p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    OFAC SDN entries
                  </p>
                  <p className="mt-3 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
                    {formatInteger(financialCrime.sanctions.ofac.entries)}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Official U.S. sanctions list. Useful for screening scope and
                    sanctions-aware diligence discussions.
                  </p>
                  <a
                    href={financialCrime.sanctions.ofac.url}
                    className="mt-4 inline-flex text-xs font-semibold text-slate-700 underline-offset-4 hover:underline"
                  >
                    Source
                  </a>
                </article>

                <article className="rounded-[22px] border border-[#e3dbd0] bg-[#f8f5ef] p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    OFAC programs
                  </p>
                  <p className="mt-3 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
                    {formatInteger(financialCrime.sanctions.ofac.programs)}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    A fast proxy for breadth across sanctions regimes and policy exposure.
                  </p>
                </article>

                <article className="rounded-[22px] border border-[#e3dbd0] bg-[#f8f5ef] p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    UN consolidated entries
                  </p>
                  <p className="mt-3 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
                    {formatInteger(financialCrime.sanctions.un.total)}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Multilateral list coverage for cross-border screening and diligence support.
                  </p>
                  <a
                    href={financialCrime.sanctions.un.url}
                    className="mt-4 inline-flex text-xs font-semibold text-slate-700 underline-offset-4 hover:underline"
                  >
                    Source
                  </a>
                </article>

                <article className="rounded-[22px] border border-[#e3dbd0] bg-[#f8f5ef] p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    FATF monitored jurisdictions
                  </p>
                  <p className="mt-3 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
                    {financialCrime.fatf.grey_list_count}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Verified snapshot from {formatDate(financialCrime.fatf.snapshot_date)} with {financialCrime.fatf.high_risk_count} high-risk jurisdictions.
                  </p>
                  <a
                    href={financialCrime.fatf.grey_list_url}
                    className="mt-4 inline-flex text-xs font-semibold text-slate-700 underline-offset-4 hover:underline"
                  >
                    Snapshot source
                  </a>
                </article>
              </div>
            </section>

            <section className="rounded-[28px] border border-[#ddd3c4] bg-white p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Public charts
              </p>
              <h2 className="mt-3 font-[family:var(--font-display)] text-4xl leading-none text-slate-950">
                A sample of the visual output I can package for decision-makers
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                The point is not to overwhelm a client with models. The point is to
                turn public data into a concise, defensible visual layer that helps
                a team move faster.
              </p>

              <div className="mt-8 grid gap-4 xl:grid-cols-2">
                {summary.chart_files.map((chart) => (
                  <article
                    key={chart}
                    className="overflow-hidden rounded-[28px] border border-[#ddd3c4] bg-white shadow-[0_8px_24px_rgba(24,32,43,0.04)]"
                  >
                    <Image
                      src={`/market-monitor/charts/${chart}`}
                      alt={chart.replaceAll("_", " ").replace(".png", "")}
                      width={1600}
                      height={800}
                      className="h-auto w-full"
                    />
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-[28px] border border-[#ddd3c4] bg-white p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                What you would receive
              </p>
              <div className="mt-5 space-y-3">
                {DELIVERY_ITEMS.map((item) => (
                  <div
                    key={item}
                    className="rounded-[18px] border border-[#ece3d7] bg-[#f8f5ef] px-4 py-3 text-sm leading-7 text-slate-600"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-[#ddd3c4] bg-white p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Jurisdiction benchmark
              </p>
              <h2 className="mt-3 font-[family:var(--font-display)] text-4xl leading-none text-slate-950">
                Control of corruption percentile rank
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Useful when clients need country-risk context around governance,
                oversight, and institutional quality, not just list screening.
              </p>
              <div className="mt-6 space-y-4">
                {governanceEntries.map((entry) => (
                  <article key={entry.code}>
                    <div className="flex items-center justify-between text-sm text-slate-700">
                      <span>{entry.name}</span>
                      <strong>{entry.percentile_rank.toFixed(1)} / 100</strong>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-[#ece3d7]">
                      <div
                        className="h-2 rounded-full bg-[#123d72]"
                        style={{ width: `${entry.percentile_rank}%` }}
                      />
                    </div>
                  </article>
                ))}
              </div>
              <a
                href={financialCrime.governance.url}
                className="mt-5 inline-flex text-xs font-semibold text-slate-700 underline-offset-4 hover:underline"
              >
                World Bank source
              </a>
            </section>

            <section className="rounded-[28px] border border-[#ddd3c4] bg-white p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Relevant public bases
              </p>
              <div className="mt-5 space-y-4">
                {financialCrime.public_bases.map((base) => (
                  <article
                    key={base.label}
                    className="rounded-[20px] border border-[#ece3d7] bg-[#f8f5ef] p-4"
                  >
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      {base.category}
                    </p>
                    <h3 className="mt-2 font-[family:var(--font-display)] text-2xl leading-none text-slate-950">
                      {base.label}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {base.description}
                    </p>
                    <a
                      href={base.url}
                      className="mt-3 inline-flex text-xs font-semibold text-slate-700 underline-offset-4 hover:underline"
                    >
                      Open source
                    </a>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-[#ddd3c4] bg-white p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Source health
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {summary.source_status.map((source) => (
                  <span
                    key={source.source}
                    className="rounded-full border border-[#ddd3c4] bg-[#f8f5ef] px-3 py-1 text-xs font-medium text-slate-700"
                    title={source.note ?? ""}
                  >
                    {source.source}: {source.status}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
