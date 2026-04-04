import { DataObservatory } from "./components/DataObservatory";

const signalCards = [
  {
    label: "Current seat",
    value: "American Express",
    detail:
      "AML, KYC, sanctions review, and audit-ready case narratives in a regulated environment.",
  },
  {
    label: "Quant track",
    value: "UTDT MSc",
    detail:
      "Applied Economics in progress with econometrics, causal inference, and decision-oriented analysis.",
  },
  {
    label: "Working style",
    value: "Analysis to deck",
    detail:
      "Python, SQL, BigQuery, R, Stata, dashboards, and executive materials built around the decision at hand.",
  },
];

const trustSignals = [
  {
    value: "2+ years",
    label: "AML / KYC experience",
  },
  {
    value: "92,857",
    label: "Rows in the Korea welfare case",
  },
  {
    value: "Live bot",
    label: "Client automation in production",
  },
  {
    value: "4 languages",
    label: "Spanish, English, French, Portuguese",
  },
];

const serviceLines = [
  {
    title: "Financial crime and risk analytics",
    summary:
      "Support for compliance, onboarding, remediation, sanctions review, data quality, control design, and operating analysis.",
    deliverables:
      "Case logic, process diagnostics, QA frameworks, SQL support, risk notes, and audit-ready reporting.",
  },
  {
    title: "Applied analytics and automation",
    summary:
      "Data analysis, workflow automation, dashboard logic, and technical material for teams that need faster and cleaner decisions.",
    deliverables:
      "Notebook, dashboard outline, automation concept, metrics framework, and executive memo.",
  },
  {
    title: "Policy, evaluation, and economic analysis",
    summary:
      "Work for public, academic, and mission-driven teams that need evidence, structure, and a defendable analytical narrative.",
    deliverables:
      "Policy brief, R or Python analysis, evaluation structure, findings deck, and methodological annex.",
  },
];

const audiences = [
  {
    title: "Fintech, payments, and regulated teams",
    detail:
      "Useful when the problem sits between operations, compliance, data quality, and risk.",
  },
  {
    title: "Consulting, research, and analytics teams",
    detail:
      "Useful when you need someone who can move between hypothesis, model, and executive communication.",
  },
  {
    title: "Programs, NGOs, and policy initiatives",
    detail:
      "Useful when the technical answer has to survive real institutional constraints and stakeholder scrutiny.",
  },
];

const offers = [
  {
    title: "Diagnostic sprint",
    duration: "1 week",
    bestFor:
      "When the team has data, pressure, and ambiguity, but not yet a clean problem definition.",
    outputs: [
      "Problem map and priorities",
      "Data and workflow audit",
      "Recommended next-step memo",
    ],
  },
  {
    title: "Analytics build",
    duration: "2 to 4 weeks",
    bestFor:
      "When the problem is clear and the team needs analysis, modeling, automation logic, or a strong reporting layer.",
    outputs: [
      "Analysis or model prototype",
      "Cleaned narrative and findings",
      "Slides, PDF, or dashboard-ready material",
    ],
  },
  {
    title: "Executive package",
    duration: "1 to 2 weeks",
    bestFor:
      "When the core analysis already exists but the team needs a sharper story, cleaner structure, and decision-ready presentation.",
    outputs: [
      "Executive summary",
      "Decision deck or PDF",
      "Case-study or portfolio packaging",
    ],
  },
];

const proofCases = [
  {
    title: "Korea Income & Welfare",
    type: "Public case study",
    challenge:
      "Turn welfare microdata into a credible analytics case on the relationship between education and income.",
    proof:
      "92,857 records, feature mapping, outlier treatment, model benchmark, and portfolio-grade executive presentation.",
    linkLabel: "Open case study",
    href: "https://github.com/TorradoSantiago/korea_income-welfare",
  },
  {
    title: "Conectar Esperanza",
    type: "Policy analysis",
    challenge:
      "Frame a public-transport access problem in La Matanza with evidence useful for policy discussion and next-step evaluation.",
    proof:
      "R-based workflow, transport and mobility framing, and a stronger decision structure for public-interest analysis.",
    linkLabel: "Open repository",
    href: "https://github.com/TorradoSantiago/ConectarEsperanza-Policy-R",
  },
  {
    title: "Clinic WhatsApp automation",
    type: "Private client work",
    challenge:
      "Reduce repetitive administrative load in a real medical practice without breaking the human handoff.",
    proof:
      "Production WhatsApp bot for booking, prescriptions, billing questions, and operational routing. Private walkthrough available on request.",
    linkLabel: "Request walkthrough",
    href: "mailto:santiagotorradouba@gmail.com?subject=Quiero%20ver%20el%20caso%20de%20automatizacion",
  },
];

