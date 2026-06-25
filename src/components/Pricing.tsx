import React from "react";
import { Sparkles, Calendar, Code, Check, ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";
import { ServicePrice } from "../types";

export default function Pricing() {
  const plans: ServicePrice[] = [
    {
      id: "brand",
      title: "Branding Estratégicos",
      shortDescription: "Posicionamiento de marca supremo para liderar canales tradicionales y digitales.",
      priceStart: 850,
      features: [
        "Auditoría competitiva y nicho objetivo",
        "Diseño de logo principal, secundario y monograma",
        "Paletas cromáticas y sistema tipográfico corporativo",
        "Manual completo de branding corporativo",
        "Estrategia de comunicación y discurso de marca"
      ]
    },
    {
      id: "web-premium",
      title: "Desarrollo Web Premium",
      shortDescription: "Desarrollo a medida con velocidad absurda y embudos integrados.",
      priceStart: 1600,
      isPopular: true,
      features: [
        "Páginas ilimitadas en React / Vite nativo, sin plantillas",
        "Optimización de velocidad (Score Google PageSpeed 95%+)",
        "Estrategia UX/UI diseñada para conversión de leads",
        "Integración de reservas Calendly o WhatsApp automatizado",
        "Configuración e indexación en Google Search Console y SEO",
        "Soporte post-lanzamiento técnico de 30 días"
      ]
    },
    {
      id: "ai-automations",
      title: "IA & Automatización",
      shortDescription: "Infraestructuras cognitivas para optimizar tus flujos internos y escalar ventas.",
      priceStart: 2200,
      features: [
        "Mapeo de procesos y reducción de cuellos de botella",
        "Integración de agentes Gemini API entrenados con tus datos",
        "Automatización en n8n/Make para CRM (HubSpot/Salesforce)",
        "Chatbot inteligente avanzado en web o WhatsApp",
        "Firma automática de contratos y facturación",
        "Dashboard técnico de monitoreo de IA"
      ]
    }
  ];

  return (
    <section
      id="servicios"
      className="py-24 px-6 bg-[#041021] relative overflow-hidden/95 border-t border-[rgba(193,127,78,0.06)]"
    >
      <div className="glow-orb top-1/2 left-[80%] opacity-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs text-amber-300 font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>PAQUETES DE ALTO RENDIMIENTO</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F8FAFC] tracking-tight">
            Valores de Inversión y Alcance
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto mt-4 leading-relaxed">
            Sin cobros escondidos ni presupuestos ambiguos. Planes enfocados en entregar ROI medible para tu negocio.
          </p>
        </div>

        {/* Pricing Layout Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative p-8 rounded-3xl bg-brand-card flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                plan.isPopular
                  ? "border border-[#C17F4E] shadow-[0_20px_50px_rgba(193,127,78,0.15)] pt-12"
                  : "border border-brand-border shadow-[0_10px_35px_rgba(4,16,33,0.4)] hover:border-brand-border-hover"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 inset-x-0 bg-[#C17F4E] text-[#F8FAFC] text-[10px] font-mono tracking-widest text-center py-1.5 uppercase font-bold">
                  BEST SELLER EN QUITO
                </div>
              )}

              {/* Top part block */}
              <div>
                <span className="font-display text-xs font-semibold text-[#C17F4E] uppercase tracking-wider">
                  SISTEMA DE ALCANCE
                </span>
                <h3 className="font-display font-bold text-2xl text-[#F8FAFC] tracking-tight mt-1 mb-3">
                  {plan.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
                  {plan.shortDescription}
                </p>

                {/* Price tag */}
                <div className="flex items-baseline gap-2 mb-8 border-b border-white/5 pb-6">
                  <span className="font-sans text-xs text-[#94A3B8] uppercase tracking-wider font-semibold">
                    Inversión desde
                  </span>
                  <span className="font-display font-extrabold text-4xl text-[#F8FAFC]">
                    ${plan.priceStart}
                  </span>
                  <span className="font-sans text-xs text-[#CBD5E1]">USD</span>
                </div>

                <h4 className="font-mono text-[10px] text-[#CBD5E1] tracking-widest uppercase mb-4 font-semibold">
                  ¿Qué incluye esta propuesta?
                </h4>

                {/* Features checklist */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#C17F4E]/15 flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#C17F4E]" />
                      </div>
                      <span className="font-sans text-xs sm:text-sm text-[#CBD5E1] leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom part block */}
              <div className="mt-6">
                <a
                  href="#onboarding"
                  className={`w-full py-4 rounded-xl text-center font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 group transition-all duration-300 ${
                    plan.isPopular
                      ? "bg-[#C17F4E] text-[#F8FAFC] shadow-[0_4px_20px_rgba(193,127,78,0.2)] hover:bg-[#D79663]"
                      : "border border-[rgba(193,127,78,0.3)] hover:border-[#C17F4E] hover:bg-[#C17F4E]/5 text-[#F8FAFC]"
                  }`}
                >
                  <span>Seleccionar & Diseñar</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#F8FAFC] group-hover:scale-125 transition-transform" />
                </a>

                {/* SLA representation block */}
                <div className="flex items-center gap-1.5 justify-center mt-4 opacity-70">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-mono text-[9px] text-[#475569] uppercase tracking-wider">
                    Garantía técnica de código propio
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
