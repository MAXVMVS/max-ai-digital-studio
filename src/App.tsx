import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  BrainCircuit, 
  Code2, 
  Database, 
  CheckCircle2, 
  Zap, 
  Calendar, 
  MessageSquare,
  Globe,
  ArrowRight
} from 'lucide-react';

const content = {
  es: {
    nav: { propuesta: "Propuesta", servicios: "Servicios", funciona: "El Sistema", precios: "Precios" },
    hero: {
      title1: "El motor digital",
      title2: "que escala su negocio.",
      desc: "Desarrollamos una identidad visual inquebrantable, plataformas web de alto rendimiento y modelos predictivos de aprendizaje automático diseñados exclusivamente para su empresa.",
      cta1: "Agendar Diagnóstico",
      cta2: "Conocer el sistema"
    },
    value: {
      badge: "Integración Absoluta",
      title1: "La fragmentación digital",
      title2: "destruye sus ventas.",
      desc1: "Operar con una marca desactualizada, una web lenta y procesos manuales crea cuellos de botella que frenan el crecimiento de su empresa.",
      desc2: "En MAX AI Digital Studio diseñamos ecosistemas unificados. Construimos su presencia corporativa y la integramos con Inteligencia Artificial hecha a medida para automatizar su flujo de ventas."
    },
    services: {
      badge: "Estructura de Servicios",
      title: "Soluciones Corporativas",
      desc: "Tres pilares técnicos para dominar su sector y automatizar sus operaciones.",
      s1_title: "Identidad Visual",
      s1_desc: "Diseñamos sistemas de diseño y marcas premium que comunican autoridad inmediata.",
      s2_title: "Plataformas Web",
      s2_desc: "Desarrollo de sitios web comerciales veloces, diseñados estrictamente para convertir clientes.",
      s3_title: "Machine Learning",
      s3_desc: "Modelos de IA entrenados con sus datos para predecir comportamientos y automatizar tareas."
    },
    simulator: {
      badge: "Arquitectura Viva",
      title: "El Sistema en Acción",
      desc: "Observe en tiempo real cómo interactúan el diseño web y nuestros modelos de Inteligencia Artificial.",
      steps: [
        {
          title: "1. Presencia Premium",
          subtitle: "Captación de Tráfico",
          desc: "El usuario navega por una interfaz elegante y ultrarrápida, sintiendo confianza instantánea en su marca.",
          metricLabel: "Autoridad de Marca",
          metricVal: "Alta",
          metricChange: "Posicionamiento"
        },
        {
          title: "2. Análisis Predictivo",
          subtitle: "Procesamiento IA",
          desc: "Nuestro modelo clasifica al visitante según su comportamiento y adapta la oferta en milisegundos.",
          metricLabel: "Precisión del Modelo",
          metricVal: "99.1%",
          metricChange: "En tiempo real"
        },
        {
          title: "3. Cierre Automatizado",
          subtitle: "Conversión sin fricción",
          desc: "El sistema permite agendar o pagar de forma directa, notificando a su WhatsApp comercial.",
          metricLabel: "Tasa de Conversión",
          metricVal: "+34%",
          metricChange: "Optimizado"
        },
        {
          title: "4. Mejora Continua",
          subtitle: "Aprendizaje Automático",
          desc: "Los datos de la venta retroalimentan el algoritmo, haciendo que su ecosistema sea más inteligente cada día.",
          metricLabel: "Crecimiento ROI",
          metricVal: "Constante",
          metricChange: "Escalabilidad"
        }
      ]
    },
    pricing: {
      badge: "Inversión Estratégica",
      title: "Precios Transparentes",
      desc: "Estructuras de costos claras diseñadas para multiplicar la rentabilidad de su operación.",
      p1_title: "Diagnóstico AI",
      p1_desc: "Auditoría técnica de su presencia digital actual.",
      p1_price: "$35",
      p1_items: [
        "Revisión de marca y sitio web",
        "Análisis de cuellos de botella",
        "Propuesta de IA a medida",
        "Reunión ejecutiva"
      ],
      p1_cta: "Solicitar Diagnóstico",
      p2_tag: "Recomendado",
      p2_title: "Ecosistema Web",
      p2_desc: "Estructura digital comercial completa de alto nivel.",
      p2_price: "$245",
      p2_items: [
        "Diseño de Identidad Visual",
        "Desarrollo Web Premium",
        "Integración con WhatsApp",
        "SEO Estructural Corporativo",
        "Dominio y Hosting incluidos"
      ],
      p2_cta: "Desarrollar Web",
      p3_title: "Inteligencia Artificial",
      p3_desc: "Modelos de Machine Learning para su empresa.",
      p3_price: "$350",
      p3_items: [
        "Modelos predictivos a medida",
        "Análisis de datos automatizado",
        "Agentes autónomos configurados",
        "Conexión API con sus sistemas",
        "Capacitación de equipo"
      ],
      p3_cta: "Automatizar Operación"
    },
    contact: {
      title: "Empiece su transformación hoy.",
      desc: "Agende una sesión técnica gratuita por WhatsApp. Evaluaremos la arquitectura actual de su negocio y diseñaremos un plan de acción.",
      btn: "Contactar a Ventas"
    }
  },
  en: {
    nav: { propuesta: "Proposal", servicios: "Services", funciona: "The System", precios: "Pricing" },
    hero: {
      title1: "The digital engine",
      title2: "that scales your business.",
      desc: "We develop an unbreakable visual identity, high-performance web platforms, and predictive machine learning models designed exclusively for your company.",
      cta1: "Schedule Diagnosis",
      cta2: "Explore the System"
    },
    value: {
      badge: "Absolute Integration",
      title1: "Digital fragmentation",
      title2: "destroys your sales.",
      desc1: "Operating with an outdated brand, a slow website, and manual processes creates bottlenecks that halt your company's growth.",
      desc2: "At MAX AI Digital Studio we design unified ecosystems. We build your corporate presence and integrate it with custom-made AI to automate your sales flow."
    },
    services: {
      badge: "Service Structure",
      title: "Corporate Solutions",
      desc: "Three technical pillars to dominate your sector and automate your operations.",
      s1_title: "Visual Identity",
      s1_desc: "We design premium design systems and brands that communicate immediate authority.",
      s2_title: "Web Platforms",
      s2_desc: "Development of lightning-fast commercial websites, designed strictly to convert clients.",
      s3_title: "Machine Learning",
      s3_desc: "AI models trained on your data to predict behaviors and automate tasks."
    },
    simulator: {
      badge: "Living Architecture",
      title: "The System in Action",
      desc: "Observe in real time how web design and our AI models interact.",
      steps: [
        {
          title: "1. Premium Presence",
          subtitle: "Traffic Capture",
          desc: "The user navigates an elegant, ultra-fast interface, instantly feeling trust in your brand.",
          metricLabel: "Brand Authority",
          metricVal: "High",
          metricChange: "Positioning"
        },
        {
          title: "2. Predictive Analysis",
          subtitle: "AI Processing",
          desc: "Our model classifies the visitor based on behavior and adapts the offer in milliseconds.",
          metricLabel: "Model Accuracy",
          metricVal: "99.1%",
          metricChange: "Real Time"
        },
        {
          title: "3. Automated Closing",
          subtitle: "Frictionless Conversion",
          desc: "The system allows direct scheduling or payment, notifying your commercial WhatsApp.",
          metricLabel: "Conversion Rate",
          metricVal: "+34%",
          metricChange: "Optimized"
        },
        {
          title: "4. Continuous Improvement",
          subtitle: "Machine Learning",
          desc: "Sales data feeds back into the algorithm, making your ecosystem smarter every day.",
          metricLabel: "ROI Growth",
          metricVal: "Constant",
          metricChange: "Scalability"
        }
      ]
    },
    pricing: {
      badge: "Strategic Investment",
      title: "Transparent Pricing",
      desc: "Clear cost structures designed to multiply your operation's profitability.",
      p1_title: "AI Diagnosis",
      p1_desc: "Technical audit of your current digital presence.",
      p1_price: "$35",
      p1_items: [
        "Brand & website review",
        "Bottleneck analysis",
        "Custom AI proposal",
        "Executive meeting"
      ],
      p1_cta: "Request Diagnosis",
      p2_tag: "Recommended",
      p2_title: "Web Ecosystem",
      p2_desc: "Complete high-level commercial digital structure.",
      p2_price: "$245",
      p2_items: [
        "Visual Identity Design",
        "Premium Web Development",
        "WhatsApp Integration",
        "Corporate Structural SEO",
        "Domain & Hosting included"
      ],
      p2_cta: "Develop Web",
      p3_title: "Artificial Intelligence",
      p3_desc: "Machine Learning models for your enterprise.",
      p3_price: "$350",
      p3_items: [
        "Custom predictive models",
        "Automated data analysis",
        "Configured autonomous agents",
        "API connection with systems",
        "Team training"
      ],
      p3_cta: "Automate Operation"
    },
    contact: {
      title: "Start your transformation today.",
      desc: "Schedule a free technical session via WhatsApp. We'll evaluate your business architecture and design an action plan.",
      btn: "Contact Sales"
    }
  }
};

