# Validation Report

Validated on 15 July 2026 with Node.js 22.16.0 and npm 10.9.2.

## Passed

- `npm install`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm audit --omit=dev --audit-level=high` — 0 vulnerabilities after pinning the patched PostCSS transitive dependency
- Production server root request — HTTP 200
- Security response headers present
- `/api/chat` local fallback — HTTP 200 with a grounded Neosis response
- Resume asset — HTTP 200 with `application/pdf`
- Next.js static generation for the home page, manifest, robots file, and sitemap

## Runtime architecture

- `/` is statically generated.
- `/api/chat` is a dynamic server route.
- The main portfolio does not require environment variables.
- `GEMINI_API_KEY` is optional and server-side only.

## Deployment constraint

Deploy this repository as a Next.js application, not as a purely static export, because the optional assistant uses `/api/chat`.
