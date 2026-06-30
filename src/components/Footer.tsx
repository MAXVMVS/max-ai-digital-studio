import React from 'react';
import { Github, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
  lang: 'es' | 'en';
  t: any;
  setActivePage: (page: 'inicio' | 'precios' | 'portafolio' | 'contacto' | 'login') => void;
}

export const Footer: React.FC<FooterProps> = ({ isDark, lang, t, setActivePage }) => {
  const footerBg = isDark 
    ? 'bg-zinc-950/90 border-white/5 text-zinc-400' 
    : 'bg-[#FAF8F5] border-[#D6D0C1] text-slate-600';

  const titleColor = isDark ? 'text-white' : 'text-slate-900';
  const dividerColor = isDark ? 'border-white/5' : 'border-slate-200';
  const hoverLinkColor = 'hover:text-[#C17F4E] transition-colors duration-300';

  return (
    <footer className={`border-t py-8 transition-colors duration-500 ${footerBg}`}>
      {/* Copyright Bar Only - Centered */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex justify-center items-center font-mono text-[9px] uppercase tracking-widest text-zinc-500 text-center">
        <div className="flex gap-4 flex-wrap justify-center">
          <span>© 2026 MAX AI STUDIO</span>
          <span className={isDark ? 'text-zinc-800' : 'text-slate-300'}>|</span>
          <span>{t.footText}</span>
        </div>
      </div>
    </footer>
  );
};
