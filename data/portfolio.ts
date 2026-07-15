import {
  Bot,
  BrainCircuit,
  CircuitBoard,
  Code2,
  Cpu,
  Database,
  Globe2,
  Layers3,
  MessagesSquare,
  Network,
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
    "I design and ship production-focused software where intelligent interfaces, secure backends, realtime infrastructure, and physical hardware work as one system.",
};

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Expertise", href: "#expertise" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const signals = [
  { value: "03", label: "Flagship systems" },
  { value: "04", label: "Engineering layers" },
  { value: "2029", label: "B.Tech completion" },
];

export const capabilityGroups = [
  {
    code: "01",
    title: "Product interfaces",
    description:
      "Responsive web experiences with clear information hierarchy, resilient state, accessible motion, and performance-conscious interaction design.",
    icon: Sparkles,
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    code: "02",
    title: "Backend platforms",
    description:
      "Secure APIs, authentication, persistent sessions, validation, rate controls, and operational endpoints built for real deployment conditions.",
    icon: ServerCog,
    stack: ["Spring Boot", "Node.js", "Express", "REST", "OAuth2 / JWT"],
  },
  {
    code: "03",
    title: "Realtime systems",
    description:
      "Low-latency messaging and calling architectures using WebSockets, STOMP, WebRTC, bounded media transport, and durable persistence.",
    icon: Network,
    stack: ["WebSockets", "WebRTC", "STOMP", "MongoDB", "GridFS"],
  },
  {
    code: "04",
    title: "AI + hardware",
    description:
      "Cloud intelligence translated into deterministic device behavior under latency, timing, memory, voltage, and connectivity constraints.",
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
      "A production-oriented AI companion with persistent conversations, editable memory, multimodal input, device sessions, reminders, quotas, and administrator controls.",
    architecture:
      "Node.js and Express coordinate authentication, MongoDB-backed conversation state, Firebase services, and a dual-path Gemini workflow for immediate responses and asynchronous memory updates.",
    outcome:
      "The platform is designed as an operable product rather than a single prompt screen, with revocable sessions, abuse controls, health probes, validation, and deployment configuration.",
    highlights: ["Persistent AI memory", "Multimodal interaction", "Revocable user sessions"],
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
    subtitle: "Secure realtime communication platform",
    description:
      "A full-stack messaging application with contacts, persistent conversations, media sharing, profile controls, server-backed preferences, and browser audio/video calls.",
    architecture:
      "Spring Boot owns security, REST operations, MongoDB persistence, GridFS media, and STOMP messaging. WebRTC carries peer media while WebSocket signaling coordinates call state.",
    outcome:
      "Realtime text and signaling stay on WebSockets while binary uploads remain on bounded authenticated HTTP endpoints, reducing transport coupling and buffer pressure.",
    highlights: ["Persistent realtime chat", "WebRTC audio/video", "Production security controls"],
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
      "An ESP32-based physical interface combining servo movement, a 128×64 OLED, network communication, and Gemini-powered interaction.",
    architecture:
      "Non-blocking embedded loops reconcile deterministic actuator and display timing with slower, failure-prone external network calls.",
    outcome:
      "The project explores the boundary between probabilistic cloud AI and constrained hardware that must remain responsive, observable, and safe.",
    highlights: ["ESP32 firmware", "Servo + OLED control", "Cloud AI integration"],
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
    icon: Globe2,
    items: ["WebSockets", "STOMP", "WebRTC", "Gemini API", "Firebase", "OAuth2 / JWT"],
  },
  {
    layer: "Hardware",
    icon: Cpu,
    items: ["ESP32", "Arduino Uno", "Embedded C/C++", "Servo Systems", "OLED", "Sensors"],
  },
];

export const engineeringPrinciples = [
  {
    icon: ShieldCheck,
    title: "Security is part of the design",
    text: "Identity, authorization, validation, secret handling, and abuse controls are planned as request-flow concerns—not added after the interface is complete.",
  },
  {
    icon: Code2,
    title: "Boundaries before features",
    text: "Clear ownership between client, API, realtime transport, persistence, AI, and hardware keeps systems maintainable as they evolve.",
  },
  {
    icon: Workflow,
    title: "Operate what you ship",
    text: "Health checks, failure states, rate limits, logs, graceful degradation, deployment configuration, and recovery paths are part of the product surface.",
  },
];

export const assistantKnowledge = `
Arpit Tagade is a Full-Stack AI Engineer and hardware developer based in Nagpur, India. He is pursuing a B.Tech in Artificial Intelligence and Data Science at Wainganga College of Engineering and Management, with expected completion in 2029.
He works across Java, C, C++, JavaScript, TypeScript, SQL, Next.js, React, Spring Boot, Spring Security, Node.js, Express, MongoDB, MySQL, PostgreSQL, Oracle, WebSockets, WebRTC, OAuth2/JWT, Gemini, Firebase, ESP32, Arduino, GitHub, Render and Vercel.
Projects:
1. Monika AI: a Node.js, Express, MongoDB, Gemini 2.5, Firebase and JWT platform. Live at https://monika-ai-0jpf.onrender.com. It includes persistent conversations, editable memory, multimodal input, device sessions, reminders, quotas and production controls.
2. Neosis: a Spring Boot, React, WebRTC, STOMP/WebSockets, MongoDB and OAuth2 system. Live at https://neosis-static-site.onrender.com. It includes persistent messaging, contacts, media sharing, profile settings, server-backed preferences and audio/video calls.
3. CandyRobot: an ESP32 and C++ hardware project integrating servo motors, a 128x64 OLED and the Gemini API.
Contact Arpit at arpittagade5@gmail.com, GitHub https://github.com/tagadearpit, LinkedIn https://www.linkedin.com/in/tagadearpit.
`;
