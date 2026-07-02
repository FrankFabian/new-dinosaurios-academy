# Production Cost Considerations

This document lists infrastructure areas that can be free during development or early MVP usage, but may require paid plans for reliable production.

Prices and free-tier limits change over time. Treat the values below as planning guidance, not a contract.

## Summary

The application can be developed mostly with free local tooling:

- Django and Django REST Framework
- Next.js, Tailwind CSS, and shadcn/ui
- PostgreSQL in Docker
- Redis-compatible broker in Docker
- Celery workers locally
- local filesystem for development uploads

Reliable production can introduce costs in these areas:

- hosting for the Django backend
- hosting for the Next frontend
- PostgreSQL database
- Redis-compatible broker/backend for Celery
- always-on Celery workers
- object storage for private files
- email delivery provider
- domain and DNS
- monitoring, logging, backups, and error tracking
- optional CDN/WAF/security services

## Celery And Redis-Compatible Broker

Celery itself is open source and does not require a license fee.

The broker/backend can run on Redis-compatible infrastructure such as Redis or Valkey.

Development:

- free with Docker

Early MVP/staging:

- possible with a free managed tier if limits are enough

Production:

- may require a paid managed Redis-compatible service for persistence, uptime, monitoring, and reliability
- may also require a paid always-on worker process depending on the hosting provider

Notes:

- Upstash Redis has a free tier with limits such as 256 MB and monthly command limits at the time of writing.
- Render offers free compute and free Redis-compatible/Key Value options with limits at the time of writing.
- Valkey is an open source Redis-compatible option that can be self-hosted.

Decision:

- use Celery with a Redis-compatible broker
- use free/local infrastructure for development
- allow free tier for MVP/staging
- document that reliable production may require paid infrastructure

## Backend Hosting

Django needs a production server.

Potential cost drivers:

- always-on compute
- RAM/CPU
- background worker process
- private networking
- autoscaling
- logs and retention

Free tiers may sleep, throttle, or have low resource limits. That can be acceptable for demos, but not for a production academy workflow.

## Frontend Hosting

Next.js can be hosted on platforms such as Vercel, Netlify, Render, or a VPS.

Potential cost drivers:

- bandwidth
- build minutes
- server-side rendering needs
- image optimization
- team/project features
- custom domain and preview environments

The target production architecture exposes the frontend and backend API under the same site, with `/api/...` proxied to Django.

## PostgreSQL

PostgreSQL can run free locally through Docker.

Production cost drivers:

- managed database instance
- storage
- backups
- point-in-time recovery
- high availability
- connection limits
- monitoring

Free production database tiers often have storage, availability, and retention limits. Payment and attendance records should eventually use a reliable managed database with backups.

## Object Storage

Private files include:

- payment receipts
- student photos
- optional documents

Development can use the local filesystem.

Production should use private object storage.

Cost drivers:

- stored GB
- download bandwidth
- request count
- private signed URLs
- backups/lifecycle policies

Options include:

- Cloudflare R2
- AWS S3
- DigitalOcean Spaces
- other S3-compatible providers

## Email Delivery

The MVP uses email for automatic notifications.

Email cost drivers:

- monthly email volume
- dedicated IP needs
- domain authentication
- analytics and logs
- higher deliverability requirements

Typical providers include:

- Resend
- Postmark
- SendGrid
- Amazon SES

Development can use console email or a local mail catcher. Production needs a real email provider and configured SPF, DKIM, and DMARC.

## Domain, HTTPS, And DNS

Production target:

- `https://app.dinosauriosacademy.com`
- `/api/...` proxied to Django

Cost drivers:

- domain registration if not already owned
- DNS provider if premium features are needed
- managed certificates are often free through hosting providers or Let's Encrypt

## Monitoring, Logs, And Backups

These can be free or limited at small scale, but should be planned as production costs.

Areas:

- application logs
- worker logs
- error tracking
- uptime monitoring
- database backups
- object storage backup/lifecycle rules
- audit log retention

Low-cost or free starting points are acceptable for MVP, but production should avoid relying only on ephemeral platform logs.

## Optional Future Costs

Out-of-MVP features that can add cost:

- online payment gateway fees
- automatic WhatsApp messaging
- SMS notifications
- Google/Microsoft Calendar OAuth app verification or higher API usage
- advanced analytics
- WAF, bot protection, or enterprise security features
- high availability database and Redis-compatible services

## Cost-Sensitive MVP Recommendation

Start with:

- local Docker services for development
- managed free tiers for staging where reliable enough
- a simple deployment with one web service, one worker, PostgreSQL, Redis-compatible broker, object storage, and email provider

Before real production launch, confirm monthly budget for:

- backend compute
- worker compute
- PostgreSQL
- Redis-compatible broker
- private object storage
- email provider
- monitoring/log retention

## References

- Celery documentation: https://docs.celeryq.dev/en/stable/
- Upstash Redis pricing: https://upstash.com/pricing/redis
- Render pricing: https://render.com/pricing
- Valkey project: https://valkey.io/
