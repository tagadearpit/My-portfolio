"use client";

import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
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
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
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

const fluidEase = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: fluidEase },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06, staggerChildren: 0.09 },
  },
};

const heroLine: Variants = {
  hidden: { opacity: 0, y: "70%", rotateX: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.86, ease: fluidEase },
  },
};

export function PortfolioShell() {
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: 0.25 });
  const ambientOneY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const ambientTwoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const heroRotateX = useSpring(0, { stiffness: 170, damping: 24, mass: 0.45 });
  const heroRotateY = useSpring(0, { stiffness: 170, damping: 24, mass: 0.45 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [copied, setCopied] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 24;
    setHeaderScrolled((current) => (current === next ? current : next));
  });

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
    if (!menuOpen) return;

    const menu = mobileMenuRef.current;
    const trigger = menuTriggerRef.current;
    const focusable = menu?.querySelectorAll<HTMLElement>(
      'a[href]:not([tabindex="-1"]), button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !first || !last) return;
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
  }, [menuOpen]);

  const handleHeroPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    event.currentTarget.style.setProperty("--pointer-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * 100}%`);
    heroRotateX.set((0.5 - y) * 4.5);
    heroRotateY.set((x - 0.5) * 4.5);
  };

  const resetHeroPointer = () => {
    heroRotateX.set(0);
    heroRotateY.set(0);
  };

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
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="site-shell">
      <m.div className="scroll-progress" style={{ scaleX: progress }} />
      <m.div className="ambient ambient-one" style={{ y: ambientOneY }} aria-hidden="true" />
      <m.div className="ambient ambient-two" style={{ y: ambientTwoY }} aria-hidden="true" />
      <div className="global-grid" aria-hidden="true" />

      <m.header
        className={`site-header${headerScrolled ? " site-header-scrolled" : ""}`}
        initial={{ opacity: 0, y: -20, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        transition={{ duration: 0.65, ease: fluidEase }}
      >
        <a href="#home" className="brand" aria-label="Arpit Tagade — home">
          <span className="brand-mark">AT</span>
          <span className="brand-copy">
            <strong>Arpit Tagade</strong>
            <small>AI · Software · Hardware</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => {
            const active = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={active ? "active" : ""}
                aria-current={active ? "location" : undefined}
              >
                {active ? (
                  <m.span
                    className="nav-active-pill"
                    initial={{ opacity: 0, scale: 0.86 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                ) : null}
                <span className="nav-label">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="header-actions">
          <span className="availability"><i /> Available for work</span>
          <a href={identity.resume} target="_blank" rel="noreferrer" className="header-resume">
            Resume <ArrowUpRight size={16} />
          </a>
          <button
            ref={menuTriggerRef}
            type="button"
            className="menu-trigger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu size={24} />
          </button>
        </div>
      </m.header>

      <AnimatePresence mode="wait">
        {menuOpen ? (
          <m.div
            ref={mobileMenuRef}
            id="mobile-navigation"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, clipPath: "inset(0 0 0 100% round 28px)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0 0% round 0px)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 0 100% round 28px)" }}
            transition={{ duration: 0.42, ease: fluidEase }}
          >
            <div className="mobile-menu-top">
              <a href="#home" onClick={() => setMenuOpen(false)} className="brand" tabIndex={-1}>
                <span className="brand-mark">AT</span>
                <span className="brand-copy"><strong>Arpit Tagade</strong><small>Portfolio</small></span>
              </a>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={25} /></button>
            </div>
            <m.nav
              aria-label="Mobile navigation"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {navigation.map((item, index) => (
                <m.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  variants={reveal}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>{item.label}<ArrowUpRight size={20} />
                </m.a>
              ))}
            </m.nav>
            <div className="mobile-menu-footer">
              <a href={identity.resume} target="_blank" rel="noreferrer">Download resume <Download size={18} /></a>
              <span>{identity.email}</span>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>

      <main>
        <section id="home" className="hero section-shell">
          <m.div
            className="hero-copy"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <m.div className="hero-kicker" variants={reveal}>
              <Sparkles size={18} /> Full-Stack AI Engineer & Hardware Developer
            </m.div>
            <m.h1 variants={stagger} aria-label="I build intelligent systems that move beyond the screen.">
              <m.span className="hero-line" variants={heroLine} aria-hidden="true">
                I build intelligent systems
              </m.span>
              <m.span className="hero-line hero-line-accent" variants={heroLine} aria-hidden="true">
                that move beyond the screen.
              </m.span>
            </m.h1>
            <m.p className="hero-lead" variants={reveal}>{identity.summary}</m.p>

            <m.div className="hero-actions" variants={reveal}>
              <a href="#work" className="button button-primary">
                Explore my work <ArrowDown size={18} />
              </a>
              <a href={identity.resume} className="button button-secondary" target="_blank" rel="noreferrer">
                <Download size={18} /> Download resume
              </a>
            </m.div>

            <m.div className="hero-links" variants={reveal}>
              <a href={identity.github} target="_blank" rel="noreferrer"><Github size={19} /> GitHub</a>
              <a href={identity.linkedin} target="_blank" rel="noreferrer"><Linkedin size={19} /> LinkedIn</a>
              <a href={`mailto:${identity.email}`}><Mail size={19} /> Email</a>
            </m.div>
          </m.div>

          <m.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.96, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.95, ease: fluidEase }}
            onPointerMove={handleHeroPointerMove}
            onPointerLeave={resetHeroPointer}
          >
            <m.div
              className="system-panel"
              style={reduceMotion ? undefined : {
                rotateX: heroRotateX,
                rotateY: heroRotateY,
                transformPerspective: 1200,
              }}
            >
              <div className="system-panel-top">
                <span><i /> SYSTEM MAP</span>
                <strong>ONLINE</strong>
              </div>

              <div className="system-map" aria-hidden="true">
                <div className="map-ring ring-one" />
                <div className="map-ring ring-two" />
                <div className="map-ring ring-three" />
                <m.div
                  className="map-core"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.7, ease: fluidEase }}
                ><span>AT</span><small>CORE</small></m.div>
                {[
                  { className: "node-ui", label: "UI", Icon: Sparkles },
                  { className: "node-api", label: "API", Icon: Code2 },
                  { className: "node-ai", label: "AI", Icon: Terminal },
                  { className: "node-iot", label: "IoT", Icon: Cpu },
                ].map(({ className, label, Icon }, index) => (
                  <m.div
                    key={label}
                    className={`map-node ${className}`}
                    initial={{ opacity: 0, scale: 0.72, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.72 + index * 0.1, duration: 0.58, ease: fluidEase }}
                  >
                    <Icon size={20} /><span>{label}</span>
                  </m.div>
                ))}
              </div>

              <div className="system-panel-bottom">
                <div><span>LOCATION</span><strong><MapPin size={16} /> Nagpur, India</strong></div>
                <div><span>FOCUS</span><strong>Secure, realtime, deployable</strong></div>
              </div>
            </m.div>

            <m.div
              className="floating-card floating-card-top"
              animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
              transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <span>Current stack</span>
              <strong>Next.js · Spring Boot</strong>
            </m.div>
            <m.div
              className="floating-card floating-card-bottom"
              animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
              <i /> Building across software + hardware
            </m.div>
          </m.div>

          <a href="#work" className="scroll-hint" aria-label="Scroll to selected work">
            <span>Selected work</span><ArrowDown size={17} />
          </a>
        </section>

        <section className="signal-strip" aria-label="Portfolio statistics">
          <m.div
            className="section-shell signal-strip-inner"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            {signals.map((signal) => (
              <m.div key={signal.label} className="signal-stat" variants={reveal}>
                <strong>{signal.value}</strong><span>{signal.label}</span>
              </m.div>
            ))}
            <m.div className="signal-statement" variants={reveal}>
              <span>ENGINEERING RANGE</span>
              <strong>Interface → API → Realtime → Device</strong>
            </m.div>
          </m.div>
        </section>

        <section id="work" className="content-section section-shell">
          <m.div
            className="section-heading"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <div>
              <m.span className="section-kicker" variants={reveal}>SELECTED WORK</m.span>
              <m.h2 variants={reveal}>Products with real architecture behind the interface.</m.h2>
            </div>
            <m.p variants={reveal}>
              Each project is presented through the decisions that make it usable in production: identity,
              persistence, transport boundaries, failure handling, deployment, and long-term maintainability.
            </m.p>
          </m.div>

          <div className="project-list">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} position={index} />
            ))}
          </div>
        </section>

        <section id="expertise" className="content-section expertise-section">
          <div className="section-shell">
            <m.div
              className="section-heading"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <div>
                <m.span className="section-kicker" variants={reveal}>EXPERTISE</m.span>
                <m.h2 variants={reveal}>One product mindset across four engineering layers.</m.h2>
              </div>
              <m.p variants={reveal}>
                I work across the full delivery path, while keeping responsibilities explicit and systems observable.
              </m.p>
            </m.div>

            <div className="capability-grid">
              {capabilityGroups.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <m.article
                    key={capability.code}
                    className="capability-card"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.06, duration: 0.65, ease: fluidEase }}
                    whileHover={reduceMotion ? undefined : { y: -7 }}
                  >
                    <div className="capability-icon"><Icon size={28} /></div>
                    <span className="capability-code">{capability.code}</span>
                    <h3>{capability.title}</h3>
                    <p>{capability.description}</p>
                    <div className="mini-stack">
                      {capability.stack.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </m.article>
                );
              })}
            </div>

            <m.div
              className="stack-panel"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
            >
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
            </m.div>
          </div>
        </section>

        <section id="about" className="content-section section-shell about-section">
          <m.div
            className="about-copy"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <m.span className="section-kicker" variants={reveal}>ABOUT ME</m.span>
            <m.h2 variants={reveal}>I turn ambitious ideas into systems that can actually be operated.</m.h2>
            <m.p variants={reveal}>
              I’m an Artificial Intelligence and Data Science student based in Nagpur, focused on building
              deployable software and tangible hardware. My work spans secure sessions, realtime communication,
              AI memory, backend APIs, responsive interfaces, and ESP32-driven physical feedback.
            </m.p>
            <m.p variants={reveal}>
              I prefer explicit architecture over hidden magic. I evaluate projects through security, latency,
              observability, failure recovery, deployment, and maintenance—not only whether the happy path works locally.
            </m.p>
            <m.div className="about-actions" variants={reveal}>
              <a href={identity.linkedin} target="_blank" rel="noreferrer" className="button button-primary">
                <Linkedin size={18} /> Connect on LinkedIn <ArrowUpRight size={17} />
              </a>
              <a href={identity.github} target="_blank" rel="noreferrer" className="text-link">
                <Github size={19} /> Explore GitHub <ArrowUpRight size={16} />
              </a>
            </m.div>
          </m.div>

          <m.div
            className="about-sidebar"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <m.article className="education-card" variants={reveal}>
              <div className="education-top"><span>EDUCATION</span><strong>2029</strong></div>
              <h3>B.Tech in Artificial Intelligence & Data Science</h3>
              <p>Wainganga College of Engineering and Management</p>
              <span className="education-location"><MapPin size={17} /> Nagpur, Maharashtra</span>
            </m.article>

            <m.article className="profile-card" variants={reveal}>
              <span>ENGINEERING PROFILE</span>
              <div><strong>Software</strong><i style={{ "--value": "94%" } as CSSProperties} /></div>
              <div><strong>AI systems</strong><i style={{ "--value": "88%" } as CSSProperties} /></div>
              <div><strong>Realtime</strong><i style={{ "--value": "86%" } as CSSProperties} /></div>
              <div><strong>Hardware</strong><i style={{ "--value": "78%" } as CSSProperties} /></div>
            </m.article>
          </m.div>

          <m.div
            className="principles-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
          >
            {engineeringPrinciples.map((principle) => {
              const Icon = principle.icon;
              return (
                <m.article key={principle.title} variants={reveal}>
                  <Icon size={25} />
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </m.article>
              );
            })}
          </m.div>
        </section>

        <m.section
          id="contact"
          className="contact-section section-shell"
          initial={{ opacity: 0, y: 32, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: fluidEase }}
        >
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
        </m.section>
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
      </MotionConfig>
    </LazyMotion>
  );
}
