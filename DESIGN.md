---
name: Dinosaurios Academy Intranet
description: Shadcn-compatible dark product UI for academy operations, shaped by Refero-inspired restraint without copying its light monochrome style.
colors:
  background: "oklch(13% 0.008 150)"
  shell: "oklch(15% 0.010 150)"
  surface: "oklch(18% 0.010 150)"
  surface-raised: "oklch(22% 0.012 150)"
  surface-soft: "oklch(26% 0.014 150)"
  border: "oklch(34% 0.012 150)"
  foreground: "oklch(94% 0.006 150)"
  muted: "oklch(74% 0.010 150)"
  primary: "oklch(72% 0.105 155)"
  primary-soft: "oklch(24% 0.035 155)"
  primary-strong: "oklch(80% 0.115 155)"
  success: "oklch(72% 0.110 150)"
  warning: "oklch(78% 0.125 82)"
  destructive: "oklch(68% 0.155 28)"
  info: "oklch(72% 0.085 230)"
  light-background: "oklch(97% 0.006 150)"
  light-shell: "oklch(95% 0.008 150)"
  light-surface: "oklch(99% 0.004 150)"
  light-surface-raised: "oklch(100% 0.003 150)"
  light-border: "oklch(88% 0.010 150)"
  light-foreground: "oklch(22% 0.010 150)"
  light-muted: "oklch(48% 0.012 150)"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "2rem"
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: "0"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "1.5rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  small:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: "0"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 550
    lineHeight: 1.25
    letterSpacing: "0"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  "2xl": "24px"
  "3xl": "32px"
  "4xl": "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "8px 10px"
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  input-default:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "8px 10px"
  card-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "16px"
---

# Design System: Dinosaurios Academy Intranet

## 1. Overview

**Creative North Star: "The Academy Operations Desk"**

Dinosaurios Academy uses a product UI register. The authenticated product is an operations intranet for a real sports academy in Lima: dense enough for repeated staff work, calm enough for payments and student records, and familiar enough for admins, staff, coaches, guardians, and adult students to trust it without learning invented controls.

The interface is not a marketing site, sports entertainment surface, or decorative dashboard. It should feel like a disciplined operational console: structured, clear, fast, responsive, Spanish-first, permission-aware, and audit-friendly.

Dark mode remains the primary visual identity. The physical scene is a staff member reviewing payments, enrollments, attendance, and guardian records on a desktop during office hours, while coaches use mobile browser flows near courts with variable light and limited time. The dark theme reduces glare, keeps status legible, and supports long sessions. Light mode is a compatibility theme, not the visual driver.

The approved direction is **Option A: Mesa Operativa Afinada**. It keeps the internal product dark, operational, and table-forward, with a centered global search, a venue/profile scope selector, a grouped sidebar aligned to the product backlog, and a mobile attendance experience that feels first-class instead of squeezed from desktop. The authenticated portal should use the same deep black-green charcoal atmosphere as the approved login preview, then reserve green for subtle interaction feedback: hover, focus, active navigation, selected filters, progress, and primary actions. The style uses precise hairline borders, compact shadcn-compatible controls, and softened geometry inspired by Refero without copying its light monochrome showcase style.

## 2. Refero Adaptation

The referenced Refero style is useful as a discipline reference, not as a palette to copy. Its strongest lessons are component restraint, quiet hierarchy, compact spacing, clear surface layering, hairline borders, and a shadcn-like vocabulary where the UI components themselves carry the visual identity.

### Adopt

- **Component-first identity.** The product should look polished because tables, forms, buttons, badges, sheets, and navigation are consistent, not because the screen has decorative art.
- **Quiet surface layering.** Use a small number of surface tones, fine borders, and minimal elevation so the user can scan data without visual noise.
- **Compact operational density.** Keep body text, labels, controls, and table rows efficient. Density is a feature for staff/admin workflows.
- **Precise shadcn-compatible geometry.** Controls should share a predictable radius, height, padding, focus treatment, and icon rhythm.
- **Hairline discipline.** Borders and dividers should be quiet but visible, especially around inputs, tables, popovers, cards, and shell boundaries.

