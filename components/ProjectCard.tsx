"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Github, Radio } from "lucide-react";
import type { projects } from "@/data/portfolio";

type Project = (typeof projects)[number];

function ProjectPreview({ project }: { project: Project }) {
  if (project.id === "monika") {
    return (
      <div className="preview-window preview-monika" aria-hidden="true">
        <div className="preview-toolbar"><i /><i /><i /><span>MONIKA / AI SESSION</span></div>
        <div className="preview-monika-grid">
          <div className="preview-sidebar">
            <div className="preview-avatar">M</div>
            <span /><span /><span /><span />
          </div>
          <div className="preview-chat">
            <div className="preview-status"><i /> MEMORY ONLINE</div>
            <div className="preview-message preview-message-ai">How can I help you today?</div>
            <div className="preview-message preview-message-user">Summarize my current project plan.</div>
            <div className="preview-thinking"><i /><i /><i /></div>
            <div className="preview-input"><span>Ask Monika…</span><b>↗</b></div>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === "neosis") {
    return (
      <div className="preview-window preview-neosis" aria-hidden="true">
        <div className="preview-toolbar"><i /><i /><i /><span>NEOSIS / SECURE CHANNEL</span></div>
        <div className="preview-neosis-grid">
          <div className="preview-contact-list">
            <strong>Messages</strong>
            <div className="preview-contact active"><i>AT</i><span><b>Project channel</b><small>Architecture is ready.</small></span><em>2</em></div>
            <div className="preview-contact"><i>MK</i><span><b>Monika AI</b><small>Session deployed.</small></span></div>
            <div className="preview-contact"><i>CR</i><span><b>CandyRobot</b><small>Device online.</small></span></div>
          </div>
          <div className="preview-conversation">
            <div className="preview-callbar"><span><i /> Project channel</span><b>•••</b></div>
            <div className="preview-bubble incoming">Realtime transport verified.</div>
            <div className="preview-bubble outgoing">Media path is isolated from STOMP.</div>
            <div className="preview-wave"><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="preview-window preview-robot" aria-hidden="true">
      <div className="preview-toolbar"><i /><i /><i /><span>CANDYROBOT / DEVICE CORE</span></div>
      <div className="robot-stage">
        <div className="robot-orbit robot-orbit-a" />
        <div className="robot-orbit robot-orbit-b" />
        <div className="robot-head">
          <div className="robot-eye" /><div className="robot-eye" />
          <div className="robot-mouth"><i /><i /><i /><i /><i /></div>
        </div>
        <span className="robot-node node-one">SERVO</span>
        <span className="robot-node node-two">OLED</span>
        <span className="robot-node node-three">GEMINI</span>
        <div className="robot-status"><i /> ESP32 ONLINE</div>
      </div>
    </div>
  );
}

export function ProjectCard({ project, position }: { project: Project; position: number }) {
  const Icon = project.icon;

  return (
    <motion.article
      className={`project-card project-${project.tone} ${position === 0 ? "project-featured" : ""}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-visual">
        <div className="project-number">{project.index}</div>
        <ProjectPreview project={project} />
      </div>

      <div className="project-copy">
        <div className="project-title-row">
          <div>
            <span className="section-kicker">FEATURED SYSTEM / {project.index}</span>
            <h3>{project.title}</h3>
            <p className="project-subtitle">{project.subtitle}</p>
          </div>
          <Icon size={34} strokeWidth={1.45} aria-hidden="true" />
        </div>

        <p className="project-description">{project.description}</p>

        <ul className="project-highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight}><CheckCircle2 size={18} />{highlight}</li>
          ))}
        </ul>

        <div className="project-architecture">
          <span>Architecture</span>
          <p>{project.architecture}</p>
        </div>

        <div className="tag-row" aria-label={`${project.title} technologies`}>
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>

        <div className="project-actions">
          {project.live ? (
            <a href={project.live} target="_blank" rel="noreferrer" className="button button-primary">
              <Radio size={17} /> Live project <ArrowUpRight size={17} />
            </a>
          ) : (
            <span className="button button-muted" aria-disabled="true">
              <Radio size={17} /> Hardware prototype
            </span>
          )}
          <a href={project.source} target="_blank" rel="noreferrer" className="text-link">
            <Github size={18} /> View source <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
