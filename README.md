# ⚡ ARPIT TAGADE | Intelligent Developer Portfolio

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

> A high-performance, interactive portfolio bridging the gap between robust software architecture and cloud-based Generative AI.

**🌐 Live Deployment:** [tagadearpit.vercel.app](https://tagadearpit.vercel.app)

---

## 🏛️ System Architecture & Features

This portfolio is not just a static site; it is a demonstration of modern web engineering principles, designed for absolute maximum performance and interactivity.

* **Next.js App Router:** Built on the latest Next.js architecture for optimal Server-Side Rendering (SSR) and seamless client-side hydration.
* **Integrated AI Assistant:** Features a bespoke, real-time AI chat interface powered directly by Google's `gemini-2.5-flash` model via custom API routes. 
* **Hardware-Accelerated Animation:** Utilizes Framer Motion for deep, complex animations including parallax background grids, dynamic scroll progress, and precise cursor-tracking spotlights.
* **Aggressive 'Tech-Noir' UI:** Engineered with Tailwind CSS to deliver a premium, dark-mode exclusive aesthetic favored by top-tier technical agencies.
* **Custom Cursor Integration:** Overrides standard browser defaults with a magnetic, fluid custom cursor component.

---

## 🚀 Quick Start (Local Development)

To run this project locally and interact with the AI API, follow these steps:

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/tagadearpit/my-portiofoli.git
cd my-portiofoli/arpit-portfolio
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Environment Variables
Create a `.env.local` file in the root directory and add your Google Gemini API key:
\`\`\`env
GEMINI_API_KEY=your_actual_api_key_here
\`\`\`

### 4. Ignite the Server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🛠️ The Technical Arsenal

A comprehensive breakdown of the core technologies driving this application:

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | Next.js 15+ / React 19 | Server/Client rendering, routing, UI components |
| **Styling** | Tailwind CSS v4 | Rapid, utility-first UI construction |
| **Animation Engine**| Framer Motion | High-performance spring physics & scroll tracking |
| **Intelligence** | Google Generative AI SDK | Powers the custom AI assistant (`gemini-2.5-flash`) |
| **Deployment** | Vercel | Edge network delivery & CI/CD pipeline |
| **Typography** | Geist Sans & Mono | Optimized font loading via `next/font/google` |

---

## 📂 Project Structure

\`\`\`text
arpit-portfolio/
├── app/
│   ├── api/chat/route.ts   # Backend API handling the Gemini AI requests
│   ├── globals.css         # Global Tailwind directives & custom CSS
│   ├── layout.tsx          # Root layout structure & custom cursor injection
│   └── page.tsx            # Main UI, Hero, Skills, Projects, and Chat Widget
├── public/                 # Static assets (including Resume.pdf)
└── ...                     # Standard Next.js configuration files
\`\`\`

---

## 📡 Let's Connect

Architecting systems and pushing boundaries.

* **LinkedIn:** [www.linkedin.com/in/tagadearpit](https://www.linkedin.com/in/tagadearpit)
* **Email:** [arpittagade5@gmail.com](mailto:arpittagade5@gmail.com)

<br/>

*Designed and Engineered by Arpit Tagade | © 2026*