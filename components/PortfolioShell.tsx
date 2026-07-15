"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clipboard,
  Code2,
  Cpu,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import {
  capabilityGroups,
  engineeringPrinciples,
  identity,
  navigation,
  projects,
  signals,
  stackMatrix,
} from "@/data/portfolio";
import { AIAssistant } from "@/components/AIAssistant";
import { ProjectCard } from "@/components/ProjectCard";

export function PortfolioShell() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: 0.25 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -60% 0px", threshold: [0.05, 0.22, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
    } catch {
      const field = document.createElement("textarea");
      field.value = identity.email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="global-grid" aria-hidden="true" />

      <header className="site-header">
        <a href="#home" className="brand" aria-label="Arpit Tagade — home">
          <span className="brand-mark">AT</span>
          <span className="brand-copy">
            <strong>Arpit Tagade</strong>
            <small>AI · Software · Hardware</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === item.href.slice(1) ? "active" : ""}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <span className="availability"><i /> Available for work</span>
          <a href={identity.resume} target="_blank" rel="noreferrer" className="header-resume">
            Resume <ArrowUpRight size={16} />
          </a>
          <button
            type="button"
            className="menu-trigger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-menu-top">
              <a href="#home" onClick={() => setMenuOpen(false)} className="brand">
                <span className="brand-mark">AT</span>
                <span className="brand-copy"><strong>Arpit Tagade</strong><small>Portfolio</small></span>
              </a>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={25} /></button>
            </div>
            <nav aria-label="Mobile navigation">
              {navigation.map((item, index) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>{item.label}<ArrowUpRight size={20} />
                </a>
              ))}
            </nav>
            <div className="mobile-menu-footer">
              <a href={identity.resume} target="_blank" rel="noreferrer">Download resume <Download size={18} /></a>
              <span>{identity.email}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main>
        <section id="home" className="hero section-shell">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-kicker"><Sparkles size={18} /> Full-Stack AI Engineer & Hardware Developer</div>
            <h1>
              I build intelligent systems
              <span>that move beyond the screen.</span>
            </h1>
            <p className="hero-lead">{identity.summary}</p>

            <div className="hero-actions">
              <a href="#work" className="button button-primary">
                Explore my work <ArrowDown size={18} />
              </a>
              <a href={identity.resume} className="button button-secondary" target="_blank" rel="noreferrer">
                <Download size={18} /> Download resume
              </a>
            </div>

            <div className="hero-links">
              <a href={identity.github} target="_blank" rel="noreferrer"><Github size={19} /> GitHub</a>
              <a href={identity.linkedin} target="_blank" rel="noreferrer"><Linkedin size={19} /> LinkedIn</a>
              <a href={`mailto:${identity.email}`}><Mail size={19} /> Email</a>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.96, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="system-panel">
              <div className="system-panel-top">
                <span><i /> SYSTEM MAP</span>
                <strong>ONLINE</strong>
              </div>

              <div className="system-map" aria-hidden="true">
                <div className="map-ring ring-one" />
                <div className="map-ring ring-two" />
                <div className="map-ring ring-three" />
                <div className="map-core"><span>AT</span><small>CORE</small></div>
                <div className="map-node node-ui"><Sparkles size={20} /><span>UI</span></div>
                <div className="map-node node-api"><Code2 size={20} /><span>API</span></div>
                <div className="map-node node-ai"><Terminal size={20} /><span>AI</span></div>
                <div className="map-node node-iot"><Cpu size={20} /><span>IoT</span></div>
              </div>

              <div className="system-panel-bottom">
                <div><span>LOCATION</span><strong><MapPin size={16} /> Nagpur, India</strong></div>
                <div><span>FOCUS</span><strong>Secure, realtime, deployable</strong></div>
              </div>
            </div>

            <div className="floating-card floating-card-top">
              <span>Current stack</span>
              <strong>Next.js · Spring Boot</strong>
            </div>
            <div className="floating-card floating-card-bottom">
              <i /> Building across software + hardware
            </div>
          </motion.div>

          <a href="#work" className="scroll-hint" aria-label="Scroll to selected work">
            <span>Selected work</span><ArrowDown size={17} />
          </a>
        </section>

        <section className="signal-strip" aria-label="Portfolio statistics">
          <div className="section-shell signal-strip-inner">
            {signals.map((signal) => (
              <div key={signal.label} className="signal-stat">
                <strong>{signal.value}</strong><span>{signal.label}</span>
              </div>
            ))}
            <div className="signal-statement">
              <span>ENGINEERING RANGE</span>
              <strong>Interface → API → Realtime → Device</strong>
            </div>
          </div>
        </section>

        <section id="work" className="content-section section-shell">
          <div className="section-heading">
            <div>
              <span className="section-kicker">SELECTED WORK</span>
              <h2>Products with real architecture behind the interface.</h2>
            </div>
            <p>
              Each project is presented through the decisions that make it usable in production: identity,
              persistence, transport boundaries, failure handling, deployment, and long-term maintainability.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} position={index} />
            ))}
          </div>
        </section>

        <section id="expertise" className="content-section expertise-section">
          <div className="section-shell">
            <div className="section-heading">
              <div>
                <span className="section-kicker">EXPERTISE</span>
                <h2>One product mindset across four engineering layers.</h2>
              </div>
              <p>
                I work across the full delivery path, while keeping responsibilities explicit and systems observable.
              </p>
            </div>

            <div className="capability-grid">
              {capabilityGroups.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <motion.article
                    key={capability.code}
                    className="capability-card"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.06, duration: 0.6 }}
                    whileHover={reduceMotion ? undefined : { y: -7 }}
                  >
                    <div className="capability-icon"><Icon size={28} /></div>
                    <span className="capability-code">{capability.code}</span>
                    <h3>{capability.title}</h3>
                    <p>{capability.description}</p>
                    <div className="mini-stack">
                      {capability.stack.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <div className="stack-panel">
              <div className="stack-panel-heading">
                <span className="section-kicker">TECHNOLOGY MATRIX</span>
                <h3>Tools selected by responsibility, not trend.</h3>
              </div>
              <div className="stack-grid">
                {stackMatrix.map((group) => {
                  const Icon = group.icon;
                  return (
                    <article key={group.layer} className="stack-card">
                      <div className="stack-title"><Icon size={22} /><h4>{group.layer}</h4></div>
                      <div className="stack-items">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="content-section section-shell about-section">
          <div className="about-copy">
            <span className="section-kicker">ABOUT ME</span>
            <h2>I turn ambitious ideas into systems that can actually be operated.</h2>
            <p>
              I’m an Artificial Intelligence and Data Science student based in Nagpur, focused on building
              deployable software and tangible hardware. My work spans secure sessions, realtime communication,
              AI memory, backend APIs, responsive interfaces, and ESP32-driven physical feedback.
            </p>
            <p>
              I prefer explicit architecture over hidden magic. I evaluate projects through security, latency,
              observability, failure recovery, deployment, and maintenance—not only whether the happy path works locally.
            </p>
            <div className="about-actions">
              <a href={identity.linkedin} target="_blank" rel="noreferrer" className="button button-primary">
                <Linkedin size={18} /> Connect on LinkedIn <ArrowUpRight size={17} />
              </a>
              <a href={identity.github} target="_blank" rel="noreferrer" className="text-link">
                <Github size={19} /> Explore GitHub <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <div className="about-sidebar">
            <article className="education-card">
              <div className="education-top"><span>EDUCATION</span><strong>2029</strong></div>
              <h3>B.Tech in Artificial Intelligence & Data Science</h3>
              <p>Wainganga College of Engineering and Management</p>
              <span className="education-location"><MapPin size={17} /> Nagpur, Maharashtra</span>
            </article>

            <article className="profile-card">
              <span>ENGINEERING PROFILE</span>
              <div><strong>Software</strong><i style={{ "--value": "94%" } as CSSProperties} /></div>
              <div><strong>AI systems</strong><i style={{ "--value": "88%" } as CSSProperties} /></div>
              <div><strong>Realtime</strong><i style={{ "--value": "86%" } as CSSProperties} /></div>
              <div><strong>Hardware</strong><i style={{ "--value": "78%" } as CSSProperties} /></div>
            </article>
          </div>

          <div className="principles-grid">
            {engineeringPrinciples.map((principle) => {
              const Icon = principle.icon;
              return (
                <article key={principle.title}>
                  <Icon size={25} />
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="contact" className="contact-section section-shell">
          <div className="contact-glow" aria-hidden="true" />
          <div className="contact-copy">
            <span className="section-kicker">START A CONVERSATION</span>
            <h2>Have a product, platform, or intelligent device worth building?</h2>
            <p>
              I’m open to full-stack engineering, AI integration, realtime platform, and hardware-connected work.
            </p>
            <div className="contact-actions">
              <a href={`mailto:${identity.email}`} className="button button-primary">
                <Mail size={19} /> Send an email <ArrowUpRight size={18} />
              </a>
              <button type="button" className="button button-secondary" onClick={() => void copyEmail()}>
                {copied ? <Check size={18} /> : <Clipboard size={18} />}
                {copied ? "Email copied" : "Copy email"}
              </button>
            </div>
          </div>
          <div className="contact-meta">
            <span>DIRECT CHANNEL</span>
            <a href={`mailto:${identity.email}`}>{identity.email}<ArrowUpRight size={20} /></a>
            <div><MapPin size={18} /> {identity.location}</div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <div className="footer-brand"><span className="brand-mark">AT</span><p>Designed and engineered by Arpit Tagade.</p></div>
        <div className="footer-links">
          <a href={identity.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={identity.resume} target="_blank" rel="noreferrer">Resume</a>
        </div>
        <a href="#home" className="back-top">Back to top <ArrowRight size={17} /></a>
      </footer>

      <AIAssistant />
    </div>
  );
}