### Adapt

- **Theme.** Refero is light and nearly achromatic. Dinosaurios stays dark-first because the product is an intranet used for long operational sessions and mobile coach workflows.
- **Color.** Refero keeps almost all color out of the system. Dinosaurios uses restrained color for action, state, and trust: green for primary action and selected state, amber for review, red for destructive/error, blue for neutral system information.
- **Radius.** Refero uses pill-like controls and large cards. Dinosaurios uses softened but more utilitarian geometry: 8px for most controls and cards, 10px only for larger shells or overlays, pill radius only for badges, chips, and segmented controls.
- **Typography.** Refero's Geist voice is crisp and engineered. Dinosaurios keeps Inter/system UI for cross-platform product clarity, avoids tight negative tracking, and sizes text for Spanish labels first.
- **Density.** Refero can read as a style guide. Dinosaurios must read as an operations product where the main surface is tables, filters, forms, and task queues.

### Reject

- Do not copy Refero's white canvas, pure monochrome identity, or red-as-only-color rule.
- Do not use 18px pill buttons and inputs across the entire app.
- Do not use large 24px cards as the default container shape.
- Do not make the product feel like design-system documentation or a component showcase.
- Do not introduce decorative red marks, ornamental accents, gradients, glassmorphism, or visual effects.

## 3. Color Strategy

The product uses a **Restrained** color strategy. Deep black-green charcoal surfaces carry most of the UI. Color appears for action, hover, selection, focus, and semantic status. If a page reads as green, amber, blue, or red overall, the palette is being used as decoration instead of work.

All token values should be represented in OKLCH in design references and Tailwind variables. Avoid untinted pure black or pure white. Neutrals lean slightly green and should match the login preview's dark photographic atmosphere, without adding decorative photo texture inside normal work screens.

### Neutral Layers

- **Night Desk** (`background`): App background and lowest layer. It should feel like the login background color after the photo is darkened: near-black, slightly green-tinted, and quiet.
- **Shell Charcoal** (`shell`): Sidebar, topbar, mobile navigation sheet, and persistent chrome. This layer is close to the background, not a visible colored band.
- **Work Surface** (`surface`): Tables, forms, cards, panels, and page content. This layer is only slightly lighter than the background.
- **Raised Surface** (`surface-raised`): Hovered rows, selected blocks, dropdowns, popovers, sheets, command surfaces, and active regions.
- **Surface Soft** (`surface-soft`): Pressed controls, active filter bars, subtle selected states, and high-density separators.
- **Quiet Rule** (`border`): Dividers, table rules, input strokes, card boundaries, and shell edges.

### Action And Semantic Tokens

- **Court Green** (`primary`): Primary actions, current navigation, selected filters, focused selection support, and constructive forward movement such as `Aprobar recibo`.
- **Court Green Soft** (`primary-soft`): Subtle active backgrounds, selected row tint, and non-color-only focus reinforcement.
- **Court Green Strong** (`primary-strong`): Hover, pressed, and high-contrast focus support where the base primary needs more separation.
- **Cleared Green** (`success`): Paid charges, confirmed invitations, present attendance, completed saves, and successful setup states.
- **Amber Review** (`warning`): Pending receipts, overdue risk, schedule conflicts, debt warnings, and anything requiring review.
- **Ledger Red** (`destructive`): Rejected receipts, voided charges, revoked scholarships, destructive actions, blocked access, and irreversible warnings.
- **Report Blue** (`info`): Neutral guidance, reports, calendar hints, generated information, and non-blocking system messages.

### Color Rules

**The Ten Percent Accent Rule.** `primary` should occupy a small fraction of a screen. The default screen is near-black neutral. Accent is earned by action, hover, selection, focus, progress, or status.

**The Login Coherence Rule.** The logged-in portal and login screen share the same black-green charcoal base. Login may use basketball photography; the authenticated portal should express the same tone through tokens, surfaces, and subtle green interaction states, not through background images.

**The Subtle Green Rule.** Green is visible but controlled. Use it for navbar hover/active states, focus rings, selected rows, progress indicators, primary buttons, and constructive status. Do not wash large panels, page backgrounds, or whole sections in green.

