from __future__ import annotations

import xml.etree.ElementTree as ET
from typing import Any

import requests

FATF_SNAPSHOT = {
    "snapshot_date": "2026-02-13",
    "grey_list": [
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
    ],
    "high_risk": [
        "Democratic People's Republic of Korea",
        "Iran",
        "Myanmar",
    ],
    "grey_list_url": "https://www.fatf-gafi.org/en/publications/High-risk-and-other-monitored-jurisdictions/increased-monitoring-february-2026.html",
    "high_risk_url": "https://www.fatf-gafi.org/en/publications/High-risk-and-other-monitored-jurisdictions/Call-for-action-february-2026.html",
}

PUBLIC_BASES = [
    {
        "category": "Sanctions screening",
        "label": "OFAC SDN XML",
        "description": "Official U.S. sanctions source for name screening, list coverage tracking, and sanctions operations.",
        "url": "https://sanctionslistservice.ofac.treas.gov/api/PublicationPreview/exports/SDN.XML",
    },
    {
        "category": "Multilateral sanctions",
        "label": "UN consolidated list XML",
        "description": "Official UN sanctions reference for global screening and cross-border due-diligence work.",
        "url": "https://scsanctions.un.org/resources/xml/en/consolidated.xml",
    },
    {
        "category": "Jurisdiction monitoring",
        "label": "FATF monitored jurisdictions",
        "description": "Useful anchor for AML/CFT country-risk memos and enhanced due-diligence framing.",
        "url": "https://www.fatf-gafi.org/en/topics/high-risk-and-other-monitored-jurisdictions.html",
    },
    {
        "category": "Governance benchmark",
        "label": "World Bank control of corruption",
        "description": "Slow-moving but useful benchmark when a client needs jurisdiction context, not just list screening.",
        "url": "https://api.worldbank.org/v2/country/AR;BR;GB;SG;US/indicator/CC.PER.RNK?format=json&mrv=1&per_page=100",
    },
    {
        "category": "Benchmark / enrichment",
        "label": "Basel AML Index",
        "description": "Helpful benchmark for country exposure framing, even if not consumed through a simple open API.",
        "url": "https://index.baselgovernance.org",
    },
    {
        "category": "Enrichment layer",
        "label": "OpenSanctions",
        "description": "Useful non-official enrichment layer when clients need broader source aggregation beyond the official lists.",
        "url": "https://www.opensanctions.org",
    },
]


def _parse_xml(content: bytes) -> ET.Element:
    return ET.fromstring(content)


def fetch_financial_crime_snapshot(
    session: requests.Session | None = None,
) -> tuple[dict[str, Any], list[dict[str, Any]]]:
    client = session or requests.Session()
    snapshot = {
        "sanctions": {
            "ofac": {
                "entries": None,
                "programs": None,
                "published_on": None,
                "url": "https://sanctionslistservice.ofac.treas.gov/api/PublicationPreview/exports/SDN.XML",
            },
            "un": {
                "individuals": None,
                "entities": None,
                "total": None,
                "generated_at": None,
                "url": "https://scsanctions.un.org/resources/xml/en/consolidated.xml",
            },
        },
        "fatf": {
            "snapshot_date": FATF_SNAPSHOT["snapshot_date"],
            "grey_list_count": len(FATF_SNAPSHOT["grey_list"]),
            "high_risk_count": len(FATF_SNAPSHOT["high_risk"]),
            "grey_list": FATF_SNAPSHOT["grey_list"],
            "high_risk": FATF_SNAPSHOT["high_risk"],
            "grey_list_url": FATF_SNAPSHOT["grey_list_url"],
            "high_risk_url": FATF_SNAPSHOT["high_risk_url"],
        },
        "governance": {
            "year": None,
            "source_updated": None,
            "countries": {},
            "url": "https://api.worldbank.org/v2/country/AR;BR;GB;SG;US/indicator/CC.PER.RNK?format=json&mrv=1&per_page=100",
        },
        "public_bases": PUBLIC_BASES,
    }
    source_status = [
        {
            "source": "fatf_snapshot",
            "status": "snapshot",
            "note": f"FATF pages are Cloudflare-protected, so the pipeline uses a verified snapshot from {FATF_SNAPSHOT['snapshot_date']}.",
        }
    ]

    try:
        response = client.get(
            "https://sanctionslistservice.ofac.treas.gov/api/PublicationPreview/exports/SDN.XML",
            timeout=30,
        )
        response.raise_for_status()
        root = _parse_xml(response.content)
        namespace = {"o": root.tag.split("}")[0].strip("{")}
        entries = root.findall("o:sdnEntry", namespace)
        programs = {
            node.text.strip()
            for node in root.findall(".//o:program", namespace)
            if node.text and node.text.strip()
        }
        publish_date = root.findtext("o:publshInformation/o:Publish_Date", default="", namespaces=namespace)
        record_count = root.findtext("o:publshInformation/o:Record_Count", default="", namespaces=namespace)
        snapshot["sanctions"]["ofac"] = {
            "entries": int(record_count) if record_count else len(entries),
            "programs": len(programs),
            "published_on": publish_date or None,
            "url": "https://sanctionslistservice.ofac.treas.gov/api/PublicationPreview/exports/SDN.XML",
        }
        source_status.append(
            {
                "source": "ofac_sdn",
                "status": "live",
                "note": "Fetched from the official OFAC sanctions XML.",
            }
        )
    except Exception as exc:
        source_status.append(
            {
                "source": "ofac_sdn",
                "status": "failed",
                "note": str(exc),
            }
        )

    try:
        response = client.get(
            "https://scsanctions.un.org/resources/xml/en/consolidated.xml",
            timeout=30,
        )
        response.raise_for_status()
        root = _parse_xml(response.content)
        individuals = len(root.findall("./INDIVIDUALS/INDIVIDUAL"))
        entities = len(root.findall("./ENTITIES/ENTITY"))
        snapshot["sanctions"]["un"] = {
            "individuals": individuals,
            "entities": entities,
            "total": individuals + entities,
            "generated_at": root.attrib.get("dateGenerated"),
            "url": "https://scsanctions.un.org/resources/xml/en/consolidated.xml",
        }
        source_status.append(
            {
                "source": "un_consolidated",
                "status": "live",
                "note": "Fetched from the official UN consolidated sanctions XML.",
            }
        )
    except Exception as exc:
        source_status.append(
            {
                "source": "un_consolidated",
                "status": "failed",
                "note": str(exc),
            }
        )

    try:
        response = client.get(
            "https://api.worldbank.org/v2/country/AR;BR;GB;SG;US/indicator/CC.PER.RNK",
            params={
                "format": "json",
                "mrv": 1,
                "per_page": 100,
            },
            timeout=30,
        )
        response.raise_for_status()
        payload = response.json()
        metadata = payload[0]
        entries = payload[1]
        countries: dict[str, dict[str, Any]] = {}
        for entry in entries:
            value = entry.get("value")
            if value is None:
                continue
            code = entry["country"]["id"]
            countries[code] = {
                "name": entry["country"]["value"],
                "percentile_rank": float(value),
            }
            snapshot["governance"]["year"] = entry["date"]

        snapshot["governance"]["countries"] = countries
        snapshot["governance"]["source_updated"] = metadata.get("lastupdated")
        source_status.append(
            {
                "source": "world_bank_governance",
                "status": "live",
                "note": "Fetched from World Bank control-of-corruption percentile ranks.",
            }
        )
    except Exception as exc:
        source_status.append(
            {
                "source": "world_bank_governance",
                "status": "failed",
                "note": str(exc),
            }
        )

    return snapshot, source_status
