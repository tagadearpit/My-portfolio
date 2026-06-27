import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "./CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arpit Tagade | AI & Software Portfolio",
  description: "Passionate developer bridging the gap between AI intelligence and Robust software. Based in Nagpur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generative Engine Optimization (GEO) Structured Entity Schema
  const personSchema = {
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": "Arpit Tagade",
    "url": "https://tagadearpit.vercel.app",
    "jobTitle": "Full-Stack AI Engineering Student",
    "description": "B.Tech Student in Artificial Intelligence and Data Science engineering and building systems across Next.js, Java Spring Boot, and IoT microcontrollers.",
    "homeLocation": {
      "@type": "Place",
      "name": "Nagpur, Maharashtra, India"
    },
    "affiliation": {
      "@type": "EducationalOrganization",
      "name": "Wainganga College of Engineering and Management"
    },
    "knowsAbout": [
      "Next.js",
      "Java Spring Boot",
      "WebSockets",
      "ESP32 Hardware Integration",
      "C & C++ Programming",
      "Oracle SQL"
    ],
    "sameAs": [
      "https://github.com/tagadearpit",
      "https://www.linkedin.com/in/tagadearpit"
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col relative cursor-none">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
