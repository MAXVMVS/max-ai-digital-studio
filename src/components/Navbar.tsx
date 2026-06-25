import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Problemas", href: "#problemas" },
    { name: "Metodología", href: "#metodologia" },
    { name: "Casos", href: "#casos" },
    { name: "Servicios", href: "#servicios" },
  ];

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "py-4 bg-[#041021]/80 backdrop-blur-md border-b border-[rgba(193,127,78,0.12)] shadow-[0_8px_32px_rgba(4,16,33,0.5)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="hover:opacity-90 transition-opacity">
            <Logo />
          </a>

          {/* Desktop Navigation Link Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-sans font-medium text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#C17F4E] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#onboarding"
              className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-[#C17F4E]/30 text-[#F8FAFC] bg-[#C17F4E]/10 hover:bg-[#C17F4E] hover:border-[#C17F4E] transition-all duration-300 flex items-center gap-1.5"
            >
              Iniciar Onboarding
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Trigger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#94A3B8] hover:text-[#F8FAFC] p-2 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-[80px] z-40 w-full h-[calc(100vh-80px)] bg-[#041021]/95 backdrop-blur-xl border-t border-[rgba(193,127,78,0.1)] px-6 py-8 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display font-medium text-2xl text-[#94A3B8] hover:text-[#F8FAFC] py-2 transition-colors border-b border-white/5"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-4 pb-12"
            >
              <a
                href="#onboarding"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 text-center rounded-xl bg-[#C17F4E] text-[#F8FAFC] font-semibold tracking-wider uppercase text-sm shadow-[0_4px_20px_rgba(193,127,78,0.25)] hover:bg-[#C17F4E]/90 transition-all"
              >
                Onboarding Digital
              </a>
              <div className="text-center text-xs text-[#475569]">
                Quito, Ecuador • Consultoría de Élite
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
