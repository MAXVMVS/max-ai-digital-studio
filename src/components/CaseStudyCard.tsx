import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { CaseStudy } from '../i18n/translations';

interface CaseStudyCardProps {
  key?: React.Key;
  c: CaseStudy;
  isDark: boolean;
  themeStyles: any;
  lang: 'es' | 'en';
}

export function CaseStudyCard({ c, isDark, themeStyles, lang }: CaseStudyCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = -(y / (rect.height / 2)) * 6;
    const tiltY = (x / (rect.width / 2)) * 6;
    setCoords({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const translatedCategory = c.category[lang];
  const translatedTagline = c.tagline[lang];
  const translatedDescription = c.description[lang];
  const translatedKpis = c.kpis[lang];

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${coords.x}deg) rotateY(${coords.y}deg) translateY(-6px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`rounded-xl border flex flex-col justify-between overflow-hidden shadow-lg transition-all duration-300 ${
        isHovered ? 'shadow-[#C17F4E]/10 border-[#C17F4E]/30' : ''
      } ${themeStyles.card}`}
    >
      <div style={{ transform: 'translateZ(15px)' }}>
        <div className="relative h-48 overflow-hidden bg-zinc-950">
          <img 
            src={c.image} 
            alt={c.client} 
            referrerPolicy="no-referrer"
            loading="lazy"
            width={600}
            height={400}
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute top-4 left-4 bg-[#C17F4E] text-white font-mono text-[9px] font-bold uppercase px-2 py-1 rounded tracking-widest">
            {translatedCategory}
          </div>
        </div>

        <div className="p-6">
          <h3 className={`font-display font-black text-lg uppercase leading-none ${themeStyles.title}`}>{c.client}</h3>
          <p className="text-xs text-[#C17F4E] font-mono font-semibold mt-1 mb-3">{translatedTagline}</p>
          <p className={`text-xs sm:text-sm font-sans font-light leading-relaxed mb-4 ${themeStyles.textMuted}`}>{translatedDescription}</p>
          
          <div className={`space-y-1 p-3 rounded border mb-4 ${themeStyles.cardInner}`}>
            <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest font-bold">{lang === 'es' ? 'Métricas Auditadas' : 'Audited Metrics'}</p>
            {translatedKpis.map((k, kIdx) => (
              <div key={kIdx} className={`flex gap-2 items-center text-[11px] font-mono ${isDark ? 'text-zinc-300' : 'text-slate-800'}`}>
                <span className="text-[#C17F4E] font-black">✓</span> {k}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ transform: 'translateZ(10px)' }} className="p-6 pt-0 border-t border-white/5 mt-auto flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {c.stack.map((s, sIdx) => (
            <span key={sIdx} className="text-[9px] font-mono bg-zinc-950/80 px-2 py-0.5 rounded text-zinc-400">
              {s}
            </span>
          ))}
        </div>
        
        {c.url !== '#' && (
          <a 
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-[#C17F4E] hover:text-[#D79663] transition-colors"
            title={lang === 'es' ? 'Visitar Staging' : 'Visit Staging'}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
