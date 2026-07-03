---
name: Dinosaurios Academy Intranet
description: Strict shadcn-compatible dark product UI for academy operations.
colors:
  background: "#111312"
  shell: "#171a18"
  surface: "#1e221f"
  surface-raised: "#262b27"
  border: "#3a403b"
  foreground: "#eef2ed"
  muted: "#aab3ad"
  primary: "#5fc58b"
  primary-strong: "#8ce0ad"
  success: "#58c783"
  warning: "#e6b84f"
  destructive: "#ef6b5f"
  info: "#6caed6"
  light-background: "#f7f8f5"
  light-surface: "#fbfcf8"
  light-foreground: "#1d211e"
  light-border: "#d8ded6"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "2rem"
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: "normal"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "1.5rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 550
    lineHeight: 1.25
    letterSpacing: "normal"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "10px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  "2xl": "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: "8px 10px"
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.background}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  input-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: "8px 10px"
  card-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "16px"
---

# Design System: Dinosaurios Academy Intranet

## 1. Overview

**Creative North Star: "The Operations Desk"**

Dinosaurios Academy uses a product UI register. The interface is an operations desk for a real academy: dense enough for repeated staff work, calm enough for financial and student records, and familiar enough that admins, staff, and coaches can trust it without learning invented controls. It is not a sports-themed marketing surface.

Dark mode is the primary identity. The physical scene is staff reviewing payments and student records on desktop, while coaches use phones near courts where lighting can vary and speed matters. The system should reduce glare, keep status legible, and make primary actions obvious without making the surface decorative. Light mode exists as compatibility, but dark mode drives the palette, layering, focus states, and component design.

The visual strategy is **Mesa Operativa Verde**: neutral dark surfaces with a restrained green/teal primary token for actions, active navigation, selection, and focus. This green is a functional product token, not a permanent brand promise. If Dinosaurios Academy later provides official brand colors, `primary` can change without redefining component roles.

**Key Characteristics:**

- Staff/admin desktop first, with coach mobile flows as a strict responsive constraint.
- One visual system across staff, coach, guardian, and adult student surfaces.
- Guardian and adult student portal uses the same tokens with simpler navigation and lower density.
- shadcn/ui-compatible components, states, radius, and interaction vocabulary.
- Concrete patterns for tables, forms, navigation, loading, empty, error, and sensitive actions.
- Spanish user-facing UI by default, complete English support through i18n.

## 2. Colors

The palette is restrained: dark tinted neutrals, one primary green/teal accent, and semantic colors for operational states. Accent color is rare by design. It marks action, selection, focus, and current location, not decoration.

### Primary

- **Court Green** (`primary`): Used for primary actions, active navigation, selected filters, selected rows, focus support, and constructive forward movement such as `Aprobar recibo`.
- **Court Green Strong** (`primary-strong`): Used for hover emphasis, active pressed states, and high-contrast focus support when the base primary needs more separation.

### Secondary

- **Amber Review** (`warning`): Used for pending receipts, overdue risk, schedule conflicts, debt warnings, and actions that require review.
- **Report Blue** (`info`): Used for neutral guidance, reports, calendar hints, generated information, and non-blocking system messages.

### Tertiary

- **Cleared Green** (`success`): Used for paid charges, confirmed invitations, present attendance, completed saves, and successful setup states.
- **Ledger Red** (`destructive`): Used for rejected receipts, voided charges, revoked scholarships, destructive actions, blocked access, and irreversible warnings.

### Neutral

- **Night Desk** (`background`): App background.
- **Shell Charcoal** (`shell`): Sidebar, topbar, and persistent navigation.
- **Work Surface** (`surface`): Tables, forms, panels, cards, and page content.
- **Raised Surface** (`surface-raised`): Hovered rows, selected areas, dropdowns, sheets, popovers, and command menus.
- **Quiet Rule** (`border`): Borders, dividers, input strokes, table rules, and separators.
- **Paper Text** (`foreground`): Primary readable text.
- **Muted Text** (`muted`): Metadata, helper text, timestamps, secondary table content, and hints.

### Named Rules