**The Status Pairing Rule.** Every semantic color must be paired with text, iconography, shape, or placement. Never communicate payment, attendance, permission, receipt, invitation, scholarship, or enrollment state by color alone.

**The Replaceable Primary Rule.** `primary` is an operational accent, not a hardcoded meaning. Components reference `primary`; they do not encode green as a business concept.

**The Light Compatibility Rule.** Light mode mirrors the same roles with tinted off-white surfaces. It does not copy Refero's exact monochrome palette and should still preserve academy status color semantics.

## 4. Typography

**Display Font:** Inter with system UI fallback.
**Body Font:** Inter with system UI fallback.
**Label/Mono Font:** Use the body stack for labels. Use a monospace stack only for IDs, tokens, trace values, or technical diagnostics.

Typography should feel compact, plain, and highly legible. Hierarchy comes from size, weight, spacing, and placement, not decorative font choices, tight tracking, or oversized marketing headlines.

### Type Scale

- **Display** (650, 2rem, 1.15): Major dashboard and module titles only.
- **Headline** (650, 1.5rem, 1.2): Detail page titles, report titles, and major section headers.
- **Title** (600, 1rem, 1.35): Card titles, form group labels, table block titles, sheet titles, and dialog titles.
- **Body** (400, 0.9375rem, 1.5): Primary content, descriptions, helper copy, empty states, and validation guidance. Cap prose at 65-75ch.
- **Small** (400, 0.875rem, 1.43): Dense table metadata, secondary descriptions, timestamps, and compact helper text.
- **Label** (550, 0.8125rem, 1.25): Form labels, table headers, status metadata, filter labels, compact controls, and navigation metadata.

### Typography Rules

**The Spanish Fit Rule.** Components must be sized for Spanish first. Labels such as `Recibos pendientes de revision`, `Anular cargo mensual`, and `Registrar asistencia especial` must wrap, truncate intentionally, or move to a secondary line without breaking layout.

**The No Display Labels Rule.** Labels, buttons, table headers, badges, and navigation items never use display styling.

**The Fixed Scale Rule.** Use fixed rem sizes. Do not use viewport-scaled typography for product UI.

**The Zero Tracking Rule.** Product UI uses `letter-spacing: 0` by default. Uppercase captions may use subtle positive tracking only when readability requires it. Do not use negative tracking.

## 5. Shape, Spacing, And Elevation

The interface should be softer and more polished than a default admin template, but it must remain utilitarian. Refero's rounded geometry is adapted into modest product radii rather than copied as pill-shaped controls everywhere.

### Radius

- **4px (`xs`)**: Small internal elements, progress fills, calendar markers, tiny affordances.
- **6px (`sm`)**: Compact secondary controls, dense table affordances, internal grouped elements.
- **8px (`md`)**: Default buttons, inputs, selects, cards, table wrappers, panels, and form blocks.
- **10px (`lg`)**: Sheets, popovers, command menus, larger overlays, and shell groupings.
- **999px (`pill`)**: Badges, chips, avatars, counters, and segmented-control handles only.

### Spacing

Use a 4px base unit. Default gaps should be compact, but rhythm should vary by relationship.

- **4px**: Icon-label gaps inside dense controls.
- **8px**: Field internals, compact button groups, badge groups, row metadata.
- **12px**: Filter rows, form field groups, table toolbar spacing.
- **16px**: Default panel padding, table wrapper padding, mobile list item padding.
- **20px**: Comfortable forms, detail panels, dashboard modules.
- **24px**: Page section spacing and empty state padding.
- **32px**: Major layout gaps and desktop section breaks.
- **48px**: Rare, for top-level module separation only.

### Elevation

Depth is mostly tonal, not shadow-driven. Default content separates through surface color, borders, and spacing. Shadows are reserved for overlays that must float above dense operational content.

