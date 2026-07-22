# Validation Report

Validated on 2026-07-23.

## Automated checks

```text
npm ci                              PASS
npm run lint                        PASS
npm run typecheck                   PASS
npm run build                       PASS
npm audit --omit=dev                PASS — 0 vulnerabilities
PostCSS syntax parse                PASS
git diff --check                    PASS
```

The production build completed with Next.js 16.2.11 and generated the expected routes:

```text
/                         Static
/api/chat                 Dynamic Node.js route
/manifest.webmanifest     Static metadata route
/robots.txt               Static metadata route
/sitemap.xml              Static metadata route
```

## Runtime checks

```text
GET /                                  200
GET /Arpit-Tagade-Resume.pdf           200 (55,303 bytes)
GET /manifest.webmanifest              200
POST /api/chat                         200 (deterministic local mode)
POST /api/chat with malformed JSON     400
13th assistant request in 60 seconds   429 with Retry-After: 60
```

The rendered metadata, canonical URL, robots file, sitemap, and JSON-LD resolve to `https://tagadearpit.vercel.app`. Assistant responses are explicitly marked `Cache-Control: no-store`, and the expected cross-origin, transport-security, and content-type headers are present.

## Interaction and visual-system changes

- Replaced eager Framer Motion components with `LazyMotion` and the smaller DOM animation feature set.
- Added coordinated hero, section, statistics, card, and contact reveals.
- Added spring-based header state, active-navigation motion, and fine-pointer depth interactions.
- Added layered glass surfaces with solid-color fallbacks when backdrop filters are unsupported.
- Disabled expensive transparency and headline effects on smaller or coarse-pointer devices.
- Preserved `prefers-reduced-motion` and added `prefers-reduced-transparency` handling.
- Added Escape handling, focus containment, focus return, and scroll locking for both modal surfaces.

## Dependency and operational notes

- Next.js and its ESLint configuration are pinned to 16.2.11.
- Sharp is overridden to 0.35.3 to remove the audited libvips vulnerability affecting the previous transitive version.
- The validation runner uses Node.js 24 while the project, CI, and Vercel configuration target Node.js 22.x; the engine warning is expected and the Node 22 target remains intentional.
- The assistant rate limiter is process-local. A shared Redis or Upstash limiter is still required if the portfolio is scaled across multiple long-lived instances or needs globally consistent abuse controls.
