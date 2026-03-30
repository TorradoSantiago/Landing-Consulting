const signals = [
  {
    value: "Publico, privado y social",
    label: "Contextos",
    detail:
      "El trabajo no parte solo del dato. Parte de incentivos, restricciones y tipos de decision distintos.",
  },
  {
    value: "Analisis + narrativa + entrega",
    label: "Recorrido",
    detail:
      "La propuesta cubre desde el diagnostico inicial hasta la pieza final que se comparte con un equipo o decisor.",
  },
  {
    value: "Python, R, SQL, BI y criterio",
    label: "Herramientas",
    detail:
      "Las herramientas se eligen por la pregunta y por el entregable, no por costumbre tecnica.",
  },
];

const serviceTracks = [
  {
    title: "Diagnostico y estrategia basada en evidencia",
    summary:
      "Ordeno preguntas, informacion disponible y criterios de decision para convertir problemas difusos en una hoja de ruta util.",
    output: "Memo, brief, mapa de decision o nota ejecutiva.",
  },
  {
    title: "Evaluacion, econometria y analisis aplicado",
    summary:
      "Trabajo con bases de datos, modelos y evidencia para medir, comparar, priorizar e interpretar con una narrativa defendible.",
    output: "Notebook, reporte tecnico, evaluacion o anexo metodologico.",
  },
  {
    title: "Dashboards, visualizacion y materiales ejecutivos",
    summary:
      "Llevo resultados y hallazgos a dashboards, reportes, presentaciones y piezas que puedan circular fuera del entorno tecnico.",
    output: "Dashboard, deck, PDF ejecutivo o caso de portfolio.",
  },
];

const sectors = [
  {
    title: "Equipos publicos y policy",
    summary:
      "Para programas, evaluaciones, diagnosticos territoriales y preguntas donde el contexto institucional cambia la lectura del dato.",
  },
  {
    title: "Equipos privados y de riesgo",
    summary:
      "Para analisis, procesos, calidad de datos, compliance y piezas que necesitan orden, trazabilidad y criterio operativo.",
  },
  {
    title: "Fundaciones, ONGs y proyectos con impacto",
    summary:
      "Para equipos que necesitan convertir trabajo social o programatico en evidencia, seguimiento y materiales de rendicion.",
  },
];

const cases = [
  {
    title: "Korea Income & Welfare",
    sector: "Analisis socioeconomico y bienestar",
    framing:
      "Caso de ciencia de datos aplicado a ingresos y bienestar con foco en convertir una base grande en una lectura util para policy y research.",
    value:
      "Muestra capacidad de trabajar sobre preguntas sociales con modelado, limpieza y narrativa orientada a decision.",
    output: "Notebook analitico y estructura replicable para reportes o version ejecutiva.",
    repoUrl: "https://github.com/TorradoSantiago/korea_income-welfare",
    featured: true,
  },
  {
    title: "Conectar Esperanza",
    sector: "Evaluacion para politica publica",
    framing:
      "Proyecto orientado a impacto, resultados y estructura de evaluacion para una iniciativa con componente social.",
    value:
      "Hace visible la afinidad entre evaluacion, organizaciones y lenguaje de programas publicos o sociales.",
    output: "Base en R para organizar datos, criterios y siguientes iteraciones de analisis.",
    repoUrl: "https://github.com/TorradoSantiago/ConectarEsperanza-Policy-R",
  },
  {
    title: "RealState FODA",
    sector: "Inteligencia comercial e inversion",
    framing:
      "Caso de lectura de mercado inmobiliario con dashboard y narrativa ejecutiva para oportunidades y riesgos.",
    value:
      "Conecta visualizacion, lectura comercial y presentacion final para discusiones de negocio o inversion.",
    output: "Power BI, documentacion de caso y guia de rediseno ejecutivo.",
    repoUrl: "https://github.com/TorradoSantiago/RealStateFODA-pbix",
  },
  {
    title: "EDA EPH",
    sector: "Mercado laboral y hogares",
    framing:
      "Exploracion sobre ingreso, territorio y caracteristicas del hogar con una logica cercana a diagnosticos publicos.",
    value:
      "Aporta preguntas bien formuladas, interpretacion socioeconomica y base de trabajo para informes o policy briefs.",
    output: "Notebook exploratorio con preguntas, estructura y dependencias reproducibles.",
    repoUrl: "https://github.com/TorradoSantiago/EDA.EPH-Phyton",
  },
  {
    title: "Ejercicios de Regresion",
    sector: "Econometria aplicada",
    framing:
      "Repositorio tecnico para mostrar como se plantea, ejecuta y documenta un analisis de regresion con mejor reproducibilidad.",
    value:
      "Sirve como prueba de criterio metodologico, interpretacion y orden tecnico dentro de un caso cuantitativo.",
    output: "Script reproducible, outputs exportables y documentacion de portfolio.",
    repoUrl: "https://github.com/TorradoSantiago/ejercicios.regresion",
  },
];