- **Hairline Edge:** `0 0 0 1px color-mix(in oklch, {colors.border}, transparent 20%)`. Use for cards, table wrappers, inputs, and shell edges.
- **Overlay Shadow:** `0 16px 40px rgb(0 0 0 / 0.32)`. Use for dropdowns, popovers, date pickers, command menus, and tooltips.
- **Dialog Shadow:** `0 24px 64px rgb(0 0 0 / 0.42)`. Use for confirmation dialogs and blocking flows.
- **Focus Ring:** `0 0 0 3px color-mix(in oklch, {colors.primary}, transparent 72%)`. Use for keyboard focus, focused inputs, selected rows when keyboard-driven, and critical action focus.

### Shape And Elevation Rules

**The Flat At Rest Rule.** Cards, tables, forms, and page sections are flat at rest. If ordinary content needs a heavy shadow to be readable, the surface hierarchy is wrong.

**The Overlay Only Rule.** Strong elevation belongs to menus, popovers, sheets, dialogs, and floating command surfaces.

**The No Nested Card Rule.** Cards can hold content, but cards do not hold other cards. Use dividers, grouped rows, fieldsets, tabs, or sections instead.

## 6. Components

All components must be implementable with shadcn/ui primitives and Tailwind-compatible tokens. Use standard button, input, select, checkbox, switch, dialog, dropdown, popover, tabs, sheet, table, tooltip, toast, and badge behavior unless a real workflow requires a deeper component.

Every interactive component must define default, hover, focus, active, disabled, loading, and error states.

### Buttons

- **Shape:** 8px default radius. Do not use pill buttons except for chips, badges, and segmented controls.
- **Primary:** `primary` background, dark text, medium/strong weight, icon support, 32-36px minimum height for dense tables and 40px for full forms.
- **Secondary:** `surface-raised` background, foreground text, hairline border when needed.
- **Ghost:** Transparent background for row actions, topbar actions, icon buttons, and low-priority commands. Hover uses `surface-raised`.
- **Destructive:** `destructive` for destructive confirmation actions only. Destructive actions must include explicit consequence copy.
- **Loading:** Preserve button width. Show loading feedback without removing useful label context.
- **Focus:** Always show the focus ring. Focus must be visible in dark and light themes.

### Inputs And Filters

- **Inputs:** Use `surface-raised` at rest, hairline border, 8px radius, visible focus ring, disabled state, and enough width for Spanish labels and Peruvian phone/date formats.
- **Global Search:** The authenticated topbar centers the global search field on desktop. It searches across students, guardians, class groups, receipts, charges, attendance sessions, events, and report contexts as those modules exist. Keep the field visually stable, 360-520px wide on desktop, with keyboard shortcut affordance when implemented.
- **Local Search:** Module-level search remains inside the filter toolbar or table toolbar. It searches the current dataset only, such as `Nombre, DNI o codigo` inside Estudiantes.
- **Filters:** Common filters remain visible above tables. Advanced filters can collapse into a panel, sheet, or popover.
- **Validation:** Errors appear under the field. Long forms also include a summary near the top.
- **Required Fields:** Required indicators must not rely only on color. Explain conditional requirements such as adult student contact fields or primary guardian rules for minors.

### Tables

- **Default Pattern:** Tables are the default for operational lists: students, guardians, enrollments, charges, receipts, attendance records, class groups, venues, courts, invitations, and reports.
- **Structure:** Toolbar, filters, table, pagination, and selected-row actions should keep stable positions.
- **Rows:** Row hover uses `surface-raised`. Selection uses a subtle primary tint plus checkbox or explicit selection state.
- **Actions:** Each row has a consistent action area. Primary row action is visible when obvious; secondary actions use a dropdown menu.
- **Density:** Desktop tables can be compact. Numeric columns align right. Dates, currency, and status labels use consistent formats.
- **Status:** Status uses badges with readable text and semantic color. Examples: `Pendiente`, `Parcial`, `Pagado`, `Vencido`, `Presente`, `Tarde`, `Confirmado`, `Rechazado`.
- **Loading:** Use skeleton table rows matching the final columns. Avoid centered spinners for table content.
- **Empty:** Empty tables explain what is missing and show the next valid action when permissions allow it.
- **Mobile:** Tables become priority lists or stacked rows. Preserve primary identity, state, amount/date, and next action. Secondary columns move into row detail.

