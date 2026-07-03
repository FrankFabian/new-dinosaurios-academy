export const homeCopy = {
  brand: "Dinosaurios Academy",
  workspace: "Intranet operativa",
  status: "Stack local",
  title: "Panel operativo listo para conectar módulos",
  description:
    "Base inicial para estudiantes, sedes, clases, asistencia, cobros e invitaciones. La experiencia prioriza trabajo de oficina en escritorio y uso móvil para entrenadores.",
  primaryAction: "Revisar configuración",
  navigation: [
    "Dashboard",
    "Estudiantes",
    "Sedes",
    "Clases",
    "Cobros",
    "Asistencia",
    "Eventos",
    "Reportes",
    "Configuración"
  ],
  summary: {
    students: "Estudiantes activos",
    receipts: "Recibos pendientes",
    attendance: "Sesiones de hoy",
    venues: "Sedes configuradas"
  },
  defaults: [
    { label: "Idioma", value: "Español" },
    { label: "Zona horaria", value: "America/Lima" },
    { label: "Moneda", value: "S/ PEN" }
  ],
  nextSteps: {
    title: "Siguientes capacidades",
    items: [
      {
        label: "Backend",
        description: "Django y DRF exponen el healthcheck bajo /api/health/."
      },
      {
        label: "Trabajos",
        description: "Celery queda preparado para correos, cobros mensuales y limpieza de tokens."
      },
      {
        label: "Infraestructura",
        description: "PostgreSQL y Redis-compatible broker corren desde Docker Compose local."
      }
    ]
  }
};
