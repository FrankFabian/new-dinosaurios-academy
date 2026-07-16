# Agent Instructions

## Frontend Standards

- Follow `DESIGN.md` for product UI behavior and `docs/technical-architecture.md` for code organization.
- Use shadcn/ui primitives from `apps/web/src/components/ui` whenever a matching primitive exists. Do not force shadcn for layout-only wrappers, route-driven navigation, or domain-specific empty states.
- Use the approved primary button treatment from `DESIGN.md`: Court Green 2B with foreground text, not black text on a bright green background.
- Use TanStack Table with shadcn Table for data tables. Put column definitions in feature-level `*-columns.tsx` files and keep route files thin.
- Use React Hook Form with Zod for forms. Keep create and edit field order consistent with table display order unless the domain requires a different order.
- Put convenient field and cross-field validations in Zod so errors show inline in the same form before submit. Keep backend/API validation as the source of truth; frontend Zod mirrors it for faster feedback.
- Keep technical ordering fields such as `sort_order` out of ordinary CRUD forms. Assign the next value automatically on create and add a dedicated reordering workflow only when users actually need manual ordering.
- Inline create/edit forms should close after a successful save by clearing the route state that opened them, unless the product flow explicitly needs continuous entry. Keep the success toast visible and refresh the affected data.
- Use React Query for client-side server state and mutations when the UI needs cache, loading, refresh, or optimistic behavior.
- Use `sonner` for non-blocking toast feedback. If a feature needs toast feedback and no local toaster exists yet, install `sonner`, expose it through `apps/web/src/components/ui/sonner.tsx`, mount the Toaster once in the app layout, and keep toast copy in `apps/web/src/lib/i18n/messages.ts`.
- Keep user-facing strings in `apps/web/src/lib/i18n/messages.ts`.
- Keep Next.js route files focused on routing, authentication, authorization, data loading, and composition. Move reusable UI to `features/*` or shared `components/*`.
- Do not duplicate primary actions in the page header and section header. Use one visible create action per active section.
- Keep filters, tables, empty states, and forms visually distinct. Avoid nested cards and redundant bordered wrappers.
- Before reporting work as done, run the relevant tests and manually reason through the visible flows affected by the change: default data, filtered-empty state, true-empty state, create, edit, save-disabled, cancel, deactivate/reactivate, permissions, and translated labels. Do not hand off UI that has unverified filters, duplicated actions, misleading empty states, or labels reused for the wrong purpose.
