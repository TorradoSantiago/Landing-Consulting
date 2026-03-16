"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Data structures for easy content editing
const SERVICES = [
  {
    id: 1,
    title: "Optimización de stock e inventario para pymes",
    short: "Inventario inteligente",
    description:
      "Modelos que equilibran rotación, riesgo de faltantes y costos para que tu inventario trabaje a favor del crecimiento.",
    items: [
      "Pronóstico de demanda por SKU",
      "Simulación de rotación y niveles óptimos",
      "Alertas de ruptura y exceso de stock"
    ],
    icon: "📦"
  },
  {
    id: 2,
    title: "Forecasting de ventas y demanda",
    short: "Proyecciones confiables",
    description:
      "Proyecciones económicas y de demanda con series temporales, variables externas y escenarios 'what if' para planificar con confianza.",
    items: [
      "Proyección de ventas y canibalización",
      "Escenarios de sensibilidad (precio, estacionalidad, eventos)",
      "Dashboards de seguimiento y alertas"
    ],
    icon: "📈"
  },
  {
    id: 3,
    title: "Optimización de ubicación de locales",
    short: "Elegí mejor ubicación",
    description:
      "Modelos geo-espaciales y análisis de demanda para decidir dónde abrir o reubicar locales y puntos de venta.",
    items: [
      "Análisis de catchment area y demografía",
      "Simulación de escenarios por ubicación",
      "Recomendaciones cuantitativas para abrir/cerrar/localizar"
    ],
    icon: "📍"
  },
  {
    id: 4,
    title: "Análisis de datos para política y sector público",
    short: "Evidencia para políticas",
    description:
      "Evaluaciones y análisis cuantitativos para programas públicos que requieren resultados medibles y trazables.",
    items: [
      "Análisis de impacto y series de tiempo",
      "Visualizaciones para informes y rendición de cuentas",
      "Recomendaciones basadas en evidencia"
    ],
    icon: "🏛️"
  },
  {
    id: 5,
    title: "Evaluación de proyectos de inversión",
    short: "Decisiones con ROI",
    description:
      "Modelos financieros y análisis de sensibilidad para comparar alternativas y priorizar inversiones.",
    items: [
      "Valor presente neto (VPN) y tasa interna de retorno (TIR)",
      "Escenarios de riesgo y sensibilidad",
      "Dashboard de indicadores clave"
    ],
    icon: "💼"
  },
  {
    id: 6,
    title: "Dashboards y reportes estadísticos",
    short: "Visibilidad en tiempo real",
    description:
      "Dashboards claros y reportes automáticos que convierten datos en historias fáciles de entender para la toma de decisiones.",
    items: [
      "Dashboards en Power BI / Tableau",
      "Reportes automatizados con actualización periódica",
      "KPI y métricas clave para seguimiento"
    ],
    icon: "📊"
  }
];

