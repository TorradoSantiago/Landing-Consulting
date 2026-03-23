"use client";

import { useState, useEffect, useRef } from "react";

const services = [
  {
    title: "Consultoría de datos y diagnóstico",
    description:
      "Acompaño problemas de negocio, policy y research desde la pregunta inicial hasta la recomendación final. Diagnóstico de procesos, calidad de datos e identificación de gaps de información.",
  },
  {
    title: "Evaluación y análisis aplicado",
    description:
      "Trabajo con datos, modelos y evidencia para tomar decisiones más sólidas. Evaluaciones de impacto, análisis econométrico, modelos de riesgo y reportes de política pública.",
  },
  {
    title: "Modelos, reportes y visualización",
    description:
      "Desarrollo análisis econométricos, dashboards en Power BI, reportes ejecutivos y piezas listas para presentar a stakeholders, inversores o equipos directivos.",
  },
  {
    title: "Portfolio y comunicación técnica",
    description:
      "Transformo trabajos técnicos en casos claros, profesionales y fáciles de compartir. Narrativas de análisis, presentaciones ejecutivas y documentación de proyectos.",
  },
];

const background = [
  {
    title: "Sector privado",
    subtitle: "American Express · AML/KYC",
    description:
      "Trabajo como Analista AML/KYC en American Express. Gestiono validaciones KYC/KYB en todo el ciclo de vida para comercios en Francia: onboarding, remediación y refresh. Ejecuto evaluaciones de riesgo AML y sanciones sobre UBOs, representantes legales y firmantes autorizados, con escalada a jurisdicciones de alto riesgo. Impulsé mejoras de proceso automatizando campos obligatorios de casos con SQL y Google BigQuery.",
  },
  {
    title: "ONGs y liderazgo",
    subtitle: "Rotary International · Rotaract",
    description:
      "Llevo más de 8 años en Rotary, hoy como Vice-Presidente del club Rotaract Libertador Recoleta. Lideré campañas de servicio social y colaboraciones estratégicas con organizaciones y empresas, coordinando un equipo de 20 profesionales jóvenes. Participé del Rotary Youth Exchange Program (RYE), viviendo un año en Belleville, Francia.",
  },
  {
    title: "Formación académica",
    subtitle: "UTDT + UBA",
    description:
      "Licenciado en Ciencia Política por la UBA y cursando la Maestría en Economía Aplicada en UTDT. Foco en econometría, evaluación de políticas públicas, desarrollo económico, finanzas públicas y mercados laborales. Complementado con cursos en Yale (Financial Markets), Yonsei University (Big Data) y formación técnica en Data Science y Python.",
  },
];

const skills = [
  {
    category: "Análisis & Modelado",
    items: ["Python (Pandas, Scikit-learn, Matplotlib)", "R (ggplot2, tidyverse)", "STATA", "Econometría aplicada", "Análisis de regresión", "Evaluación de impacto"],
  },
  {
    category: "Datos & BI",
    items: ["SQL / Google BigQuery", "Power BI", "Excel avanzado", "EDA (Análisis Exploratorio)", "Data wrangling", "Visualización de datos"],
  },
  {
    category: "Compliance & Riesgo",
    items: ["AML / KYC / KYB", "Evaluación de riesgo de sanciones", "Revisión de UBOs y PEPs", "Auditoría y documentación de casos", "Procesos de onboarding/remediación", "Due diligence"],
  },
  {
    category: "Idiomas",
    items: ["Español (nativo)", "Inglés (avanzado · FCE)", "Francés (avanzado · DELF B2)", "Portugués (intermedio)"],
  },
];

const certifications = [
  { title: "Financial Markets", issuer: "Yale University", year: "2022" },
  { title: "Big Data & Emerging Technologies", issuer: "Yonsei University", year: "2021" },
  { title: "Data Analytics & Data Science", issuer: "Coderhouse", year: "2021–2024" },
  { title: "Full Stack Python", issuer: "Codo a Codo · GCBA", year: "2024" },
  { title: "FCE (First Certificate in English)", issuer: "Cambridge", year: "" },
  { title: "DELF B2", issuer: "Institut Français", year: "" },
];

