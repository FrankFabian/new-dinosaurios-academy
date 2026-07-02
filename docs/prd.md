# PRD: Dinosaurios Academy Intranet MVP

Issue tracker label: `ready-for-agent`

Publication status: local PRD only. The workspace does not currently expose a valid Git repository or configured issue tracker, so this PRD could not be published as an issue yet.

## Problem Statement

Dinosaurios Academy needs a reliable internal web application to run academy operations across multiple Lima venues, courts, sports, categories, class groups, staff members, coaches, students, guardians, and adult students.

Today the academy needs to coordinate attendance, monthly billing, scholarships, payment validation, extracurricular match invitations, calendar events, emergency contact data, and operational reporting. These workflows involve different user types with different access rules, and they need to work on desktop and mobile browsers with a secure default setup.

The system must support real operational complexity: students can be minors or adults, guardians pay and receive notifications for minors, adult students manage themselves, students can belong to multiple class groups, prices vary by venue, discipline, category, and group gender mode, and scholarships affect billing while preserving historical records.

## Solution

Build a staff-first intranet MVP with Django and Django REST Framework as the backend, Next.js with Tailwind CSS and shadcn/ui as the frontend, PostgreSQL as the primary database, and Celery with a Redis-compatible broker for background jobs.

The first release provides a full operational panel for admin, staff, and coaches, plus a minimal portal for guardians and adult students. Staff and coaches can manage day-to-day attendance and invitations. Guardians and adult students can see attendance, pending payments, payment status, invitations, and calendar actions.

The app defaults to Spanish, Peruvian soles, Lima timezone, responsive views, and dark mode. The UI supports both Spanish and English through i18n. All code, technical names, models, fields, endpoints, components, and technical documentation remain in English.

## User Stories

