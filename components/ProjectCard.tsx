"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Radio } from "lucide-react";
import type { projects } from "@/data/portfolio";

type Project = (typeof projects)[number];

export function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon;

  return (
    <motion.article
      className={`project-card project-${project.tone}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-visual" aria-hidden="true">
        <div className="project-radar">
          <span />
          <span />
          <span />
          <div className="project-icon-shell">
            <Icon size={46} strokeWidth={1.45} />
          </div>
        </div>
        <div className="project-scanline" />
        <div className="project-coordinates">
          <span>NODE {project.index}</span>
          <span>STATUS / DEPLOYED</span>
        </div>
      </div>

      <div className="project-copy">
        <div className="project-heading-row">
          <div>
            <span className="eyebrow">CASE STUDY {project.index}</span>
            <h3>{project.title}</h3>
            <p className="project-subtitle">{project.subtitle}</p>
          </div>
          <span className="project-index">{project.index}</span>
        </div>

        <p className="project-description">{project.description}</p>

        <div className="project-detail-grid">
          <div>
            <span>Architecture</span>
            <p>{project.architecture}</p>
          </div>
          <div>
            <span>Engineering signal</span>
            <p>{project.outcome}</p>
          </div>
        </div>

        <div className="tag-row" aria-label={`${project.title} technologies`}>
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="project-actions">
          {project.live ? (
            <a href={project.live} target="_blank" rel="noreferrer" className="button button-primary">
              <Radio size={16} />
              Open live system
              <ArrowUpRight size={16} />
            </a>
          ) : (
            <span className="button button-disabled" aria-disabled="true">
              <Radio size={16} />
              Hardware prototype
            </span>
          )}
          <a href={project.source} target="_blank" rel="noreferrer" className="button button-secondary">
            <Github size={16} />
            Source / profile
          </a>
        </div>
      </div>
    </motion.article>
  );
}
