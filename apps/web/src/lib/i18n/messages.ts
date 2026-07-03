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
      menu: "Abrir navegación",
      search: "Buscar estudiante, recibo o clase",
      language: "Idioma",
      localeName: "Español",
      englishLocaleName: "Inglés",
      authenticatedAs: "Sesión activa",
      signOut: "Cerrar sesión",
      status: "Acceso autenticado",
      title: "Panel operativo",
      description:
        "Vista inicial para coordinar estudiantes, asistencia, cobros y eventos con permisos según el rol del usuario.",
      primaryAction: "Registrar estudiante",
      secondaryAction: "Tomar asistencia",
      signedOut: {
        status: "Sesión requerida",
        title: "Inicia sesión para entrar al panel",
        description:
          "La navegación operativa depende de tu sesión y de los roles asignados en Django.",
        usernameLabel: "Correo",
        passwordLabel: "Contraseña",
        invalidCredentials: "Las credenciales no coinciden con una cuenta activa.",
        unavailable: "No pudimos contactar el servicio de autenticación. Intenta nuevamente.",
        primaryAction: "Iniciar sesión",
      },
      navigation: {
        dashboard: "Dashboard",
        students: "Estudiantes",
        guardians: "Apoderados",
        venues: "Sedes",
        classes: "Clases",
        enrollments: "Matrículas",
        billing: "Cobros",
        attendance: "Asistencia",
        events: "Eventos",
        reports: "Reportes",
        settings: "Configuración",
        portal: "Portal",
      },
      roles: {
        admin: "Administrador",
        staff: "Staff",
        coach: "Entrenador",
        guardian: "Apoderado",
        student: "Estudiante",
      },
      summary: {
        students: "Estudiantes activos",
        receipts: "Recibos pendientes",
        attendance: "Sesiones de hoy",
        venues: "Sedes configuradas",
      },
      defaults: [
        { label: "Idioma", value: "Español" },
        { label: "Zona horaria", value: "America/Lima" },
        { label: "Moneda", value: "S/ PEN" },
      ],
      workQueue: {
        title: "Trabajo prioritario",
        items: [
          {
            label: "Recibos por revisar",
            value: "0",
            status: "Sin pendientes",
          },
          {
            label: "Clases de hoy",
            value: "0",
            status: "Listas para asistencia",
          },
          {
            label: "Invitaciones abiertas",
            value: "0",
            status: "Sin respuestas nuevas",
          },
        ],
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
      menu: "Open navigation",
      search: "Search student, receipt, or class",
      language: "Language",
      localeName: "Spanish",
      englishLocaleName: "English",
      authenticatedAs: "Active session",
      signOut: "Sign out",
      status: "Authenticated access",
      title: "Operations panel",
      description:
        "Starting view for coordinating students, attendance, billing, and events with permissions based on the user's role.",
      primaryAction: "Register student",
      secondaryAction: "Take attendance",
      signedOut: {
        status: "Session required",
        title: "Sign in to enter the panel",
        description:
          "Operational navigation depends on your Django session and assigned roles.",
        usernameLabel: "Email",
        passwordLabel: "Password",
        invalidCredentials: "The credentials do not match an active account.",
        unavailable: "We could not reach the authentication service. Try again.",
        primaryAction: "Sign in",
      },
      navigation: {
        dashboard: "Dashboard",
        students: "Students",
        guardians: "Guardians",
        venues: "Venues",
        classes: "Classes",
        enrollments: "Enrollments",
        billing: "Billing",
        attendance: "Attendance",
        events: "Events",
        reports: "Reports",
        settings: "Settings",
        portal: "Portal",
      },
      roles: {
        admin: "Admin",
        staff: "Staff",
        coach: "Coach",
        guardian: "Guardian",
        student: "Student",
      },
      summary: {
        students: "Active students",
        receipts: "Pending receipts",
        attendance: "Today's sessions",
        venues: "Configured venues",
      },
      defaults: [
        { label: "Language", value: "Spanish" },
        { label: "Time zone", value: "America/Lima" },
        { label: "Currency", value: "S/ PEN" },
      ],
      workQueue: {
        title: "Priority work",
        items: [
          {
            label: "Receipts to review",
            value: "0",
            status: "No pending receipts",
          },
          {
            label: "Classes today",
            value: "0",
            status: "Ready for attendance",
          },
          {
            label: "Open invitations",
            value: "0",
            status: "No new replies",
          },
        ],
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
