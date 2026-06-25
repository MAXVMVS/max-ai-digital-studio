import React from "react";
import { ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

export default function Portfolio() {
  const cases = [
    {
      client: "Psic. Damaris Pazmiño",
      sector: "Salud Mental & Psicología Clínica",
      service: "Ecosistema Digital Integral",
      desc: "Lanzamiento acelerado de su marca digital. Desarrollamos una landing page premium optimizada para captación de leads, integrada con bases de datos Firestore y geolocalización de Google Maps para automatizar su flujo de pacientes.",
      status: "En Staging / Semana 2 Acelerada",
      link: "https://psicdamaris.vercel.app",
      linkText: "Ver Staging",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    {
      client: "Amy Tevet",
      sector: "Sastrería & Alta Costura",
      service: "Lookbook Digital & Catálogo Meta",
      desc: "Ecosistema visual inmersivo inspirado en el 'lujo silencioso'. Creación de marca, lookbook interactivo, indexación SEO y sincronización automática del catálogo en redes META para ventas B2C.",
      status: "En Planificación / Semana 1",
      link: "https://instagram.com/amytevet.tm",
      linkText: "Ver Instagram",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
    }
  ];

  return (
    <section
      id="casos"
      className="py-24 px-6 bg-[#041021] relative overflow-hidden border-t border-[rgba(193,127,78,0.06)]"
    >
      {/* Glow effect */}
      <div className="glow-orb top-[20%] left-[10%] opacity-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C17F4E]/10 border border-[#C17F4E]/20 text-xs text-[#E2E8F0] font-semibold tracking-wide w-fit mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C17F4E]" />
            <span>ECOSISTEMAS EN PRODUCCIÓN</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl tracking-tight text-[#F8FAFC] mb-6"
          >
            Casos de Estudio
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-[#94A3B8] max-w-2xl leading-relaxed"
          >
            Proyectos reales diseñados, desarrollados y automatizados bajo nuestra metodología de validación acelerada.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {cases.map((c, idx) => (
            <motion.div
              key={c.client}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="premium-card-dark p-8 md:p-10 rounded-3xl flex flex-col justify-between border border-white/5 bg-white/[0.01] backdrop-blur-md relative overflow-hidden group hover:border-[#C17F4E]/30 transition-all duration-500"
            >
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div>
                    <span className="text-[10px] font-semibold text-[#C17F4E] uppercase tracking-widest block mb-2">
                      {c.sector}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] tracking-tight font-display">
                      {c.client}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full border text-[10px] uppercase font-semibold tracking-wider ${c.badgeColor}`}>
                    {c.status}
                  </span>
                </div>
                
                <p className="text-[#94A3B8] font-sans font-light text-sm md:text-base leading-relaxed mb-8">
                  {c.desc}
                </p>
              </div>

              <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="text-xs md:text-sm font-medium text-[#64748B]">
                  {c.service}
                </span>
                
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[#C17F4E] hover:text-[#F8FAFC] font-semibold transition-colors text-sm group/btn"
                >
                  {c.linkText}
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
