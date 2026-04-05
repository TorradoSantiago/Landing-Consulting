import { DataObservatory } from "./components/DataObservatory";

const services = [
  {
    title: "Financial crime & risk",
    desc: "Compliance support, AML/KYC workflows, sanctions review, control design, and audit-ready reporting.",
  },
  {
    title: "Data analytics & automation",
    desc: "Data analysis, dashboards, workflow automation, and executive materials for faster decisions.",
  },
  {
    title: "Policy & economic analysis",
    desc: "Evidence, evaluation frameworks, and defensible analytical narratives for public and mission-driven teams.",
  },
];

const proofCases = [
  {
    title: "Korea Income & Welfare",
    type: "Case study",
    desc: "Supervised ML on 92,857 welfare records â feature mapping, outlier treatment, model benchmark, and executive presentation.",
    href: "https://github.com/TorradoSantiago/korea_income-welfare",
    label: "Open on GitHub",
  },
  {
    title: "Argentina market monitor",
    type: "Live automation",
    desc: "Weekly pipeline pulling BCRA, World Bank, OFAC, and UN sources into a client-facing brief with live economic signals.",
    href: "/market-monitor",
    label: "Open live monitor",
  },
  {
    title: "Conectar Esperanza",
    type: "Policy analysis",
    desc: "R-based evaluation framework for a public transport access program in La Matanza, structured for policy discussion.",
    href: "https://github.com/TorradoSantiago/ConectarEsperanza-Policy-R",
    label: "Open repository",
  },
  {
    title: "Clinic WhatsApp bot",
    type: "Private client",
    desc: "Production automation for a medical practice â booking, prescriptions, billing, and operational routing. Walkthrough on request.",
    href: "mailto:santiagotorradouba@gmail.com?subject=Quiero%20ver%20el%20caso%20de%20automatizacion",
    label: "Request walkthrough",
  },
];

export default function Home() {
  return (
    <main className="bg-white text-slate-900 antialiased">

      {/* ââ NAV ââ */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <p className="font-semibold text-slate-900">Santiago Torrado</p>
          <nav className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#services" className="hover:text-slate-900 transition">Services</a>
            <a href="#proof" className="hover:text-slate-900 transition">Work</a>
            <a href="#contact" className="hover:text-slate-900 transition">Contact</a>
            <a
              href="mailto:santiagotorradouba@gmail.com?subject=Consulta%20de%20trabajo"
              className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 transition"
            >
              Get in touch
            </a>
          </nav>
        </div>
      </header>

      {/* ââ HERO ââ */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-6">
          Analytics Â· Risk Â· Applied Economics
        </p>
        <h1 className="text-5xl font-bold leading-tight text-slate-900 max-w-2xl">
          I help teams turn messy data into clear decisions.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-500 max-w-xl">
          I work at the intersection of financial crime, data analytics, and applied economics.
          Based in Buenos Aires. Currently at American Express â AML, KYC, and compliance.
          MSc Applied Economics at UTDT.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#proof"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700 transition"
          >
            See my work
          </a>
          <a
            href="mailto:santiagotorradouba@gmail.com?subject=Consulta%20de%20trabajo"
            className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 transition"
          >
            Escribirme
          </a>
          <a
            href="https://www.linkedin.com/in/santiago-torrado/"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 text-sm font-semibold text-slate-400 hover:text-slate-900 transition"
          >
            LinkedIn â
          </a>
        </div>

        {/* Skills row */}
        <div className="mt-12 flex flex-wrap gap-2">
          {["AML / KYC", "Python", "SQL", "R / Stata", "BigQuery", "Financial Crime", "Econometrics"].map(
            (tag) => (
              <span key={tag} className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-xs text-slate-500">
                {tag}
              </span>
            )
          )}
        </div>
      </section>

      {/* ââ SERVICES ââ */}
      <section id="services" className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">What I do</p>
          <h2 className="text-3xl font-bold text-slate-900">Three areas of work</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="bg-white border border-slate-100 rounded-2xl p-6">
                <h3 className="font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Engagement formats */}
          <div className="mt-10 border-t border-slate-100 pt-10">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-6">How to start</p>
            <div className="grid gap-4 sm:grid-cols-3 text-sm">
              <div>
                <p className="font-semibold text-slate-900">Diagnostic sprint <span className="font-normal text-slate-400">Â· 1 week</span></p>
                <p className="mt-1 text-slate-500">Problem map, data audit, and a clear next-step memo.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Analytics build <span className="font-normal text-slate-400">Â· 2â4 weeks</span></p>
                <p className="mt-1 text-slate-500">Analysis, model, or automation with cleaned findings and deliverables.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Executive package <span className="font-normal text-slate-400">Â· 1â2 weeks</span></p>
                <p className="mt-1 text-slate-500">Sharper story and decision-ready presentation from existing material.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ââ DATA OBSERVATORY ââ */}
      <DataObservatory />

      {/* ââ PROOF ââ */}
      <section id="proof" className="border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Work</p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-slate-900">Selected projects</h2>
            <a
              href="https://github.com/TorradoSantiago?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-400 hover:text-slate-900 transition"
            >
              All repos â
            </a>
          </div>

          <div className="mt-10 divide-y divide-slate-100">
            {proofCases.map((p) => (
              <div key={p.title} className="py-8 grid gap-2 sm:grid-cols-[1fr_2fr]">
                <div>
                  <span className="text-xs uppercase tracking-widest text-slate-400">{p.type}</span>
                  <p className="mt-1 font-semibold text-slate-900">{p.title}</p>
                </div>
                <div>
                  <p className="text-sm leading-relaxed text-slate-500">{p.desc}</p>
                  <a
                    href={p.href}
                    target={p.href.startsWith("http") ? "_blank" : undefined}
                    rel={p.href.startsWith("http") ? "noreferrer" : undefined}
                    className="mt-3 inline-flex text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
                  >
                    {p.label} â
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ââ CONTACT ââ */}
      <section id="contact" className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="grid gap-10 sm:grid-cols-2 sm:items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Contact</p>
              <h2 className="text-3xl font-bold text-slate-900">Let's talk</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-500">
                Send a message with the problem, the context, and what you need at the end. If it fits, we define a scope and get started.
              </p>
              <a
                href="mailto:santiagotorradouba@gmail.com?subject=Consulta%20de%20trabajo"
                className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700 transition"
              >
                Send an email
              </a>
            </div>

            <div className="space-y-4 text-sm text-slate-600">
              <p><span className="font-semibold text-slate-900">Email</span><br />santiagotorradouba@gmail.com</p>
              <p><span className="font-semibold text-slate-900">Location</span><br />Buenos Aires, Argentina</p>
              <p><span className="font-semibold text-slate-900">LinkedIn</span><br />
                <a href="https://www.linkedin.com/in/santiago-torrado/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-slate-900">
                  linkedin.com/in/santiago-torrado
                </a>
              </p>
              <p><span className="font-semibold text-slate-900">GitHub</span><br />
                <a href="https://github.com/TorradoSantiago" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-slate-900">
                  github.com/TorradoSantiago
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-6 flex justify-between items-center text-xs text-slate-400">
          <p>Santiago Torrado Â· Buenos Aires, Argentina</p>
          <p>Analytics Â· Risk Â· Applied Economics</p>
        </div>
      </footer>

    </main>
  );
}
