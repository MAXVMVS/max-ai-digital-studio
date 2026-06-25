import React, { useState, useEffect, useMemo } from 'react';
import { 
  Brain, Cpu, Layers, Zap, Sparkles, Code2, Database, Network, 
  ArrowRight, Check, CheckCircle2, ArrowLeft, Sun, Moon, Menu, X, 
  ExternalLink, TrendingUp, Users, ChevronRight, Send, AlertTriangle, HelpCircle,
  FolderKanban, LayoutDashboard, LogOut, Plus, RefreshCw, FileText, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  db, auth, handleFirestoreError, OperationType 
} from './lib/firebase';
import { 
  signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User 
} from 'firebase/auth';
import { 
  doc, setDoc, getDoc, getDocs, collection, query, where, onSnapshot, serverTimestamp, limit, orderBy
} from 'firebase/firestore';

// --- Types & Interfaces ---
interface Module {
  id: string;
  name: string;
  price: number;
  durationWeeks: number;
  description: string;
  category: string;
}

interface CaseStudy {
  client: string;
  tagline: string;
  description: string;
  kpis: string[];
  stack: string[];
  url: string;
  image: string;
  category: string;
}

// --- Constant Data ---
const MODULES: Module[] = [
  {
    id: 'meta_b2c',
    name: 'Ecosistema B2C + Catálogo Meta',
    price: 1800,
    durationWeeks: 3,
    description: 'Sincronización automatizada de inventario a Meta Graph API, píxeles de conversión y lookbooks de Instagram.',
    category: 'Ventas e Integraciones'
  },
  {
    id: 'landing_crm',
    name: 'Landing Page Lead Gen + CRM',
    price: 1200,
    durationWeeks: 2,
    description: 'Diseño ultra-rápido optimizado para conversión con indexación SEO y conexión nativa a CRM.',
    category: 'Infraestructura Web'
  },
  {
    id: 'custom_ml',
    name: 'Modelo de IA y ML Personalizado',
    price: 2500,
    durationWeeks: 4,
    description: 'Modelos predictivos cognitivos entrenados con los datos de tu negocio para predecir demanda o automatizar flujos.',
    category: 'Inteligencia Artificial'
  },
  {
    id: 'whatsapp_flow',
    name: 'Flujos de WhatsApp Cloud API',
    price: 900,
    durationWeeks: 2,
    description: 'Atención automatizada inteligente con agentes híbridos de IA para responder consultas de stock y agendar citas.',
    category: 'Ventas e Integraciones'
  },
  {
    id: 'dashboard_firestore',
    name: 'Dashboard Métricas & Firestore Sync',
    price: 1500,
    durationWeeks: 3,
    description: 'Panel interactivo en tiempo real para administración gerencial con base de datos NoSQL de alta velocidad.',
    category: 'Infraestructura Web'
  }
];

const CASE_STUDIES: CaseStudy[] = [
  {
    client: 'Psic. Damaris Pazmiño',
    tagline: 'Salud Mental & Clínica Automatizada',
    description: 'Ecosistema digital completo para automatizar el agendamiento y flujo de pacientes, integrado con Google Cloud Firestore y geolocalización avanzada en Google Maps.',
    kpis: ['+140% citas agendadas', 'Cancelaciones reducidas a cero', 'Carga inicial < 1.2s'],
    stack: ['React 19', 'Tailwind v4', 'Firestore Realtime', 'Google Maps API'],
    url: 'https://psicdamaris.vercel.app',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    category: 'Salud & Automatización'
  },
  {
    client: 'Amy Tevet',
    tagline: 'Sastrería Premium & Alta Costura B2C',
    description: 'Lookbook interactivo digital de lujo silencioso, con sincronización automática de catálogos mediante la API Graph de Meta para potenciar campañas de anuncios y conversión directa.',
    kpis: ['Sincronización diaria activa', '+220k alcance en Instagram', 'Diseño de alto contraste'],
    stack: ['React 19', 'Meta Graph API', 'Tailwind CSS', 'Cloud Firestore'],
    url: 'https://www.instagram.com/amytevet.tm',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    category: 'Lujo & E-commerce'
  },
  {
    client: 'Velox Motors',
    tagline: 'Distribuidor Automotriz & Leads Automatizados',
    description: 'Inventario inteligente de vehículos de lujo con automatización de calificación de prospectos vía WhatsApp CRM integrado, mejorando el tiempo de respuesta inmediato.',
    kpis: ['Uptime certificado 99.98%', 'Conversión de leads x3.5', 'Latencia de inferencia 85ms'],
    stack: ['React 19', 'PostgreSQL', 'AI Lead Agent', 'WhatsApp Cloud API'],
    url: '#',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    category: 'Automotriz & SaaS'
  }
];

const INITIAL_LOGS = [
  'SYSTEM: MAX AI Core v5.0 initialized successfully.',
  'INFO: Active cluster Quito, EC connected (lat: -0.1807, lon: -78.4678).',
  'SYNC: Listening to Firestore triggers on Clinic flow (Psic. Damaris Pazmiño)...',
  'SUCCESS: Meta Pixel Catalog API response status 200 OK (Amy Tevet Product Catalog).',
  'SYSTEM: High-performance React engine ready on port 3000.'
];