type Lang = 'es' | 'en';

export default function App() {
  const [lang, setLang] = useState<Lang>('es');
  const [activeStep, setActiveStep] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = content[lang];
  const WHATSAPP_LINK = "https://wa.me/593983186044";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-navy-dark selection:bg-copper selection:text-white relative overflow-hidden">
      
      {/* Botón WhatsApp Flotante */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <MessageSquare className="w-7 h-7" />
      </a>

      {/* Header Premium (Apple-style Blur) */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'premium-blur py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-3 items-center">
          
          {/* Logo Navegación */}
          <div className="flex items-center">
            <img src="/logo.png" alt="MAX AI Digital Studio" className="h-20 md:h-28 w-auto object-contain" />
          </div>

          <nav className="hidden md:flex justify-center items-center gap-10 text-[13px] font-semibold tracking-wide text-gray-300">
            <a href="#soluciones" className="hover:text-white transition-colors">{t.nav.propuesta}</a>
            <a href="#servicios" className="hover:text-white transition-colors">{t.nav.servicios}</a>
            <a href="#precios" className="hover:text-white transition-colors">{t.nav.precios}</a>
          </nav>

          <div className="flex justify-end">
            <button 
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-gray-300 hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4 text-copper" /> {lang}
            </button>
          </div>
        </div>
      </header>

      {/* 1. Hero (Dark Navy + Massive Logo) */}
      <section className="relative pt-40 pb-32 md:pt-48 md:pb-40 px-6 flex flex-col items-center text-center">
        <div className="ambient-copper-glow top-[10%] left-[50%] -translate-x-1/2"></div>
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          
          {/* LOGO GIGANTE */}
          <img src="/logo.png" alt="MAX AI Digital Studio Logo" className="h-32 md:h-48 lg:h-56 w-auto object-contain mb-12 drop-shadow-[0_20px_50px_rgba(193,127,78,0.2)]" />
          
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.05] mb-8 text-white">
            {t.hero.title1} <br/>
            <span className="text-gray-400 font-medium tracking-tight">{t.hero.title2}</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            {t.hero.desc}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP_LINK} className="bg-copper text-white px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              {t.hero.cta1} <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#como-funciona" className="border border-white/10 text-white px-8 py-4 rounded-full font-medium text-base hover:bg-white/5 transition-colors flex items-center justify-center">
              {t.hero.cta2}
            </a>
          </div>
        </div>
      </section>

      {/* 2. Value Proposition (Dark Section) */}
      <section id="soluciones" className="bg-[#050E1D] py-32 md:py-40 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-copper mb-6">
              {t.value.badge}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] text-white">
              {t.value.title1} <br/>
              <span className="text-gray-500">{t.value.title2}</span>
            </h2>
          </div>
          <div className="space-y-6 text-xl text-gray-400 font-light leading-relaxed">
            <p>{t.value.desc1}</p>
            <p className="font-normal text-white">{t.value.desc2}</p>
          </div>
        </div>
      </section>

      {/* 3. Services (Dark Section - Premium Dark Cards) */}
      <section id="servicios" className="bg-[#050E1D] pb-32 md:pb-40 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:mb-24">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-copper mb-6">{t.services.badge}</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">{t.services.title}</h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl">{t.services.desc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="premium-card-dark p-10 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-copper/10 flex items-center justify-center mb-8 border border-copper/20">
                <Sparkles className="w-6 h-6 text-copper" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{t.services.s1_title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">{t.services.s1_desc}</p>
            </div>
            <div className="premium-card-dark p-10 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-copper/10 flex items-center justify-center mb-8 border border-copper/20">
                <Code2 className="w-6 h-6 text-copper" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{t.services.s2_title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">{t.services.s2_desc}</p>
            </div>
            <div className="premium-card-dark p-10 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-copper/10 flex items-center justify-center mb-8 border border-copper/20">
                <BrainCircuit className="w-6 h-6 text-copper" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{t.services.s3_title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">{t.services.s3_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Simulator (Dark Navy) */}
      <section id="como-funciona" className="py-32 md:py-40 px-6 bg-navy-dark relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 md:mb-24">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-copper mb-6">{t.simulator.badge}</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">{t.simulator.title}</h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">{t.simulator.desc}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
            <div className="space-y-4">
              {t.simulator.steps.map((step, idx) => {
                const isSelected = activeStep === idx;
                const icons = [Sparkles, BrainCircuit, Calendar, Database];
                const Icon = icons[idx];
                return (
                  <div key={idx} onClick={() => setActiveStep(idx)} className={`p-6 md:p-8 rounded-2xl cursor-pointer transition-all duration-300 ${isSelected ? 'bg-white/5 border border-white/10' : 'border border-transparent hover:bg-white/[0.02]'}`}>
                    <div className="flex gap-6">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-copper text-white' : 'bg-white/5 text-gray-500'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className={`text-xl font-bold mb-1 tracking-tight ${isSelected ? 'text-white' : 'text-gray-400'}`}>{step.title}</h4>
                        <p className="text-xs font-medium uppercase tracking-widest text-copper mb-3">{step.subtitle}</p>
                        <AnimatePresence>
                          {isSelected && (
                            <motion.p initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} className="text-gray-400 font-light text-sm leading-relaxed overflow-hidden">
                              {step.desc}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border border-copper/20 shadow-[0_0_50px_rgba(193,127,78,0.05)] rounded-3xl p-8 md:p-12 h-[500px] md:h-[600px] flex flex-col justify-between relative overflow-hidden bg-black/40 backdrop-blur-xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8 z-10">
                <div className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">System_Engine_V2</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-mono text-emerald-500 tracking-widest">ACTIVE</span>
                </div>
              </div>

              <div className="flex-1 relative flex items-center justify-center z-10">
                <div className="w-24 h-24 rounded-full border border-copper/30 flex items-center justify-center relative shadow-[0_0_50px_rgba(193,127,78,0.2)]">
                  <Zap className="w-8 h-8 text-copper" />
                </div>
                
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                  <path d="M 40 100 Q 150 150 260 100" stroke={activeStep === 0 ? "#C17F4E" : "rgba(255,255,255,0.05)"} strokeWidth={activeStep === 0 ? "2" : "1"} fill="none" className="transition-all duration-700" />
                  <path d="M 40 200 Q 150 150 260 200" stroke={activeStep === 1 ? "#FFFFFF" : "rgba(255,255,255,0.05)"} strokeWidth={activeStep === 1 ? "2" : "1"} fill="none" className="transition-all duration-700" />
                  <path d="M 150 40 Q 150 150 150 260" stroke={activeStep === 2 ? "#C17F4E" : "rgba(255,255,255,0.05)"} strokeWidth={activeStep === 2 ? "2" : "1"} fill="none" className="transition-all duration-700" />
                  <path d="M 100 40 Q 150 150 200 260" stroke={activeStep === 3 ? "#FFFFFF" : "rgba(255,255,255,0.05)"} strokeWidth={activeStep === 3 ? "2" : "1"} fill="none" className="transition-all duration-700" />
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 mt-8 z-10">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-2">{t.simulator.steps[activeStep].metricLabel}</span>
                  <span className="text-3xl font-bold tracking-tighter text-white">{t.simulator.steps[activeStep].metricVal}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-2">Status</span>
                  <span className="text-xs font-semibold text-copper uppercase tracking-wide">{t.simulator.steps[activeStep].metricChange}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing (Full Dark Mode) */}
      <section id="precios" className="bg-[#030A18] py-32 md:py-40 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-copper mb-6">{t.pricing.badge}</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">{t.pricing.title}</h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">{t.pricing.desc}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="premium-card-dark p-10 md:p-12 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{t.pricing.p1_title}</h3>
                <p className="text-gray-400 font-light mb-8 text-sm">{t.pricing.p1_desc}</p>
                <div className="text-5xl font-bold text-white tracking-tighter mb-8">{t.pricing.p1_price}</div>
                <ul className="space-y-4 mb-10">
                  {t.pricing.p1_items.map((it, i) => (
                    <li key={i} className="flex gap-3 text-gray-300 font-light text-sm"><CheckCircle2 className="w-5 h-5 text-gray-500" /> {it}</li>
                  ))}
                </ul>
              </div>
              <a href={WHATSAPP_LINK} className="w-full py-4 border border-white/10 text-white text-center font-semibold rounded-xl hover:bg-white/5 transition-colors text-sm">{t.pricing.p1_cta}</a>
            </div>

            <div className="bg-[#020813] border border-copper p-10 md:p-12 rounded-3xl flex flex-col justify-between scale-100 lg:scale-105 relative overflow-hidden shadow-[0_0_40px_rgba(193,127,78,0.15)]">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-copper"></div>
              <div>
                <div className="text-[10px] font-bold text-copper mb-4 uppercase tracking-widest">{t.pricing.p2_tag}</div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{t.pricing.p2_title}</h3>
                <p className="text-gray-400 font-light mb-8 text-sm">{t.pricing.p2_desc}</p>
                <div className="text-5xl font-bold text-white tracking-tighter mb-8">{t.pricing.p2_price}</div>
                <ul className="space-y-4 mb-10">
                  {t.pricing.p2_items.map((it, i) => (
                    <li key={i} className="flex gap-3 text-gray-200 font-light text-sm"><CheckCircle2 className="w-5 h-5 text-copper" /> {it}</li>
                  ))}
                </ul>
              </div>
              <a href={WHATSAPP_LINK} className="w-full py-4 bg-copper text-white text-center font-semibold rounded-xl hover:bg-[#A36A41] transition-colors text-sm">{t.pricing.p2_cta}</a>
            </div>

            <div className="premium-card-dark p-10 md:p-12 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{t.pricing.p3_title}</h3>
                <p className="text-gray-400 font-light mb-8 text-sm">{t.pricing.p3_desc}</p>
                <div className="text-5xl font-bold text-white tracking-tighter mb-8">{t.pricing.p3_price}</div>
                <ul className="space-y-4 mb-10">
                  {t.pricing.p3_items.map((it, i) => (
                    <li key={i} className="flex gap-3 text-gray-300 font-light text-sm"><CheckCircle2 className="w-5 h-5 text-gray-500" /> {it}</li>
                  ))}
                </ul>
              </div>
              <a href={WHATSAPP_LINK} className="w-full py-4 border border-white/10 text-white text-center font-semibold rounded-xl hover:bg-white/5 transition-colors text-sm">{t.pricing.p3_cta}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA (Dark Navy) */}
      <footer className="bg-navy-dark pt-32 pb-16 px-6 text-center border-t border-white/5">
        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-8">{t.contact.title}</h2>
          <p className="text-lg md:text-xl text-gray-400 font-light mb-10 leading-relaxed">{t.contact.desc}</p>
          <a href={WHATSAPP_LINK} className="inline-flex items-center gap-3 bg-copper text-white px-8 py-4 rounded-full font-semibold hover:bg-[#A36A41] transition-colors">
            <MessageSquare className="w-5 h-5" /> {t.contact.btn}
          </a>
        </div>
        <div className="flex flex-col items-center gap-8 border-t border-white/10 pt-16">
          <img src="/logo.png" alt="MAX AI Digital Studio" className="h-20 md:h-24 opacity-90 object-contain" />
          <p className="text-xs text-gray-600 font-medium tracking-wide">© {new Date().getFullYear()} MAX AI DIGITAL STUDIO. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>

    </div>
  );
}
