export type CountryCode = "AR" | "US" | "CN" | "IN" | "DE" | "GB" | "BR";

export type SourceStatus = "live" | "fallback" | "snapshot";

type Rate = {
  average: number;
  buy: number;
  sell: number;
};

type CountryPoint = {
  value: number;
  year: string;
};

type BluelyticsResponse = {
  oficial: {
    value_avg: number;
    value_buy: number;
    value_sell: number;
  };
  blue: {
    value_avg: number;
    value_buy: number;
    value_sell: number;
  };
  last_update: string;
};

type WorldBankMetadata = {
  lastupdated?: string;
};

type WorldBankEntry = {
  country: {
    id: string;
    value: string;
  };
  date: string;
  value: number | null;
};

type WorldBankResponse = [WorldBankMetadata, WorldBankEntry[]];

type ArgentinaSeriesResponse = {
  data?: [string, number][];
};

type SourceHealth = {
  key: string;
  label: string;
  status: SourceStatus;
  note: string;
  url: string;
};

type ComplianceResource = {
  category: string;
  label: string;
  note: string;
  url: string;
};

export type ObservatoryData = {
  fetchedAt: string;
  sources: SourceHealth[];
  argentina: {
    fx: {
      official: Rate;
      blue: Rate;
      updatedAt: string;
    };
    annualInflation: {
      value: number;
      year: string;
      sourceUpdated: string | null;
    };
    inflationExpectation: {
      value: number;
      period: string;
    };
    consumerConfidence: {
      value: string;
      period: string;
      url: string;
    };
    rigi: {
      value: string;
      period: string;
      url: string;
    };
  };
  world: {
    gdpGrowth: Record<CountryCode, CountryPoint>;
    sourceUpdated: string | null;
  };
  compliance: {
    fatfSnapshotDate: string;
    argentinaStatus: {
      detail: string;
      url: string;
    };
    greyList: string[];
    greyListUrl: string;
    highRiskList: string[];
    highRiskUrl: string;
    resources: ComplianceResource[];
  };
};

const ONE_HOUR = 60 * 60;
const REQUEST_TIMEOUT_MS = 10_000;

const FALLBACK_FX = {
  official: {
    average: 1390.5,
    buy: 1365,
    sell: 1416,
  },
  blue: {
    average: 1395,
    buy: 1385,
    sell: 1405,
  },
  updatedAt: "2026-04-03T19:46:00.19852-03:00",
};

const FALLBACK_ARGENTINA_CPI = {
  value: 219.883929014578,
  year: "2024",
  sourceUpdated: "2026-02-24",
};

const FALLBACK_INFLATION_EXPECTATION = {
  value: 25,
  period: "2026-01-01",
};

const FALLBACK_GDP_GROWTH: Record<CountryCode, CountryPoint> = {
  AR: { value: -1.34293072157739, year: "2024" },
  US: { value: 2.79300127716779, year: "2024" },
  CN: { value: 4.9773565917572, year: "2024" },
  IN: { value: 6.49476552383821, year: "2024" },
  DE: { value: -0.495851897260366, year: "2024" },
  GB: { value: 1.1264226705118, year: "2024" },
  BR: { value: 3.41931516597739, year: "2024" },
};

const FATF_SNAPSHOT_DATE = "2026-02-13";
const FATF_GREY_LIST = [
  "Algeria",
  "Angola",
  "Bolivia",
  "Bulgaria",
  "Cameroon",
  "Cote d'Ivoire",
  "Democratic Republic of the Congo",
  "Haiti",
  "Kenya",
  "Kuwait",
  "Lao PDR",
  "Lebanon",
  "Monaco",
  "Namibia",
  "Nepal",
  "Papua New Guinea",
  "South Sudan",
  "Syria",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (UK)",
  "Yemen",
];

const FATF_HIGH_RISK_LIST = [
  "Democratic Republic of Korea (DPRK)",
  "Iran",
  "Myanmar",
];

