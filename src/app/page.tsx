const advisoryTracks = [
  {
    title: "Diagnosticos y estrategia basada en evidencia",
    summary:
      "Trabajo la pregunta inicial, ordeno la informacion relevante y convierto un problema difuso en un mapa de decision util.",
    deliverable: "Brief estrategico, diagnostico o memo ejecutivo.",
  },
  {
    title: "Evaluacion, econometria y analisis aplicado",
    summary:
      "Diseno analisis que permitan medir, comparar, priorizar e identificar patrones con una narrativa defendible.",
    deliverable: "Notebook, reporte tecnico o evaluacion de impacto.",
  },
  {
    title: "Dashboards, visualizacion y piezas para presentar",
    summary:
      "Llevo datos y resultados a formatos que se puedan compartir con equipos, socios, clientes o decisores.",
    deliverable: "Dashboard, deck, PDF ejecutivo o landing de portfolio.",
  },
  {
    title: "Portfolio tecnico y posicionamiento profesional",
    summary:
      "Tambien trabajo sobre como se muestra el trabajo: arquitectura del caso, narrativa y presencia digital.",
    deliverable: "Sitio, repositorio pulido o version ejecutiva del proyecto.",
  },
];

const proofPoints = [
  {
    value: "Publico + privado + social",
    label: "Contextos",
    detail:
      "La propuesta cruza compliance, organizaciones y politica publica para leer mejor los incentivos reales.",
  },
  {
    value: "De la pregunta al entregable",
    label: "Recorrido",
    detail:
      "No trabajo solo modelado ni solo discurso: la logica incluye diagnostico, analisis y comunicacion.",
  },
  {
    value: "Python, R, SQL, BI y narrativa",
    label: "Herramientas",
    detail:
      "La profundidad tecnica se adapta al tipo de decision, no a una herramienta por costumbre.",
  },
];

const process = [
  {
    step: "01",
    title: "Definir el problema correcto",
    description:
      "Alineamos contexto, decision y publico. Antes de correr modelos, clarifico para que tiene que servir el trabajo.",
  },
  {
    step: "02",
    title: "Construir el analisis con criterio",
    description:
      "Ordeno fuentes, limpio datos, selecciono enfoque metodologico y documento supuestos importantes.",
  },
  {
    step: "03",
    title: "Traducir el resultado",
    description:
      "El entregable final no queda encerrado en un notebook: termina en una recomendacion, un dashboard o una pieza presentable.",
  },
];

const selectedWork = [
  {
    title: "Korea Income & Welfare",
    sector: "Analisis socioeconomico y bienestar",
    problem:
      "Explora como el nivel educativo y otras variables sociales se vinculan con ingresos y bienestar.",
    proof:
      "Demuestra capacidad para trabajar con data social, modelado y narrativa util para policy, research y fundaciones.",
    deliverable: "Notebook analitico con enfoque de machine learning y lectura aplicada.",
    repoUrl: "https://github.com/TorradoSantiago/korea_income-welfare",
    featured: true,
  },
  {
    title: "Conectar Esperanza",
    sector: "Evaluacion para politica publica",
    problem:
      "Proyecto orientado a medir resultados y pensar impacto para una iniciativa con sentido social.",
    proof:
      "Muestra afinidad entre evidencia, organizaciones y lenguaje de evaluacion de programas.",
    deliverable: "Base conceptual para evaluacion, reporte y siguiente iteracion en R.",
    repoUrl: "https://github.com/TorradoSantiago/ConectarEsperanza-Policy-R",
  },
  {
    title: "RealState FODA",
    sector: "Inteligencia comercial e inversion",
    problem:
      "Transforma informacion inmobiliaria y presentacion ejecutiva en un dashboard util para leer oportunidades.",
    proof:
      "Sirve para mostrar visualizacion, orientacion comercial y lectura de mercado con salida ejecutiva.",
    deliverable: "Power BI, Excel y presentacion final para decision comercial.",
    repoUrl: "https://github.com/TorradoSantiago/RealStateFODA-pbix",
  },
  {
    title: "EDA EPH",
    sector: "Mercado laboral y hogares",
    problem:
      "Trabaja preguntas sobre ingreso, territorio y caracteristicas del hogar con datos de la Ciudad de Buenos Aires.",
    proof:
      "Aporta lectura de politica publica, estadistica descriptiva y formulacion de hipotesis.",
    deliverable: "Notebook exploratorio con preguntas, supuestos y visualizaciones.",
    repoUrl: "https://github.com/TorradoSantiago/EDA.EPH-Phyton",
  },
  {
    title: "Ejercicios de Regresion",
    sector: "Econometria aplicada",
    problem:
      "Agrupa ejercicios y analisis que muestran como abordar relaciones entre variables y revisar significancia.",
    proof:
      "Hace visible una base cuantitativa util para pricing, evaluacion, inferencia y explicacion tecnica.",
    deliverable: "Notebooks y scripts de analisis con mejoras de reproducibilidad.",
    repoUrl: "https://github.com/TorradoSantiago/ejercicios.regresion",
  },
  {
    title: "Codo 2024",
    sector: "Presentacion digital de productos y servicios",
    problem:
      "Toma una web inicial y la convierte en una pieza visual mas clara para productos, contacto y continuidad comercial.",
    proof:
      "Muestra trabajo de narrativa, arquitectura y experiencia de usuario sobre un activo existente.",
    deliverable: "Landing estatica renovada con catalogo y formularios.",
    repoUrl: "https://github.com/TorradoSantiago/Codo2024",
  },
];

