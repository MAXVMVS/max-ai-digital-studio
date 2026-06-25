import React, { useState } from "react";
import { Send, CheckCircle2, AlertTriangle, RefreshCw, Layers, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { saveLead } from "../firebase";
import { LeadFormInput } from "../types";

export default function OnboardingForm() {
  const [formData, setFormData] = useState<LeadFormInput>({
    fullName: "",
    email: "",
    companyName: "",
    selectedPainPoints: [],
    selectedServices: [],
    extraDetails: ""
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormInput, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const availablePainPoints = [
    { id: "pain-clarity", text: "Falta de diferenciación / Marca débil" },
    { id: "pain-web-slow", text: "Página web lenta o inexistente" },
    { id: "pain-no-leads", text: "Embudo comercial desconectado" },
    { id: "pain-manual-work", text: "Cuellos de botella en tareas manuales" }
  ];

  const availableServices = [
    { id: "service-branding", text: "Posicionamiento & Branding" },
    { id: "service-web-dev", text: "Desarrollo Web Premium React/SEO" },
    { id: "service-ai-automation", text: "IA & Automatización Avanzada" }
  ];

  // Alterna checkboxes para dolores
  const handlePainPointToggle = (id: string) => {
    setFormData((prev) => {
      const alreadyChecked = prev.selectedPainPoints.includes(id);
      return {
        ...prev,
        selectedPainPoints: alreadyChecked
          ? prev.selectedPainPoints.filter((item) => item !== id)
          : [...prev.selectedPainPoints, id]
      };
    });
    // Limpiar error asociado si hay al menos uno elegido
    if (errors.selectedPainPoints) {
      setErrors((prev) => ({ ...prev, selectedPainPoints: undefined }));
    }
  };

  // Alterna checkboxes para servicios deseados
  const handleServiceToggle = (id: string) => {
    setFormData((prev) => {
      const alreadyChecked = prev.selectedServices.includes(id);
      return {
        ...prev,
        selectedServices: alreadyChecked
          ? prev.selectedServices.filter((item) => item !== id)
          : [...prev.selectedServices, id]
      };
    });
    // Limpiar error asociado si hay al menos uno elegido
    if (errors.selectedServices) {
      setErrors((prev) => ({ ...prev, selectedServices: undefined }));
    }
  };

  // Validaciones del lado del cliente
  const validateForm = (): boolean => {
    const tempErrors: Partial<Record<keyof LeadFormInput, string>> = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      tempErrors.fullName = "Se requiere tu nombre completo.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = "Necesitamos tu dirección de correo.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Escribe un correo electrónico corporativo válido.";
      isValid = false;
    }

    if (!formData.companyName.trim()) {
      tempErrors.companyName = "Por favor ingresa el nombre de tu empresa.";
      isValid = false;
    }

    if (formData.selectedPainPoints.length === 0) {
      tempErrors.selectedPainPoints = "Selecciona al menos un obstáculo de tu lista.";
      isValid = false;
    }

    if (formData.selectedServices.length === 0) {
      tempErrors.selectedServices = "Selecciona al menos un servicio de interés.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const result = await saveLead(formData);
      if (result.success) {
        setStatus("success");
        setIsDemoMode(result.isDemo);
      } else {
        setStatus("error");
        setErrorMessage("Ocurrió un error inesperado al transmitir sus datos.");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Fallo técnico en la conexión con la base de datos.");
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      companyName: "",
      selectedPainPoints: [],
      selectedServices: [],
      extraDetails: ""
    });
    setErrors({});
    setStatus("idle");
    setIsDemoMode(false);
  };

  return (
    <section
      id="onboarding"
      className="py-24 px-6 bg-[#041021]/95 relative border-t border-[rgba(193,127,78,0.06)]"
    >
      <div className="glow-orb top-[-10%] right-[30%] opacity-20" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C17F4E]/10 border border-[#C17F4E]/20 rounded-full text-xs text-[#E2E8F0] font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-[#C17F4E]" />
            <span>ONBOARDING DIGITAL PREMIUM</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#F8FAFC] tracking-tight">
            Diseñemos tu Siguiente Fase
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#94A3B8] max-w-lg mx-auto mt-3 leading-relaxed">
            Completa el cuestionario interactivo de diagnóstico. Nuestro equipo de Quito analizará tus respuestas para estructurar una propuesta técnica personalizada.
          </p>
        </div>

        {/* Dynamic Glassmorphic Panel Form */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl bg-brand-card/35 border border-brand-border/60 shadow-[0_20px_50px_rgba(4,16,33,0.5)]">
          <AnimatePresence mode="wait">
            {status !== "success" ? (
              <motion.form
                key="onboarding-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullName" className="font-display text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="Ej. Carlos Mendoza"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      className={`px-4 py-3.5 rounded-xl bg-[#041021]/80 text-[#F8FAFC] text-sm border focus:outline-none focus:border-[#C17F4E] transition-all ${
                        errors.fullName ? "border-red-500/60" : "border-brand-border"
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[10px] sm:text-xs text-red-400 font-mono mt-1">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Company Name Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="companyName" className="font-display text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                      Nombre de la Empresa *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      placeholder="Ej. Mendoza Business Group"
                      value={formData.companyName}
                      onChange={(e) => {
                        setFormData({ ...formData, companyName: e.target.value });
                        if (errors.companyName) setErrors({ ...errors, companyName: undefined });
                      }}
                      className={`px-4 py-3.5 rounded-xl bg-[#041021]/80 text-[#F8FAFC] text-sm border focus:outline-none focus:border-[#C17F4E] transition-all ${
                        errors.companyName ? "border-red-500/60" : "border-brand-border"
                      }`}
                    />
                    {errors.companyName && (
                      <span className="text-[10px] sm:text-xs text-red-400 font-mono mt-1">
                        {errors.companyName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-display text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                    Correo Electrónico Corporativo *
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="carlos@mendoza.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={`px-4 py-3.5 rounded-xl bg-[#041021]/80 text-[#F8FAFC] text-sm border focus:outline-none focus:border-[#C17F4E] transition-all ${
                      errors.email ? "border-red-500/60" : "border-brand-border"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[10px] sm:text-xs text-red-400 font-mono mt-1">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Pain Points Dynamic Checklist Selector */}
                <div className="flex flex-col gap-3">
                  <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                    Selecciona tus factores críticos de dolor (Elige al menos 1) *
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {availablePainPoints.map((point) => {
                      const isChecked = formData.selectedPainPoints.includes(point.id);
                      return (
                        <button
                          key={point.id}
                          type="button"
                          onClick={() => handlePainPointToggle(point.id)}
                          className={`flex items-center gap-3 p-4 rounded-xl text-left border text-xs sm:text-sm font-medium transition-all duration-200 ${
                            isChecked
                              ? "bg-[#C17F4E]/15 border-[#C17F4E] text-[#F8FAFC]"
                              : "bg-[#041021]/50 border-brand-border text-[#94A3B8] hover:border-brand-border-hover"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked ? "bg-[#C17F4E] border-[#C17F4E]" : "border-[rgba(193,127,78,0.25)]"
                          }`}>
                            {isChecked && <CheckCircle2 className="w-3 h-3 text-white" />}
                          </div>
                          <span>{point.text}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.selectedPainPoints && (
                    <span className="text-[10px] sm:text-xs text-red-400 font-mono mt-1">
                      {errors.selectedPainPoints}
                    </span>
                  )}
                </div>

                {/* Desired Services Dynamic Checklist Selector */}
                <div className="flex flex-col gap-3">
                  <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                    ¿Qué soluciones de alcance necesitas explorar? *
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {availableServices.map((service) => {
                      const isChecked = formData.selectedServices.includes(service.id);
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => handleServiceToggle(service.id)}
                          className={`flex items-center gap-3 p-4 rounded-xl text-left border text-xs sm:text-sm font-medium transition-all duration-200 ${
                            isChecked
                              ? "bg-[#C17F4E]/15 border-[#C17F4E] text-[#F8FAFC]"
                              : "bg-[#041021]/50 border-brand-border text-[#94A3B8] hover:border-brand-border-hover"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked ? "bg-[#C17F4E] border-[#C17F4E]" : "border-[rgba(193,127,78,0.25)]"
                          }`}>
                            {isChecked && <CheckCircle2 className="w-3 h-3 text-white" />}
                          </div>
                          <span>{service.text}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.selectedServices && (
                    <span className="text-[10px] sm:text-xs text-red-400 font-mono mt-1">
                      {errors.selectedServices}
                    </span>
                  )}
                </div>

                {/* Extra Details Area */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="extraDetails" className="font-display text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                    Detalles Adicionales del Proyecto o Empresa (Opcional)
                  </label>
                  <textarea
                    id="extraDetails"
                    rows={4}
                    placeholder="Describe contextualmente tu modelo, tus canales actuales o qué esperas lograr..."
                    value={formData.extraDetails}
                    onChange={(e) => setFormData({ ...formData, extraDetails: e.target.value })}
                    className="px-4 py-3.5 rounded-xl bg-[#041021]/80 text-[#F8FAFC] text-sm border border-brand-border focus:outline-none focus:border-[#C17F4E] transition-all"
                  />
                </div>

                {/* Error Banner if submit fails */}
                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex gap-3 items-start">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold font-display">Error de Conexión del Servidor</p>
                      <p className="font-mono mt-1 text-[11px] font-medium text-red-300/85 bg-[#041021]/60 p-2.5 rounded-lg border border-red-500/10 mt-2">
                        {errorMessage}
                      </p>
                    </div>
                  </div>
                )}

                {/* Form CTA Action Buttons */}
                <div className="pt-4 border-t border-[rgba(193,127,78,0.1)] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#475569] uppercase tracking-wider leading-none">
                    * TODOS LOS CAMPOS MARCADOS CON ASTERISCO SON ENLACES CRÍTICOS
                  </span>
                  
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="px-8 py-4 rounded-xl bg-[#C17F4E] hover:bg-[#D79663] text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_4px_24px_rgba(193,127,78,0.2)] disabled:opacity-50 shrink-0 select-none cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>PROCESANDO DIAGNÓSTICO...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>COMPLETAR ENVIÓ</span>
                      </>
                    )}
                  </button>
                </div>

              </motion.form>
            ) : (
              /* Submission Success screen */
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 flex flex-col items-center max-w-xl mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-[#C17F4E]/10 border border-[#C17F4E]/30 flex items-center justify-center text-[#C17F4E] mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-2">
                  ¡Diagnóstico Recibido con Éxito!
                </h3>
                
                <p className="font-sans text-sm text-[#94A3B8] leading-relaxed mb-8">
                  Estimado/a <span className="text-white font-semibold">{formData.fullName}</span> de <span className="text-[#C17F4E] font-semibold">{formData.companyName}</span>, nos pondremos en contacto al correo <span className="text-white font-semibold">{formData.email}</span> en un plazo menor a 24 horas laborables.
                </p>

                {/* Notification block about Demo / Local persistence vs Live Firestore */}
                {isDemoMode ? (
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-left mb-8 block">
                    <div className="flex gap-2.5 items-center text-amber-300 font-display text-sm font-semibold mb-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Modo Práctica Activado (Local Storage)</span>
                    </div>
                    <p className="font-sans text-xs text-[#CBD5E1] leading-relaxed">
                      El sistema detectó que tu base de datos de Firestore en Firebase no está totalmente aprovisionada. El cliente simulador de MAX AI persistió tus respuestas en tu almacenamiento local (<code className="bg-[#041021]/60 px-1 py-0.5 rounded text-amber-300">localStorage</code>) para que disfrutes de la experiencia interactiva sin interrupciones.
                    </p>
                    <p className="font-sans text-[11px] text-[#94A3B8] mt-3 leading-relaxed">
                      Para conectar esto en producción con Firebase, simplemente ejecuta el instalador del asistente haciendo clic en el panel lateral de Firebase en el entorno de desarrollo. ¡Quedará listo de inmediato!
                    </p>
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-[rgba(39,201,63,0.2)] text-left mb-8 block">
                    <div className="flex gap-2.5 items-center text-emerald-300 font-display text-sm font-semibold mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Conexión Firebase Firestore Real Exitosa</span>
                    </div>
                    <p className="font-sans text-xs text-[#CBD5E1] leading-relaxed">
                      Los datos se han transmitido de manera segura y en tiempo real a la colección de base de datos remota de Firebase (<code className="bg-[#041021]/60 px-1 py-0.5 rounded text-emerald-400">leads</code>).
                    </p>
                  </div>
                )}

                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl border border-[rgba(193,127,78,0.3)] hover:border-[#C17F4E] hover:bg-[#C17F4E]/5 text-xs font-semibold uppercase tracking-wider text-[#F8FAFC] transition-all"
                >
                  Registrar otro Diagnóstico
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