const COMPLIANCE_RESOURCES: ComplianceResource[] = [
  {
    category: "Sanctions",
    label: "OFAC SDN list",
    note: "Best official US sanctions reference if you later want a sanctions count or entity search layer.",
    url: "https://ofac.treasury.gov/specially-designated-nationals-and-blocked-persons-list-sdn-human-readable-lists",
  },
  {
    category: "Sanctions",
    label: "EU sanctions map",
    note: "Useful for a consulting-facing compliance view even when the page does not implement entity-level screening.",
    url: "https://www.sanctionsmap.eu",
  },
  {
    category: "Sanctions",
    label: "UN consolidated list",
    note: "The cleanest official multilateral sanctions reference to link from a public portfolio page.",
    url: "https://main.un.org/securitycouncil/en/content/un-sc-consolidated-list",
  },
  {
    category: "Risk benchmark",
    label: "Basel AML Index",
    note: "Strong reference benchmark, but not a simple open public API. Better treated as a source link unless you license richer access.",
    url: "https://index.baselgovernance.org",
  },
];

function toRate(input: {
  value_avg: number;
  value_buy: number;
  value_sell: number;
}): Rate {
  return {
    average: input.value_avg,
    buy: input.value_buy,
    sell: input.value_sell,
  };
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: ONE_HOUR,
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status} for ${url}`);
  }

  return (await response.json()) as T;
}

async function loadFx(): Promise<{
  data: ObservatoryData["argentina"]["fx"];
  source: SourceHealth;
}> {
  const url = "https://api.bluelytics.com.ar/v2/latest";

  try {
    const payload = await fetchJson<BluelyticsResponse>(url);

    return {
      data: {
        official: toRate(payload.oficial),
        blue: toRate(payload.blue),
        updatedAt: payload.last_update,
      },
      source: {
        key: "bluelytics",
        label: "Bluelytics FX",
        status: "live",
        note: "Live FX data fetched server-side.",
        url,
      },
    };
  } catch {
    return {
      data: FALLBACK_FX,
      source: {
        key: "bluelytics",
        label: "Bluelytics FX",
        status: "fallback",
        note: "Using the latest verified FX snapshot because the live request failed.",
        url,
      },
    };
  }
}

async function loadArgentinaCpi(): Promise<{
  data: ObservatoryData["argentina"]["annualInflation"];
  source: SourceHealth;
}> {
  const url =
    "https://api.worldbank.org/v2/country/AR/indicator/FP.CPI.TOTL.ZG?format=json&mrv=3";

  try {
    const [metadata, entries] = await fetchJson<WorldBankResponse>(url);
    const latest = entries.find((entry) => entry.value !== null);

    if (!latest || latest.value === null) {
      throw new Error("Missing World Bank CPI value.");
    }

    return {
      data: {
        value: latest.value,
        year: latest.date,
        sourceUpdated: metadata.lastupdated ?? null,
      },
      source: {
        key: "world-bank-cpi",
        label: "World Bank CPI",
        status: "live",
        note: "Live annual CPI value from World Bank WDI.",
        url,
      },
    };
  } catch {
    return {
      data: FALLBACK_ARGENTINA_CPI,
      source: {
        key: "world-bank-cpi",
        label: "World Bank CPI",
        status: "fallback",
        note: "Using the latest verified annual CPI snapshot because the live request failed.",
        url,
      },
    };
  }
}

async function loadInflationExpectation(): Promise<{
  data: ObservatoryData["argentina"]["inflationExpectation"];
  source: SourceHealth;
}> {
  const url =
    "https://apis.datos.gob.ar/series/api/series/?ids=431.1_EXPECTATIVANA_M_0_0_29_85&limit=1&sort=desc";

  try {
    const payload = await fetchJson<ArgentinaSeriesResponse>(url);
    const latest = payload.data?.[0];

    if (!latest) {
      throw new Error("Missing datos.gob.ar expectation value.");
    }

    return {
      data: {
        period: latest[0],
        value: latest[1],
      },
      source: {
        key: "datos-gob-ar",
        label: "datos.gob.ar",
        status: "live",
        note: "Live inflation expectations from Argentina open data.",
        url,
      },
    };
  } catch {
    return {
      data: FALLBACK_INFLATION_EXPECTATION,
      source: {
        key: "datos-gob-ar",
        label: "datos.gob.ar",
        status: "fallback",
        note: "Using the latest verified expectation snapshot because the live request failed.",
        url,
      },
    };
  }
}

async function loadWorldGrowth(): Promise<{
  data: ObservatoryData["world"];
  source: SourceHealth;
}> {
  const url =
    "https://api.worldbank.org/v2/country/AR;US;CN;BR;DE;IN;GB/indicator/NY.GDP.MKTP.KD.ZG?format=json&mrv=2&per_page=100";

  try {
    const [metadata, entries] = await fetchJson<WorldBankResponse>(url);
    const result = { ...FALLBACK_GDP_GROWTH };

    for (const entry of entries) {
      if (entry.value === null) {
        continue;
      }

      const countryCode = entry.country.id as CountryCode;

      if (!(countryCode in result)) {
        continue;
      }

      if (entry.date > result[countryCode].year) {
        result[countryCode] = {
          value: entry.value,
          year: entry.date,
        };
      }
    }

    return {
      data: {
        gdpGrowth: result,
        sourceUpdated: metadata.lastupdated ?? null,
      },
      source: {
        key: "world-bank-gdp",
        label: "World Bank GDP",
        status: "live",
        note: "Live GDP growth values from World Bank WDI.",
        url,
      },
    };
  } catch {
    return {
      data: {
        gdpGrowth: FALLBACK_GDP_GROWTH,
        sourceUpdated: "2026-02-24",
      },
      source: {
        key: "world-bank-gdp",
        label: "World Bank GDP",
        status: "fallback",
        note: "Using the latest verified GDP snapshot because the live request failed.",
        url,
      },
    };
  }
}

export async function getObservatoryData(): Promise<ObservatoryData> {
  const [fx, annualInflation, inflationExpectation, world] = await Promise.all([
    loadFx(),
    loadArgentinaCpi(),
    loadInflationExpectation(),
    loadWorldGrowth(),
  ]);

  return {
    fetchedAt: new Date().toISOString(),
    sources: [
      fx.source,
      annualInflation.source,
      inflationExpectation.source,
      world.source,
      {
        key: "fatf",
        label: "FATF lists",
        status: "snapshot",
        note: "Official FATF statement snapshot from 13 February 2026.",
        url: "https://www.fatf-gafi.org/en/topics/high-risk-and-other-monitored-jurisdictions.html",
      },
    ],
    argentina: {
      fx: fx.data,
      annualInflation: annualInflation.data,
      inflationExpectation: inflationExpectation.data,
      consumerConfidence: {
        value: "2.39",
        period: "UTDT Consumer Confidence Index - March 2026",
        url: "https://www.utdt.edu/listado_contenidos.php?id_item_menu=24471",
      },
      rigi: {
        value: "12+",
        period: "Approved projects under the regime - Q1 2026",
        url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/405000-409999/408098/norma.htm",
      },
    },
    world: world.data,
    compliance: {
      fatfSnapshotDate: FATF_SNAPSHOT_DATE,
      argentinaStatus: {
        detail:
          "Argentina is not under FATF increased monitoring. FATF states that Argentina left its ongoing monitoring process on 24 October 2014 after improving its AML/CFT framework.",
        url: "https://www.fatf-gafi.org/en/publications/High-risk-and-other-monitored-jurisdictions/Fatf-compliance-oct-2014.html",
      },
      greyList: FATF_GREY_LIST,
      greyListUrl:
        "https://www.fatf-gafi.org/en/publications/High-risk-and-other-monitored-jurisdictions/increased-monitoring-february-2026.html",
      highRiskList: FATF_HIGH_RISK_LIST,
      highRiskUrl:
        "https://www.fatf-gafi.org/en/publications/High-risk-and-other-monitored-jurisdictions/Call-for-action-february-2026.html",
      resources: COMPLIANCE_RESOURCES,
    },
  };
}