const engagementModels = [
  {
    title: "Sprint de diagnostico",
    description:
      "Cuando el problema todavia esta abierto y hace falta ordenar informacion, variables y opciones de trabajo.",
  },
  {
    title: "Proyecto con entregable",
    description:
      "Cuando ya existe una pregunta concreta y el objetivo es llegar a un informe, dashboard o pieza lista para compartir.",
  },
  {
    title: "Acompanamiento por iteraciones",
    description:
      "Para equipos que necesitan apoyo recurrente en analisis, visualizacion o preparacion de materiales ejecutivos.",
  },
];

const featuredCase = selectedWork.find((project) => project.featured) ?? selectedWork[0];
const remainingCases = selectedWork.filter((project) => !project.featured);

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
    <main className="relative overflow-x-hidden text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top_right,rgba(36,73,118,0.14),transparent_28%),radial-gradient(circle_at_top_left,rgba(196,108,58,0.18),transparent_24%)]" />

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
            <a href="#proceso" className="transition hover:text-slate-950">
              Proceso
            </a>
            <a href="#casos" className="transition hover:text-slate-950">
              Casos
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
              datos, policy y comunicacion ejecutiva
            </p>
            <h1 className="mt-8 max-w-5xl font-[family:var(--font-display)] text-6xl leading-none text-slate-950 sm:text-7xl">
              Analisis, evaluacion y narrativa para equipos que necesitan decisiones mas claras.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Trabajo en la interseccion entre evidencia, contexto institucional y
              presentacion ejecutiva. Eso me permite ayudar tanto a organizaciones
              como a proyectos personales que necesitan profundidad tecnica y una
              forma profesional de mostrarse.
            </p>

            <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
              {["Python · R · SQL", "AML · KYC · Sanciones", "Econometría aplicada", "Power BI · BigQuery", "Inglés FCE · Francés DELF B2"].map((tag) => (
                <span key={tag} className="rounded-full border border-[#ddd5c8] bg-white px-3 py-1">{tag}</span>
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
                href="mailto:santiagotorradouba@gmail.com"
                className="inline-flex items-center justify-center rounded-full border border-[#d9d0c2] bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
              >
                Escribir por email
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {proofPoints.map((item) => (
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
          </div>

          <aside className="rounded-[2rem] border border-[#e0d8cd] bg-[#1d2938] p-8 text-white shadow-[0_24px_65px_rgba(31,41,55,0.28)]">
            <p className="text-xs uppercase tracking-[0.26em] text-[#f7c8a4]">
              Como trabajo
            </p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none">
              Un perfil hibrido para problemas reales.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              No vendo solamente herramientas. Lo que ofrezco es una forma de
              pensar problemas, estructurar evidencia y devolver algo que se pueda
              usar para decidir, presentar o convencer.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Base tecnica en analisis cuantitativo, econometria y evaluacion.",
                "Experiencia actual en riesgo, compliance, procesos y calidad de datos.",
                "Trabajo sostenido en organizaciones y proyectos con sensibilidad social.",
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
      </section>

      <section id="servicios" className="border-y border-[#e6ddd0] bg-[#fbf8f3]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                Servicios
              </p>
              <h2 className="mt-3 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
                La propuesta no se queda en un solo formato de trabajo.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Algunas veces el valor esta en el analisis. Otras, en bajar ese
              analisis a una pieza ejecutiva, un dashboard o un portfolio con mas
              presencia. Lo importante es que el entregable responda a una necesidad real.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {advisoryTracks.map((track) => (
              <article
                key={track.title}
                className="rounded-[1.6rem] border border-[#e4ddd2] bg-white p-6 shadow-[0_12px_30px_rgba(82,78,67,0.05)]"
              >
                <h3 className="font-[family:var(--font-display)] text-3xl leading-tight text-slate-950">
                  {track.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{track.summary}</p>
                <p className="mt-5 rounded-[1.15rem] bg-[#f6f2eb] px-4 py-3 text-sm leading-6 text-slate-700">
                  {track.deliverable}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proceso" className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Proceso
            </p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
              Primero ordenamos el problema. Despues elegimos la herramienta.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              Este punto importa porque varios proyectos fallan no por falta de
              tecnica sino por falta de foco. Mi trabajo suele entrar justamente ahi:
              antes, durante y despues del analisis.
            </p>
          </div>

          <div className="grid gap-4">
            {process.map((item) => (
              <article
                key={item.step}
                className="rounded-[1.8rem] border border-[#e4ddd2] bg-white p-7 shadow-[0_14px_34px_rgba(82,78,67,0.05)]"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  {item.step}
                </p>
                <h3 className="mt-3 font-[family:var(--font-display)] text-3xl text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
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
                Cada proyecto funciona como una prueba distinta de trabajo.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Después, si hace falta, esa consultoría se especializa en evaluación, inteligencia
              comercial, modelado econométrico, compliance financiero o piezas ejecutivas.
            </p>
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
              <p className="mt-6 text-base leading-8 text-slate-300">{featuredCase.problem}</p>
              <p className="mt-4 rounded-[1.4rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-200">
                {featuredCase.proof}
              </p>
              <p className="mt-5 text-sm leading-7 text-slate-300">{featuredCase.deliverable}</p>

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
                  href="mailto:santiagotorradouba@gmail.com"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20"
                >
                  Pedir version ejecutiva
                </a>
              </div>
            </article>

            <div className="grid gap-4">
              {remainingCases.map((project) => (
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
                  <p className="mt-4 text-sm leading-7 text-slate-600">{project.problem}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{project.proof}</p>
                  <p className="mt-4 rounded-[1.1rem] bg-[#f6f2eb] px-4 py-3 text-sm leading-6 text-slate-700">
                    {project.deliverable}
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

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {engagementModels.map((model) => (
            <article
              key={model.title}
              className="rounded-[1.7rem] border border-[#e4ddd2] bg-white p-7 shadow-[0_12px_30px_rgba(82,78,67,0.05)]"
            >
              <h2 className="font-[family:var(--font-display)] text-3xl leading-none text-slate-950">
                {model.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{model.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contacto" className="border-t border-[#e6ddd0] bg-[#fbf8f3]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Contacto
            </p>
            <h2 className="mt-3 max-w-4xl font-[family:var(--font-display)] text-5xl leading-none text-slate-950">
              Si uno de estos frentes te sirve, el siguiente paso es convertirlo en una propuesta de trabajo concreta.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
              Puedo ayudarte con un diagnostico puntual, un proyecto con entregable o una version
              mucho mas profesional de un trabajo que ya existe pero todavia no esta bien contado.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:santiagotorradouba@gmail.com"
              className="inline-flex items-center justify-center rounded-full border border-[#d9d0c2] bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
            >
              Email
            </a>
            <a
              href="https://github.com/TorradoSantiago"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              GitHub
            </a>
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