**The Ten Percent Accent Rule.** `primary` should cover only a small fraction of a screen. If a page reads as green, the accent is doing decoration instead of work.

**The Status Pairing Rule.** Every semantic color must be paired with text, iconography, shape, or placement. Never communicate payment, attendance, permission, receipt, invitation, scholarship, or enrollment state by color alone.

**The Replaceable Primary Rule.** The current `primary` token is an operational accent. Components reference `primary`; they do not hardcode green as a meaning.

## 3. Typography

**Display Font:** Inter with system UI fallback.
**Body Font:** Inter with system UI fallback.
**Label/Mono Font:** Use the body stack for labels. Use a monospace stack only for tokens, IDs, trace values, or technical diagnostics.

**Character:** Compact, plain, and highly legible. Hierarchy comes from size, weight, spacing, and placement, not decorative type.

### Hierarchy

- **Display** (650, 2rem, 1.15): Page titles for major dashboards and module landing pages only.
- **Headline** (650, 1.5rem, 1.2): Section headers, report titles, and detail page titles.
- **Title** (600, 1rem, 1.35): Card titles, form group labels, table block titles, sheet titles, and dialog titles.
- **Body** (400, 0.9375rem, 1.5): Primary content, descriptions, helper copy, empty states, and validation guidance. Cap prose at 65-75ch.
- **Label** (550, 0.8125rem, 1.25): Form labels, table headers, status metadata, filter labels, compact controls, and navigation metadata.

### Named Rules

**The No Display Labels Rule.** Labels, buttons, table headers, badges, and navigation items never use display styling. Product hierarchy must remain calm and predictable.

**The Spanish Fit Rule.** Components must be sized for Spanish first. Labels such as `Recibos pendientes de revision`, `Anular cargo mensual`, and `Registrar asistencia especial` must wrap, truncate intentionally, or move to a secondary line without breaking layout.

**The Fixed Scale Rule.** Use fixed rem sizes. Do not use viewport-scaled typography for product UI.

## 4. Elevation

Depth is mostly tonal, not shadow-driven. Default content separates through surface color, borders, and spacing. Shadows are reserved for overlays that must float above dense operational content.

### Shadow Vocabulary

- **Overlay Shadow** (`0 16px 40px rgb(0 0 0 / 0.32)`): Dropdowns, popovers, date pickers, command menus, and tooltips.
- **Dialog Shadow** (`0 24px 64px rgb(0 0 0 / 0.42)`): Confirmation dialogs and blocking flows.
- **Focus Ring** (`0 0 0 3px rgb(95 197 139 / 0.28)`): Keyboard focus, focused inputs, selected table rows when keyboard-driven, and critical action focus.

### Named Rules

**The Flat At Rest Rule.** Cards, tables, forms, and page sections are flat at rest. If ordinary content needs a heavy shadow to be readable, the surface hierarchy is wrong.

**The Overlay Only Rule.** Strong elevation belongs to menus, popovers, sheets, dialogs, and floating command surfaces.

## 5. Components

All components must be implementable with shadcn/ui primitives and Tailwind-compatible tokens. Use standard button, input, select, checkbox, switch, dialog, dropdown, popover, tabs, sheet, table, tooltip, toast, and badge behavior unless a real workflow requires a deeper component.

### Buttons

- **Shape:** Compact rectangle with modest rounding (6px). Do not use pill buttons except for chips, badges, or segmented controls.
- **Primary:** `primary` background, dark text, medium/strong weight, icon support, 32-36px minimum height for dense tables and 40px for full forms.
- **Secondary:** `surface-raised` background, foreground text, quiet border when needed.
- **Ghost:** Transparent background for row actions, topbar actions, icon buttons, and low-priority commands.
- **Destructive:** `destructive` for destructive confirmation actions only. Destructive actions must include explicit consequence copy.
- **Loading:** Preserve button width. Show a loading indicator or icon without removing useful label context.
- **Focus:** Always show the focus ring. Focus must be visible in dark and light themes.

### Tables