1. As an admin, I want to manage staff users, so that the academy can control who operates the system.
2. As an admin, I want to assign roles and permissions, so that users only access the actions they are allowed to perform.
3. As an admin, I want sensitive actions to require explicit permissions, so that billing, scholarships, and overrides are controlled.
4. As an admin, I want to configure venues, so that classes and events can be organized by location.
5. As an admin, I want to configure courts within venues, so that scheduling can avoid court conflicts.
6. As an admin, I want to configure disciplines, so that basketball and volleyball can be managed in one system.
7. As an admin, I want to configure categories, so that students can be grouped by academy category.
8. As an admin, I want age-based category suggestions, so that staff can classify students faster.
9. As a staff member, I want to override the suggested category, so that real-world sporting exceptions can be handled.
10. As an admin, I want to configure class groups by venue, discipline, category, and gender mode, so that class organization matches academy operations.
11. As an admin, I want groups to be male, female, or mixed, so that the academy can model its actual classes.
12. As an admin, I want to assign coaches to class groups, so that coach permissions and schedules are accurate.
13. As a staff member, I want schedule conflict warnings for courts, so that two activities are not accidentally planned in the same court.
14. As a staff member, I want schedule conflict warnings for coaches, so that coaches are not double-booked.
15. As an authorized staff member, I want to override schedule conflicts, so that exceptional operational cases can still be recorded.
16. As a staff member, I want to register students, so that the academy has structured student records.
17. As a staff member, I want to mark whether a student is a minor or adult from birth date, so that account and guardian rules apply correctly.
18. As a staff member, I want adult students to require email and phone, so that they can manage their own access and notifications.
19. As a staff member, I want minors to require a primary guardian, so that there is a responsible person for payments and notifications.
20. As a staff member, I want medical notes to be optional, so that sensitive health details are recorded only when provided.
21. As a staff member, I want to register guardians and contacts, so that emergency and responsibility information is available.
22. As a guardian, I want to access only my linked children, so that student privacy is protected.
23. As an adult student, I want to access only my own records, so that I can manage myself securely.
24. As a staff member, I want primary guardians for minors to pay by default, so that payment responsibility is clear.
25. As a staff member, I want additional guardian/contact permissions to be configurable, so that families with multiple contacts can be handled.
26. As a staff member, I want to create enrollments for students, so that each active class membership is tracked.
27. As a staff member, I want one student to have multiple active enrollments, so that students can attend multiple groups or disciplines.
28. As a staff member, I want pricing to be suggested from reusable price rules, so that billing is consistent.
29. As an admin, I want price rules by venue, discipline, category, group gender mode, and optional class group, so that prices match academy policy.
30. As a staff member, I want enrollment prices to store snapshots, so that historical charges do not change when prices change later.
31. As an admin, I want to register scholarships, so that students can receive partial or full financial support.
32. As an admin, I want scholarships to support percentage and fixed amount discounts, so that common scholarship types are covered.
33. As an admin, I want scholarships to have validity dates and audit data, so that discounts are accountable.
34. As a staff member, I want 100% scholarships to still generate zero-value charges, so that reporting remains complete.
35. As a staff member, I want monthly charges generated from active enrollments, so that billing reflects actual academy participation.
36. As a staff member, I want charges to be reviewable and adjustable, so that mid-month enrollments and exceptions can be handled.
37. As a staff member, I want charges to support full and partial payments, so that real payment behavior is represented.
38. As a staff member, I want charges to have due dates and overdue status, so that pending collections can be tracked.
39. As a guardian, I want to see pending payments for my children, so that I know what I owe.
40. As an adult student, I want to see my pending payments, so that I can manage my own account.
41. As a guardian, I want to upload payment receipts, so that staff can validate non-card payments.
42. As an adult student, I want to upload payment receipts, so that I can prove payment.
43. As a staff member, I want to approve or reject payment receipts, so that payment status is accurate.
44. As a staff member, I want to manually record payments by transfer, cash, Yape, Plin, POS, or other methods, so that offline operations are supported.
45. As a coach, I want to see my assigned class sessions, so that I can take attendance efficiently.
46. As staff, I want to take attendance for any authorized class session, so that operations do not depend only on coaches.
47. As a coach, I want to take attendance manually, so that I can handle cases where QR scanning is not possible.
48. As a coach, I want to scan a student QR inside an active session, so that attendance is quick and tied to the correct class.
49. As a staff member, I want QR scans to validate active enrollment, so that students are not marked in the wrong group silently.
50. As an authorized staff member, I want to mark make-up or guest attendance, so that exceptional attendance does not pollute regular metrics.
51. As a guardian, I want to view my child's attendance, so that I can monitor participation.
52. As an adult student, I want to view my attendance, so that I can monitor my participation.
53. As a coach, I want to create match events for my assigned groups, so that I can coordinate extracurricular matches.
54. As staff, I want to create and manage any match event, so that the academy can coordinate events centrally.
55. As a staff member, I want match events to include venue or external location, so that participants know where to go.
56. As a staff member, I want match events to include opponent information, so that event context is clear.
57. As a participant, I want a Google Maps link for match locations, so that I can navigate easily.
58. As a coach, I want to filter students by venue, class group, category, discipline, gender, age, attendance, and payment status, so that I can invite the right students.
59. As a coach, I want to invite only selected students, so that match rosters are controlled.
60. As a guardian, I want to receive match invitations by email, so that I know when my child is invited.
61. As an adult student, I want to receive match invitations by email, so that I can respond myself.
62. As a guardian or adult student, I want to confirm or decline from a secure email link without logging in, so that responding is easy.
63. As a guardian or adult student, I want to respond from the portal, so that I can manage invitations while authenticated.
64. As staff, I want invitation statuses to show pending, confirmed, declined, and no response, so that event planning is clear.
65. As a user, I want to add classes and match events to my calendar, so that I can remember academy commitments.
66. As a user, I want calendar support through `.ics` files and calendar links, so that I can use my preferred calendar without account integration.
67. As staff, I want payment debt to appear as a warning but not automatically block attendance, so that real-world exceptions can be handled.
68. As staff, I want payment debt as a filter for invitations, so that business decisions can be made case by case.
69. As staff, I want dashboards for attendance by student, group, venue, discipline, category, and date range, so that I can monitor participation.
70. As staff, I want low-attendance reports, so that I can follow up with students and guardians.
71. As staff, I want payment dashboards by month, venue, group, and student, so that collections can be managed.
72. As staff, I want to see collected versus pending amounts, so that academy finances are visible.
73. As staff, I want to see receipts pending validation, so that payment operations do not stall.
74. As staff, I want scholarship reports, so that discounted amounts and active scholarships are visible.
75. As staff, I want match invitation reports, so that event response rates are visible.
76. As an admin, I want all user-facing text to support Spanish and English, so that the product can serve bilingual users.
77. As a Spanish-speaking staff user, I want Spanish as the default language, so that the app matches daily operations in Lima.
78. As a mobile user, I want all views responsive, so that I can use the app from a phone browser.
79. As any user, I want dark mode by default, so that the interface follows the product decision.
80. As an admin, I want secure cookie-based authentication, so that browser sessions are safer than localStorage token storage.
81. As an admin, I want the API under the same production site, so that CSRF, cookies, and CORS are simpler and safer.
82. As staff, I want private files for receipts and student photos, so that sensitive files are not publicly exposed.
83. As an operator, I want emails to be sent in background jobs, so that the UI is not blocked by email delivery.
84. As an operator, I want monthly charge generation in background jobs, so that recurring billing does not depend on manual repetitive work.
85. As an operator, I want expired tokens cleaned up, so that secure links are lifecycle-managed.
86. As support staff, I want Django Admin available as a restricted secondary tool, so that data correction and debugging are possible.

## Implementation Decisions

