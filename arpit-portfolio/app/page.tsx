"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Code2, Database, Layout, Cpu, Server, FileText, CheckCircle, ExternalLink } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// --- Subcomponent for the Spotlight Hover Effect ---
const SkillCard = ({ skill, i, fadeUp }: { skill: any, i: number, fadeUp: any }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative group bg-neutral-900/40 border border-neutral-800 p-8 rounded-2xl overflow-hidden transition-all duration-300 cursor-none"
    >
      {/* Dynamic Spotlight Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.08), transparent 40%)` }}
      />
      
      <div className="relative z-10 flex justify-between items-start mb-8">
        <skill.icon className="text-neutral-500 group-hover:text-white transition-colors duration-300" size={32} />
        <span className="text-neutral-600 font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
      </div>
      <p className="relative z-10 text-neutral-500 text-xs font-semibold tracking-widest uppercase mb-2">{skill.cat}</p>
      <h3 className="relative z-10 text-xl font-medium">{skill.title}</h3>
    </motion.div>
  );
};

export default function Portfolio() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "ai" | "user"; text: string }[]>([
    { role: "ai", text: "Hi! I'm Arpit's AI Assistant. Ask me anything about his skills, education, or projects!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll Progress and Parallax setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.response || "Sorry, I encountered an error." }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", text: "Connection failed. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-neutral-800 font-sans pb-12 overflow-hidden relative">
      
      {/* Top Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-white origin-left z-[100]" style={{ scaleX }} />

      {/* Parallax Subtle High-Tech Grid Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 h-[150%] w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"
      >
        <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center py-6 border-b border-neutral-900 sticky top-0 bg-black/80 backdrop-blur-md z-50"
        >
          <div className="font-bold tracking-widest text-sm uppercase">Arpit Tagade</div>
          <div className="hidden md:flex gap-6 text-xs font-semibold tracking-widest text-neutral-400">
            <a href="#home" className="hover:text-white cursor-none transition-colors">Home</a>
            <a href="#expertise" className="hover:text-white cursor-none transition-colors">Expertise</a>
            <a href="#selection" className="hover:text-white cursor-none transition-colors">Selection</a>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.section 
          id="home"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="pt-24 pb-20 border-b border-neutral-900 scroll-mt-24"
        >
          <motion.p variants={fadeUp} className="text-neutral-500 text-xs font-semibold tracking-widest mb-6 uppercase">
            Nagpur, Maharashtra
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-[5rem] md:text-[10rem] font-extrabold tracking-tighter leading-[0.85] mb-8 uppercase">
            <span className="text-white">ARPIT</span> <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.8)" }}>
              TAGADE
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-2xl md:text-4xl font-light text-neutral-300 max-w-3xl mb-12 leading-tight">
            Passionate developer bridging the gap between <span className="italic font-medium text-white">AI intelligence</span> and <span className="italic font-medium text-white">Robust software.</span>
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsChatOpen(true)}
              className="bg-white text-black px-8 py-4 rounded-full font-semibold cursor-none"
            >
              Start a conversation
            </motion.button>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-neutral-700 px-8 py-4 rounded-full font-semibold hover:border-white hover:bg-neutral-900 transition-all duration-300 cursor-none inline-block"
            >
              View Resume
            </motion.a>
          </motion.div>
        </motion.section>
      </div>

      {/* Infinite Scrolling Tech Marquee */}
      <div className="relative z-10 w-full overflow-hidden border-b border-neutral-900 py-6 bg-neutral-950/50 flex whitespace-nowrap backdrop-blur-sm">
        <motion.div 
          className="flex gap-16 text-2xl md:text-4xl font-bold uppercase tracking-widest text-neutral-700"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          <span>AI INTELLIGENCE</span> <span>•</span>
          <span>JAVA ARCHITECTURE</span> <span>•</span>
          <span>HARDWARE INTEGRATION</span> <span>•</span>
          <span>ROBUST SOFTWARE</span> <span>•</span>
          <span>AI INTELLIGENCE</span> <span>•</span>
          <span>JAVA ARCHITECTURE</span> <span>•</span>
          <span>HARDWARE INTEGRATION</span> <span>•</span>
          <span>ROBUST SOFTWARE</span>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        
        {/* 15 Block Skills (Expertise) Section */}
        <section id="expertise" className="py-24 border-b border-neutral-900 scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">Technical Arsenal</h2>
            <p className="text-neutral-500">A comprehensive view of my development capabilities.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {[
              { icon: Code2, title: "Java Development", cat: "Development" },
              { icon: Database, title: "JDBC", cat: "Database" },
              { icon: Code2, title: "C and C++ Programming", cat: "Development" },
              { icon: Layout, title: "API Development", cat: "Development" },
              { icon: Code2, title: "Object-Oriented Programming", cat: "Development" },
              { icon: Database, title: "Oracle SQL", cat: "Database" },
              { icon: Database, title: "Database Management", cat: "Database" },
              { icon: CheckCircle, title: "Code Reviews", cat: "Development" },
              { icon: Layout, title: "AWT (Abstract Window Toolkit)", cat: "UI Design" },
              { icon: FileText, title: "Software Documentation", cat: "Other" },
              { icon: Database, title: "SQL Plus", cat: "Database" },
              { icon: Code2, title: "Programming Languages", cat: "Core" },
              { icon: Cpu, title: "Hardware Integration (ESP32)", cat: "IoT" },
              { icon: Server, title: "IoT System Design", cat: "Hardware" },
              { icon: Layout, title: "Web & UI Development", cat: "Frontend" }
            ].map((skill, i) => (
              <SkillCard key={i} skill={skill} i={i} fadeUp={fadeUp} />
            ))}
          </motion.div>
        </section>

        {/* Projects (Selection) Section */}
        <section id="selection" className="py-24 border-b border-neutral-900 scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">Project Selection</h2>
            <p className="text-neutral-500">A curated showcase of my recent architectural and AI engineering work.</p>
          </motion.div>

          <div className="flex flex-col gap-24">
            {[
              { num: "01", title: "Neosis: Real-Time Platform", desc: "Engineered a low-latency communication platform using Java Spring Boot and WebSockets, achieving sub-100ms message delivery.", tags: ["JAVA", "SPRING BOOT", "WEBSOCKETS", "REACT"], link: "https://neosis-static-site.onrender.com" },
              { num: "02", title: "Intelligent AI Portfolio", desc: "A high-performance personal portfolio engineered with Next.js and a custom Gemini 2.5 Flash assistant.", tags: ["NEXT.JS", "TYPESCRIPT", "GEMINI API"], link: "https://github.com/tagadearpit/my-portiofoli" },
              { num: "03", title: "Monika-AI", desc: "Interactive, server-backed web application providing users with an intelligent digital interface powered by Node.js.", tags: ["NODE.JS", "VANILLA JS", "REST API"], link: "https://monika-ai-0jpf.onrender.com" }
            ].map((proj) => (
              <motion.div 
                key={proj.num} 
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ x: 10 }}
                className="flex flex-col md:flex-row gap-8 items-start group cursor-none transition-transform"
              >
                <span className="text-6xl md:text-8xl font-bold text-neutral-800 group-hover:text-transparent transition-colors duration-500" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
                  {proj.num}
                </span>
                <div className="flex-1 mt-4">
                  <h3 className="text-4xl md:text-5xl font-bold mb-4">{proj.title}</h3>
                  <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mb-8">{proj.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 border border-neutral-800 rounded text-xs font-semibold tracking-widest text-neutral-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <a 
                  href={proj.link} 
                  target="_blank" rel="noopener noreferrer"
                  className="hidden md:flex w-16 h-16 rounded-full border border-neutral-800 items-center justify-center group-hover:bg-white group-hover:text-black group-hover:rotate-45 transition-all duration-300 cursor-none"
                >
                  <ExternalLink size={24} />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Detailed Footer Section */}
        <footer className="pt-32 pb-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-32"
          >
            <h2 className="text-6xl md:text-[7rem] font-extrabold tracking-tighter mb-8 leading-[0.9]">
              HAVE A VISION?<br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(115,115,115,0.8)" }}>LET'S BRING<br />IT TO LIFE.</span>
            </h2>
            <a 
              href="mailto:arpittagade5@gmail.com" 
              className="inline-block mt-8 text-2xl md:text-5xl font-medium text-neutral-300 hover:text-white relative group cursor-none"
            >
              ARPITTAGADE5@GMAIL.COM
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-sm border-t border-neutral-900 pt-12">
            <div>
              <p className="text-neutral-500 font-semibold tracking-widest mb-6 uppercase text-xs">Navigation</p>
              <ul className="flex flex-col gap-3 text-neutral-400">
                <li><a href="#home" className="hover:text-white transition-colors cursor-none">Home</a></li>
                <li><a href="#expertise" className="hover:text-white transition-colors cursor-none">Expertise</a></li>
                <li><a href="#selection" className="hover:text-white transition-colors cursor-none">Selection</a></li>
              </ul>
            </div>
            
            <div>
              <p className="text-neutral-500 font-semibold tracking-widest mb-6 uppercase text-xs">Social</p>
              <ul className="flex flex-col gap-3 text-neutral-400">
                <li><a href="https://github.com/tagadearpit" className="hover:text-white transition-colors cursor-none">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/tagadearpit" className="hover:text-white transition-colors cursor-none">LinkedIn</a></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-2 md:text-right">
              <p className="text-neutral-500 font-semibold tracking-widest mb-6 uppercase text-xs">Epilogue</p>
              <p className="text-neutral-400">
                © 2026 Arpit Tagade.<br />
                Crafted with Next.js, Tailwind, and Gemini AI.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-neutral-900 border border-neutral-800 w-[350px] h-[500px] rounded-2xl shadow-2xl mb-4 flex flex-col overflow-hidden cursor-auto"
          >
            <div className="bg-black border-b border-neutral-800 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                  <MessageSquare size={16} />
                </div>
                <span className="font-medium text-sm">Arpit's AI Assistant</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-neutral-400 hover:text-white transition-colors cursor-none">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user' ? 'bg-white text-black rounded-tr-sm' : 'bg-neutral-800 text-white rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-neutral-800 text-neutral-400 rounded-2xl rounded-tl-sm px-4 py-3 text-xs flex gap-1 items-center">
                    <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}>•</motion.span>
                    <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}>•</motion.span>
                    <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}>•</motion.span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="p-4 bg-black border-t border-neutral-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me something..."
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-neutral-500 transition-colors cursor-none"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-none"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
        
        {!isChatOpen && (
          <motion.button 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-none"
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </div>
    </main>
  );
}
