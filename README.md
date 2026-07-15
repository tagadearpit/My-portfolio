# Arpit Tagade — Clean Futuristic Portfolio

A production-ready engineering portfolio built with **Next.js, React, TypeScript, and Framer Motion**.

The interface is intentionally cleaner than the previous version: larger typography, stronger spacing, fewer decorative distractions, clearer project storytelling, and lighter motion.

## Live portfolio

- Portfolio: [my-portfolio-snowy-sigma-18.vercel.app](https://my-portfolio-snowy-sigma-18.vercel.app)
- GitHub: [github.com/tagadearpit](https://github.com/tagadearpit)
- LinkedIn: [linkedin.com/in/tagadearpit](https://www.linkedin.com/in/tagadearpit)

## What is included

- Large, responsive hero typography
- Clean glass navigation with active-section tracking
- Futuristic software-to-hardware system map
- Custom CSS project previews for Monika AI, Neosis, and CandyRobot
- Direct live-project and GitHub links
- Expertise, stack, education, and engineering-principle sections
- Downloadable resume at `public/Arpit-Tagade-Resume.pdf`
- Responsive mobile menu
- Reduced-motion support
- Optional Gemini portfolio assistant
- Deterministic local assistant fallback when no API key is configured
- SEO metadata, sitemap, robots, web manifest, Open Graph image, and JSON-LD
- Security response headers
- GitHub Actions validation workflow

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router |
| UI | React 19 + TypeScript |
| Motion | Framer Motion |
| Icons | Lucide React |
| Styling | Custom responsive CSS |
| Optional AI | Gemini REST API |
| Hosting | Vercel |

## Local development

Requirements:

- Node.js 22.x
- npm 10.x

Install and run:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

Validate before pushing:

```bash
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev
```

## Environment variables

Create `.env.local` only when needed:

```env
NEXT_PUBLIC_SITE_URL=https://my-portfolio-snowy-sigma-18.vercel.app
GEMINI_API_KEY=your_server_side_key
GEMINI_MODEL=gemini-2.5-flash
```

The AI assistant still answers verified portfolio questions without `GEMINI_API_KEY`.

Never expose the Gemini key through a `NEXT_PUBLIC_` variable.

## Vercel deployment

Use these settings:

| Setting | Value |
|---|---|
| Framework Preset | Next.js |
| Root Directory | `./` |
| Node.js Version | `22.x` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | Leave empty |

After replacing the old project files:

```bash
git add .
git commit -m "Redesign portfolio with clean futuristic interface"
git push origin main
```

If Vercel shows an old version, redeploy once without the existing build cache.

## Project structure

```text
.
├── app/
│   ├── api/chat/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── manifest.ts
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── AIAssistant.tsx
│   ├── PortfolioShell.tsx
│   └── ProjectCard.tsx
├── data/portfolio.ts
├── public/
│   ├── Arpit-Tagade-Resume.pdf
│   ├── favicon.svg
│   └── og-card.svg
├── .github/workflows/ci.yml
├── .env.example
├── .npmrc
├── next.config.ts
└── package.json
```

## Production notes

- The assistant rate limiter is process-local. Replace it with a shared Redis/Upstash limiter for sustained multi-instance traffic.
- The assistant is restricted to portfolio facts and falls back to deterministic answers if Gemini is unavailable.
- Contact actions use the visitor's email client; no personal submissions are stored by the site.
- The resume is intentionally public and contains the contact details present in the uploaded resume.
- Motion is reduced automatically when the browser reports `prefers-reduced-motion`.

## License

MIT © 2026 Arpit Tagade