- Build a monorepo with separate backend and frontend apps.
- Backend uses Django, Django REST Framework, PostgreSQL, Celery, and a Redis-compatible broker/backend.
- Frontend uses Next.js, Tailwind CSS, shadcn/ui, pnpm, react-hook-form, and zod.
- Backend dependencies use Python requirements files.
- Backend validation always happens through DRF serializers and domain services, regardless of frontend validation.
- Backend Django apps are split by domain: accounts, people, academics, enrollments, billing, attendance, events, files, and audit.
- Frontend code is split by domain modules: students, guardians, venues, classes, enrollments, billing, attendance, events, reports, and settings.
- Django is the authentication authority.
- Authentication uses secure httpOnly cookies with CSRF protection.
- Public confirmation/setup links use scoped signed tokens instead of normal sessions.
- Production target is a single public site with `/api/...` proxied to Django.
- Django Groups and Permissions provide baseline RBAC.
- Domain-specific permission checks restrict object access for coaches, guardians, adult students, and staff.
- Django Admin is available as a restricted secondary internal tool, not the main product UI.
- UI supports Spanish and English from the start.
- Default locale is Spanish, default timezone is America/Lima, and default currency is PEN displayed as `S/`.
- Code, technical names, models, fields, endpoints, components, commits, and technical documentation use English.
- User-facing labels come from translation files.
- Dark mode is the default UI theme.
- All views must be responsive.
- Students can be minors or adults.
- Minors require a primary guardian.
- Adult students require email and phone and can manage themselves.
- Primary guardians for minors can pay, receive notifications, and authorize/pick up by default.
- Additional contacts are configurable.
- Medical data is optional.
- Students can have multiple active enrollments.
- Categories can be suggested by age but are assigned manually by staff.
- Class groups have gender modes: male, female, mixed.
- Pricing uses reusable price rules and historical snapshots on enrollments and charges.
- Scholarships support percentage or fixed amount, dates, status, reason, and audit data.
- Monthly charges are generated from active enrollments.
- Charges support pending, partial, paid, overdue, and void states.
- Charges support partial payments and manual adjustments.
- No online payment gateway is included in the MVP.
- Payment receipts are uploaded by guardians/adult students and validated by staff.
- Attendance is recorded against explicit class sessions.
- QR codes identify students through tokens and are used only within active session context.
- Attendance supports regular, make-up, and guest records.
- Special attendance requires authorization and must remain visible in reports.
- Match events are independent from class sessions.
- Match events can use internal venues/courts or external locations with Google Maps URLs.
- Match invitations are individual per student and track response status.
- Invitations can be confirmed or declined through secure email links without login.
- Calendar support uses `.ics` files and optional calendar links, not OAuth sync.
- Automatic notifications use email only in the MVP.
- WhatsApp is manual only in the MVP.
- Files are private by default and accessed through backend authorization.
- Development can use local filesystem storage, while production should use private object storage.
- Celery background jobs handle email, monthly charge generation, overdue marking, payment reminders, session generation/exposure, and token cleanup.
- Free tiers may be used for early MVP/staging, but production reliability may require paid hosting, database, Redis-compatible service, worker, object storage, email, and monitoring.

## Testing Decisions

Good tests should assert external behavior and domain outcomes, not implementation details. Tests should verify permissions, state transitions, API responses, background task effects, and user-visible workflows.

Primary backend test seams:

- DRF API tests for authenticated and unauthorized access.
- Domain service tests for billing generation, scholarship application, schedule conflict detection, attendance recording, and invitation response.
- Serializer validation tests for student/guardian rules, enrollment rules, payment receipt states, and match event input.
- Permission tests for admin, staff, coach, guardian, and student access boundaries.
- Celery task tests for charge generation, email enqueueing, overdue marking, and token cleanup.

Primary frontend test seams:

- Page-level workflow tests for staff dashboard flows such as student registration, enrollment, attendance, payment receipt review, and match invitation creation.
- Component tests for forms using react-hook-form and zod schemas where behavior is complex.
- i18n tests or checks that user-facing strings come from translation resources.
- Responsive visual checks for core layouts on desktop and mobile.
- Auth/session behavior tests around login-required pages and role-specific navigation.

End-to-end testing seams:

- Staff creates a student, guardian, enrollment, charge, and validates a receipt.
- Coach opens a class session and records attendance manually and by QR token.
- Staff creates a match event, invites selected students, and a guardian confirms through a secure link.
- Guardian/adult student views payments, attendance, invitations, and calendar actions.

There is no existing codebase test prior art yet because the project currently contains documentation only. The initial implementation should establish backend API/domain tests first, then add frontend workflow coverage for the highest-risk flows.

## Out of Scope

- Online card/payment gateway processing.
- Automatic WhatsApp messaging.
- SMS notifications.
- Google/Microsoft Calendar OAuth synchronization.
- Automatic late fees or interest.
- Public self-registration.
- Advanced sports performance analytics.
- Formal scholarship approval workflow.
- Native mobile applications.
- Multi-tenant support for multiple academies.
- Full accounting system replacement.

## Further Notes

This PRD is based on confirmed product and technical decisions captured in the planning session and current documentation.

The issue tracker was not available in this workspace. When a tracker is configured, publish this PRD as an issue and apply the `ready-for-agent` label.

Cost-sensitive production planning is documented separately. The MVP can use local/free infrastructure during development, but a reliable production deployment should plan for paid services for backend hosting, worker hosting, PostgreSQL, Redis-compatible infrastructure, object storage, email delivery, monitoring, logs, and backups.
