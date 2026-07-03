# Local Development

This project uses a monorepo with a Django API, Celery worker, Next.js web app, PostgreSQL, and a Redis-compatible broker.

## Prerequisites

- Node.js 20.9 or newer.
- pnpm 10.
- Python 3.11 or newer.
- Docker with Compose for PostgreSQL and Redis-compatible local services.

On Windows PowerShell, prefer `pnpm.cmd` because local script execution policies can block `pnpm.ps1`.

## First Setup

Create the Python virtual environment:

```powershell
python -m venv .venv
```

Install backend dependencies:

```powershell
.venv\Scripts\python.exe -m pip install -r apps/backend/requirements-dev.txt
```

Install frontend dependencies:

```powershell
pnpm.cmd install
```

Copy `.env.example` to `.env` and adjust secrets before running application services.

## Infrastructure

Start PostgreSQL and Redis-compatible broker:

```powershell
docker compose up -d postgres redis
```

Stop local infrastructure:

```powershell
docker compose down
```

## Backend

Run Django:

```powershell
pnpm.cmd --filter backend dev
```

The backend healthcheck is available at:

```text
http://localhost:8000/api/health/
```

## Worker

Run the Celery worker:

```powershell
pnpm.cmd --filter backend celery
```

The worker uses `CELERY_BROKER_URL` and `CELERY_RESULT_BACKEND` from `.env`.

## Frontend

Run Next.js:

```powershell
pnpm.cmd --filter web dev
```

The frontend runs at:

```text
http://localhost:3000
```

## Verification

Run all tests:

```powershell
pnpm.cmd test
```

Run type checks:

```powershell
pnpm.cmd typecheck
```

Run lint checks:

```powershell
pnpm.cmd lint
```