export default function App() {
  const [activePage, setActivePage] = useState<'inicio' | 'servicios' | 'portafolio'>('inicio');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // --- Firebase & Google Forms Integration State ---
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);
  const [portfolioTab, setPortfolioTab] = useState<'casos' | 'forms' | 'leads'>('casos');
  const [connectedForms, setConnectedForms] = useState<any[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string>('');
  const [formInputId, setFormInputId] = useState<string>('');
  const [activeFormDetails, setActiveFormDetails] = useState<any | null>(null);
  const [activeFormResponses, setActiveFormResponses] = useState<any[]>([]);
  const [isLoadingForms, setIsLoadingForms] = useState<boolean>(false);
  const [isCreatingForm, setIsCreatingForm] = useState<boolean>(false);
  const [receivedLeads, setReceivedLeads] = useState<any[]>([]);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);
  const [formsError, setFormsError] = useState<string>('');

  // Sincronizar estado de Auth en carga
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        // Verificar privilegios de administrador
        getDoc(doc(db, 'admins', user.uid)).then((docSnap) => {
          setIsAdminUser(docSnap.exists());
        }).catch(() => {
          setIsAdminUser(false);
        });
      } else {
        setIsAdminUser(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Escuchar forms conectados del usuario desde Firestore
  useEffect(() => {
    if (!currentUser) {
      setConnectedForms([]);
      return;
    }
    const q = query(collection(db, 'userForms'), where('userId', '==', currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const formsList: any[] = [];
      snapshot.forEach((doc) => {
        formsList.push({ id: doc.id, ...doc.data() });
      });
      setConnectedForms(formsList);
      if (formsList.length > 0 && !selectedFormId) {
        setSelectedFormId(formsList[0].formId);
      }
    }, (error) => {
      console.error("Error al escuchar userForms:", error);
    });
    return () => unsubscribe();
  }, [currentUser, selectedFormId]);

  // Escuchar leads en tiempo real para visualización en portal (admins o creador)
  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, 'onboarding'), orderBy('createdAt', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsList: any[] = [];
      snapshot.forEach((doc) => {
        leadsList.push({ id: doc.id, ...doc.data() });
      });
      setReceivedLeads(leadsList);
    }, (error) => {
      console.log("Acceso a leads restringido por reglas de seguridad (comportamiento normal no-admin):", error.message);
    });
    return () => unsubscribe();
  }, [currentUser]);

  // Sincronizar detalles del formulario activo de Google Forms y respuestas
  const fetchActiveFormFromGoogle = async () => {
    if (!selectedFormId || !googleAccessToken) return;
    setIsLoadingForms(true);
    setFormsError('');
    try {
      const formRes = await fetch(`https://forms.googleapis.com/v1/forms/${selectedFormId}`, {
        headers: { Authorization: `Bearer ${googleAccessToken}` }
      });
      if (!formRes.ok) throw new Error("ID de formulario no encontrado en Google Forms o falta de permisos.");
      const formDetails = await formRes.json();
      setActiveFormDetails(formDetails);

      const responsesRes = await fetch(`https://forms.googleapis.com/v1/forms/${selectedFormId}/responses`, {
        headers: { Authorization: `Bearer ${googleAccessToken}` }
      });
      if (responsesRes.ok) {
        const responsesData = await responsesRes.json();
        setActiveFormResponses(responsesData.responses || []);
      } else {
        setActiveFormResponses([]);
      }
    } catch (err: any) {
      console.error(err);
      setFormsError(err.message || "Error al sincronizar datos de Google Forms");
    } finally {
      setIsLoadingForms(false);
    }
  };

  useEffect(() => {
    fetchActiveFormFromGoogle();
  }, [selectedFormId, googleAccessToken]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/forms.body');
    provider.addScope('https://www.googleapis.com/auth/forms.responses.readonly');
    provider.addScope('https://www.googleapis.com/auth/drive.readonly');
    
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        setGoogleAccessToken(credential.accessToken);
      }
      setCurrentUser(result.user);
    } catch (error: any) {
      console.error("Sign in error:", error);
      setFormsError("Fallo al autenticar y autorizar alcances de Google Workspace");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setGoogleAccessToken(null);
      setActiveFormDetails(null);
      setActiveFormResponses([]);
      setConnectedForms([]);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleConnectForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInputId.trim() || !currentUser || !googleAccessToken) return;
    setIsLoadingForms(true);
    setFormsError('');
    try {
      const formRes = await fetch(`https://forms.googleapis.com/v1/forms/${formInputId.trim()}`, {
        headers: { Authorization: `Bearer ${googleAccessToken}` }
      });
      if (!formRes.ok) throw new Error("ID de Formulario no válido o sin permisos de acceso.");
      const formDetails = await formRes.json();

      const formConfigId = `form_${Math.random().toString(36).substring(2, 11)}`;
      await setDoc(doc(db, 'userForms', formConfigId), {
        userId: currentUser.uid,
        formId: formInputId.trim(),
        formTitle: formDetails.info?.title || 'Formulario sin título',
        connectedAt: serverTimestamp(),
        syncEnabled: true
      });
      setSelectedFormId(formInputId.trim());
      setFormInputId('');
    } catch (err: any) {
      console.error(err);
      setFormsError(err.message || "Error al conectar el formulario");
    } finally {
      setIsLoadingForms(false);
    }
  };

  const handleCreateAutoForm = async () => {
    if (!currentUser || !googleAccessToken) return;
    setIsCreatingForm(true);
    setFormsError('');
    try {
      const createRes = await fetch('https://forms.googleapis.com/v1/forms', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          info: {
            title: 'MAX AI Studio - Captación de Clientes y Diagnóstico',
            documentTitle: `MAX_AI_Diagnostico_${Date.now()}`,
          },
        }),
      });
      if (!createRes.ok) throw new Error("Error al iniciar el formulario en Google.");
      const newForm = await createRes.json();
      const formId = newForm.formId;

      const updateBody = {
        requests: [
          {
            createItem: {
              item: {
                title: 'Nombre de tu Empresa o Marca',
                questionItem: {
                  question: {
                    required: true,
                    textQuestion: {},
                  },
                },
              },
              location: { index: 0 },
            },
          },
          {
            createItem: {
              item: {
                title: 'Principal Cuello de Botella Operativo o de Ventas',
                questionItem: {
                  question: {
                    required: true,
                    textQuestion: { paragraph: true },
                  },
                },
              },
              location: { index: 1 },
            },
          },
          {
            createItem: {
              item: {
                title: 'Presupuesto Estimado de Inversión Tecnológica',
                questionItem: {
                  question: {
                    required: true,
                    choiceQuestion: {
                      type: 'RADIO',
                      options: [
                        { value: 'Menos de $1,000 USD' },
                        { value: '$1,000 - $3,000 USD' },
                        { value: '$3,000 - $5,000 USD' },
                        { value: 'Más de $5,000 USD' }
                      ]
                    }
                  },
                },
              },
              location: { index: 2 },
            },
          },
          {
            createItem: {
              item: {
                title: 'WhatsApp de Contacto Directo',
                questionItem: {
                  question: {
                    required: true,
                    textQuestion: {},
                  },
                },
              },
              location: { index: 3 },
            },
          }
        ],
      };

      const updateRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateBody),
      });
      if (!updateRes.ok) throw new Error("Error al inicializar las preguntas en Google Forms.");

      const formConfigId = `form_${Math.random().toString(36).substring(2, 11)}`;
      await setDoc(doc(db, 'userForms', formConfigId), {
        userId: currentUser.uid,
        formId: formId,
        formTitle: 'MAX AI Studio - Captación de Clientes y Diagnóstico',
        connectedAt: serverTimestamp(),
        syncEnabled: true
      });

      setSelectedFormId(formId);
      setFormsError('');
    } catch (err: any) {
      console.error(err);
      setFormsError(err.message || "Error al crear el formulario automático");
    } finally {
      setIsCreatingForm(false);
    }
  };

  // Sparkline Interactive state
  const [activeSparklineTab, setActiveSparklineTab] = useState<'trafico' | 'conversion' | 'latencia'>('trafico');

  // Interactive 4 Pilares state
  const [activePilar, setActivePilar] = useState<number>(0);

  // Configurator Selected modules state
  const [selectedModules, setSelectedModules] = useState<string[]>(['meta_b2c', 'whatsapp_flow']);

  // Dynamic process stream log state
  const [logs, setLogs] = useState<string[]>(INITIAL_LOGS);

  // Onboarding multistep form states
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [companyName, setCompanyName] = useState<string>('');
  const [industry, setIndustry] = useState<string>('Tecnología');
  const [companySize, setCompanySize] = useState<string>('1-10 empleados');
  const [digitalMaturity, setDigitalMaturity] = useState<string>('Bajo');
  const [bottleneck, setBottleneck] = useState<string>('Operaciones manuales lentas');
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [customMessage, setCustomMessage] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');

  // Scroll to top immediately when active page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Append logs dynamically to simulate live SaaS processing
  useEffect(() => {
    const logTemplates = [
      'INFO: Meta Graph API catalog sync triggered. Modified items: 12.',
      'SUCCESS: Lead auto-qualified. Intent confidence score: 98.4%. Dispatching WhatsApp hook...',
      'SYNC: Cloud Firestore synchronized in 23ms for health platform users.',
      'SYSTEM: Resource optimization complete. Cloud Run memory pressure: 14.2%.',
      'ALERT: Auto-dealer stock updated. Pushing cache invalidation to Velox Motors client frontend.',
      'INFO: Ingested lead from Google Maps local listing API.',
      'SUCCESS: Dynamic catalog pixel synced successfully with META Business Suite.',
      'SYSTEM: Hot-reloading AI cognitive pipeline routes (v5.0.2).'
    ];

    const interval = setInterval(() => {
      const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      setLogs(prev => [...prev.slice(-14), `[${timeStr}] ${randomLog}`]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Compute values for configurator
  const configuratorTotal = useMemo(() => {
    return selectedModules.reduce((sum, id) => {
      const m = MODULES.find(mod => mod.id === id);
      return sum + (m ? m.price : 0);
    }, 0);
  }, [selectedModules]);

  const configuratorDuration = useMemo(() => {
    return selectedModules.reduce((max, id) => {
      const m = MODULES.find(mod => mod.id === id);
      return m ? Math.max(max, m.durationWeeks) : max;
    }, 0);
  }, [selectedModules]);

  // Handle service selection change
  const toggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      setSelectedModules(prev => prev.filter(mId => mId !== id));
    } else {
      setSelectedModules(prev => [...prev, id]);
    }
  };

  // Launch onboarding directly pre-filling values
  const handleProceedToOnboarding = () => {
    setActivePage('portafolio');
    setOnboardingStep(3); // Go straight to step 3 where modules are set
    // Focus or scroll to the onboarding container
    setTimeout(() => {
      const element = document.getElementById('onboarding-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  // Stepper validation & submit handlers
  const handleNextStep = () => {
    setValidationError('');
    if (onboardingStep === 1) {
      if (!companyName.trim()) {
        setValidationError('Por favor ingresa el nombre de tu negocio o empresa.');
        return;
      }
    } else if (onboardingStep === 2) {
      if (!bottleneck.trim()) {
        setValidationError('Por favor detalla tu principal cuello de botella.');
        return;
      }
    } else if (onboardingStep === 3) {
      if (selectedModules.length === 0) {
        setValidationError('Por favor selecciona al menos un módulo tecnológico de interés.');
        return;
      }
    }
    setOnboardingStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setValidationError('');
    setOnboardingStep(prev => prev - 1);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!contactName.trim() || !contactEmail.trim() || !contactPhone.trim()) {
      setValidationError('Por favor completa todos los campos de contacto obligatorios.');
      return;
    }

    const selectedModuleNames = selectedModules
      .map(id => MODULES.find(m => m.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const leadId = `lead_${Math.random().toString(36).substring(2, 11)}`;
    const leadData = {
      companyName: companyName.trim() || 'Negocio sin nombre',
      industry,
      companySize,
      digitalMaturity,
      bottleneck: bottleneck.trim() || 'No especificado',
      selectedModules,
      contactName: contactName.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      customMessage: customMessage.trim() || 'Sin comentarios adicionales.',
      configuratorTotal,
      configuratorDuration,
      createdAt: serverTimestamp(),
      userId: currentUser?.uid || null,
      status: 'pending'
    };

    try {
      // Direct Firestore write using the exact validation rules and error telemetry
      await setDoc(doc(db, 'onboarding', leadId), leadData);
    } catch (error) {
      console.error('Error recording lead in Firestore:', error);
      // Gracefully continue to WhatsApp fallback if Firestore is not provisioned or fully synchronized yet
    }

    // Build perfect encoded WhatsApp text
    const textPayload = `⚡ *MAX AI - SOLICITUD DE ONBOARDING* ⚡\n\n` +
      `🏢 *Empresa:* ${companyName || 'Negocio sin nombre'}\n` +
      `💼 *Industria:* ${industry}\n` +
      `👥 *Tamaño:* ${companySize}\n` +
      `📊 *Madurez Digital:* ${digitalMaturity}\n\n` +
      `🛑 *Cuello de Botella:* ${bottleneck || 'No especificado'}\n` +
      `🛠️ *Módulos de Interés:* ${selectedModuleNames}\n` +
      `💰 *Presupuesto Estimado:* $${configuratorTotal} USD\n` +
      `⏱️ *Tiempo Estimado:* ${configuratorDuration} semanas\n\n` +
      `👤 *Contacto:* ${contactName}\n` +
      `📧 *Email:* ${contactEmail}\n` +
      `📱 *Teléfono:* ${contactPhone}\n` +
      `📝 *Mensaje Adicional:* ${customMessage || 'Sin comentarios adicionales.'}\n\n` +
      `_Enviado desde MAX AI Premium Portal._`;

    const encodedText = encodeURIComponent(textPayload);
    const whatsappUrl = `https://wa.me/593983186044?text=${encodedText}`;

    // Mark as submitted
    setFormSubmitted(true);

    // Open WhatsApp in a new tab safely
    window.open(whatsappUrl, '_blank');
  };

  const resetForm = () => {
    setCompanyName('');
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setCustomMessage('');
    setOnboardingStep(1);
    setFormSubmitted(false);
  };

  // Sparkline coordinates based on active tab
  const sparklineData = {
    trafico: {
      path: "M 0 110 Q 50 120 100 50 T 200 80 T 300 30 T 400 15",
      points: [
        { cx: 100, cy: 50, val: "1.2k req/s" },
        { cx: 200, cy: 80, val: "Meta Webhook Triggered" },
        { cx: 300, cy: 30, val: "Conversion peak" },
        { cx: 400, cy: 15, val: "342% traffic surge" }
      ],
      primaryVal: "+342%",
      subtitle: "Incremento medio de tráfico orgánico en plataformas vinculadas a Meta"
    },
    conversion: {
      path: "M 0 130 Q 80 140 160 80 T 280 40 T 400 10",
      points: [
        { cx: 160, cy: 80, val: "Initial checkout optimize" },
        { cx: 280, cy: 40, val: "Firestore patient pipeline active" },
        { cx: 400, cy: 10, val: "3.5x Conversion Max" }
      ],
      primaryVal: "3.5x",
      subtitle: "Multiplicador de conversión de visitas a clientes agendados"
    },
    latencia: {
      path: "M 0 20 Q 100 25 200 40 T 300 75 T 400 85",
      points: [
        { cx: 100, cy: 22, val: "320ms legacy" },
        { cx: 200, cy: 40, val: "Cloud Run Edge Routing" },
        { cx: 300, cy: 75, val: "Postgres optimization layer" },
        { cx: 400, cy: 85, val: "85ms average latency" }
      ],
      primaryVal: "85ms",
      subtitle: "Tiempo de respuesta de extremo a extremo en flujos cognitivos de IA"
    }
  };

  // CSS variables for background/panel depending on isDark state
  const themeStyles = isDark ? {
    bg: 'bg-[#020813] text-zinc-100',
    header: 'bg-[#020813]/85 border-white/5',
    card: 'bg-zinc-900/40 border-white/5 backdrop-blur-xl',
    cardInner: 'bg-zinc-950/60 border-white/5',
    input: 'bg-zinc-950/80 border-white/10 text-white focus:border-[#C17F4E]',
    textMuted: 'text-zinc-400',
    title: 'text-white'
  } : {
    bg: 'bg-[#F8FAFC] text-slate-900',
    header: 'bg-white/80 border-slate-200',
    card: 'bg-white border-slate-200 backdrop-blur-xl shadow-lg shadow-slate-200/50',
    cardInner: 'bg-slate-50 border-slate-200/80',
    input: 'bg-white border-slate-300 text-slate-800 focus:border-[#C17F4E]',
    textMuted: 'text-slate-600',
    title: 'text-slate-900'
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${themeStyles.bg}`}>
      
      {/* Background Orbes Ambientales */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-40'}`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C17F4E]/5 rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-30'}`}></div>
      </div>

      {/* --- HEADER / NAVBAR --- */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b h-20 transition-all duration-300 ${themeStyles.header}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 h-full flex items-center justify-between">
          
          {/* Brand Logo with Premium Monospace Tag */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('inicio')}>
            <div className="w-10 h-10 rounded bg-gradient-to-br from-[#C17F4E] to-[#8B5E3C] flex items-center justify-center shadow-lg shadow-[#C17F4E]/20">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display font-black text-xl tracking-tight uppercase text-white">MAX AI</span>
                <span className="text-[#C17F4E] font-mono text-xs font-bold tracking-wider">DIGITAL STUDIO</span>
              </div>
              <p className="text-[9px] tracking-widest uppercase font-mono text-zinc-500">Elite Software Tailoring</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-8 text-xs font-semibold tracking-widest text-zinc-400 uppercase">
            <button 
              onClick={() => setActivePage('inicio')}
              className={`pb-1 transition-all uppercase ${
                activePage === 'inicio' 
                  ? 'text-white border-b-2 border-[#C17F4E]' 
                  : 'hover:text-white'
              }`}
            >
              Inicio
            </button>
            <button 
              onClick={() => setActivePage('servicios')}
              className={`pb-1 transition-all uppercase ${
                activePage === 'servicios' 
                  ? 'text-white border-b-2 border-[#C17F4E]' 
                  : 'hover:text-white'
              }`}
            >
              Servicios
            </button>
            <button 
              onClick={() => setActivePage('portafolio')}
              className={`pb-1 transition-all uppercase ${
                activePage === 'portafolio' 
                  ? 'text-white border-b-2 border-[#C17F4E]' 
                  : 'hover:text-white'
              }`}
            >
              Portafolio
            </button>
          </nav>

          {/* Action Tools: Switch Theme + WhatsApp Direct */}
          <div className="hidden md:flex items-center gap-6">
            {/* Theme Toggle Button */}
            <div className="flex bg-zinc-900/50 p-1 rounded-full border border-white/5">
              <button
                onClick={() => setIsDark(true)}
                className={`p-1.5 rounded-full transition-all ${isDark ? 'bg-[#C17F4E] text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                title="Modo Oscuro Elegante"
              >
                <Moon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsDark(false)}
                className={`p-1.5 rounded-full transition-all ${!isDark ? 'bg-[#C17F4E] text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                title="Modo Claro Corporativo"
              >
                <Sun className="w-4 h-4" />
              </button>
            </div>

            {/* Premium Contact Button */}
            <button 
              onClick={() => {
                setActivePage('portafolio');
                setTimeout(() => {
                  const el = document.getElementById('onboarding-form');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-6 py-2.5 bg-[#C17F4E] text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-[#D79663] transition-colors"
            >
              Contactar
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full border border-white/5 bg-zinc-900/40 text-[#C17F4E]"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded border border-white/5 bg-zinc-900/40 text-zinc-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* --- MOBILE DRAWER SIDEBAR --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative w-80 max-w-sm h-full p-6 flex flex-col justify-between shadow-2xl z-50 bg-[#041021] text-zinc-100 border-l border-white/5">
            <div>
              <div className="flex items-center justify-between pb-8 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-[#C17F4E]" />
                  <span className="font-display font-black text-lg tracking-tight text-white">MAX AI</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded border border-white/5 text-zinc-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-8">
                <button
                  onClick={() => { setActivePage('inicio'); setMobileMenuOpen(false); }}
                  className={`text-left text-sm font-semibold tracking-wider uppercase py-2.5 px-3 rounded transition-all ${activePage === 'inicio' ? 'bg-[#C17F4E]/10 text-[#C17F4E]' : 'hover:bg-white/5'}`}
                >
                  Inicio
                </button>
                <button
                  onClick={() => { setActivePage('servicios'); setMobileMenuOpen(false); }}
                  className={`text-left text-sm font-semibold tracking-wider uppercase py-2.5 px-3 rounded transition-all ${activePage === 'servicios' ? 'bg-[#C17F4E]/10 text-[#C17F4E]' : 'hover:bg-white/5'}`}
                >
                  Servicios
                </button>
                <button
                  onClick={() => { setActivePage('portafolio'); setMobileMenuOpen(false); }}
                  className={`text-left text-sm font-semibold tracking-wider uppercase py-2.5 px-3 rounded transition-all ${activePage === 'portafolio' ? 'bg-[#C17F4E]/10 text-[#C17F4E]' : 'hover:bg-white/5'}`}
                >
                  Portafolio & Onboarding
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 text-center">
              <p className="text-[10px] text-zinc-500 font-mono mb-4">CORE SYSTEM ACTIVE • QUITO, EC</p>
              <a 
                href="https://wa.me/593983186044"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center block bg-[#C17F4E] hover:bg-[#D79663] text-white py-3 rounded font-mono text-xs font-bold uppercase tracking-widest shadow-lg"
              >
                WHATSAPP DIRECTO
              </a>
            </div>
          </div>
        </div>
      )}

      {/* --- MAIN CORE --- */}
      <main className="relative z-10">

        {/* ======================================= */}
        {/*           PAGE 1: INICIO (HOME)         */}
        {/* ======================================= */}
        {activePage === 'inicio' && (
          <div className="fade-in">
            
            {/* --- HERO & DASHBOARD REPLICA ROW --- */}
            <section className="relative py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Content */}
                <div className="lg:col-span-7 flex flex-col items-start gap-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/80 border border-white/10 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-[#C17F4E] animate-pulse"></span>
                    <span className="text-[10px] font-mono tracking-tighter text-[#C17F4E] uppercase">CORE v5.0 ACTIVE • QUITO, EC</span>
                  </div>

                  <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-white uppercase">
                    INFRAESTRUCTURA <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C17F4E] to-[#D79663]">COGNITIVA</span> DE ALTO <br/> RENDIMIENTO
                  </h1>

                  <p className={`text-base sm:text-lg max-w-xl font-sans font-light leading-relaxed ${themeStyles.textMuted}`}>
                    Diseñamos y desplegamos ecosistemas digitales propietarios impulsados por Inteligencia Artificial para el posicionamiento de marcas de élite de forma ultrarrápida.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                    <button
                      onClick={() => setActivePage('portafolio')}
                      className="px-8 py-3.5 bg-[#C17F4E] text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-[#D79663] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C17F4E]/20 text-center flex items-center justify-center gap-2"
                    >
                      <span>INICIAR DIAGNÓSTICO</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => setActivePage('servicios')}
                      className={`px-8 py-3.5 rounded text-xs font-bold uppercase tracking-widest transition-all text-center border ${
                        isDark 
                          ? 'border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:bg-zinc-800' 
                          : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      EXPLORAR STACK
                    </button>
                  </div>

                  {/* Metrics Grid inside Hero */}
                  <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5 w-full max-w-lg mt-6">
                    <div className="border-l border-[#C17F4E]/40 pl-4">
                      <div className="text-2xl font-mono font-bold text-white tracking-tighter">3.5X</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Conversión</div>
                    </div>
                    <div className="border-l border-[#C17F4E]/40 pl-4">
                      <div className="text-2xl font-mono font-bold text-white tracking-tighter">99.98%</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Uptime</div>
                    </div>
                    <div className="border-l border-[#C17F4E]/40 pl-4">
                      <div className="text-2xl font-mono font-bold text-white tracking-tighter">85ms</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Latencia</div>
                    </div>
                  </div>
                </div>

                {/* Right Dashboard Mockup Replica */}
                <div className="lg:col-span-5 relative w-full">
                  <div className={`p-6 rounded-2xl border transition-all duration-500 ${themeStyles.card}`}>
                    
                    {/* Header bar */}
                    <div className="h-10 border-b border-white/10 pb-4 flex items-center justify-between mb-5">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest ml-2">MAX-AI-ANALYTICS-OS</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-[9px] font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>REAL-TIME</span>
                      </div>
                    </div>

                    {/* Selector Buttons */}
                    <div className="grid grid-cols-3 gap-1.5 mb-4">
                      {(['trafico', 'conversion', 'latencia'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveSparklineTab(tab)}
                          className={`py-2 rounded text-center font-mono text-[9px] uppercase tracking-wider transition-all ${
                            activeSparklineTab === tab
                              ? 'bg-[#C17F4E] text-white font-bold shadow-md'
                              : isDark ? 'bg-zinc-950/60 text-zinc-400 hover:bg-zinc-800' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {tab === 'trafico' ? 'Tráfico' : tab === 'conversion' ? 'Conversión' : 'Latencia'}
                        </button>
                      ))}
                    </div>

                    {/* Graphic SVGs inside nested card */}
                    <div className={`p-4 rounded-lg border mb-5 ${themeStyles.cardInner}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono font-semibold">Live Processing Metric</p>
                          <h4 className="text-2xl font-mono font-bold text-[#C17F4E]">
                            {sparklineData[activeSparklineTab].primaryVal}
                          </h4>
                        </div>
                        <div className="p-1.5 rounded bg-[#C17F4E]/10">
                          <TrendingUp className="w-4 h-4 text-[#C17F4E]" />
                        </div>
                      </div>

                      <div className="relative h-20 mt-3">
                        <svg viewBox="0 0 400 130" className="w-full h-full overflow-visible">
                          <path 
                            d={sparklineData[activeSparklineTab].path} 
                            fill="none" 
                            stroke="#C17F4E" 
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="transition-all duration-500"
                          />
                          {sparklineData[activeSparklineTab].points.map((pt, idx) => (
                            <circle 
                              key={idx}
                              cx={pt.cx} 
                              cy={pt.cy} 
                              r="5" 
                              fill={isDark ? "#020813" : "#FFFFFF"} 
                              stroke="#C17F4E" 
                              strokeWidth="2.5"
                              className="cursor-pointer hover:r-6"
                            />
                          ))}
                        </svg>
                      </div>
                      <p className="text-[9px] text-zinc-500 font-mono mt-1">
                        {sparklineData[activeSparklineTab].subtitle}
                      </p>
                    </div>

                    {/* Interactive Realtime Process Stream logs */}
                    <div>
                      <p className="text-[9px] uppercase font-mono tracking-widest text-zinc-500 mb-2">Process Logs Engine</p>
                      <div className="p-3.5 rounded bg-black/95 text-[#C17F4E] font-mono text-[9px] leading-relaxed h-32 overflow-y-auto">
                        {logs.slice(-5).map((log, index) => (
                          <div key={index} className="border-b border-white/5 py-1">
                            <span className="text-emerald-500 mr-1">✓</span> {log}
                          </div>
                        ))}
                        <div className="animate-pulse inline-block w-1.5 h-3 bg-[#C17F4E] ml-1"></div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* --- SECCIÓN DE FRICCIONES (PROBLEM GRID) --- */}
            <motion.section 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`py-24 px-6 sm:px-10 lg:px-16 border-t border-b ${
                isDark ? 'bg-zinc-950/40 border-white/5' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">Diagnóstico de Mercado</span>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white uppercase mt-2">
                    La Fricción del Software Tradicional
                  </h2>
                  <p className={`text-sm font-sans font-light mt-3 ${themeStyles.textMuted}`}>
                    Por qué las fábricas de software comunes fracasan al intentar implementar IA y pauta comercial digital de alto impacto.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  {/* Traditional Failures */}
                  <div className={`p-8 rounded-xl border ${isDark ? 'bg-zinc-950/60 border-red-500/10' : 'bg-white border-red-100 shadow'}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded bg-red-500/10 text-red-500">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-sm text-red-500 uppercase tracking-widest">Fábricas de Software Comunes</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        'Utilización de plantillas prefabricadas pesadas de WordPress que destrozan la conversión.',
                        'Simples bots de respuesta que alucinan y carecen de vinculación con CRM internos.',
                        'Estructuras desactualizadas que pierden conversiones debido a píxeles mal conectados con Meta.',
                        'Carga lenta del sistema de cara al usuario final (pérdida directa de retención).'
                      ].map((fail, i) => (
                        <li key={i} className="flex gap-3 text-xs sm:text-sm">
                          <span className="text-red-500 font-bold">✕</span>
                          <span className={themeStyles.textMuted}>{fail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* MAX AI Standards */}
                  <div className={`p-8 rounded-xl border ${isDark ? 'bg-[#061426]/55 border-[#C17F4E]/20 shadow-[0_0_20px_rgba(193,127,78,0.05)]' : 'bg-white border-[#C17F4E]/20 shadow-md'}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded bg-[#C17F4E]/10 text-[#C17F4E]">
                        <Check className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-sm text-[#C17F4E] uppercase tracking-widest">Estándares MAX AI Digital</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        'React puro optimizado y compilado para cargas menores a 1.2s.',
                        'Modelos cognitivos predictivos entrenados bajo tus parámetros de venta reales.',
                        'Sincronizadores robustos que enlazan catálogos directamente con Meta Ads Business Manager.',
                        'Base de datos no relacional cloud de alto rendimiento para métricas inmediatas.'
                      ].map((succ, i) => (
                        <li key={i} className="flex gap-3 text-xs sm:text-sm">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span className={isDark ? 'text-zinc-200' : 'text-slate-800'}>{succ}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </motion.section>

            {/* --- METODOLOGÍA DE 4 PILARES --- */}
            <motion.section 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto"
            >
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">Fases del Éxito</span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-white uppercase mt-2">
                  Metodología de 4 Pilares
                </h2>
                <p className={`text-sm font-sans font-light mt-3 ${themeStyles.textMuted}`}>
                  Despliegue ordenado de software premium corporativo sin improvisación.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                {/* Pilar buttons (Timeline left) */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  {[
                    { number: '01', title: 'Descubrimiento Estratégico', label: 'Auditoría inicial de cuellos de botella' },
                    { number: '02', title: 'Modelamiento de Datos', label: 'Estructuración NoSQL Firestore' },
                    { number: '03', title: 'Desarrollo Propietario', label: 'React / Tailwind premium puro' },
                    { number: '04', title: 'Integraciones Meta API', label: 'Automatización y pipelines estables' }
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePilar(idx)}
                      className={`p-4 rounded-lg border text-left transition-all flex items-center gap-4 ${
                        activePilar === idx
                          ? 'border-[#C17F4E] bg-[#C17F4E]/10 shadow-md'
                          : isDark ? 'border-zinc-800 bg-zinc-900/20 hover:bg-zinc-850' : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <span className={`font-mono text-lg font-bold ${activePilar === idx ? 'text-[#C17F4E]' : 'text-zinc-500'}`}>
                        {p.number}
                      </span>
                      <div className="flex-1">
                        <h4 className={`text-xs font-bold uppercase tracking-wider ${activePilar === idx ? 'text-white' : isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
                          {p.title}
                        </h4>
                        <p className="text-[10px] text-zinc-500 font-sans mt-0.5">{p.label}</p>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-zinc-500 transition-all ${activePilar === idx ? 'rotate-90 text-[#C17F4E]' : ''}`} />
                    </button>
                  ))}
                </div>

                {/* Content Panel (Right side) */}
                <div className="lg:col-span-7">
                  <div className={`p-8 rounded-xl border h-full flex flex-col justify-between transition-all duration-300 ${themeStyles.card}`}>
                    <div className="space-y-4">
                      <span className="text-[#C17F4E] font-mono text-[10px] uppercase tracking-widest font-bold">Detalle del Proceso</span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase">
                        {activePilar === 0 && "01 • AUDITORÍA & AUDIENCIAS DIGITALES"}
                        {activePilar === 1 && "02 • MODELADO DE BASE DE DATOS"}
                        {activePilar === 2 && "03 • CODIFICACIÓN DE FIERROS Y FRONTEND"}
                        {activePilar === 3 && "04 • PIPELINES A META GRAPH API"}
                      </h3>
                      <p className={`text-sm leading-relaxed ${themeStyles.textMuted}`}>
                        {activePilar === 0 && "Descubrimos y documentamos cada fricción operativa. Estudiamos las campañas digitales de anuncios actuales, los tiempos de conversión de tu embudo de ventas y trazamos el plan técnico."}
                        {activePilar === 1 && "Esquematizamos bases de datos rápidas no relacionales en la nube para resguardar flujos transaccionales e información gerencial, blindados con rigurosas políticas de seguridad."}
                        {activePilar === 2 && "Codificamos módulos bajo las mejores prácticas, sin redundancias ni pesos muertos, logrando un posicionamiento SEO excepcional de cara a motores de búsqueda."}
                        {activePilar === 3 && "Enlazamos la información al instante con WhatsApp Business para agendamientos ágiles y con la API de conversión de Meta para maximizar el retorno de tu pauta publicitaria."}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 mt-6">
                      <div>
                        <h5 className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest font-bold">Métrica Clave</h5>
                        <p className="font-mono text-xs font-bold text-[#C17F4E]">
                          {activePilar === 0 && "Incertidumbre Cero"}
                          {activePilar === 1 && "23ms Firestore Sync"}
                          {activePilar === 2 && "98+ Lighthouse Score"}
                          {activePilar === 3 && "99.98% Uptime"}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest font-bold">Estado v5.0</h5>
                        <p className="font-mono text-xs font-bold text-emerald-500">OPTIMAL MODULE</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

          </div>
        )}

        {/* ======================================= */}
        {/*       PAGE 2: SERVICIOS & DETALLES      */}
        {/* ======================================= */}
        {activePage === 'servicios' && (
          <div className="fade-in">
            
            {/* --- HERO TECNOLÓGICO --- */}
            <section className="relative py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
              <div className="max-w-4xl">
                <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">Fierros y Arquitectura</span>
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white uppercase mt-3 leading-none">
                  NUESTRO STACK <br/> Y SOLUCIONES DE ÉLITE
                </h1>
                <p className={`text-base sm:text-lg font-sans font-light mt-4 leading-relaxed max-w-2xl ${themeStyles.textMuted}`}>
                  Infraestructura robusta desarrollada con React, TypeScript y bases de datos cloud escalables para automatizar la captación de valor.
                </p>
              </div>

              {/* Grid of Main Services cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                
                {/* Custom ML Card */}
                <div className={`p-6 rounded-xl border flex flex-col justify-between ${themeStyles.card}`}>
                  <div>
                    <div className="w-12 h-12 rounded bg-[#C17F4E]/10 flex items-center justify-center text-[#C17F4E] mb-6">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white uppercase mb-3">Modelos de IA Personalizados</h3>
                    <p className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${themeStyles.textMuted}`}>
                      Algoritmos de aprendizaje predictivos e inteligentes estructurados en la nube para proyectar inventarios y preclasificar intención de prospectos calificados.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/5 mt-6 font-mono text-[10px] text-zinc-500">
                    INTEGRACIONES DE APRENDIZAJE • CLOUD DEEP RUN
                  </div>
                </div>

                {/* High Performance React Card */}
                <div className={`p-6 rounded-xl border flex flex-col justify-between ${themeStyles.card}`}>
                  <div>
                    <div className="w-12 h-12 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white uppercase mb-3">Estructuras Web Robustas</h3>
                    <p className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${themeStyles.textMuted}`}>
                      Aplicaciones de altísimo performance en React, optimizando la experiencia móvil de cara a tus clientes para maximizar la pauta de anuncios comerciales.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/5 mt-6 font-mono text-[10px] text-zinc-500">
                    REACT 19 • GOOGLE CLOUD STORAGE • VITE ENGINE
                  </div>
                </div>

                {/* Meta Graph Integrations Card */}
                <div className={`p-6 rounded-xl border flex flex-col justify-between ${themeStyles.card}`}>
                  <div>
                    <div className="w-12 h-12 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                      <Database className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white uppercase mb-3">Conectores de Conversión</h3>
                    <p className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${themeStyles.textMuted}`}>
                      Canales estables conectados a Meta Business Suite y WhatsApp API para alimentar datos en tiempo real de visitas y carritos, multiplicando ventas efectivas.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/5 mt-6 font-mono text-[10px] text-zinc-500">
                    META GRAPH API • WHATSAPP CRM HOOKS
                  </div>
                </div>

              </div>
            </section>

            {/* --- SOLUCIÓN CONFIGURATOR INTERACTIVO --- */}
            <section className={`py-20 px-6 sm:px-10 lg:px-16 border-t ${isDark ? 'bg-zinc-950/40 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">Configurador Inteligente</span>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl text-white uppercase mt-2">
                    Crea tu Ecosistema Técnico
                  </h2>
                  <p className={`text-sm font-sans font-light mt-3 ${themeStyles.textMuted}`}>
                    Selecciona los módulos tecnológicos que demanda tu negocio y obtén una estimación de recursos y tiempos del Ingeniero Principal.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Modules Checklist (Left 7 Columns) */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    {MODULES.map((m) => {
                      const isSelected = selectedModules.includes(m.id);
                      return (
                        <div
                          key={m.id}
                          onClick={() => toggleModule(m.id)}
                          className={`p-5 rounded-lg border cursor-pointer transition-all flex items-start gap-4 ${
                            isSelected
                              ? 'border-[#C17F4E] bg-[#C17F4E]/5 shadow-md'
                              : isDark ? 'border-zinc-800 bg-zinc-900/20 hover:border-zinc-750' : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                          }`}
                        >
                          <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all ${
                            isSelected ? 'bg-[#C17F4E] border-[#C17F4E] text-white' : 'border-zinc-500 bg-transparent'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-baseline flex-wrap gap-2">
                              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">{m.name}</h4>
                              <span className="font-mono text-xs text-[#C17F4E] font-semibold">${m.price} USD</span>
                            </div>
                            <p className="text-xs text-zinc-500 font-sans mt-1 leading-relaxed">{m.description}</p>
                            <div className="flex gap-4 mt-2.5">
                              <span className="font-mono text-[10px] text-zinc-500 uppercase">TIEMPO ESTIMADO: {m.durationWeeks} SEMANAS</span>
                              <span className="font-mono text-[10px] text-zinc-500 uppercase">•</span>
                              <span className="font-mono text-[10px] text-zinc-500 uppercase">{m.category}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Calculations and CTA Card (Right 5 Columns) */}
                  <div className="lg:col-span-5">
                    <div className={`p-6 rounded-xl border ${themeStyles.card}`}>
                      <h3 className="font-display font-bold text-sm text-white uppercase tracking-widest border-b border-white/5 pb-4 mb-6">
                        RESUMEN DE INFRAESTRUCTURA
                      </h3>

                      <div className="space-y-4">
                        <div className="flex justify-between font-sans">
                          <span className="text-xs text-zinc-500 font-semibold uppercase">Módulos Solicitados</span>
                          <span className="text-xs font-mono text-white font-bold">{selectedModules.length}</span>
                        </div>
                        
                        <div className="flex justify-between font-sans">
                          <span className="text-xs text-zinc-500 font-semibold uppercase">Tiempo de Producción</span>
                          <span className="text-xs font-mono text-white font-bold">~ {configuratorDuration} semanas</span>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex justify-between items-baseline mt-4">
                          <span className="text-xs font-mono font-bold uppercase text-zinc-400">Presupuesto Estimado</span>
                          <span className="text-3xl font-mono text-[#C17F4E] font-black">${configuratorTotal} <span className="text-xs text-zinc-500 font-sans">USD</span></span>
                        </div>

                        <div className="pt-6">
                          <button
                            onClick={handleProceedToOnboarding}
                            disabled={selectedModules.length === 0}
                            className={`w-full py-3.5 text-center font-mono text-xs font-bold uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2 ${
                              selectedModules.length > 0
                                ? 'bg-gradient-to-r from-[#C17F4E] to-[#D79663] text-white hover:opacity-90 shadow-lg'
                                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            }`}
                          >
                            <span>PROCEDER AL ONBOARDING</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

          </div>
        )}

        {/* ======================================= */}
        {/*         PAGE 3: PORTAFOLIO & FORM       */}
        {/* ======================================= */}
        {activePage === 'portafolio' && (
          <div className="fade-in">
            
            {/* Tabs de Navegación del Portal Cliente / Portafolio */}
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 flex border-b border-white/5 gap-6 text-[11px] font-semibold tracking-widest text-zinc-500 uppercase overflow-x-auto">
              <button 
                onClick={() => setPortfolioTab('casos')}
                className={`pb-4 transition-all uppercase flex items-center gap-2 shrink-0 ${
                  portfolioTab === 'casos' 
                    ? 'text-white border-b-2 border-[#C17F4E]' 
                    : 'hover:text-white'
                }`}
              >
                <FolderKanban className="w-4 h-4" />
                Casos de Éxito & Onboarding
              </button>
              <button 
                onClick={() => setPortfolioTab('forms')}
                className={`pb-4 transition-all uppercase flex items-center gap-2 shrink-0 ${
                  portfolioTab === 'forms' 
                    ? 'text-white border-b-2 border-[#C17F4E]' 
                    : 'hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                Google Forms Sync
              </button>
              <button 
                onClick={() => setPortfolioTab('leads')}
                className={`pb-4 transition-all uppercase flex items-center gap-2 shrink-0 ${
                  portfolioTab === 'leads' 
                    ? 'text-white border-b-2 border-[#C17F4E]' 
                    : 'hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Leads Recibidos (CRM)
              </button>
            </div>

            {/* TAB 1: CASOS DE ÉXITO & FORM DE ONBOARDING */}
            {portfolioTab === 'casos' && (
              <div className="fade-in">
                {/* --- GALLERY CASOS DE ÉXITO --- */}
                <section className="relative py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">Showcase Real</span>
                    <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white uppercase mt-2">
                      CASOS DE ÉXITO MAX AI
                    </h1>
                    <p className={`text-sm font-sans font-light mt-3 ${themeStyles.textMuted}`}>
                      Plataformas reales y estables producidas bajo ingeniería de alto desempeño para marcas sofisticadas.
                    </p>
                  </div>

                  {/* Grid of Case Studies */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                    {CASE_STUDIES.map((c, i) => (
                      <div key={i} className={`rounded-xl border flex flex-col justify-between overflow-hidden ${themeStyles.card}`}>
                        <div>
                          {/* Responsive Image */}
                          <div className="relative h-48 overflow-hidden bg-zinc-950">
                            <img 
                              src={c.image} 
                              alt={c.client} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="absolute top-4 left-4 bg-[#C17F4E] text-white font-mono text-[9px] font-bold uppercase px-2 py-1 rounded tracking-widest">
                              {c.category}
                            </div>
                          </div>

                          <div className="p-6">
                            <h3 className="font-display font-black text-lg text-white uppercase leading-none">{c.client}</h3>
                            <p className="text-xs text-[#C17F4E] font-mono font-semibold mt-1 mb-3">{c.tagline}</p>
                            <p className={`text-xs sm:text-sm font-sans font-light leading-relaxed mb-4 ${themeStyles.textMuted}`}>{c.description}</p>
                            
                            <div className="space-y-1 bg-black/40 p-3 rounded border border-white/5 mb-4">
                              <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest font-bold">Métricas Auditadas</p>
                              {c.kpis.map((k, kIdx) => (
                                <div key={kIdx} className="flex gap-2 items-center text-[11px] font-mono text-zinc-300">
                                  <span className="text-[#C17F4E] font-black">✓</span> {k}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="p-6 pt-0 border-t border-white/5 mt-auto flex items-center justify-between">
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
                              title="Visitar Staging"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* --- ONBOARDING FORM MULTI-STEP --- */}
                <section className="py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-white/5" id="onboarding-form">
                  <div className="max-w-3xl mx-auto">
                    
                    <div className="text-center mb-12">
                      <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">Onboarding Exclusivo</span>
                      <h2 className="font-display font-bold text-3xl text-white uppercase mt-2">
                        Iniciar Protocolo de Diagnóstico
                      </h2>
                      <p className={`text-sm font-sans font-light mt-3 ${themeStyles.textMuted}`}>
                        Toma 2 minutos configurar tu perfil para agendar una llamada directa de validación arquitectónica.
                      </p>
                    </div>

                    {/* Form Progress Indicator Header */}
                    <div className="flex items-center justify-between mb-8 px-4 font-mono text-[10px] tracking-wider text-zinc-500 border-b border-white/5 pb-4">
                      {[
                        { step: 1, label: 'Negocio' },
                        { step: 2, label: 'Fricciones' },
                        { step: 3, label: 'Infraestructura' },
                        { step: 4, label: 'Contacto' }
                      ].map((s) => (
                        <div key={s.step} className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                            onboardingStep >= s.step ? 'bg-[#C17F4E] text-white' : 'bg-zinc-800 text-zinc-500'
                          }`}>
                            {s.step}
                          </span>
                          <span className={onboardingStep === s.step ? 'text-white font-bold' : ''}>{s.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Form Frame */}
                    <div className={`p-8 rounded-xl border relative overflow-hidden shadow-2xl ${themeStyles.card}`}>
                      
                      {/* Validation Error Warnings */}
                      {validationError && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6 text-xs sm:text-sm font-sans flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          <span>{validationError}</span>
                        </div>
                      )}

                      {!formSubmitted ? (
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                          
                          {/* STEP 1: PERFIL NEGOCIO */}
                          {onboardingStep === 1 && (
                            <div className="space-y-4 fade-in">
                              <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">Paso 1: Perfil de tu Marca o Negocio</h3>
                              
                              <div>
                                <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold">
                                  Nombre de la Empresa o Marca *
                                </label>
                                <input
                                  type="text"
                                  value={companyName}
                                  onChange={(e) => setCompanyName(e.target.value)}
                                  placeholder="Ej. Amy Tevet TM"
                                  className={`w-full p-3 rounded ${themeStyles.input}`}
                                />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold">
                                    Sector / Industria
                                  </label>
                                  <select
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    className={`w-full p-3 rounded text-sm ${themeStyles.input}`}
                                  >
                                    {['Tecnología', 'Salud y Clínicas', 'Retail / E-commerce', 'Inmobiliaria', 'Educación', 'Servicios Profesionales'].map((ind) => (
                                      <option key={ind} value={ind} className="bg-[#020813] text-white">{ind}</option>
                                    ))}
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold">
                                    Tamaño del Negocio
                                  </label>
                                  <select
                                    value={companySize}
                                    onChange={(e) => setCompanySize(e.target.value)}
                                    className={`w-full p-3 rounded text-sm ${themeStyles.input}`}
                                  >
                                    {['1-10 empleados', '11-50 empleados', '51+ empleados'].map((size) => (
                                      <option key={size} value={size} className="bg-[#020813] text-white">{size}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* STEP 2: CUELLO DE BOTELLA */}
                          {onboardingStep === 2 && (
                            <div className="space-y-4 fade-in">
                              <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">Paso 2: Diagnóstico de Fricciones</h3>

                              <div>
                                <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold">
                                  Cuéntanos tu cuello de botella prioritario *
                                </label>
                                <textarea
                                  rows={3}
                                  value={bottleneck}
                                  onChange={(e) => setBottleneck(e.target.value)}
                                  placeholder="Ej. Mi catálogo no sincroniza automáticamente con Meta Ads y perdemos compras manuales..."
                                  className={`w-full p-3 rounded text-sm ${themeStyles.input}`}
                                />
                              </div>

                              <div>
                                <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold">
                                  Grado de madurez digital actual
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                  {['Bajo', 'Medio', 'Avanzado'].map((lvl) => (
                                    <button
                                      key={lvl}
                                      type="button"
                                      onClick={() => setDigitalMaturity(lvl)}
                                      className={`py-2 rounded font-mono text-xs uppercase transition-all border ${
                                        digitalMaturity === lvl
                                          ? 'border-[#C17F4E] bg-[#C17F4E]/10 text-white font-bold'
                                          : 'border-white/5 bg-zinc-900/20 text-zinc-400'
                                      }`}
                                    >
                                      {lvl}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* STEP 3: INFRAESTRUCTURA */}
                          {onboardingStep === 3 && (
                            <div className="space-y-4 fade-in">
                              <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">Paso 3: Módulos de Infraestructura</h3>
                              <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                                Selecciona los pilares que deseas conectar (los valores sumados se calculan en base a tu cotizador).
                              </p>

                              <div className="space-y-2">
                                {MODULES.map((m) => {
                                  const checked = selectedModules.includes(m.id);
                                  return (
                                    <div
                                      key={m.id}
                                      onClick={() => toggleModule(m.id)}
                                      className={`p-3 rounded border cursor-pointer flex items-center justify-between text-xs transition-all ${
                                        checked 
                                          ? 'border-[#C17F4E] bg-[#C17F4E]/10 text-white' 
                                          : 'border-white/5 bg-zinc-900/10 text-zinc-400'
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <span className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? 'bg-[#C17F4E] border-[#C17F4E]' : 'border-zinc-500'}`}>
                                          {checked && <Check className="w-2.5 h-2.5 text-white" />}
                                        </span>
                                        <span>{m.name}</span>
                                      </div>
                                      <span className="font-mono text-[#C17F4E] font-semibold">${m.price}</span>
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="pt-2 flex justify-between font-mono text-xs text-[#C17F4E] font-bold">
                                <span>PRESUPUESTO ESTIMADO DE ESTUDIO:</span>
                                <span>${configuratorTotal} USD</span>
                              </div>
                            </div>
                          )}

                          {/* STEP 4: CONTACT DATA */}
                          {onboardingStep === 4 && (
                            <div className="space-y-4 fade-in">
                              <h3 className="font-display font-bold text-base text-white uppercase tracking-wider mb-2">Paso 4: Información de Contacto Directo</h3>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold">
                                    Nombre del Contacto *
                                  </label>
                                  <input
                                    type="text"
                                    value={contactName}
                                    onChange={(e) => setContactName(e.target.value)}
                                    placeholder="Ej. Psic. Damaris Pazmiño"
                                    className={`w-full p-3 rounded ${themeStyles.input}`}
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold">
                                    Correo Electrónico *
                                  </label>
                                  <input
                                    type="email"
                                    value={contactEmail}
                                    onChange={(e) => setContactEmail(e.target.value)}
                                    placeholder="contacto@empresa.com"
                                    className={`w-full p-3 rounded ${themeStyles.input}`}
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold">
                                  WhatsApp directo (Ej. +593983186044) *
                                </label>
                                <input
                                  type="text"
                                  value={contactPhone}
                                  onChange={(e) => setContactPhone(e.target.value)}
                                  placeholder="+593"
                                  className={`w-full p-3 rounded ${themeStyles.input}`}
                                />
                              </div>

                              <div>
                                <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold">
                                  Comentarios sobre Google Maps / APIs
                                </label>
                                <textarea
                                  rows={2}
                                  value={customMessage}
                                  onChange={(e) => setCustomMessage(e.target.value)}
                                  placeholder="Alguna preferencia para la pasarela de pagos, geolocalización o APIs..."
                                  className={`w-full p-3 rounded text-sm ${themeStyles.input}`}
                                />
                              </div>
                            </div>
                          )}

                          {/* Navigation Stepper buttons footer */}
                          <div className="flex justify-between items-center pt-6 border-t border-white/5">
                            {onboardingStep > 1 ? (
                              <button
                                type="button"
                                onClick={handlePrevStep}
                                className="px-5 py-2.5 rounded border border-white/5 text-zinc-400 hover:bg-white/5 font-mono text-xs uppercase"
                              >
                                <span>Atrás</span>
                              </button>
                            ) : (
                              <div></div>
                            )}

                            {onboardingStep < 4 ? (
                              <button
                                type="button"
                                onClick={handleNextStep}
                                className="bg-[#C17F4E] hover:bg-[#D79663] text-white px-6 py-2.5 rounded font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-1.5"
                              >
                                <span>Siguiente</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="bg-gradient-to-r from-[#C17F4E] to-[#D79663] text-white px-8 py-3 rounded font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#C17F4E]/25"
                              >
                                <span>CONECTAR POR WHATSAPP</span>
                                <Send className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                        </form>
                      ) : (
                        // Success View
                        <div className="text-center py-10 space-y-6">
                          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-10 h-10" />
                          </div>
                          <h3 className="font-display font-black text-xl uppercase text-white">¡Protocolo Compilado!</h3>
                          <p className={`text-xs sm:text-sm max-w-md mx-auto leading-relaxed ${themeStyles.textMuted}`}>
                            Tu solicitud se ha estructurado con éxito. Se ha inicializado una redirección segura hacia el WhatsApp del Ingeniero Principal para validar la infraestructura técnica de tu marca.
                          </p>
                          <div className="flex gap-4 justify-center">
                            <button
                              onClick={resetForm}
                              className="px-5 py-2.5 border border-[#C17F4E] text-[#C17F4E] rounded text-xs font-mono uppercase font-bold"
                            >
                              Reiniciar Formulario
                            </button>
                            <a
                              href="https://wa.me/593983186044"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-5 py-2.5 bg-[#C17F4E] text-white rounded text-xs font-mono uppercase font-bold hover:bg-[#D79663]"
                            >
                              Ir a WhatsApp
                            </a>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* TAB 2: GOOGLE FORMS SYNCHRONIZER */}
            {portfolioTab === 'forms' && (
              <section className="py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto fade-in">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">Google Forms Integration</span>
                  <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase mt-2">
                    Sincronizador Google Forms
                  </h1>
                  <p className={`text-sm font-sans font-light mt-3 ${themeStyles.textMuted}`}>
                    Sincroniza tus formularios de Google Workspace con nuestro motor NoSQL. Genera análisis en tiempo real y gestiona prospectos corporativos.
                  </p>
                </div>

                {!currentUser ? (
                  /* Vista No Autenticado */
                  <div className={`p-12 rounded-xl border text-center max-w-2xl mx-auto ${themeStyles.card}`}>
                    <div className="w-16 h-16 rounded-full bg-[#C17F4E]/10 text-[#C17F4E] flex items-center justify-center mx-auto mb-6">
                      <FileText className="w-8 h-8" />
                    </div>
                    <h3 className="font-display font-black text-xl text-white uppercase mb-3">Conectar Google Workspace</h3>
                    <p className={`text-xs sm:text-sm leading-relaxed mb-8 ${themeStyles.textMuted}`}>
                      Autentícate de forma segura con tu cuenta de Google para otorgarle a MAX AI acceso a tus formularios y sincronizar respuestas en tiempo real.
                    </p>
                    <button
                      onClick={handleGoogleSignIn}
                      className="inline-flex items-center gap-3 bg-white text-zinc-950 px-8 py-3.5 rounded font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-lg cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      <span>Iniciar Sesión con Google</span>
                    </button>
                    {formsError && (
                      <p className="text-red-400 font-mono text-xs mt-4">{formsError}</p>
                    )}
                  </div>
                ) : (
                  /* Vista Autenticado */
                  <div className="space-y-10">
                    
                    {/* Header de Usuario */}
                    <div className={`p-6 rounded-xl border flex flex-col sm:flex-row justify-between items-center gap-4 ${themeStyles.card}`}>
                      <div className="flex items-center gap-4">
                        {currentUser.photoURL ? (
                          <img src={currentUser.photoURL} alt={currentUser.displayName || ''} className="w-12 h-12 rounded-full border border-[#C17F4E]/30" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-[#C17F4E]/10 text-[#C17F4E] flex items-center justify-center font-bold">
                            {currentUser.displayName?.charAt(0) || 'U'}
                          </div>
                        )}
                        <div className="text-left">
                          <h3 className="font-display font-bold text-sm text-white uppercase">{currentUser.displayName || 'Usuario Google'}</h3>
                          <p className="text-xs text-zinc-500 font-mono">{currentUser.email}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <span className="font-mono text-[9px] text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded tracking-wider">WORKSPACE CONNECTED</span>
                        <button
                          onClick={handleSignOut}
                          className="p-2 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Cerrar Sesión"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                      {/* Columna Izquierda */}
                      <div className="lg:col-span-5 space-y-6 flex flex-col justify-start">
                        
                        {/* Enlazar Form */}
                        <div className={`p-6 rounded-xl border ${themeStyles.card}`}>
                          <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Plus className="w-4 h-4 text-[#C17F4E]" />
                            Conectar Formulario de Google
                          </h4>
                          <form onSubmit={handleConnectForm} className="space-y-4">
                            <div>
                              <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-2">
                                ID del Formulario en Google Forms
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={formInputId}
                                  onChange={(e) => setFormInputId(e.target.value)}
                                  placeholder="Ej. 1FAIpQLSfD..."
                                  className={`flex-1 p-2.5 rounded text-xs ${themeStyles.input}`}
                                />
                                <button
                                  type="submit"
                                  disabled={isLoadingForms}
                                  className="bg-[#C17F4E] hover:bg-[#D79663] text-white px-4 rounded text-xs font-mono font-bold uppercase disabled:opacity-50 cursor-pointer"
                                >
                                  {isLoadingForms ? '...' : 'Enlazar'}
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>

                        {/* Crear Form Express */}
                        <div className={`p-6 rounded-xl border border-dashed border-[#C17F4E]/30 bg-[#C17F4E]/5 text-center`}>
                          <Zap className="w-6 h-6 text-[#C17F4E] mx-auto mb-3" />
                          <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-2">
                            Creación Express de Diagnóstico
                          </h4>
                          <p className="text-[11px] text-zinc-400 leading-relaxed mb-4 font-sans">
                            MAX AI creará un formulario en tu Google Drive estructurado con preguntas de cualificación para prospectos corporativos y lo enlazará automáticamente.
                          </p>
                          <button
                            onClick={handleCreateAutoForm}
                            disabled={isCreatingForm}
                            className="w-full bg-gradient-to-r from-[#C17F4E] to-[#D79663] text-white py-2.5 rounded text-xs font-mono font-bold uppercase tracking-widest disabled:opacity-50 cursor-pointer"
                          >
                            {isCreatingForm ? 'Creando en Google...' : 'Generar Formulario 1-Click'}
                          </button>
                        </div>

                        {/* Lista de Forms Conectados */}
                        <div className={`p-6 rounded-xl border flex-1 ${themeStyles.card}`}>
                          <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-4">
                            Formularios Enlazados ({connectedForms.length})
                          </h4>
                          {connectedForms.length === 0 ? (
                            <p className="text-[11px] text-zinc-500 font-sans italic">No has conectado ningún formulario todavía.</p>
                          ) : (
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                              {connectedForms.map((f) => (
                                <button
                                  key={f.id}
                                  onClick={() => setSelectedFormId(f.formId)}
                                  className={`w-full p-3 rounded text-left flex items-center justify-between border text-xs transition-all ${
                                    selectedFormId === f.formId
                                      ? 'border-[#C17F4E] bg-[#C17F4E]/10 text-white font-bold'
                                      : 'border-white/5 bg-zinc-900/15 text-zinc-400 hover:bg-zinc-900/30'
                                  }`}
                                >
                                  <div className="truncate flex-1 pr-2">
                                    <p className="truncate font-sans font-medium">{f.formTitle}</p>
                                    <p className="text-[9px] font-mono text-zinc-500 truncate">{f.formId}</p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                      </div>

                      {/* Columna Derecha */}
                      <div className="lg:col-span-7 flex flex-col justify-start">
                        {formsError && (
                          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6 text-xs flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            <span>{formsError}</span>
                          </div>
                        )}

                        {!selectedFormId ? (
                          <div className={`p-12 rounded-xl border text-center h-full flex flex-col justify-center items-center ${themeStyles.card}`}>
                            <HelpCircle className="w-12 h-12 text-zinc-600 mb-4" />
                            <h5 className="font-display font-bold text-sm text-zinc-400 uppercase mb-2">Ningún Formulario Seleccionado</h5>
                            <p className="text-xs text-zinc-500 font-sans max-w-sm">Conecta un formulario existente ingresando su identificador o presiona el botón de generación express de 1-click.</p>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            
                            {/* Panel Principal de Control */}
                            <div className={`p-6 rounded-xl border ${themeStyles.card}`}>
                              <div className="flex justify-between items-start gap-4 mb-4">
                                <div className="text-left">
                                  <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider block">Formulario Activo</span>
                                  <h3 className="font-display font-black text-lg text-white uppercase mt-1 leading-tight">
                                    {activeFormDetails?.info?.title || 'Cargando formulario de Google...'}
                                  </h3>
                                  <p className="text-[10px] text-zinc-500 font-mono truncate max-w-md mt-1">ID: {selectedFormId}</p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                  <button
                                    onClick={fetchActiveFormFromGoogle}
                                    disabled={isLoadingForms}
                                    className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded border border-white/5 text-zinc-400 hover:text-[#C17F4E] transition-all cursor-pointer"
                                    title="Sincronizar Datos"
                                  >
                                    <RefreshCw className={`w-4 h-4 ${isLoadingForms ? 'animate-spin' : ''}`} />
                                  </button>
                                  <a
                                    href={`https://docs.google.com/forms/d/${selectedFormId}/viewform`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded border border-white/5 text-zinc-400 hover:text-[#C17F4E] transition-all flex items-center justify-center"
                                    title="Ver Formulario"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                                <div className="bg-black/20 p-3 rounded border border-white/5 text-center">
                                  <span className="text-[9px] text-zinc-500 font-mono block uppercase">Respuestas</span>
                                  <span className="font-mono text-lg font-bold text-white">{activeFormResponses.length}</span>
                                </div>
                                <div className="bg-black/20 p-3 rounded border border-white/5 text-center">
                                  <span className="text-[9px] text-zinc-500 font-mono block uppercase">Estado Sync</span>
                                  <span className="font-mono text-[10px] font-bold text-emerald-500 flex items-center justify-center gap-1 mt-1">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                    ONLINE
                                  </span>
                                </div>
                                <div className="bg-black/20 p-3 rounded border border-white/5 text-center">
                                  <span className="text-[9px] text-zinc-500 font-mono block uppercase">Preguntas</span>
                                  <span className="font-mono text-lg font-bold text-[#C17F4E]">
                                    {activeFormDetails?.items?.length || 0}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* visualizador de Respuestas en Tiempo Real */}
                            <div className={`p-6 rounded-xl border ${themeStyles.card}`}>
                              <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-4 flex justify-between items-center">
                                <span>Respuestas Recientes ({activeFormResponses.length})</span>
                                <span className="text-[9px] text-zinc-500 font-mono font-normal">Sincronización Live</span>
                              </h4>
                              
                              {activeFormResponses.length === 0 ? (
                                <div className="text-center py-8">
                                  <p className="text-xs text-zinc-500 font-sans italic">Tu formulario no tiene ninguna respuesta todavía.</p>
                                  <p className="text-[10px] text-zinc-600 font-sans mt-1">Comparte el enlace del formulario para recibir solicitudes de leads.</p>
                                </div>
                              ) : (
                                <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                                  {activeFormResponses.map((resp: any, rIdx) => {
                                    const timestamp = resp.lastSubmittedTime ? new Date(resp.lastSubmittedTime).toLocaleDateString() : 'N/A';
                                    return (
                                      <div key={rIdx} className="bg-black/40 p-4 rounded border border-white/5 space-y-2 text-left text-xs">
                                        <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-1">
                                          <span className="text-[#C17F4E] font-bold">RESPUESTA #{activeFormResponses.length - rIdx}</span>
                                          <span className="text-zinc-500">{timestamp}</span>
                                        </div>
                                        <div className="space-y-1">
                                          {Object.keys(resp.answers || {}).slice(0, 3).map((ansKey) => {
                                            const ansObj = resp.answers[ansKey];
                                            const questionItem = activeFormDetails?.items?.find((it: any) => it.questionItem?.question?.questionId === ansKey);
                                            const questionTitle = questionItem?.title || 'Pregunta';
                                            const answersList = ansObj.textAnswers?.answers?.map((a: any) => a.value).join(', ');
                                            return (
                                              <p key={ansKey} className="text-[11px] font-sans leading-relaxed">
                                                <span className="text-zinc-500 font-medium block">{questionTitle}:</span>
                                                <span className="text-zinc-300 block pl-2 border-l border-[#C17F4E]/30">{answersList || 'N/A'}</span>
                                              </p>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                )}
              </section>
            )}

            {/* TAB 3: LEADS RECIBIDOS (CRM GENERAL DE FIRESTORE) */}
            {portfolioTab === 'leads' && (
              <section className="py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto fade-in">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">CRM Corporativo</span>
                  <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase mt-2">
                    Leads Recibidos
                  </h1>
                  <p className={`text-sm font-sans font-light mt-3 ${themeStyles.textMuted}`}>
                    Bandeja de entrada en tiempo real con las cotizaciones de tu onboarding configuradas en Firestore.
                  </p>
                </div>

                {!currentUser ? (
                  <div className={`p-12 rounded-xl border text-center max-w-2xl mx-auto ${themeStyles.card}`}>
                    <div className="w-16 h-16 rounded-full bg-[#C17F4E]/10 text-[#C17F4E] flex items-center justify-center mx-auto mb-6">
                      <Users className="w-8 h-8" />
                    </div>
                    <h3 className="font-display font-black text-xl text-white uppercase mb-3">Acceso al CRM</h3>
                    <p className={`text-xs sm:text-sm leading-relaxed mb-8 ${themeStyles.textMuted}`}>
                      Inicia sesión de forma segura para revisar las propuestas de diagnóstico y presupuestos estimados.
                    </p>
                    <button
                      onClick={handleGoogleSignIn}
                      className="inline-flex items-center gap-3 bg-white text-zinc-950 px-8 py-3.5 rounded font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-lg cursor-pointer"
                    >
                      Iniciar Sesión con Google
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {receivedLeads.length === 0 ? (
                      <div className={`p-12 rounded-xl border text-center ${themeStyles.card}`}>
                        <Users className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                        <h4 className="font-display font-bold text-sm text-zinc-400 uppercase mb-2">No se encontraron leads</h4>
                        <p className="text-xs text-zinc-500 font-sans">Los leads que configures y envíes en el protocolo de Onboarding aparecerán aquí instantáneamente.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {receivedLeads.map((lead) => {
                          const dateStr = lead.createdAt && typeof lead.createdAt.toDate === 'function' 
                            ? lead.createdAt.toDate().toLocaleString() 
                            : 'Registrado';
                          return (
                            <div key={lead.id} className={`p-6 rounded-xl border flex flex-col justify-between text-left ${themeStyles.card}`}>
                              <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                  <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">{lead.industry}</span>
                                  <span className="font-mono text-[9px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded uppercase font-bold">{lead.status}</span>
                                </div>

                                <div>
                                  <h4 className="font-display font-black text-base text-white uppercase tracking-tight leading-tight">{lead.companyName}</h4>
                                  <p className="text-[9px] text-zinc-500 font-mono mt-1">Fecha: {dateStr}</p>
                                </div>

                                <div className="space-y-1.5 bg-black/30 p-3 rounded border border-white/5 text-[11px] font-sans">
                                  <p className="text-zinc-400 font-light"><strong className="text-zinc-300 font-medium">Cuello de Botella:</strong> {lead.bottleneck}</p>
                                  <p className="text-zinc-400 font-light"><strong className="text-zinc-300 font-medium">Presupuesto:</strong> ${lead.configuratorTotal} USD</p>
                                  <p className="text-zinc-400 font-light"><strong className="text-zinc-300 font-medium">Plazo:</strong> {lead.configuratorDuration} semanas</p>
                                </div>

                                <div className="space-y-1 border-t border-white/5 pt-3 text-xs">
                                  <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Contacto Directo</p>
                                  <p className="text-white font-medium">{lead.contactName}</p>
                                  <p className="text-zinc-400 truncate">{lead.contactEmail}</p>
                                  <p className="text-[#C17F4E] font-mono">{lead.contactPhone}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/5 mt-4">
                                <a
                                  href={`mailto:${lead.contactEmail}`}
                                  className="py-2 bg-zinc-900 border border-white/5 rounded text-center text-zinc-300 hover:text-white transition-colors font-mono text-[10px] font-bold uppercase flex items-center justify-center"
                                >
                                  Email
                                </a>
                                <a
                                  href={`https://wa.me/${lead.contactPhone.replace(/\+/g, '').replace(/\s/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="py-2 bg-[#C17F4E]/10 border border-[#C17F4E]/20 rounded text-center text-[#C17F4E] hover:bg-[#C17F4E]/20 transition-all font-mono text-[10px] font-bold uppercase flex items-center justify-center"
                                >
                                  WhatsApp
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}

          </div>
        )}

      </main>

      {/* --- PREMIUM FOOTER --- */}
      <footer className={`border-t py-12 transition-colors duration-500 ${isDark ? 'bg-zinc-950/80 border-white/5 text-zinc-400' : 'bg-white border-slate-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row justify-between items-center gap-6 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          <div className="flex gap-6 flex-wrap justify-center">
            <span>© 2026 MAX AI STUDIO</span>
            <span className="text-zinc-700">|</span>
            <span>ESTRATEGIA • CÓDIGO • DISEÑO</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <span className="text-zinc-400">SERVER STATUS: OPTIMAL</span>
            </div>
            <span className="text-zinc-700">|</span>
            <a href="https://www.instagram.com/amytevet.tm" target="_blank" rel="noopener noreferrer" className="hover:text-[#C17F4E] transition-colors">INSTAGRAM</a>
            <a href="https://wa.me/593983186044" target="_blank" rel="noopener noreferrer" className="hover:text-[#C17F4E] transition-colors">WHATSAPP</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