const projects = [
  {
    title: "Korea Income & Welfare",
    consultingType: "Análisis socioeconómico y bienestar",
    summary:
      "Análisis de ingreso y bienestar de hogares con técnicas de ciencia de datos aplicada. Útil para organismos públicos, fundaciones o equipos de research que necesitan convertir datos sociales en evidencia accionable.",
    stack: ["Python", "Pandas", "Scikit-learn"],
    repoUrl: "https://github.com/TorradoSantiago/korea_income-welfare",
    fit: "Ideal para estudios de pobreza, bienestar, ingreso y desigualdad.",
    featured: true,
  },
  {
    title: "Conectar Esperanza",
    consultingType: "Evaluación de impacto — política pública",
    summary:
      "Evaluación econométrica de un programa social con base empírica sólida. Directamente alineado con consultoría para gobiernos, ONGs y programas sociales que necesitan medir resultados con rigor.",
    stack: ["R", "ggplot2", "Econometría"],
    repoUrl: "https://github.com/TorradoSantiago/ConectarEsperanza-Policy-R",
    fit: "Aplicable a evaluación de programas, financiamiento y rendición de cuentas.",
  },
  {
    title: "RealState FODA",
    consultingType: "Inteligencia comercial · mercado inmobiliario",
    summary:
      "Análisis FODA e inteligencia de mercado para el sector inmobiliario. Para desarrolladores, brokers o inversores que necesitan transformar datos en decisiones comerciales más claras.",
    stack: ["Power BI", "Excel", "Presentación ejecutiva"],
    repoUrl: "https://github.com/TorradoSantiago/RealStateFODA-pbix",
    fit: "Sirve para estudios de mercado, scouting de oportunidades y presentación a inversores.",
  },
  {
    title: "EDA EPH",
    consultingType: "Análisis laboral y de hogares · Argentina",
    summary:
      "Exploración y análisis de la Encuesta Permanente de Hogares (INDEC). Vinculado a consultoría para sector público, medios o centros de investigación sobre empleo, hogares y pobreza.",
    stack: ["Python", "Pandas", "Matplotlib"],
    repoUrl: "https://github.com/TorradoSantiago/EDA.EPH-Phyton",
    fit: "Relevante para informes de mercado laboral, diagnósticos territoriales y policy briefs.",
  },
  {
    title: "Ejercicios de Regresión",
    consultingType: "Modelado econométrico aplicado",
    summary:
      "Base técnica en regresión, inferencia causal y análisis cuantitativo para responder preguntas concretas de negocio o política pública.",
    stack: ["Python", "Notebooks", "Econometría"],
    repoUrl: "https://github.com/TorradoSantiago/ejercicios.regresion",
    fit: "Pricing, impacto, comportamiento y modelado de relaciones entre variables.",
  },
  {
    title: "Codo 2024",
    consultingType: "Implementación web y presentación de resultados",
    summary:
      "Proyecto de desarrollo Full Stack Python. Muestra capacidad de llevar resultados o servicios a una capa web clara, ordenada y navegable para presentar ante stakeholders.",
    stack: ["HTML", "CSS", "Python / Flask"],
    repoUrl: "https://github.com/TorradoSantiago/Codo2024",
    fit: "Útil cuando un análisis necesita una interfaz simple para presentarse mejor.",
  },
];

const featuredProject = projects.find((p) => p.featured) ?? projects[0];
const portfolioProjects = projects.filter((p) => !p.featured);

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#perfil", label: "Perfil" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contacto", label: "Contacto" },
];

