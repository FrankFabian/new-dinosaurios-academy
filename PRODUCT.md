# Product

## Register

product

## Users

Dinosaurios Academy is a staff-first intranet for academy operations in Lima, Peru. The primary users are admins, staff members, and coaches who manage venues, courts, disciplines, class groups, students, guardians, enrollments, attendance, billing, payment validation, scholarships, match invitations, calendar actions, and reports.

Admins configure the system, manage access, and review sensitive operational decisions. Staff users run the daily office workflows: registering students, maintaining guardian information, creating enrollments, reviewing charges, validating receipts, applying approved exceptions, and checking reports. Coaches use the product for assigned class groups, attendance, QR-assisted workflows, and match invitations. Guardians and adult students use a simpler portal to see attendance, payments, invitations, calendar actions, and contact information.

The design priority is staff/admin desktop work first, with coach mobile usage as a strong constraint. Staff need dense, reliable screens for repeated operations. Coaches need mobile browser flows that remain usable in venue and court contexts. Guardians and adult students should share the same visual system, but with a simpler, less dense experience.

## Product Purpose

The product exists to make Dinosaurios Academy operations reliable, auditable, and easier to coordinate across multiple venues and sports. It replaces scattered manual coordination with one structured operational panel for attendance, billing, student and guardian records, schedules, invitations, files, and reporting.

Success means staff can complete daily workflows without inventing side processes, coaches can record attendance quickly, guardians and adult students can understand obligations and invitations, and admins can trust the data behind payments, scholarships, permissions, overrides, and reports.

The interface defaults to Spanish for user-facing text, supports English through i18n, uses the `America/Lima` timezone, displays Peruvian soles as `S/`, and uses dark mode as the primary visual identity. Light mode is a secondary compatibility mode.

## Brand Personality

The product personality is restrained, trustworthy, and operationally clear.

This is an internal operations tool, not a marketing site and not a decorative sports experience. It should feel serious, calm, and competent: appropriate for money, attendance records, student data, guardian relationships, medical notes, permissions, and audit-sensitive actions. The academy context can appear through domain language, sport-aware icons, class and attendance patterns, and match event workflows, but not through mascots, toy-like visuals, or ornamental energy.

User-facing copy should be concise Spanish by default, action-oriented, and respectful. English support must be equivalent, not partial. Technical documentation, code names, model names, component names, and implementation docs stay in English.

## Anti-references

Avoid these patterns:

- Marketing landing page styling inside the authenticated product.
- Decorative dashboards with oversized hero metrics, dramatic gradients, ornamental charts, or hero-card templates.
- Toy-like sports visuals, mascots, juvenile illustrations, or game-like interface language.
- Generic SaaS dark mode with purple-blue gradients, glass panels, glowing blobs, or decorative blur.
- Dense admin screens that hide hierarchy, action priority, status, error recovery, or next steps.
- Custom controls that replace standard table, form, tab, menu, dialog, sheet, dropdown, and navigation behavior without a functional reason.
- Color-only status communication, especially for payment, attendance, permission, receipt, scholarship, enrollment, and invitation states.
- Friction everywhere. The product should be fast for ordinary operations and deliberate only for sensitive actions.

## Design Principles

1. Keep operations first. Every screen should help the user finish a real task: register, review, approve, reject, invite, record, filter, reconcile, override, or report.
2. Earn trust through restraint. Use familiar shadcn-compatible components, calm density, predictable navigation, visible focus states, and explicit consequences for sensitive actions.
3. Make status impossible to miss. Attendance, payment, receipt, invitation, enrollment, scholarship, conflict, and permission states need consistent labels, icons, colors, and accessible text.
4. Separate fast work from sensitive work. Normal edits should be quick. Payments, scholarships, conflict overrides, charge voiding, receipt decisions, and special attendance require deliberate confirmation and audit-friendly copy.
5. Design for bilingual growth. Layouts must tolerate Spanish and English labels, longer person names, currency values, dates, role names, and domain vocabulary without breaking.
6. Support venue-floor reality. Mobile browser use is a first-class constraint for coaches: attendance, QR, invitation, and quick review flows must remain usable on small screens.
7. Keep one system across portals. The guardian/adult student portal uses the same tokens and components as the staff product, but with simplified navigation, lower density, clearer guidance, and more visible primary actions.

## Accessibility & Inclusion

Target WCAG 2.2 AA for contrast, keyboard access, focus visibility, form labeling, status communication, and error recovery. Interactive controls must expose visible focus states and accessible names.

Do not rely on color alone. Payment warnings, receipt reviews, attendance exceptions, invitation responses, permission states, conflict overrides, and destructive actions must combine color with text, icons, shape, or layout.

Respect reduced motion. Motion should communicate state changes only: hover, focus, reveal, feedback, loading, or completion. Avoid decorative page choreography.

All workflows must remain usable without hover-only interactions. This is especially important for mobile browser use by coaches and guardians.
