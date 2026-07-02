# Dinosaurios Academy Intranet MVP Scope

## Product Positioning

The MVP is a staff-first intranet for Dinosaurios Academy, a sports academy in Lima, Peru with basketball and volleyball programs across multiple venues.

The first release prioritizes daily operations for academy staff and coaches, with a minimal but functional portal for guardians and adult students.

## Users And Roles

The system supports these roles:

- `admin`: global configuration, users, permissions, venues, disciplines, pricing, audit access.
- `staff`: day-to-day operations for students, enrollments, attendance, payments, invitations, and reports according to permissions.
- `coach`: assigned class groups, attendance, and match invitations for their own groups.
- `guardian`: access for minors under their care, including attendance, payments, invitations, and emergency/contact information.
- `student`: adult students can manage their own payments, invitations, calendar items, and attendance visibility. Minor student accounts are optional and limited.

Sensitive actions must support fine-grained permissions:

- approve payments
- apply scholarships
- edit pricing
- invite students outside assigned groups
- register special attendance
- override schedule conflicts

## Localization And Defaults

The user interface supports Spanish and English from the start.

Defaults:

- default language: Spanish
- currency: Peruvian soles (`PEN`, displayed as `S/`)
- timezone: `America/Lima`
- UI theme: dark mode by default
- all views must be responsive

Engineering convention:

- source code, model names, fields, endpoints, components, functions, commits, and technical documentation use English
- user-facing text must be provided through translation files, not hardcoded in components

## Student And Guardian Rules

Students can be minors or adults.

For minors:

- at least one primary guardian is required
- the primary guardian can pay by default
- the primary guardian receives operational notifications by default
- the primary guardian can authorize or pick up the student by default unless staff records a restriction
- additional contacts are configurable

For adult students:

- the student can act as their own responsible party
- email and phone are required
- guardians are not required
- emergency contacts can be registered, but they do not manage payments or access unless explicitly granted

Required student fields:

- first name
- last name
- birth date
- gender/sex value used for class grouping and filtering
- status: active, inactive, suspended
- email and phone for adult students
- primary guardian for minors

Optional student fields:

- identity document
- student email and phone for minors
- medical notes, allergies, conditions, and observations
- photo

Required guardian/contact fields:

- first name
- last name
- relationship to student
- phone
- email when portal access, payment, or notifications are enabled

Optional guardian/contact fields:

- identity document
- address
- authorization notes

## Venues, Courts, Disciplines, And Class Groups

The academy manages:

- venues
- courts inside venues
- disciplines: basketball and volleyball
- categories
- class groups
- schedules
- coaches
- students

Each venue can have one or more courts.

Each class group belongs to:

- venue
- discipline
- category
- gender mode: male, female, or mixed
- one or more recurring schedules
- one or more assigned coaches

Category can be suggested from student age, but the final effective category is assigned by staff. Birthday changes can create alerts, but students are not moved automatically.

Schedule creation must validate conflicts:

- court conflicts
- coach conflicts

Authorized users can override conflicts, and the conflict must remain visible.

## Enrollments, Pricing, And Scholarships

Monthly charges are generated from active enrollments.

A student can have multiple active enrollments at the same time. Each enrollment can produce its own charge unless a future package rule changes that behavior.

Pricing is configured through reusable price tables, not manually typed every time.

Pricing dimensions:

- venue
- discipline
- category
- class group gender mode
- optionally a specific class group

When a student is enrolled, the system suggests the current price. The enrollment stores the final applied price.

Charges store a historical snapshot:

- base amount
- scholarship or discount applied
- final amount
- reason or notes

Changing a price later must not rewrite previous charges.

Scholarships:

- can be percentage-based or fixed-amount
- can have start and end dates
- can apply to one enrollment or, if needed, all active enrollments for a student
- are registered directly by authorized staff/admin in the MVP
- require audit data: creator, timestamp, amount/percentage, reason, validity, active/revoked status
- 100% scholarship still creates a `S/ 0` charge for reporting history

## Billing And Payments

The MVP does not process online card payments directly.

Payment flow:

- staff generates monthly charges from active enrollments
- adult students and guardians can see pending charges
- adult students and guardians can upload payment receipts
- staff validates receipts and approves or rejects them
- staff can manually register payments made by bank transfer, cash, Yape, Plin, POS, or other methods

Charges:

- are generated monthly
- are reviewable and manually adjustable by staff
- can support full or partial payments
- have states: pending, partial, paid, overdue, void
- have configurable due dates
- do not include automatic late fees in the MVP

Mid-month enrollment handling:

- staff chooses full month, prorated, or waived for the first charge

