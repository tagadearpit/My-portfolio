"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, ExternalLink, Code2, Database, Layout, Cpu, Server, FileText, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Portfolio() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "ai" | "user"; text: string }[]>([
    { role: "ai", text: "Hi! I'm Arpit's AI Assistant. Ask me anything about his skills, education, or projects!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    <main className="min-h-screen bg-black text-white selection:bg-neutral-800 font-sans pb-12 overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center px-8 py-6 border-b border-neutral-900"
      >
        <div className="font-bold tracking-widest text-sm uppercase">Arpit Tagade</div>
        <div className="hidden md:flex gap-6 text-xs font-semibold tracking-widest text-neutral-400">
          <span className="hover:text-white cursor-pointer transition-colors">Home</span>
          <span className="hover:text-white cursor-pointer transition-colors">Expertise</span>
          <span className="hover:text-white cursor-pointer transition-colors">Selection</span>
        </div>
      </motion.nav>

      <div className="max-w-6xl mx-auto px-8">
        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="pt-24 pb-32 border-b border-neutral-900"
        >
          <motion.p variants={fadeUp} className="text-neutral-500 text-xs font-semibold tracking-widest mb-6 uppercase">
            Nagpur, Maharashtra
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-7xl md:text-9xl font-extrabold tracking-tighter leading-none mb-8">
            ARPIT <br /> TAGADE
          </motion.h1>
          <motion.p variants={fadeUp} className="text-2xl md:text-4xl font-light text-neutral-300 max-w-3xl mb-12 leading-tight">
            Passionate developer bridging the gap between <span className="italic font-medium text-white">AI intelligence</span> and <span className="italic font-medium text-white">Robust software.</span>
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <button 
              onClick={() => setIsChatOpen(true)}
              className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
            >
              Start a conversation
            </button>
            <button className="border border-neutral-700 px-8 py-4 rounded-full font-semibold hover:border-white hover:bg-neutral-900 transition-all duration-300">
              View Resume
            </button>
          </motion.div>
        </motion.section>

        {/* 15 Block Skills Section */}
        <section className="py-24 border-b border-neutral-900">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
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
              { icon: Cpu, title: "Hardware Integration (ESP32/Arduino)", cat: "IoT" },
              { icon: Server, title: "IoT System Design", cat: "Hardware" },
              { icon: Layout, title: "Web & UI Development", cat: "Frontend" }
            ].map((skill, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                whileHover={{ y: -5, backgroundColor: "rgba(23, 23, 23, 1)" }}
                className="bg-neutral-900/40 border border-neutral-800 p-8 rounded-2xl transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-8">
                  <skill.icon className="text-neutral-500" size={32} />
                  <span className="text-neutral-600 font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-neutral-500 text-xs font-semibold tracking-widest uppercase mb-2">{skill.cat}</p>
                <h3 className="text-xl font-medium">{skill.title}</h3>
              </motion.div>
            ))}
          </motion.div>
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
              <span className="text-neutral-600">LET'S BRING<br />IT TO LIFE.</span>
            </h2>
            <a 
              href="mailto:arpittagade5@gmail.com" 
              className="inline-block mt-8 text-2xl md:text-5xl font-medium text-neutral-300 hover:text-white relative group"
            >
              ARPITTAGADE5@GMAIL.COM
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </motion.div>

          {/* Footer Navigation Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-sm border-t border-neutral-900 pt-12">
            <div>
              <p className="text-neutral-500 font-semibold tracking-widest mb-6 uppercase text-xs">Navigation</p>
              <ul className="flex flex-col gap-3 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Expertise</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Selection</a></li>
              </ul>
            </div>
            
            <div>
              <p className="text-neutral-500 font-semibold tracking-widest mb-6 uppercase text-xs">Social</p>
              <ul className="flex flex-col gap-3 text-neutral-400">
                <li><a href="https://github.com/tagadearpit" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram (Coding Challenge)</a></li>
                <li><a href="#" className="hover:text-white transition-colors">X</a></li>
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
            className="bg-neutral-900 border border-neutral-800 w-[350px] h-[500px] rounded-2xl shadow-2xl mb-4 flex flex-col overflow-hidden"
          >
            <div className="bg-black border-b border-neutral-800 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                  <MessageSquare size={16} />
                </div>
                <span className="font-medium text-sm">Arpit's AI Assistant</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-neutral-400 hover:text-white transition-colors">
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
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-neutral-500 transition-colors"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
            className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </div>
    </main>
  );
}