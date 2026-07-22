"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Bot, LoaderCircle, MessageSquareText, Send, Sparkles, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

type Message = { role: "assistant" | "user"; text: string };

const suggestions = ["What does Arpit build?", "Tell me about Neosis", "How can I contact Arpit?"];

export function AIAssistant() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "I’m Arpit’s portfolio assistant. Ask about his systems, projects, stack, education, or contact details.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  }, [messages, loading, reduceMotion]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => inputRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = panel?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable?.[0];
      const last = focusable?.[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  const submit = async (event?: FormEvent, preset?: string) => {
    event?.preventDefault();
    const message = (preset ?? input).trim();
    if (!message || loading) return;

    setMessages((current) => [...current, { role: "user", text: message }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const payload = (await response.json()) as { response?: string; error?: string };
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: payload.response ?? payload.error ?? "The assistant is temporarily unavailable.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "The assistant could not reach its endpoint. You can still use the project and contact links on this page.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <m.button
        ref={triggerRef}
        type="button"
        className="assistant-trigger"
        whileHover={reduceMotion ? undefined : { y: -3 }}
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        onClick={() => setOpen(true)}
        aria-label="Open portfolio assistant"
        aria-expanded={open}
        aria-controls="portfolio-assistant"
      >
        <span className="assistant-pulse" aria-hidden="true" />
        <MessageSquareText size={19} />
        <span>Ask portfolio AI</span>
      </m.button>

      <AnimatePresence>
        {open ? (
          <>
            <m.button
              type="button"
              className="assistant-backdrop"
              aria-label="Close assistant"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <m.aside
              ref={panelRef}
              id="portfolio-assistant"
              className="assistant-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Portfolio AI assistant"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <header className="assistant-header">
                <div className="assistant-identity">
                  <div className="assistant-avatar"><Bot size={21} /></div>
                  <div>
                    <strong>Portfolio Intelligence</strong>
                    <span><i /> knowledge node online</span>
                  </div>
                </div>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant">
                  <X size={19} />
                </button>
              </header>

              <div className="assistant-messages" role="log" aria-live="polite" aria-relevant="additions">
                {messages.map((message, index) => (
                  <m.div
                    key={`${message.role}-${index}`}
                    className={`assistant-message assistant-message-${message.role}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {message.role === "assistant" ? <Sparkles size={14} /> : null}
                    <p>{message.text}</p>
                  </m.div>
                ))}
                {loading ? (
                  <div className="assistant-message assistant-message-assistant">
                    <LoaderCircle className="spin" size={16} />
                    <p>Resolving portfolio context…</p>
                  </div>
                ) : null}
                <div ref={endRef} />
              </div>

              {messages.length === 1 ? (
                <div className="assistant-suggestions">
                  {suggestions.map((suggestion) => (
                    <button key={suggestion} type="button" onClick={() => void submit(undefined, suggestion)}>
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : null}

              <form className="assistant-form" onSubmit={(event) => void submit(event)}>
                <label htmlFor="assistant-message" className="sr-only">Ask a question</label>
                <input
                  ref={inputRef}
                  id="assistant-message"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  maxLength={500}
                  placeholder="Ask about projects, stack, or experience…"
                  autoComplete="off"
                />
                <button type="submit" disabled={!input.trim() || loading} aria-label="Send message">
                  <Send size={18} />
                </button>
              </form>
              <p className="assistant-note">Optional Gemini enhancement; deterministic portfolio answers remain available without an API key.</p>
            </m.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
