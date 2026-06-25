import React from "react";
import { ArrowRight, Sparkles, Binary, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden flex items-center bg-[#041021]"
    >
      {/* Decorative Glow Orbs */}
      <div className="glow-orb top-[-10%] left-[-10%] opacity-40 animate-pulse duration-[8000ms]" />
      <div className="glow-orb bottom-[-10%] right-[-10%] opacity-30" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Copywriting & Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C17F4E]/10 border border-[#C17F4E]/20 text-xs text-[#E2E8F0] font-semibold tracking-wide w-fit mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C17F4E]" />
            <span>ESTUDIO DIGITAL DE ÉLITE EN LATINOAMÉRICA</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#F8FAFC] leading-[1.1] mb-6"
          >
            Conectamos <span className="text-pure-copper">Estrategia</span>, Desarrollo Web y <span className="text-pure-copper">Automatización</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-[#94A3B8] max-w-xl leading-relaxed mb-8"
          >
            Rediseñamos el posicionamiento de tu marca, programamos infraestructura digital de alto rendimiento y desplegamos agentes de IA para escalar tus conversiones comerciales.
          </motion.p>

          {/* Action Callouts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12"
          >
            <a
              href="#onboarding"
              className="px-8 py-4 rounded-xl bg-[#C17F4E] text-[#F8FAFC] font-semibold text-center tracking-wider uppercase text-xs shadow-[0_4px_24px_rgba(193,127,78,0.25)] hover:bg-[#D79663] hover:shadow-[0_4px_30px_rgba(193,127,78,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Iniciar Onboarding
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#metodologia"
              className="px-8 py-4 rounded-xl border border-[rgba(193,127,78,0.25)] hover:border-[#C17F4E] hover:bg-[#C17F4E]/5 text-[#F8FAFC] text-center font-semibold tracking-wider uppercase text-xs transition-all duration-300"
            >
              Explorar Metodología
            </a>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-[rgba(193,127,78,0.12)] max-w-md"
          >
            <div>
              <div className="font-display font-bold text-2xl text-[#F8FAFC]">3.5x</div>
              <div className="text-xs text-[#94A3B8] mt-1 uppercase tracking-wider font-semibold">Tasa Conversión</div>
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-[#C17F4E]">100%</div>
              <div className="text-xs text-[#94A3B8] mt-1 uppercase tracking-wider font-semibold">Código Propio</div>
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-[#F8FAFC]">Quito</div>
              <div className="text-xs text-[#94A3B8] mt-1 uppercase tracking-wider font-semibold">Base de Operaciones</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: High-End Interactive Vector Dashboard Representation */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-[440px] aspect-[4/5] rounded-2.5xl glass-panel p-6 border border-brand-border backdrop-blur-xl relative flex flex-col justify-between overflow-hidden shimmer-bg shadow-[0_20px_50px_rgba(4,16,33,0.8)]"
          >
            {/* Top Bar simulating deep-tech IDE */}
            <div className="flex items-center justify-between border-b border-[rgba(193,127,78,0.1)] pb-4 mb-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                <span className="text-[10px] font-mono text-[#94A3B8] ml-2">MAX_STUDIO_CORE.py</span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[rgba(193,127,78,0.1)] text-[#C17F4E]">
                SYSTEMS ONLINE
              </span>
            </div>

            {/* Simulated UI Blocks */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Core Node Diagram */}
              <div className="bg-[#041021]/60 rounded-xl p-4 border border-[rgba(193,127,78,0.06)] flex items-center justify-between relative">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-[#94A3B8] uppercase">INTELLIGENCE MODEL</div>
                  <div className="text-xs font-semibold text-[#F8FAFC]">Gemini Ultra Cognitive</div>
                </div>
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 rounded-full border border-dashed border-[#C17F4E]/40 flex items-center justify-center"
                  >
                    <Binary className="w-4 h-4 text-[#C17F4E]" />
                  </motion.div>
                  <span className="absolute flex h-2 w-2 top-0 right-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C17F4E] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C17F4E]"></span>
                  </span>
                </div>
              </div>

              {/* Grid with visual metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#041021]/40 rounded-xl p-3 border border-[rgba(193,127,78,0.04)] flex flex-col justify-between">
                  <span className="text-[9px] font-mono text-[#94A3B8]">MARKETING PIPELINE</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-lg font-bold text-[#F8FAFC]">94.2%</span>
                    <span className="text-[8px] text-green-400 font-mono">+12.4%</span>
                  </div>
                  <div className="w-full bg-[#041021] h-1 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "94.2%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="bg-[#C17F4E] h-full rounded-full"
                    />
                  </div>
                </div>

                <div className="bg-[#041021]/40 rounded-xl p-3 border border-[rgba(193,127,78,0.04)] flex flex-col justify-between">
                  <span className="text-[9px] font-mono text-[#94A3B8]">RESPONSIVE FIDELITY</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-lg font-bold text-[#F8FAFC]">A++</span>
                    <span className="text-[8px] text-emerald-400 font-mono">STABLE</span>
                  </div>
                  <div className="w-full bg-[#041021] h-1 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 0.6 }}
                      className="bg-emerald-500 h-full rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic list panel representing process lines */}
              <div className="bg-[#041021]/30 rounded-xl p-4 border border-[rgba(193,127,78,0.06)] flex-1 flex flex-col justify-between">
                <div className="text-[10px] font-mono text-[#94A3B8] mb-2 uppercase">Core Processes</div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C17F4E]" />
                    <span className="text-xs text-[#E2E8F0] font-sans">Estrategia de posicionamiento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C17F4E]" />
                    <span className="text-xs text-[#E2E8F0] font-sans">Desarrollo Web React/Next y SEO</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C17F4E]" />
                    <span className="text-xs text-[#E2E8F0] font-sans">Integraciones de IA Avanzadas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Panel footer */}
            <div className="mt-4 pt-3 border-t border-[rgba(193,127,78,0.1)] flex items-center justify-between">
              <span className="text-[9px] font-mono text-[#94A3B8]">MAX AI STUDIO © V4.0</span>
              <span className="text-[9px] font-mono text-[#C17F4E] animate-pulse">● COMPILING REALTIME</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