const approach = [
  "Start from the decision, not the tool.",
  "Separate exploratory work from final deliverables.",
  "Make tradeoffs explicit: speed, rigor, explainability, confidentiality.",
  "Ship something a manager, founder, or program lead can actually use.",
];

const background = [
  {
    title: "Compliance and regulated operations",
    detail:
      "American Express work creates credibility with controls, ambiguity, documentation quality, and risk-sensitive workflows.",
  },
  {
    title: "Quantitative training with institutional context",
    detail:
      "Political Science at UBA plus Applied Economics at UTDT is a useful mix for problems where incentives and systems matter as much as code.",
  },
  {
    title: "Builder profile, not only analyst profile",
    detail:
      "Public repos, policy analysis, dashboard material, and a live automation case create a portfolio that moves beyond theory.",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-x-hidden text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem] bg-[radial-gradient(circle_at_top_left,rgba(14,118,168,0.12),transparent_22%),radial-gradient(circle_at_top_right,rgba(196,108,58,0.16),transparent_28%)]" />

      <header className="sticky top-0 z-50 border-b border-[#ddd3c4] bg-[#f6f2ea]/88 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
          <div>
            <p className="font-[family:var(--font-display)] text-3xl leading-none text-slate-950">
              Santiago Torrado
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.26em] text-slate-500">
              analytics, risk, and applied economics
            </p>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a href="#services" className="transition hover:text-slate-950">
              Services
            </a>
            <a href="#proof" className="transition hover:text-slate-950">
              Proof
            </a>
            <a href="#offers" className="transition hover:text-slate-950">
              Offers
            </a>
            <a href="#contact" className="transition hover:text-slate-950">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-[#d9cfbf] bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-500">
              for regulated teams, fintech, consulting, and mission-driven work
            </p>
            <h1 className="mt-8 max-w-5xl font-[family:var(--font-display)] text-6xl leading-none text-slate-950 sm:text-7xl">
              Rigorous analysis for teams that need to decide faster, document better, and show their work.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              I work at the intersection of financial crime, data analytics, and
              applied economics — helping convert messy data, unclear processes,
              and open questions into defensible deliverables: diagnostics,
              notebooks, dashboards, automations, and executive materials.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-xs text-slate-500">
              {[
                "AML / KYC / Risk",
                "Python / SQL / BigQuery / R / Stata",
                "Policy evaluation and econometrics",
                "Executive reporting and decision decks",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#ddd0bf] bg-white/80 px-4 py-2"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#proof"
                className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Ver casos
              </a>
              <a
                href="mailto:santiagotorradouba@gmail.com?subject=Consulta%20de%20trabajo"
                className="rounded-full border border-[#d5c8b7] bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
              >
                Escribirme
              </a>
              <a
                href="https://www.linkedin.com/in/santiago-torrado/"
                className="rounded-full border border-transparent px-4 py-3 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="rounded-[32px] border border-[#dfd6ca] bg-[#10223b] p-8 text-white shadow-[0_22px_80px_rgba(16,34,59,0.18)]">
            <p className="text-xs uppercase tracking-[0.24em] text-[#f4c9a8]">
              Why this profile is different
            </p>
            <div className="mt-6 space-y-5">
              {signalCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-[24px] border border-white/10 bg-white/6 p-5"
                >
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-300">
                    {card.label}
                  </p>
                  <p className="mt-2 font-[family:var(--font-display)] text-3xl leading-none text-white">
                    {card.value}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {card.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e5dccf] bg-[#fbf8f3]">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {trustSignals.map((item) => (
            <div
              key={item.label}
              className="rounded-[28px] border border-[#e3d8ca] bg-white/92 px-6 py-6 shadow-[0_10px_30px_rgba(24,32,43,0.04)]"
            >
              <p className="font-[family:var(--font-display)] text-4xl leading-none text-slate-950">
                {item.value}
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <DataObservatory />

      <section id="services" className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
            Services
          </p>
          <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
            Where I can be useful right now
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            The offer is not &quot;do everything.&quot; It is to enter where an important
            question needs better structure, better evidence, or better
            communication to move a real decision forward.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {serviceLines.map((service) => (
            <article
              key={service.title}
              className="rounded-[30px] border border-[#e4dbcf] bg-white/90 p-8 shadow-[0_16px_50px_rgba(24,32,43,0.05)]"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Service line
              </p>
              <h3 className="mt-4 font-[family:var(--font-display)] text-3xl leading-tight text-slate-950">
                {service.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-600">
                {service.summary}
              </p>
              <p className="mt-5 border-t border-[#eee6dc] pt-5 text-sm leading-7 text-slate-500">
                <span className="font-semibold text-slate-700">Typical outputs:</span>{" "}
                {service.deliverables}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e6ddd0] bg-[#f7f3ec]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Best fit
            </p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
              The teams most likely to get value fast
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className="rounded-[28px] border border-[#e2d9cd] bg-white/92 p-7"
              >
                <h3 className="font-[family:var(--font-display)] text-3xl leading-tight text-slate-950">
                  {audience.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  {audience.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="proof" className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Proof
            </p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
              Selected cases and signals of execution
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Listing skills is not enough to sell analytical work. You need to
              show judgment, structure, and the ability to ship something a
              decision-maker can actually use.
            </p>
          </div>

          <a
            href="https://github.com/TorradoSantiago?tab=repositories"
            className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
          >
            View public repositories
          </a>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {proofCases.map((project) => (
            <article
              key={project.title}
              className="flex h-full flex-col rounded-[30px] border border-[#e4dbcf] bg-white/92 p-8 shadow-[0_16px_50px_rgba(24,32,43,0.05)]"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                {project.type}
              </p>
              <h3 className="mt-4 font-[family:var(--font-display)] text-3xl leading-tight text-slate-950">
                {project.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-600">
                {project.challenge}
              </p>
              <p className="mt-5 border-t border-[#eee6dc] pt-5 text-sm leading-7 text-slate-500">
                {project.proof}
              </p>
              <a
                href={project.href}
                className="mt-8 inline-flex text-sm font-semibold text-slate-900 underline-offset-4 transition hover:underline"
              >
                {project.linkLabel}
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ── UTDT RESEARCH LOG ── */}
      <section className="border-y border-[#e6ddd0] bg-[#f7f3ec]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                MSc Research Log
              </p>
              <h2 className="mt-3 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
                UTDT Applied Economics — ongoing project output
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                The master&apos;s program at Universidad Torcuato Di Tella runs
                through 2026. Each course produces one or more public
                deliverables. This log is updated as projects ship.
              </p>
            </div>
            <a
              href="https://github.com/TorradoSantiago?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="self-start text-sm font-semibold text-slate-600 transition hover:text-slate-950"
            >
              All repositories →
            </a>
          </div>

          <div className="mt-10 overflow-hidden rounded-[24px] border border-[#e2dacf]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e2dacf] bg-white/70">
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.18em] text-slate-500 w-[30%]">Course / Area</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.18em] text-slate-500 w-[30%]">Project</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.18em] text-slate-500 hidden md:table-cell">Deliverable</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.18em] text-slate-500 w-[100px]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ede7de] bg-white/50">
                {[
                  {
                    course: "Econometrics & ML",
                    project: "Korea Income & Welfare",
                    deliverable: "Supervised ML on 92,857 welfare microdata records",
                    status: "published",
                    href: "https://github.com/TorradoSantiago/korea_income-welfare",
                  },
                  {
                    course: "Applied Regression",
                    project: "Regression exercises",
                    deliverable: "Notebook series covering OLS, assumptions, diagnostics",
                    status: "published",
                    href: "https://github.com/TorradoSantiago/ejercicios.regresion",
                  },
                  {
                    course: "Labor Economics / EDA",
                    project: "EDA EPH — Buenos Aires",
                    deliverable: "Exploratory analysis of household income and labor data (INDEC EPH)",
                    status: "published",
                    href: "https://github.com/TorradoSantiago/EDA.EPH-Phyton",
                  },
                  {
                    course: "Policy Evaluation",
                    project: "Conectar Esperanza",
                    deliverable: "R-based evaluation framework for a public transport access program",
                    status: "published",
                    href: "https://github.com/TorradoSantiago/ConectarEsperanza-Policy-R",
                  },
                  {
                    course: "Causal Inference",
                    project: "TBD — Q2 2026",
                    deliverable: "Difference-in-differences or RDD design on Argentine policy",
                    status: "in-progress",
                    href: null,
                  },
                  {
                    course: "Macroeconomics",
                    project: "TBD — Q2 2026",
                    deliverable: "Macro model calibration or DSGE exercise",
                    status: "upcoming",
                    href: null,
                  },
                  {
                    course: "Financial Economics",
                    project: "TBD — Q3 2026",
                    deliverable: "Asset pricing or risk model applied to Argentine market data",
                    status: "upcoming",
                    href: null,
                  },
                ].map((row) => (
                  <tr key={row.course} className="transition hover:bg-white/80">
                    <td className="px-6 py-4 font-medium text-slate-700">{row.course}</td>
                    <td className="px-6 py-4">
                      {row.href ? (
                        <a
                          href={row.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-slate-900 underline-offset-4 hover:underline"
                        >
                          {row.project}
                        </a>
                      ) : (
                        <span className="text-slate-400">{row.project}</span>
                      )}
                    </td>
                    <td className="hidden px-6 py-4 text-slate-600 md:table-cell">
                      {row.deliverable}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          row.status === "published"
                            ? "bg-[#eef7ee] text-green-700"
                            : row.status === "in-progress"
                            ? "bg-[#fdf4ec] text-orange-700"
                            : "bg-[#f4f0ea] text-slate-500"
                        }`}
                      >
                        {row.status === "published"
                          ? "Published"
                          : row.status === "in-progress"
                          ? "In progress"
                          : "Upcoming"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-xs text-slate-400">
            This table updates as projects are completed and pushed to GitHub. Upcoming entries show planned work based on the UTDT MEA curriculum.
          </p>
        </div>
      </section>

      <section id="offers" className="border-y border-[#e6ddd0] bg-[#fbf8f3]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Offers
            </p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
              Concrete ways to start working together
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              If the page is going to convert, it needs to make clear how a
              project starts, what shape it takes, and what the client receives
              at the end.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {offers.map((offer) => (
              <article
                key={offer.title}
                className="rounded-[30px] border border-[#e4dbcf] bg-white/92 p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-[family:var(--font-display)] text-3xl leading-tight text-slate-950">
                    {offer.title}
                  </h3>
                  <span className="rounded-full border border-[#ddd2c3] px-3 py-1 text-xs uppercase tracking-[0.16em] text-slate-500">
                    {offer.duration}
                  </span>
                </div>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  {offer.bestFor}
                </p>
                <div className="mt-6 space-y-3 border-t border-[#eee5da] pt-6 text-sm leading-7 text-slate-600">
                  {offer.outputs.map((output) => (
                    <p key={output}>- {output}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr]">
          <div className="rounded-[32px] border border-[#e4dbcf] bg-[#10223b] p-8 text-white shadow-[0_20px_60px_rgba(16,34,59,0.15)]">
            <p className="text-sm uppercase tracking-[0.24em] text-[#f4c9a8]">
              Approach
            </p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none">
              How I work
            </h2>
            <div className="mt-8 space-y-4 text-sm leading-8 text-slate-300">
              {approach.map((item) => (
                <p
                  key={item}
                  className="rounded-[22px] border border-white/10 bg-white/6 px-5 py-4"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Background
            </p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
              Why this positioning is credible
            </h2>
            <div className="mt-8 space-y-5">
              {background.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[28px] border border-[#e4dbcf] bg-white/92 p-7"
                >
                  <h3 className="font-[family:var(--font-display)] text-3xl leading-tight text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-600">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-[#e6ddd0] bg-[#f7f2ea]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
          <div className="rounded-[36px] border border-[#d8cfbf] bg-slate-950 px-8 py-12 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] lg:px-12">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#f4c9a8]">
                  Contact
                </p>
                <h2 className="mt-4 max-w-3xl font-[family:var(--font-display)] text-5xl leading-none text-white">
                  If you need a sharper diagnosis, a cleaner analysis, or a more executive deliverable, this can start fast.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                  The simplest starting point is a message with the problem,
                  the context, and the expected deliverable. If it makes sense,
                  we define a first scope and a way of working together.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/6 p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-300">
                  Direct contact
                </p>
                <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                  <p>
                    <span className="font-semibold text-white">Email:</span>{" "}
                    santiagotorradouba@gmail.com
                  </p>
                  <p>
                    <span className="font-semibold text-white">Location:</span>{" "}
                    Buenos Aires, Argentina
                  </p>
                  <p>
                    <span className="font-semibold text-white">Focus:</span>{" "}
                    financial crime analytics, data analysis, applied economics
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="mailto:santiagotorradouba@gmail.com?subject=Consulta%20de%20trabajo"
                    className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                  >
                    Send email
                  </a>
                  <a
                    href="https://github.com/TorradoSantiago"
                    className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/santiago-torrado/"
                    className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
