import React from "react";
import { Compass, ZapOff, Workflow, AlertOctagon } from "lucide-react";
import { motion } from "motion/react";

export default function ProblemGrid() {
  const problems = [
    {
      id: "clarity",
      icon: Compass,
      title: "Falta de claridad y diferenciación",
      tagline: "El dolor de ser invisible",
      description: "Muchas empresas operan en el 'océano rojo', copiándose de la competencia y compitiendo únicamente por precio. Sin un posicionamiento de marca magnético, tus campañas de marketing son costosas y atraen a clientes de baja calidad."
    },
    {
      id: "conversion",
      icon: ZapOff,
      title: "Canales digitales sin conversión",
      tagline: "El dolor de la infraestructura lenta",
      description: "Tener una página web lenta, sobrecargada de datos genéricos o estática es lo mismo que no existir. Si tu plataforma no carga en menos de 1.5 segundos ni guía al usuario psicológicamente a la conversión, estás regalando prospectos."
    },
    {
      id: "manual",
      icon: Workflow,
      title: "Procesos manuales ineficientes",
      tagline: "El dolor de la fuga de tiempo",
      description: "Perder horas respondiendo correos de soporte repetitivos, copiando y pegando datos en excels y gestionando leads de forma manual frena tu escalabilidad. El tiempo que deberías invertir en expandir el negocio se diluye en microtareas."
    }
  ];

  return (
    <section
      id="problemas"
      className="py-24 px-6 bg-[#041021] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs text-red-300 font-semibold uppercase tracking-wider mb-4">
            <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
            <span>Fricciones del Crecimiento</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F8FAFC] tracking-tight leading-normal">
            Los 3 síntomas que limitan el escalado de tu negocio
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#94A3B8] mt-4 leading-relaxed">
            Las empresas que lideran los mercados modernos no ganan por suerte. Ganan porque resolvieron las tres brechas críticas en su presencia digital.
          </p>
        </div>

        {/* CSS Grid of Pain Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((prob, idx) => (
            <motion.div
              key={prob.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative flex flex-col justify-between p-8 rounded-2xl bg-brand-card glass-panel border border-brand-border hover:scale-[1.02] transform transition-all duration-300 shadow-[0_8px_32px_rgba(4,16,33,0.3)] hover:shadow-[0_12px_40px_rgba(193,127,78,0.1)]"
            >
              {/* Top Card Section */}
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#C17F4E]/10 border border-[#C17F4E]/20 flex items-center justify-center text-[#C17F4E] group-hover:bg-[#C17F4E]/20 transition-all duration-300 mb-6">
                  <prob.icon className="w-6 h-6" />
                </div>
                
                <span className="font-display text-xs font-semibold tracking-wider text-[#C17F4E] uppercase">
                  {prob.tagline}
                </span>
                
                <h3 className="font-display font-medium text-xl text-[#F8FAFC] tracking-tight mt-2 mb-4 group-hover:text-white transition-colors">
                  {prob.title}
                </h3>
                
                <p className="font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed group-hover:text-[#CBD5E1] transition-all">
                  {prob.description}
                </p>
              </div>

              {/* High-contrast bottom visual status line */}
              <div className="w-full h-[1px] bg-white/5 group-hover:bg-[#C17F4E]/40 mt-8 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
