import {
  Bot,
  Boxes,
  BrainCircuit,
  CircuitBoard,
  Code2,
  Cpu,
  Database,
  Globe2,
  Layers3,
  MessagesSquare,
  Network,
  RadioTower,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

export const identity = {
  name: "Arpit Tagade",
  location: "Nagpur, Maharashtra, India",
  email: "arpittagade5@gmail.com",
  github: "https://github.com/tagadearpit",
  linkedin: "https://www.linkedin.com/in/tagadearpit",
  resume: "/Arpit-Tagade-Resume.pdf",
  headline: "Full-Stack AI Engineer & Hardware Developer",
  summary:
    "I architect production-oriented systems that connect intelligent software, real-time infrastructure, and physical hardware.",
};

export const navigation = [
  { label: "Origin", href: "#home" },
  { label: "Systems", href: "#systems" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const signals = [
  { value: "03", label: "deployed platforms" },
  { value: "04", label: "engineering layers" },
  { value: "2029", label: "B.Tech completion" },
];

export const capabilityGroups = [
  {
    code: "01",
    title: "Intelligent interfaces",
    description:
      "Fast, accessible web experiences with thoughtful motion, resilient state, and clean interaction boundaries.",
    icon: Sparkles,
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    code: "02",
    title: "Backend systems",
    description:
      "Secure APIs, persistent sessions, realtime delivery, validation, and operational controls designed for production.",
    icon: ServerCog,
    stack: ["Spring Boot", "Node.js", "Express", "REST", "OAuth2/JWT"],
  },
  {
    code: "03",
    title: "Realtime networks",
    description:
      "Low-latency communication systems combining WebSockets, STOMP signaling, WebRTC, and durable persistence.",
    icon: RadioTower,
    stack: ["WebSockets", "WebRTC", "STOMP", "MongoDB", "GridFS"],
  },
  {
    code: "04",
    title: "AI + physical systems",
    description:
      "Cloud intelligence translated into deterministic hardware behavior under timing, voltage, and memory constraints.",
    icon: CircuitBoard,
    stack: ["Gemini API", "ESP32", "Arduino", "Embedded C++", "Sensors"],
  },
];

export const projects = [
  {
    id: "monika",
    index: "01",
    title: "Monika AI",
    subtitle: "Multimodal AI companion platform",
    description:
      "A production-oriented AI companion with persistent conversations, editable memory, streaming Gemini responses, multimodal input, device management, reminders, authentication, quotas, and administrator controls.",
    architecture:
      "Node.js and Express coordinate authentication, conversation state, MongoDB persistence, Firebase services, and a dual-path Gemini workflow for immediate responses and asynchronous memory updates.",
    outcome:
      "Built as an operable platform rather than a single prompt interface, with revocable sessions, rate limits, health probes, validation, and deployment controls.",
    tags: ["Node.js", "Express", "MongoDB", "Gemini 2.5", "Firebase", "JWT"],
    live: "https://monika-ai-0jpf.onrender.com",
    source: "https://github.com/tagadearpit/Monika-AI",
    icon: BrainCircuit,
    tone: "violet",
  },
  {
    id: "neosis",
    index: "02",
    title: "Neosis",
    subtitle: "Realtime communication system",
    description:
      "A full-stack messaging platform with contacts, persistent one-to-one conversations, media sharing, profile controls, secure server sessions, and browser-based audio/video calls.",
    architecture:
      "Spring Boot handles security, REST operations, MongoDB persistence, GridFS media, and STOMP messaging; WebRTC carries peer media while WebSocket signaling coordinates call state.",
    outcome:
      "The transport is deliberately split: realtime signaling and text events use WebSockets, while binary uploads remain on bounded authenticated HTTP endpoints.",
    tags: ["Java 17", "Spring Boot", "React", "WebRTC", "WebSockets", "MongoDB"],
    live: "https://neosis-static-site.onrender.com",
    source: "https://github.com/tagadearpit/Neosis",
    icon: MessagesSquare,
    tone: "cyan",
  },
  {
    id: "candyrobot",
    index: "03",
    title: "CandyRobot",
    subtitle: "AI-connected robotic interface",
    description:
      "An ESP32-based physical interface that combines servo movement, a 128×64 OLED, network communication, and Gemini-powered interaction.",
    architecture:
      "Non-blocking embedded loops reconcile deterministic actuator/display timing with slower, failure-prone external network calls.",
    outcome:
      "The project explores the boundary between probabilistic cloud AI and constrained hardware that must remain responsive and safe.",
    tags: ["ESP32", "C++", "Gemini API", "Servo Control", "OLED", "IoT"],
    live: null,
    source: "https://github.com/tagadearpit",
    icon: Bot,
    tone: "amber",
  },
];

export const stackMatrix = [
  {
    layer: "Frontend",
    icon: Layers3,
    items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    layer: "Backend",
    icon: Workflow,
    items: ["Java", "Spring Boot", "Spring Security", "Node.js", "Express", "REST APIs"],
  },
  {
    layer: "Data",
    icon: Database,
    items: ["MongoDB", "MySQL", "PostgreSQL", "Oracle", "GridFS", "SQL"],
  },
  {
    layer: "Realtime + AI",
    icon: Network,
    items: ["WebSockets", "STOMP", "WebRTC", "Gemini API", "Firebase", "OAuth2/JWT"],
  },
  {
    layer: "Hardware",
    icon: Cpu,
    items: ["ESP32", "Arduino Uno", "Embedded C/C++", "Servo Systems", "OLED", "Sensors"],
  },
  {
    layer: "Delivery",
    icon: Boxes,
    items: ["Git", "GitHub", "Docker", "Render", "Vercel", "CI/CD"],
  },
];

export const engineeringPrinciples = [
  {
    icon: ShieldCheck,
    title: "Security is architecture",
    text: "Authentication, authorization, validation, secret handling, and abuse controls are designed into request flows—not added after the UI is complete.",
  },
  {
    icon: Globe2,
    title: "Operate what you ship",
    text: "Health checks, structured errors, rate limits, graceful degradation, deployment configuration, and failure states are part of the product surface.",
  },
  {
    icon: Code2,
    title: "Boundaries before features",
    text: "Clear ownership between client, API, realtime channels, persistence, and hardware prevents accidental coupling and makes systems easier to evolve.",
  },
];

export const assistantKnowledge = `
Arpit Tagade is a Full-Stack AI Engineer and hardware developer based in Nagpur, India, pursuing a B.Tech in Artificial Intelligence and Data Science with expected completion in 2029 at Wainganga College of Engineering and Management.
He works across Java, C, C++, JavaScript, TypeScript, SQL, Next.js, React, Spring Boot, Spring Security, Node.js, Express, MongoDB, MySQL, PostgreSQL, Oracle, WebSockets, WebRTC, OAuth2/JWT, Gemini, Firebase, ESP32, Arduino, GitHub, Render and Vercel.
Projects:
1. Monika AI: Node.js, Express, MongoDB, Gemini 2.5, Firebase, JWT. Live at https://monika-ai-0jpf.onrender.com. It includes persistent conversations, editable memory, streaming responses, multimodal input, device sessions, reminders and production controls.
2. Neosis: Spring Boot, React, WebRTC, STOMP/WebSockets, MongoDB and OAuth2. Live at https://neosis-static-site.onrender.com. It includes persistent messaging, contacts, media sharing, profile settings, server sessions and audio/video calls.
3. CandyRobot: ESP32 and C++ hardware project integrating servo motors, a 128x64 OLED and the Gemini API.
Contact Arpit at arpittagade5@gmail.com, GitHub https://github.com/tagadearpit, LinkedIn https://www.linkedin.com/in/tagadearpit.
`;
