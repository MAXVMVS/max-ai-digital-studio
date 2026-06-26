import React, { useState, useEffect, useMemo } from 'react';
import { 
  Brain, Cpu, Layers, Zap, Sparkles, Code2, Database, Network, 
  ArrowRight, Check, CheckCircle2, ArrowLeft, Sun, Moon, Menu, X, 
  ExternalLink, TrendingUp, Users, ChevronRight, Send, AlertTriangle, HelpCircle,
  FolderKanban, LayoutDashboard, LogOut, LogIn, Plus, RefreshCw, FileText, CheckCircle,
  Mail, MapPin, Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  db, auth, handleFirestoreError, OperationType 
} from './lib/firebase';
import { 
  signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User 
} from 'firebase/auth';
import { 
  doc, setDoc, getDoc, getDocs, collection, query, where, onSnapshot, serverTimestamp, limit, orderBy, addDoc
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

// --- 3D & Premium UI Components (Interactive Skills integration) ---
function Interactive3DNetwork() {
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

interface CaseStudyCardProps {
  key?: React.Key;
  c: CaseStudy;
  isDark: boolean;
  themeStyles: any;
  lang: 'es' | 'en';
}

function CaseStudyCard({ c, isDark, themeStyles, lang }: CaseStudyCardProps) {
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

  const translatedCategory = lang === 'es' 
    ? c.category 
    : (c.client === 'Psic. Damaris Pazmiño' ? 'Health & Automation' : c.client === 'Amy Tevet' ? 'Luxury & E-commerce' : 'Automotive & SaaS');

  const translatedTagline = lang === 'es' 
    ? c.tagline 
    : (c.client === 'Psic. Damaris Pazmiño' ? 'Mental Health & Automated Clinic' : c.client === 'Amy Tevet' ? 'Premium Tailoring & B2C High Fashion' : 'Automotive Dealership & Automated Leads');

  const translatedDescription = lang === 'es' 
    ? c.description 
    : (c.client === 'Psic. Damaris Pazmiño' ? 'Complete digital ecosystem to automate patient scheduling and workflow, integrated with Google Cloud Firestore and advanced Google Maps geolocation.' : c.client === 'Amy Tevet' ? 'Silent luxury interactive digital lookbook, with automatic catalog synchronization via Meta\'s Graph API to power direct conversion and ad campaigns.' : 'Intelligent vehicle inventory with automated lead qualification via integrated WhatsApp CRM, improving instant response time.');

  const translatedKpis = lang === 'es' 
    ? c.kpis 
    : (c.client === 'Psic. Damaris Pazmiño' ? ['+140% booked appointments', 'Cancellations reduced to zero', 'Initial load < 1.2s'] : c.client === 'Amy Tevet' ? ['Active daily sync', '+220k Instagram reach', 'High contrast design'] : ['99.98% certified uptime', 'Lead conversion x3.5', 'Inference latency 85ms']);

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

export default function App() {
  const [activePage, setActivePage] = useState<'inicio' | 'servicios' | 'portafolio' | 'contacto' | 'login'>(() => {
    const saved = localStorage.getItem('maxai_active_page');
    return (saved as 'inicio' | 'servicios' | 'portafolio' | 'contacto' | 'login') || 'inicio';
  });

  useEffect(() => {
    localStorage.setItem('maxai_active_page', activePage);
  }, [activePage]);


  // --- Contact page state ---
  const [contactFormName, setContactFormName] = useState<string>('');
  const [contactFormEmail, setContactFormEmail] = useState<string>('');
  const [contactFormPhone, setContactFormPhone] = useState<string>('');
  const [contactFormSubject, setContactFormSubject] = useState<string>('');
  const [contactFormMessage, setContactFormMessage] = useState<string>('');
  const [contactFormSubmitted, setContactFormSubmitted] = useState<boolean>(false);
  const [contactFormValidationError, setContactFormValidationError] = useState<string>('');
  const [contactFormLoading, setContactFormLoading] = useState<boolean>(false);

  const isContactFormNameValid = contactFormName.trim().length >= 3;
  const isContactFormEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactFormEmail);
  const isContactFormPhoneValid = contactFormPhone.trim().length >= 8;
  const [isDark, setIsDark] = useState<boolean>(true);
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // --- Firebase & Google Forms Integration State ---
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);
  const [portfolioTab, setPortfolioTab] = useState<'casos' | 'forms' | 'leads' | 'projects'>('casos');

  // Si activePage es 'login' y el tab seleccionado es 'casos' (para portafolio), cambiar a 'leads' para el dashboard de admin
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (activePage === 'login' && portfolioTab === 'casos') {
      setPortfolioTab('leads');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);
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
  const [clientProjects, setClientProjects] = useState<any[]>([]);
  const [isCreatingProject, setIsCreatingProject] = useState<boolean>(false);

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

  // Escuchar proyectos del cliente en tiempo real desde Firestore
  useEffect(() => {
    if (!currentUser) {
      setClientProjects([]);
      return;
    }
    const projectsCol = collection(db, 'projects');
    const q = isAdminUser 
      ? query(projectsCol, orderBy('createdAt', 'desc'))
      : query(projectsCol, where('clientId', '==', currentUser.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsList: any[] = [];
      snapshot.forEach((doc) => {
        projectsList.push({ id: doc.id, ...doc.data() });
      });
      setClientProjects(projectsList);
    }, (error) => {
      console.error("Error al escuchar proyectos de Firestore:", error.message);
    });
    return () => unsubscribe();
  }, [currentUser, isAdminUser]);

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

  // Real-time validation & touched tracking for CRO (Conversion Rate Optimization skill)
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const isCompanyNameValid = useMemo(() => companyName.trim().length >= 3, [companyName]);
  const isBottleneckValid = useMemo(() => bottleneck.trim().length >= 10, [bottleneck]);
  const isContactNameValid = useMemo(() => contactName.trim().length >= 3, [contactName]);
  
  const isContactEmailValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(contactEmail.trim());
  }, [contactEmail]);

  const isContactPhoneValid = useMemo(() => {
    const phoneDigits = contactPhone.replace(/\D/g, '');
    return phoneDigits.length >= 8;
  }, [contactPhone]);

  const handleFieldBlur = (field: string) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };

  const getInputClass = (field: string, isValid: boolean, styles: any) => {
    const base = `w-full p-3 rounded text-sm transition-all duration-300 outline-none border ${styles.input}`;
    if (!touchedFields[field]) return base;
    return isValid 
      ? `${base} border-emerald-500/50 focus:border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.08)] bg-emerald-500/5` 
      : `${base} border-red-500/50 focus:border-red-500 bg-red-500/5`;
  };

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
      setTouchedFields(prev => ({ ...prev, companyName: true }));
      if (!isCompanyNameValid) {
        setValidationError('Por favor ingresa el nombre de tu negocio o empresa (mínimo 3 caracteres).');
        return;
      }
    } else if (onboardingStep === 2) {
      setTouchedFields(prev => ({ ...prev, bottleneck: true }));
      if (!isBottleneckValid) {
        setValidationError('Por favor detalla tu principal cuello de botella (mínimo 10 caracteres).');
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

    setTouchedFields(prev => ({
      ...prev,
      contactName: true,
      contactEmail: true,
      contactPhone: true
    }));

    if (!isContactNameValid) {
      setValidationError('Por favor ingresa tu nombre (mínimo 3 caracteres).');
      return;
    }
    if (!isContactEmailValid) {
      setValidationError('Por favor ingresa un correo electrónico válido.');
      return;
    }
    if (!isContactPhoneValid) {
      setValidationError('Por favor ingresa un número de WhatsApp directo válido (mínimo 8 dígitos).');
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

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormValidationError('');

    if (!isContactFormNameValid) {
      setContactFormValidationError(lang === 'es' ? 'Por favor ingresa tu nombre (mínimo 3 caracteres).' : 'Please enter your name (minimum 3 characters).');
      return;
    }
    if (!isContactFormEmailValid) {
      setContactFormValidationError(lang === 'es' ? 'Por favor ingresa un correo electrónico válido.' : 'Please enter a valid email address.');
      return;
    }
    if (!isContactFormPhoneValid) {
      setContactFormValidationError(lang === 'es' ? 'Por favor ingresa un número de WhatsApp válido (mínimo 8 dígitos).' : 'Please enter a valid WhatsApp number (minimum 8 digits).');
      return;
    }
    if (contactFormMessage.trim().length < 10) {
      setContactFormValidationError(lang === 'es' ? 'Por favor ingresa un mensaje detallado (mínimo 10 caracteres).' : 'Please enter a detailed message (minimum 10 characters).');
      return;
    }

    setContactFormLoading(true);

    const contactId = `contact_${Math.random().toString(36).substring(2, 11)}`;
    const contactData = {
      name: contactFormName.trim(),
      email: contactFormEmail.trim(),
      phone: contactFormPhone.trim(),
      subject: contactFormSubject.trim() || 'Consulta General',
      message: contactFormMessage.trim(),
      createdAt: serverTimestamp(),
      userId: currentUser?.uid || null,
      status: 'new'
    };

    try {
      await setDoc(doc(db, 'contacts', contactId), contactData);
    } catch (error) {
      console.error('Error saving contact request:', error);
    }

    const textPayload = `✉️ *MAX AI - NUEVO CONTACTO* ✉️\n\n` +
      `👤 *Nombre:* ${contactFormName.trim()}\n` +
      `📧 *Email:* ${contactFormEmail.trim()}\n` +
      `📱 *WhatsApp:* ${contactFormPhone.trim()}\n` +
      `📋 *Asunto:* ${contactFormSubject.trim() || 'Consulta General'}\n\n` +
      `📝 *Mensaje:* ${contactFormMessage.trim()}\n\n` +
      `_Enviado desde el portal de contacto de MAX AI._`;

    const whatsappUrl = `https://wa.me/593983186044?text=${encodeURIComponent(textPayload)}`;

    setContactFormLoading(false);
    setContactFormSubmitted(true);

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1500);
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
    bg: 'bg-[#F2EFE9] text-[#0A1128]',
    header: 'bg-[#F2EFE9]/90 border-[#D6D0C1]',
    card: 'bg-[#FAF8F5] border-[#D6D0C1] backdrop-blur-xl shadow-lg shadow-[#D6D0C1]/40',
    cardInner: 'bg-[#EAE6DB] border-[#D0C9B8]',
    input: 'bg-white border-[#D6D0C1] text-slate-800 focus:border-[#C17F4E]',
    textMuted: 'text-[#4F5568]',
    title: 'text-[#020813]'
  };

  const t = {
    // Nav
    home: lang === 'es' ? 'Inicio' : 'Home',
    services: lang === 'es' ? 'Servicios' : 'Services',
    portfolio: lang === 'es' ? 'Portafolio' : 'Portfolio',
    contact: lang === 'es' ? 'Contactar' : 'Contact',
    portHeader: lang === 'es' ? 'Portafolio' : 'Portfolio',
    whatsappBtn: lang === 'es' ? 'WHATSAPP DIRECTO' : 'WHATSAPP DIRECT',
    login: lang === 'es' ? 'Login' : 'Login',
    system: lang === 'es' ? 'Sistema' : 'System',
    dashboard: lang === 'es' ? 'Dashboard' : 'Dashboard',
    portal: lang === 'es' ? 'Mi Portal' : 'My Portal',

    // Hero
    heroBadge: lang === 'es' ? 'NÚCLEO v5.0 ACTIVO • QUITO, EC' : 'CORE v5.0 ACTIVE • QUITO, EC',
    heroTitle1: lang === 'es' ? 'INFRAESTRUCTURA' : 'HIGH-PERFORMANCE',
    heroTitle2: lang === 'es' ? 'COGNITIVA' : 'COGNITIVE',
    heroTitle3: lang === 'es' ? 'DE ALTO' : 'INFRASTRUCTURE',
    heroTitle4: lang === 'es' ? 'RENDIMIENTO' : 'ELITE SOFTWARE',
    heroSub: lang === 'es' 
      ? 'Diseñamos y desplegamos ecosistemas digitales propietarios impulsados por Inteligencia Artificial para el posicionamiento de marcas de élite de forma ultrarrápida.'
      : 'We design and deploy proprietary digital ecosystems driven by Artificial Intelligence to position elite brands at ultra-fast speeds.',
    heroCta1: lang === 'es' ? 'INICIAR DIAGNÓSTICO' : 'START DIAGNOSTIC',
    heroCta2: lang === 'es' ? 'EXPLORAR STACK' : 'EXPLORE STACK',
    heroStat1: lang === 'es' ? 'Conversión' : 'Conversion',
    heroStat2: lang === 'es' ? 'Uptime' : 'Uptime',
    heroStat3: lang === 'es' ? 'Latencia' : 'Latency',

    // Problem Grid
    probBadge: lang === 'es' ? 'Diagnóstico de Mercado' : 'Market Diagnostics',
    probTitle: lang === 'es' ? 'La Fricción del Software Tradicional' : 'The Friction of Traditional Software',
    probSub: lang === 'es'
      ? 'Por qué las fábricas de software comunes fracasan al intentar implementar IA y pauta comercial digital de alto impacto.'
      : 'Why standard software houses fail when trying to deploy AI and high-impact digital commercial campaigns.',
    probCard1Title: lang === 'es' ? 'Fábricas de Software Comunes' : 'Standard Software Houses',
    probCard1Items: lang === 'es' ? [
      'Utilización de plantillas prefabricadas pesadas de WordPress que destrozan la conversión.',
      'Simples bots de respuesta que alucinan y carecen de vinculación con CRM internos.',
      'Estructuras desactualizadas que pierden conversiones debido a píxeles mal conectados con Meta.',
      'Carga lenta del sistema de cara al usuario final (pérdida directa de retención).'
    ] : [
      'Use of heavy, pre-made WordPress templates that destroy conversion rates.',
      'Simple answer bots that hallucinate and lack integration with internal CRMs.',
      'Outdated structures that lose conversions due to poorly connected Meta pixels.',
      'Slow system loading speeds for end users (direct loss of retention).'
    ],
    probCard2Title: lang === 'es' ? 'Estándares MAX AI Digital' : 'MAX AI Digital Standards',
    probCard2Items: lang === 'es' ? [
      'React puro optimizado y compilado para cargas menores a 1.2s.',
      'Modelos cognitivos predictivos entrenados bajo tus parámetros de venta reales.',
      'Sincronizadores robustos que enlazan catálogos directamente con Meta Ads Business Manager.',
      'Base de datos no relacional cloud de alto rendimiento para métricas inmediatas.'
    ] : [
      'Pure React optimized and compiled for load times under 1.2s.',
      'Predictive cognitive models trained under your real sales parameters.',
      'Robust synchronizers linking catalogs directly with Meta Ads Business Manager.',
      'High-performance cloud NoSQL database for instant real-time metrics.'
    ],

    // Methodology (4 Pilares)
    metBadge: lang === 'es' ? 'Fases del Éxito' : 'Phases of Success',
    metTitle: lang === 'es' ? 'Metodología de 4 Pilares' : '4-Pillar Methodology',
    metSub: lang === 'es'
      ? 'Despliegue ordenado de software premium corporativo sin improvisación.'
      : 'Orderly deployment of enterprise premium software without improvisation.',
    metPilar1Title: lang === 'es' ? 'Descubrimiento Estratégico' : 'Strategic Discovery',
    metPilar1Sub: lang === 'es' ? 'Auditoría inicial de cuellos de botella' : 'Initial audit of operational bottlenecks',
    metPilar2Title: lang === 'es' ? 'Modelamiento de Datos' : 'Data Modeling',
    metPilar2Sub: lang === 'es' ? 'Estructuración NoSQL Firestore' : 'NoSQL Firestore structuring',
    metPilar3Title: lang === 'es' ? 'Desarrollo Propietario' : 'Proprietary Development',
    metPilar3Sub: lang === 'es' ? 'React / Tailwind premium puro' : 'Pure premium React / Tailwind',
    metPilar4Title: lang === 'es' ? 'Integraciones Meta API' : 'Meta API Integrations',
    metPilar4Sub: lang === 'es' ? 'Automatización y pipelines estables' : 'Automation and stable pipelines',
    metDetailTitle: lang === 'es' ? 'Detalle del Proceso' : 'Process Details',
    metPilarDetailTitles: lang === 'es' ? [
      '01 • AUDITORÍA & AUDIENCIAS DIGITALES',
      '02 • MODELADO DE BASE DE DATOS',
      '03 • CODIFICACIÓN DE FIERROS Y FRONTEND',
      '04 • PIPELINES A META GRAPH API'
    ] : [
      '01 • AUDIT & DIGITAL AUDIENCES',
      '02 • DATABASE MODELING',
      '03 • INFRASTRUCTURE & FRONTEND CODE',
      '04 • META GRAPH API PIPELINES'
    ],
    metPilarDetailSubs: lang === 'es' ? [
      'Descubrimos y documentamos cada fricción operativa. Estudiamos las campañas digitales de anuncios actuales, los tiempos de conversión de tu embudo de ventas y trazamos el plan técnico.',
      'Esquematizamos bases de datos rápidas no relacionales en la nube para resguardar flujos transaccionales e información gerencial, blindados con rigurosas políticas de seguridad.',
      'Codificamos módulos bajo las mejores prácticas, sin redundancias ni pesos muertos, logrando un posicionamiento SEO excepcional de cara a motores de búsqueda.',
      'Enlazamos la información al instante con WhatsApp Business para agendamientos ágiles y con la API de conversión de Meta para maximizar el retorno de tu pauta publicitaria.'
    ] : [
      'We discover and document every operational friction. We analyze current digital ad campaigns, conversion times of your sales funnel, and draw up the technical plan.',
      'We schema fast non-relational databases in the cloud to secure transactional flows and management information, shielded with rigorous security policies.',
      'We write modules under the best programming practices, without redundancy or dead weight, achieving exceptional SEO positioning for search engines.',
      'We link information instantly with WhatsApp Business for agile booking and with the Meta Conversion API to maximize your ad spend return.'
    ],
    metMetricTitle: lang === 'es' ? 'Métrica Clave' : 'Key Metric',
    metStatusTitle: lang === 'es' ? 'Estado v5.0' : 'v5.0 Status',
    metPilarMetrics: lang === 'es' ? [
      'Incertidumbre Cero',
      '23ms Firestore Sync',
      '98+ Lighthouse Score',
      '99.98% Uptime'
    ] : [
      'Zero Uncertainty',
      '23ms Firestore Sync',
      '98+ Lighthouse Score',
      '99.98% Uptime'
    ],

    // Page 2: Servicios
    servBadge: lang === 'es' ? 'Fierros y Arquitectura' : 'Tech Stack & Architecture',
    servTitle: lang === 'es' ? 'NUESTRO STACK Y SOLUCIONES DE ÉLITE' : 'OUR STACK & ELITE SOLUTIONS',
    servSub: lang === 'es'
      ? 'Infraestructura robusta desarrollada con React, TypeScript y bases de datos cloud escalables para automatizar la captación de valor.'
      : 'Robust infrastructure developed with React, TypeScript, and scalable cloud databases to automate value capture.',
    servCard1Title: lang === 'es' ? 'Modelos de IA Personalizados' : 'Custom AI Models',
    servCard1Sub: lang === 'es'
      ? 'Algoritmos de aprendizaje predictivos e inteligentes estructurados en la nube para proyectar inventarios y preclasificar intención de prospectos calificados.'
      : 'Cloud-structured intelligent predictive learning algorithms to project inventory and pre-qualify intent of prospects.',
    servCard1Foot: lang === 'es' ? 'INTEGRACIONES DE APRENDIZAJE • CLOUD DEEP RUN' : 'LEARNING INTEGRATIONS • CLOUD DEEP RUN',
    servCard2Title: lang === 'es' ? 'Estructuras Web Robustas' : 'Robust Web Architectures',
    servCard2Sub: lang === 'es'
      ? 'Aplicaciones de altísimo performance en React, optimizando la experiencia móvil de cara a tus clientes para maximizar la pauta de anuncios comerciales.'
      : 'Ultra-high-performance React applications, optimizing the mobile experience for your customers to maximize ad campaigns.',
    servCard2Foot: lang === 'es' ? 'REACT 19 • GOOGLE CLOUD STORAGE • VITE ENGINE' : 'REACT 19 • GOOGLE CLOUD STORAGE • VITE ENGINE',
    servCard3Title: lang === 'es' ? 'Conectores de Conversión' : 'Conversion Connectors',
    servCard3Sub: lang === 'es'
      ? 'Canales estables conectados a Meta Business Suite y WhatsApp API para alimentar datos en tiempo real de visitas y carritos, multiplicando ventas efectivas.'
      : 'Stable channels connected to Meta Business Suite and WhatsApp API to feed real-time cart and visit data, multiplying sales.',
    servCard3Foot: lang === 'es' ? 'META GRAPH API • WHATSAPP CRM HOOKS' : 'META GRAPH API • WHATSAPP CRM HOOKS',

    // Configurator
    confBadge: lang === 'es' ? 'Configurador Inteligente' : 'Smart Configurator',
    confTitle: lang === 'es' ? 'Crea tu Ecosistema Técnico' : 'Build Your Technical Ecosystem',
    confSub: lang === 'es'
      ? 'Selecciona los módulos tecnológicos que demanda tu negocio y obtén una estimación de recursos y tiempos del Ingeniero Principal.'
      : 'Select the technical modules your business demands and obtain an estimate of resources and time from the Principal Engineer.',
    confSumTitle: lang === 'es' ? 'RESUMEN DE INFRAESTRUCTURA' : 'INFRASTRUCTURE SUMMARY',
    confSumMod: lang === 'es' ? 'Módulos Solicitados' : 'Requested Modules',
    confSumTime: lang === 'es' ? 'Tiempo de Producción' : 'Production Time',
    confSumTimeWeeks: lang === 'es' ? 'semanas' : 'weeks',
    confSumBudget: lang === 'es' ? 'Presupuesto Estimado' : 'Estimated Budget',
    confSumCta: lang === 'es' ? 'PROCEDER AL ONBOARDING' : 'PROCEED TO ONBOARDING',

    // Page 3: Portafolio Tabs
    tab1: lang === 'es' ? 'Casos de Éxito & Onboarding' : 'Case Studies & Onboarding',
    tab2: lang === 'es' ? 'Google Forms Sync' : 'Google Forms Sync',
    tab3: lang === 'es' ? 'Leads Recibidos (CRM)' : 'Received Leads (CRM)',
    tab4: lang === 'es' ? 'Mis Proyectos' : 'My Projects',

    // Case Studies Page
    csBadge: lang === 'es' ? 'Showcase Real' : 'Real Showcase',
    csTitle: lang === 'es' ? 'CASOS DE ÉXITO MAX AI' : 'MAX AI CASE STUDIES',
    csSub: lang === 'es'
      ? 'Plataformas reales y estables producidas bajo ingeniería de alto desempeño para marcas sofisticadas.'
      : 'Real and stable platforms built under high-performance engineering for sophisticated brands.',

    // Onboarding Form Section
    onbBadge: lang === 'es' ? 'Onboarding Exclusivo' : 'Exclusive Onboarding',
    onbTitle: lang === 'es' ? 'Iniciar Protocolo de Diagnóstico' : 'Start Diagnostic Protocol',
    onbSub: lang === 'es'
      ? 'Toma 2 minutos configurar tu perfil para agendar una llamada directa de validación arquitectónica.'
      : 'Takes 2 minutes to configure your profile to book a direct call for architectural validation.',
    onbSteps: lang === 'es' ? ['Negocio', 'Fricciones', 'Infraestructura', 'Contacto'] : ['Business', 'Friction', 'Infrastructure', 'Contact'],
    onbStep1Title: lang === 'es' ? 'Paso 1: Perfil de tu Marca o Negocio' : 'Step 1: Brand or Business Profile',
    onbStep1Label1: lang === 'es' ? 'Nombre de la Empresa o Marca *' : 'Company or Brand Name *',
    onbStep1Val: lang === 'es' ? 'Válido' : 'Valid',
    onbStep1Label2: lang === 'es' ? 'Sector / Industria' : 'Sector / Industry',
    onbStep1Label3: lang === 'es' ? 'Tamaño del Negocio' : 'Business Size',
    onbStep2Title: lang === 'es' ? 'Paso 2: Diagnóstico de Fricciones' : 'Step 2: Friction Diagnostics',
    onbStep2Label1: lang === 'es' ? 'Cuéntanos tu cuello de botella prioritario *' : 'Tell us your primary bottleneck *',
    onbStep2Val: lang === 'es' ? 'Detallado' : 'Detailed',
    onbStep2Label2: lang === 'es' ? 'Grado de madurez digital actual' : 'Current digital maturity level',
    onbStep3Title: lang === 'es' ? 'Paso 3: Módulos de Infraestructura' : 'Step 3: Infrastructure Modules',
    onbStep3Sub: lang === 'es'
      ? 'Selecciona los pilares que deseas conectar (los valores sumados se calculan en base a tu cotizador).'
      : 'Select the pillars you want to connect (the values are calculated based on your quote).',
    onbStep3Budget: lang === 'es' ? 'PRESUPUESTO ESTIMADO DE ESTUDIO:' : 'ESTIMATED STUDY BUDGET:',
    onbStep4Title: lang === 'es' ? 'Paso 4: Información de Contacto Directo' : 'Step 4: Direct Contact Information',
    onbStep4Ficha: lang === 'es' ? 'Ficha de Diagnóstico' : 'Diagnostic Sheet',
    onbStep4FichaEco: lang === 'es' ? 'Ecosistema Tailored' : 'Tailored Ecosystem',
    onbStep4Label1: lang === 'es' ? 'Nombre del Contacto *' : 'Contact Name *',
    onbStep4Label2: lang === 'es' ? 'Correo Electrónico *' : 'Email Address *',
    onbStep4Label3: lang === 'es' ? 'WhatsApp directo *' : 'Direct WhatsApp *',
    onbStep4Label4: lang === 'es' ? 'Comentarios sobre Google Maps / APIs' : 'Comments on Google Maps / APIs',
    onbStep4Privacy: lang === 'es' 
      ? '🔒 Privacidad Garantizada: Tu información de diagnóstico está protegida bajo estándares encriptados y es 100% confidencial. No realizamos spam.'
      : '🔒 Privacy Guaranteed: Your diagnostic information is protected under encrypted standards and is 100% confidential. No spam.',
    onbBtnBack: lang === 'es' ? 'Atrás' : 'Back',
    onbBtnNext: lang === 'es' ? 'Siguiente' : 'Next',
    onbBtnSubmit: lang === 'es' ? 'CONECTAR POR WHATSAPP' : 'CONNECT VIA WHATSAPP',
    onbSuccessTitle: lang === 'es' ? '¡Protocolo Compilado!' : 'Protocol Compiled!',
    onbSuccessSub: lang === 'es'
      ? 'Tu solicitud se ha estructurado con éxito. Se ha inicializado una redirección segura hacia el WhatsApp del Ingeniero Principal para validar la infraestructura técnica de tu marca.'
      : 'Your request has been successfully structured. A secure redirect has been initialized to the Principal Engineer\'s WhatsApp to validate your brand\'s technical infrastructure.',
    onbSuccessReset: lang === 'es' ? 'Reiniciar Formulario' : 'Reset Form',
    onbSuccessWa: lang === 'es' ? 'Ir a WhatsApp' : 'Go to WhatsApp',

    // Google Forms
    gfBadge: lang === 'es' ? 'Integración Google Forms' : 'Google Forms Integration',
    gfTitle: lang === 'es' ? 'Sincronizador Google Forms' : 'Google Forms Synchronizer',
    gfSub: lang === 'es'
      ? 'Sincroniza tus formularios de Google Workspace con nuestro motor NoSQL. Genera análisis en tiempo real y gestiona prospectos corporativos.'
      : 'Sync your Google Workspace forms with our NoSQL engine. Generate real-time analytics and manage enterprise leads.',
    gfNoAuthTitle: lang === 'es' ? 'Conectar Google Workspace' : 'Connect Google Workspace',
    gfNoAuthSub: lang === 'es'
      ? 'Autentícate de forma segura con tu cuenta de Google para otorgarle a MAX AI acceso a tus formularios y sincronizar respuestas en tiempo real.'
      : 'Authenticate securely with your Google account to grant MAX AI access to your forms and sync responses in real time.',
    gfNoAuthBtn: lang === 'es' ? 'Iniciar Sesión con Google' : 'Sign In with Google',
    gfAuthStatus: lang === 'es' ? 'ESPACIO DE TRABAJO CONECTADO' : 'WORKSPACE CONNECTED',
    gfConnectTitle: lang === 'es' ? 'Conectar Formulario de Google' : 'Connect Google Form',
    gfConnectLabel: lang === 'es' ? 'ID del Formulario en Google Forms' : 'Google Form ID',
    gfConnectBtn: lang === 'es' ? 'Enlazar' : 'Link',
    gfExpressTitle: lang === 'es' ? 'Creación Express de Diagnóstico' : 'Express Diagnostic Creation',
    gfExpressSub: lang === 'es'
      ? 'MAX AI creará un formulario en tu Google Drive estructurado con preguntas de cualificación para prospectos corporativos y lo enlazará automáticamente.'
      : 'MAX AI will create a structured qualification Google Form in your Google Drive and automatically link it to the platform.',
    gfExpressBtn1: lang === 'es' ? 'Generar Formulario 1-Click' : 'Generate Form 1-Click',
    gfExpressBtn2: lang === 'es' ? 'Creando en Google...' : 'Creating in Google...',
    gfLinkedTitle: lang === 'es' ? 'Formularios Enlazados' : 'Linked Forms',
    gfLinkedEmpty: lang === 'es' ? 'No has conectado ningún formulario todavía.' : 'You have not connected any forms yet.',
    gfActiveTitle: lang === 'es' ? 'Formulario Activo' : 'Active Form',
    gfActiveResponses: lang === 'es' ? 'Respuestas' : 'Responses',
    gfActiveQuestions: lang === 'es' ? 'Preguntas' : 'Questions',
    gfRecentResponses: lang === 'es' ? 'Respuestas Recientes' : 'Recent Responses',
    gfRecentResponsesSync: lang === 'es' ? 'Sincronización Live' : 'Live Sync',
    gfRecentResponsesEmpty: lang === 'es' ? 'Tu formulario no tiene ninguna respuesta todavía.' : 'Your form does not have any responses yet.',
    gfRecentResponsesEmptySub: lang === 'es' ? 'Comparte el enlace del formulario para recibir solicitudes de leads.' : 'Share the form link to start receiving lead requests.',
    gfNoSelectedTitle: lang === 'es' ? 'Ningún Formulario Seleccionado' : 'No Form Selected',
    gfNoSelectedSub: lang === 'es' ? 'Conecta un formulario existente ingresando su identificador o presiona el botón de generación express de 1-click.' : 'Connect an existing form by entering its ID or press the 1-click express generation button.',
    gfActiveSync: lang === 'es' ? 'Estado Sync' : 'Sync Status',
    gfRecentResponsesTag: lang === 'es' ? 'RESPUESTA' : 'RESPONSE',

    // CRM
    crmBadge: lang === 'es' ? 'CRM Corporativo' : 'Corporate CRM',
    crmTitle: lang === 'es' ? 'Leads Recibidos' : 'Received Leads',
    crmSub: lang === 'es'
      ? 'Bandeja de entrada en tiempo real con las cotizaciones de tu onboarding configuradas en Firestore.'
      : 'Real-time inbox with your onboarding quotes configured in Firestore.',
    crmNoAuthTitle: lang === 'es' ? 'Acceso al CRM' : 'CRM Access',
    crmNoAuthSub: lang === 'es'
      ? 'Inicia sesión de forma segura para revisar las propuestas de diagnóstico y presupuestos estimados.'
      : 'Sign in securely to review diagnostic proposals and estimated budgets.',
    crmEmpty: lang === 'es' ? 'No se encontraron leads' : 'No leads found',
    crmEmptySub: lang === 'es'
      ? 'Los leads que configures y envíes en el protocolo de Onboarding aparecerán aquí instantáneamente.'
      : 'Leads you configure and submit in the Onboarding protocol will appear here instantly.',
    crmCardDate: lang === 'es' ? 'Fecha' : 'Date',
    crmCardContact: lang === 'es' ? 'Contacto Directo' : 'Direct Contact',

    // Contact Page
    contactTitle: lang === 'es' ? 'Contacto Cognitivo' : 'Cognitive Contact',
    contactSub: lang === 'es' 
      ? 'Conecta con nuestro equipo de ingenieros y diseñadores para materializar tu visión digital.' 
      : 'Connect with our team of software engineers and designers to materialize your digital vision.',
    contactLabelName: lang === 'es' ? 'Nombre Completo' : 'Full Name',
    contactLabelEmail: lang === 'es' ? 'Correo Electrónico' : 'Email Address',
    contactLabelPhone: lang === 'es' ? 'WhatsApp Directo' : 'Direct WhatsApp',
    contactLabelSubject: lang === 'es' ? 'Asunto / Proyecto' : 'Subject / Project',
    contactLabelMessage: lang === 'es' ? 'Mensaje / Detalles' : 'Message / Details',
    contactBtnSubmit: lang === 'es' ? 'ENVIAR MENSAJE' : 'SEND MESSAGE',
    contactBtnSubmitting: lang === 'es' ? 'ENVIANDO...' : 'SENDING...',
    contactSuccessTitle: lang === 'es' ? '¡Mensaje Transmitido!' : 'Message Transmitted!',
    contactSuccessSub: lang === 'es' 
      ? 'Hemos registrado tu solicitud en el núcleo. Un arquitecto cognitivo se pondrá en contacto contigo en menos de 2 horas y te redireccionaremos a WhatsApp.' 
      : 'We have registered your request in the core. A cognitive architect will contact you in less than 2 hours and we will redirect you to WhatsApp.',
    contactDetailsTitle: lang === 'es' ? 'Canales Directos' : 'Direct Channels',
    contactOffice: lang === 'es' ? 'Sede Central' : 'Headquarters',
    contactOfficeLoc: lang === 'es' ? 'Quito, Ecuador • Cobertura Global' : 'Quito, Ecuador • Global Coverage',
    contactSocials: lang === 'es' ? 'Redes de la Agencia' : 'Agency Networks',

    // Footer
    footText: lang === 'es' ? 'ESTRATEGIA • CÓDIGO • DISEÑO' : 'STRATEGY • CODE • DESIGN',
    footServer: lang === 'es' ? 'ESTADO DEL SERVIDOR: ÓPTIMO' : 'SERVER STATUS: OPTIMAL',
  };

  // Render Projects Helper
  const renderProjectsSection = () => {
    return (
      <div className="space-y-6">
        {/* Botón para crear proyecto de prueba en modo de desarrollo / testing */}
        {isAdminUser && (
          <div className="flex justify-end mb-4">
            <button
              onClick={async () => {
                if (isCreatingProject) return;
                setIsCreatingProject(true);
                try {
                  const newProj = {
                    clientId: currentUser?.uid || '',
                    name: lang === 'es' ? "Ecosistema Digital Especializado" : "Specialized Digital Ecosystem",
                    description: lang === 'es' 
                      ? "Desarrollo a medida con integración de base de datos Firestore y autenticación federada de Google Auth."
                      : "Custom development with Firestore database integration and federated Google Auth authentication.",
                    progress: 35,
                    status: "en proceso",
                    createdAt: serverTimestamp()
                  };
                  await addDoc(collection(db, 'projects'), newProj);
                  alert(lang === 'es' ? "Proyecto de prueba creado en Firestore." : "Test project created in Firestore.");
                } catch (e: any) {
                  console.error("Error creating project:", e);
                  alert("Error: " + e.message);
                } finally {
                  setIsCreatingProject(false);
                }
              }}
              disabled={isCreatingProject}
              className="inline-flex items-center gap-2 bg-[#C17F4E]/10 border border-[#C17F4E]/20 text-[#C17F4E] hover:bg-[#C17F4E]/20 px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-widest transition-all cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Crear Proyecto de Prueba' : 'Create Test Project'}</span>
            </button>
          </div>
        )}

        {!currentUser ? (
          <div className={`p-12 rounded-xl border text-center max-w-2xl mx-auto ${themeStyles.card}`}>
            <div className="w-16 h-16 rounded-full bg-[#C17F4E]/10 text-[#C17F4E] flex items-center justify-center mx-auto mb-6">
              <FolderKanban className="w-8 h-8" />
            </div>
            <h3 className={`font-display font-black text-xl uppercase mb-3 ${themeStyles.title}`}>
              {lang === 'es' ? 'Acceso al Portal' : 'Portal Access'}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed mb-8 ${themeStyles.textMuted}`}>
              {lang === 'es' 
                ? 'Inicia sesión con tu cuenta de Google autorizada para ver tus proyectos contratados.' 
                : 'Sign in with your authorized Google account to view your contracted projects.'}
            </p>
            <button
              onClick={handleGoogleSignIn}
              className="inline-flex items-center gap-3 bg-white text-zinc-950 px-8 py-3.5 rounded font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-lg cursor-pointer"
            >
              {t.gfNoAuthBtn}
            </button>
          </div>
        ) : clientProjects.length === 0 ? (
          <div className={`p-12 rounded-xl border text-center ${themeStyles.card}`}>
            <FolderKanban className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h4 className="font-display font-bold text-sm text-zinc-400 uppercase mb-2">
              {lang === 'es' ? 'Sin Proyectos Vinculados' : 'No Projects Linked'}
            </h4>
            <p className="text-xs text-zinc-500 font-sans">
              {lang === 'es' 
                ? 'No se encontraron proyectos activos vinculados a tu ID de cliente. Tu UID es: ' 
                : 'No active projects found linked to your client ID. Your UID is: '}
              <span className="font-mono text-[#C17F4E] font-bold">{currentUser.uid}</span>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            {clientProjects.map((project) => {
              const dateStr = project.createdAt && typeof project.createdAt.toDate === 'function' 
                ? project.createdAt.toDate().toLocaleDateString() 
                : 'Fecha Reciente';
              return (
                <div key={project.id} className={`p-6 rounded-xl border flex flex-col justify-between text-left ${themeStyles.card}`}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-[9px] text-zinc-500 font-mono font-bold uppercase tracking-wider">ID: {project.id.substring(0, 8)}...</span>
                      <span className={`font-mono text-[9px] px-2 py-0.5 rounded uppercase font-bold ${
                        project.status === 'finalizado' || project.status === 'completado'
                          ? 'text-emerald-500 bg-emerald-500/10'
                          : 'text-[#C17F4E] bg-[#C17F4E]/10'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    <div>
                      <h4 className={`font-display font-black text-lg uppercase tracking-tight leading-tight ${themeStyles.title}`}>
                        {project.name}
                      </h4>
                      <p className="text-[9px] text-zinc-500 font-mono mt-1">
                        {lang === 'es' ? 'Iniciado' : 'Started'}: {dateStr}
                      </p>
                    </div>

                    <p className={`text-xs font-sans font-light leading-relaxed ${themeStyles.textMuted}`}>
                      {project.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-zinc-500">{lang === 'es' ? 'Progreso' : 'Progress'}</span>
                        <span className="text-[#C17F4E] font-bold">{project.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#C17F4E] rounded-full transition-all duration-500" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${themeStyles.bg}`}>
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <img 
          src={isDark ? "/bg_dark.jpg" : "/bg_light.jpg"} 
          alt="MAX AI Background" 
          className={`w-full h-full object-cover fixed top-0 left-0 transition-opacity duration-700 ${isDark ? 'opacity-[0.08]' : 'opacity-[0.09]'}`}
        />
      </div>

      {/* Background Orbes Ambientales */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-40'}`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C17F4E]/5 rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-30'}`}></div>
      </div>

      {/* --- HEADER / NAVBAR --- */}
      <header className={`fixed top-0 left-0 w-full z-40 backdrop-blur-md border-b h-20 transition-all duration-300 ${themeStyles.header}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 h-full flex items-center justify-between">
          
          {/* Brand Logo with Fluid Expanding Image Effect */}
          <div 
            className="group relative h-10 w-10 hover:w-[125px] rounded-lg transition-all duration-500 ease-out cursor-pointer overflow-hidden flex items-center shrink-0" 
            onClick={() => setActivePage('inicio')}
          >
            {/* Small Logo */}
            <img 
              src="/logo_pequeno.png" 
              alt="MAX AI" 
              className="absolute left-0 top-0 h-10 w-10 rounded-lg object-contain transition-all duration-300 group-hover:opacity-0 group-hover:scale-90" 
            />
            {/* Long Logo */}
            <img 
              src="/logo_largo.png" 
              alt="MAX AI Digital Studio" 
              className="absolute left-0 top-0 h-10 w-[125px] rounded-lg object-contain opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100" 
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-8 text-xs font-semibold tracking-widest text-zinc-400 uppercase">
            <button 
              onClick={() => setActivePage('inicio')}
              className={`pb-1 transition-all uppercase ${
                activePage === 'inicio' 
                  ? `${themeStyles.title} border-b-2 border-[#C17F4E]` 
                  : isDark ? 'hover:text-white' : 'hover:text-[#020813]'
              }`}
            >
              {t.home}
            </button>
            <button 
              onClick={() => setActivePage('servicios')}
              className={`pb-1 transition-all uppercase ${
                activePage === 'servicios' 
                  ? `${themeStyles.title} border-b-2 border-[#C17F4E]` 
                  : isDark ? 'hover:text-white' : 'hover:text-[#020813]'
              }`}
            >
              {t.services}
            </button>
            <button 
              onClick={() => setActivePage('portafolio')}
              className={`pb-1 transition-all uppercase ${
                activePage === 'portafolio' 
                  ? `${themeStyles.title} border-b-2 border-[#C17F4E]` 
                  : isDark ? 'hover:text-white' : 'hover:text-[#020813]'
              }`}
            >
              {t.portfolio}
            </button>
          </nav>

          {/* Action Tools: Contact + Login + Language + Theme */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Premium Contact Button */}
            <button 
              onClick={() => setActivePage('contacto')}
              className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded transition-all ${
                activePage === 'contacto'
                  ? 'bg-zinc-800 text-white border border-[#C17F4E]'
                  : 'bg-[#C17F4E] text-white hover:bg-[#D79663]'
              }`}
            >
              {t.contact}
            </button>

            {/* Premium Login / Portal Button */}
            <button 
              onClick={() => setActivePage('login')}
              className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded transition-all border ${
                activePage === 'login'
                  ? 'bg-zinc-800 text-white border border-[#C17F4E]'
                  : isDark ? 'border-white/10 hover:border-[#C17F4E]/50 text-zinc-300 hover:text-white bg-zinc-950/20' : 'border-slate-300 hover:border-[#C17F4E]/50 text-slate-700 hover:text-slate-900 bg-white/20'
              }`}
            >
              {currentUser ? (isAdminUser ? t.system : t.portal) : t.login}
            </button>

            {/* Language Switcher (ES | EN Toggle Group) */}
            <div className={`flex p-1 rounded-full border ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-[#EAE6DB] border-[#D6D0C1]'}`}>
              <button
                onClick={() => setLang('es')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-all ${
                  lang === 'es' 
                    ? 'bg-[#C17F4E] text-white' 
                    : isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Español"
              >
                ES
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-all ${
                  lang === 'en' 
                    ? 'bg-[#C17F4E] text-white' 
                    : isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-660 hover:text-slate-900'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Theme Toggle Button (On the right) */}
            <div className={`flex p-1 rounded-full border ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-[#EAE6DB] border-[#D6D0C1]'}`}>
              <button
                onClick={() => setIsDark(true)}
                className={`p-1.5 rounded-full transition-all ${isDark ? 'bg-[#C17F4E] text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                title={lang === 'es' ? "Modo Oscuro" : "Dark Mode"}
              >
                <Moon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsDark(false)}
                className={`p-1.5 rounded-full transition-all ${!isDark ? 'bg-[#C17F4E] text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                title={lang === 'es' ? "Modo Claro" : "Light Mode"}
              >
                <Sun className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex md:hidden items-center gap-2 sm:gap-3">
            {/* Mobile Contact Button */}
            <button 
              onClick={() => setActivePage('contacto')}
              className={`px-3 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded transition-all shrink-0 ${
                activePage === 'contacto'
                  ? 'bg-zinc-800 text-white border border-[#C17F4E]'
                  : 'bg-[#C17F4E] text-white hover:bg-[#D79663]'
              }`}
            >
              {t.contact}
            </button>

            {/* Mobile Login / Portal Button */}
            <button 
              onClick={() => setActivePage('login')}
              className={`px-3 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded border transition-all shrink-0 ${
                activePage === 'login'
                  ? 'bg-zinc-800 text-white border border-[#C17F4E]'
                  : isDark ? 'border-white/10 text-zinc-300 bg-zinc-950/20' : 'border-slate-300 text-slate-700 bg-white/20'
              }`}
            >
              {currentUser ? (isAdminUser ? 'SYS' : 'PORT') : 'LOGIN'}
            </button>

            {/* Language Switcher (ES | EN Toggle Group for mobile) */}
            <div className={`flex p-0.5 rounded-full border ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-[#EAE6DB] border-[#D6D0C1]'}`}>
              <button
                onClick={() => setLang('es')}
                className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold transition-all ${
                  lang === 'es' 
                    ? 'bg-[#C17F4E] text-white' 
                    : isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold transition-all ${
                  lang === 'en' 
                    ? 'bg-[#C17F4E] text-white' 
                    : isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>
            
            {/* Theme Toggle Button for mobile */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full border transition-all ${
                isDark 
                  ? 'border-white/5 bg-zinc-900/40 text-[#C17F4E] hover:text-[#D79663]' 
                  : 'border-[#D6D0C1] bg-[#FAF8F5] text-[#C17F4E] hover:bg-[#F2EFE9]'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded border transition-all ${
                isDark
                  ? 'border-white/5 bg-zinc-900/40 text-zinc-305 hover:text-white'
                  : 'border-[#D6D0C1] bg-[#FAF8F5] text-slate-700 hover:bg-[#F2EFE9]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Spacer to offset fixed header */}
      <div className="h-20 w-full" />

      {/* --- MOBILE DRAWER SIDEBAR --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative w-80 max-w-sm h-full p-6 flex flex-col justify-between shadow-2xl z-50 bg-[#041021] text-zinc-100 border-l border-white/5">
            <div>
              <div className="flex items-center justify-between pb-8 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <img src="/logo_largo.png" alt="MAX AI" className="h-16 object-contain rounded-lg" />
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
                  {t.home}
                </button>
                <button
                  onClick={() => { setActivePage('servicios'); setMobileMenuOpen(false); }}
                  className={`text-left text-sm font-semibold tracking-wider uppercase py-2.5 px-3 rounded transition-all ${activePage === 'servicios' ? 'bg-[#C17F4E]/10 text-[#C17F4E]' : 'hover:bg-white/5'}`}
                >
                  {t.services}
                </button>
                <button
                  onClick={() => { setActivePage('portafolio'); setMobileMenuOpen(false); }}
                  className={`text-left text-sm font-semibold tracking-wider uppercase py-2.5 px-3 rounded transition-all ${activePage === 'portafolio' ? 'bg-[#C17F4E]/10 text-[#C17F4E]' : 'hover:bg-white/5'}`}
                >
                  {t.portfolio}
                </button>
                <button
                  onClick={() => { setActivePage('contacto'); setMobileMenuOpen(false); }}
                  className={`text-left text-sm font-semibold tracking-wider uppercase py-2.5 px-3 rounded transition-all ${activePage === 'contacto' ? 'bg-[#C17F4E]/10 text-[#C17F4E]' : 'hover:bg-white/5'}`}
                >
                  {t.contact}
                </button>
                <button
                  onClick={() => { setActivePage('login'); setMobileMenuOpen(false); }}
                  className={`text-left text-sm font-semibold tracking-wider uppercase py-2.5 px-3 rounded transition-all ${activePage === 'login' ? 'bg-[#C17F4E]/10 text-[#C17F4E]' : 'hover:bg-white/5'}`}
                >
                  {currentUser ? (isAdminUser ? t.system : t.portal) : t.login}
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 text-center">
              <p className="text-[10px] text-zinc-500 font-mono mb-4">CORE SYSTEM ACTIVE • QUITO, EC</p>
              <a 
                href="https://wa.me/593983186044"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center block bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded font-mono text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#25D366]/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {t.whatsappBtn}
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
              <Interactive3DNetwork />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start items-center relative z-10">
                
                {/* Left Content */}
                <div className="lg:col-span-7 flex flex-col items-start gap-6">
                  <div className="mb-2 select-none w-full flex justify-center">
                    <img 
                      src="/logo_max_ai.png" 
                      alt="MAX AI" 
                      className="w-full h-auto max-w-[320px] sm:max-w-[576px] lg:max-w-[825px] aspect-[2/1] rounded-2xl object-cover filter drop-shadow-[0_4px_20px_rgba(193,127,78,0.20)]"
                    />
                  </div>

                  <h1 className={`font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight uppercase ${themeStyles.title}`}>
                    {t.heroTitle1} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C17F4E] to-[#D79663]">{t.heroTitle2}</span> <br/> {lang === 'es' ? `${t.heroTitle3} ${t.heroTitle4}` : t.heroTitle3}
                  </h1>

                  <p className={`text-base sm:text-lg max-w-xl font-sans font-light leading-relaxed ${themeStyles.textMuted}`}>
                    {t.heroSub}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                    <button
                      onClick={() => setActivePage('portafolio')}
                      className="px-8 py-3.5 bg-[#C17F4E] text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-[#D79663] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C17F4E]/20 text-center flex items-center justify-center gap-2"
                    >
                      <span>{t.heroCta1}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => setActivePage('servicios')}
                      className={`px-8 py-3.5 rounded text-xs font-bold uppercase tracking-widest transition-all text-center border ${
                        isDark 
                          ? 'border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:bg-zinc-800' 
                          : 'border-[#D6D0C1] bg-[#FAF8F5] text-slate-800 hover:bg-[#F2EFE9]'
                      }`}
                    >
                      {t.heroCta2}
                    </button>
                  </div>

                  {/* Metrics Grid inside Hero */}
                  <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5 w-full max-w-lg mt-6">
                    <div className="border-l border-[#C17F4E]/40 pl-4">
                      <div className={`text-2xl font-mono font-bold tracking-tighter ${themeStyles.title}`}>3.5X</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{t.heroStat1}</div>
                    </div>
                    <div className="border-l border-[#C17F4E]/40 pl-4">
                      <div className={`text-2xl font-mono font-bold tracking-tighter ${themeStyles.title}`}>99.98%</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{t.heroStat2}</div>
                    </div>
                    <div className="border-l border-[#C17F4E]/40 pl-4">
                      <div className={`text-2xl font-mono font-bold tracking-tighter ${themeStyles.title}`}>85ms</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{t.heroStat3}</div>
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
                              : isDark ? 'bg-zinc-950/60 text-zinc-400 hover:bg-zinc-800' : 'bg-[#EAE6DB] text-[#4F5568] hover:bg-[#D0C9B8]'
                          }`}
                        >
                          {tab === 'trafico' ? (lang === 'es' ? 'Tráfico' : 'Traffic') : tab === 'conversion' ? (lang === 'es' ? 'Conversión' : 'Conversion') : (lang === 'es' ? 'Latencia' : 'Latency')}
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
                isDark ? 'bg-zinc-950/40 border-white/5' : 'bg-[#EAE6DB] border-[#D0C9B8]'
              }`}
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{t.probBadge}</span>
                  <h2 className={`font-display font-bold text-3xl sm:text-4xl tracking-tight uppercase mt-2 ${themeStyles.title}`}>
                    {t.probTitle}
                  </h2>
                  <p className={`text-sm font-sans font-light mt-3 ${themeStyles.textMuted}`}>
                    {t.probSub}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  {/* Traditional Failures */}
                  <div className={`p-8 rounded-xl border ${isDark ? 'bg-zinc-950/60 border-red-500/10' : 'bg-[#FAF8F5] border-red-200/60 shadow-sm'}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded bg-red-500/10 text-red-500">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-sm text-red-500 uppercase tracking-widest">{t.probCard1Title}</h3>
                    </div>
                    <ul className="space-y-4">
                      {t.probCard1Items.map((fail, i) => (
                        <li key={i} className="flex gap-3 text-xs sm:text-sm">
                          <span className="text-red-500 font-bold">✕</span>
                          <span className={themeStyles.textMuted}>{fail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* MAX AI Standards */}
                  <div className={`p-8 rounded-xl border ${isDark ? 'bg-[#061426]/55 border-[#C17F4E]/20 shadow-[0_0_20px_rgba(193,127,78,0.05)]' : 'bg-[#FAF8F5] border-[#C17F4E]/20 shadow-md'}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded bg-[#C17F4E]/10 text-[#C17F4E]">
                        <Check className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-sm text-[#C17F4E] uppercase tracking-widest">{t.probCard2Title}</h3>
                    </div>
                    <ul className="space-y-4">
                      {t.probCard2Items.map((succ, i) => (
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
                <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{t.metBadge}</span>
                <h2 className={`font-display font-bold text-3xl sm:text-4xl uppercase mt-2 ${themeStyles.title}`}>
                  {t.metTitle}
                </h2>
                <p className={`text-sm font-sans font-light mt-3 ${themeStyles.textMuted}`}>
                  {t.metSub}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                {/* Pilar buttons (Timeline left) */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  {[
                    { number: '01', title: t.metPilar1Title, label: t.metPilar1Sub },
                    { number: '02', title: t.metPilar2Title, label: t.metPilar2Sub },
                    { number: '03', title: t.metPilar3Title, label: t.metPilar3Sub },
                    { number: '04', title: t.metPilar4Title, label: t.metPilar4Sub }
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePilar(idx)}
                      className={`p-4 rounded-lg border text-left transition-all flex items-center gap-4 ${
                        activePilar === idx
                          ? 'border-[#C17F4E] bg-[#C17F4E]/10 shadow-md'
                          : isDark ? 'border-zinc-800 bg-zinc-900/20 hover:bg-zinc-850' : 'border-[#D6D0C1] bg-[#FAF8F5] hover:bg-[#F2EFE9]'
                      }`}
                    >
                      <span className={`font-mono text-lg font-bold ${activePilar === idx ? 'text-[#C17F4E]' : 'text-zinc-500'}`}>
                        {p.number}
                      </span>
                      <div className="flex-1">
                        <h4 className={`text-xs font-bold uppercase tracking-wider ${activePilar === idx ? (isDark ? 'text-white' : 'text-[#020813]') : isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
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
                      <span className="text-[#C17F4E] font-mono text-[10px] uppercase tracking-widest font-bold">{t.metDetailTitle}</span>
                      <h3 className={`text-xl sm:text-2xl font-display font-bold uppercase ${themeStyles.title}`}>
                        {t.metPilarDetailTitles[activePilar]}
                      </h3>
                      <p className={`text-sm leading-relaxed ${themeStyles.textMuted}`}>
                        {t.metPilarDetailSubs[activePilar]}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 mt-6">
                      <div>
                        <h5 className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest font-bold">{t.metMetricTitle}</h5>
                        <p className="font-mono text-xs font-bold text-[#C17F4E]">
                          {t.metPilarMetrics[activePilar]}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest font-bold">{t.metStatusTitle}</h5>
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
                <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{t.servBadge}</span>
                <h1 className={`font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl uppercase mt-3 leading-none ${themeStyles.title}`}>
                  {t.servTitle}
                </h1>
                <p className={`text-base sm:text-lg font-sans font-light mt-4 leading-relaxed max-w-2xl ${themeStyles.textMuted}`}>
                  {t.servSub}
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
                    <h3 className={`font-display font-bold text-lg uppercase mb-3 ${themeStyles.title}`}>{t.servCard1Title}</h3>
                    <p className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${themeStyles.textMuted}`}>
                      {t.servCard1Sub}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/5 mt-6 font-mono text-[10px] text-zinc-500">
                    {t.servCard1Foot}
                  </div>
                </div>

                {/* High Performance React Card */}
                <div className={`p-6 rounded-xl border flex flex-col justify-between ${themeStyles.card}`}>
                  <div>
                    <div className="w-12 h-12 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <h3 className={`font-display font-bold text-lg uppercase mb-3 ${themeStyles.title}`}>{t.servCard2Title}</h3>
                    <p className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${themeStyles.textMuted}`}>
                      {t.servCard2Sub}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/5 mt-6 font-mono text-[10px] text-zinc-500">
                    {t.servCard2Foot}
                  </div>
                </div>

                {/* Meta Graph Integrations Card */}
                <div className={`p-6 rounded-xl border flex flex-col justify-between ${themeStyles.card}`}>
                  <div>
                    <div className="w-12 h-12 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                      <Database className="w-6 h-6" />
                    </div>
                    <h3 className={`font-display font-bold text-lg uppercase mb-3 ${themeStyles.title}`}>{t.servCard3Title}</h3>
                    <p className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${themeStyles.textMuted}`}>
                      {t.servCard3Sub}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/5 mt-6 font-mono text-[10px] text-zinc-500">
                    {t.servCard3Foot}
                  </div>
                </div>

              </div>
            </section>

            {/* --- SOLUCIÓN CONFIGURATOR INTERACTIVO --- */}
            <section className={`py-20 px-6 sm:px-10 lg:px-16 border-t ${isDark ? 'bg-zinc-950/40 border-white/5' : 'bg-[#EAE6DB] border-[#D0C9B8]'}`}>
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{t.confBadge}</span>
                  <h2 className={`font-display font-bold text-3xl sm:text-4xl uppercase mt-2 ${themeStyles.title}`}>
                    {t.confTitle}
                  </h2>
                  <p className={`text-sm font-sans font-light mt-3 ${themeStyles.textMuted}`}>
                    {t.confSub}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Modules Checklist (Left 7 Columns) */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    {MODULES.map((m) => {
                      const isSelected = selectedModules.includes(m.id);
                      const translatedName = lang === 'es' ? m.name : (m.id === 'meta_b2c' ? 'B2C Ecosystem + Meta Catalog' : m.id === 'landing_crm' ? 'Landing Page Lead Gen + CRM' : m.id === 'custom_ml' ? 'Custom AI & ML Model' : m.id === 'whatsapp_flow' ? 'WhatsApp Cloud API Flows' : 'Metrics Dashboard & Firestore Sync');
                      const translatedDesc = lang === 'es' ? m.description : (m.id === 'meta_b2c' ? 'Automated inventory sync to Meta Graph API, conversion pixels, and Instagram lookbooks.' : m.id === 'landing_crm' ? 'Ultra-fast design optimized for conversion with SEO indexing and native CRM connection.' : m.id === 'custom_ml' ? 'Predictive cognitive models trained with your business data to forecast demand or automate flows.' : m.id === 'whatsapp_flow' ? 'Smart automated customer care with hybrid AI agents to answer stock queries and book appointments.' : 'Real-time interactive panel for management administration with high-speed NoSQL database.');
                      const translatedCat = lang === 'es' ? m.category : (m.category === 'Ventas e Integraciones' ? 'Sales & Integrations' : m.category === 'Infraestructura Web' ? 'Web Infrastructure' : 'Artificial Intelligence');
                      return (
                        <div
                          key={m.id}
                          onClick={() => toggleModule(m.id)}
                          className={`p-5 rounded-lg border cursor-pointer transition-all flex items-start gap-4 ${
                            isSelected
                              ? 'border-[#C17F4E] bg-[#C17F4E]/5 shadow-md'
                              : isDark ? 'border-zinc-800 bg-zinc-900/20 hover:border-zinc-750' : 'border-[#D6D0C1] bg-[#FAF8F5] hover:border-[#CAC6B7] shadow-sm'
                          }`}
                        >
                          <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all ${
                            isSelected ? 'bg-[#C17F4E] border-[#C17F4E] text-white' : 'border-zinc-500 bg-transparent'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-baseline flex-wrap gap-2">
                              <h4 className={`font-display font-bold text-sm uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#020813]'}`}>{translatedName}</h4>
                              <span className="font-mono text-xs text-[#C17F4E] font-semibold">${m.price} USD</span>
                            </div>
                            <p className="text-xs text-zinc-500 font-sans mt-1 leading-relaxed">{translatedDesc}</p>
                            <div className="flex gap-4 mt-2.5">
                              <span className="font-mono text-[10px] text-zinc-500 uppercase">{lang === 'es' ? 'TIEMPO ESTIMADO' : 'ESTIMATED TIME'}: {m.durationWeeks} {lang === 'es' ? 'SEMANAS' : 'WEEKS'}</span>
                              <span className="font-mono text-[10px] text-zinc-500 uppercase">•</span>
                              <span className="font-mono text-[10px] text-zinc-500 uppercase">{translatedCat}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Calculations and CTA Card (Right 5 Columns) */}
                  <div className="lg:col-span-5">
                    <div className={`p-6 rounded-xl border ${themeStyles.card}`}>
                      <h3 className={`font-display font-bold text-sm uppercase tracking-widest border-b border-white/5 pb-4 mb-6 ${themeStyles.title}`}>
                        {t.confSumTitle}
                      </h3>

                      <div className="space-y-4">
                        <div className="flex justify-between font-sans">
                          <span className="text-xs text-zinc-500 font-semibold uppercase">{t.confSumMod}</span>
                          <span className={`text-xs font-mono font-bold ${isDark ? 'text-white' : 'text-[#020813]'}`}>{selectedModules.length}</span>
                        </div>
                        
                        <div className="flex justify-between font-sans">
                          <span className="text-xs text-zinc-500 font-semibold uppercase">{t.confSumTime}</span>
                          <span className={`text-xs font-mono font-bold ${isDark ? 'text-white' : 'text-[#020813]'}`}>~ {configuratorDuration} {t.confSumTimeWeeks}</span>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex justify-between items-baseline mt-4">
                          <span className="text-xs font-mono font-bold uppercase text-zinc-400">{t.confSumBudget}</span>
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
                            <span>{t.confSumCta}</span>
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
            {/* --- GALLERY CASOS DE ÉXITO --- */}
            <section className="relative py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{t.csBadge}</span>
                <h1 className={`font-display font-extrabold text-4xl sm:text-5xl uppercase mt-2 ${themeStyles.title}`}>
                  {t.csTitle}
                </h1>
                <p className={`text-sm font-sans font-light mt-3 ${themeStyles.textMuted}`}>
                  {t.csSub}
                </p>
              </div>

              {/* Grid of Case Studies */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                {CASE_STUDIES.map((c, i) => (
                  <CaseStudyCard key={i} c={c} isDark={isDark} themeStyles={themeStyles} lang={lang} />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ======================================= */}
        {/*         PAGE 4: LOGIN & SISTEMA         */}
        {/* ======================================= */}
        {activePage === 'login' && (
          <div className="fade-in">
            {!currentUser ? (
              /* PREMIUM LOGIN CARD */
              <section className="py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
                <div className="text-center max-w-xl mx-auto w-full">
                  <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">
                    {lang === 'es' ? 'Acceso al Sistema' : 'System Access'}
                  </span>
                  <h1 className={`font-display font-extrabold text-4xl sm:text-5xl uppercase mt-2 mb-4 ${themeStyles.title}`}>
                    {lang === 'es' ? 'Iniciar Sesión' : 'Login'}
                  </h1>
                  <p className={`text-sm font-sans font-light mb-10 ${themeStyles.textMuted}`}>
                    {lang === 'es' 
                      ? 'Si eres miembro del equipo, accede para gestionar leads, formularios y proyectos. Si eres cliente, inicia sesión para monitorear el progreso de tus desarrollos.'
                      : 'If you are a team member, access to manage leads, forms, and projects. If you are a client, log in to monitor the progress of your developments.'}
                  </p>

                  <div className={`p-8 sm:p-12 rounded-2xl border backdrop-blur-md relative overflow-hidden ${themeStyles.card}`}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#C17F4E]/5 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="w-16 h-16 rounded-full bg-[#C17F4E]/10 text-[#C17F4E] flex items-center justify-center mx-auto mb-6 border border-[#C17F4E]/20">
                      <LogIn className="w-8 h-8" />
                    </div>
                    
                    <h3 className={`font-display font-black text-xl uppercase mb-3 ${themeStyles.title}`}>
                      {lang === 'es' ? 'Autenticación Protegida' : 'Secure Authentication'}
                    </h3>
                    
                    <p className={`text-xs sm:text-sm leading-relaxed mb-8 ${themeStyles.textMuted}`}>
                      {lang === 'es'
                        ? 'Utiliza tu cuenta corporativa o de cliente autorizada por Google para acceder.'
                        : 'Use your authorized corporate or client Google account to gain access.'}
                    </p>
                    
                    <button
                      onClick={handleGoogleSignIn}
                      className="w-full inline-flex items-center justify-center gap-3 bg-[#C17F4E] hover:bg-[#D79663] text-white px-8 py-4 rounded font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-lg cursor-pointer"
                    >
                      <span className="w-4 h-4 flex items-center justify-center bg-white rounded-full p-0.5">
                        <svg viewBox="0 0 24 24" className="w-full h-full text-zinc-950 fill-current">
                          <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.51 0-6.38-2.87-6.38-6.38s2.87-6.38 6.38-6.38c1.53 0 2.98.54 4.12 1.53l3.07-3.07C19.06 1.89 15.8 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c6.76 0 12.24-5.48 12.24-12.24 0-.84-.09-1.68-.26-2.455H12.24z"/>
                        </svg>
                      </span>
                      {lang === 'es' ? 'Entrar con Google' : 'Sign In with Google'}
                    </button>
                  </div>
                </div>
              </section>
            ) : (
              /* LOGGED IN SYSTEM / DASHBOARD */
              <div className="py-10 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
                {/* Header de Bienvenida y Perfil */}
                <div className={`p-6 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 ${themeStyles.card}`}>
                  <div className="flex items-center gap-4">
                    {currentUser.photoURL ? (
                      <img src={currentUser.photoURL} alt={currentUser.displayName || ''} className="w-12 h-12 rounded-full border border-[#C17F4E]/30" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#C17F4E]/10 text-[#C17F4E] flex items-center justify-center font-bold">
                        {currentUser.displayName?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-display font-bold text-sm uppercase ${themeStyles.title}`}>{currentUser.displayName || 'Usuario Google'}</h3>
                        <span className={`font-mono text-[9px] px-2 py-0.5 rounded tracking-wider uppercase font-bold ${
                          isAdminUser ? 'text-emerald-500 bg-emerald-500/10' : 'text-blue-500 bg-blue-500/10'
                        }`}>
                          {isAdminUser ? (lang === 'es' ? 'Administrador' : 'Administrator') : (lang === 'es' ? 'Cliente' : 'Client')}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 font-mono">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center self-stretch sm:self-auto justify-between sm:justify-end">
                    {googleAccessToken && (
                      <span className="font-mono text-[9px] text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded tracking-wider">{t.gfAuthStatus}</span>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="p-2 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider"
                      title={lang === 'es' ? 'Cerrar Sesión' : 'Sign Out'}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{lang === 'es' ? 'Cerrar Sesión' : 'Log Out'}</span>
                    </button>
                  </div>
                </div>

                {/* Dashboard Contents */}
                {isAdminUser ? (
                  /* VISTA DE ADMINISTRADOR */
                  <div className="space-y-6">
                    {/* Tabs de Navegación del Sistema (Solo para Admin) */}
                    <div className="flex border-b border-white/5 gap-6 text-[11px] font-semibold tracking-widest text-zinc-500 uppercase overflow-x-auto pb-0.5">
                      <button 
                        onClick={() => setPortfolioTab('leads')}
                        className={`pb-4 transition-all uppercase flex items-center gap-2 shrink-0 ${
                          portfolioTab === 'leads' 
                            ? `${themeStyles.title} border-[#C17F4E] border-b-2` 
                            : isDark ? 'hover:text-white' : 'hover:text-[#020813]'
                        }`}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        {lang === 'es' ? 'Bandeja de Leads' : 'Leads Inbox'}
                      </button>
                      <button 
                        onClick={() => setPortfolioTab('forms')}
                        className={`pb-4 transition-all uppercase flex items-center gap-2 shrink-0 ${
                          portfolioTab === 'forms' 
                            ? `${themeStyles.title} border-[#C17F4E] border-b-2` 
                            : isDark ? 'hover:text-white' : 'hover:text-[#020813]'
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                        {lang === 'es' ? 'Sincronizador Google' : 'Google Forms Sync'}
                      </button>
                      <button 
                        onClick={() => setPortfolioTab('projects')}
                        className={`pb-4 transition-all uppercase flex items-center gap-2 shrink-0 ${
                          portfolioTab === 'projects' 
                            ? `${themeStyles.title} border-[#C17F4E] border-b-2` 
                            : isDark ? 'hover:text-white' : 'hover:text-[#020813]'
                        }`}
                      >
                        <Layers className="w-4 h-4" />
                        {lang === 'es' ? 'Gestión de Proyectos' : 'Projects Admin'}
                      </button>
                    </div>

                    {/* Contenidos de las Pestañas de Admin */}
                    {portfolioTab === 'leads' && (
                      <div className="fade-in">
                        {/* TAB 3 CONTENT: LEADS RECIBIDOS */}
                        <section className="py-8">
                          <div className="text-left mb-8">
                            <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{t.crmBadge}</span>
                            <h2 className={`font-display font-extrabold text-2xl sm:text-3xl uppercase mt-1 ${themeStyles.title}`}>
                              {t.crmTitle}
                            </h2>
                            <p className={`text-xs sm:text-sm font-sans font-light mt-1 ${themeStyles.textMuted}`}>
                              {t.crmSub}
                            </p>
                          </div>

                          <div className="space-y-6">
                            {receivedLeads.length === 0 ? (
                              <div className={`p-12 rounded-xl border text-center ${themeStyles.card}`}>
                                <Users className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                                <h4 className="font-display font-bold text-sm text-zinc-400 uppercase mb-2">
                                  {lang === 'es' ? 'Sin Leads' : 'No Leads'}
                                </h4>
                                <p className="text-xs text-zinc-500 font-sans">
                                  {lang === 'es' ? 'No se encontraron cotizaciones registradas.' : 'No quotes found.'}
                                </p>
                              </div>
                            ) : (
                              <div className="grid grid-cols-1 gap-6 font-sans">
                                {receivedLeads.map((lead) => {
                                  const dateStr = lead.createdAt && typeof lead.createdAt.toDate === 'function' 
                                    ? lead.createdAt.toDate().toLocaleString() 
                                    : 'Reciente';
                                  return (
                                    <div key={lead.id} className={`p-6 rounded-xl border text-left ${themeStyles.card}`}>
                                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 mb-4 gap-2">
                                        <div>
                                          <h3 className={`font-display font-black text-lg uppercase tracking-tight ${themeStyles.title}`}>{lead.companyName || lead.fullName || 'Empresa Anónima'}</h3>
                                          <p className="text-xs text-zinc-500 font-mono">{lead.fullName} • {lead.email}</p>
                                        </div>
                                        <div className="text-right sm:text-right">
                                          <span className="text-[10px] text-zinc-500 font-mono block">{dateStr}</span>
                                          <span className="text-[10px] text-[#C17F4E] font-mono block font-bold uppercase tracking-wider">{lead.selectedTier || 'Tier Personalizado'}</span>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                          <h4 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{lang === 'es' ? 'Especificaciones del Proyecto' : 'Project Specifications'}</h4>
                                          <div className="space-y-1 text-xs">
                                            <p><span className={`${themeStyles.textMuted}`}>{lang === 'es' ? 'Tipo:' : 'Type:'}</span> <span className="font-semibold">{lead.projectType || 'No especificado'}</span></p>
                                            <p><span className={`${themeStyles.textMuted}`}>{lang === 'es' ? 'Duración:' : 'Duration:'}</span> <span className="font-semibold">{lead.estimatedDurationWeeks || 'No especificado'} {lang === 'es' ? 'semanas' : 'weeks'}</span></p>
                                            <p><span className={`${themeStyles.textMuted}`}>{lang === 'es' ? 'Presupuesto:' : 'Budget:'}</span> <span className="font-semibold text-emerald-500">${lead.estimatedPrice || '0'}</span></p>
                                          </div>
                                        </div>

                                        <div className="space-y-2">
                                          <h4 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{lang === 'es' ? 'Módulos Seleccionados' : 'Selected Modules'}</h4>
                                          <div className="flex flex-wrap gap-1.5">
                                            {lead.selectedModules && Array.isArray(lead.selectedModules) && lead.selectedModules.length > 0 ? (
                                              lead.selectedModules.map((m: any, idx: number) => (
                                                <span key={idx} className="text-[9px] bg-zinc-800 border border-white/5 text-zinc-300 px-2 py-0.5 rounded font-mono uppercase">
                                                  {m.name || m}
                                                </span>
                                              ))
                                            ) : (
                                              <span className="text-xs text-zinc-500 italic">{lang === 'es' ? 'Ninguno' : 'None'}</span>
                                            )}
                                          </div>
                                        </div>

                                        <div className="space-y-2">
                                          <h4 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{lang === 'es' ? 'Contacto Adicional' : 'Additional Contact'}</h4>
                                          <div className="space-y-1 text-xs">
                                            <p><span className={`${themeStyles.textMuted}`}>{lang === 'es' ? 'Teléfono:' : 'Phone:'}</span> <span className="font-semibold">{lead.phone || 'No especificado'}</span></p>
                                            <p><span className={`${themeStyles.textMuted}`}>{lang === 'es' ? 'Mensaje:' : 'Message:'}</span> <span className="font-light">{lead.message || 'Sin mensaje adicional'}</span></p>
                                          </div>
                                          <div className="pt-2">
                                            <a 
                                              href={`https://wa.me/${lead.phone?.replace(/[^0-9]/g, '')}`} 
                                              target="_blank" 
                                              rel="noopener noreferrer" 
                                              className="inline-flex items-center gap-1 bg-[#25D366] text-white px-3 py-1 rounded text-[10px] font-mono font-bold uppercase hover:bg-[#20ba59] transition-all"
                                            >
                                              WhatsApp
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </section>
                      </div>
                    )}

                    {portfolioTab === 'forms' && (
                      <div className="fade-in">
                        {/* TAB 2 CONTENT: GOOGLE FORMS SYNCHRONIZER */}
                        <section className="py-8">
                          <div className="text-left mb-8">
                            <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{t.gfBadge}</span>
                            <h2 className={`font-display font-extrabold text-2xl sm:text-3xl uppercase mt-1 ${themeStyles.title}`}>
                              {t.gfTitle}
                            </h2>
                            <p className={`text-xs sm:text-sm font-sans font-light mt-1 ${themeStyles.textMuted}`}>
                              {t.gfSub}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                            {/* Columna Izquierda */}
                            <div className="lg:col-span-5 space-y-6 flex flex-col justify-start">
                              
                              {/* Enlazar Form */}
                              <div className={`p-6 rounded-xl border ${themeStyles.card}`}>
                                <h3 className={`font-display font-bold text-xs uppercase tracking-wider mb-4 ${themeStyles.title}`}>
                                  {lang === 'es' ? 'Enlazar Nuevo Formulario' : 'Link New Form'}
                                </h3>
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Google Form ID</label>
                                    <input 
                                      type="text" 
                                      placeholder="e.g. 1FAIpQLSfD..." 
                                      value={formInputId}
                                      onChange={(e) => setFormInputId(e.target.value)}
                                      className={`w-full p-3 rounded text-xs font-mono outline-none border transition-all ${themeStyles.input}`}
                                    />
                                    <span className="text-[10px] text-zinc-500 block mt-1.5 font-light leading-relaxed">
                                      {lang === 'es'
                                        ? 'Copia el ID largo de la URL de tu Google Form de edición.'
                                        : 'Copy the long ID from the URL of your editing Google Form.'}
                                    </span>
                                  </div>
                                  <button
                                    onClick={async () => {
                                      if (!formInputId || isCreatingForm) return;
                                      setIsCreatingForm(true);
                                      try {
                                        const newFormDoc = {
                                          formId: formInputId,
                                          userId: currentUser.uid,
                                          createdAt: serverTimestamp()
                                        };
                                        await setDoc(doc(db, 'userForms', formInputId), newFormDoc);
                                        setFormInputId('');
                                        alert(lang === 'es' ? "Formulario registrado con éxito." : "Form registered successfully.");
                                      } catch (err: any) {
                                        alert("Error: " + err.message);
                                      } finally {
                                        setIsCreatingForm(false);
                                      }
                                    }}
                                    disabled={isCreatingForm || !formInputId}
                                    className="w-full flex items-center justify-center gap-2 bg-[#C17F4E] hover:bg-[#D79663] text-white py-3 rounded text-xs font-mono font-bold uppercase tracking-widest transition-all cursor-pointer disabled:opacity-50"
                                  >
                                    <Plus className="w-4 h-4" />
                                    <span>{lang === 'es' ? 'Conectar Formulario' : 'Connect Form'}</span>
                                  </button>
                                </div>
                              </div>

                              {/* Formularios Conectados */}
                              <div className={`p-6 rounded-xl border flex-1 ${themeStyles.card}`}>
                                <div className="flex justify-between items-center mb-4">
                                  <h3 className={`font-display font-bold text-xs uppercase tracking-wider ${themeStyles.title}`}>
                                    {lang === 'es' ? 'Formularios Activos' : 'Active Forms'}
                                  </h3>
                                  <button
                                    onClick={fetchActiveFormFromGoogle}
                                    className="p-1.5 hover:bg-white/5 rounded transition-colors text-zinc-500 hover:text-white"
                                    title="Sincronizar manual"
                                  >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                {connectedForms.length === 0 ? (
                                  <div className="py-8 text-center border border-dashed border-white/5 rounded-lg">
                                    <p className="text-xs text-zinc-500 font-sans italic">{lang === 'es' ? 'Sin formularios vinculados en Firestore' : 'No forms linked in Firestore'}</p>
                                  </div>
                                ) : (
                                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                                    {connectedForms.map((f: any) => (
                                      <button
                                        key={f.id}
                                        onClick={() => setSelectedFormId(f.formId)}
                                        className={`w-full p-3 rounded border text-left text-xs font-mono flex items-center justify-between transition-all ${
                                          selectedFormId === f.formId 
                                            ? 'border-[#C17F4E] bg-[#C17F4E]/5 text-white' 
                                            : isDark ? 'border-white/5 bg-zinc-950/20 text-zinc-400 hover:border-white/10' : 'border-slate-200 bg-white/20 text-slate-700 hover:border-slate-300'
                                        }`}
                                      >
                                        <div className="truncate pr-2">
                                          <p className="font-bold text-[10px] uppercase tracking-wider truncate">ID: {f.formId}</p>
                                          <p className="text-[9px] text-zinc-500 mt-0.5">
                                            {lang === 'es' ? 'Registrado: ' : 'Linked: '}
                                            {f.createdAt && typeof f.createdAt.toDate === 'function' ? f.createdAt.toDate().toLocaleDateString() : 'Reciente'}
                                          </p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 shrink-0" />
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Columna Derecha */}
                            <div className="lg:col-span-7 flex flex-col justify-start">
                              <div className={`p-6 rounded-xl border flex-1 flex flex-col justify-between ${themeStyles.card}`}>
                                <div>
                                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                                    <h3 className={`font-display font-black text-sm uppercase tracking-wider ${themeStyles.title}`}>
                                      {lang === 'es' ? 'Estructura & Respuestas en Tiempo Real' : 'Structure & Real-Time Responses'}
                                    </h3>
                                    <span className="text-[9px] font-mono text-[#C17F4E] bg-[#C17F4E]/10 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                                      {selectedFormId ? (lang === 'es' ? 'Seleccionado' : 'Selected') : (lang === 'es' ? 'Ninguno' : 'None')}
                                    </span>
                                  </div>

                                  {isLoadingForms ? (
                                    <div className="py-24 text-center">
                                      <RefreshCw className="w-8 h-8 text-[#C17F4E] animate-spin mx-auto mb-4" />
                                      <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{lang === 'es' ? 'Consultando Google API...' : 'Querying Google API...'}</p>
                                    </div>
                                  ) : formsError ? (
                                    <div className="py-16 text-center max-w-md mx-auto">
                                      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                                      <h4 className="text-sm font-display font-bold text-zinc-400 uppercase mb-2">{lang === 'es' ? 'Error de Sincronización' : 'Sync Error'}</h4>
                                      <p className="text-xs text-zinc-500 font-sans leading-relaxed">{formsError}</p>
                                      <button
                                        onClick={handleGoogleSignIn}
                                        className="mt-6 bg-[#C17F4E]/10 border border-[#C17F4E]/20 text-[#C17F4E] hover:bg-[#C17F4E]/20 px-5 py-2.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider transition-all"
                                      >
                                        {lang === 'es' ? 'Re-Autorizar Google' : 'Re-Authorize Google'}
                                      </button>
                                    </div>
                                  ) : !selectedFormId ? (
                                    <div className="py-20 text-center text-zinc-500 font-sans italic">
                                      <p className="text-xs">{lang === 'es' ? 'Selecciona un formulario de la lista izquierda para consultar la API de Google.' : 'Select a form from the left list to query the Google API.'}</p>
                                    </div>
                                  ) : activeFormDetails ? (
                                    <div className="space-y-6 text-left">
                                      {/* Info Básica */}
                                      <div className={`p-4 rounded-lg border ${themeStyles.cardInner}`}>
                                        <h4 className={`font-display font-black text-sm uppercase ${themeStyles.title}`}>{activeFormDetails.info?.title || 'Formulario sin Título'}</h4>
                                        {activeFormDetails.info?.description && (
                                          <p className="text-xs text-zinc-500 font-sans mt-1 leading-relaxed">{activeFormDetails.info.description}</p>
                                        )}
                                        <div className="mt-4 flex gap-4 text-[9px] font-mono text-zinc-500 uppercase font-bold tracking-wider">
                                          <span>{lang === 'es' ? 'Preguntas:' : 'Questions:'} {activeFormDetails.items?.length || 0}</span>
                                          <span>{lang === 'es' ? 'Respuestas en Google:' : 'Responses in Google:'} {activeFormResponses.length}</span>
                                        </div>
                                      </div>

                                      {/* Preguntas */}
                                      <div className="space-y-3">
                                        <h4 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{lang === 'es' ? 'Estructura Analizada' : 'Parsed Structure'}</h4>
                                        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                                          {activeFormDetails.items?.map((item: any, idx: number) => (
                                            <div key={idx} className="p-3 bg-white/5 border border-white/5 rounded text-xs">
                                              <p className="font-mono text-zinc-400 text-[10px]">{lang === 'es' ? 'Item' : 'Item'} {idx + 1} • {item.questionItem?.question?.required ? 'Requerido' : 'Opcional'}</p>
                                              <p className={`font-semibold mt-0.5 ${themeStyles.title}`}>{item.title}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="py-20 text-center text-zinc-500 font-sans italic">
                                      <p className="text-xs">{lang === 'es' ? 'Conectado a la API. Sin datos parseados todavía.' : 'Connected to API. No parsed data yet.'}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    )}

                    {portfolioTab === 'projects' && (
                      <div className="fade-in">
                        {/* TAB 4 CONTENT: PROJECTS FOR ADMIN */}
                        <section className="py-8">
                          {renderProjectsSection()}
                        </section>
                      </div>
                    )}
                  </div>
                ) : (
                  /* VISTA DE CLIENTE DIRECTA */
                  <div className="fade-in">
                    {renderProjectsSection()}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activePage === 'contacto' && (
          <div className="fade-in py-16 lg:py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto relative">
            
            {/* Background Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#C17F4E]/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow-1"></div>
            
            {/* Header */}
            <div className="text-center mb-16 relative z-10">
              <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{lang === 'es' ? 'NÚCLEO DE COMUNICACIÓN' : 'COMMUNICATION CORE'}</span>
              <h1 className={`font-display font-extrabold text-4xl sm:text-5xl uppercase mt-3 tracking-tight ${themeStyles.title}`}>
                {t.contactTitle}
              </h1>
              <p className={`text-sm sm:text-base font-sans font-light mt-4 max-w-2xl mx-auto leading-relaxed ${themeStyles.textMuted}`}>
                {t.contactSub}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-start">
              
              {/* Left Side: Contact Information & Socials */}
              <div className="lg:col-span-5 space-y-8">
                
                {/* Channels card */}
                <div className={`p-8 rounded-xl border ${themeStyles.card}`}>
                  <h3 className={`font-display font-bold text-lg uppercase tracking-wider mb-6 ${themeStyles.title}`}>
                    {t.contactDetailsTitle}
                  </h3>
                  
                  <div className="space-y-6 font-sans">
                    
                    {/* WhatsApp */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded bg-emerald-500/10 text-emerald-500 shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs uppercase font-mono text-zinc-500 tracking-wider font-semibold">WhatsApp</h4>
                        <a 
                          href="https://wa.me/593983186044" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`text-base font-medium hover:text-[#C17F4E] transition-colors mt-1 block ${themeStyles.title}`}
                        >
                          +593 98 318 6044
                        </a>
                        <span className="text-[10px] text-zinc-500 font-mono">{lang === 'es' ? 'Soporte Inmediato 24/7' : 'Immediate Support 24/7'}</span>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded bg-[#C17F4E]/10 text-[#C17F4E] shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs uppercase font-mono text-zinc-500 tracking-wider font-semibold">Email</h4>
                        <a 
                          href="mailto:contacto@maxai.studio" 
                          className={`text-base font-medium hover:text-[#C17F4E] transition-colors mt-1 block ${themeStyles.title}`}
                        >
                          contacto@maxai.studio
                        </a>
                        <span className="text-[10px] text-zinc-500 font-mono">{lang === 'es' ? 'Respuesta en < 1 Hora' : 'Response in < 1 Hour'}</span>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded bg-blue-500/10 text-blue-400 shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs uppercase font-mono text-zinc-500 tracking-wider font-semibold">{t.contactOffice}</h4>
                        <p className={`text-sm mt-1 leading-relaxed ${themeStyles.textMuted}`}>
                          {t.contactOfficeLoc}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>



              </div>

              {/* Right Side: Contact Form */}
              <div className="lg:col-span-7">
                <div className={`p-8 rounded-xl border shadow-2xl relative ${themeStyles.card}`}>
                  
                  {contactFormValidationError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6 text-xs sm:text-sm font-sans flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{contactFormValidationError}</span>
                    </div>
                  )}

                  {!contactFormSubmitted ? (
                    <form onSubmit={handleContactFormSubmit} className="space-y-6">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                          <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold flex justify-between items-center">
                            <span>{t.contactLabelName} *</span>
                            {isContactFormNameValid && (
                              <span className="text-emerald-500 text-[10px] flex items-center gap-1 font-mono">
                                <Check className="w-3.5 h-3.5" /> Ok
                              </span>
                            )}
                          </label>
                          <input
                            type="text"
                            required
                            value={contactFormName}
                            onChange={(e) => setContactFormName(e.target.value)}
                            onBlur={() => handleFieldBlur('contactFormName')}
                            placeholder="Ej. Juan Pérez"
                            className={getInputClass('contactFormName', isContactFormNameValid, themeStyles)}
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold flex justify-between items-center">
                            <span>{t.contactLabelEmail} *</span>
                            {isContactFormEmailValid && (
                              <span className="text-emerald-500 text-[10px] flex items-center gap-1 font-mono">
                                <Check className="w-3.5 h-3.5" /> Ok
                              </span>
                            )}
                          </label>
                          <input
                            type="email"
                            required
                            value={contactFormEmail}
                            onChange={(e) => setContactFormEmail(e.target.value)}
                            onBlur={() => handleFieldBlur('contactFormEmail')}
                            placeholder="juan@empresa.com"
                            className={getInputClass('contactFormEmail', isContactFormEmailValid, themeStyles)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Phone */}
                        <div>
                          <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold flex justify-between items-center">
                            <span>{t.contactLabelPhone} *</span>
                            {isContactFormPhoneValid && (
                              <span className="text-emerald-500 text-[10px] flex items-center gap-1 font-mono">
                                <Check className="w-3.5 h-3.5" /> Ok
                              </span>
                            )}
                          </label>
                          <input
                            type="tel"
                            required
                            value={contactFormPhone}
                            onChange={(e) => setContactFormPhone(e.target.value)}
                            onBlur={() => handleFieldBlur('contactFormPhone')}
                            placeholder="Ej. +593 98 318 6044"
                            className={getInputClass('contactFormPhone', isContactFormPhoneValid, themeStyles)}
                          />
                        </div>

                        {/* Subject */}
                        <div>
                          <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold">
                            {t.contactLabelSubject}
                          </label>
                          <input
                            type="text"
                            value={contactFormSubject}
                            onChange={(e) => setContactFormSubject(e.target.value)}
                            placeholder="Ej. Desarrollo de Software / Consultoría"
                            className={`w-full p-3 rounded text-sm transition-all duration-300 outline-none border ${themeStyles.input}`}
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold flex justify-between items-center">
                          <span>{t.contactLabelMessage} *</span>
                          {contactFormMessage.trim().length >= 10 && (
                            <span className="text-emerald-500 text-[10px] flex items-center gap-1 font-mono">
                              <Check className="w-3.5 h-3.5" /> Ok
                            </span>
                          )}
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={contactFormMessage}
                          onChange={(e) => setContactFormMessage(e.target.value)}
                          onBlur={() => handleFieldBlur('contactFormMessage')}
                          placeholder="Cuéntanos sobre tu proyecto o consulta en detalle..."
                          className={getInputClass('contactFormMessage', contactFormMessage.trim().length >= 10, themeStyles)}
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={contactFormLoading}
                        className="w-full py-4 bg-[#C17F4E] text-white text-xs font-mono font-bold uppercase tracking-widest rounded hover:bg-[#D79663] disabled:bg-zinc-800 disabled:text-zinc-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#C17F4E]/10"
                      >
                        <Send className="w-4 h-4 animate-pulse" />
                        <span>{contactFormLoading ? t.contactBtnSubmitting : t.contactBtnSubmit}</span>
                      </button>

                    </form>
                  ) : (
                    <div className="text-center py-12 space-y-6 fade-in">
                      <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                        <CheckCircle className="w-8 h-8 animate-bounce" />
                      </div>
                      <h3 className={`font-display font-bold text-2xl uppercase ${themeStyles.title}`}>
                        {t.contactSuccessTitle}
                      </h3>
                      <p className={`text-sm leading-relaxed max-w-md mx-auto ${themeStyles.textMuted}`}>
                        {t.contactSuccessSub}
                      </p>
                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* --- PREMIUM FOOTER --- */}
      <footer className={`border-t py-12 transition-colors duration-500 ${isDark ? 'bg-zinc-950/80 border-white/5 text-zinc-400' : 'bg-[#FAF8F5] border-[#D6D0C1] text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row justify-between items-center gap-6 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          <div className="flex gap-6 flex-wrap justify-center">
            <span>© 2026 MAX AI STUDIO</span>
            <span className="text-zinc-700">|</span>
            <span>{t.footText}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <span className="text-zinc-400">{t.footServer}</span>
            </div>
            <span className="text-zinc-700">|</span>
            <a href="https://wa.me/593983186044" target="_blank" rel="noopener noreferrer" className="hover:text-[#C17F4E] transition-colors">WHATSAPP</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/593983186044"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
        title={lang === 'es' ? 'Chatea con nosotros' : 'Chat with us'}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 448 512" 
          className="w-6 h-6 fill-current transition-transform duration-300 group-hover:rotate-12"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>
      </a>

    </div>
  );
}
