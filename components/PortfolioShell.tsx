"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Clipboard,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Orbit,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { MouseEvent, useEffect, useMemo, useState } from "react";
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
import { BootSequence } from "@/components/BootSequence";
import { ProjectCard } from "@/components/ProjectCard";

const roles = [
  "production systems",
  "intelligent interfaces",
  "realtime platforms",
  "AI-connected hardware",
];

const themes = ["cyan", "violet", "amber"] as const;
type Theme = (typeof themes)[number];

export function PortfolioShell() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: 0.22 });
  const [theme, setTheme] = useState<Theme>("cyan");
  const [roleIndex, setRoleIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("arpit-signal-theme") as Theme | null;
    if (!saved || !themes.includes(saved)) return;
    const restoreTimer = window.setTimeout(() => setTheme(saved), 0);
    return () => window.clearTimeout(restoreTimer);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

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
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.2, 0.45] },
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

  const role = useMemo(() => roles[roleIndex], [roleIndex]);

  const changeTheme = (value: Theme) => {
    setTheme(value);
    window.localStorage.setItem("arpit-signal-theme", value);
  };

  const updatePointer = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    target.style.setProperty("--pointer-x", `${event.clientX}px`);
    target.style.setProperty("--pointer-y", `${event.clientY}px`);
  };

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
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
    <div className="site-shell" data-signal={theme} onMouseMove={updatePointer}>
      <BootSequence />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="pointer-aura" aria-hidden="true" />
      <div className="global-grid" aria-hidden="true" />
      <div className="global-noise" aria-hidden="true" />

      <header className="site-header">
        <a href="#home" className="brand" aria-label="Arpit Tagade — home">
          <span className="brand-mark">AT</span>
          <span className="brand-copy">
            <strong>ARPIT TAGADE</strong>
            <small>ENGINEERING NODE / IN</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === item.href.slice(1) ? "active" : ""}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-controls">
          <div className="theme-switcher" aria-label="Select interface signal color">
            {themes.map((item) => (
              <button
                key={item}
                type="button"
                className={theme === item ? "active" : ""}
                aria-label={`Use ${item} signal color`}
                aria-pressed={theme === item}
                onClick={() => changeTheme(item)}
              />
            ))}
          </div>
          <a href={identity.resume} className="resume-compact" target="_blank" rel="noreferrer">
            CV <ArrowUpRight size={14} />
          </a>
          <button
            type="button"
            className="menu-trigger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={21} />
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
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-menu-top">
              <span>Navigation matrix</span>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {navigation.map((item, index) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mobile-menu-meta">
              <a href={identity.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a>
              <a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a>
              <a href={`mailto:${identity.email}`}>Email <ArrowUpRight size={15} /></a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main>
        <section id="home" className="hero section-shell">
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-status">
              <span className="status-dot" />
              SYSTEM ONLINE
              <i />
              <span>AVAILABLE FOR ENGINEERING WORK</span>
            </div>
            <span className="eyebrow">FULL-STACK AI ENGINEER / HARDWARE DEVELOPER</span>
            <h1>
              BUILDING
              <br />
              <span>BETWEEN</span>
              <br />
              WORLDS.
            </h1>
            <p className="hero-lead">
              I build <strong>{role}</strong> across the boundary between cloud intelligence,
              realtime software, and physical devices.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="button button-primary">
                Explore systems <ArrowDown size={17} />
              </a>
              <a href={identity.resume} className="button button-secondary" target="_blank" rel="noreferrer">
                <Download size={17} /> Download resume
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-console"
            initial={{ opacity: 0, scale: 0.96, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="console-topbar">
              <div><i /><i /><i /></div>
              <span>arpit@engineering-core:~</span>
              <Terminal size={15} />
            </div>
            <div className="console-body">
              <div className="console-command"><span>❯</span> inspect --profile arpit-tagade</div>
              <div className="console-tree">
                <span>identity</span>
                <strong>{identity.headline}</strong>
                <span>location</span>
                <strong>{identity.location}</strong>
                <span>primary_mode</span>
                <strong>software ↔ intelligence ↔ hardware</strong>
                <span>current_focus</span>
                <strong>secure, observable, deployable systems</strong>
              </div>
              <div className="console-command"><span>❯</span> load --selected-systems</div>
              <div className="console-loader"><i /><i /><i /><i /><i /><i /><i /><i /></div>
              <div className="console-result"><Check size={14} /> 3 project nodes resolved</div>
            </div>
            <div className="console-radar" aria-hidden="true">
              <span /><span /><span /><span />
            </div>
          </motion.div>

          <a href="#systems" className="scroll-cue" aria-label="Scroll to systems section">
            <span>SCROLL TO TRANSMIT</span>
            <i><ArrowDown size={14} /></i>
          </a>
        </section>

        <section className="signal-strip" aria-label="Portfolio signals">
          <div className="signal-strip-inner section-shell">
            {signals.map((signal) => (
              <div key={signal.label} className="signal-stat">
                <strong>{signal.value}</strong>
                <span>{signal.label}</span>
              </div>
            ))}
            <div className="signal-location">
              <MapPin size={16} />
              NAGPUR / INDIA
              <span>21.1458° N · 79.0882° E</span>
            </div>
          </div>
        </section>

        <section id="systems" className="content-section section-shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">01 / ENGINEERING SYSTEMS</span>
              <h2>One engineer.<br /><span>Multiple layers.</span></h2>
            </div>
            <p>
              The interface is only one part of the system. My work spans client experience,
              backend policy, persistent data, realtime transport, AI orchestration, and device behavior.
            </p>
          </div>

          <div className="capability-grid">
            {capabilityGroups.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <motion.article
                  key={capability.code}
                  className="capability-card"
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.07, duration: 0.55 }}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                >
                  <div className="capability-top">
                    <span>{capability.code}</span>
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  <div className="mini-stack">
                    {capability.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="marquee" aria-label="Core technologies">
          <div className="marquee-track">
            {[...stackMatrix, ...stackMatrix].map((group, index) => (
              <span key={`${group.layer}-${index}`}>
                <Zap size={15} /> {group.layer} / {group.items.slice(0, 3).join(" · ")}
              </span>
            ))}
          </div>
        </section>

        <section id="projects" className="content-section section-shell projects-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">02 / SELECTED PROJECT NODES</span>
              <h2>Systems with<br /><span>real boundaries.</span></h2>
            </div>
            <p>
              These projects are presented as architecture decisions and operational surfaces—not only visual demos.
            </p>
          </div>
          <div className="project-list">
            {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        </section>

        <section className="content-section section-shell stack-section">
          <div className="section-heading compact-heading">
            <div>
              <span className="eyebrow">03 / TECHNICAL MATRIX</span>
              <h2>Tools mapped<br /><span>to responsibility.</span></h2>
            </div>
            <p>
              Technology choices matter less than clear ownership, failure handling, maintainability, and the constraints of the product.
            </p>
          </div>
          <div className="stack-grid">
            {stackMatrix.map((group, index) => {
              const Icon = group.icon;
              return (
                <motion.article
                  key={group.layer}
                  className="stack-card"
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.06, duration: 0.45 }}
                >
                  <div className="stack-title"><Icon size={20} /><h3>{group.layer}</h3></div>
                  <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="about" className="content-section section-shell about-section">
          <div className="about-main">
            <span className="eyebrow">04 / OPERATOR PROFILE</span>
            <h2>Engineering from first principles, then shipping the details.</h2>
            <p>
              I’m an Artificial Intelligence and Data Science student based in Nagpur. My work is centered on turning system concepts into deployable software and tangible hardware: realtime communication, secure sessions, AI memory, server APIs, responsive interfaces, and ESP32-driven physical feedback.
            </p>
            <p>
              I prefer explicit architecture over hidden magic. Every project is evaluated through security, latency, observability, failure recovery, deployment, and long-term maintenance—not only whether the happy path works locally.
            </p>
            <div className="about-links">
              <a href={identity.github} target="_blank" rel="noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={15} /></a>
              <a href={identity.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={15} /></a>
              <a href={identity.resume} target="_blank" rel="noreferrer"><Download size={18} /> Resume <ArrowUpRight size={15} /></a>
            </div>
          </div>

          <div className="education-card">
            <div className="education-orbit" aria-hidden="true"><Orbit size={60} /></div>
            <span className="eyebrow">ACTIVE EDUCATION NODE</span>
            <strong>B.Tech</strong>
            <h3>Artificial Intelligence & Data Science</h3>
            <p>Wainganga College of Engineering and Management</p>
            <div className="education-meta"><span>Nagpur, Maharashtra</span><span>Expected 2029</span></div>
          </div>

          <div className="principles-grid">
            {engineeringPrinciples.map((principle) => {
              const Icon = principle.icon;
              return (
                <article key={principle.title}>
                  <Icon size={24} />
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="contact" className="contact-section section-shell">
          <div className="contact-signal" aria-hidden="true">
            <span /><span /><span /><span />
            <Mail size={54} strokeWidth={1.25} />
          </div>
          <div className="contact-copy">
            <span className="eyebrow">05 / OPEN CHANNEL</span>
            <h2>Have a system worth building?</h2>
            <p>
              For full-stack engineering, AI integration, realtime platforms, or hardware-connected prototypes, open a direct channel.
            </p>
            <div className="contact-actions">
              <a href={`mailto:${identity.email}`} className="button button-primary">
                <Mail size={17} /> Start an email <ArrowUpRight size={17} />
              </a>
              <button type="button" className="button button-secondary" onClick={() => void copyEmail()}>
                {copied ? <Check size={17} /> : <Clipboard size={17} />}
                {copied ? "Email copied" : "Copy address"}
              </button>
            </div>
            <a className="contact-email" href={`mailto:${identity.email}`}>{identity.email}</a>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <div>
          <span className="brand-mark">AT</span>
          <p>Designed and engineered by Arpit Tagade.</p>
        </div>
        <div className="footer-status"><i /> SYSTEM ONLINE / 2026</div>
        <div className="footer-links">
          <a href={identity.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="#home">Back to origin</a>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
}
