import React from "react";
import { ArrowRight, Sparkles, Binary, Cpu, TrendingUp, Terminal, ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  // Live processes for the simulated agent terminal
  const processes = [
    { time: "09:41", event: "Cognitive Engine online", status: "ok" },
    { time: "10:14", event: "Syncing META Catalog (Amy Tevet)", status: "active" },
    { time: "12:02", event: "Firestore patient pipeline connected", status: "ok" },
    { time: "14:48", event: "Indexing Google Search Console", status: "indexing" }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-36 pb-24 px-6 overflow-hidden flex items-center bg-[#041021]"
    >
      {/* Dynamic Background Glow Orbs */}
      <div className="glow-orb top-[-10%] left-[-15%] opacity-40 animate-pulse duration-[10000ms]" />
      <div className="glow-orb bottom-[-20%] right-[-15%] opacity-35" />
      <div className="absolute top-[20%] right-[30%] w-[300px] h-[300px] bg-radial from-[#C17F4E]/5 to-transparent blur-[80px]" />

      {/* Grid Pattern Overlay for SaaS theme */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events:none;" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Premium SaaS Copywriting */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* SaaS Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C17F4E]/10 border border-[#C17F4E]/20 text-xs text-[#E2E8F0] font-semibold tracking-wide w-fit mb-8 shadow-[0_4px_12px_rgba(193,127,78,0.08)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C17F4E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C17F4E]"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#E2E8F0]">
              CORE v4.0 ACTIVE • Quito, EC
            </span>
          </motion.div>

          {/* SaaS Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-[4rem] tracking-tight text-[#F8FAFC] leading-[1.08] mb-6"
          >
            La infraestructura digital <br/>
            que <span className="text-pure-copper font-extrabold">automatiza</span> y vende.
          </motion.h1>

          {/* SaaS Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-[#94A3B8] max-w-2xl leading-relaxed mb-10 font-light"
          >
            Rediseñamos el posicionamiento de tu marca, programamos arquitecturas web de alto rendimiento y desplegamos flujos cognitivos de IA para maximizar la rentabilidad de tu negocio.
          </motion.p>

          {/* Action Callouts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16"
          >
            <a
              href="#onboarding"
              className="px-8 py-4.5 rounded-full bg-[#C17F4E] text-[#F8FAFC] font-semibold text-center tracking-wider uppercase text-xs hover:bg-[#D79663] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Iniciar Onboarding
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#casos"
              className="px-8 py-4.5 rounded-full border border-[rgba(255,255,255,0.08)] hover:border-[#C17F4E] hover:bg-[#C17F4E]/5 text-[#F8FAFC] text-center font-semibold tracking-wider uppercase text-xs transition-all duration-300"
            >
              Ver Casos de Estudio
            </a>
          </motion.div>

          {/* SaaS Trust Signals / Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 pt-8 border-t border-[rgba(255,255,255,0.05)] max-w-xl"
          >
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#C17F4E]" />
                <span className="font-display font-bold text-2xl text-[#F8FAFC]">3.5x</span>
              </div>
              <div className="text-[10px] text-[#64748B] mt-1.5 uppercase tracking-widest font-semibold font-mono">Tasa de Conversión</div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-display font-bold text-2xl text-[#F8FAFC]">100%</span>
              </div>
              <div className="text-[10px] text-[#64748B] mt-1.5 uppercase tracking-widest font-semibold font-mono">Código Propietario</div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#C17F4E]" />
                <span className="font-display font-bold text-2xl text-[#F8FAFC]">Gemini</span>
              </div>
              <div className="text-[10px] text-[#64748B] mt-1.5 uppercase tracking-widest font-semibold font-mono">Cognición de IA</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Premium High-End Live SaaS Dashboard mockup */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          
          {/* Secondary background card decoration */}
          <div className="absolute inset-0 bg-[#C17F4E]/3 rounded-3xl blur-2xl transform rotate-6 scale-95" />
          
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-[460px] glass-panel p-6 border border-brand-border backdrop-blur-2xl relative flex flex-col justify-between overflow-hidden shadow-[0_24px_60px_rgba(4,16,33,0.9)]"
          >
            {/* Top Bar simulating IDE or SaaS app */}
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-4 mb-5">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                <span className="text-[10px] font-mono text-[#64748B] ml-2">max_ai_engine.tsx</span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-semibold">
                live monitor
              </span>
            </div>

            {/* Simulated Live UI Metrics & Chart */}
            <div className="flex-1 flex flex-col gap-4">
              
              {/* Dynamic SVG Sparkline Graph */}
              <div className="bg-[#020b16]/60 rounded-xl p-4 border border-[rgba(255,255,255,0.03)] flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] font-mono text-[#64748B] tracking-wider uppercase">CONVERSION PERFORMANCE</span>
                  <span className="text-xs font-semibold text-emerald-400">+28.4%</span>
                </div>
                <div className="h-16 w-full relative">
                  <svg className="w-full h-full" viewBox="0 0 300 60" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C17F4E" stopOpacity="0.25"/>
                        <stop offset="100%" stopColor="#C17F4E" stopOpacity="0.00"/>
                      </linearGradient>
                    </defs>
                    {/* Area under the line */}
                    <path
                      d="M 0 60 L 0 45 Q 40 15 80 35 T 160 10 T 240 25 L 300 5 L 300 60 Z"
                      fill="url(#chartGlow)"
                    />
                    {/* Core Line */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      d="M 0 45 Q 40 15 80 35 T 160 10 T 240 25 L 300 5"
                      fill="none"
                      stroke="#C17F4E"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Grid metrics */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* Metric 1 */}
                <div className="bg-[#020b16]/40 rounded-xl p-3.5 border border-[rgba(255,255,255,0.02)] flex flex-col justify-between">
                  <span className="text-[9px] font-mono text-[#64748B] uppercase">INFRASTRUCTURE</span>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-xl font-display font-bold text-[#F8FAFC]">99.98%</span>
                  </div>
                  <span className="text-[8px] font-mono text-emerald-400 mt-1 uppercase">uptime guaranteed</span>
                </div>

                {/* Metric 2 */}
                <div className="bg-[#020b16]/40 rounded-xl p-3.5 border border-[rgba(255,255,255,0.02)] flex flex-col justify-between">
                  <span className="text-[9px] font-mono text-[#64748B] uppercase">RESPONSE SPEED</span>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-xl font-display font-bold text-[#F8FAFC]">85ms</span>
                  </div>
                  <span className="text-[8px] font-mono text-[#C17F4E] mt-1 uppercase">ultra-fast latency</span>
                </div>
              </div>

              {/* Simulated Live Agent Actions Terminal */}
              <div className="bg-[#020b16]/80 rounded-xl p-4 border border-[rgba(255,255,255,0.04)] flex-1 flex flex-col justify-between min-h-[130px]">
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#64748B] uppercase mb-2">
                  <Terminal className="w-3.5 h-3.5 text-[#C17F4E]" />
                  <span>PROCESS STREAM</span>
                </div>
                
                <div className="space-y-1.5 flex-1 flex flex-col justify-center">
                  {processes.map((proc, idx) => (
                    <motion.div
                      key={proc.event}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.15 }}
                      className="flex items-center justify-between text-[10px] font-mono"
                    >
                      <span className="text-[#64748B]">{proc.time}</span>
                      <span className="text-[#E2E8F0] flex-1 ml-3 text-left truncate">{proc.event}</span>
                      <span className={`ml-2 text-[9px] px-1.5 rounded uppercase font-semibold ${
                        proc.status === "ok" ? "bg-emerald-500/10 text-emerald-400" :
                        proc.status === "active" ? "bg-[#C17F4E]/10 text-[#C17F4E]" :
                        "bg-amber-500/10 text-amber-400"
                      }`}>
                        {proc.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Dashboard details */}
            <div className="mt-5 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
              <span className="text-[9px] font-mono text-[#64748B]">MAX CORE v4.0</span>
              <span className="text-[9px] font-mono text-emerald-400 animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                SYSTEMS NOMINAL
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
