import { useState, useEffect } from 'react';

export function Interactive3DNetwork() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20 sm:opacity-30">
      <svg 
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          transition: 'transform 1s cubic-bezier(0.1, 0.8, 0.2, 1)',
        }}
        viewBox="0 0 800 600" 
        className="w-full h-full"
      >
        <line x1="150" y1="100" x2="350" y2="80" stroke="#C17F4E" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="350" y1="80" x2="550" y2="180" stroke="#C17F4E" strokeWidth="0.8" />
        <line x1="150" y1="100" x2="200" y2="380" stroke="#2563EB" strokeWidth="0.8" />
        <line x1="200" y1="380" x2="450" y2="450" stroke="#2563EB" strokeWidth="0.8" strokeDasharray="2 2" />
        <line x1="550" y1="180" x2="450" y2="450" stroke="#C17F4E" strokeWidth="0.8" />
        <line x1="350" y1="80" x2="200" y2="380" stroke="#C17F4E" strokeWidth="0.8" />
        <line x1="150" y1="100" x2="450" y2="450" stroke="#2563EB" strokeWidth="0.4" />

        <circle cx="150" cy="100" r="5" fill="#2563EB" className="animate-pulse" />
        <circle cx="350" cy="80" r="6" fill="#C17F4E" />
        <circle cx="550" cy="180" r="7" fill="#2563EB" />
        <circle cx="200" cy="380" r="5" fill="#C17F4E" className="animate-pulse" />
        <circle cx="450" cy="450" r="6" fill="#2563EB" />
      </svg>
    </div>
  );
}
