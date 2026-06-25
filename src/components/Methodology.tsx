import React, { useState } from "react";
import { Compass, Code, Target, Cpu, Check, Layers, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Pillar } from "../types";

export default function Methodology() {
  const [activeTab, setActiveTab] = useState<string>("branding");

  const pillars: Pillar[] = [
    {
      id: "branding",
      num: "01",
      title: "Posicionamiento (Branding)",
      tagline: "Define las reglas del juego en tu nicho",
      description: "Creamos conceptos de marca que demandan atención. Analizamos tu modelo competitivo, destilamos tu propuesta de valor única y diseñamos una identidad visual premium. No compites por ser el más barato; lideras porque eres irremplazable.",
      benefits: [
        "Estudio exhaustivo de posicionamiento competitivo",
        "Manual de identidad de marca, logotipos y tipografía de firma",
        "Copywriting estratégico y creación de narrativa corporativa",
        "Discurso de ventas unificado para equipos premium"
      ]
    },
    {
      id: "web",
      num: "02",
      title: "Presencia Digital (Desarrollo)",
      tagline: "Infraestructuras de carga ultra-rápida y conversión",
      description: "Programamos software a medida. Sin plantillas infladas, constructores pesados o dependencias innecesarias que ralentizan tu carga. Creamos piezas de ingeniería en React y Vite diseñadas específicamente para maximizar conversiones y posicionamiento SEO.",
      benefits: [
        "Desarrollo frontend nativo sin código basura (Vite/React)",
        "Tiempos de carga certificados menores a 1.2 segundos",
        "Arquitectura de conversión optimizada sobre UI/UX interactivo",
        "Indexación orgánica y optimización SEO técnica"
      ]
    },
    {
      id: "marketing",
      num: "03",
      title: "Captación (Sistemas de Marketing)",
      tagline: "El motor automatizado de adquisición de clientes",
      description: "Establecemos un embudo de captación diseñado para convertir desconocidos en clientes de alto valor. Diseñamos páginas de aterrizaje tácticas y programamos la nutrición de leads para asegurar un flujo constante de reuniones de venta calificadas.",
      benefits: [
        "Estrategia de embudos de conversión y captación orgánica",
        "Páginas de aterrizaje de altísima conversión integradas",
        "Sistemas integrados de reservas y flujos de e-mail marketing",
        "Analítica y medición de rendimiento en tiempo real"
      ]
    },
    {
      id: "ai",
      num: "04",
      title: "Escalabilidad (Automatizaciones)",
      tagline: "Multiplica tu productividad operativa de backend",
      description: "Integramos el poder cognitivo de la Inteligencia Artificial de Google (Gemini) en los flujos diarios de tu empresa. Eliminamos cuellos de botella mediante chatbots avanzados, clasificadores de correo y automatizaciones de entrada para escalar sin aumentar la plantilla.",
      benefits: [
        "Integración de APIs cognitivas (Gemini API / Vertex AI)",
        "Chatbots de soporte entrenados con documentación propia",
        "Sincronizaciones automatizadas de CRM (HubSpot, Salesforce)",
        "Reportería automatizada para el cuadro directivo de la empresa"
      ]
    }
  ];

  const activePillar = pillars.find((p) => p.id === activeTab) || pillars[0];

  const iconsMap: Record<string, React.ElementType> = {
    branding: Compass,
    web: Code,
    marketing: Target,
    ai: Cpu
  };

  return (
    <section
      id="metodologia"
      className="py-24 px-6 bg-[#041021]/95 relative border-t border-[rgba(193,127,78,0.06)]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C17F4E]/10 border border-[#C17F4E]/20 rounded-full text-xs text-[#E2E8F0] font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-[#C17F4E]" />
            <span>NUESTRO MÉTODO DE TRABAJO</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F8FAFC] tracking-tight">
            La Metodología de los 4 Pilares
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto mt-4 leading-relaxed">
            Unificamos diseño, código de élite y automatización para consolidar ecosistemas indestructibles para tu negocio.
          </p>
        </div>

        {/* Interactive Layout Component */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Navigation triggers with vertical lights */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {pillars.map((pillar) => {
              const Icon = iconsMap[pillar.id];
              const isSelected = activeTab === pillar.id;

              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveTab(pillar.id)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 relative flex items-center justify-between group ${
                    isSelected
                      ? "bg-brand-card border border-brand-border"
                      : "bg-transparent border border-transparent hover:border-brand-border/30"
                  }`}
                >
                  <div className="flex items-center gap-4 z-10">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-[#C17F4E] text-[#F8FAFC]"
                          : "bg-brand-card text-[#94A3B8] border border-brand-border/40 group-hover:text-[#F8FAFC]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-display font-mono text-[10px] text-[#C17F4E] tracking-wider block">
                        PILAR {pillar.num}
                      </span>
                      <span className="font-display text-base font-medium text-[#F8FAFC] tracking-tight block">
                        {pillar.title.split(" (")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Visual indication line inside button */}
                  {isSelected ? (
                    <motion.div
                      layoutId="activeVerticalIndicator"
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C17F4E] shadow-[0_0_8px_#C17F4E]"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Right Side: Large dynamic descriptive panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-panel p-8 sm:p-10 rounded-3xl bg-brand-card/40 border border-brand-border/60 relative overflow-hidden flex flex-col justify-between aspect-[5/4] sm:aspect-auto"
              >
                {/* Decorative numeric outline background */}
                <div className="absolute right-4 top-4 font-display font-black text-8xl md:text-9xl text-white/[0.02] select-none leading-none">
                  {activePillar.num}
                </div>

                <div className="relative z-10">
                  <span className="inline-block text-[10px] font-mono tracking-[0.2em] font-semibold text-[#C17F4E] uppercase mb-2">
                    ETAPA {activePillar.num} • {activePillar.title.toUpperCase()}
                  </span>
                  
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC] tracking-tight mb-4">
                    {activePillar.tagline}
                  </h3>
                  
                  <p className="font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-8 max-w-xl">
                    {activePillar.description}
                  </p>

                  <h4 className="font-display font-semibold text-[#F8FAFC] text-[11px] uppercase tracking-wider mb-4">
                    Entregables y Resultados de Élite
                  </h4>

                  {/* Output Benefits list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-2">
                    {activePillar.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#C17F4E]/10 flex items-center justify-center border border-[#C17F4E]/20 mt-0.5 shrink-0">
                          <Check className="w-2.5 h-2.5 text-[#C17F4E]" />
                        </div>
                        <span className="font-sans text-[11px] sm:text-xs text-[#CBD5E1] leading-relaxed">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[rgba(193,127,78,0.1)] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#475569]">
                    PROCESO DISEÑADO EN QUITO, ECUADOR
                  </span>
                  <a
                    href="#onboarding"
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#C17F4E] hover:text-[#D79663] transition-colors"
                  >
                    Implementar este Pilar
                    <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