### Forms

- **Structure:** Forms use clear sections, left-aligned labels, inline validation, and explicit save/cancel actions.
- **Long Flows:** Student registration, enrollment creation, billing review, scholarship application, and match invitation creation can use multi-section or multi-step layouts.
- **Save Behavior:** Ordinary edits should be fast. Sensitive changes require confirmation and may require a reason.
- **Sticky Actions:** Long desktop forms may use a sticky footer or side summary for save/cancel and validation state. Mobile forms keep primary action visible without covering fields.
- **Review Blocks:** Payment, scholarship, attendance exception, and permission flows should include a review block before irreversible submission.

### Navigation And Shell

- **Desktop Shell:** Persistent left sidebar plus topbar.
- **Shell Feel:** Sidebar and topbar use `shell`, not a decorative accent. The active item combines icon, label, subtle green-tinted background, and primary color.
- **Venue/Profile Scope:** Place a venue/profile selector near the brand in the sidebar, such as `Sede Surco`, `Sede San Borja`, or `Todas las sedes`. This selector scopes operational views when the user's permissions allow multiple venues. Single-venue users see the current venue as read-only context.
- **Centered Search:** Keep the topbar global search centered between the module title/menu control and the notification/user controls. Do not push it into the sidebar or hide it behind an icon on desktop.
- **Sidebar Domains:** Use grouped Spanish navigation aligned to the issue backlog:
  - **Operaciones:** Inicio, Estudiantes, Apoderados, Grupos, Matriculas.
  - **Asistencia:** Asistencia, Entrenadores.
  - **Finanzas:** Cobros y pagos, Recibos, Cargos mensuales, Becas y descuentos.
  - **Competencia:** Eventos, Invitaciones, Calendario.
  - **Analitica:** Reportes.
  - **Configuracion:** Sedes e instalaciones, Usuarios y roles, Catalogos, Auditoria.
- **Task Shortcuts:** Dashboard and topbar can expose frequent tasks: Nuevo estudiante, Tomar asistencia, Revisar recibos, Crear evento, Generar cargos.
- **Breadcrumbs:** Detail pages use breadcrumbs for nested records, especially student, group, charge, receipt, event, and attendance contexts.
- **Mobile Shell:** Sidebar collapses into a sheet or drawer. Topbar keeps module title and the highest-priority action.
- **Nav Hover:** Navigation hover should be subtle, similar to the login's green atmosphere: a quiet `primary-soft` background, green icon/text lift, and no bright block unless the item is active.
- **Mobile Bottom Navigation:** Coach-heavy mobile views can use a compact bottom nav for Inicio, Asistencia, primary create/scan action, Grupos, and Mas. The primary center action should be icon-led and green, with text available through accessible labels.
- **Permissions:** Hidden and disabled actions must follow permission rules consistently. If a visible disabled action is permission-blocked, show the reason.

### Venue Profiles And Scope

The product should treat venues as a first-class operating scope. Issues covering venues, courts, disciplines, categories, class groups, attendance, billing, reports, and events all depend on venue context.

- **Venue Profile Selector:** The sidebar selector defines the current operational scope when a user has access to more than one venue. Use labels such as `Sede Surco`, `Sede Villa`, or `Todas las sedes`.
- **Scoped Filters:** Tables and reports that can span venues include a `Sede` filter. If the user is already scoped to a single venue, the filter can show the scoped value or disappear when redundant.
- **Context Chips:** Detail and list pages can show compact chips for venue, court, discipline, category, and group, such as `Sede Surco`, `Cancha 2`, `U12 - Verde`.
- **Permission Awareness:** Coaches see only assigned class groups and sessions. Staff/admin users can switch venue scope if authorized. Guardians and adult students should not see internal venue-scope controls unless needed to understand a class or event location.

### Cards, Panels, And Containers

