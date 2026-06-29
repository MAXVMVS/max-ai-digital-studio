// --- Types & Interfaces ---
export interface Module {
  id: string;
  name: string;
  price: number;
  durationWeeks: number;
  description: string;
  category: string;
}

export interface CaseStudy {
  client: string;
  tagline: string;
  description: string;
  kpis: string[];
  stack: string[];
  url: string;
  image: string;
  category: string;
}

export const MODULES: Module[] = [
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

// Velox Motors has been removed per user decision
export const CASE_STUDIES: CaseStudy[] = [
  {
    client: 'Psic. Damaris Pazmiño',
    tagline: 'Salud Mental & Clínica Automatizada',
    description: 'Ecosistema digital completo para automatizar el agendamiento y flujo de pacientes, integrado con Google Cloud Firestore y geolocalización avanzada en Google Maps.',
    kpis: ['+140% citas agendadas', 'Cancelaciones reducidas a cero', 'Carga inicial < 1.2s'],
    stack: ['React 19', 'Tailwind v4', 'Firestore Realtime', 'Google Maps API'],
    url: 'https://psicdamaris.vercel.app',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    category: 'Salud & Automatización'
  }
];

export const INITIAL_LOGS = [
  'SYSTEM: MAX AI Core v5.0 initialized successfully.',
  'INFO: Active cluster Quito, EC connected (lat: -0.1807, lon: -78.4678).',
  'SYNC: Listening to Firestore triggers on Clinic flow (Psic. Damaris Pazmiño)...',
  'SUCCESS: Google Maps Geolocation API response status 200 OK (Clinic Locator Sync).',
  'SYSTEM: High-performance React engine ready on port 3000.'
];

export const TRANSLATIONS = {
  es: {
    // Nav & General
    home: 'Inicio',
    services: 'Precios & Servicios',
    portfolio: 'Portafolio',
    contact: 'Contacto',
    portHeader: 'Portafolio',
    whatsappBtn: 'WHATSAPP DIRECTO',
    login: 'Login',
    system: 'Sistema',
    dashboard: 'Dashboard',
    portal: 'Mi Portal',

    // Hero
    heroBadge: 'NÚCLEO v5.0 ACTIVO • QUITO, EC',
    heroTitle1: 'Tecnología y Diseño',
    heroTitle2: 'que te hace',
    heroTitle3: 'crecer.',
    heroTitle4: '',
    heroSub: 'Desarrollo Web, Marketing Digital, Automatización & Sistemas IA a tu medida.',
    heroCta1: 'Agenda Diagnóstico Gratis',
    heroCta1Sub: 'Totalmente gratuito. Sin compromisos de contratación.',
    heroCta2: 'Empieza ahora',
    heroTagline: 'Infraestructura de alto rendimiento: Despliegue moderno, soporte documentado y optimización para motores de IA.',
    heroStat1: 'Conversión',
    heroStat2: 'Uptime',
    heroStat3: 'Latencia',

    // Section 3: El Problema
    probBadge: 'El Problema',
    probTitle: '¿Tu negocio sufre de presencia digital fragmentada?',
    probSub: 'Muchos profesionales y PYMEs creen que para crecer en internet basta con contratar un logotipo por un lado, una página web básica por otro y pagarle a un tercero para que "suba publicaciones" a redes sociales. El resultado de este enfoque fragmentado suele ser el mismo: poca conversión, procesos ineficientes y dinero desperdiciado.',
    probSymptoms: [
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
    ],

    // Section 4: El Sistema (La Solución)
    systBadge: 'La Solución',
    systTitle: 'Un engranaje unificado. Cuatro pilares de crecimiento.',
    systSub: 'En MAX AI - Digital Studio no vendemos tecnología. Vendemos crecimiento empresarial. Un sistema de crecimiento digital es una estructura viva e integrada donde cada pieza ayuda a la siguiente.',
    systPillar1Title: 'Posicionamiento',
    systPillar1Sub: 'Branding Estratégico',
    systPillar2Title: 'Presencia',
    systPillar2Sub: 'Web Premium',
    systPillar3Title: 'Captación',
    systPillar3Sub: 'Marketing Digital',
    systPillar4Title: 'Escalabilidad',
    systPillar4Sub: 'IA & Automatización',

    systPillarDetails: [
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
    ],

    // Section 6: Cómo Trabajamos
    metBadge: 'Metodología',
    metTitle: 'Cronograma en 8 Semanas',
    metSub: 'El desorden retrasa los proyectos. En MAX AI eliminamos la improvisación. Diseñamos tus activos digitales bajo un cronograma estricto que protege tu inversión y nuestro tiempo de entrega.',
    metWeeks: [
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
    ],

    // Section 7: Stacks Tecnológicos
    stackBadge: 'Infraestructura',
    stackTitle: 'Stacks Tecnológicos Especializados',
    stackSub: 'No todas las páginas web necesitan los mismos servidores. En MAX AI clasificamos tu proyecto dentro de cuatro niveles de stacks técnicos especializados para garantizar rendimiento óptimo y costos mínimos.',
    stackLevels: [
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
    ],

    // Section 8: Clientes Ideales
    clientBadge: 'Público Objetivo',
    clientTitle: '¿A quiénes ayudamos a crecer?',
    clientSub: 'Nuestros sistemas se diseñan para potenciar negocios sofisticados que valoran la eficiencia y la autoridad digital.',
    clientProfiles: [
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
    ],

    // Section 9: FAQ
    faqBadge: 'Preguntas Frecuentes',
    faqTitle: 'Resolviendo tus dudas técnicas y comerciales',
    faqItems: [
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
    ],

    // Section 10: Diagnóstico / Formulario
    diagBadge: 'Diagnóstico Gratis',
    diagTitle: '¿Listo para construir tu Sistema de Crecimiento Digital?',
    diagSub: 'Agenda una sesión de diagnóstico gratuita de 45 minutos. Analizaremos tu presencia web actual, identificaremos oportunidades de automatización comercial con IA y te entregaremos una ruta de acción clara. Sin compromisos de compra.',
    diagLabelName: 'Nombre Completo',
    diagLabelCompany: 'Nombre del Negocio / Empresa',
    diagLabelEmail: 'Correo Electrónico *',
    diagLabelPhone: 'WhatsApp de Contacto',
    diagLabelWeb: 'Tu Sitio Web Actual (Opcional)',
    diagLabelObstacle: '¿Cuál es el mayor obstáculo para el crecimiento de tu negocio hoy?',
    diagObstacles: [
      'No tengo suficientes prospectos calificados.',
      'Mi imagen o sitio web actual luce poco profesional.',
      'Pierdo mucho tiempo respondiendo consultas manualmente.',
      'Tengo presencia digital fragmentada.'
    ],
    diagLabelBudget: 'Presupuesto aproximado estimado para tu proyecto:',
    diagBudgets: [
      'Menos de $500 USD (Etapa de validación rápida).',
      'Entre $500 y $1,500 USD (Crecimiento comercial PYME).',
      'Más de $1,500 USD (Solución robusta / IA integrada).'
    ],
    diagSubmit: 'Agendar Mi Diagnóstico Gratuito',
    diagSubmitting: 'Procesando en el Núcleo...',
    diagSuccessTitle: '¡Diagnóstico Solicitado con Éxito!',
    diagSuccessSub: 'Tu solicitud ha sido registrada de forma segura en Firestore. Estamos preparando tu informe de diagnóstico preliminar. Serás redirigido a WhatsApp para coordinar la fecha y hora de la llamada de 45 minutos.',

    // Section 11: Footer
    footText: 'POSICIONAMIENTO • PRESENCIA • CAPTACIÓN • ESCALABILIDAD',
    footServer: 'ESTADO DEL SISTEMA: ÓPTIMO',
    footSlogan: 'Diseñamos e implementamos sistemas digitales para el crecimiento de tu negocio.',
    footOffice: 'Quito y Guayaquil, Ecuador. Cobertura Global.',
    footContact: 'Contacto comercial: max.baldeon94@gmail.com',

    // Pricing Page Specific (Section 5 Catalog)
    priceBadge: 'Catálogo Oficial',
    priceTitle: 'Servicios Estructurados y Rangos de Inversión',
    priceSub: 'Transparencia total. Todo se cotiza bajo la política de hitos (40% inicio / 40% control de insumos / 20% entrega).',
    priceTiers: [
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
    ],

    // Google Forms
    gfBadge: 'Integración Google Forms',
    gfTitle: 'Sincronizador Google Forms',
    gfSub: 'Sincroniza tus formularios de Google Workspace con nuestro motor NoSQL. Genera análisis en tiempo real y gestiona prospectos corporativos.',
    gfNoAuthTitle: 'Conectar Google Workspace',
    gfNoAuthSub: 'Autentícate de forma segura con tu cuenta de Google para otorgarle a MAX AI acceso a tus formularios y sincronizar respuestas en tiempo real.',
    gfNoAuthBtn: 'Iniciar Sesión con Google',
    gfAuthStatus: 'ESPACIO DE TRABAJO CONECTADO',
    gfConnectTitle: 'Conectar Formulario de Google',
    gfConnectLabel: 'ID del Formulario en Google Forms',
    gfConnectBtn: 'Enlazar',
    gfExpressTitle: 'Creación Express de Diagnóstico',
    gfExpressSub: 'MAX AI creará un formulario en tu Google Drive estructurado con preguntas de cualificación para prospectos corporativos y lo enlazará automáticamente.',
    gfExpressBtn1: 'Generar Formulario 1-Click',
    gfExpressBtn2: 'Creando en Google...',
    gfLinkedTitle: 'Formularios Enlazados',
    gfLinkedEmpty: 'No has conectado ningún formulario todavía.',
    gfActiveTitle: 'Formulario Activo',
    gfActiveResponses: 'Respuestas',
    gfActiveQuestions: 'Preguntas',
    gfRecentResponses: 'Respuestas Recientes',
    gfRecentResponsesSync: 'Sincronización Live',
    gfRecentResponsesEmpty: 'Tu formulario no tiene ninguna respuesta todavía.',
    gfRecentResponsesEmptySub: 'Comparte el enlace del formulario para recibir solicitudes de leads.',
    gfNoSelectedTitle: 'Ningún Formulario Seleccionado',
    gfNoSelectedSub: 'Conecta un formulario existente ingresando su identificador o presiona el botón de generación express de 1-click.',
    gfActiveSync: 'Estado Sync',
    gfRecentResponsesTag: 'RESPUESTA',

    // CRM
    crmBadge: 'CRM Corporativo',
    crmTitle: 'Leads Recibidos',
    crmSub: 'Bandeja de entrada en tiempo real con las cotizaciones de tu onboarding configuradas en Firestore.',
    crmNoAuthTitle: 'Acceso al CRM',
    crmNoAuthSub: 'Inicia sesión de forma segura para revisar las propuestas de diagnóstico y presupuestos estimados.',
    crmEmpty: 'No se encontraron leads',
    crmEmptySub: 'Los leads que configures y envíes en el protocolo de Onboarding aparecerán aquí instantáneamente.',
    crmCardDate: 'Fecha',
    crmCardContact: 'Contacto Directo',

    // Contact Page
    contactTitle: 'Contacto Cognitivo',
    contactSub: 'Conecta con nuestro equipo de ingenieros y diseñadores para materializar tu visión digital.',
    contactLabelName: 'Nombre Completo',
    contactLabelEmail: 'Correo Electrónico',
    contactLabelPhone: 'WhatsApp Directo',
    contactLabelSubject: 'Asunto / Proyecto',
    contactLabelMessage: 'Mensaje / Detalles',
    contactBtnSubmit: 'ENVIAR MENSAJE',
    contactBtnSubmitting: 'ENVIANDO...',
    contactSuccessTitle: '¡Mensaje Transmitido!',
    contactSuccessSub: 'Hemos registrado tu solicitud en el núcleo. Un arquitecto cognitivo se pondrá en contacto contigo en menos de 2 horas y te redireccionaremos a WhatsApp.',
    contactDetailsTitle: 'Canales Directos',
    contactOffice: 'Sede Central',
    contactOfficeLoc: 'Quito, Ecuador • Cobertura Global',
    contactSocials: 'Redes de la Agencia',

    // Configurator
    confBadge: 'Configurador Inteligente',
    confTitle: 'Crea tu Ecosistema Técnico',
    confSub: 'Selecciona los módulos tecnológicos que demanda tu negocio y obtén una estimación de recursos y tiempos del Ingeniero Principal.',
    confSumTitle: 'RESUMEN DE INFRAESTRUCTURA',
    confSumMod: 'Módulos Solicitados',
    confSumTime: 'Tiempo de Producción',
    confSumTimeWeeks: 'semanas',
    confSumBudget: 'Presupuesto Estimado',
    confSumCta: 'PROCEDER AL ONBOARDING',

    // Case Studies Page
    csBadge: 'Showcase Real',
    csTitle: 'CASOS DE ÉXITO MAX AI',
    csSub: 'Plataformas reales y estables producidas bajo ingeniería de alto desempeño para marcas sofisticadas.',
  },
  en: {
    // Nav & General
    home: 'Home',
    services: 'Pricing & Services',
    portfolio: 'Portfolio',
    contact: 'Contact',
    portHeader: 'Portfolio',
    whatsappBtn: 'WHATSAPP DIRECT',
    login: 'Login',
    system: 'System',
    dashboard: 'Dashboard',
    portal: 'My Portal',

    // Hero
    heroBadge: 'CORE v5.0 ACTIVE • QUITO, EC',
    heroTitle1: 'Technology and Design',
    heroTitle2: 'that makes you',
    heroTitle3: 'grow.',
    heroTitle4: '',
    heroSub: 'Web Development, Digital Marketing, Automation & AI Systems tailored to your needs.',
    heroCta1: 'Book Free Diagnostic',
    heroCta1Sub: 'Totally free. No hiring commitment.',
    heroCta2: 'Get Started',
    heroTagline: 'High-performance infrastructure: Modern deployment, documented support, and optimization for AI engines.',
    heroStat1: 'Conversion',
    heroStat2: 'Uptime',
    heroStat3: 'Latency',

    // Section 3: El Problema
    probBadge: 'The Problem',
    probTitle: 'Does your business suffer from a fragmented digital presence?',
    probSub: 'Many professionals and SMEs believe that to grow online it is enough to hire a logo on one side, a basic website on another, and pay a third party to "post" on social networks. The result of this fragmented approach is usually the same: low conversion, inefficient processes, and wasted money.',
    probSymptoms: [
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
    systBadge: 'The Solution',
    systTitle: 'A unified gear. Four pillars of growth.',
    systSub: 'At MAX AI - Digital Studio we do not sell technology. We sell business growth. A digital growth system is a living and integrated structure where each piece helps the next.',
    systPillar1Title: 'Positioning',
    systPillar1Sub: 'Strategic Branding',
    systPillar2Title: 'Presence',
    systPillar2Sub: 'Premium Web',
    systPillar3Title: 'Acquisition',
    systPillar3Sub: 'Digital Marketing',
    systPillar4Title: 'Scalability',
    systPillar4Sub: 'AI & Automation',

    systPillarDetails: [
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
    metBadge: 'Methodology',
    metTitle: '8-Week Timeline',
    metSub: 'Disorder delays projects. At MAX AI we eliminate improvisation. We design your digital assets under a strict schedule that protects your investment and our delivery time.',
    metWeeks: [
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
    stackBadge: 'Infrastructure',
    stackTitle: 'Specialized Tech Stacks',
    stackSub: 'Not all websites need the same servers. At MAX AI we classify your project into four levels of specialized technical stacks to guarantee optimal performance and minimal costs.',
    stackLevels: [
      {
        level: 'Level 1: Validation',
        target: 'Ideal for starting brands',
        arch: 'React (Vite) + Tailwind CSS + Firebase (Firestore for lead database) + Vercel Deployment.',
        cost: '$0.00 USD/month lifetime (utilizando las capas gratuitas seguras de Vercel and Firebase).',
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
    clientBadge: 'Target Audience',
    clientTitle: 'Who do we help grow?',
    clientSub: 'Our systems are designed to empower sophisticated businesses that value efficiency and digital authority.',
    clientProfiles: [
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
    faqBadge: 'FAQ',
    faqTitle: 'Answering your technical and business questions',
    faqItems: [
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
    diagBadge: 'Free Diagnostic',
    diagTitle: 'Ready to build your Digital Growth System?',
    diagSub: 'Book a free 45-minute diagnostic session. We will analyze your current web presence, identify commercial automation opportunities with AI, and deliver a clear action roadmap. No purchase commitments.',
    diagLabelName: 'Full Name',
    diagLabelCompany: 'Business / Company Name',
    diagLabelEmail: 'Email Address *',
    diagLabelPhone: 'Contact WhatsApp',
    diagLabelWeb: 'Your Current Website (Optional)',
    diagLabelObstacle: 'What is the biggest obstacle to your business growth today?',
    diagObstacles: [
      'I don\'t have enough qualified leads.',
      'My current image or website looks unprofessional.',
      'I waste a lot of time answering queries manually.',
      'I have a fragmented digital presence.'
    ],
    diagLabelBudget: 'Approximate estimated budget for your project:',
    diagBudgets: [
      'Under $500 USD (Quick validation phase).',
      'Between $500 and $1,500 USD (SME commercial growth).',
      'Over $1,500 USD (Robust solution / integrated AI).'
    ],
    diagSubmit: 'Book My Free Diagnostic',
    diagSubmitting: 'Processing in Core...',
    diagSuccessTitle: 'Diagnostic Successfully Requested!',
    diagSuccessSub: 'Your request has been securely logged in Firestore. We are preparing your preliminary diagnostic report. You will be redirected to WhatsApp to coordinate the date and time of the 45-minute call.',

    // Section 11: Footer
    footText: 'POSITIONING • PRESENCE • ACQUISITION • SCALABILITY',
    footServer: 'SYSTEM STATUS: OPTIMAL',
    footSlogan: 'We design and implement digital systems for your business growth.',
    footOffice: 'Quito and Guayaquil, Ecuador. Global Coverage.',
    footContact: 'Business Contact: max.baldeon94@gmail.com',

    // Pricing Page Specific (Section 5 Catalog)
    priceBadge: 'Official Catalog',
    priceTitle: 'Structured Services & Investment Ranges',
    priceSub: 'Total transparency. Everything is quoted under milestone policy (40% kick-off / 40% asset control / 20% hand-off).',
    priceTiers: [
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

    // Google Forms
    gfBadge: 'Google Forms Integration',
    gfTitle: 'Google Forms Synchronizer',
    gfSub: 'Sync your Google Workspace forms with our NoSQL engine. Generate real-time analytics and manage enterprise leads.',
    gfNoAuthTitle: 'Connect Google Workspace',
    gfNoAuthSub: 'Authenticate securely with your Google account to grant MAX AI access to your forms and sync responses in real time.',
    gfNoAuthBtn: 'Sign In with Google',
    gfAuthStatus: 'WORKSPACE CONNECTED',
    gfConnectTitle: 'Connect Google Form',
    gfConnectLabel: 'Google Form ID',
    gfConnectBtn: 'Link',
    gfExpressTitle: 'Express Diagnostic Creation',
    gfExpressSub: 'MAX AI will create a structured qualification Google Form in your Google Drive and automatically link it to the platform.',
    gfExpressBtn1: 'Generate Form 1-Click',
    gfExpressBtn2: 'Creating in Google...',
    gfLinkedTitle: 'Linked Forms',
    gfLinkedEmpty: 'You have not connected any forms yet.',
    gfActiveTitle: 'Active Form',
    gfActiveResponses: 'Responses',
    gfActiveQuestions: 'Questions',
    gfRecentResponses: 'Recent Responses',
    gfRecentResponsesSync: 'Live Sync',
    gfRecentResponsesEmpty: 'Your form does not have any responses yet.',
    gfRecentResponsesEmptySub: 'Share the form link to start receiving lead requests.',
    gfNoSelectedTitle: 'No Form Selected',
    gfNoSelectedSub: 'Connect an existing form by entering its ID or press the 1-click express generation button.',
    gfActiveSync: 'Sync Status',
    gfRecentResponsesTag: 'RESPONSE',

    // CRM
    crmBadge: 'Corporate CRM',
    crmTitle: 'Received Leads',
    crmSub: 'Real-time inbox with your onboarding quotes configured in Firestore.',
    crmNoAuthTitle: 'CRM Access',
    crmNoAuthSub: 'Sign in securely to review diagnostic proposals and estimated budgets.',
    crmEmpty: 'No leads found',
    crmEmptySub: 'Leads you configure and submit in the Onboarding protocol will appear here instantly.',
    crmCardDate: 'Date',
    crmCardContact: 'Direct Contact',

    // Contact Page
    contactTitle: 'Cognitive Contact',
    contactSub: 'Connect with our team of software engineers and designers to materialize your digital vision.',
    contactLabelName: 'Full Name',
    contactLabelEmail: 'Email Address',
    contactLabelPhone: 'Direct WhatsApp',
    contactLabelSubject: 'Subject / Project',
    contactLabelMessage: 'Message / Details',
    contactBtnSubmit: 'SEND MESSAGE',
    contactBtnSubmitting: 'SENDING...',
    contactSuccessTitle: 'Message Transmitted!',
    contactSuccessSub: 'We have registered your request in the core. A cognitive architect will contact you in less than 2 hours and we will redirect you to WhatsApp.',
    contactDetailsTitle: 'Direct Channels',
    contactOffice: 'Headquarters',
    contactOfficeLoc: 'Quito, Ecuador • Global Coverage',
    contactSocials: 'Agency Networks',

    // Configurator
    confBadge: 'Smart Configurator',
    confTitle: 'Build Your Technical Ecosystem',
    confSub: 'Select the technical modules your business demands and obtain an estimate of resources and time from the Principal Engineer.',
    confSumTitle: 'INFRASTRUCTURE SUMMARY',
    confSumMod: 'Requested Modules',
    confSumTime: 'Production Time',
    confSumTimeWeeks: 'weeks',
    confSumBudget: 'Estimated Budget',
    confSumCta: 'PROCEED TO ONBOARDING',

    // Case Studies Page
    csBadge: 'Real Showcase',
    csTitle: 'MAX AI CASE STUDIES',
    csSub: 'Real and stable platforms built under high-performance engineering for sophisticated brands.',
  }
};