- **Default Pattern:** Tables are the default for operational lists: students, guardians, enrollments, charges, receipts, attendance records, class groups, venues, courts, invitations, and reports.
- **Filters:** Filters sit above the table. Common filters remain visible. Advanced filters can collapse into a panel, sheet, or popover.
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
- **Inputs:** Dark surface background, quiet border, 6px radius, visible focus ring, disabled state, and enough width for Spanish labels and Peruvian phone/date formats.
- **Validation:** Errors appear under the field. Long forms also include a summary near the top.
- **Required Fields:** Required indicators must not rely only on color. Explain conditional requirements such as adult student contact fields or primary guardian rules for minors.
- **Save Behavior:** Ordinary edits should be fast. Sensitive changes require confirmation and may require a reason.

### Navigation

- **Desktop Shell:** Persistent left sidebar plus topbar.
- **Sidebar Domains:** Dashboard, Students, Guardians, Venues, Classes, Enrollments, Billing, Attendance, Events, Reports, Settings.
- **Task Shortcuts:** Dashboard and topbar can expose frequent tasks: Register student, Take attendance, Review receipts, Create match event, Generate charges.
- **Active State:** Active navigation uses `primary`, icon, and background tint. Hover uses `surface-raised`.
- **Breadcrumbs:** Detail pages use breadcrumbs for nested records, especially student, group, charge, receipt, event, and attendance contexts.
- **Mobile Shell:** Sidebar collapses into a sheet or drawer. Topbar keeps module title and the highest-priority action.
- **Permissions:** Hidden and disabled actions must follow permission rules consistently. If a visible disabled action is permission-blocked, show the reason.

### Cards / Containers

- **Use:** Cards are for repeated items, summaries, detail panels, and empty states. Do not nest cards.
- **Shape:** 8px radius, neutral border, flat at rest.
- **Background:** Use `surface` for default panels and `surface-raised` for active, selected, or overlay-like content.
- **Padding:** 16px for normal panels, 12px for compact dashboard modules, 24px for empty states.

### Chips, Badges, And Segmented Controls

- **Chips:** Use for filters and compact attributes such as venue, discipline, category, gender mode, status, and role.
- **Badges:** Use for state. Every badge needs readable text.
- **Segmented Controls:** Use for small mode switches such as list/calendar, active/all, Spanish/English preview, or desktop/mobile preview.

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

## 6. Do's and Don'ts

### Do:

- **Do** use a product UI register: familiar, task-focused, consistent, restrained, and not decorative.
- **Do** build with strict shadcn/ui compatibility and Tailwind-friendly tokens.
- **Do** default to dark mode and treat light mode as a secondary compatible theme.
- **Do** use semantic tokens as the source of truth: `primary`, `surface`, `warning`, `destructive`, `success`, `info`.
- **Do** keep all user-facing strings in translation resources, with Spanish as the default and English as a complete supported locale.
- **Do** use concrete shared patterns for tables, forms, navigation, badges, loading, empty, and error states.
- **Do** make mobile browser layouts structural: collapse navigation, reprioritize table columns, preserve tap targets, and surface the main action.
- **Do** meet WCAG 2.2 AA expectations for contrast, focus, labeling, keyboard use, and non-color status communication.
- **Do** add deliberate friction to payment, scholarship, permission, conflict override, charge voiding, receipt decision, and special attendance actions.

### Don't:

- **Don't** use marketing landing page styling inside the authenticated product.
- **Don't** use decorative dashboards with oversized hero metrics, dramatic gradients, ornamental charts, or hero-card templates.
- **Don't** use toy-like sports visuals, mascots, juvenile illustrations, or game-like interface language.
- **Don't** use generic SaaS dark mode with purple-blue gradients, glass panels, glowing blobs, or decorative blur.
- **Don't** invent custom controls where standard shadcn-compatible tables, forms, tabs, menus, dialogs, sheets, dropdowns, and navigation already solve the problem.
- **Don't** use side-stripe borders, gradient text, nested cards, or decorative glassmorphism.
- **Don't** communicate payment, attendance, permission, receipt, invitation, scholarship, or enrollment states by color alone.
- **Don't** make every action slow. Friction belongs only where consequences, audit, money, permissions, or safety require it.