const background = [
  {
    title: "Sector privado",
    subtitle: "American Express",
    detail:
      "Experiencia en AML, KYC, procesos, controles y calidad de datos, con foco operativo y criterio de riesgo.",
  },
  {
    title: "Trabajo social y liderazgo",
    subtitle: "Rotary y Rotaract",
    detail:
      "Trayectoria sostenida en organizaciones, coordinacion de proyectos y articulacion con actores diversos.",
  },
  {
    title: "Formacion academica",
    subtitle: "UTDT + UBA",
    detail:
      "Base en ciencia politica y economia aplicada, con foco en econometria, evaluacion y lectura institucional.",
  },
];

const principles = [
  "Primero se define el problema correcto y el publico del entregable.",
  "Despues se elige la herramienta y el nivel de profundidad tecnica.",
  "El resultado final tiene que poder usarse para decidir, no solo para mostrar codigo.",
];

const engagementModels = [
  {
    title: "Sprint de diagnostico",
    description:
      "Ideal cuando el problema todavia esta abierto y hace falta ordenar informacion, prioridades y linea de trabajo.",
  },
  {
    title: "Proyecto con entregable",
    description:
      "Para preguntas concretas que necesitan terminar en un reporte, dashboard, nota ejecutiva o caso de portfolio.",
  },
  {
    title: "Acompanamiento por iteraciones",
    description:
      "Para equipos que necesitan apoyo recurrente en analisis, validacion, visualizacion o presentacion de resultados.",
  },
];

const featuredCase = cases.find((item) => item.featured) ?? cases[0];
const secondaryCases = cases.filter((item) => !item.featured);

