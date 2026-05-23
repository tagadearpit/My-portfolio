"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, ExternalLink, Code2, Database, Layout } from "lucide-react";

export default function Portfolio() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "ai" | "user"; text: string }[]>([
    { role: "ai", text: "Hi! I'm Arpit's AI Assistant. Ask me anything about his skills, education, or projects!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
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

  return (
    <main className="min-h-screen bg-black text-white selection:bg-neutral-800 font-sans pb-24">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-neutral-900">
        <div className="font-bold tracking-widest text-sm uppercase">Arpit Tagade</div>
        <div className="hidden md:flex gap-6 text-xs font-semibold tracking-widest text-neutral-400">
          <span className="hover:text-white cursor-pointer transition-colors">Expertise</span>
          <span className="hover:text-white cursor-pointer transition-colors">Selection</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8">
        {/* Hero Section */}
        <section className="pt-24 pb-32 border-b border-neutral-900">
          <p className="text-neutral-500 text-xs font-semibold tracking-widest mb-6 uppercase">
            Nagpur, Maharashtra
          </p>
          <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter leading-none mb-8">
            ARPIT <br /> TAGADE
          </h1>
          <p className="text-2xl md:text-4xl font-light text-neutral-300 max-w-3xl mb-12">
            Passionate developer bridging the gap between <span className="italic font-medium text-white">AI intelligence</span> and <span className="italic font-medium text-white">Robust software.</span> Based in Nagpur.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsChatOpen(true)}
              className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-neutral-200 transition-colors"
            >
              Start a conversation
            </button>
            <button className="border border-neutral-700 px-8 py-4 rounded-full font-semibold hover:border-white transition-colors">
              View Resume
            </button>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 border-b border-neutral-900 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-medium leading-tight mb-8">
              I'm Arpit Tagade, a 19-year-old developer obsessed with building the future of AI-driven applications.
            </h2>
            <p className="text-neutral-400 leading-relaxed mb-8">
              I specialize in Java architecture and AI search, currently expanding my horizon at college. My approach combines technical rigor with a pursuit of clean, impactful code.
            </p>
            <div className="flex flex-wrap gap-3">
              {['PROBLEM-SOLVING', 'MATHEMATICS', 'PROGRAMMING', 'AI RESEARCH'].map((tag) => (
                <span key={tag} className="px-4 py-2 border border-neutral-800 rounded-full text-xs font-semibold tracking-widest text-neutral-300">
                  + {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-12 text-sm">
            <div>
              <p className="text-neutral-500 font-semibold tracking-widest mb-2 uppercase text-xs">Current Endeavor</p>
              <p className="text-xl font-medium">Bachelors of Technology: Artificial Intelligence and Data Science</p>
              <p className="text-neutral-400">Karenjekar College of Engineering and Management, Bhandara</p>
            </div>
            <div>
              <p className="text-neutral-500 font-semibold tracking-widest mb-2 uppercase text-xs">Contact Mode</p>
              <p className="text-xl font-medium">arpittagade5@gmail.com</p>
              <p className="text-neutral-400">Always responsive.</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-neutral-500 font-semibold tracking-widest mb-2 uppercase text-xs">Github Matrix</p>
                <a href="https://github.com/tagadearpit" className="text-xl font-medium flex items-center gap-2 hover:text-neutral-300">
                  /tagadearpit <ExternalLink size={18} />
                </a>
              </div>
              <div>
                <p className="text-neutral-500 font-semibold tracking-widest mb-2 uppercase text-xs">LinkedIn Link</p>
                <a href="www.linkedin.com/in/tagadearpit" className="text-xl font-medium flex items-center gap-2 hover:text-neutral-300">
                  Connect <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-24 border-b border-neutral-900">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Code2, title: "Java development", cat: "Development" },
              { icon: Database, title: "JDBC", cat: "Database" },
              { icon: Code2, title: "C and C++ programming", cat: "Development" },
              { icon: Layout, title: "API development", cat: "Development" },
              { icon: Code2, title: "Object-oriented programming", cat: "Development" },
              { icon: Database, title: "Oracle SQL", cat: "Database" }
            ].map((skill, i) => (
              <div key={i} className="bg-neutral-900/40 border border-neutral-800 p-8 rounded-2xl hover:bg-neutral-900 transition-colors">
                <skill.icon className="text-neutral-500 mb-8" size={32} />
                <p className="text-neutral-500 text-xs font-semibold tracking-widest uppercase mb-2">{skill.cat}</p>
                <h3 className="text-xl font-medium">{skill.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-24 border-b border-neutral-900">
          <div className="flex flex-col gap-24">
            {[
              { num: "01", title: "AI Chat Assistant", desc: "A real-time AI assistant built using Gemini API to help users navigate my portfolio.", tags: ["REACT", "EXPRESS", "GEMINI API"] },
              { num: "02", title: "Inventory Management System", desc: "A robust Java-based application for tracking stock levels using JDBC and Oracle SQL.", tags: ["JAVA", "JDBC", "ORACLE SQL", "AWT"] },
              { num: "03", title: "Smart Traffic Monitor", desc: "Advanced traffic analysis system using AI techniques to optimize signal timings.", tags: ["C++", "AI ALGORITHMS", "DATA SCIENCE"] }
            ].map((proj) => (
              <div key={proj.num} className="flex flex-col md:flex-row gap-8 items-start group cursor-pointer">
                <span className="text-6xl md:text-8xl font-bold text-neutral-800 group-hover:text-white transition-colors">
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
                <div className="hidden md:flex w-16 h-16 rounded-full border border-neutral-800 items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <ExternalLink size={24} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <section className="py-32 text-center">
          <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-none">
            HAVE A VISION?<br />
            <span className="text-neutral-500">LET'S BRING<br />IT TO LIFE.</span>
          </h2>
          <a href="mailto:arpittagade5@gmail.com" className="text-2xl md:text-4xl font-medium hover:text-neutral-400 transition-colors">
            ARPITTAGADE5@GMAIL.COM
          </a>
        </section>
      </div>

      {/* Floating Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isChatOpen && (
          <div className="bg-neutral-900 border border-neutral-800 w-[350px] h-[500px] rounded-2xl shadow-2xl mb-4 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
            <div className="bg-black border-b border-neutral-800 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                  <MessageSquare size={16} />
                </div>
                <span className="font-medium text-sm">Arpit's AI Assistant</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-neutral-400 hover:text-white">
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
                    <span className="animate-bounce">•</span>
                    <span className="animate-bounce delay-100">•</span>
                    <span className="animate-bounce delay-200">•</span>
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
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-neutral-600 transition-colors"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
        
        {!isChatOpen && (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
          >
            <MessageSquare size={24} />
          </button>
        )}
      </div>
    </main>
  );
}