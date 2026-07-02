# Technical Architecture

## Repository Structure

The project uses a monorepo.

Planned structure:

```text
apps/
  backend/
    Django + Django REST Framework + Celery
  web/
    Next.js + Tailwind CSS + shadcn/ui
docs/
  product-scope.md
  domain-model.md
  production-costs.md
  technical-architecture.md
docker-compose.yml
.env.example
```

Package and dependency management:

- frontend uses `pnpm`
- backend uses Python `requirements` files
- frontend forms use `react-hook-form`
- frontend schema validation uses `zod`
- backend validation always happens through DRF serializers and domain services, even when frontend validation exists

## Backend

Backend stack:

- Django
- Django REST Framework
- PostgreSQL
- Celery
- Redis-compatible broker/backend
- private file storage abstraction

Backend Django apps are split by domain:

- `accounts`: users, roles, permissions, account invitations, authentication support
- `people`: students, guardians, emergency contacts
- `academics`: venues, courts, disciplines, categories, class groups, schedules
- `enrollments`: enrollments, price rules, scholarships
- `billing`: charges, payments, payment allocations, receipts
- `attendance`: class sessions, attendance records, QR attendance flows
- `events`: match events, match invitations, calendar exports
- `files`: private file metadata and access control
- `audit`: audit logs

Authorization uses Django Groups and Permissions as the base, with domain-specific contextual checks.

Rules:

- roles map to Django groups: `admin`, `staff`, `coach`, `guardian`, `student`
- Django permissions cover general CRUD capabilities
- domain checks restrict object access by context
- coaches can access assigned class groups
- guardians can access only linked students
- adult students can access only their own records
- staff access depends on assigned permissions
- conflict overrides and sensitive actions require explicit permissions

The backend owns:

- authentication
- sessions
- CSRF protection
- authorization and permissions
- domain rules
- audit logging
- background jobs
- email sending
- private file access

Django Admin is enabled as a secondary internal tool for admin/support workflows. It is not the main product interface.

Rules for Django Admin:

- restrict access to authorized admin/staff users
- use it for support, data correction, and operational debugging
- do not rely on Django Admin logs as the only audit trail for sensitive domain changes
- sensitive actions still require domain-level audit logging
- consider 2FA for admin access after MVP baseline

## Frontend

Frontend stack:

- Next.js
- Tailwind CSS
- shadcn/ui
- responsive UI
- dark mode by default
- i18n with Spanish and English

Frontend code is organized by domain modules:

- `app`: Next.js App Router routes
- `features/students`
- `features/guardians`
- `features/venues`
- `features/classes`
- `features/enrollments`
- `features/billing`
- `features/attendance`
- `features/events`
- `features/reports`
- `features/settings`
- `components/ui`: shadcn base components
- `components/layout`: app shell, sidebar, topbar, navigation
- `lib/api`: API client and request helpers
- `lib/i18n`: localization setup and translation resources
- `lib/auth`: frontend session and permission helpers

The frontend consumes Django through `/api/...` under the same production site.

User-facing text must come from translation files.

## Production Routing

Production target:

- public app: `https://app.dinosauriosacademy.com`
- API path: `https://app.dinosauriosacademy.com/api/...`

Requests to `/api/...` are proxied to Django.

This keeps authentication simpler and safer by reducing cross-domain cookie, CSRF, and CORS complexity.

## Local Development

Local development should use Docker Compose for infrastructure services:

- PostgreSQL
- Redis-compatible broker

Application services can be run through Docker Compose or directly on the host depending on developer workflow.

Expected local services:

- Django API
- Celery worker
- Celery beat or scheduled command runner
- Next.js frontend

## Configuration

The repository should include `.env.example` with documented variables for:

- Django settings
- database URL
- Redis-compatible broker URL
- email provider
- object storage
- frontend/backend URLs
- CSRF and cookie settings
- default locale
- default timezone
- default currency

Secrets must not be committed.

## Language Convention

Code and technical names use English:

- models
- fields
- endpoints
- components
- functions
- filenames
- commits
- technical documentation

User-facing Spanish and English labels live in translation files.
