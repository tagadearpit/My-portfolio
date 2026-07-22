import { NextRequest, NextResponse } from "next/server";
import { assistantKnowledge } from "@/data/portfolio";

export const runtime = "nodejs";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 12;
const requestWindows = new Map<string, { count: number; resetAt: number }>();
const noStoreHeaders = { "Cache-Control": "no-store, max-age=0" };

function getClientKey(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

function isRateLimited(key: string) {
  const now = Date.now();

  if (requestWindows.size > 1_000) {
    for (const [storedKey, window] of requestWindows) {
      if (window.resetAt <= now) requestWindows.delete(storedKey);
    }
    while (requestWindows.size > 1_000) {
      const oldestKey = requestWindows.keys().next().value as string | undefined;
      if (!oldestKey) break;
      requestWindows.delete(oldestKey);
    }
  }

  const current = requestWindows.get(key);

  if (!current || current.resetAt <= now) {
    requestWindows.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  requestWindows.set(key, current);
  return current.count > MAX_REQUESTS;
}

function localAnswer(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("neosis")) {
    return "Neosis is Arpit’s realtime messaging platform built with Spring Boot, React, MongoDB, STOMP/WebSockets, and WebRTC. It includes persistent conversations, contacts, media sharing, account controls, secure server sessions, and browser audio/video calls. Live: https://neosis-static-site.onrender.com";
  }

  if (normalized.includes("monika")) {
    return "Monika AI is a full-stack AI companion built with Node.js, Express, MongoDB, Gemini 2.5, Firebase, and JWT-based authentication. It includes persistent conversations, editable memory, multimodal input, streaming responses, device controls, reminders, quotas, and admin tooling. Live: https://monika-ai-0jpf.onrender.com";
  }

  if (normalized.includes("candy") || normalized.includes("robot") || normalized.includes("hardware") || normalized.includes("esp32")) {
    return "CandyRobot is Arpit’s ESP32 and C++ hardware project combining servo control, a 128×64 OLED, network communication, and Gemini-powered interaction. Its core challenge is keeping hardware responsive while external AI calls remain slow and failure-prone.";
  }

  if (normalized.includes("contact") || normalized.includes("email") || normalized.includes("hire") || normalized.includes("reach")) {
    return "You can contact Arpit at arpittagade5@gmail.com, connect on LinkedIn at https://www.linkedin.com/in/tagadearpit, or review his GitHub work at https://github.com/tagadearpit.";
  }

  if (normalized.includes("education") || normalized.includes("college") || normalized.includes("degree")) {
    return "Arpit is pursuing a B.Tech in Artificial Intelligence and Data Science at Wainganga College of Engineering and Management in Nagpur, with expected completion in 2029.";
  }

  if (normalized.includes("skill") || normalized.includes("stack") || normalized.includes("technology") || normalized.includes("build")) {
    return "Arpit works across Java, Spring Boot, Spring Security, Node.js, Express, Next.js, React, TypeScript, MongoDB, SQL databases, WebSockets, WebRTC, Gemini, Firebase, ESP32, Arduino, Docker, Render, and Vercel. His focus is production-oriented systems connecting AI, realtime software, and physical hardware.";
  }

  if (normalized.includes("resume") || normalized.includes("cv")) {
    return "Arpit’s current resume is available from the Download Resume button in the hero and About sections of this portfolio.";
  }

  return "Arpit is a Full-Stack AI Engineer and hardware developer based in Nagpur, India. His work spans secure backend systems, realtime communication, intelligent web interfaces, Gemini-powered applications, and ESP32 hardware. Ask me about Monika AI, Neosis, CandyRobot, his stack, education, or contact details.";
}

async function geminiAnswer(message: string, apiKey: string) {
  const model = process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(12_000),
    body: JSON.stringify({
      systemInstruction: {
        parts: [
          {
            text: `You are the portfolio assistant for Arpit Tagade. Answer only from the supplied portfolio context. Be concise, factual, and professional. Do not invent employment history, metrics, clients, certifications, or project claims. When relevant, include the exact live or contact link from the context.\n\nPORTFOLIO CONTEXT:\n${assistantKnowledge}`,
          },
        ],
      },
      contents: [{ role: "user", parts: [{ text: message }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 260,
      },
    }),
  });

  if (!response.ok) throw new Error(`Gemini returned ${response.status}`);
  const payload = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text = payload.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim();
  if (!text) throw new Error("Gemini returned an empty response");
  return text;
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      { error: "Request limit reached. Please wait a minute before asking again." },
      { status: 429, headers: { ...noStoreHeaders, "Retry-After": "60" } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request." }, { status: 400, headers: noStoreHeaders });
  }

  const message =
    typeof payload === "object" && payload !== null && "message" in payload
      ? String((payload as { message: unknown }).message).trim()
      : "";

  if (!message || message.length > 500) {
    return NextResponse.json(
      { error: "Message must contain between 1 and 500 characters." },
      { status: 400, headers: noStoreHeaders },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ response: localAnswer(message), mode: "local" }, { headers: noStoreHeaders });
  }

  try {
    const response = await geminiAnswer(message, apiKey);
    return NextResponse.json({ response, mode: "gemini" }, { headers: noStoreHeaders });
  } catch (error) {
    console.error("Portfolio assistant fallback:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { response: localAnswer(message), mode: "fallback" },
      { headers: noStoreHeaders },
    );
  }
}
