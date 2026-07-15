# ⚡ Arpit Tagade — Futuristic Engineering Portfolio

A production-oriented portfolio for **Arpit Tagade**, built from scratch with Next.js, React, TypeScript, Framer Motion, and a lightweight portfolio assistant.

## 🌐 Live site

- Portfolio: [tagadearpit.vercel.app](https://tagadearpit.vercel.app)
- GitHub: [github.com/tagadearpit](https://github.com/tagadearpit)
- LinkedIn: [linkedin.com/in/tagadearpit](https://www.linkedin.com/in/tagadearpit)

## ✨ Included

- Futuristic responsive interface with three persistent signal themes
- Accessible first-visit boot sequence with skip and reduced-motion handling
- Interactive project case studies for Monika AI, Neosis, and CandyRobot
- Technical capability and stack matrices
- Resume view/download support
- SEO metadata, Open Graph artwork, sitemap, robots, manifest, and JSON-LD
- Optional Gemini-powered portfolio assistant
- Deterministic local assistant fallback when no API key is configured
- Basic request validation and best-effort in-memory rate limiting for chat
- Security response headers
- GitHub Actions validation workflow

## 🧱 Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router |
| UI | React 19 + TypeScript |
| Motion | Framer Motion |
| Icons | Lucide React |
| Styling | Custom responsive CSS |
| Optional AI | Gemini REST API |
| Hosting | Vercel |

## 🚀 Local development

### Requirements

- Node.js 22+
- npm 10+

### Install and run

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

### Validate the production build

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## 🤖 Optional Gemini assistant

The portfolio works without Gemini. Without an API key, `/api/chat` returns deterministic answers from a verified local project knowledge base.

To enable Gemini, create `.env.local`:

```env
GEMINI_API_KEY=your_server_side_api_key
GEMINI_MODEL=gemini-2.5-flash
```

Never expose the key through a `NEXT_PUBLIC_` variable and never commit `.env.local`.

## ☁️ Vercel deployment

1. Push this repository to GitHub.
2. Open Vercel and choose **Add New → Project**.
3. Import the GitHub repository.
4. Framework preset: **Next.js**.
5. Root directory: repository root (`.`).
6. Build command: leave the detected `next build` command.
7. Output directory: leave the Next.js default.
8. Add `GEMINI_API_KEY` and `GEMINI_MODEL` only when enabling the AI endpoint.
9. Deploy.

To use the existing custom domain, attach `tagadearpit.vercel.app` or update the metadata base in `app/layout.tsx`, `app/robots.ts`, and `app/sitemap.ts` if the final domain changes.

## 📁 Structure

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
│   ├── BootSequence.tsx
│   ├── PortfolioShell.tsx
│   └── ProjectCard.tsx
├── data/portfolio.ts
├── public/
│   ├── Arpit-Tagade-Resume.pdf
│   ├── favicon.svg
│   └── og-card.svg
├── .github/workflows/ci.yml
├── .env.example
├── next.config.ts
└── package.json
```

## 🔐 Production notes

- The assistant rate limiter is process-local. For sustained public traffic or multi-instance deployment, replace it with Redis/Upstash or another shared rate limiter.
- The assistant is intentionally scoped to portfolio facts and uses low-temperature generation to reduce invention.
- No contact form backend is included. Contact actions open the visitor’s email client, avoiding hidden storage of submitted personal data.
- The resume contains personal contact information because it is intentionally published as a downloadable document.
- Animations automatically reduce under `prefers-reduced-motion` and pointer-heavy effects are disabled on coarse input devices.

## 📜 License

MIT © 2026 Arpit Tagade
