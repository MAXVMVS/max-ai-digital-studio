import React from "react";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#040c18] border-t border-[rgba(193,127,78,0.08)] py-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Brand identity */}
        <Logo className="mb-6" />
        
        <p className="font-sans text-xs sm:text-sm text-[#94A3B8] max-w-md text-center leading-relaxed mb-8">
          Diseñamos y desarrollamos infraestructuras digitales premium y automatizaciones automatizadas nativas para clientes líderes. Liderando el futuro comercial desde Quito, Ecuador.
        </p>

        {/* Links block */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
          <a
            href="#problemas"
            className="font-sans text-xs font-semibold text-[#94A3B8] hover:text-[#F8FAFC] tracking-wider uppercase transition-colors"
          >
            Problemas
          </a>
          <a
            href="#metodologia"
            className="font-sans text-xs font-semibold text-[#94A3B8] hover:text-[#F8FAFC] tracking-wider uppercase transition-colors"
          >
            Metodología
          </a>
          <a
            href="#servicios"
            className="font-sans text-xs font-semibold text-[#94A3B8] hover:text-[#F8FAFC] tracking-wider uppercase transition-colors"
          >
            Servicios
          </a>
          <a
            href="#onboarding"
            className="font-sans text-xs font-semibold text-[#94A3B8] hover:text-[#F8FAFC] tracking-wider uppercase transition-colors"
          >
            Diagnóstico
          </a>
        </div>

        {/* Geographic & Technical Status Details */}
        <div className="w-full max-w-md h-[1px] bg-white/5 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between w-full text-[10px] text-[#475569] font-mono tracking-widest max-w-5xl gap-4">
          <span>DESPLEGADO DE FORMA SEGURA</span>
          <span className="uppercase text-center sm:text-right">
            SISTEMAS EXCLUSIVOS EN QUITO, ECUADOR • ESTABLECIDO EN {currentYear}
          </span>
          <span>© MAX AI - DIGITAL STUDIO</span>
        </div>

      </div>
    </footer>
  );
}
