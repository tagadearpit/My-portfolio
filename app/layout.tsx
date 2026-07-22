import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { siteUrl } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arpit Tagade — Full-Stack AI Engineer",
    template: "%s | Arpit Tagade",
  },
  description:
    "Portfolio of Arpit Tagade, a Full-Stack AI Engineer and hardware developer building production web systems, realtime platforms, Gemini-powered applications, and ESP32 hardware.",
  keywords: [
    "Arpit Tagade",
    "Full-Stack AI Engineer",
    "Spring Boot Developer",
    "Next.js Developer",
    "Realtime Systems",
    "WebRTC",
    "ESP32",
    "Nagpur Developer",
  ],
  authors: [{ name: "Arpit Tagade", url: "https://github.com/tagadearpit" }],
  creator: "Arpit Tagade",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Arpit Tagade — Full-Stack AI Engineer",
    description: "Production systems across AI, realtime software, and physical hardware.",
    siteName: "Arpit Tagade Portfolio",
    images: [{ url: "/og-card.svg", width: 1200, height: 630, alt: "Arpit Tagade engineering portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arpit Tagade — Full-Stack AI Engineer",
    description: "Production systems across AI, realtime software, and physical hardware.",
    images: ["/og-card.svg"],
  },
  icons: { icon: "/favicon.svg" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#05070c",
  colorScheme: "dark",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arpit Tagade",
  url: siteUrl,
  email: "mailto:arpittagade5@gmail.com",
  jobTitle: "Full-Stack AI Engineer & Hardware Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nagpur",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/tagadearpit",
    "https://www.linkedin.com/in/tagadearpit",
  ],
  knowsAbout: [
    "Spring Boot",
    "Next.js",
    "Node.js",
    "WebSockets",
    "WebRTC",
    "MongoDB",
    "Generative AI",
    "ESP32",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#home">Skip to content</a>
        {children}
        <Script
          id="portfolio-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
