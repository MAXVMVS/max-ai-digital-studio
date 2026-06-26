import React, { useState, useEffect, useMemo } from 'react';
import { 
  Brain, Cpu, Layers, Zap, Sparkles, Code2, Database, Network, 
  ArrowRight, Check, CheckCircle2, ArrowLeft, Sun, Moon, Menu, X, 
  ExternalLink, TrendingUp, Users, ChevronRight, Send, AlertTriangle, HelpCircle,
  FolderKanban, LayoutDashboard, LogOut, LogIn, Plus, RefreshCw, FileText, CheckCircle, CircleUser,
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
  const [activePage, setActivePage] = useState<'inicio' | 'precios' | 'portafolio' | 'contacto' | 'login'>(() => {
    const saved = localStorage.getItem('maxai_active_page');
    return (saved as 'inicio' | 'precios' | 'portafolio' | 'contacto' | 'login') || 'inicio';
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
  const [activeWeek, setActiveWeek] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Configurator Selected modules state
  const [selectedModules, setSelectedModules] = useState<string[]>(['meta_b2c', 'whatsapp_flow']);

  // Dynamic process stream log state
  const [logs, setLogs] = useState<string[]>(INITIAL_LOGS);

  // Onboarding multistep form states
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [companyName, setCompanyName] = useState<string>('');
  const [industry, setIndustry] = useState<string>('Tecnología');
  const [companySize, setCompanySize] = useState<string>('1-10 empleados');
  const [digitalMaturity, setDigitalMaturity] = useState<string>('');
  const [bottleneck, setBottleneck] = useState<string>('');
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
    setActivePage('inicio');
    // Focus or scroll to the onboarding container
    setTimeout(() => {
      const element = document.getElementById('diagnostico');
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
      companyName: true,
      contactName: true,
      contactEmail: true,
      contactPhone: true
    }));

    if (!isContactNameValid) {
      setValidationError(lang === 'es' ? 'Por favor ingresa tu nombre completo (mínimo 3 caracteres).' : 'Please enter your full name (minimum 3 characters).');
      return;
    }
    if (!isCompanyNameValid) {
      setValidationError(lang === 'es' ? 'Por favor ingresa el nombre de tu negocio o empresa (mínimo 3 caracteres).' : 'Please enter your company or business name (minimum 3 characters).');
      return;
    }
    if (!isContactEmailValid) {
      setValidationError(lang === 'es' ? 'Por favor ingresa un correo electrónico válido.' : 'Please enter a valid email address.');
      return;
    }
    if (!isContactPhoneValid) {
      setValidationError(lang === 'es' ? 'Por favor ingresa un número de WhatsApp de contacto válido (mínimo 8 dígitos).' : 'Please enter a valid contact WhatsApp number (minimum 8 digits).');
      return;
    }
    if (!bottleneck) {
      setValidationError(lang === 'es' ? 'Por favor selecciona el mayor obstáculo para tu crecimiento.' : 'Please select the biggest obstacle to your growth.');
      return;
    }
    if (!digitalMaturity) {
      setValidationError(lang === 'es' ? 'Por favor selecciona un rango de presupuesto estimado.' : 'Please select an estimated budget range.');
      return;
    }

    const selectedModuleNames = selectedModules
      .map(id => MODULES.find(m => m.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const leadId = `lead_${Math.random().toString(36).substring(2, 11)}`;
    const leadData = {
      companyName: companyName.trim(),
      contactName: contactName.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      customMessage: customMessage.trim() || 'Sin sitio web (Opcional)',
      bottleneck: bottleneck.trim(),
      digitalMaturity: digitalMaturity.trim(),
      selectedModules,
      configuratorTotal: selectedModules.length > 0 ? configuratorTotal : null,
      configuratorDuration: selectedModules.length > 0 ? configuratorDuration : null,
      createdAt: serverTimestamp(),
      userId: currentUser?.uid || null,
      status: 'pending',
      industry: 'Servicios',
      companySize: '1-10 empleados'
    };

    try {
      await setDoc(doc(db, 'onboarding', leadId), leadData);
    } catch (error) {
      console.error('Error recording lead in Firestore:', error);
    }

    const textPayload = `⚡ *MAX AI - DIAGNÓSTICO DIGITAL GRATUITO* ⚡\n\n` +
      `👤 *Nombre Completo:* ${contactName.trim()}\n` +
      `🏢 *Negocio / Empresa:* ${companyName.trim()}\n` +
      `📧 *Correo Electrónico:* ${contactEmail.trim()}\n` +
      `📱 *WhatsApp de Contacto:* ${contactPhone.trim()}\n` +
      `🌐 *Sitio Web Actual:* ${customMessage.trim() || 'No especificado (Opcional)'}\n\n` +
      `🛑 *Mayor Obstáculo:* ${bottleneck}\n` +
      `💰 *Presupuesto Estimado:* ${digitalMaturity}\n` +
      (selectedModules.length > 0 ? `🛠️ *Módulos Configurados:* ${selectedModuleNames} ($${configuratorTotal} USD / ~${configuratorDuration} semanas)\n` : '') +
      `\n_Enviado desde el Sistema de Diagnóstico de MAX AI._`;

    const whatsappUrl = `https://wa.me/593983186044?text=${encodeURIComponent(textPayload)}`;

    setFormSubmitted(true);

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1500);
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
    // Nav & General
    home: lang === 'es' ? 'Inicio' : 'Home',
    services: lang === 'es' ? 'Precios' : 'Pricing',
    portfolio: lang === 'es' ? 'Portafolio' : 'Portfolio',
    contact: lang === 'es' ? 'Contacto' : 'Contact',
    portHeader: lang === 'es' ? 'Portafolio' : 'Portfolio',
    whatsappBtn: lang === 'es' ? 'WHATSAPP DIRECTO' : 'WHATSAPP DIRECT',
    login: lang === 'es' ? 'Login' : 'Login',
    system: lang === 'es' ? 'Sistema' : 'System',
    dashboard: lang === 'es' ? 'Dashboard' : 'Dashboard',
    portal: lang === 'es' ? 'Mi Portal' : 'My Portal',

    // Hero
    heroBadge: lang === 'es' ? 'NÚCLEO v5.0 ACTIVO • QUITO, EC' : 'CORE v5.0 ACTIVE • QUITO, EC',
    heroTitle1: lang === 'es' ? 'NO CONSTRUIMOS' : 'WE DON\'T BUILD',
    heroTitle2: lang === 'es' ? 'SITIOS WEB AISLADOS.' : 'ISOLATED WEBSITES.',
    heroTitle3: lang === 'es' ? 'DISEÑAMOS SISTEMAS' : 'WE DESIGN DIGITAL',
    heroTitle4: lang === 'es' ? 'DE CRECIMIENTO DIGITAL.' : 'GROWTH SYSTEMS.',
    heroSub: lang === 'es'
      ? 'Ayudamos a profesionales independientes, negocios locales y pequeñas empresas a unificar su marca, consolidar su presencia web y automatizar sus operaciones con Inteligencia Artificial. Menos trabajo manual, más clientes y crecimiento sostenible.'
      : 'We help independent professionals, local businesses, and small companies unify their brand, consolidate their web presence, and automate their operations with Artificial Intelligence. Less manual work, more clients, and sustainable growth.',
    heroCta1: lang === 'es' ? 'Reservar Diagnóstico Digital (45 Min)' : 'Book Digital Diagnostic (45 Min)',
    heroCta1Sub: lang === 'es' ? 'Totalmente gratuito. Sin compromisos de contratación.' : 'Totally free. No hiring commitment.',
    heroCta2: lang === 'es' ? 'Conocer los 4 Pilares' : 'Discover the 4 Pillars',
    heroTagline: lang === 'es' 
      ? 'Infraestructura de alto rendimiento: Despliegue moderno, soporte documentado y optimización para motores de IA.'
      : 'High-performance infrastructure: Modern deployment, documented support, and optimization for AI engines.',
    heroStat1: lang === 'es' ? 'Conversión' : 'Conversion',
    heroStat2: lang === 'es' ? 'Uptime' : 'Uptime',
    heroStat3: lang === 'es' ? 'Latencia' : 'Latency',

    // Section 3: El Problema
    probBadge: lang === 'es' ? 'El Problema' : 'The Problem',
    probTitle: lang === 'es' ? '¿Tu negocio sufre de presencia digital fragmentada?' : 'Does your business suffer from a fragmented digital presence?',
    probSub: lang === 'es'
      ? 'Muchos profesionales y PYMEs creen que para crecer en internet basta con contratar un logotipo por un lado, una página web básica por otro y pagarle a un tercero para que "suba publicaciones" a redes sociales. El resultado de este enfoque fragmentado suele ser el mismo: poca conversión, procesos ineficientes y dinero desperdiciado.'
      : 'Many professionals and SMEs believe that to grow online it is enough to hire a logo on one side, a basic website on another, and pay a third party to "post" on social networks. The result of this fragmented approach is usually the same: low conversion, inefficient processes, and wasted money.',
    probSymptoms: lang === 'es' ? [
      {
        title: 'Imagen poco profesional e inconsistente',
        desc: 'Tu marca no refleja el valor de tu trabajo, transmitiendo desconfianza a los clientes con mayor presupuesto.'
      },
      {
        title: 'Sitios web que no convierten',
        desc: 'Páginas que actúan como "tarjetas de presentación" bonitas, pero que no retienen la atención de las visitas ni agendan citas.'
      },
      {
        title: 'Procesos manuales ineficientes',
        desc: 'Sigues respondiendo las mismas dudas en WhatsApp una y otra vez, perdiendo horas valiosas en tareas administrativas repetitivas.'
      },
      {
        title: 'Ausencia de métricas claras',
        desc: 'No sabes de dónde vienen tus clientes ideales, cuánto te cuesta adquirirlos ni qué canales digitales están funcionando realmente.'
      },
      {
        title: 'Invisibilidad ante las nuevas tecnologías',
        desc: 'Tu contenido no está optimizado para los buscadores con Inteligencia Artificial (ChatGPT, Gemini, Perplexity), limitando tu captación del futuro.'
      }
    ] : [
      {
        title: 'Unprofessional & Inconsistent Image',
        desc: 'Your brand does not reflect the value of your work, transmitting distrust to clients with larger budgets.'
      },
      {
        title: 'Websites that Do Not Convert',
        desc: 'Pages that act as pretty "business cards" but fail to retain visitors\' attention or book appointments.'
      },
      {
        title: 'Inefficient Manual Processes',
        desc: 'You keep answering the same questions on WhatsApp over and over, wasting valuable hours on repetitive admin tasks.'
      },
      {
        title: 'Absence of Clear Metrics',
        desc: 'You do not know where your ideal clients come from, how much it costs to acquire them, or which digital channels actually work.'
      },
      {
        title: 'Invisibility to New Technologies',
        desc: 'Your content is not optimized for AI search engines (ChatGPT, Gemini, Perplexity), limiting your future customer acquisition.'
      }
    ],

    // Section 4: El Sistema (La Solución)
    systBadge: lang === 'es' ? 'La Solución' : 'The Solution',
    systTitle: lang === 'es' ? 'Un engranaje unificado. Cuatro pilares de crecimiento.' : 'A unified gear. Four pillars of growth.',
    systSub: lang === 'es'
      ? 'En MAX AI - Digital Studio no vendemos tecnología. Vendemos crecimiento empresarial. Un sistema de crecimiento digital es una estructura viva e integrada donde cada pieza ayuda a la siguiente.'
      : 'At MAX AI - Digital Studio we do not sell technology. We sell business growth. A digital growth system is a living and integrated structure where each piece helps the next.',
    systPillar1Title: lang === 'es' ? 'Posicionamiento' : 'Positioning',
    systPillar1Sub: lang === 'es' ? 'Branding Estratégico' : 'Strategic Branding',
    systPillar2Title: lang === 'es' ? 'Presencia' : 'Presence',
    systPillar2Sub: lang === 'es' ? 'Web Premium' : 'Premium Web',
    systPillar3Title: lang === 'es' ? 'Captación' : 'Acquisition',
    systPillar3Sub: lang === 'es' ? 'Marketing Digital' : 'Digital Marketing',
    systPillar4Title: lang === 'es' ? 'Escalabilidad' : 'Scalability',
    systPillar4Sub: lang === 'es' ? 'IA & Automatización' : 'AI & Automation',

    systPillarDetails: lang === 'es' ? [
      {
        title: 'Pilar 1: Posicionamiento (Branding Estratégico)',
        concept: 'La base de la confianza. Diseñamos identidades visuales que comunican autoridad y diferencian tu negocio de la competencia.',
        focus: 'No diseñamos logotipos sueltos. Construimos sistemas visuales coherentes, tipografías personalizadas y manuales de marca prácticos para que tu negocio sea reconocible al instante.'
      },
      {
        title: 'Pilar 2: Presencia (Desarrollo Web Premium)',
        concept: 'Tu plataforma comercial central. Desarrollamos portales web de alto rendimiento optimizados para retener al visitante y convertirlo en cliente.',
        focus: 'Sitios web responsivos que cargan en milisegundos, estructurados de forma estratégica y diseñados con estándares de experiencia de usuario (UX) premium.'
      },
      {
        title: 'Pilar 3: Captación (Marketing Digital)',
        concept: 'Flujo constante de prospectos. Implementamos embudos de venta y campañas enfocadas en atraer personas con alta intención de compra.',
        focus: 'Estrategias que unifican el posicionamiento orgánico (SEO) y pauta digital inteligente para llevar tráfico calificado hacia tu sistema de captación.'
      },
      {
        title: 'Pilar 4: Escalabilidad (IA & Automatización)',
        concept: 'Eficiencia operativa. Integramos herramientas y agentes inteligentes que procesan solicitudes de clientes, agendan citas y eliminan tareas manuales.',
        focus: 'Automatizamos tus flujos comerciales (chats, correos electrónicos, CRM) para que tu negocio pueda atender clientes 24/7 sin sobrecargar tu agenda.'
      }
    ] : [
      {
        title: 'Pillar 1: Positioning (Strategic Branding)',
        concept: 'The foundation of trust. We design visual identities that communicate authority and differentiate your business from the competition.',
        focus: 'We do not design loose logos. We build coherent visual systems, custom typography, and practical brand guidelines to make your business instantly recognizable.'
      },
      {
        title: 'Pillar 2: Presence (Premium Web Development)',
        concept: 'Your central business platform. We develop high-performance web portals optimized to retain visitors and convert them into clients.',
        focus: 'Responsive websites that load in milliseconds, strategically structured and designed with premium User Experience (UX) standards.'
      },
      {
        title: 'Pillar 3: Acquisition (Digital Marketing)',
        concept: 'Constant flow of prospects. We implement sales funnels and campaigns focused on attracting people with high purchase intent.',
        focus: 'Strategies that unify organic positioning (SEO) and smart digital ads to drive qualified traffic to your acquisition system.'
      },
      {
        title: 'Pillar 4: Scalability (AI & Automation)',
        concept: 'Operational efficiency. We integrate smart tools and agents that process client requests, schedule appointments, and eliminate manual tasks.',
        focus: 'We automate your business workflows (chats, emails, CRM) so your business can serve clients 24/7 without overloading your schedule.'
      }
    ],

    // Section 6: Cómo Trabajamos
    metBadge: lang === 'es' ? 'Metodología' : 'Methodology',
    metTitle: lang === 'es' ? 'Cronograma en 8 Semanas' : '8-Week Timeline',
    metSub: lang === 'es'
      ? 'El desorden retrasa los proyectos. En MAX AI eliminamos la improvisación. Diseñamos tus activos digitales bajo un cronograma estricto que protege tu inversión y nuestro tiempo de entrega.'
      : 'Disorder delays projects. At MAX AI we eliminate improvisation. We design your digital assets under a strict schedule that protects your investment and our delivery time.',
    metWeeks: lang === 'es' ? [
      {
        number: 'Sem 1-2',
        title: 'Recolección y Control de Insumos',
        action: 'Qué hacemos: Damos inicio al proyecto y habilitamos una carpeta compartida en la nube para que deposites tus logotipos, imágenes corporativas, descripciones de servicios, biografías y datos de contacto.',
        rule: 'Regla Profesional: Bloqueo Operativo Estricto. Si al finalizar la semana 2 los insumos clave no están completos, el cronograma se detiene y se desplaza día a día. Esto nos ayuda a cumplir los plazos de todos los proyectos de manera justa.'
      },
      {
        number: 'Sem 3',
        title: 'Despliegue en Vivo (Staging)',
        action: 'Qué hacemos: No esperamos al final para mostrarte el resultado. Desplegamos una versión preliminar funcional en un enlace temporal de pruebas (ej. tuproyecto-staging.vercel.app).',
        rule: 'Tu beneficio: Puedes revisar el progreso en tiempo real y ver cómo se adaptan los textos y botones directamente desde tu teléfono móvil. El feedback de diseño ocurre sobre código real, no sobre dibujos planos.'
      },
      {
        number: 'Sem 4',
        title: 'Infraestructura y Dominio Oficial',
        action: 'Qué hacemos: Vinculamos el dominio de marca oficial (ej. tunegocio.com) con certificado de seguridad SSL activo.',
        rule: 'Tu beneficio: Adquirimos el dominio bajo tu nombre y datos de facturación para garantizar que seas el dueño legal de tus activos digitales, mientras nosotros realizamos toda la gestión y enrutamiento técnico.'
      },
      {
        number: 'Sem 5-6',
        title: 'Seguridad de Accesos y Delegación',
        action: 'Qué hacemos: Conectamos las herramientas de analítica (Google Analytics) y píxeles publicitarios de Meta.',
        rule: 'Regla Profesional: Seguridad Primero. Jamás solicitamos contraseñas personales de Facebook o Google. Te enseñamos a agregarnos de forma segura como "Socio" o "Editor" delegado desde tus respectivas cuentas comerciales.'
      },
      {
        number: 'Sem 7',
        title: 'Hand-off Documentado (Entrega)',
        action: 'Qué hacemos: Realizamos la entrega formal del sitio web, manuales de marca y bases de datos integradas mediante un documento de cierre.',
        rule: 'Tu beneficio: Recibes un inventario con todas las cuentas, accesos administrativos e instrucciones detalladas. A partir de esta semana comienza tu servicio de soporte y mantenimiento de bajo costo ($15 USD / mes) que protege la seguridad del sitio.'
      },
      {
        number: 'Sem 8',
        title: 'GEO (Optimización para IA)',
        action: 'Qué hacemos: Preparamos tu sitio web para el futuro de las búsquedas en internet.',
        rule: 'Tu beneficio: Agregamos metadatos estructurados en formato JSON-LD (Schema.org), configuramos tu archivo robots.txt para autorizar a los robots conversacionales (GPTBot, Google-Extended) y redactamos el contenido de forma semántica. Tu negocio estará listo para aparecer en ChatGPT, Gemini y Perplexity.'
      }
    ] : [
      {
        number: 'Wk 1-2',
        title: 'Asset Collection & Control',
        action: 'What we do: We kick off the project and enable a shared cloud folder for you to deposit your logos, corporate images, service descriptions, bios, and contact details.',
        rule: 'Professional Rule: Strict Operational Block. If key inputs are not complete by the end of week 2, the schedule stops and shifts day by day. This helps us meet deadlines for everyone fairly.'
      },
      {
        number: 'Wk 3',
        title: 'Live Staging Deployment',
        action: 'What we do: We do not wait until the end to show you the result. We deploy a functional preliminary version on a temporary staging link.',
        rule: 'Your benefit: You can review progress in real-time and see how text and buttons adapt directly from your mobile phone. Design feedback happens on real code, not flat mockups.'
      },
      {
        number: 'Wk 4',
        title: 'Infrastructure & Official Domain',
        action: 'What we do: We link the official brand domain (e.g. yourbusiness.com) with an active SSL security certificate.',
        rule: 'Your benefit: We acquire the domain under your name and billing details to guarantee you are the legal owner of your digital assets, while we handle all technical routing.'
      },
      {
        number: 'Wk 5-6',
        title: 'Access Security & Delegation',
        action: 'What we do: We connect analytics tools (Google Analytics) and Meta advertising pixels.',
        rule: 'Professional Rule: Security First. We never ask for personal Facebook or Google passwords. We teach you how to add us securely as a delegated "Partner" or "Editor" from your business accounts.'
      },
      {
        number: 'Wk 7',
        title: 'Documented Hand-off (Delivery)',
        action: 'What we do: We make the formal delivery of the website, brand manuals, and integrated databases via a closing document.',
        rule: 'Your benefit: You receive an inventory with all accounts, admin accesses, and detailed instructions. From this week, your low-cost support and maintenance service ($15 USD / month) begins.'
      },
      {
        number: 'Wk 8',
        title: 'GEO (AI Engine Optimization)',
        action: 'What we do: We prepare your website for the future of search engines.',
        rule: 'Your benefit: We add structured metadata in JSON-LD format (Schema.org), configure robots.txt to authorize conversational bots (GPTBot, Google-Extended), and write semantic content. Ready for ChatGPT, Gemini, and Perplexity.'
      }
    ],

    // Section 7: Stacks Tecnológicos
    stackBadge: lang === 'es' ? 'Infraestructura' : 'Infrastructure',
    stackTitle: lang === 'es' ? 'Stacks Tecnológicos Especializados' : 'Specialized Tech Stacks',
    stackSub: lang === 'es'
      ? 'No todas las páginas web necesitan los mismos servidores. En MAX AI clasificamos tu proyecto dentro de cuatro niveles de stacks técnicos especializados para garantizar rendimiento óptimo y costos mínimos.'
      : 'Not all websites need the same servers. At MAX AI we classify your project into four levels of specialized technical stacks to guarantee optimal performance and minimal costs.',
    stackLevels: lang === 'es' ? [
      {
        level: 'Nivel 1: Validación',
        target: 'Ideal para marcas que inician',
        arch: 'React (Vite) + Tailwind CSS + Firebase (Firestore para base de datos de leads) + Despliegue en Vercel.',
        cost: '$0.00 USD/mes de por vida (utilizando las capas gratuitas seguras de Vercel y Firebase).',
        use: 'Sitios web informativos, landing pages promocionales rápidas y portafolios interactivos.',
        diff: 'Velocidad de carga en milisegundos, seguridad SSL gratuita y cero cobros de hosting mensual.'
      },
      {
        level: 'Nivel 2: Dynamic SaaS',
        target: 'Para portales e interactividad',
        arch: 'Next.js (React Framework) + Supabase (Relational PostgreSQL, Auth & Storage) + Despliegue en Vercel.',
        cost: '$0.00 USD/mes inicial (escalable solo si tu tráfico aumenta drásticamente).',
        use: 'Aplicaciones web que requieren registro de usuarios, portales privados para clientes, directorios interactivos y pasarelas de pago recurrentes.',
        diff: 'Seguridad de grado bancario para los datos de tus usuarios sin costos iniciales de base de datos.'
      },
      {
        level: 'Nivel 3: Control Total',
        target: 'Para sistemas internos corporativos',
        arch: 'React (Frontend) + Backend en Go (Golang) + Base de datos SQLite local + Docker + Servidor VPS Dedicado + Red Privada VPN (Tailscale).',
        cost: '$4.00 a $6.00 USD/mes (Costo real del VPS en Hetzner o DigitalOcean).',
        use: 'Sistemas internos de gestión (CRMs / ERPs propios), bases de datos privadas con datos confidenciales y herramientas de administración sin dependencia de nubes corporativas grandes.',
        diff: 'Privacidad absoluta. Tus datos no se comparten en nubes de terceros y el acceso al panel se restringe a través de una red VPN cifrada.'
      },
      {
        level: 'Nivel 4: IA & Agentes',
        target: 'Para automatización de vanguardia',
        arch: 'Python (FastAPI) + PostgreSQL (pgvector para búsqueda semántica e indexación) + APIs de modelos de lenguaje avanzados (Gemini / Google AI Studio) + Canales automatizados (WhatsApp / Telegram / Email).',
        cost: 'Pago por uso de consumo de tokens del proveedor de IA + VPS básico.',
        use: 'Asistentes automáticos de atención al cliente en WhatsApp, sistemas inteligentes RAG para consulta de bases de conocimiento y automatización inteligente de flujos comerciales.',
        diff: 'Tu negocio responde, interactúa y precalifica oportunidades de venta de forma totalmente autónoma las 24 horas del día.'
      }
    ] : [
      {
        level: 'Level 1: Validation',
        target: 'Ideal for starting brands',
        arch: 'React (Vite) + Tailwind CSS + Firebase (Firestore for lead database) + Vercel Deployment.',
        cost: '$0.00 USD/month lifetime (utilizing the secure free tiers of Vercel and Firebase).',
        use: 'Informative websites, fast promotional landing pages, and interactive portfolios.',
        diff: 'Millisecond load speed, free SSL security, and zero monthly hosting charges.'
      },
      {
        level: 'Level 2: Dynamic SaaS',
        target: 'For portals & interactivity',
        arch: 'Next.js (React Framework) + Supabase (Relational PostgreSQL, Auth & Storage) + Vercel Deployment.',
        cost: '$0.00 USD/month initial (scalable only if traffic increases drastically).',
        use: 'Web apps requiring user registration, private client portals, interactive directories, and recurring payment gateways.',
        diff: 'Bank-grade security for your user data without initial database costs.'
      },
      {
        level: 'Level 3: Total Control',
        target: 'For internal corporate systems',
        arch: 'React (Frontend) + Go (Golang) Backend + Local SQLite database + Docker + Dedicated VPS + Private VPN (Tailscale).',
        cost: '$4.00 to $6.00 USD/month (Real cost of VPS in Hetzner or DigitalOcean).',
        use: 'Internal management systems (proprietary CRMs/ERPs), private databases with confidential data, and admin tools without big cloud dependencies.',
        diff: 'Absolute privacy. Your data is not shared in third-party clouds and dashboard access is restricted via encrypted VPN.'
      },
      {
        level: 'Level 4: AI & Agents',
        target: 'For cutting-edge automation',
        arch: 'Python (FastAPI) + PostgreSQL (pgvector for semantic search) + Advanced LLM APIs (Gemini / Google AI Studio) + Automated Channels (WhatsApp / Telegram / Email).',
        cost: 'Pay-per-use token consumption of the AI provider + basic VPS.',
        use: 'Automated customer support assistants on WhatsApp, smart RAG systems for knowledge base queries, and intelligent business flow automation.',
        diff: 'Your business responds, interacts, and pre-qualifies sales opportunities fully autonomously 24/7.'
      }
    ],

    // Section 8: Clientes Ideales
    clientBadge: lang === 'es' ? 'Público Objetivo' : 'Target Audience',
    clientTitle: lang === 'es' ? '¿A quiénes ayudamos a crecer?' : 'Who do we help grow?',
    clientSub: lang === 'es'
      ? 'Nuestros sistemas se diseñan para potenciar negocios sofisticados que valoran la eficiencia y la autoridad digital.'
      : 'Our systems are designed to empower sophisticated businesses that value efficiency and digital authority.',
    clientProfiles: lang === 'es' ? [
      {
        title: 'Profesionales Independientes Consultivos',
        desc: 'Psicólogos, Abogados, Consultores de Negocios y Arquitectos que necesitan que su presencia digital iguale o supere la calidad y autoridad de sus servicios reales.'
      },
      {
        title: 'PYMEs de Servicios y Comercio',
        desc: 'Centros de capacitación, empresas de remodelación y showrooms de moda física que necesitan integrar canales digitales premium para ordenar su captación de leads y su inventario visual en línea de forma interactiva.'
      },
      {
        title: 'Negocios Locales con Enfoque de Experiencia',
        desc: 'Gimnasios, restaurantes seleccionados y barberías boutique que buscan automatizar la reserva de citas y el contacto de WhatsApp para liberar tiempo operativo de sus equipos de trabajo.'
      }
    ] : [
      {
        title: 'Consultative Independent Professionals',
        desc: 'Psychologists, Lawyers, Business Consultants, and Architects who need their digital presence to match or exceed the quality and authority of their real-world services.'
      },
      {
        title: 'SMEs in Services and Commerce',
        desc: 'Training centers, renovation companies, and fashion showrooms that need to integrate premium digital channels to organize lead capture and visual inventory interactively.'
      },
      {
        title: 'Experience-Focused Local Businesses',
        desc: 'Gyms, selected restaurants, and boutique barbershops looking to automate appointment booking and WhatsApp contact to free up operational time for their teams.'
      }
    ],

    // Section 9: FAQ
    faqBadge: lang === 'es' ? 'Preguntas Frecuentes' : 'FAQ',
    faqTitle: lang === 'es' ? 'Resolviendo tus dudas técnicas y comerciales' : 'Answering your technical and business questions',
    faqItems: lang === 'es' ? [
      {
        q: '¿Por qué no venden páginas web o logotipos por separado?',
        a: 'Porque las herramientas aisladas no generan crecimiento. Un logotipo bonito sin una página web estratégica pasa desapercibido. Una página web excelente sin marketing no recibe visitas. Y un flujo constante de visitas sin automatización colapsa tu tiempo libre. Diseñamos Sistemas de Crecimiento Digital donde cada pilar sostiene al siguiente para garantizar que tu inversión retorne.'
      },
      {
        q: '¿Qué ocurre si no entrego mis fotos o información al inicio?',
        a: 'En la Semana 2 aplicamos una política de Bloqueo Operativo Estricto. Si el material del negocio no está en la carpeta compartida, el proyecto se detiene de inmediato. Esto garantiza que todos nuestros clientes tengan entregas a tiempo y que no dejemos proyectos incompletos en un limbo operativo.'
      },
      {
        q: '¿Tengo que pagar un hosting muy costoso mensualmente?',
        a: 'En la mayoría de proyectos (Stacks Nivel 1 y 2) diseñamos sistemas que operan bajo los planes gratuitos de Vercel y Firebase/Supabase. Esto significa que tu costo de hosting de servidores es de $0.00 USD/mes de por vida. El único gasto recurrente de infraestructura que deberás prever es la renovación de tu dominio de marca ($10 a $15 USD anuales) que configuramos a tu nombre.'
      },
      {
        q: '¿Cómo manejan el acceso a mi redes sociales?',
        a: 'Jamás te pediremos tus contraseñas personales de Google o Facebook. Compartir contraseñas es una práctica poco segura. Te guiaremos paso a paso para que compartas accesos seguros invitándonos a tu cuenta de Meta Business Manager como "Socio" u otorgándonos accesos de "Editor" en tu Google Analytics. Tú mantienes el control de la propiedad en todo momento.'
      },
      {
        q: '¿Qué incluye el servicio de mantenimiento web de $15 USD mensuales?',
        a: 'A partir de la entrega (Semana 7), el mantenimiento de bajo costo asegura que tu sitio web cuente con monitoreo continuo de seguridad y resolución de incidencias en el servidor. Incluye hasta 1 hora al mes de cambios menores de contenido (como actualizar un texto descriptivo o una imagen de portada). Cualquier cambio estructural de diseño o desarrollo de nuevas secciones se cotiza por separado.'
      },
      {
        q: '¿Qué es GEO y por qué mi negocio lo necesita ahora?',
        a: 'GEO significa Generative Engine Optimization (Optimización para Motores de Generación). Cada vez más personas utilizan herramientas como ChatGPT o Gemini para realizar preguntas en lugar de buscar links tradicionales en Google. GEO consiste en estructurar el código y el contenido semántico de tu web para que estas inteligencias artificiales puedan leer, comprender y citar tu negocio como la mejor opción de respuesta.'
      }
    ] : [
      {
        q: 'Why don\'t you sell websites or logos separately?',
        a: 'Because isolated tools do not generate growth. A beautiful logo without a strategic website goes unnoticed. An excellent website without marketing gets no visits. And a steady flow of visits without automation collapses your free time. We design Digital Growth Systems where each pillar supports the next to ensure your investment returns.'
      },
      {
        q: 'What happens if I don\'t deliver my photos or info at the beginning?',
        a: 'In Week 2 we apply a strict Operational Block policy. If the business material is not in the shared folder, the project stops immediately. This ensures that all our clients get timely deliveries and we do not leave incomplete projects in operational limbo.'
      },
      {
        q: 'Do I have to pay expensive monthly hosting?',
        a: 'For most projects (Level 1 and 2 Stacks) we design systems that run on Vercel and Firebase/Supabase free tiers. This means your hosting cost is $0.00 USD/month for life. The only recurring infrastructure cost is your domain renewal ($10 to $15 USD/year) configured in your name.'
      },
      {
        q: 'How do you handle access to my social media?',
        a: 'We will never ask for your personal Facebook or Google passwords. Sharing passwords is unsafe. We guide you step-by-step to share access securely by inviting us to your Meta Business Manager account as a "Partner" or granting us "Editor" access in Google Analytics. You maintain ownership control at all times.'
      },
      {
        q: 'What does the $15 USD monthly maintenance include?',
        a: 'From delivery (Week 7), low-cost maintenance ensures your site has continuous security monitoring and server issue resolution. It includes up to 1 hour per month of minor content changes (such as updating descriptive text or a cover image). Structural design edits or new sections are quoted separately.'
      },
      {
        q: 'What is GEO and why does my business need it now?',
        a: 'GEO stands for Generative Engine Optimization. More and more people use tools like ChatGPT or Gemini to ask questions instead of searching traditional links on Google. GEO consists of structuring your web code and semantic content so these AIs can read, understand, and cite your business as the best answer.'
      }
    ],

    // Section 10: Diagnóstico / Formulario
    diagBadge: lang === 'es' ? 'Diagnóstico Gratis' : 'Free Diagnostic',
    diagTitle: lang === 'es' ? '¿Listo para construir tu Sistema de Crecimiento Digital?' : 'Ready to build your Digital Growth System?',
    diagSub: lang === 'es'
      ? 'Agenda una sesión de diagnóstico gratuita de 45 minutos. Analizaremos tu presencia web actual, identificaremos oportunidades de automatización comercial con IA y te entregaremos una ruta de acción clara. Sin compromisos de compra.'
      : 'Book a free 45-minute diagnostic session. We will analyze your current web presence, identify commercial automation opportunities with AI, and deliver a clear action roadmap. No purchase commitments.',
    diagLabelName: lang === 'es' ? 'Nombre Completo' : 'Full Name',
    diagLabelCompany: lang === 'es' ? 'Nombre del Negocio / Empresa' : 'Business / Company Name',
    diagLabelEmail: lang === 'es' ? 'Correo Electrónico *' : 'Email Address *',
    diagLabelPhone: lang === 'es' ? 'WhatsApp de Contacto' : 'Contact WhatsApp',
    diagLabelWeb: lang === 'es' ? 'Tu Sitio Web Actual (Opcional)' : 'Your Current Website (Optional)',
    diagLabelObstacle: lang === 'es' ? '¿Cuál es el mayor obstáculo para el crecimiento de tu negocio hoy?' : 'What is the biggest obstacle to your business growth today?',
    diagObstacles: lang === 'es' ? [
      'No tengo suficientes prospectos calificados.',
      'Mi imagen o sitio web actual luce poco profesional.',
      'Pierdo mucho tiempo respondiendo consultas manualmente.',
      'Tengo presencia digital fragmentada.'
    ] : [
      'I don\'t have enough qualified leads.',
      'My current image or website looks unprofessional.',
      'I waste a lot of time answering queries manually.',
      'I have a fragmented digital presence.'
    ],
    diagLabelBudget: lang === 'es' ? 'Presupuesto aproximado estimado para tu proyecto:' : 'Approximate estimated budget for your project:',
    diagBudgets: lang === 'es' ? [
      'Menos de $500 USD (Etapa de validación rápida).',
      'Entre $500 y $1,500 USD (Crecimiento comercial PYME).',
      'Más de $1,500 USD (Solución robusta / IA integrada).'
    ] : [
      'Under $500 USD (Quick validation phase).',
      'Between $500 and $1,500 USD (SME commercial growth).',
      'Over $1,500 USD (Robust solution / integrated AI).'
    ],
    diagSubmit: lang === 'es' ? 'Agendar Mi Diagnóstico Gratuito' : 'Book My Free Diagnostic',
    diagSubmitting: lang === 'es' ? 'Procesando en el Núcleo...' : 'Processing in Core...',
    diagSuccessTitle: lang === 'es' ? '¡Diagnóstico Solicitado con Éxito!' : 'Diagnostic Successfully Requested!',
    diagSuccessSub: lang === 'es'
      ? 'Tu solicitud ha sido registrada de forma segura en Firestore. Estamos preparando tu informe de diagnóstico preliminar. Serás redirigido a WhatsApp para coordinar la fecha y hora de la llamada de 45 minutos.'
      : 'Your request has been securely logged in Firestore. We are preparing your preliminary diagnostic report. You will be redirected to WhatsApp to coordinate the date and time of the 45-minute call.',

    // Section 11: Footer
    footText: lang === 'es' ? 'POSICIONAMIENTO • PRESENCIA • CAPTACIÓN • ESCALABILIDAD' : 'POSITIONING • PRESENCE • ACQUISITION • SCALABILITY',
    footServer: lang === 'es' ? 'ESTADO DEL SISTEMA: ÓPTIMO' : 'SYSTEM STATUS: OPTIMAL',
    footSlogan: lang === 'es'
      ? 'Diseñamos e implementamos sistemas digitales para el crecimiento de tu negocio.'
      : 'We design and implement digital systems for your business growth.',
    footOffice: lang === 'es' ? 'Quito y Guayaquil, Ecuador. Cobertura Global.' : 'Quito and Guayaquil, Ecuador. Global Coverage.',
    footContact: lang === 'es' ? 'Contacto comercial: info@max-ai.com' : 'Business Contact: info@max-ai.com',

    // Pricing Page Specific (Section 5 Catalog)
    priceBadge: lang === 'es' ? 'Catálogo Oficial' : 'Official Catalog',
    priceTitle: lang === 'es' ? 'Servicios Estructurados y Rangos de Inversión' : 'Structured Services & Investment Ranges',
    priceSub: lang === 'es'
      ? 'Transparencia total. Todo se cotiza bajo la política de hitos (40% inicio / 40% control de insumos / 20% entrega).'
      : 'Total transparency. Everything is quoted under milestone policy (40% kick-off / 40% asset control / 20% hand-off).',
    priceTiers: lang === 'es' ? [
      {
        category: '🎨 1. Branding Estratégico',
        desc: 'Construcción de la identidad visual y base comunicativa del negocio.',
        ranges: [
          { name: 'Rango Emprendedor ($250 - $450 USD)', for: 'Ideal para profesionales independientes y marcas personales que inician y requieren identidad rápida y profesional.', include: 'Logotipo principal, paleta de colores oficial, tipografía corporativa y guía básica de uso digital.' },
          { name: 'Rango PYME ($500 - $1,200 USD)', for: 'Diseñado para negocios locales establecidos o marcas comerciales con productos físicos/servicios que buscan diferenciarse.', include: 'Logotipo (versiones y variantes), imagotipo, manual de identidad de marca completo, papelería digital básica e indicaciones visuales para redes sociales.' },
          { name: 'Rango Corporativo ($1,500 - $5,000+ USD)', for: 'Para empresas con múltiples líneas de negocio, productos o sucursales físicas que exigen un despliegue masivo.', include: 'Auditoría de posicionamiento, manual de marca completo (directrices de tono de voz, branding espacial y audiovisual), diseño de activos institucionales y soporte de implementación gráfica.' }
        ]
      },
      {
        category: '💻 2. Desarrollo Web Comercial',
        desc: 'Sitios web rápidos, seguros, sin tecnologías obsoletas ni caídas de servidor.',
        ranges: [
          { name: 'Landing Page de Validación ($250 - $600 USD)', for: 'Diseñada exclusivamente para captar prospectos o lanzar un servicio específico de alta conversión.', include: 'Estructura de página única de alto impacto, formulario integrado de captura de leads, conexión básica de analíticas y optimización móvil estricta.' },
          { name: 'Web Corporativa ($600 - $1,800 USD)', for: 'El sitio institucional definitivo para posicionar la oferta completa de servicios de una PYME o profesional consultivo.', include: 'Multisecciones (Inicio, Quiénes Somos, Servicios individuales, Contacto, Blog/Portafolio), formularios de reserva avanzada de citas y enlaces directos de captación.' },
          { name: 'E-commerce ($1,200 - $5,000+ USD)', for: 'Tienda virtual estructurada para vender productos de forma fluida y automatizada.', include: 'Catálogo interactivo de productos, pasarela de pago configurada (tarjetas de crédito, transferencias), carrito de compras, gestión de stock e integración con sistemas de mensajería para alertas de pedidos.' }
        ]
      },
      {
        category: '📈 3. Marketing Digital & Captación',
        desc: 'Estrategias recurrentes orientadas a generar reuniones y ventas.',
        ranges: [
          { name: 'Plan Básico ($250 - $500 USD / mes)', for: 'Para profesionales y pequeños negocios locales que necesitan visibilidad inicial controlada.', include: 'Estrategia de pauta publicitaria en Meta Ads, configuración de Google Business Profile (Mapas) y reporte mensual básico de leads generados.' },
          { name: 'Plan Profesional ($500 - $1,000 USD / mes)', for: 'Ideal para negocios con flujo constante de servicios que quieren escalar y dominar su área local.', include: 'Embudos de captación avanzados (pauta digital en múltiples plataformas), optimización de tasa de conversión web y gestión de campañas de retargeting.' },
          { name: 'Plan Avanzado ($1,000 - $3,000+ USD / mes)', for: 'Diseñado para empresas con presupuesto de expansión nacional o regional.', include: 'SEO local y técnico avanzado para motores tradicionales e IA (GEO), campañas de captación omnicanal, embudos con imanes de prospectos avanzados e informes de analítica avanzada con atribución de ventas.' }
        ]
      },
      {
        category: '🤖 4. IA & Automatización Comercial',
        desc: 'Sistemas autónomos que procesan, califican e integran operaciones.',
        ranges: [
          { name: 'Automatización Básica ($500 - $1,500 USD)', for: 'Ideal para eliminar tareas repetitivas y unificar accesos y bases de datos.', include: 'Respuestas estructuradas automáticas en chat de WhatsApp, conexión del sitio web con un CRM (ej. Notion o similar) e integraciones básicas de correo electrónico.' },
          { name: 'Integración Profesional ($1,500 - $5,000 USD)', for: 'Diseñado para PYMEs que desean delegar la primera fase de contacto comercial en la tecnología.', include: 'Bot conversacional inteligente alimentado con IA (API de Gemini en Google AI Studio) integrado a WhatsApp o web, calificación automática de prospectos y agendamiento autónomo de llamadas de diagnóstico.' },
          { name: 'Solución Empresarial ($5,000 - $15,000+ USD)', for: 'Para corporativos que buscan crear sistemas expertos a partir de sus propios datos internos de negocio.', include: 'Sistema RAG (Generación Recuperada por Búsqueda Semántica) que lee los documentos PDF, políticas o históricos de la empresa para responder internamente, asistentes inteligentes personalizados por rol y automatización de flujos comerciales masivos.' }
        ]
      }
    ] : [
      {
        category: '🎨 1. Strategic Branding',
        desc: 'Construction of the visual identity and communicative base of the business.',
        ranges: [
          { name: 'Entrepreneur Range ($250 - $450 USD)', for: 'Ideal for independent professionals and personal brands starting out who need a fast, professional identity.', include: 'Main logo, official color palette, corporate typography, and basic digital usage guide.' },
          { name: 'SME Range ($500 - $1,200 USD)', for: 'Designed for established local businesses or commercial brands looking to stand out.', include: 'Logo (versions and variants), imagetype, complete brand book, basic digital stationery, and social media templates.' },
          { name: 'Corporate Range ($1,500 - $5,000+ USD)', for: 'For companies with multiple business lines, products, or physical branches demanding massive deployment.', include: 'Positioning audit, complete brand manual (including tone of voice, spatial, and audiovisual branding), design of corporate assets, and implementation support.' }
        ]
      },
      {
        category: '💻 2. Commercial Web Development',
        desc: 'Fast, secure websites, without obsolete technologies or server crashes.',
        ranges: [
          { name: 'Validation Landing Page ($250 - $600 USD)', for: 'Exclusively designed to capture prospects or launch a specific high-converting service.', include: 'Single page high-impact structure, integrated lead capture form, basic analytics connection, and strict mobile optimization.' },
          { name: 'Corporate Web ($600 - $1,800 USD)', for: 'The definitive institutional site to position the full range of services for an SME or professional.', include: 'Multi-sections (Home, About Us, Services, Contact, Blog/Portfolio), advanced booking forms, and direct capture links.' },
          { name: 'E-commerce ($1,200 - $5,000+ USD)', for: 'Virtual store structured to sell products smoothly and automatically.', include: 'Interactive product catalog, payment gateway (credit cards, transfers), shopping cart, inventory management, and messaging integration.' }
        ]
      },
      {
        category: '📈 3. Digital Marketing & Acquisition',
        desc: 'Recurring strategies oriented to generate meetings and sales.',
        ranges: [
          { name: 'Basic Plan ($250 - $500 USD / month)', for: 'For professionals and small local businesses needing initial controlled visibility.', include: 'Ad campaigns on Meta Ads, Google Business Profile (Maps) optimization, and basic monthly lead reports.' },
          { name: 'Professional Plan ($500 - $1,000 USD / month)', for: 'Ideal for businesses with steady service flow looking to scale and dominate locally.', include: 'Advanced acquisition funnels (cross-platform digital ads), web conversion rate optimization, and retargeting campaigns.' },
          { name: 'Advanced Plan ($1,000 - $3,000+ USD / month)', for: 'Designed for companies with national or regional expansion budgets.', include: 'Advanced local and technical SEO for traditional and AI search (GEO), omni-channel acquisition campaigns, advanced lead magnets, and attribution reporting.' }
        ]
      },
      {
        category: '🤖 4. AI & Commercial Automation',
        desc: 'Autonomous systems that process, qualify, and integrate operations.',
        ranges: [
          { name: 'Basic Automation ($500 - $1,500 USD)', for: 'Ideal to eliminate repetitive tasks and unify database access.', include: 'Structured auto-replies on WhatsApp, website connection to CRM (e.g. Notion), and basic email flows.' },
          { name: 'Professional Integration ($1,500 - $5,000 USD)', for: 'Designed for SMEs wishing to delegate the first phase of contact to technology.', include: 'Intelligent chat agent powered by AI (Gemini API via Google AI Studio) on WhatsApp/web, auto-lead qualification, and autonomous booking.' },
          { name: 'Enterprise Solution ($5,000 - $15,000+ USD)', for: 'For corporates seeking to create expert systems from internal data.', include: 'Semantic RAG system querying internal PDFs/documents, role-based custom AI agents, and massive workflow automation.' }
        ]
      }
    ],
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
          
          {/* Left Side: Language & Theme Switchers + Logo */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            {/* Stacked Switchers: Language (Top) and Theme (Bottom) */}
            <div className="flex flex-col gap-1 items-center justify-center select-none scale-[0.85] sm:scale-100 origin-center shrink-0">
              {/* Language Switcher (ES | EN Toggle Group) */}
              <div className={`flex p-0.5 rounded-full border ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-[#EAE6DB] border-[#D6D0C1]'}`}>
                <button
                  onClick={() => setLang('es')}
                  className={`px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-mono font-bold uppercase transition-all cursor-pointer ${
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
                  className={`px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-mono font-bold uppercase transition-all cursor-pointer ${
                    lang === 'en' 
                      ? 'bg-[#C17F4E] text-white' 
                      : isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="English"
                >
                  EN
                </button>
              </div>

              {/* Theme Toggle Button */}
              <div className={`flex p-0.5 rounded-full border ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-[#EAE6DB] border-[#D6D0C1]'}`}>
                <button
                  onClick={() => setIsDark(true)}
                  className={`p-1 rounded-full transition-all cursor-pointer ${isDark ? 'bg-[#C17F4E] text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  title={lang === 'es' ? "Modo Oscuro" : "Dark Mode"}
                >
                  <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
                <button
                  onClick={() => setIsDark(false)}
                  className={`p-1 rounded-full transition-all cursor-pointer ${!isDark ? 'bg-[#C17F4E] text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  title={lang === 'es' ? "Modo Claro" : "Light Mode"}
                >
                  <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>

            {/* Brand Logo with Fluid Expanding Image Effect */}
            <div 
              className="group relative h-15 w-15 hover:w-[188px] rounded-lg transition-all duration-500 ease-out cursor-pointer overflow-hidden flex items-center shrink-0 ml-1 md:ml-2" 
              onClick={() => setActivePage('inicio')}
            >
              {/* Small Logo */}
              <img 
                src="/logo_pequeno.png" 
                alt="MAX AI" 
                className="absolute left-0 top-0 h-15 w-15 rounded-lg object-contain transition-all duration-300 group-hover:opacity-0 group-hover:scale-90" 
              />
              {/* Long Logo */}
              <img 
                src="/logo_largo.png" 
                alt="MAX AI Digital Studio" 
                className="absolute left-0 top-0 h-15 w-[188px] rounded-lg object-contain opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100" 
              />
            </div>
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
              onClick={() => setActivePage('precios')}
              className={`pb-1 transition-all uppercase ${
                activePage === 'precios' 
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

          {/* Action Tools: Contact + Login */}
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

            {/* Premium Login / Portal Button – icono únicamente */}
            <button 
              onClick={() => setActivePage('login')}
              title={currentUser ? (isAdminUser ? (lang === 'es' ? 'Sistema' : 'System') : (lang === 'es' ? 'Mi Portal' : 'My Portal')) : (lang === 'es' ? 'Iniciar sesión' : 'Sign in')}
              className={`relative p-2.5 rounded-full transition-all border ${
                activePage === 'login'
                  ? 'bg-zinc-800 text-[#C17F4E] border-[#C17F4E]'
                  : isDark ? 'border-white/10 hover:border-[#C17F4E]/50 text-zinc-400 hover:text-[#C17F4E] bg-zinc-950/20' : 'border-slate-300 hover:border-[#C17F4E]/50 text-slate-500 hover:text-[#C17F4E] bg-white/20'
              }`}
            >
              {currentUser ? (
                currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="" className="w-5 h-5 rounded-full" />
                ) : (
                  <LayoutDashboard className="w-5 h-5" />
                )
              ) : (
                <CircleUser className="w-5 h-5" />
              )}
              {currentUser && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-zinc-900" />
              )}
            </button>

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

            {/* Mobile Login / Portal Button – icono únicamente */}
            <button 
              onClick={() => setActivePage('login')}
              title={currentUser ? (lang === 'es' ? 'Mi cuenta' : 'My account') : (lang === 'es' ? 'Iniciar sesión' : 'Sign in')}
              className={`relative p-2 rounded-full transition-all border shrink-0 ${
                activePage === 'login'
                  ? 'bg-zinc-800 text-[#C17F4E] border-[#C17F4E]'
                  : isDark ? 'border-white/10 text-zinc-400 bg-zinc-950/20 hover:text-[#C17F4E]' : 'border-slate-300 text-slate-500 bg-white/20 hover:text-[#C17F4E]'
              }`}
            >
              {currentUser ? (
                currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="" className="w-4 h-4 rounded-full" />
                ) : (
                  <LayoutDashboard className="w-4 h-4" />
                )
              ) : (
                <CircleUser className="w-4 h-4" />
              )}
              {currentUser && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-zinc-900" />
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded border transition-all ${
                isDark
                  ? 'border-white/5 bg-zinc-900/40 text-zinc-300 hover:text-white'
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
                  onClick={() => { setActivePage('precios'); setMobileMenuOpen(false); }}
                  className={`text-left text-sm font-semibold tracking-wider uppercase py-2.5 px-3 rounded transition-all ${activePage === 'precios' ? 'bg-[#C17F4E]/10 text-[#C17F4E]' : 'hover:bg-white/5'}`}
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

                  <h1 className={`font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight uppercase ${themeStyles.title}`}>
                    {t.heroTitle1} <br/> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C17F4E] to-[#D79663]">{t.heroTitle2}</span> <br/> 
                    {t.heroTitle3} <br/> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C17F4E] to-[#D79663]">{t.heroTitle4}</span>
                  </h1>

                  <p className={`text-base sm:text-lg max-w-xl font-sans font-light leading-relaxed ${themeStyles.textMuted}`}>
                    {t.heroSub}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                    <div className="flex flex-col items-stretch sm:items-start gap-1">
                      <button
                        onClick={() => {
                          const target = document.getElementById('diagnostico');
                          if (target) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                        className="px-8 py-3.5 bg-[#C17F4E] text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-[#D79663] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C17F4E]/20 text-center flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>{t.heroCta1}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <p className="text-[9px] text-zinc-500 font-mono mt-1 text-center sm:text-left">{t.heroCta1Sub}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        const target = document.getElementById('sistema');
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`px-8 py-3.5 rounded text-xs font-bold uppercase tracking-widest transition-all text-center border cursor-pointer h-fit ${
                        isDark 
                          ? 'border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:bg-zinc-800' 
                          : 'border-[#D6D0C1] bg-[#FAF8F5] text-slate-800 hover:bg-[#F2EFE9]'
                      }`}
                    >
                      {t.heroCta2}
                    </button>
                  </div>

                  <p className={`text-xs font-mono font-bold border-l-2 border-[#C17F4E]/50 pl-3 py-1 ${themeStyles.textMuted} mt-6`}>
                    {t.heroTagline}
                  </p>

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
  
              {/* --- SECCIÓN DE SÍNTOMAS DEL PROBLEMA --- */}
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
                    <p className={`text-sm font-sans font-light mt-4 leading-relaxed ${themeStyles.textMuted}`}>
                      {t.probSub}
                    </p>
                  </div>
  
                  {/* Grid of 5 Symptoms */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {t.probSymptoms.map((symptom, idx) => (
                      <div 
                        key={idx} 
                        className={`p-6 rounded-xl border flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#C17F4E]/5 ${themeStyles.card}`}
                      >
                        <div>
                          <div className="text-[#C17F4E] font-mono text-3xl font-black mb-4">0{idx + 1}</div>
                          <h3 className={`font-display font-bold text-sm uppercase mb-2 leading-snug tracking-wider ${themeStyles.title}`}>
                            {symptom.title}
                          </h3>
                          <p className={`text-xs font-sans font-light leading-relaxed ${themeStyles.textMuted}`}>
                            {symptom.desc}
                          </p>
                        </div>
                        <div className="mt-6 flex justify-end text-red-500/20">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>
  
              {/* --- SECCIÓN EL SISTEMA (4 PILARES DE SOLUCIÓN) --- */}
              <motion.section 
                id="sistema"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto"
              >
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{t.systBadge}</span>
                  <h2 className={`font-display font-bold text-3xl sm:text-4xl uppercase mt-2 ${themeStyles.title}`}>
                    {t.systTitle}
                  </h2>
                  <p className={`text-sm font-sans font-light mt-3 leading-relaxed ${themeStyles.textMuted}`}>
                    {t.systSub}
                  </p>
                </div>

                {/* Cyclic Diagram Representation */}
                <div className="hidden lg:flex justify-between items-center max-w-4xl mx-auto mb-16 p-4 bg-zinc-950/20 border border-white/5 rounded-xl font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                  <button 
                    onClick={() => setActivePilar(0)}
                    className={`px-3 py-1.5 rounded transition-all cursor-pointer ${activePilar === 0 ? 'bg-[#C17F4E]/10 text-[#C17F4E] font-bold border border-[#C17F4E]/30' : 'hover:text-zinc-300'}`}
                  >
                    1. Posicionamiento (Branding)
                  </button>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-700" />
                  <button 
                    onClick={() => setActivePilar(1)}
                    className={`px-3 py-1.5 rounded transition-all cursor-pointer ${activePilar === 1 ? 'bg-[#C17F4E]/10 text-[#C17F4E] font-bold border border-[#C17F4E]/30' : 'hover:text-zinc-300'}`}
                  >
                    2. Presencia (Web Premium)
                  </button>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-700" />
                  <button 
                    onClick={() => setActivePilar(2)}
                    className={`px-3 py-1.5 rounded transition-all cursor-pointer ${activePilar === 2 ? 'bg-[#C17F4E]/10 text-[#C17F4E] font-bold border border-[#C17F4E]/30' : 'hover:text-zinc-300'}`}
                  >
                    3. Captación (Marketing)
                  </button>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-700" />
                  <button 
                    onClick={() => setActivePilar(3)}
                    className={`px-3 py-1.5 rounded transition-all cursor-pointer ${activePilar === 3 ? 'bg-[#C17F4E]/10 text-[#C17F4E] font-bold border border-[#C17F4E]/30' : 'hover:text-zinc-300'}`}
                  >
                    4. Escalabilidad (IA)
                  </button>
                </div>
  
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                  {/* Pilar Selector Buttons */}
                  <div className="lg:col-span-5 flex flex-col gap-3">
                    {[
                      { number: '01', title: t.systPillar1Title, label: t.systPillar1Sub },
                      { number: '02', title: t.systPillar2Title, label: t.systPillar2Sub },
                      { number: '03', title: t.systPillar3Title, label: t.systPillar3Sub },
                      { number: '04', title: t.systPillar4Title, label: t.systPillar4Sub }
                    ].map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePilar(idx)}
                        className={`p-4 rounded-lg border text-left transition-all flex items-center gap-4 cursor-pointer ${
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
  
                  {/* Pillar Detail Content Panel */}
                  <div className="lg:col-span-7">
                    <div className={`p-8 rounded-xl border h-full flex flex-col justify-between transition-all duration-300 ${themeStyles.card}`}>
                      <div className="space-y-4">
                        <span className="text-[#C17F4E] font-mono text-[10px] uppercase tracking-widest font-bold">Detalle del Pilar</span>
                        <h3 className={`text-xl sm:text-2xl font-display font-black uppercase ${themeStyles.title}`}>
                          {t.systPillarDetails[activePilar].title}
                        </h3>
                        <p className={`text-sm leading-relaxed font-semibold text-[#C17F4E]`}>
                          {t.systPillarDetails[activePilar].concept}
                        </p>
                        <p className={`text-xs sm:text-sm leading-relaxed ${themeStyles.textMuted}`}>
                          {t.systPillarDetails[activePilar].focus}
                        </p>
                      </div>
  
                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 mt-6">
                        <div>
                          <h5 className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest font-bold">Enfoque Operativo</h5>
                          <p className="font-mono text-xs font-bold text-[#C17F4E]">
                            SISTEMA TAILORED
                          </p>
                        </div>
                        <div>
                          <h5 className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest font-bold">Estado del Pilar</h5>
                          <p className="font-mono text-xs font-bold text-emerald-500">APLICACIÓN DE ELITE</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
  
              {/* --- SECCIÓN CÓMO TRABAJAMOS (8 SEMANAS TIMELINE) --- */}
              <motion.section 
                id="metodologia"
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
                    <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{t.metBadge}</span>
                    <h2 className={`font-display font-bold text-3xl sm:text-4xl uppercase mt-2 ${themeStyles.title}`}>
                      {t.metTitle}
                    </h2>
                    <p className={`text-sm font-sans font-light mt-4 leading-relaxed ${themeStyles.textMuted}`}>
                      {t.metSub}
                    </p>
                  </div>

                  {/* Timeline Tabs */}
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-8">
                    {t.metWeeks.map((wk, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveWeek(idx)}
                        className={`py-3 px-2 rounded font-mono text-[10px] uppercase tracking-wider transition-all border cursor-pointer text-center ${
                          activeWeek === idx
                            ? 'bg-[#C17F4E] text-white font-bold border-[#C17F4E] shadow-lg shadow-[#C17F4E]/10'
                            : isDark ? 'bg-zinc-900/40 border-white/5 text-zinc-400 hover:bg-zinc-800' : 'bg-[#FAF8F5] border-[#D6D0C1] text-slate-700 hover:bg-[#F2EFE9]'
                        }`}
                      >
                        <div className="font-black text-xs transition-colors" style={{ color: activeWeek === idx ? '#fff' : '#C17F4E' }}>{wk.number}</div>
                        <div className="truncate text-[9px] mt-0.5">{wk.title}</div>
                      </button>
                    ))}
                  </div>

                  {/* Active Step Panel */}
                  <div className={`p-6 sm:p-8 rounded-xl border ${themeStyles.card}`}>
                    <h3 className={`font-display font-black text-lg sm:text-xl uppercase mb-4 ${themeStyles.title}`}>
                      {t.metWeeks[activeWeek].number} • {t.metWeeks[activeWeek].title}
                    </h3>
                    <div className="space-y-4 font-sans text-xs sm:text-sm">
                      <p className={`leading-relaxed ${themeStyles.textMuted}`}>{t.metWeeks[activeWeek].action}</p>
                      <div className={`p-4 rounded border flex items-start gap-3 ${
                        activeWeek === 0 
                          ? 'bg-amber-500/5 border-amber-500/20 text-amber-500/90' 
                          : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500/90'
                      }`}>
                        <span className="font-mono text-[9px] font-bold uppercase shrink-0 px-2 py-0.5 rounded bg-black/20 text-white">
                          {activeWeek === 0 ? (lang === 'es' ? 'Regla Profesional' : 'Professional Rule') : (lang === 'es' ? 'Tu Beneficio' : 'Your Benefit')}
                        </span>
                        <p className="leading-relaxed italic">{t.metWeeks[activeWeek].rule}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
  
              {/* --- SECCIÓN STACKS TECNOLÓGICOS --- */}
              <motion.section 
                id="stacks"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-white/5 relative z-10"
              >
                <div className="max-w-4xl">
                  <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{t.stackBadge}</span>
                  <h2 className={`font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl uppercase mt-3 leading-none ${themeStyles.title}`}>
                    {t.stackTitle}
                  </h2>
                  <p className={`text-base sm:text-lg font-sans font-light mt-4 leading-relaxed max-w-2xl ${themeStyles.textMuted}`}>
                    {t.stackSub}
                  </p>
                </div>
  
                {/* 4 Levels Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                  {t.stackLevels.map((lvl, idx) => (
                    <div 
                      key={idx} 
                      className={`p-6 rounded-xl border flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${themeStyles.card}`}
                    >
                      <div>
                        <span className="text-[#C17F4E] font-mono text-[9px] uppercase tracking-widest font-black block mb-1">{lvl.target}</span>
                        <h3 className={`font-display font-black text-base uppercase mb-4 ${themeStyles.title}`}>{lvl.level}</h3>
                        
                        <div className="space-y-4 font-sans text-xs mb-6">
                          <div>
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Arquitectura</span>
                            <p className={`mt-0.5 ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>{lvl.arch}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Costo de servidores</span>
                            <p className="font-mono font-bold text-[#C17F4E] mt-0.5">{lvl.cost}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Uso Recomendado</span>
                            <p className={`mt-0.5 ${themeStyles.textMuted}`}>{lvl.use}</p>
                          </div>
                        </div>
                      </div>
  
                      <div className="pt-4 border-t border-white/5 mt-auto font-sans text-xs">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Diferenciador</span>
                        <p className="italic text-emerald-500 font-semibold mt-0.5">“{lvl.diff}”</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
  
              {/* --- SECCIÓN CLIENTES IDEALES --- */}
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
                    <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{t.clientBadge}</span>
                    <h2 className={`font-display font-bold text-3xl sm:text-4xl uppercase mt-2 ${themeStyles.title}`}>
                      {t.clientTitle}
                    </h2>
                    <p className={`text-sm font-sans font-light mt-3 leading-relaxed ${themeStyles.textMuted}`}>
                      {t.clientSub}
                    </p>
                  </div>
  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {t.clientProfiles.map((p, idx) => (
                      <div key={idx} className={`p-6 rounded-xl border flex flex-col justify-between ${themeStyles.card}`}>
                        <div>
                          <div className="w-12 h-12 rounded bg-[#C17F4E]/10 flex items-center justify-center text-[#C17F4E] mb-6">
                            {idx === 0 ? <Users className="w-6 h-6" /> : idx === 1 ? <Layers className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
                          </div>
                          <h3 className={`font-display font-bold text-lg uppercase mb-3 ${themeStyles.title}`}>{p.title}</h3>
                          <p className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${themeStyles.textMuted}`}>
                            {p.desc}
                          </p>
                        </div>
                        <div className="pt-6 border-t border-white/5 mt-6 font-mono text-[9px] text-[#C17F4E] font-bold uppercase tracking-wider">
                          {lang === 'es' ? 'Perfil Calificado' : 'Qualified Profile'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>
  
              {/* --- SECCIÓN PREGUNTAS FRECUENTES (FAQ) --- */}
              <motion.section 
                id="faq"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto"
              >
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{t.faqBadge}</span>
                  <h2 className={`font-display font-bold text-3xl sm:text-4xl uppercase mt-2 ${themeStyles.title}`}>
                    {t.faqTitle}
                  </h2>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                  {t.faqItems.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx} className={`rounded-lg border transition-all ${themeStyles.card}`}>
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full p-5 text-left flex justify-between items-center font-display font-bold text-xs sm:text-sm uppercase tracking-wider gap-4 cursor-pointer"
                        >
                          <span className={themeStyles.title}>{faq.q}</span>
                          <ChevronRight className={`w-4 h-4 text-[#C17F4E] shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-5 pt-0 border-t border-white/5 font-sans text-xs sm:text-sm leading-relaxed text-zinc-400">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.section>
  
              {/* --- SECCIÓN 10: FORMULARIO DE DIAGNÓSTICO DIGITAL (CTA FINAL) --- */}
              <motion.section 
                id="diagnostico"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`py-24 px-6 sm:px-10 lg:px-16 border-t border-white/5 relative z-10 ${
                  isDark ? 'bg-zinc-950/20' : 'bg-[#EAE6DB]/20'
                }`}
              >
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{t.diagBadge}</span>
                    <h2 className={`font-display font-bold text-3xl sm:text-4xl uppercase mt-2 ${themeStyles.title}`}>
                      {t.diagTitle}
                    </h2>
                    <p className={`text-sm font-sans font-light mt-4 leading-relaxed ${themeStyles.textMuted}`}>
                      {t.diagSub}
                    </p>
                  </div>

                  <div className={`p-8 sm:p-12 rounded-xl border shadow-2xl relative ${themeStyles.card}`}>
                    {validationError && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6 text-xs sm:text-sm font-sans flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{validationError}</span>
                      </div>
                    )}

                    {selectedModules.length > 0 && (
                      <div className="bg-[#C17F4E]/10 border border-[#C17F4E]/30 text-[#C17F4E] p-4 rounded-lg text-xs font-mono mb-6 leading-relaxed flex flex-col gap-1">
                        <div>
                          ⚡ <strong>MÓDULOS DE INTERÉS PRE-CONFIGURADOS DESDE TU COTIZADOR:</strong>
                        </div>
                        <div className="text-zinc-300 text-[11px] font-sans">
                          {selectedModules.map(id => MODULES.find(m => m.id === id)?.name).join(', ')}
                        </div>
                        <div className="mt-1 font-bold">
                          Presupuesto Estimado: ${configuratorTotal} USD | Tiempo de Despliegue: ~{configuratorDuration} semanas.
                        </div>
                      </div>
                    )}

                    {!formSubmitted ? (
                      <form onSubmit={handleFormSubmit} className="space-y-6">
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {/* Full Name */}
                          <div>
                            <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold flex justify-between items-center">
                              <span>{t.diagLabelName} *</span>
                              {isContactNameValid && (
                                <span className="text-emerald-500 text-[10px] flex items-center gap-1 font-mono">
                                  <Check className="w-3.5 h-3.5" /> Ok
                                </span>
                              )}
                            </label>
                            <input
                              type="text"
                              required
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              onBlur={() => handleFieldBlur('contactName')}
                              placeholder="Ej. Juan Pérez"
                              className={getInputClass('contactName', isContactNameValid, themeStyles)}
                            />
                          </div>

                          {/* Business Name */}
                          <div>
                            <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold flex justify-between items-center">
                              <span>{t.diagLabelCompany} *</span>
                              {isCompanyNameValid && (
                                <span className="text-emerald-500 text-[10px] flex items-center gap-1 font-mono">
                                  <Check className="w-3.5 h-3.5" /> Ok
                                </span>
                              )}
                            </label>
                            <input
                              type="text"
                              required
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              onBlur={() => handleFieldBlur('companyName')}
                              placeholder="Ej. Mi Empresa S.A."
                              className={getInputClass('companyName', isCompanyNameValid, themeStyles)}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {/* Email */}
                          <div>
                            <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold flex justify-between items-center">
                              <span>{t.diagLabelEmail} *</span>
                              {isContactEmailValid && (
                                <span className="text-emerald-500 text-[10px] flex items-center gap-1 font-mono">
                                  <Check className="w-3.5 h-3.5" /> Ok
                                </span>
                              )}
                            </label>
                            <input
                              type="email"
                              required
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              onBlur={() => handleFieldBlur('contactEmail')}
                              placeholder="juan@empresa.com"
                              className={getInputClass('contactEmail', isContactEmailValid, themeStyles)}
                            />
                          </div>

                          {/* WhatsApp */}
                          <div>
                            <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold flex justify-between items-center">
                              <span>{t.diagLabelPhone} *</span>
                              {isContactPhoneValid && (
                                <span className="text-emerald-500 text-[10px] flex items-center gap-1 font-mono">
                                  <Check className="w-3.5 h-3.5" /> Ok
                                </span>
                              )}
                            </label>
                            <input
                              type="tel"
                              required
                              value={contactPhone}
                              onChange={(e) => setContactPhone(e.target.value)}
                              onBlur={() => handleFieldBlur('contactPhone')}
                              placeholder="Ej. +593 98 318 6044"
                              className={getInputClass('contactPhone', isContactPhoneValid, themeStyles)}
                            />
                          </div>
                        </div>

                        {/* Current Website */}
                        <div>
                          <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold">
                            {t.diagLabelWeb}
                          </label>
                          <input
                            type="text"
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            placeholder="Ej. www.miempresa.com"
                            className={`w-full p-3 rounded text-sm transition-all duration-300 outline-none border ${themeStyles.input}`}
                          />
                        </div>

                        {/* Obstacles Select */}
                        <div>
                          <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-3 font-bold">
                            {t.diagLabelObstacle}
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {t.diagObstacles.map((opt) => (
                              <label
                                key={opt}
                                className={`p-3.5 rounded border text-xs cursor-pointer flex items-start gap-3 transition-all ${
                                  bottleneck === opt
                                    ? 'border-[#C17F4E] bg-[#C17F4E]/5 text-white'
                                    : isDark ? 'border-white/5 bg-zinc-950/40 text-zinc-400 hover:border-white/10' : 'border-slate-200 bg-white hover:border-slate-300'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="obstacle"
                                  value={opt}
                                  checked={bottleneck === opt}
                                  onChange={() => setBottleneck(opt)}
                                  className="mt-0.5 accent-[#C17F4E]"
                                />
                                <span className="leading-snug">{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Budget Select */}
                        <div>
                          <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-3 font-bold">
                            {t.diagLabelBudget}
                          </label>
                          <div className="grid grid-cols-1 gap-3">
                            {t.diagBudgets.map((opt) => (
                              <label
                                key={opt}
                                className={`p-3.5 rounded border text-xs cursor-pointer flex items-start gap-3 transition-all ${
                                  digitalMaturity === opt
                                    ? 'border-[#C17F4E] bg-[#C17F4E]/5 text-white'
                                    : isDark ? 'border-white/5 bg-zinc-950/40 text-zinc-400 hover:border-white/10' : 'border-slate-200 bg-white hover:border-slate-300'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="budgetRange"
                                  value={opt}
                                  checked={digitalMaturity === opt}
                                  onChange={() => setDigitalMaturity(opt)}
                                  className="mt-0.5 accent-[#C17F4E]"
                                />
                                <span className="leading-snug">{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full py-4 bg-[#C17F4E] text-white text-xs font-mono font-bold uppercase tracking-widest rounded hover:bg-[#D79663] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#C17F4E]/10 cursor-pointer"
                        >
                          <Send className="w-4 h-4 animate-pulse" />
                          <span>{t.diagSubmit}</span>
                        </button>

                      </form>
                    ) : (
                      <div className="text-center py-12 space-y-6 fade-in">
                        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                          <CheckCircle className="w-8 h-8 animate-bounce" />
                        </div>
                        <h3 className={`font-display font-bold text-2xl uppercase ${themeStyles.title}`}>
                          {t.diagSuccessTitle}
                        </h3>
                        <p className={`text-sm leading-relaxed max-w-md mx-auto ${themeStyles.textMuted}`}>
                          {t.diagSuccessSub}
                        </p>
                        <div className="pt-4">
                          <button
                            onClick={resetForm}
                            className="bg-zinc-800 border border-white/5 text-zinc-400 hover:text-white px-5 py-2.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                          >
                            Reiniciar Formulario
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.section>

          </div>
        )}

        {/* ======================================= */}
        {/*           PAGE 2: PRECIOS & COTIZADOR   */}
        {/* ======================================= */}
        {activePage === 'precios' && (
          <div className="fade-in">
            
            {/* --- HERO PRECIOS --- */}
            <section className="relative py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
              <div className="max-w-4xl">
                <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{lang === 'es' ? 'Cotizador Inteligente' : 'Smart Configurator'}</span>
                <h1 className={`font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl uppercase mt-3 leading-none ${themeStyles.title}`}>
                  {lang === 'es' ? 'Precios y Despliegue' : 'Pricing & Deployment'}
                </h1>
                <p className={`text-base sm:text-lg font-sans font-light mt-4 leading-relaxed max-w-2xl ${themeStyles.textMuted}`}>
                  {lang === 'es' 
                    ? 'Selecciona los módulos de software que tu negocio necesita y calcula en tiempo real una estimación de inversión y tiempos de despliegue.'
                    : 'Select the software modules your business needs and calculate in real-time an investment estimate and deployment timeline.'}
                </p>
              </div>
            </section>

            {/* --- CATÁLOGO DE SERVICIOS Y RANGOS DE INVERSIÓN (SECCIÓN 5) --- */}
            <section className={`py-20 px-6 sm:px-10 lg:px-16 border-t ${isDark ? 'bg-zinc-950/20 border-white/5' : 'bg-[#FAF8F5]/50 border-[#D6D0C1]'}`}>
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{t.priceBadge}</span>
                  <h2 className={`font-display font-bold text-3xl sm:text-4xl uppercase mt-2 ${themeStyles.title}`}>
                    {t.priceTitle}
                  </h2>
                  <p className={`text-sm font-sans font-light mt-3 leading-relaxed ${themeStyles.textMuted}`}>
                    {t.priceSub}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {t.priceTiers.map((category, idx) => (
                    <div key={idx} className={`p-8 rounded-xl border flex flex-col justify-between transition-all duration-300 hover:border-[#C17F4E]/30 ${themeStyles.card}`}>
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className={`font-display font-bold text-lg uppercase tracking-wider ${themeStyles.title}`}>
                            {category.category}
                          </h3>
                        </div>
                        <p className={`text-xs font-sans font-light mb-8 leading-relaxed ${themeStyles.textMuted}`}>
                          {category.desc}
                        </p>

                        <div className="space-y-6">
                          {category.ranges.map((range, rIdx) => (
                            <div key={rIdx} className="p-4 rounded bg-[#C17F4E]/5 border border-[#C17F4E]/10 space-y-2">
                              <div className="flex justify-between items-baseline flex-wrap gap-2">
                                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                                  {range.name}
                                </h4>
                              </div>
                              <p className={`text-xs font-sans leading-relaxed ${themeStyles.textMuted}`}>
                                <strong className="text-zinc-300 font-semibold">{lang === 'es' ? 'Ideal para: ' : 'Ideal for: '}</strong>{range.for}
                              </p>
                              <div className="text-[11px] font-sans text-zinc-400 flex items-start gap-1.5 leading-relaxed pt-1.5 border-t border-white/5">
                                <span className="text-[#C17F4E] font-bold shrink-0">✓</span>
                                <span><strong className="text-zinc-300 font-semibold">{lang === 'es' ? 'Incluye: ' : 'Includes: '}</strong>{range.include}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-white/5 mt-8 flex justify-between items-center text-[10px] font-mono uppercase tracking-wider">
                        <span className="text-zinc-500">{lang === 'es' ? 'Hitos: 40% / 40% / 20%' : 'Milestones: 40% / 40% / 20%'}</span>
                        <span className="text-[#C17F4E] font-bold">{lang === 'es' ? 'COTIZADOR ABAJO ↓' : 'QUOTE BELOW ↓'}</span>
                      </div>
                    </div>
                  ))}
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
                      <CircleUser className="w-8 h-8" />
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

              {/* Right Side: Diagnostic Form (Section 10) */}
              <div className="lg:col-span-7">
                <div className={`p-8 rounded-xl border shadow-2xl relative ${themeStyles.card}`}>
                  
                  {validationError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6 text-xs sm:text-sm font-sans flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  {selectedModules.length > 0 && (
                    <div className="bg-[#C17F4E]/10 border border-[#C17F4E]/30 text-[#C17F4E] p-4 rounded-lg text-xs font-mono mb-6 leading-relaxed flex flex-col gap-1">
                      <div>
                        ⚡ <strong>MÓDULOS DE INTERÉS PRE-CONFIGURADOS DESDE TU COTIZADOR:</strong>
                      </div>
                      <div className="text-zinc-300 text-[11px] font-sans">
                        {selectedModules.map(id => MODULES.find(m => m.id === id)?.name).join(', ')}
                      </div>
                      <div className="mt-1 font-bold">
                        Presupuesto Estimado: ${configuratorTotal} USD | Tiempo de Despliegue: ~{configuratorDuration} semanas.
                      </div>
                    </div>
                  )}

                  {!formSubmitted ? (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                          <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold flex justify-between items-center">
                            <span>{t.diagLabelName} *</span>
                            {isContactNameValid && (
                              <span className="text-emerald-500 text-[10px] flex items-center gap-1 font-mono">
                                <Check className="w-3.5 h-3.5" /> Ok
                              </span>
                            )}
                          </label>
                          <input
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            onBlur={() => handleFieldBlur('contactName')}
                            placeholder="Ej. Juan Pérez"
                            className={getInputClass('contactName', isContactNameValid, themeStyles)}
                          />
                        </div>

                        {/* Business Name */}
                        <div>
                          <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold flex justify-between items-center">
                            <span>{t.diagLabelCompany} *</span>
                            {isCompanyNameValid && (
                              <span className="text-emerald-500 text-[10px] flex items-center gap-1 font-mono">
                                <Check className="w-3.5 h-3.5" /> Ok
                              </span>
                            )}
                          </label>
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            onBlur={() => handleFieldBlur('companyName')}
                            placeholder="Ej. Mi Empresa S.A."
                            className={getInputClass('companyName', isCompanyNameValid, themeStyles)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Email */}
                        <div>
                          <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold flex justify-between items-center">
                            <span>{t.diagLabelEmail} *</span>
                            {isContactEmailValid && (
                              <span className="text-emerald-500 text-[10px] flex items-center gap-1 font-mono">
                                <Check className="w-3.5 h-3.5" /> Ok
                              </span>
                            )}
                          </label>
                          <input
                            type="email"
                            required
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            onBlur={() => handleFieldBlur('contactEmail')}
                            placeholder="juan@empresa.com"
                            className={getInputClass('contactEmail', isContactEmailValid, themeStyles)}
                          />
                        </div>

                        {/* WhatsApp */}
                        <div>
                          <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold flex justify-between items-center">
                            <span>{t.diagLabelPhone} *</span>
                            {isContactPhoneValid && (
                              <span className="text-emerald-500 text-[10px] flex items-center gap-1 font-mono">
                                <Check className="w-3.5 h-3.5" /> Ok
                              </span>
                            )}
                          </label>
                          <input
                            type="tel"
                            required
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            onBlur={() => handleFieldBlur('contactPhone')}
                            placeholder="Ej. +593 98 318 6044"
                            className={getInputClass('contactPhone', isContactPhoneValid, themeStyles)}
                          />
                        </div>
                      </div>

                      {/* Current Website */}
                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold">
                          {t.diagLabelWeb}
                        </label>
                        <input
                          type="text"
                          value={customMessage}
                          onChange={(e) => setCustomMessage(e.target.value)}
                          placeholder="Ej. www.miempresa.com"
                          className={`w-full p-3 rounded text-sm transition-all duration-300 outline-none border ${themeStyles.input}`}
                        />
                      </div>

                      {/* Obstacles Select */}
                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-3 font-bold">
                          {t.diagLabelObstacle}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {t.diagObstacles.map((opt) => (
                            <label
                              key={opt}
                              className={`p-3.5 rounded border text-xs cursor-pointer flex items-start gap-3 transition-all ${
                                bottleneck === opt
                                  ? 'border-[#C17F4E] bg-[#C17F4E]/5 text-white'
                                  : isDark ? 'border-white/5 bg-zinc-950/40 text-zinc-400 hover:border-white/10' : 'border-slate-200 bg-white hover:border-slate-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name="contact_obstacle"
                                value={opt}
                                checked={bottleneck === opt}
                                onChange={() => setBottleneck(opt)}
                                className="mt-0.5 accent-[#C17F4E]"
                              />
                              <span className="leading-snug">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Budget Select */}
                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-3 font-bold">
                          {t.diagLabelBudget}
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                          {t.diagBudgets.map((opt) => (
                            <label
                              key={opt}
                              className={`p-3.5 rounded border text-xs cursor-pointer flex items-start gap-3 transition-all ${
                                digitalMaturity === opt
                                  ? 'border-[#C17F4E] bg-[#C17F4E]/5 text-white'
                                  : isDark ? 'border-white/5 bg-zinc-950/40 text-zinc-400 hover:border-white/10' : 'border-slate-200 bg-white hover:border-slate-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name="contact_budgetRange"
                                value={opt}
                                checked={digitalMaturity === opt}
                                onChange={() => setDigitalMaturity(opt)}
                                className="mt-0.5 accent-[#C17F4E]"
                              />
                              <span className="leading-snug">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full py-4 bg-[#C17F4E] text-white text-xs font-mono font-bold uppercase tracking-widest rounded hover:bg-[#D79663] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#C17F4E]/10 cursor-pointer"
                      >
                        <Send className="w-4 h-4 animate-pulse" />
                        <span>{t.diagSubmit}</span>
                      </button>

                    </form>
                  ) : (
                    <div className="text-center py-12 space-y-6 fade-in">
                      <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                        <CheckCircle className="w-8 h-8 animate-bounce" />
                      </div>
                      <h3 className={`font-display font-bold text-2xl uppercase ${themeStyles.title}`}>
                        {t.diagSuccessTitle}
                      </h3>
                      <p className={`text-sm leading-relaxed max-w-md mx-auto ${themeStyles.textMuted}`}>
                        {t.diagSuccessSub}
                      </p>
                      <div className="pt-4">
                        <button
                          onClick={resetForm}
                          className="bg-zinc-800 border border-white/5 text-zinc-400 hover:text-white px-5 py-2.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Reiniciar Formulario
                        </button>
                      </div>
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