export default function Home() {
  return (
    <main className="relative overflow-x-hidden text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top_left,rgba(196,108,58,0.18),transparent_24%),radial-gradient(circle_at_top_right,rgba(36,73,118,0.16),transparent_28%)]" />

      <header className="sticky top-0 z-50 border-b border-[#ded7cb] bg-[#f5f1ea]/88 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
          <div>
            <p className="font-[family:var(--font-display)] text-3xl leading-none text-slate-950">
              Santiago Torrado
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.26em] text-slate-500">
              consultoria en datos, evaluacion y estrategia aplicada
            </p>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a href="#servicios" className="transition hover:text-slate-950">
              Servicios
            </a>
            <a href="#casos" className="transition hover:text-slate-950">
              Casos
            </a>
            <a href="#perfil" className="transition hover:text-slate-950">
              Perfil
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-[#d9d0c2] bg-white px-4 py-2 text-slate-900 transition hover:border-slate-400"
            >
              Contacto
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-[#ddcfbd] bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-500">
              datos, criterio institucional y materiales ejecutivos
            </p>
            <h1 className="mt-8 max-w-5xl font-[family:var(--font-display)] text-6xl leading-none text-slate-950 sm:text-7xl">
              Analisis y estrategia para equipos que necesitan mas claridad y mejor presentacion.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Trabajo donde se cruzan evidencia, contexto institucional y
              comunicacion ejecutiva. Eso me permite ayudar tanto a equipos
              publicos y sociales como a proyectos privados que necesitan una
              lectura defendible y una forma profesional de mostrarla.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-500">
              {[
                "Python / R / SQL",
                "Policy / econometria / evaluacion",
                "AML / KYC / riesgo",
                "Power BI / BigQuery / reporting",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#ddd5c8] bg-white px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#casos"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Ver casos de trabajo
              </a>
              <a
                href="mailto:santiagotorradouba@gmail.com?subject=Consulta%20de%20trabajo"
                className="inline-flex items-center justify-center rounded-full border border-[#d9d0c2] bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
              >
                Escribir por email
              </a>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#e0d8cd] bg-[#1d2938] p-8 text-white shadow-[0_24px_65px_rgba(31,41,55,0.28)]">
            <p className="text-xs uppercase tracking-[0.26em] text-[#f7c8a4]">
              Promesa de trabajo
            </p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none">
              No solo analizo. Tambien ordeno, traduzco y entrego.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              La diferencia esta en el recorrido completo: entender la pregunta,
              trabajar la evidencia correcta y devolver un resultado que sirva
              para discutir, decidir o presentar.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Diagnostico claro antes de elegir herramienta.",
                "Profundidad tecnica ajustada al problema real.",
                "Entregables pensados para circular fuera del notebook.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {signals.map((item) => (
            <article
              key={item.label}
              className="rounded-[1.7rem] border border-[#e3dbcf] bg-white/90 p-5 shadow-[0_18px_40px_rgba(82,78,67,0.06)]"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                {item.label}
              </p>
              <h2 className="mt-3 font-[family:var(--font-display)] text-3xl leading-none text-slate-950">
                {item.value}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e6ddd0] bg-[#fbf8f3]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {sectors.map((sector) => (
              <article
                key={sector.title}
                className="rounded-[1.7rem] border border-[#e4ddd2] bg-white p-7 shadow-[0_12px_30px_rgba(82,78,67,0.05)]"
              >
                <h2 className="font-[family:var(--font-display)] text-3xl leading-none text-slate-950">
                  {sector.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{sector.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Servicios
            </p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
              Una consultoria que puede entrar por varias puertas, pero con la misma exigencia.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            Algunas veces el punto de entrada es un analisis. Otras, una evaluacion,
            un dashboard o una necesidad de ordenar y contar mejor un trabajo ya hecho.
            La logica de fondo es siempre la misma: claridad, criterio y entrega.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {serviceTracks.map((track) => (
            <article
              key={track.title}
              className="rounded-[1.8rem] border border-[#e4ddd2] bg-white p-7 shadow-[0_14px_34px_rgba(82,78,67,0.05)]"
            >
              <h3 className="font-[family:var(--font-display)] text-3xl leading-tight text-slate-950">
                {track.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{track.summary}</p>
              <p className="mt-5 rounded-[1.15rem] bg-[#f6f2eb] px-4 py-3 text-sm leading-6 text-slate-700">
                {track.output}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="casos" className="border-y border-[#e6ddd0] bg-[#f7f3ec]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                Casos y portfolio
              </p>
              <h2 className="mt-3 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
                Cada proyecto funciona como evidencia de una forma de trabajar.
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
            <article className="rounded-[2rem] border border-[#ddd4c8] bg-[#1d2938] p-8 text-white shadow-[0_24px_65px_rgba(31,41,55,0.24)]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#f4c9a8]">
                  Caso destacado
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                  {featuredCase.sector}
                </span>
              </div>

              <h3 className="mt-6 font-[family:var(--font-display)] text-5xl leading-none">
                {featuredCase.title}
              </h3>
              <p className="mt-6 text-base leading-8 text-slate-300">
                {featuredCase.framing}
              </p>
              <p className="mt-4 rounded-[1.4rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-200">
                {featuredCase.value}
              </p>
              <p className="mt-5 text-sm leading-7 text-slate-300">{featuredCase.output}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={featuredCase.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Ver repo
                </a>
                <a
                  href="mailto:santiagotorradouba@gmail.com?subject=Version%20ejecutiva%20de%20caso"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20"
                >
                  Pedir version ejecutiva
                </a>
              </div>
            </article>

            <div className="grid gap-4">
              {secondaryCases.map((project) => (
                <article
                  key={project.title}
                  className="rounded-[1.6rem] border border-[#e4ddd2] bg-white p-6 shadow-[0_12px_30px_rgba(82,78,67,0.05)]"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    {project.sector}
                  </p>
                  <h3 className="mt-3 font-[family:var(--font-display)] text-3xl leading-none text-slate-950">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{project.framing}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{project.value}</p>
                  <p className="mt-4 rounded-[1.1rem] bg-[#f6f2eb] px-4 py-3 text-sm leading-6 text-slate-700">
                    {project.output}
                  </p>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center text-sm font-medium text-slate-700 underline-offset-4 transition hover:text-slate-950 hover:underline"
                  >
                    Abrir repo
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="perfil" className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Perfil de trabajo
            </p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
              Un perfil que puede moverse entre rigor tecnico y lectura de contexto.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              Ese cruce es util cuando el problema no es solo estadistico ni solo
              narrativo. En muchos proyectos lo que falta no es una herramienta nueva,
              sino alguien que ordene mejor la pregunta, el metodo y la forma de entrega.
            </p>

            <div className="mt-8 space-y-3">
              {principles.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.4rem] border border-[#e4ddd2] bg-white px-5 py-4 text-sm leading-7 text-slate-700 shadow-[0_12px_30px_rgba(82,78,67,0.04)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {background.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.7rem] border border-[#e4ddd2] bg-white p-6 shadow-[0_12px_30px_rgba(82,78,67,0.05)]"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  {item.subtitle}
                </p>
                <h3 className="mt-3 font-[family:var(--font-display)] text-3xl leading-none text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#e6ddd0] bg-[#fbf8f3]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {engagementModels.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.7rem] border border-[#e4ddd2] bg-white p-7 shadow-[0_12px_30px_rgba(82,78,67,0.05)]"
              >
                <h2 className="font-[family:var(--font-display)] text-3xl leading-none text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="rounded-[2.2rem] border border-[#ded6ca] bg-[#1d2938] px-7 py-10 text-white shadow-[0_24px_65px_rgba(31,41,55,0.22)] sm:px-10">
          <p className="text-sm uppercase tracking-[0.24em] text-[#f4c9a8]">Contacto</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-4xl font-[family:var(--font-display)] text-5xl leading-none">
                Si alguno de estos frentes te sirve, el siguiente paso es convertirlo en una propuesta concreta.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">
                Puedo ayudarte a estructurar un diagnostico, producir un entregable o
                volver mucho mas profesional un trabajo que ya existe pero todavia no
                esta bien contado.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:santiagotorradouba@gmail.com?subject=Consulta%20de%20trabajo"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Email
              </a>
              <a
                href="https://github.com/TorradoSantiago"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