Debt does not automatically block attendance or match invitations in the MVP. It appears as a warning and can be used as a filter.

## Attendance

Attendance is recorded against explicit class sessions.

Class groups have recurring schedules. The system exposes or generates dated class sessions from those schedules.

Attendance can be recorded by:

- manual checklist
- scanning a student QR code

Coaches and staff can record attendance.

Student QR behavior:

- the QR identifies the student through a token, not readable personal data
- the QR is used inside an active class session context
- the system validates that the student has an active enrollment for that group/session
- if the student does not belong to the session, the system warns the user

Attendance record types:

- regular
- make-up
- guest

Special attendance must record who authorized it. It should be visible separately in reports.

Guardians can view attendance for their children. Adult students can view their own attendance.

## Match Events And Invitations

Extracurricular matches are independent events, not class sessions.

Match events include:

- venue/court or external location
- Google Maps link
- opponent
- date and time
- discipline
- category
- target gender/group context
- description or notes
- invited students

Staff/admin can create, edit, send, and cancel any invitation.

Coaches can create invitations for their assigned groups. Inviting students outside assigned groups requires special permission or staff intervention.

Student selection must support filters such as:

- venue
- class group
- category
- discipline
- gender/sex
- age
- attendance
- payment status

Each invitation has status:

- pending
- confirmed
- declined
- no response

Invitations are sent by email and include a secure token link. Confirmation or decline must work without requiring login, while also being available in the portal.

Tokens expire after the event or when the invitation/event is canceled.

## Calendar

The MVP supports calendar export, not full calendar-provider OAuth integration.

Calendar features:

- downloadable `.ics` files for classes and match events
- optional prefilled Google Calendar links for one-off events
- no automatic external calendar sync
- event updates or cancellations are communicated by email

## Notifications

Email is the automatic notification channel in the MVP.

Email is used for:

- account invitations
- password setup/reset flows
- match invitations
- match updates/cancellations
- payment receipt approval/rejection
- payment reminders

WhatsApp is manual only in the MVP:

- phone numbers are stored
- the UI can provide an "open WhatsApp" action
- no automatic WhatsApp integration is included

## Statistics

The MVP includes operational dashboards and reports.

Attendance statistics:

- by student
- by class group
- by venue
- by discipline
- by category
- by date range
- monthly attendance percentage by student
- low-attendance students

Payment statistics:

- pending payments by month, venue, group, and student
- collected vs pending amount
- receipts pending validation
- overdue charges

Scholarship statistics:

- active scholarships
- total discounted amount

Invitation statistics:

- invited
- confirmed
- declined
- no response

Advanced sports performance metrics are out of MVP scope.

## Security And Authentication

Authentication uses Django as the authority.

The frontend authenticates through secure `httpOnly` cookies with CSRF protection, not JWT tokens in browser local storage.

Production target:

- public app URL: `https://app.dinosauriosacademy.com`
- frontend and backend API exposed under the same site
- API requests use `/api/...` and are proxied to Django

This simplifies cookie, CORS, SameSite, and CSRF configuration without reducing security.

Public action links use scoped signed tokens, not normal user sessions.

Examples:

- match confirmation links
- invitation links
- password setup/reset links

## Repository And Stack

The project uses a monorepo structure:

- `apps/backend`: Django, Django REST Framework, and Celery
- `apps/web`: Next.js, Tailwind CSS, and shadcn/ui
- `docs`: product, domain, architecture, and cost documentation

Development infrastructure is expected to use Docker Compose for PostgreSQL and a Redis-compatible broker.

## Files

Files are private by default.

Files include:

- payment receipts
- student photos
- optional documents

Development can use local filesystem storage.

Production uses private object storage such as S3-compatible storage, Cloudflare R2, DigitalOcean Spaces, AWS S3, or equivalent.

Django stores file metadata and controls access. Receipts and student photos are not public assets.

## Background Jobs

The MVP uses Celery with a Redis-compatible broker/backend.

Background jobs cover:

- sending emails
- generating monthly charges
- marking charges overdue
- sending payment reminders
- generating or exposing upcoming class sessions
- cleaning expired invitation and confirmation tokens

Development can run Redis-compatible infrastructure locally through Docker.

Free tiers can be used for early MVP/staging where limits allow. Reliable production should budget for managed Redis-compatible infrastructure and always-on workers.

## Explicitly Out Of MVP

The MVP excludes:

- online card/payment gateway processing
- automatic WhatsApp messaging
- Google/Microsoft Calendar OAuth sync
- automatic late fees
- public self-registration
- advanced sports performance analytics
- formal scholarship approval workflow