type FormStatus = "idle" | "sending" | "success";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formErrors, setFormErrors] = useState<Partial<typeof formData>>({});
  const sectionRefs = useRef<{ [key: string]: IntersectionObserverEntry }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { sectionRefs.current[e.target.id] = e; });
        const visible = Object.entries(sectionRefs.current)
          .filter(([, e]) => e.isIntersecting)
          .map(([id]) => id);
        if (visible.length > 0) setActiveSection(visible[0]);
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function validate() {
    const e: Partial<typeof formData> = {};
    if (!formData.name.trim()) e.name = "Requerido.";
    if (!formData.email.trim()) e.email = "Requerido.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Email inválido.";
    if (!formData.message.trim()) e.message = "Requerido.";
    return e;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setFormErrors((p) => ({ ...p, [e.target.name]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    setFormStatus("sending");
    const subject = encodeURIComponent(formData.subject || `Consulta de ${formData.name}`);
    const body = encodeURIComponent(`Nombre: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.open(`mailto:santiagotorradouba@gmail.com?subject=${subject}&body=${body}`);
    await new Promise((r) => setTimeout(r, 600));
    setFormStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setFormStatus("idle"), 5000);
  }

  // ── SHARED BUTTON STYLES ──────────────────────────────────────────
  const btnPrimary = "inline-flex items-center justify-center rounded-full border border-slate-900 bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 hover:shadow-sm";
  const btnSecondary = "inline-flex items-center justify-center rounded-full border border-[#ccc5bb] bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400";

  return (
    <main className="min-h-screen bg-[#f6f2eb] text-slate-900">

      {/* ── HEADER ────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[#e5ded3] bg-[#f6f2eb]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <div>
            <p className="font-[family:var(--font-display)] text-2xl text-slate-950">Santiago Torrado</p>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Consultoría · Datos · Política Pública</p>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`transition hover:text-slate-950 ${activeSection === href.replace("#", "") ? "font-semibold text-slate-950" : ""}`}
              >
                {label}
              </a>
            ))}
            <a href="https://linkedin.com/in/santiago-torrado" target="_blank" rel="noreferrer" className={btnSecondary} style={{ padding: "0.5rem 1rem" }}>LinkedIn</a>
            <a href="https://github.com/TorradoSantiago" target="_blank" rel="noreferrer" className={btnSecondary} style={{ padding: "0.5rem 1rem" }}>GitHub</a>
          </nav>

          {/* Hamburger */}
          <button className="flex flex-col gap-1.5 p-2 md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Menú">
            <span className={`block h-0.5 w-6 bg-slate-900 transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-slate-900 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-slate-900 transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className={`overflow-hidden transition-all duration-300 md:hidden ${menuOpen ? "max-h-96 border-t border-[#e5ded3]" : "max-h-0"}`}>
          <nav className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-white hover:text-slate-950">{label}</a>
            ))}
            <div className="mt-2 flex gap-3">
              <a href="https://linkedin.com/in/santiago-torrado" target="_blank" rel="noreferrer" className="flex-1 rounded-full border border-[#d8d1c6] bg-white py-2 text-center text-sm font-medium text-slate-900">LinkedIn</a>
              <a href="https://github.com/TorradoSantiago" target="_blank" rel="noreferrer" className="flex-1 rounded-full border border-[#d8d1c6] bg-white py-2 text-center text-sm font-medium text-slate-900">GitHub</a>
            </div>
          </nav>
        </div>
      </header>

      {/* ── HERO ──────────────────────────────────────── */}
      <section className="border-b border-[#e9e2d8]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="inline-flex rounded-full border border-[#ddd5c8] bg-white px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-500">
              Consultoría general · AML/KYC · Data Science
            </p>
            <h1 className="mt-8 max-w-4xl font-[family:var(--font-display)] text-5xl leading-none text-slate-950 sm:text-6xl">
              Datos, riesgo y política pública para proyectos que necesitan decisiones con evidencia.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Soy Santiago Torrado. Analista AML/KYC en American Express, maestrando en Economía
              Aplicada en la UTDT y Licenciado en Ciencia Política de la UBA. Cruzo
              experiencia en compliance financiero, evaluación de impacto y ciencia de datos
              para ayudarte a transformar información en decisiones más sólidas.
            </p>

            <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
              {["Python · R · SQL", "AML · KYC · Sanciones", "Econometría aplicada", "Power BI · BigQuery", "Inglés FCE · Francés DELF B2"].map((tag) => (
                <span key={tag} className="rounded-full border border-[#ddd5c8] bg-white px-3 py-1">{tag}</span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#servicios" className={btnPrimary}>Ver servicios</a>
              <a href="https://calendly.com/santiago-torrado" target="_blank" rel="noreferrer" className={btnSecondary}>Reservar una llamada</a>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#e2dbd0] bg-white p-8 shadow-[0_18px_45px_rgba(77,90,102,0.08)]">
            <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Perfil de trabajo</p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-4xl text-slate-950">Un perfil híbrido para problemas reales.</h2>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              No ofrezco solo teoría ni solo ejecución técnica. Trabajo donde se cruzan
              datos, riesgo, contexto institucional y comunicación clara.
            </p>

            <div className="mt-6 space-y-3">
              {[
                { icon: "🏦", text: "AML/KYC Analyst en American Express — riesgo, compliance y calidad de datos." },
                { icon: "📊", text: "Econometría aplicada, evaluación de impacto y modelado cuantitativo." },
                { icon: "🌍", text: "Cuatro idiomas: español, inglés, francés y portugués." },
                { icon: "🎓", text: "Master en Economía Aplicada (UTDT) + Lic. Ciencia Política (UBA)." },
                { icon: "🤝", text: "Liderazgo en Rotaract — gestión de equipos y proyectos sociales." },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 rounded-[1.25rem] border border-[#ece6dd] bg-[#fcfaf7] p-4 text-sm leading-6 text-slate-600">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* ── TRAYECTORIA ───────────────────────────────── */}
      <section id="perfil" className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Trayectoria</p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-4xl text-slate-950">Quién soy y desde dónde trabajo.</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            La propuesta parte de tres bases: experiencia en sector privado, trabajo en organizaciones
            sociales y formación académica orientada a evidencia, evaluación y decisión.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {background.map((item) => (
            <article key={item.title} className="rounded-[1.8rem] border border-[#e4ddd2] bg-white p-7 transition hover:shadow-md">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{item.subtitle}</p>
              <h3 className="mt-3 font-[family:var(--font-display)] text-2xl text-slate-950">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>

        {/* Skills grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {skills.map((s) => (
            <div key={s.category} className="rounded-[1.6rem] border border-[#e4ddd2] bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{s.category}</p>
              <ul className="mt-4 space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-6">
          <p className="mb-4 text-xs uppercase tracking-[0.24em] text-slate-500">Cursos y certificaciones</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c) => (
              <div key={c.title} className="flex items-center gap-4 rounded-[1.25rem] border border-[#e4ddd2] bg-white px-5 py-4">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#f0ece5] text-base">🎓</span>
                <div>
                  <p className="text-sm font-medium text-slate-900">{c.title}</p>
                  <p className="text-xs text-slate-500">{c.issuer}{c.year ? ` · ${c.year}` : ""}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ─────────────────────────────────── */}
      <section id="servicios" className="border-y border-[#e9e2d8] bg-[#fbf9f5]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Servicios</p>
              <h2 className="mt-3 font-[family:var(--font-display)] text-4xl text-slate-950">Primero, una consultoría general bien planteada.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Después, si hace falta, esa consultoría se especializa en evaluación, inteligencia
              comercial, modelado econométrico, compliance financiero o piezas ejecutivas.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, i) => (
              <article key={service.title} className="group rounded-[1.6rem] border border-[#e4ddd2] bg-white p-6 transition hover:border-slate-300 hover:shadow-md">
                <span className="text-xs font-semibold text-slate-400">0{i + 1}</span>
                <h3 className="mt-2 font-[family:var(--font-display)] text-xl text-slate-950">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
                <a href="#contacto" className="mt-5 inline-block text-xs font-medium text-slate-500 underline-offset-4 transition group-hover:text-slate-900 group-hover:underline">
                  Consultar →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ─────────────────────────────────── */}
      <section id="portfolio" className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Portfolio</p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-4xl text-slate-950 sm:text-5xl">
              Cada proyecto queda asociado a un tipo de consultoría concreto.
            </h2>
          </div>
          <a href="https://github.com/TorradoSantiago?tab=repositories" target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-600 underline-offset-4 transition hover:text-slate-950 hover:underline">
            Ver todos en GitHub →
          </a>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Featured */}
          <article className="rounded-[2rem] border border-[#ddd6cb] bg-white p-8 shadow-[0_18px_45px_rgba(77,90,102,0.08)]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#eef2f1] px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">Proyecto destacado</span>
              <span className="rounded-full border border-[#e8e0d5] px-3 py-1 text-xs text-slate-500">{featuredProject.consultingType}</span>
            </div>
            <h3 className="mt-6 font-[family:var(--font-display)] text-4xl text-slate-950">{featuredProject.title}</h3>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">{featuredProject.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {featuredProject.stack.map((item) => (
                <span key={item} className="rounded-full border border-[#e7e0d5] bg-[#fcfaf7] px-3 py-1 text-xs text-slate-600">{item}</span>
              ))}
            </div>
            <p className="mt-7 rounded-[1.4rem] border border-[#ece4d9] bg-[#fcfaf7] p-5 text-sm leading-7 text-slate-600">{featuredProject.fit}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={featuredProject.repoUrl} target="_blank" rel="noreferrer" className={btnPrimary}>Ver repo</a>
              <a href="#contacto" className={btnSecondary}>Pedir versión ejecutiva</a>
            </div>
          </article>

          {/* Others */}
          <div className="grid gap-4">
            {portfolioProjects.map((project) => (
              <article key={project.title} className="rounded-[1.6rem] border border-[#e4ddd2] bg-white p-6 transition hover:shadow-md">
                <h3 className="font-[family:var(--font-display)] text-2xl text-slate-950">{project.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{project.consultingType}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full bg-[#eef2f1] px-3 py-1 text-xs text-slate-600">{item}</span>
                  ))}
                </div>
                <p className="mt-3 text-xs leading-6 text-slate-500">{project.fit}</p>
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center text-sm font-medium text-slate-700 underline-offset-4 transition hover:text-slate-950 hover:underline">
                  Abrir repo →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ──────────────────────────────────── */}
      <section id="contacto" className="border-t border-[#e9e2d8] bg-[#fbf9f5]">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Contacto</p>
              <h2 className="mt-3 font-[family:var(--font-display)] text-4xl text-slate-950">Hablemos. El primer paso siempre es una conversación.</h2>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                Si tenés un proyecto, una pregunta o querés entender cómo puedo ayudarte,
                mandame un mensaje o agendá una llamada directamente.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  { icon: "✉", label: "santiagotorradouba@gmail.com", href: "mailto:santiagotorradouba@gmail.com" },
                  { icon: "📅", label: "Reservar llamada en Calendly", href: "https://calendly.com/santiago-torrado" },
                  { icon: "💼", label: "LinkedIn · Santiago Torrado", href: "https://linkedin.com/in/santiago-torrado" },
                  { icon: "💻", label: "GitHub · TorradoSantiago", href: "https://github.com/TorradoSantiago" },
                ].map((link) => (
                  <a key={link.href} href={link.href} target={link.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer" className="flex items-center gap-3 rounded-[1.25rem] border border-[#e4ddd2] bg-white p-4 text-sm text-slate-700 transition hover:border-slate-300 hover:shadow-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0ece5] text-base">{link.icon}</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="rounded-[2rem] border border-[#e2dbd0] bg-white p-8 shadow-[0_18px_45px_rgba(77,90,102,0.08)]">
              {formStatus === "success" ? (
                <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                  <span className="text-4xl">✅</span>
                  <h3 className="font-[family:var(--font-display)] text-2xl text-slate-950">¡Mensaje enviado!</h3>
                  <p className="text-sm leading-7 text-slate-600">
                    Se abrió tu cliente de correo con el mensaje listo. Si no se abrió, escribime a{" "}
                    <a href="mailto:santiagotorradouba@gmail.com" className="underline">santiagotorradouba@gmail.com</a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Escribime</p>
                    <h3 className="mt-2 font-[family:var(--font-display)] text-3xl text-slate-950">¿En qué puedo ayudarte?</h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {(["name", "email"] as const).map((field) => (
                      <div key={field}>
                        <label className="mb-1.5 block text-xs font-medium text-slate-600" htmlFor={field}>
                          {field === "name" ? "Nombre *" : "Email *"}
                        </label>
                        <input
                          id={field} name={field} type={field === "email" ? "email" : "text"}
                          value={formData[field]} onChange={handleChange}
                          placeholder={field === "name" ? "Tu nombre" : "tu@email.com"}
                          className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-slate-300 ${formErrors[field] ? "border-red-400 bg-red-50" : "border-[#e4ddd2] bg-[#fcfaf7]"}`}
                        />
                        {formErrors[field] && <p className="mt-1 text-xs text-red-500">{formErrors[field]}</p>}
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600" htmlFor="subject">Asunto</label>
                    <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} placeholder="¿Sobre qué es tu consulta?" className="w-full rounded-xl border border-[#e4ddd2] bg-[#fcfaf7] px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-slate-300" />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600" htmlFor="message">Mensaje *</label>
                    <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Contame de tu proyecto, organización o lo que necesitás..." className={`w-full resize-none rounded-xl border px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-slate-300 ${formErrors.message ? "border-red-400 bg-red-50" : "border-[#e4ddd2] bg-[#fcfaf7]"}`} />
                    {formErrors.message && <p className="mt-1 text-xs text-red-500">{formErrors.message}</p>}
                  </div>

                  <button type="submit" disabled={formStatus === "sending"} className={`${btnPrimary} w-full disabled:opacity-60`}>
                    {formStatus === "sending" ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────── */}
      <footer className="border-t border-[#e5ded3]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Santiago Torrado · Consultoría de datos y política pública</p>
          <div className="flex items-center gap-5">
            <a href="https://github.com/TorradoSantiago" target="_blank" rel="noreferrer" className="transition hover:text-slate-900">GitHub</a>
            <a href="https://linkedin.com/in/santiago-torrado" target="_blank" rel="noreferrer" className="transition hover:text-slate-900">LinkedIn</a>
            <a href="mailto:santiagotorradouba@gmail.com" className="transition hover:text-slate-900">Email</a>
          </div>
        </div>
      </footer>

      {/* ── SCROLL TO TOP ─────────────────────────────── */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Volver arriba" className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[#d8d1c6] bg-white shadow-md transition hover:bg-slate-50">
          ↑
        </button>
      )}
    </main>
  );
}
