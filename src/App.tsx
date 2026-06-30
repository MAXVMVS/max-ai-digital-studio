import React, { useState, useEffect, useMemo } from 'react';
import { 
  Brain, Layers, Code2, Network, 
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

// --- Modularized Imports ---
import { Footer } from './components/Footer';
import { MODULES, CASE_STUDIES, INITIAL_LOGS, TRANSLATIONS, CaseStudy } from './i18n/translations';
import { Interactive3DNetwork } from './components/Interactive3DNetwork';
import { CaseStudyCard } from './components/CaseStudyCard';
import { useLocation } from './lib/router';

const IsometricScene = React.lazy(() => 
  import('./components/IsometricScene').then(module => ({ default: module.IsometricScene }))
);
const Logos3 = React.lazy(() => 
  import('./components/ui/logos3').then(module => ({ default: module.Logos3 }))
);


export default function App() {
  const [path, navigate] = useLocation();

  const activePage = useMemo(() => {
    if (path === '/precios') return 'precios';
    if (path === '/portafolio') return 'portafolio';
    if (path === '/contacto') return 'contacto';
    if (path === '/login') return 'login';
    return 'inicio';
  }, [path]);

  const setActivePage = (page: 'inicio' | 'precios' | 'portafolio' | 'contacto' | 'login') => {
    if (page === 'inicio') navigate('/');
    else navigate(`/${page}`);
  };


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
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('maxai_is_dark');
    return saved !== null ? saved === 'true' : true;
  });
  const [lang, setLang] = useState<'es' | 'en'>(() => {
    const saved = localStorage.getItem('maxai_lang');
    return (saved as 'es' | 'en') || 'es';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('maxai_is_dark', String(isDark));
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('maxai_lang', lang);
  }, [lang]);

  const t = TRANSLATIONS[lang];

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

  // Configurator Selected modules state
  const [selectedModules, setSelectedModules] = useState<string[]>(['meta_b2c', 'whatsapp_flow']);

  // Pricing selected ranges state (12 checkboxes)
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);

  const getRangePrice = (name: string): number => {
    const match = name.match(/\$(\d+[\d,]*)/);
    if (match) {
      return parseInt(match[1].replace(/,/g, ''), 10);
    }
    return 0;
  };

  const totalBudget = useMemo(() => {
    let sum = 0;
    selectedRanges.forEach((key) => {
      const [catIdx, rIdx] = key.split('_').map(Number);
      const category = t.priceTiers[catIdx];
      if (category) {
        const range = category.ranges[rIdx];
        if (range) {
          sum += getRangePrice(range.name);
        }
      }
    });
    return sum;
  }, [selectedRanges, t.priceTiers]);

  const toggleRangeSelection = (key: string) => {
    const [catIdx] = key.split('_').map(Number);
    setSelectedRanges((prev) => {
      if (prev.includes(key)) {
        return prev.filter((k) => k !== key);
      }
      if (catIdx === 3) {
        return [...prev, key];
      }
      const cleaned = prev.filter((k) => !k.startsWith(`${catIdx}_`));
      return [...cleaned, key];
    });
  };

  const handleProceedToOnboardingWithRanges = () => {
    const selectedDetails = selectedRanges.map((key) => {
      const [catIdx, rIdx] = key.split('_').map(Number);
      const category = t.priceTiers[catIdx];
      const range = category?.ranges[rIdx];
      return range ? `- ${category.category}: ${range.name}` : '';
    }).filter(Boolean).join('\n');

    const message = lang === 'es'
      ? `Hola MAX AI, he seleccionado los siguientes rangos de inversión en la calculadora:\n${selectedDetails}\n\nPresupuesto base estimado: $${totalBudget} USD.`
      : `Hello MAX AI, I have selected the following investment ranges in the calculator:\n${selectedDetails}\n\nEstimated base budget: $${totalBudget} USD.`;
    
    setCustomMessage(message);
    setActivePage('inicio');
    setTimeout(() => {
      const element = document.getElementById('diagnostico');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

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

  // Synchronize document.title dynamically with activePage for SEO and UX optimization
  useEffect(() => {
    const titles: Record<string, string> = {
      inicio: 'MAX AI - Digital Studio',
      precios: lang === 'es' ? 'Precios & Servicios | MAX AI Digital Studio' : 'Pricing & Services | MAX AI Digital Studio',
      portafolio: lang === 'es' ? 'Portafolio de Casos | MAX AI Digital Studio' : 'Case Portfolio | MAX AI Digital Studio',
      contacto: lang === 'es' ? 'Contacto | MAX AI Digital Studio' : 'Contact | MAX AI Digital Studio',
      login: lang === 'es' ? 'Portal de Clientes | MAX AI Digital Studio' : 'Client Portal | MAX AI Digital Studio'
    };
    document.title = titles[activePage] || 'MAX AI - Digital Studio';
  }, [activePage, lang]);

  // Append logs dynamically to simulate live SaaS processing
  useEffect(() => {
    const logTemplates = [
      'INFO: Meta Graph API catalog sync triggered. Modified items: 12.',
      'SUCCESS: Lead auto-qualified. Intent confidence score: 98.4%. Dispatching WhatsApp hook...',
      'SYNC: Cloud Firestore synchronized in 23ms for health platform users.',
      'SYSTEM: Resource optimization complete. Cloud Run memory pressure: 14.2%.',
      'ALERT: Auto-dealer stock updated. Pushing cache invalidation to client frontend.',
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
    bg: 'bg-slate-50 text-slate-900',
    header: 'bg-white/90 border-slate-200/80 shadow-sm backdrop-blur-md',
    card: 'bg-white border-slate-200/80 shadow-md shadow-slate-100/50 backdrop-blur-md',
    cardInner: 'bg-slate-50 border-slate-200/60',
    input: 'bg-white border-slate-200 text-slate-800 focus:border-[#C17F4E] focus:ring-1 focus:ring-[#C17F4E]',
    textMuted: 'text-slate-500 font-medium',
    title: 'text-slate-950 font-black'
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
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${themeStyles.bg} ${isDark ? 'dark-theme' : 'light-theme'}`}>
      
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
              <div className={`flex p-0.5 rounded-full border ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
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
              <div className={`flex p-0.5 rounded-full border ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                <button
                  onClick={() => setIsDark(true)}
                  className={`p-1 rounded-full transition-all cursor-pointer ${isDark ? 'bg-[#C17F4E] text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  title={lang === 'es' ? "Modo Oscuro" : "Dark Mode"}
                  aria-label={lang === 'es' ? "Activar Modo Oscuro" : "Activate Dark Mode"}
                >
                  <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
                <button
                  onClick={() => setIsDark(false)}
                  className={`p-1 rounded-full transition-all cursor-pointer ${!isDark ? 'bg-[#C17F4E] text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  title={lang === 'es' ? "Modo Claro" : "Light Mode"}
                  aria-label={lang === 'es' ? "Activar Modo Claro" : "Activate Light Mode"}
                >
                  <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>

            {/* Brand Logo with Fluid Expanding Image Effect */}
            <div 
              className="group relative h-12 w-12 hover:w-[165px] rounded-xl transition-all duration-500 ease-out cursor-pointer overflow-hidden flex items-center shrink-0 ml-1 md:ml-2" 
              onClick={() => setActivePage('inicio')}
            >
              {/* Small Logo */}
              <img 
                src={isDark ? "/logo_pequeno.png" : "/logo_pequeno_light.jpeg"} 
                alt="MAX AI" 
                className={`absolute left-0 top-0 h-12 w-12 rounded-xl object-contain transition-all duration-300 group-hover:opacity-0 group-hover:scale-90 ${!isDark ? 'mix-blend-multiply' : ''}`} 
              />
              {/* Long Logo */}
              <img 
                src={isDark ? "/logo_largo.png" : "/logo_largo_light.jpeg"} 
                alt="MAX AI Digital Studio" 
                className={`absolute left-0 top-0 h-12 w-[165px] rounded-xl object-contain opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 ${!isDark ? 'mix-blend-multiply' : ''}`} 
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
              {lang === 'es' ? (
                <>
                  Precios <span className="text-[#C17F4E]">&</span> Servicios
                </>
              ) : (
                <>
                  Pricing <span className="text-[#C17F4E]">&</span> Services
                </>
              )}
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
              aria-label={currentUser ? (lang === 'es' ? 'Portal de clientes / Cuenta' : 'Client portal / Account') : (lang === 'es' ? 'Iniciar sesión' : 'Sign in')}
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
              aria-label={mobileMenuOpen ? (lang === 'es' ? 'Cerrar menú' : 'Close menu') : (lang === 'es' ? 'Abrir menú' : 'Open menu')}
              className={`p-2 rounded border transition-all ${
                isDark
                  ? 'border-white/5 bg-zinc-900/40 text-zinc-300 hover:text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
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
                  {lang === 'es' ? (
                    <>
                      Precios <span className="text-[#C17F4E]">&</span> Servicios
                    </>
                  ) : (
                    <>
                      Pricing <span className="text-[#C17F4E]">&</span> Services
                    </>
                  )}
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
                <div className="lg:col-span-7 flex flex-col items-center text-center gap-6">

                  <h1 className={`font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight uppercase ${themeStyles.title}`}>
                    {t.heroTitle1} <br/> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C17F4E] to-[#D79663]">{t.heroTitle2}</span> <br/> 
                    {t.heroTitle3}
                    {t.heroTitle4 && (
                      <>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C17F4E] to-[#D79663]">{t.heroTitle4}</span>
                      </>
                    )}
                  </h1>

                  <p className={`text-base sm:text-lg max-w-xl font-sans font-light leading-relaxed ${themeStyles.textMuted} mx-auto`}>
                    {t.heroSub}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4 justify-center items-start">
                    <div className="flex flex-col items-center gap-1">
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
                      <p className="text-[9px] text-zinc-500 font-mono mt-1 text-center">{t.heroCta1Sub}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setActivePage('precios');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`px-8 py-3.5 rounded text-xs font-bold uppercase tracking-widest transition-all text-center border cursor-pointer h-fit ${
                        isDark 
                          ? 'border-transparent bg-white text-zinc-950 hover:bg-zinc-200 shadow-lg shadow-white/5' 
                          : 'border-transparent bg-white text-zinc-950 hover:bg-zinc-100 shadow-md'
                      }`}
                    >
                      {t.heroCta2}
                    </button>
                  </div>

                  {/* Ecosystem Logos Marquee inside Hero */}
                  <React.Suspense fallback={<div className="h-20 w-full flex items-center justify-center text-zinc-500 font-mono text-[9px] uppercase tracking-widest">Loading tools marquee...</div>}>
                    <Logos3 heading={lang === 'es' ? 'Herramientas de nuestro ecosistema' : 'Our Ecosystem Stack'} isDark={isDark} />
                  </React.Suspense>
                </div>

                {/* Right Column: Dynamic Agentic Ecosystem Hub */}
                <div className="lg:col-span-5 relative w-full select-none flex flex-col items-center gap-4">
                  {/* Centered Logo above the diagram */}
                  <div className="w-full flex justify-center mb-2">
                    <img 
                      src={isDark ? "/logo_max_ai_hero.png?v=2" : "/logo_max_ai_hero_light.png?v=2"} 
                      alt="MAX AI" 
                      className={`w-[64%] h-auto object-contain ${isDark ? 'filter drop-shadow-[0_4px_12px_rgba(193,127,78,0.15)]' : ''}`}
                    />
                  </div>
                  {/* Diorama (diagrama pixel art) below */}
                  <div className={`p-1.5 rounded-2xl border transition-all duration-500 w-full relative overflow-hidden h-[330px] flex items-center justify-center ${themeStyles.card}`}>
                    <React.Suspense fallback={<div className="h-full w-full flex items-center justify-center text-zinc-500 font-mono text-xs">Loading diorama...</div>}>
                      <IsometricScene isDark={isDark} lang={lang} themeStyles={themeStyles} />
                    </React.Suspense>
                  </div>
                </div>

              </div>
            </section>

  
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
                  <span className="text-[#C17F4E] font-mono text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-[0.15em] block mb-4">
                    {t.systBadge}
                  </span>
                  <h2 className={`font-display font-bold text-lg sm:text-xl lg:text-2xl leading-relaxed uppercase mt-2 ${themeStyles.title}`}>
                    {t.systTitle}
                  </h2>
                </div>

                {/* Cyclic Diagram Connection Stepper */}
                <div className={`hidden lg:flex justify-between items-center max-w-4xl mx-auto mb-16 p-4 rounded-xl font-mono text-[9px] uppercase tracking-widest text-zinc-500 border ${
                  isDark ? 'bg-zinc-950/20 border-white/5' : 'bg-slate-100 border-slate-200 text-slate-500'
                }`}>
                  <button 
                    onClick={() => setActivePilar(0)}
                    className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                      activePilar === 0 
                        ? 'bg-[#C17F4E]/10 text-[#C17F4E] font-bold border border-[#C17F4E]/30' 
                        : isDark ? 'hover:text-zinc-300' : 'hover:text-slate-800'
                    }`}
                  >
                    1. {t.systPillar1Title}
                  </button>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-700" />
                  <button 
                    onClick={() => setActivePilar(1)}
                    className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                      activePilar === 1 
                        ? 'bg-[#C17F4E]/10 text-[#C17F4E] font-bold border border-[#C17F4E]/30' 
                        : isDark ? 'hover:text-zinc-300' : 'hover:text-slate-800'
                    }`}
                  >
                    2. {t.systPillar2Title}
                  </button>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-700" />
                  <button 
                    onClick={() => setActivePilar(2)}
                    className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                      activePilar === 2 
                        ? 'bg-[#C17F4E]/10 text-[#C17F4E] font-bold border border-[#C17F4E]/30' 
                        : isDark ? 'hover:text-zinc-300' : 'hover:text-slate-800'
                    }`}
                  >
                    3. {t.systPillar3Title}
                  </button>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-700" />
                  <button 
                    onClick={() => setActivePilar(3)}
                    className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                      activePilar === 3 
                        ? 'bg-[#C17F4E]/10 text-[#C17F4E] font-bold border border-[#C17F4E]/30' 
                        : isDark ? 'hover:text-zinc-300' : 'hover:text-slate-800'
                    }`}
                  >
                    4. {t.systPillar4Title}
                  </button>
                </div>
  
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                  {/* Pillar Selector Buttons */}
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
                            : isDark ? 'border-zinc-800 bg-zinc-900/20 hover:bg-zinc-800/40' : 'border-slate-200 bg-white hover:bg-slate-50'
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
  
                  {/* Pillar Detail Content Panel & Simulation Widget */}
                  <div className="lg:col-span-7">
                    <div className={`p-8 rounded-xl border h-full flex flex-col justify-between transition-all duration-300 ${themeStyles.card}`}>
                      <div className="space-y-4">
                        <span className="text-[#C17F4E] font-mono text-[9px] uppercase tracking-widest font-bold">Detalle del Pilar</span>
                        <h3 className={`text-xl sm:text-2xl font-display font-black uppercase ${themeStyles.title}`}>
                          {t.systPillarDetails[activePilar].title}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed font-semibold text-[#C17F4E]`}>
                          {t.systPillarDetails[activePilar].concept}
                        </p>
                        <p className={`text-xs sm:text-sm leading-relaxed ${themeStyles.textMuted}`}>
                          {t.systPillarDetails[activePilar].focus}
                        </p>
                      </div>

                      {/* Simulation Widget */}
                      <div className="mt-6 pt-6 border-t border-white/5">
                        {activePilar === 0 && (
                          <div className="p-4 rounded-lg bg-zinc-950/60 border border-white/5 font-mono text-[10px] space-y-3">
                            <div className="flex justify-between items-center text-zinc-500 uppercase">
                              <span>Brand Identity System</span>
                              <span>Autoridad: 100%</span>
                            </div>
                            <div className="flex gap-4 items-center">
                              <div className="w-10 h-10 rounded bg-gradient-to-br from-[#C17F4E] to-[#D79663] flex items-center justify-center text-white font-display font-bold text-lg select-none">
                                M
                              </div>
                              <div>
                                <div className="font-bold text-white text-xs">MAX AI Digital</div>
                                <div className="text-[9px] text-zinc-500">Silent Luxury Design Language</div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <span className="w-3 h-3 rounded-full bg-[#020813] border border-white/10" title="#020813"></span>
                              <span className="w-3 h-3 rounded-full bg-[#C17F4E]" title="#C17F4E"></span>
                              <span className="w-3 h-3 rounded-full bg-white" title="#FFFFFF"></span>
                              <span className="w-3 h-3 rounded-full bg-zinc-500" title="#71717A"></span>
                            </div>
                          </div>
                        )}
                        {activePilar === 1 && (
                          <div className="p-4 rounded-lg bg-zinc-950/60 border border-white/5 font-mono text-[10px] space-y-3">
                            <div className="flex justify-between items-center text-zinc-500 uppercase">
                              <span>Vercel Deploy Probe</span>
                              <span>Uptime: 100%</span>
                            </div>
                            <div className="p-2.5 rounded bg-black/60 border border-white/5 space-y-1.5">
                              <div className="flex justify-between text-zinc-400">
                                <span>tuproyecto.com</span>
                                <span className="text-emerald-500">Online</span>
                              </div>
                              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-full"></div>
                              </div>
                            </div>
                            <div className="flex justify-between text-[9px] text-zinc-500">
                              <span>TTFB: 18ms</span>
                              <span>LCP: 0.8s (Excelente)</span>
                            </div>
                          </div>
                        )}
                        {activePilar === 2 && (
                          <div className="p-4 rounded-lg bg-zinc-950/60 border border-white/5 font-mono text-[10px] space-y-3">
                            <div className="flex justify-between items-center text-zinc-500 uppercase">
                              <span>Funnel Conversion Rate</span>
                              <span>ROI: +340%</span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-zinc-300">
                                <span>Visitas del Mes</span>
                                <span className="text-white font-bold">12,450</span>
                              </div>
                              <div className="flex justify-between text-zinc-300">
                                <span>Leads Calificados</span>
                                <span className="text-[#C17F4E] font-bold">1,820 (14.6%)</span>
                              </div>
                              <div className="flex justify-between text-zinc-300">
                                <span>Costo Adquisición (CAC)</span>
                                <span className="text-emerald-500 font-bold">-45% Mínimo</span>
                              </div>
                            </div>
                          </div>
                        )}
                        {activePilar === 3 && (
                          <div className="p-4 rounded-lg bg-zinc-950/60 border border-white/5 font-mono text-[10px] space-y-2 h-28 overflow-y-auto">
                            <div className="text-zinc-500 uppercase text-[9px] mb-1">AI Agent Process Logs</div>
                            <div className="text-[#C17F4E]"><span className="text-zinc-600">[system]</span> Init Gemini-2.0-Flash...</div>
                            <div className="text-emerald-400"><span className="text-zinc-600">[agent]</span> Analizando WhatsApp lead...</div>
                            <div className="text-zinc-300"><span className="text-zinc-600">[agent]</span> Calificación: Apta (Presupuesto OK)</div>
                            <div className="text-zinc-300"><span className="text-zinc-600">[system]</span> Agendado Calendy 24/7 de forma autónoma.</div>
                          </div>
                        )}
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
                    <span className="text-[#C17F4E] font-mono text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-[0.15em] block mb-4">
                      {t.metBadge}
                    </span>
                    <h2 className={`font-display font-bold text-lg sm:text-xl lg:text-2xl leading-relaxed uppercase mt-2 ${themeStyles.title}`}>
                      {t.metTitle}
                    </h2>
                  </div>

                  {/* Progress Line Stepper (Desktop) */}
                  <div className="relative mb-20 max-w-5xl mx-auto hidden md:block px-6">
                    {/* Background line */}
                    <div className={`absolute top-5 left-6 right-6 h-[2px] -translate-y-1/2 ${
                      isDark ? 'bg-zinc-800/80' : 'bg-[#D0C9B8]'
                    }`}></div>
                    {/* Active progress line */}
                    <div 
                      className="absolute top-5 left-6 right-6 h-[2px] -translate-y-1/2 overflow-hidden pointer-events-none"
                    >
                      <div 
                        className="h-full bg-[#C17F4E] transition-all duration-500 ease-out"
                        style={{ width: `${(activeWeek / 5) * 100}%` }}
                      ></div>
                    </div>
                    
                    {/* Dots */}
                    <div className="relative flex justify-between">
                      {t.metWeeks.map((wk, idx) => {
                        const isActive = activeWeek === idx;
                        const isCompleted = activeWeek > idx;
                        return (
                          <div 
                            key={idx} 
                            onClick={() => setActiveWeek(idx)}
                            className="flex flex-col items-center select-none cursor-pointer group w-24 relative"
                          >
                            <div 
                              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold transition-all z-10 ${
                                isActive
                                  ? `border-[#C17F4E] text-[#C17F4E] scale-110 shadow-lg shadow-[#C17F4E]/25 ${
                                      isDark ? 'bg-zinc-950' : 'bg-white'
                                    }`
                                  : isCompleted
                                    ? 'border-[#C17F4E] bg-[#C17F4E] text-zinc-950'
                                    : isDark 
                                      ? 'border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-[#C17F4E]' 
                                      : 'border-slate-200 bg-white text-zinc-500 hover:border-[#C17F4E]'
                              }`}
                            >
                              <span>{idx + 1}</span>
                            </div>
                            <div className="absolute top-12 text-center w-24 flex flex-col items-center">
                              <span className={`font-mono text-[9px] uppercase tracking-wider block font-bold transition-colors ${
                                isActive ? 'text-[#C17F4E]' : 'text-zinc-500 group-hover:text-zinc-400'
                              }`}>
                                {wk.number}
                              </span>
                              <span className={`text-[9px] leading-snug font-semibold transition-colors mt-0.5 max-h-8 overflow-hidden text-ellipsis ${
                                isActive ? (isDark ? 'text-white' : 'text-[#020813]') : 'text-zinc-500'
                              }`}>
                                {wk.title}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mobile Timeline Grid Fallback */}
                  <div className="grid grid-cols-2 gap-2 mb-8 md:hidden">
                    {t.metWeeks.map((wk, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveWeek(idx)}
                        className={`py-3 px-2 rounded font-mono text-[10px] uppercase tracking-wider transition-all border cursor-pointer text-center ${
                          activeWeek === idx
                            ? 'bg-[#C17F4E] text-white font-bold border-[#C17F4E] shadow-lg shadow-[#C17F4E]/10'
                            : isDark ? 'bg-zinc-900/40 border-white/5 text-zinc-400 hover:bg-zinc-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
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
                    <span className="text-[#C17F4E] font-mono text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-[0.15em] block mb-4">
                      {t.diagBadge}
                    </span>
                    <p className={`text-sm sm:text-base font-sans font-light mt-4 leading-relaxed ${themeStyles.textMuted} max-w-2xl mx-auto`}>
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
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{lang === 'es' ? 'Cotizador Inteligente' : 'Smart Configurator'}</span>
                <h1 className={`font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight uppercase mt-3 ${themeStyles.title}`}>
                  {lang === 'es' ? (
                    <>
                      Precios <span className="text-[#C17F4E]">&</span> servicios
                    </>
                  ) : (
                    <>
                      Pricing <span className="text-[#C17F4E]">&</span> services
                    </>
                  )}
                </h1>
                <p className={`text-base sm:text-lg font-sans font-light mt-4 leading-relaxed max-w-2xl mx-auto ${themeStyles.textMuted}`}>
                  {lang === 'es' 
                    ? 'Selecciona los módulos de software que tu negocio necesita y calcula en tiempo real una estimación de inversión y tiempos de despliegue.'
                    : 'Select the software modules your business needs and calculate in real-time an investment estimate and deployment timeline.'}
                </p>
              </div>
            </section>

            {/* --- CATÁLOGO DE SERVICIOS Y RANGOS DE INVERSIÓN (SECCIÓN 5) --- */}
            <section className={`pt-10 pb-20 px-6 sm:px-10 lg:px-16 border-t ${isDark ? 'bg-zinc-950/20 border-white/5' : 'bg-slate-50/50 border-slate-200'}`}>
              <div className="max-w-7xl mx-auto">
                {(t.priceBadge || t.priceTitle || t.priceSub) && (
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    {t.priceBadge && (
                      <span className="text-[#C17F4E] font-mono text-xs uppercase tracking-[0.2em]">{t.priceBadge}</span>
                    )}
                    {t.priceTitle && (
                      <h2 className={`font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight uppercase mt-2 ${themeStyles.title}`}>
                        {t.priceTitle}
                      </h2>
                    )}
                    {t.priceSub && (
                      <p className={`text-sm font-sans font-light mt-3 leading-relaxed ${themeStyles.textMuted}`}>
                        {t.priceSub}
                      </p>
                    )}
                  </div>
                )}

                {/* MOBILE & TABLET LAYOUT: Column-based card loops (unaligned rows but stacked correctly per category) */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:hidden gap-6">
                  {t.priceTiers.map((category, idx) => (
                    <div key={idx} className={`p-6 sm:p-8 rounded-xl border flex flex-col justify-between transition-all duration-300 hover:border-[#C17F4E]/30 ${themeStyles.card}`}>
                      <div>
                        <div className="flex flex-col justify-between mb-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className={`font-display font-bold text-lg uppercase tracking-wider ${themeStyles.title}`}>
                              {category.category}
                            </h3>
                          </div>
                          <p className={`text-xs font-sans font-light leading-relaxed ${themeStyles.textMuted}`}>
                            {category.desc}
                          </p>
                        </div>

                        <div className="space-y-6">
                          {category.ranges.map((range, rIdx) => {
                            const rangeKey = `${idx}_${rIdx}`;
                            const isSelected = selectedRanges.includes(rangeKey);
                            return (
                              <div
                                key={rIdx}
                                onClick={() => toggleRangeSelection(rangeKey)}
                                className={`p-4 rounded border space-y-2 flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                                  isSelected
                                    ? 'border-[#C17F4E] bg-[#C17F4E]/10 shadow-md ring-1 ring-[#C17F4E]/20'
                                    : 'bg-[#C17F4E]/5 border-[#C17F4E]/10 hover:border-[#C17F4E]/30'
                                }`}
                              >
                                <div className="space-y-2">
                                  <div className="flex justify-between items-start gap-2">
                                    <div className="flex items-start gap-2.5">
                                      <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0 ${
                                        isSelected ? 'bg-[#C17F4E] border-[#C17F4E] text-white' : 'border-zinc-500 bg-transparent'
                                      }`}>
                                        {isSelected && <Check className="w-2.5 h-2.5" />}
                                      </div>
                                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white leading-normal">
                                        {range.name}
                                      </h4>
                                    </div>
                                  </div>
                                  <p className={`text-xs font-sans leading-relaxed ${themeStyles.textMuted}`}>
                                    <strong className="text-zinc-300 font-semibold">{lang === 'es' ? 'Ideal para: ' : 'Ideal for: '}</strong>{range.for}
                                  </p>
                                </div>
                                <div className="text-[11px] font-sans text-zinc-400 flex items-start gap-1.5 leading-relaxed pt-1.5 border-t border-white/5 mt-auto">
                                  <span className="text-[#C17F4E] font-bold shrink-0">✓</span>
                                  <span><strong className="text-zinc-300 font-semibold">{lang === 'es' ? 'Incluye: ' : 'Includes: '}</strong>{range.include}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* DESKTOP LAYOUT: Row-based grid using CSS Subgrid inside Category Cards.
                    This preserves the visual card container wrapper for each category while aligning the inner elements perfectly. */}
                <div className="hidden xl:grid grid-cols-4 grid-rows-[auto_auto_auto_auto] gap-x-6 gap-y-0">
                  {t.priceTiers.map((category, idx) => (
                    <div 
                      key={idx} 
                      className={`grid grid-rows-subgrid row-span-4 gap-y-6 p-8 rounded-xl border transition-all duration-300 hover:border-[#C17F4E]/30 ${themeStyles.card}`}
                    >
                      {/* Cell 0: Header */}
                      <div className="flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`font-display font-bold text-sm uppercase tracking-wider ${themeStyles.title}`}>
                            {category.category}
                          </h3>
                        </div>
                        <p className={`text-xs font-sans font-light leading-relaxed ${themeStyles.textMuted}`}>
                          {category.desc}
                        </p>
                      </div>

                      {/* Cells 1, 2, 3: Ranges */}
                      {[0, 1, 2].map((rIdx) => {
                        const range = category.ranges[rIdx];
                        const rangeKey = `${idx}_${rIdx}`;
                        const isSelected = selectedRanges.includes(rangeKey);
                        return (
                          <div
                            key={rIdx}
                            onClick={() => toggleRangeSelection(rangeKey)}
                            className={`p-5 rounded-xl border flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? 'border-[#C17F4E] bg-[#C17F4E]/10 shadow-md ring-1 ring-[#C17F4E]/20'
                                : 'bg-[#C17F4E]/5 border-[#C17F4E]/10 hover:border-[#C17F4E]/30'
                            }`}
                          >
                            <div className="space-y-2">
                              <div className="flex justify-between items-start gap-2">
                                <div className="flex items-start gap-2.5">
                                  <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0 ${
                                    isSelected ? 'bg-[#C17F4E] border-[#C17F4E] text-white' : 'border-zinc-500 bg-transparent'
                                  }`}>
                                    {isSelected && <Check className="w-2.5 h-2.5" />}
                                  </div>
                                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white leading-normal">
                                    {range.name}
                                  </h4>
                                </div>
                              </div>
                              <p className={`text-xs font-sans leading-relaxed ${themeStyles.textMuted}`}>
                                <strong className="text-zinc-300 font-semibold">{lang === 'es' ? 'Ideal para: ' : 'Ideal for: '}</strong>{range.for}
                              </p>
                            </div>
                            <div className="text-[11px] font-sans text-zinc-400 flex items-start gap-1.5 leading-relaxed pt-2 border-t border-white/5 mt-4">
                              <span className="text-[#C17F4E] font-bold shrink-0">✓</span>
                              <span><strong className="text-zinc-300 font-semibold">{lang === 'es' ? 'Incluye: ' : 'Includes: '}</strong>{range.include}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Dynamic selected ranges summary estimator */}
                {selectedRanges.length > 0 && (
                  <div className={`mt-12 p-6 rounded-xl border ${themeStyles.card} max-w-2xl mx-auto text-center fade-in`}>
                    <h3 className={`font-display font-bold text-sm uppercase tracking-widest border-b border-white/5 pb-4 mb-4 ${themeStyles.title}`}>
                      {lang === 'es' ? 'Resumen de Selección' : 'Selection Summary'}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-zinc-400 mb-6">
                      <div>
                        <span className="text-zinc-500 uppercase">{lang === 'es' ? 'Servicios Seleccionados: ' : 'Selected Services: '}</span>
                        <span className="text-white font-bold">{selectedRanges.length}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 uppercase">{lang === 'es' ? 'Inversión Base Estimada: ' : 'Estimated Base Investment: '}</span>
                        <span className="text-[#C17F4E] font-black">${totalBudget} USD</span>
                      </div>
                    </div>
                    <button
                      onClick={handleProceedToOnboardingWithRanges}
                      className="px-8 py-3.5 bg-gradient-to-r from-[#C17F4E] to-[#D79663] text-white font-mono text-xs font-bold uppercase tracking-widest rounded hover:opacity-90 transition-all inline-flex items-center gap-2 shadow-lg"
                    >
                      <span>{lang === 'es' ? 'Iniciar Diagnóstico con esta Selección' : 'Start Diagnosis with this Selection'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
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
                <h1 className={`font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight uppercase mt-2 ${themeStyles.title}`}>
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
                  <h1 className={`font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight uppercase mt-2 mb-4 ${themeStyles.title}`}>
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
              <h1 className={`font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight uppercase mt-3 ${themeStyles.title}`}>
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
                          href="mailto:max.baldeon94@gmail.com" 
                          className={`text-base font-medium hover:text-[#C17F4E] transition-colors mt-1 block ${themeStyles.title}`}
                        >
                          max.baldeon94@gmail.com
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

              {/* Right Side: Contact Form (Section 13) */}
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
                        {/* WhatsApp */}
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
                            placeholder="Ej. Consulta de Servicios / IA"
                            className={`w-full p-3 rounded text-sm transition-all duration-300 outline-none border ${themeStyles.input}`}
                          />
                        </div>
                      </div>

                      {/* Message / Details */}
                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2 font-bold">
                          {t.contactLabelMessage} *
                        </label>
                        <textarea
                          required
                          value={contactFormMessage}
                          onChange={(e) => setContactFormMessage(e.target.value)}
                          placeholder={lang === 'es' ? 'Escribe aquí los detalles de tu consulta...' : 'Write your inquiry details here...'}
                          rows={5}
                          className={`w-full p-3 rounded text-sm transition-all duration-300 outline-none border resize-none ${themeStyles.input}`}
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={contactFormLoading}
                        className="w-full py-4 bg-[#C17F4E] text-white text-xs font-mono font-bold uppercase tracking-widest rounded hover:bg-[#D79663] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#C17F4E]/10 cursor-pointer disabled:opacity-50"
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
                      <div className="pt-4">
                        <button
                          onClick={() => {
                            setContactFormName('');
                            setContactFormEmail('');
                            setContactFormPhone('');
                            setContactFormSubject('');
                            setContactFormMessage('');
                            setContactFormSubmitted(false);
                            setTouchedFields({});
                          }}
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
      <Footer isDark={isDark} lang={lang} t={t} setActivePage={setActivePage} />

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