- **Use:** Cards are for repeated items, summaries, detail panels, and empty states. Page sections should not become decorative floating cards.
- **Shape:** 8px radius, neutral border, flat at rest.
- **Background:** Use `surface` for default panels and `surface-raised` for active, selected, or overlay-like content.
- **Padding:** 16px for normal panels, 12px for compact dashboard modules, 20-24px for empty states.
- **Headers:** Card headers should use type, spacing, and dividers. Do not create nested card header/footer strips that look like separate cards.

### Chips, Badges, And Segmented Controls

- **Chips:** Use for filters and compact attributes such as venue, discipline, category, gender mode, status, and role.
- **Badges:** Use for state. Every badge needs readable text and, where useful, an icon.
- **Segmented Controls:** Use for small mode switches such as list/calendar, active/all, Spanish/English preview, or desktop/mobile preview.
- **Shape:** These are the only default pill-shaped components.

### Sensitive Actions

- **Normal Actions:** Save, filter, edit non-sensitive details, and create ordinary records should be fast, inline, and recoverable with toasts where appropriate.
- **Sensitive Actions:** Approve/reject payment receipts, apply/revoke scholarships, void charges, override schedule conflicts, register special attendance, and change permissions require deliberate confirmation.
- **Reason Capture:** Sensitive financial, attendance, scholarship, or override actions should ask for a note or reason when the domain model needs audit context.
- **Copy:** Confirmation copy must state the consequence, not just ask "Are you sure?"
- **Placement:** Destructive or financial actions must not be the default accidental action in dialogs.

### Loading, Empty, And Error States

- **Loading:** Prefer skeletons that match final structure: table rows for lists, form blocks for forms, and stat placeholders for reports.
- **Empty:** Empty states identify what is missing and the next valid action. Example: no class groups should point to creating venue, discipline, category, or group depending on context.
- **Error:** Errors are specific, recoverable, and localized. Include retry when retry makes sense and permission guidance when access rules block the action.
- **Offline/Network:** Mobile coach flows should handle network failure with clear retry and preserved input where possible.

### Authentication Screens

Login is the main public product surface. It defines the black-green atmospheric base that the authenticated portal should inherit. It can use stronger sports photography than the internal shell, but the login should not become a marketing landing page.

- **Mobile Login:** Use a full-bleed basketball academy photo with a dark green overlay, similar in structure to the mobile reference: brand at the top, concise title, email and password fields, remember/forgot controls, and a strong green `Iniciar sesion` button. Keep the form in the lower half so the image remains visible.
- **Desktop Login:** Use a split composition inspired by the web reference: a large centered auth container, left photo panel using the same basketball image treatment, right dark form panel. Do not use a pure white form panel or a purple/blue primary button.
- **Photo Direction:** The preferred image direction is the provided green-tinted basketball player poster/photo: dramatic but controlled, athletic, Lima sports context, and not juvenile. Remove or avoid poster typography such as giant `FINAL` text inside the auth UI.
- **Copy:** Use concise Spanish defaults: `Bienvenido de vuelta`, `Ingresa a tu panel de operaciones`, `Correo electronico`, `Contrasena`, `Recordarme`, `Olvide mi contrasena`, `Iniciar sesion`.
- **Controls:** Inputs use dark translucent or raised surfaces with hairline borders, clear focus rings, and visible labels or accessible names. Social login should not be visually prominent unless the product later supports it.
- **Portal Match:** The authenticated portal should match the login's base background tone. The difference is density and restraint: the portal uses the same atmosphere for work surfaces, while the login uses the basketball image as the emotional entry point.

## 7. Product Surface Direction

### Staff And Admin Desktop

Staff/admin screens should prioritize fast scanning, filters, tables, detail panes, and predictable actions. The default layout is a restrained shell with a persistent sidebar, centered global search, compact topbar, clear page title, visible primary task, venue/profile scope, and dense content area. Its background should use the same black-green base as the login preview, with green reserved for subtle interaction and status cues.

Use dashboard summaries sparingly. Operational queues such as pending receipts, overdue charges, today's attendance, upcoming match invitations, and enrollment exceptions are more valuable than decorative metrics.

### Coach Mobile

Coach flows should reduce navigation depth and preserve tap targets. Attendance, QR-assisted flows, class group review, and match invitations need structural mobile layouts, not squeezed desktop tables. The main action should be visible, labels must remain readable outdoors or courtside, and offline/network failure states should preserve entered work where possible.

