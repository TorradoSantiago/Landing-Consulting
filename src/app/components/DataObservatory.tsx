"use client";

import { useState, useEffect } from "react";

type Tab = "argentina" | "world";

interface BCRAVariable {
  idVariable: number;
  descripcion: string;
  fecha: string;
  valor: number;
}

interface WorldBankEntry {
  country: { id: string; value: string };
  date: string;
  value: number | null;
}

const COUNTRY_META: Record<string, { name: string; flag: string }> = {
  US: { name: "United States", flag: "🇺🇸" },
  CN: { name: "China", flag: "🇨🇳" },
  IN: { name: "India", flag: "🇮🇳" },
  DE: { name: "Germany", flag: "🇩🇪" },
  GB: { name: "United Kingdom", flag: "🇬🇧" },
  BR: { name: "Brazil", flag: "🇧🇷" },
  AR: { name: "Argentina", flag: "🇦🇷" },
};

const GDP_ORDER = ["US", "CN", "IN", "DE", "GB", "BR", "AR"];

// BCRA variable IDs
const BCRA_USD = 4;        // Tipo de cambio BNA vendedor
const BCRA_INFL_M = 27;   // Inflación mensual IPC
const BCRA_INFL_A = 28;   // Inflación interanual IPC
const BCRA_RES = 1;        // Reservas internacionales

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
      <p className={`mt-2 font-[family:var(--font-display)] text-5xl leading-none ${color}`}>
        {value}
      </p>
      <p className="mt-3 text-xs text-slate-400">{sub}</p>
    </article>
  );
}

