const services = [
  {
    title: "Consultoria de datos y diagnostico",
    description:
      "Acompano problemas de negocio, policy y research desde la pregunta inicial hasta la recomendacion final.",
  },
  {
    title: "Evaluacion y analisis aplicado",
    description:
      "Trabajo con datos, modelos y evidencia para tomar decisiones mas solidas en sector privado, publico y organizaciones sociales.",
  },
  {
    title: "Modelos, reportes y visualizacion",
    description:
      "Desarrollo analisis econometricos, dashboards, reportes ejecutivos y piezas listas para presentar.",
  },
  {
    title: "Portfolio y comunicacion tecnica",
    description:
      "Tambien transformo trabajos tecnicos en casos claros, profesionales y faciles de compartir.",
  },
];

const background = [
  {
    title: "Sector privado",
    subtitle: "American Express",
    description:
      "Trabajo como AML/KYC Compliance Analyst, llevando revisiones end-to-end, analisis de riesgo, control de calidad y mejoras de proceso con SQL y Google BigQuery.",
  },
  {
    title: "ONGs y liderazgo",
    subtitle: "Rotary International",
    description:
      "Participo desde hace anos en Rotary y hoy ejerzo liderazgo en Rotaract, coordinando campanas, alianzas y proyectos sociales con organizaciones y empresas.",
  },
  {
    title: "Formacion academica",
    subtitle: "UTDT + UBA",
    description:
      "Soy licenciado en Ciencia Politica por la UBA y curso la Maestria en Economia Aplicada en UTDT, con foco en econometria, evaluacion, desarrollo, finanzas publicas y mercados laborales.",
  },
];

const projects = [
  {
    title: "Korea Income & Welfare",
    consultingType: "Consultoria en analisis socioeconomico y bienestar",
    summary:
      "Proyecto orientado a estudiar ingreso y bienestar, util para organismos publicos, fundaciones o equipos de research que necesitan convertir datos sociales en evidencia accionable.",
    stack: ["Python", "Pandas", "Scikit-learn"],
    repoUrl: "https://github.com/TorradoSantiago/korea_income-welfare",
    fit: "Ideal para estudios de pobreza, bienestar, ingreso y desigualdad.",
    featured: true,
  },
  {
    title: "Conectar Esperanza",
    consultingType: "Evaluacion de impacto para politica publica",
    summary:
      "Caso directamente alineado con consultoria para gobiernos, ONGs y programas sociales que necesitan medir resultados e impacto con una base econometrica seria.",
    stack: ["R", "ggplot2", "Impacto"],
    repoUrl: "https://github.com/TorradoSantiago/ConectarEsperanza-Policy-R",
    fit: "Aplicable a evaluacion de programas, financiamiento y rendicion de cuentas.",
  },
  {
    title: "RealState FODA",
    consultingType: "Inteligencia comercial e inversion inmobiliaria",
    summary:
      "Trabajo pensado para desarrolladores, brokers o inversores que necesitan transformar datos de mercado y presentaciones tecnicas en decisiones comerciales mas claras.",
    stack: ["Power BI", "Excel", "Presentacion"],
    repoUrl: "https://github.com/TorradoSantiago/RealStateFODA-pbix",
    fit: "Sirve para estudios de mercado, scouting de oportunidades y presentacion a inversores.",
  },
  {
    title: "EDA EPH",
    consultingType: "Analisis laboral y de hogares",
    summary:
      "Proyecto muy vinculado a consultoria para sector publico, medios o centros de investigacion que trabajan con empleo, hogares, pobreza y condiciones socioeconomicas.",
    stack: ["Python", "Pandas", "Matplotlib"],
    repoUrl: "https://github.com/TorradoSantiago/EDA.EPH-Phyton",
    fit: "Relevante para informes de mercado laboral, diagnosticos territoriales y policy briefs.",
  },
  {
    title: "Ejercicios de Regresion",
    consultingType: "Modelado econometrico aplicado",
    summary:
      "Muestra una base tecnica util para consultorias que requieren regresion, inferencia causal y analisis cuantitativo para responder preguntas concretas.",
    stack: ["Python", "Notebooks", "Econometria"],
    repoUrl: "https://github.com/TorradoSantiago/ejercicios.regresion",
    fit: "Valioso para pricing, impacto, comportamiento y modelado de relaciones entre variables.",
  },
  {
    title: "Codo 2024",
    consultingType: "Presentacion digital de productos y resultados",
    summary:
      "Este proyecto sirve para mostrar una linea de trabajo mas orientada a implementacion visual: llevar resultados o servicios a una capa web clara, ordenada y navegable.",
    stack: ["HTML", "CSS", "JavaScript"],
    repoUrl: "https://github.com/TorradoSantiago/Codo2024",
    fit: "Util cuando un analisis necesita una interfaz simple para presentarse mejor.",
  },
];

