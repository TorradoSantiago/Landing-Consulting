"use client";

import { useState } from "react";

import type {
  CountryCode,
  ObservatoryData,
  SourceStatus,
} from "@/lib/observatory";

type Tab = "argentina" | "world" | "compliance";

const COUNTRY_META: Record<CountryCode, { name: string; shortLabel: string }> = {
  AR: { name: "Argentina", shortLabel: "AR" },
  US: { name: "United States", shortLabel: "US" },
  CN: { name: "China", shortLabel: "CN" },
  IN: { name: "India", shortLabel: "IN" },
  DE: { name: "Germany", shortLabel: "DE" },
  GB: { name: "United Kingdom", shortLabel: "UK" },
  BR: { name: "Brazil", shortLabel: "BR" },
};

const GDP_ORDER: CountryCode[] = ["US", "CN", "IN", "DE", "GB", "BR", "AR"];

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })}`;
}

function formatPercent(value: number, digits = 1) {
  return `${value.toFixed(digits)}%`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function statusStyles(status: SourceStatus) {
  if (status === "live") {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }

  if (status === "fallback") {
    return "border-amber-200 bg-amber-50 text-amber-800";
  }

  return "border-slate-200 bg-slate-100 text-slate-700";
}

function IndicatorCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <article className="rounded-[22px] border border-[#e3dbd0] bg-white/90 p-6 shadow-[0_8px_24px_rgba(24,32,43,0.04)]">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p
        className={`mt-2 font-[family:var(--font-display)] text-5xl leading-none ${color}`}
      >
        {value}
      </p>
      <p className="mt-3 text-xs text-slate-400">{sub}</p>
    </article>
  );
}

export function DataObservatoryClient({
  initialData,
}: {
  initialData: ObservatoryData;
}) {
  const [tab, setTab] = useState<Tab>("argentina");

  return (
    <section className="border-y border-[#e6ddd0] bg-[#f0ece4]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Data Observatory
            </p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
              Public data signals that support the positioning
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Rendered server-side on {formatDateTime(initialData.fetchedAt)}.
            </p>
          </div>

          <div className="flex self-start rounded-full border border-[#ddd3c4] bg-white/90 p-1 text-sm font-medium">
            <button
              onClick={() => setTab("argentina")}
              className={`rounded-full px-5 py-2 transition ${
                tab === "argentina"
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Argentina
            </button>
            <button
              onClick={() => setTab("world")}
              className={`rounded-full px-5 py-2 transition ${
                tab === "world"
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              World
            </button>
            <button
              onClick={() => setTab("compliance")}
              className={`rounded-full px-5 py-2 transition ${
                tab === "compliance"
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Compliance
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {initialData.sources.map((source) => (
            <span
              key={source.key}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyles(
                source.status
              )}`}
              title={source.note}
            >
              {source.label}: {source.status}
            </span>
          ))}
        </div>

        {tab === "argentina" && (
          <div className="mt-10 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <IndicatorCard
                label="USD / ARS - Official"
                value={formatCurrency(initialData.argentina.fx.official.average)}
                sub={`Buy ${formatCurrency(initialData.argentina.fx.official.buy)} - Sell ${formatCurrency(initialData.argentina.fx.official.sell)}`}
                color="text-blue-700"
              />
              <IndicatorCard
                label="USD / ARS - Blue"
                value={formatCurrency(initialData.argentina.fx.blue.average)}
                sub={`Buy ${formatCurrency(initialData.argentina.fx.blue.buy)} - Sell ${formatCurrency(initialData.argentina.fx.blue.sell)}`}
                color="text-indigo-600"
              />
              <IndicatorCard
                label="Annual Inflation"
                value={formatPercent(initialData.argentina.annualInflation.value, 0)}
                sub={`World Bank CPI - ${initialData.argentina.annualInflation.year}`}
                color="text-rose-600"
              />
              <IndicatorCard
                label="12-Month Inflation Expectation"
                value={formatPercent(initialData.argentina.inflationExpectation.value, 0)}
                sub={`UTDT via datos.gob.ar - ${formatDate(initialData.argentina.inflationExpectation.period)}`}
                color="text-orange-600"
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-[22px] border border-[#e3dbd0] bg-white/90 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      UTDT Consumer Confidence Index
                    </p>
                    <p className="mt-2 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
                      {initialData.argentina.consumerConfidence.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {initialData.argentina.consumerConfidence.period}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#fdf4ec] px-3 py-1 text-xs text-orange-700">
                    Curated
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  A practical consumer sentiment signal to complement FX and
                  inflation. Kept as a curated reference because the landing
                  should stay reliable even when public university pages change.
                </p>
                <a
                  href={initialData.argentina.consumerConfidence.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-xs font-semibold text-slate-700 underline-offset-4 hover:underline"
                >
                  View UTDT release
                </a>
              </article>

              <article className="rounded-[22px] border border-[#e3dbd0] bg-white/90 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      RIGI
                    </p>
                    <p className="mt-2 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
                      {initialData.argentina.rigi.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {initialData.argentina.rigi.period}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#eef7ee] px-3 py-1 text-xs text-green-700">
                    Policy signal
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Large-investment policy context matters when the positioning
                  touches capital flows, sector exposure, and higher-scrutiny
                  compliance environments.
                </p>
                <a
                  href={initialData.argentina.rigi.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-xs font-semibold text-slate-700 underline-offset-4 hover:underline"
                >
                  Read the official text
                </a>
              </article>
            </div>

            <div className="rounded-[22px] border border-[#e3dbd0] bg-white/90 px-6 py-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Why these sources
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Bluelytics, World Bank, and datos.gob.ar are low-friction,
                    public, and stable enough for a portfolio site. They make the
                    page feel alive without asking prospects to trust screenshots.
                  </p>
                </div>
                <a
                  href="/api/observatory"
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-full border border-[#ddd3c4] bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
                >
                  Open local API payload
                </a>
              </div>
            </div>
          </div>
        )}

        {tab === "world" && (
          <div className="mt-10 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              GDP growth - annual percent - World Bank WDI
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {GDP_ORDER.map((code) => {
                const meta = COUNTRY_META[code];
                const entry = initialData.world.gdpGrowth[code];
                const isPositive = entry.value >= 0;

                return (
                  <article
                    key={code}
                    className="rounded-[22px] border border-[#e3dbd0] bg-white/90 p-6 shadow-[0_8px_24px_rgba(24,32,43,0.04)]"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {meta.shortLabel} {meta.name}
                    </p>
                    <p
                      className={`mt-2 font-[family:var(--font-display)] text-5xl leading-none ${
                        isPositive ? "text-slate-950" : "text-rose-600"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {entry.value.toFixed(1)}%
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                      {entry.year} - World Bank
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <article className="rounded-[22px] border border-[#e3dbd0] bg-white/90 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Why this matters
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Cross-border growth, slowdown, and divergence are useful
                  signals when the positioning spans fintech, compliance, and
                  policy work. It shows you can frame local problems in a wider
                  macro context.
                </p>
              </article>
              <article className="rounded-[22px] border border-[#e3dbd0] bg-white/90 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Best next API additions
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  If you want the site to feel more global, the cleanest next
                  additions are FRED for rates and spreads, then World Bank
                  governance indicators for institutional quality.
                </p>
              </article>
              <article className="rounded-[22px] border border-[#e3dbd0] bg-white/90 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Source quality
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  These World Bank calls are server-side and cached. If the live
                  endpoint fails, the landing falls back to the latest verified
                  snapshot instead of breaking the section.
                </p>
                <a
                  href="https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-xs font-semibold text-slate-700 underline-offset-4 hover:underline"
                >
                  World Bank Open Data
                </a>
              </article>
            </div>
          </div>
        )}

        {tab === "compliance" && (
          <div className="mt-10 space-y-4">
            <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">
                    Argentina - FATF status
                  </p>
                  <p className="mt-2 font-[family:var(--font-display)] text-4xl leading-none text-slate-950">
                    Not under FATF monitoring
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {initialData.compliance.argentinaStatus.detail}
                  </p>
                </div>
                <span className="shrink-0 self-start rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
                  Removed on Oct 24, 2014
                </span>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-[22px] border border-[#e3dbd0] bg-white/90 p-6">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    FATF grey list
                  </p>
                  <span className="shrink-0 rounded-full bg-amber-50 px-2 py-1 text-xs text-amber-700">
                    {initialData.compliance.fatfSnapshotDate}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  Jurisdictions under increased monitoring -{" "}
                  {initialData.compliance.greyList.length} countries
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {initialData.compliance.greyList.map((country) => (
                    <span
                      key={country}
                      className="rounded-md bg-amber-50 px-2 py-0.5 text-xs text-amber-800"
                    >
                      {country}
                    </span>
                  ))}
                </div>
                <a
                  href={initialData.compliance.greyListUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-xs font-semibold text-slate-700 underline-offset-4 hover:underline"
                >
                  FATF official list
                </a>
              </article>

              <article className="rounded-[22px] border border-[#e3dbd0] bg-white/90 p-6">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    FATF high-risk list
                  </p>
                  <span className="shrink-0 rounded-full bg-rose-50 px-2 py-1 text-xs text-rose-700">
                    Call for action
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  Higher-severity jurisdictions -{" "}
                  {initialData.compliance.highRiskList.length} countries
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {initialData.compliance.highRiskList.map((country) => (
                    <span
                      key={country}
                      className="rounded-md bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-800"
                    >
                      {country}
                    </span>
                  ))}
                </div>
                <a
                  href={initialData.compliance.highRiskUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-xs font-semibold text-slate-700 underline-offset-4 hover:underline"
                >
                  FATF high-risk statement
                </a>
              </article>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {initialData.compliance.resources.map((resource) => (
                <article
                  key={resource.label}
                  className="rounded-[22px] border border-[#e3dbd0] bg-white/90 p-6"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {resource.category}
                  </p>
                  <h3 className="mt-2 font-[family:var(--font-display)] text-3xl leading-tight text-slate-950">
                    {resource.label}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {resource.note}
                  </p>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-xs font-semibold text-slate-700 underline-offset-4 hover:underline"
                  >
                    Open source
                  </a>
                </article>
              ))}
            </div>

            <p className="text-xs text-slate-400">
              Compliance data is intentionally conservative here. Where there is
              no clean public API, the landing uses official links or verified
              snapshot data instead of fragile scrapers.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
