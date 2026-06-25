import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ className = "", iconOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-4 select-none ${className}`}>
      {/* SVG Monograma "MI" estilizado conforme al Stitch */}
      <svg
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 md:w-14 md:h-14 drop-shadow-[0_4px_12px_rgba(193,127,78,0.15)]"
      >
        {/* Stroke "M" izquierdo y diagonal (Blanco #F8FAFC) */}
        <path
          d="M 25 35 L 25 85 C 25 88.5 27.5 91 31 91 C 34.5 91 37 88.5 37 85 L 37 47 L 62.5 72.5 C 64.5 74.5 67.5 74.5 69.5 72.5 C 70 72 70.5 71.5 71 71"
          stroke="#F8FAFC"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Diagonal derecho y stroke vertical de "M" (Cobre #C17F4E) */}
        <path
          d="M 37.5 84.5 L 48 74 C 49 73 50.5 72.5 52 73.5 L 83 83.5 C 85 84 87 85 87 87 L 87 85"
          stroke="#C17F4E"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-90"
        />
        <path
          d="M 62.5 72.5 L 85 45 M 89 35 L 89 85 C 89 88.5 91.5 91 95 91 C 98.5 91 101 88.5 101 85 L 101 35 C 101 31.5 98.5 29 95 29 C 91.5 29 89 31.5 89 35 Z"
          stroke="#C17F4E"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Barra vertical de "I" separada (Cobre #C17F4E) */}
        <path
          d="M 113 35 L 113 85 C 113 88.5 115.5 91 119 91 C 122.5 91 125 88.5 125 85 L 125 35 C 125 31.5 122.5 29 119 29 C 115.5 29 113 31.5 113 35 Z"
          fill="#C17F4E"
          stroke="#C17F4E"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-2xl tracking-[0.2em] text-[#F8FAFC]">
              MAX
            </span>
            <span className="font-display font-medium text-2xl tracking-[0.2em] text-[#C17F4E]">
              AI
            </span>
          </div>
          <span className="font-sans text-[9px] tracking-[0.45em] text-[#94A3B8] font-semibold uppercase leading-none mt-1">
            DIGITAL STUDIO
          </span>
        </div>
      )}
    </div>
  );
}