export function DataObservatory() {
  const [tab, setTab] = useState<Tab>("argentina");
  const [bcraVars, setBcraVars] = useState<BCRAVariable[]>([]);
  const [gdpGrowth, setGdpGrowth] = useState<
    Record<string, { value: number; year: string }>
  >({});
  const [bcraLoading, setBcraLoading] = useState(true);
  const [worldLoading, setWorldLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    setLastUpdated(
      new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    fetch("https://api.bcra.gob.ar/estadisticas/v2.0/principalesvariables", {
      headers: { Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.results) setBcraVars(data.results);
      })
      .catch(() => {})
      .finally(() => setBcraLoading(false));

    fetch(
      "https://api.worldbank.org/v2/country/AR;US;CN;BR;DE;IN;GB/indicator/NY.GDP.MKTP.KD.ZG?format=json&mrv=2&per_page=100"
    )
      .then((r) => r.json())
      .then(([, entries]: [unknown, WorldBankEntry[]]) => {
        const result: Record<string, { value: number; year: string }> = {};
        if (entries) {
          entries.forEach((e) => {
            const id = e.country.id;
            if (e.value !== null && !result[id]) {
              result[id] = { value: e.value, year: e.date };
            }
          });
        }
        setGdpGrowth(result);
      })
      .catch(() => {})
      .finally(() => setWorldLoading(false));
  }, []);

  const usd = bcraVars.find((v) => v.idVariable === BCRA_USD);
  const inflM = bcraVars.find((v) => v.idVariable === BCRA_INFL_M);
  const inflA = bcraVars.find((v) => v.idVariable === BCRA_INFL_A);
  const reserves = bcraVars.find((v) => v.idVariable === BCRA_RES);

  return (
    <section className="border-y border-[#e6ddd0] bg-[#f0ece4]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Data Observatory
            </p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
              Live economic signals
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              {lastUpdated
                ? `Updated ${lastUpdated} · BCRA and World Bank open APIs`
                : "Fetching live data..."}
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
              🇦🇷 Argentina
            </button>
            <button
              onClick={() => setTab("world")}
              className={`rounded-full px-5 py-2 transition ${
                tab === "world"
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              🌍 World
            </button>
          </div>
        </div>

        {tab === "argentina" && (
          <div className="mt-10 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <IndicatorCard
                label="USD / ARS (BNA)"
                value={
                  bcraLoading
                    ? "…"
                    : usd
                    ? `$${usd.valor.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : "N/A"
                }
                sub={usd ? `BNA vendedor · ${usd.fecha}` : "Loading from BCRA…"}
                color="text-blue-700"
              />
              <IndicatorCard
                label="Monthly inflation"
                value={
                  bcraLoading ? "…" : inflM ? `${inflM.valor.toFixed(1)}%` : "N/A"
                }
                sub={inflM ? `IPC · ${inflM.fecha}` : "Loading from BCRA…"}
                color="text-orange-600"
              />
              <IndicatorCard
                label="Annual inflation"
                value={
                  bcraLoading ? "…" : inflA ? `${inflA.valor.toFixed(1)}%` : "N/A"
                }
                sub={inflA ? `IPC interanual · ${inflA.fecha}` : "Loading from BCRA…"}
                color="text-rose-600"
              />
              <IndicatorCard
                label="BCRA reserves"
                value={
                  bcraLoading
                    ? "…"
                    : reserves
                    ? `USD ${(reserves.valor / 1000).toFixed(1)}B`
                    : "N/A"
                }
                sub={reserves ? `Reservas internacionales · ${reserves.fecha}` : "Loading from BCRA…"}
                color="text-emerald-700"
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
                      2.39
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Índice de Confianza del Consumidor · March 2026
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#fdf4ec] px-3 py-1 text-xs text-orange-700">
                    Monthly
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Measures household expectations about current and future
                  economic conditions. Scale 0–5. Published by Universidad
                  Torcuato Di Tella each month.
                </p>
                <a
                  href="https://www.utdt.edu/icc"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-xs font-semibold text-slate-700 underline-offset-4 hover:underline"
                >
                  View full report →
                </a>
              </article>

              <article className="rounded-[22px] border border-[#e3dbd0] bg-white/90 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      RIGI — Large-investment approvals
                    </p>
                    <p className="mt-2 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
                      12+
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Projects approved under the regime · Q1 2026
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#eef7ee] px-3 py-1 text-xs text-green-700">
                    Active
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Régimen de Incentivo para Grandes Inversiones — fiscal and
                  regulatory framework for projects above USD 200M. Key signal
                  for capital inflows and AML risk exposure.
                </p>
                <a
                  href="https://www.argentina.gob.ar/rigi"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-xs font-semibold text-slate-700 underline-offset-4 hover:underline"
                >
                  View official registry →
                </a>
              </article>
            </div>

            <div className="rounded-[22px] border border-[#e3dbd0] bg-white/90 px-6 py-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Merval Index
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Real-time Merval data requires exchange APIs. Track live prices via BYMA or Bloomberg Argentina.
                  </p>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://open.bymadata.com.ar"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[#ddd3c4] bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
                  >
                    BYMA Open Data
                  </a>
                  <a
                    href="https://finance.yahoo.com/quote/%5EMERV/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[#ddd3c4] bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
                  >
                    Yahoo Finance
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "world" && (
          <div className="mt-10 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              GDP growth rate · Annual % · World Bank WDI
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {GDP_ORDER.map((code) => {
                const meta = COUNTRY_META[code];
                const entry = gdpGrowth[code];
                const val = entry?.value;
                const isPositive = val !== undefined && val >= 0;
                return (
                  <article
                    key={code}
                    className="rounded-[22px] border border-[#e3dbd0] bg-white/90 p-6 shadow-[0_8px_24px_rgba(24,32,43,0.04)]"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {meta.flag} {meta.name}
                    </p>
                    <p
                      className={`mt-2 font-[family:var(--font-display)] text-5xl leading-none ${
                        worldLoading
                          ? "text-slate-200"
                          : val === undefined
                          ? "text-slate-300"
                          : isPositive
                          ? "text-slate-950"
                          : "text-rose-600"
                      }`}
                    >
                      {worldLoading
                        ? "…"
                        : val !== undefined
                        ? `${isPositive ? "+" : ""}${val.toFixed(1)}%`
                        : "N/A"}
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                      {entry ? `FY ${entry.year} estimate` : "Loading…"}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <article className="rounded-[22px] border border-[#e3dbd0] bg-white/90 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Why this matters for financial crime
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  GDP slowdowns correlate with increased AML risk: cash
                  displacement, capital flight, and cross-border transaction
                  anomalies.
                </p>
              </article>
              <article className="rounded-[22px] border border-[#e3dbd0] bg-white/90 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Demographics &amp; long-run projections
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  India surpassed China as the world&apos;s most populous country
                  (2023). Sub-Saharan Africa drives half of projected global
                  population growth through 2050.
                </p>
                <a
                  href="https://population.un.org/wpp/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-xs font-semibold text-slate-700 underline-offset-4 hover:underline"
                >
                  UN World Population Prospects →
                </a>
              </article>
              <article className="rounded-[22px] border border-[#e3dbd0] bg-white/90 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Data source
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  GDP growth data from the World Bank WDI. Updated annually.
                  Fetched live — no key required.
                </p>
                <a
                  href="https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-xs font-semibold text-slate-700 underline-offset-4 hover:underline"
                >
                  World Bank Open Data →
                </a>
              </article>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