const featuredProject = projects.find((project) => project.featured) ?? projects[0];
const portfolioProjects = projects.filter((project) => !project.featured);

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f2eb] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-[#e5ded3] bg-[#f6f2eb]/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <div>
            <p className="font-[family:var(--font-display)] text-2xl text-slate-950">
              Santiago Torrado
            </p>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Consultoria de datos, politica publica y analisis aplicado
            </p>
          </div>

          <nav className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
            <a href="#servicios" className="transition hover:text-slate-950">
              Servicios
            </a>
            <a href="#portfolio" className="transition hover:text-slate-950">
              Portfolio
            </a>
            <a href="#contacto" className="transition hover:text-slate-950">
              Contacto
            </a>
            <a
              href="https://github.com/TorradoSantiago"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#d8d1c6] bg-white px-4 py-2 font-medium text-slate-900 transition hover:border-slate-400"
            >
              Ver GitHub
            </a>
          </nav>
        </div>
      </header>

      <section className="border-b border-[#e9e2d8]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="inline-flex rounded-full border border-[#ddd5c8] bg-white px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-500">
              Consultoria general
            </p>
            <h1 className="mt-8 max-w-4xl font-[family:var(--font-display)] text-5xl leading-none text-slate-950 sm:text-6xl">
              Consultoria en datos, evaluacion y estrategia para proyectos publicos, privados y sociales.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Soy Santiago Torrado. Cruzo experiencia en sector privado, trabajo en
              organizaciones sociales y formacion academica en ciencia politica y economia
              aplicada para ofrecer consultoria general en analisis, evaluacion,
              investigacion y presentacion de resultados.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#servicios"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Ver servicios
              </a>
              <a
                href="https://calendly.com/santiago-torrado"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#d8d1c6] bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
              >
                Reservar una llamada
              </a>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#e2dbd0] bg-white p-8 shadow-[0_18px_45px_rgba(77,90,102,0.08)]">
            <p className="text-xs uppercase tracking-[0.26em] text-slate-500">
              Perfil de trabajo
            </p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-4xl text-slate-950">
              Un perfil hibrido para problemas reales.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              No ofrezco solo teoria ni solo ejecucion tecnica. Trabajo donde se cruzan
              datos, contexto institucional, incentivos y comunicacion clara.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Experiencia actual en riesgo, compliance y calidad de datos.",
                "Trayectoria en liderazgo y gestion de proyectos sociales.",
                "Base academica fuerte en economia aplicada, politica publica y econometria.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.25rem] border border-[#ece6dd] bg-[#fcfaf7] p-4 text-sm leading-7 text-slate-600"
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Trayectoria
            </p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-4xl text-slate-950">
              Quien soy y desde donde trabajo.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            La propuesta parte de tres bases: experiencia en sector privado, trabajo en
            ONGs y una formacion academica orientada a evidencia, evaluacion y decision.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {background.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.8rem] border border-[#e4ddd2] bg-white p-7"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                {item.subtitle}
              </p>
              <h3 className="mt-3 text-2xl font-[family:var(--font-display)] text-slate-950">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="servicios" className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Servicios
            </p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-4xl text-slate-950">
              Primero, una consultoria general bien planteada.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            Despues, si hace falta, esa consultoria se especializa en evaluacion,
            inteligencia comercial, modelado econometrico, compliance o piezas ejecutivas.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-[1.6rem] border border-[#e4ddd2] bg-white p-6"
            >
              <h3 className="text-xl font-[family:var(--font-display)] text-slate-950">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="portfolio" className="border-y border-[#e9e2d8] bg-[#fbf9f5]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                Portfolio
              </p>
              <h2 className="mt-3 font-[family:var(--font-display)] text-4xl text-slate-950 sm:text-5xl">
                Cada proyecto queda asociado a un tipo de consultoria concreto.
              </h2>
            </div>
            <a
              href="https://github.com/TorradoSantiago?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-slate-600 underline-offset-4 transition hover:text-slate-950 hover:underline"
            >
              Ver repositorios en GitHub
            </a>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="rounded-[2rem] border border-[#ddd6cb] bg-white p-8 shadow-[0_18px_45px_rgba(77,90,102,0.08)]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#eef2f1] px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">
                  Proyecto destacado
                </span>
                <span className="rounded-full border border-[#e8e0d5] px-3 py-1 text-xs text-slate-500">
                  {featuredProject.consultingType}
                </span>
              </div>

              <h3 className="mt-6 font-[family:var(--font-display)] text-4xl text-slate-950">
                {featuredProject.title}
              </h3>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
                {featuredProject.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {featuredProject.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#e7e0d5] bg-[#fcfaf7] px-3 py-1 text-xs text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="mt-7 rounded-[1.4rem] border border-[#ece4d9] bg-[#fcfaf7] p-5 text-sm leading-7 text-slate-600">
                {featuredProject.fit}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={featuredProject.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Ver repo
                </a>
                <a
                  href="mailto:santiagotorradouba@gmail.com"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8d1c6] bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
                >
                  Pedir version ejecutiva
                </a>
              </div>
            </article>

            <div className="grid gap-4">
              {portfolioProjects.map((project) => (
                <article
                  key={project.title}
                  className="rounded-[1.6rem] border border-[#e4ddd2] bg-white p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-[family:var(--font-display)] text-slate-950">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                        {project.consultingType}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {project.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[#eef2f1] px-3 py-1 text-xs text-slate-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-600">{project.fit}</p>

                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center text-sm font-medium text-slate-700 underline-offset-4 transition hover:text-slate-950 hover:underline"
                  >
                    Abrir repo
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Contacto
            </p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-4xl text-slate-950">
              Si queres, el siguiente paso es convertir uno de estos trabajos en una propuesta comercial o en un PDF listo para compartir.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              La logica ya quedo armada para presentar un perfil mas concreto: formacion,
              experiencia actual, stack tecnico y un portfolio alineado con servicios de consultoria reales.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:santiagotorradouba@gmail.com"
              className="inline-flex items-center justify-center rounded-full border border-[#d8d1c6] bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
            >
              Email
            </a>
            <a
              href="https://calendly.com/santiago-torrado"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Agendar llamada
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