### Guardian And Adult Student Portal

The portal uses the same tokens and components with simpler navigation, lower density, clearer guidance, and more visible primary actions. It should feel connected to the staff product, but not expose operational complexity.

## 8. Accessibility And Localization

Target WCAG 2.2 AA for contrast, keyboard access, focus visibility, form labeling, status communication, and error recovery.

All user-facing copy is Spanish-first and must have equivalent English support through i18n. Layouts must tolerate longer Spanish labels, English variants, long names, Peruvian phone numbers, dates, currency values in `S/`, role names, and domain vocabulary.

Do not rely on hover-only interactions. This is especially important for mobile browser use by coaches and guardians.

Respect reduced motion. Motion should communicate state changes only: hover, focus, reveal, feedback, loading, or completion. Use 150-250ms transitions and avoid decorative page choreography.

## 9. Do's And Don'ts

### Do

- **Do** use a product UI register: familiar, task-focused, consistent, restrained, and not decorative.
- **Do** build with strict shadcn/ui compatibility and Tailwind-friendly tokens.
- **Do** default to dark mode and treat light mode as a secondary compatible theme.
- **Do** use semantic tokens as the source of truth: `primary`, `surface`, `warning`, `destructive`, `success`, `info`.
- **Do** use Refero as a quality reference for restraint, hairlines, compactness, and component discipline.
- **Do** keep all user-facing strings in translation resources, with Spanish as the default and English as a complete supported locale.
- **Do** use concrete shared patterns for tables, forms, navigation, badges, loading, empty, and error states.
- **Do** make mobile browser layouts structural: collapse navigation, reprioritize table columns, preserve tap targets, and surface the main action.
- **Do** meet WCAG 2.2 AA expectations for contrast, focus, labeling, keyboard use, and non-color status communication.
- **Do** add deliberate friction to payment, scholarship, permission, conflict override, charge voiding, receipt decision, and special attendance actions.

### Don't

- **Don't** use marketing landing page styling inside the authenticated product.
- **Don't** use decorative dashboards with oversized hero metrics, dramatic gradients, ornamental charts, or hero-card templates.
- **Don't** use toy-like sports visuals, mascots, juvenile illustrations, or game-like interface language.
- **Don't** copy Refero's light monochrome palette, pill controls, large-radius card system, or design-system-showcase feel.
- **Don't** use generic SaaS dark mode with purple-blue gradients, glass panels, glowing blobs, or decorative blur.
- **Don't** invent custom controls where standard shadcn-compatible tables, forms, tabs, menus, dialogs, sheets, dropdowns, and navigation already solve the problem.
- **Don't** use side-stripe borders, gradient text, nested cards, or decorative glassmorphism.
- **Don't** communicate payment, attendance, permission, receipt, invitation, scholarship, or enrollment states by color alone.
- **Don't** make every action slow. Friction belongs only where consequences, audit, money, permissions, or safety require it.

## 10. Follow-Up Implementation Brief

A follow-up implementation issue can use this brief:

Update the authenticated Dinosaurios Academy product UI to match `DESIGN.md`: dark-first Mesa Operativa Afinada, login-matched black-green portal background, shadcn-compatible controls, 8px default radius, restrained court-green interaction token, hairline borders, compact tables/forms, structural mobile layouts for coaches, and Spanish-first accessible state communication. Do not copy Refero literally; use it only as a reference for restraint, component discipline, quiet hierarchy, and polished surface layering.

Implementation should begin with shared tokens and shell primitives, then update one vertical slice before broad rollout:

- App shell and navigation, including centered global search, venue/profile selector, grouped sidebar, notifications, and user menu.
- Authentication screens, including mobile full-photo login and desktop split login with the approved basketball photo direction.
- Button, input, badge, table, card/panel, dialog/sheet, toast, and skeleton states.
- One staff/admin list view with filters, venue scope, and table.
- One form-heavy workflow.
- One coach mobile workflow.
- One guardian/adult student portal surface.