const PROJECTS = [
  {
    id: 1,
    title: "Korea Income & Welfare",
    description: "Análisis comparativo de ingreso y bienestar en Corea del Sur con modelado de factores determinantes y proyecciones.",
    stack: ["Python", "Numpy", "Scikit-learn"],
    repo: "korea_income-welfare",
    icon: "🇰🇷"
  },
  {
    id: 2,
    title: "EDA Encuesta Permanente de Hogares",
    description: "Análisis exploratorio de datos de la Encuesta Permanente de Hogares para identificar patrones socioeconómicos en población urbana.",
    stack: ["Python", "Pandas", "Matplotlib"],
    repo: "EDA.EPH-Phyton",
    icon: "📊"
  },
  {
    id: 3,
    title: "Codo a Codo 2024",
    description: "Proyecto de desarrollo web y análisis de datos del bootcamp Codo a Codo 2024, enfocado en aplicaciones prácticas.",
    stack: ["JavaScript", "HTML", "CSS", "Python"],
    repo: "Codo2024",
    icon: "💻"
  },
  {
    id: 4,
    title: "RealState FODA",
    description: "Análisis exhaustivo del mercado inmobiliario con matriz FODA y dashboards interactivos en Power BI para evaluación de inversiones.",
    stack: ["Power BI", "Excel", "Python"],
    repo: "RealStateFODA-pbix",
    icon: "🏠"
  },
  {
    id: 5,
    title: "Conectar Esperanza - Policy Analysis",
    description: "Evaluación cuantitativa de impacto del programa social 'Conectar Esperanza' con métodos de regresión discontinua en R.",
    stack: ["R", "ggplot2", "Econometría"],
    repo: "ConectarEsperanza-Policy-R",
    icon: "📈"
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('poll');
  const [stats, setStats] = useState({ years: 0, languages: 0 });

  useEffect(() => {
    const animateCounter = (target: number, setValue: (value: number) => void, duration = 1200) => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(Math.round(progress * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    setTimeout(() => {
      animateCounter(2, (value) => setStats(prev => ({ ...prev, years: value })));
      animateCounter(3, (value) => setStats(prev => ({ ...prev, languages: value })), 900);
    }, 600);
  }, []);

  const pollData = {
    labels: ['18–30', '31–45', '46–60', '61+', 'CABA', 'GBA'],
    datasets: [
      {
        label: 'A favor',
        data: [72, 58, 44, 39, 65, 51],
        backgroundColor: '#00D4A8',
        borderRadius: 4,
      },
      {
        label: 'En contra',
        data: [28, 42, 56, 61, 35, 49],
        backgroundColor: 'rgba(30, 144, 232, 0.6)',
        borderRadius: 4,
      },
    ],
  };

  const forecastData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep'],
    datasets: [
      {
        label: 'Histórico',
        data: [42, 45, 43, 48, 52, 51, null, null, null],
        borderColor: '#00D4A8',
        backgroundColor: 'rgba(0, 212, 168, 0.1)',
        fill: true,
        borderWidth: 2.5,
        tension: 0.4,
        pointBackgroundColor: '#00D4A8',
        pointRadius: 4,
        spanGaps: false,
      },
      {
        label: 'Proyección',
        data: [null, null, null, null, null, 51, 54, 57, 61],
        borderColor: '#F0B429',
        backgroundColor: 'transparent',
        borderDash: [6, 3],
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#F0B429',
        pointRadius: 4,
        spanGaps: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: '#6B8BA4', font: { size: 12 } },
        grid: { color: 'rgba(22, 40, 64, 0.8)' },
        border: { color: '#162840' },
      },
      y: {
        ticks: { color: '#6B8BA4', font: { size: 12 } },
        grid: { color: 'rgba(22, 40, 64, 0.8)' },
        border: { color: '#162840' },
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Calendly widget script */}
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center font-bold text-slate-950">ST</div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">Santiago Torrado</h1>
                <p className="text-xs text-slate-300">Consultoría de datos & forecasting</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm text-slate-200">
              <a href="#services" className="hover:text-white transition">Servicios</a>
              <a href="#projects" className="hover:text-white transition">Proyectos</a>
              <a href="#consult" className="hover:text-white transition">Consultoría</a>
              <a href="#contact" className="hover:text-white transition">Contacto</a>
              <a
                href="#consult"
                className="inline-flex items-center rounded-lg bg-teal-500 px-4 py-2 text-slate-950 font-semibold hover:bg-teal-400 transition"
              >
                Reservá tu hora
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 pt-32 pb-24">
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.4),transparent_50%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 bg-slate-900/40 rounded-full px-4 py-2 border border-teal-500/30">
                <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                <span className="text-teal-300 text-xs font-semibold uppercase tracking-wider">Análisis de datos para decisiones</span>
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              <span className="text-white">Mostrame tu dataset y en </span>
              <span className="text-teal-400">1 hora gratis</span>
              <span className="text-white"> te doy<br></br>insights y forecasting</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Consultoría de datos para pymes, gobiernos, ONGs y cualquiera con un dataset. Transformo datos complejos en decisiones claras y accionables.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              onClick={(event) => {
                event.preventDefault();
                if (typeof window !== "undefined" && (window as any).Calendly) {
                  (window as any).Calendly.initPopupWidget({ url: "https://calendly.com/santiago-torrado" });
                } else {
                  window.open("https://calendly.com/santiago-torrado", "_blank");
                }
              }}
              href="https://calendly.com/santiago-torrado"
              className="inline-flex items-center justify-center rounded-lg bg-teal-500 hover:bg-teal-400 px-8 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-teal-500/30 transition transform hover:scale-105"
            >
              Reservá tu hora ahora →
            </a>
            <a
              href="mailto:santiagotorradouba@gmail.com"
              className="inline-flex items-center justify-center rounded-lg border-2 border-slate-700 hover:border-teal-500 px-8 py-4 text-base font-semibold text-slate-200 hover:text-white transition"
            >
              Contactar por email
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 backdrop-blur">
              <div className="text-2xl mb-3">📊</div>
              <h3 className="font-semibold text-white mb-2">Análisis riguroso</h3>
              <p className="text-sm text-slate-400">Datos, estadística y metodología sólida detrás de cada conclusión</p>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 backdrop-blur">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="font-semibold text-white mb-2">Resultados rápidos</h3>
              <p className="text-sm text-slate-400">1 hora para diagnosis, insights y recomendaciones prácticas</p>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 backdrop-blur">
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="font-semibold text-white mb-2">Accionable</h3>
              <p className="text-sm text-slate-400">No solo análisis: recomendaciones claras para actuar hoy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-teal-400 mb-2">{stats.years}+</div>
              <div className="text-sm text-slate-400">Años en análisis de datos — American Express</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-400 mb-2">MEcAP</div>
              <div className="text-sm text-slate-400">Maestría en Economía Aplicada, UTDT</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-400 mb-2">{stats.languages}+</div>
              <div className="text-sm text-slate-400">Idiomas de trabajo (ES / EN / FR)</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-400 mb-2">1h</div>
              <div className="text-sm text-slate-400">Consulta gratuita — traé tu pregunta</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Servicios especializados</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Soluciones pensadas para empresas, gobiernos y ONGs que necesitan responder preguntas complejas con datos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-lg hover:border-teal-500 hover:bg-slate-900/80 transition duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{service.icon}</div>
                  <span className="text-xs font-semibold text-teal-300 bg-teal-500/10 rounded-full px-3 py-1">
                    {service.short}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex gap-2 text-slate-400 text-sm">
                      <span className="text-teal-400 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section id="consult" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">1 hora gratuita de análisis</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Trae tu dataset, tu pregunta o tu desafío. En 60 minutos te entrego un diagnóstico con insights clave, proyecciones prácticas y recomendaciones accionables. Sin compromiso. Gratis. Hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a
              onClick={(event) => {
                event.preventDefault();
                if (typeof window !== "undefined" && (window as any).Calendly) {
                  (window as any).Calendly.initPopupWidget({ url: "https://calendly.com/santiago-torrado" });
                } else {
                  window.open("https://calendly.com/santiago-torrado", "_blank");
                }
              }}
              href="https://calendly.com/santiago-torrado"
              className="inline-flex items-center justify-center rounded-lg bg-teal-500 hover:bg-teal-400 px-10 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-teal-500/30 transition transform hover:scale-105"
            >
              Reservar ahora →
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-slate-700 hover:border-teal-500 px-10 py-4 text-base font-semibold text-slate-200 hover:text-white transition"
            >
              Contacto directo
            </a>
          </div>
          <p className="text-sm text-slate-400">
            <strong>¿Dudas?</strong> Escribe a <a href="mailto:santiagotorradouba@gmail.com" className="text-teal-400 hover:underline">santiagotorradouba@gmail.com</a> o llamá a <a href="tel:+5492284511188" className="text-teal-400 hover:underline">+54 9 2284 511188</a>
          </p>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Demo de capacidades</h3>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Así se ven los análisis en la práctica — datos simulados para ilustrar
            </p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="flex gap-2 bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('poll')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  activeTab === 'poll' ? 'bg-teal-500 text-slate-950' : 'text-slate-300 hover:text-white'
                }`}
              >
                Opinión pública
              </button>
              <button
                onClick={() => setActiveTab('forecast')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  activeTab === 'forecast' ? 'bg-teal-500 text-slate-950' : 'text-slate-300 hover:text-white'
                }`}
              >
                Forecasting
              </button>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            {activeTab === 'poll' && (
              <div>
                <div className="text-center text-slate-400 text-sm mb-4">
                  Aprobación de política por segmento demográfico (datos simulados)
                </div>
                <div className="h-80">
                  <Bar data={pollData} options={chartOptions} />
                </div>
              </div>
            )}
            {activeTab === 'forecast' && (
              <div>
                <div className="text-center text-slate-400 text-sm mb-4">
                  Proyección de tendencia con banda de confianza (datos simulados)
                </div>
                <div className="h-80">
                  <Line data={forecastData} options={chartOptions} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Cómo funciona</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Un proceso diseñado para entregar resultados claros en pocas horas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Tu pregunta",
                description: "Presentas tu dataset o desafío. Definimos la pregunta central juntos.",
                icon: "❓"
              },
              {
                step: 2,
                title: "Análisis",
                description: "Exploramos los datos con Python, R o SQL. Buscamos patrones y relaciones.",
                icon: "🔍"
              },
              {
                step: 3,
                title: "Modelos",
                description: "Construimos proyecciones, escenarios o evaluaciones según necesidad.",
                icon: "⚙️"
              },
              {
                step: 4,
                title: "Recomendaciones",
                description: "Te entrego insights accionables y próximos pasos claros.",
                icon: "✅"
              }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 h-full">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl font-bold text-teal-400">{item.step}</div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-slate-300 text-sm">{item.description}</p>
                </div>
                {item.step < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-teal-500 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who I Work With Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">¿Para quién trabajo?</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Cualquiera con datos, una pregunta y voluntad de tomar decisiones basadas en evidencia
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-slate-950 border border-slate-800 rounded-2xl p-10 hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/20 transition">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-2xl font-bold text-white mb-3">Empresas & Pymes</h3>
              <p className="text-slate-300 mb-4">Optimización de operaciones, inteligencia de mercado, forecast de ventas y análisis de clientes.</p>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex gap-2"><span className="text-teal-400">•</span>Retail y E-commerce</li>
                <li className="flex gap-2"><span className="text-teal-400">•</span>Manufactura y logística</li>
                <li className="flex gap-2"><span className="text-teal-400">•</span>Fintech y servicios</li>
              </ul>
            </div>
            <div className="group bg-slate-950 border border-slate-800 rounded-2xl p-10 hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/20 transition">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-2xl font-bold text-white mb-3">Sector Público & ONGs</h3>
              <p className="text-slate-300 mb-4">Evaluación de programas, análisis de políticas públicas y medición de impacto social.</p>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex gap-2"><span className="text-teal-400">•</span>Gobiernos y municipios</li>
                <li className="flex gap-2"><span className="text-teal-400">•</span>Organizaciones sociales</li>
                <li className="flex gap-2"><span className="text-teal-400">•</span>Organismos internacionales</li>
              </ul>
            </div>
            <div className="group bg-slate-950 border border-slate-800 rounded-2xl p-10 hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/20 transition">
              <div className="text-4xl mb-4">🗳️</div>
              <h3 className="text-2xl font-bold text-white mb-3">Política & Candidatos</h3>
              <p className="text-slate-300 mb-4">Investigación electoral, análisis de opinión pública y estrategia basada en datos.</p>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex gap-2"><span className="text-teal-400">•</span>Partidos políticos</li>
                <li className="flex gap-2"><span className="text-teal-400">•</span>Candidatos y campañas</li>
                <li className="flex gap-2"><span className="text-teal-400">•</span>Think tanks</li>
              </ul>
            </div>
            <div className="group bg-slate-950 border border-slate-800 rounded-2xl p-10 hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/20 transition">
              <div className="text-4xl mb-4">📰</div>
              <h3 className="text-2xl font-bold text-white mb-3">Medios & Periodismo</h3>
              <p className="text-slate-300 mb-4">Datos para historias. Análisis de trends, investigaciones con base estadística.</p>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex gap-2"><span className="text-teal-400">•</span>Medios tradicionales</li>
                <li className="flex gap-2"><span className="text-teal-400">•</span>Newsletters y medios digitales</li>
                <li className="flex gap-2"><span className="text-teal-400">•</span>Periodistas independientes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Proyectos destacados</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Ejemplos públicos en GitHub mostrando análisis riguroso, forecasting y evaluación de políticas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <a
                key={project.id}
                href={`https://github.com/TorradoSantiago/${project.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-8 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-teal-500 hover:bg-slate-900/80 transition duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{project.icon}</div>
                  <svg className="w-5 h-5 text-slate-500 group-hover:text-teal-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-300 transition">{project.title}</h3>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-teal-500/10 border border-teal-500/30 text-teal-200 text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-slate-800 text-teal-400 text-sm font-semibold group-hover:translate-x-1 transition">
                  Ver en GitHub →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">Conectemos</h2>
              <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                Si tienes datos, una pregunta compleja o un desafío que requiere análisis riguroso, me encantaría ayudarte.
              </p>
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-teal-300 uppercase tracking-wide mb-3">Email</h3>
                  <a href="mailto:santiagotorradouba@gmail.com" className="text-lg text-slate-200 hover:text-teal-300 transition">
                    santiagotorradouba@gmail.com
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-teal-300 uppercase tracking-wide mb-3">Teléfono</h3>
                  <a href="tel:+5492284511188" className="text-lg text-slate-200 hover:text-teal-300 transition">
                    +54 9 2284 511188
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-teal-300 uppercase tracking-wide mb-3">Enlaces</h3>
                  <div className="space-y-2">
                    <a href="https://www.linkedin.com/in/santiago-torrado/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-teal-300 transition">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
                      LinkedIn
                    </a>
                    <a href="https://github.com/TorradoSantiago" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-teal-300 transition">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-500/20 to-slate-900/40 border border-teal-500/30 rounded-3xl p-12">
              <h3 className="text-2xl font-bold text-white mb-6">Agenda tu consulta</h3>
              <p className="text-slate-300 mb-8">
                Selecciona un horario que te convenga. Nos conectamos por video y en 60 minutos tienes diagnóstico y recomendaciones claras.
              </p>
              <a
                onClick={(event) => {
                  event.preventDefault();
                  if (typeof window !== "undefined" && (window as any).Calendly) {
                    (window as any).Calendly.initPopupWidget({ url: "https://calendly.com/santiago-torrado" });
                  } else {
                    window.open("https://calendly.com/santiago-torrado", "_blank");
                  }
                }}
                href="https://calendly.com/santiago-torrado"
                className="w-full block text-center bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold py-4 rounded-lg transition transform hover:scale-105"
              >
                Reservar hora gratuita
              </a>
              <p className="text-xs text-slate-400 text-center mt-6">
                Sin tarjeta de crédito. Sin spam. Sin sorpresas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center font-bold text-slate-950">ST</div>
                <div>
                  <h3 className="font-bold text-white">Santiago Torrado</h3>
                  <p className="text-xs text-slate-400">Consultor de datos</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 max-w-xs">
                Transformo datasets complejos en decisiones claras y accionables. Basado en Argentina.
              </p>
            </div>

            {/* Enlaces rápidos */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase mb-4">Enlaces</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#services" className="hover:text-teal-300 transition">Servicios</a></li>
                <li><a href="#projects" className="hover:text-teal-300 transition">Proyectos</a></li>
                <li><a href="#consult" className="hover:text-teal-300 transition">Consulta gratuita</a></li>
                <li><a href="#contact" className="hover:text-teal-300 transition">Contacto</a></li>
              </ul>
            </div>

            {/* Redes */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase mb-4">Conecta</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="https://www.linkedin.com/in/santiago-torrado/" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition">LinkedIn</a></li>
                <li><a href="https://github.com/TorradoSantiago" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition">GitHub</a></li>
                <li><a href="mailto:santiagotorradouba@gmail.com" className="hover:text-teal-300 transition">Email</a></li>
                <li><a href="tel:+5492284511188" className="hover:text-teal-300 transition">WhatsApp</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 pt-8"></div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Santiago Torrado. Análisis de datos y economía aplicada.
            </p>
            <p className="text-xs text-slate-500">
              Hecho con ☕ y datos en Argentina.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
