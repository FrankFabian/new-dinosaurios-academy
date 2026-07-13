export const defaultLocale = "es";
export const supportedLocales = ["es", "en"] as const;

export type Locale = (typeof supportedLocales)[number];

const dictionaries = {
  es: {
    metadata: {
      title: "Dinosaurios Academy",
      description: "Panel operativo interno para Dinosaurios Academy",
    },
    shell: {
      brand: "Dinosaurios Academy",
      workspace: "Intranet operativa",
      menu: "Navegación principal",
      mobileMenuButton: "Abrir navegación",
      mobileNavigation: "Navegación móvil",
      search: "Buscar estudiantes, recibos, grupos o eventos",
      language: "Idioma",
      localeName: "Español",
      englishLocaleName: "Inglés",
      signOut: "Cerrar sesión",
      title: "Mesa operativa",
      eyebrow: "Inicio",
      description:
        "Coordina estudiantes, asistencia, cobros y eventos desde una superficie compacta, con navegación según los roles asignados.",
      primaryAction: "Acciones rápidas",
      secondaryAction: "Tomar asistencia",
      currentModule: "Panel operativo",
      topbarHint: "Búsqueda global",
      searchShortcut: "Ctrl K",
      userMenu: "Cuenta y salida",
      notifications: "Notificaciones",
      inbox: "Mensajes",
      profileMenu: "Abrir menú de perfil",
      profileSettings: "Administrar perfil",
      organizationName: "Dinosaurios Academy",
      signedOut: {
        status: "Sesión requerida",
        title: "Bienvenido de vuelta",
        description: "Ingresa a tu panel de operaciones",
        brandKicker: "Academy",
        panelTitle: "Juntos formamos",
        panelHighlight: "carácter y atletas.",
        panelDescription: "Panel de operaciones para el equipo que mueve la academia.",
        usernameLabel: "Correo electrónico",
        usernamePlaceholder: "usuario@dinosauriosacademy.com",
        passwordLabel: "Contraseña",
        passwordPlaceholder: "Ingresa tu contraseña",
        rememberMe: "Recordarme",
        forgotPassword: "¿Olvidaste tu contraseña?",
        helpPrompt: "¿Necesitas ayuda?",
        supportAction: "Contactar a soporte de la academia",
        invalidCredentials: "Las credenciales no coinciden con una cuenta activa.",
        unavailable: "No pudimos contactar el servicio de autenticación. Intenta nuevamente.",
        primaryAction: "Iniciar sesión",
      },
      scope: {
        label: "Sede",
        value: "Sede Surco",
      },
      navGroups: {
        operations: "Operaciones",
        attendance: "Asistencia",
        finance: "Finanzas",
        competition: "Competencia",
        analytics: "Analítica",
        configuration: "Configuración",
        portal: "Portal",
      },
      navigation: {
        dashboard: "Inicio",
        students: "Estudiantes",
        guardians: "Apoderados",
        venues: "Sedes e instalaciones",
        classes: "Grupos",
        enrollments: "Matrículas",
        billing: "Cobros y pagos",
        attendance: "Asistencia",
        events: "Eventos",
        reports: "Reportes",
        settings: "Usuarios y roles",
        portal: "Portal",
      },
      roles: {
        admin: "Administrador",
        staff: "Staff",
        coach: "Entrenador",
        guardian: "Apoderado",
        student: "Estudiante",
      },
      quickActions: [
        {
          label: "Registrar estudiante",
          description: "Alta y datos familiares",
          href: "/students",
        },
        {
          label: "Tomar asistencia",
          description: "Sesiones del día",
          href: "/attendance",
        },
        {
          label: "Revisar recibos",
          description: "Validación pendiente",
          href: "/billing",
        },
        {
          label: "Crear evento",
          description: "Invitaciones y calendario",
          href: "/events",
        },
      ],
      priorityWork: {
        title: "Trabajo prioritario",
        description: "Revisa las colas que suelen iniciar el trabajo diario.",
        emptyLabel: "Sin pendientes",
        items: [
          {
            label: "Recibos por revisar",
            context: "Finanzas",
            status: "Sin pendientes",
          },
          {
            label: "Clases de hoy",
            context: "Asistencia",
            status: "Listas para registrar",
          },
          {
            label: "Invitaciones abiertas",
            context: "Competencia",
            status: "Sin respuestas nuevas",
          },
        ],
      },
      mobileDock: {
        home: "Inicio",
        attendance: "Asistencia",
        students: "Registrar",
        primary: "Registrar",
        groups: "Grupos",
        more: "Más",
      },
    },
  },
  en: {
    metadata: {
      title: "Dinosaurios Academy",
      description: "Internal operations panel for Dinosaurios Academy",
    },
    shell: {
      brand: "Dinosaurios Academy",
      workspace: "Operations intranet",
      menu: "Primary navigation",
      mobileMenuButton: "Open navigation",
      mobileNavigation: "Mobile navigation",
      search: "Search students, receipts, groups, or events",
      language: "Language",
      localeName: "Spanish",
      englishLocaleName: "English",
      signOut: "Sign out",
      title: "Operations desk",
      eyebrow: "Home",
      description:
        "Coordinate students, attendance, billing, and events from a compact surface with navigation based on assigned roles.",
      primaryAction: "Quick actions",
      secondaryAction: "Take attendance",
      currentModule: "Operations panel",
      topbarHint: "Global search",
      searchShortcut: "Ctrl K",
      userMenu: "Account and sign out",
      notifications: "Notifications",
      inbox: "Messages",
      profileMenu: "Open profile menu",
      profileSettings: "Manage profile",
      organizationName: "Dinosaurios Academy",
      signedOut: {
        status: "Session required",
        title: "Welcome back",
        description: "Enter your operations panel",
        brandKicker: "Academy",
        panelTitle: "Together we build",
        panelHighlight: "character and athletes.",
        panelDescription: "Operations panel for the team that moves the academy.",
        usernameLabel: "Email",
        usernamePlaceholder: "user@dinosauriosacademy.com",
        passwordLabel: "Password",
        passwordPlaceholder: "Enter your password",
        rememberMe: "Remember me",
        forgotPassword: "Forgot your password?",
        helpPrompt: "Need help?",
        supportAction: "Contact academy support",
        invalidCredentials: "The credentials do not match an active account.",
        unavailable: "We could not reach the authentication service. Try again.",
        primaryAction: "Sign in",
      },
      scope: {
        label: "Venue",
        value: "Surco venue",
      },
      navGroups: {
        operations: "Operations",
        attendance: "Attendance",
        finance: "Finance",
        competition: "Competition",
        analytics: "Analytics",
        configuration: "Configuration",
        portal: "Portal",
      },
      navigation: {
        dashboard: "Home",
        students: "Students",
        guardians: "Guardians",
        venues: "Venues and facilities",
        classes: "Groups",
        enrollments: "Enrollments",
        billing: "Billing and payments",
        attendance: "Attendance",
        events: "Events",
        reports: "Reports",
        settings: "Users and roles",
        portal: "Portal",
      },
      roles: {
        admin: "Admin",
        staff: "Staff",
        coach: "Coach",
        guardian: "Guardian",
        student: "Student",
      },
      quickActions: [
        {
          label: "Register student",
          description: "Profile and family data",
          href: "/students",
        },
        {
          label: "Take attendance",
          description: "Today's sessions",
          href: "/attendance",
        },
        {
          label: "Review receipts",
          description: "Pending validation",
          href: "/billing",
        },
        {
          label: "Create event",
          description: "Invitations and calendar",
          href: "/events",
        },
      ],
      priorityWork: {
        title: "Priority work",
        description: "Review the queues that usually start the daily work.",
        emptyLabel: "No pending work",
        items: [
          {
            label: "Receipts to review",
            context: "Finance",
            status: "No pending receipts",
          },
          {
            label: "Classes today",
            context: "Attendance",
            status: "Ready to record",
          },
          {
            label: "Open invitations",
            context: "Competition",
            status: "No new replies",
          },
        ],
      },
      mobileDock: {
        home: "Home",
        attendance: "Attendance",
        students: "Register",
        primary: "Register",
        groups: "Groups",
        more: "More",
      },
    },
  },
} as const;

export function getConfiguredLocale(): Locale {
  const configuredLocale = process.env.NEXT_PUBLIC_LOCALE ?? process.env.DEFAULT_LOCALE;

  return configuredLocale === "en" ? "en" : defaultLocale;
}

export function getMessages(locale: Locale = defaultLocale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export const homeCopy = dictionaries[defaultLocale].shell;
