"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Project } from "@/data/projects";
import { getProjectDoc } from "@/data/projectDocs";
import { GithubIcon } from "@/components/GithubIcon";
import FlowDiagram from "@/components/FlowDiagram";
import {
  X,
  ExternalLink,
  Play,
  Copy,
  Check,
  Bookmark,
  Layers,
  Wrench,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface ProjectDocPanelProps {
  project: Project | null;
  onClose: () => void;
  onPreview?: (project: Project) => void;
  health?: { ok: boolean; latencyMs: number | null; status: number };
}

export default function ProjectDocPanel({
  project,
  onClose,
  onPreview,
  health,
}: ProjectDocPanelProps) {
  const [copied, setCopied] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 280);
  }, [isClosing, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  if (!project) return null;

  const doc = getProjectDoc(project);

  const handleCopyVanity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project.vanitySlug) return;
    const fullVanity = `https://achinta.me${project.vanitySlug}`;
    navigator.clipboard.writeText(fullVanity);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const showPreview =
    project.category === "Web Apps" && project.allowIframe && !!project.url && !!onPreview;

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/75 dark:bg-black/90 p-2 sm:p-4 lg:p-6 [perspective:1800px] ${
        isClosing ? "bookshelf-backdrop-out" : "bookshelf-backdrop-in"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex flex-col w-full h-[95vh] max-w-7xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden ${
          isClosing ? "bookshelf-modal-out" : "bookshelf-modal-in"
        }`}
      >
        {/* Top Bookshelf Header Bar */}
        <div className="px-4 sm:px-6 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-900/90 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20">
              <Bookmark className="w-4 h-4 fill-sky-500/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {project.title}
                </h3>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 border border-sky-300 dark:border-sky-800/50">
                  Project Dossier
                </span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono hidden sm:inline">
                achinta.me{project.vanitySlug ?? `/${project.id}`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-zinc-400 font-mono hidden md:inline">
              Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[10px]">Esc</kbd> to close
            </span>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700/60 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Bookshelf 3D Split Screen: seamless single scroll on mobile, split columns on desktop */}
        <div className="flex-1 overflow-y-auto lg:overflow-hidden lg:grid lg:grid-cols-12 min-h-0 [transform-style:preserve-3d]">
          {/* LEFT PANEL: 3D Popped-Out Book Cover Card */}
          <div className="lg:col-span-4 p-4 sm:p-5 lg:p-7 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 lg:overflow-y-auto bookshelf-left-pull shrink-0">
            <div className="space-y-5">
              {/* Card Spine & Meta Container */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border-l-4 border-l-sky-500 border-y border-r border-zinc-200 dark:border-zinc-800 shadow-xl shadow-sky-500/5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">
                      {project.category}
                    </span>
                    <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight mt-0.5">
                      {project.title}
                    </h2>
                  </div>

                  {health && project.url && (
                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border shrink-0 ${
                        health.ok
                          ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400"
                          : "bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-400"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          health.ok ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                        }`}
                      />
                      <span>{health.ok ? `${health.latencyMs ?? 0}ms` : "Down"}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {project.tagline}
                </p>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Vanity Slug Button */}
                {project.vanitySlug && project.url && (
                  <button
                    onClick={handleCopyVanity}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    <span className="font-mono">
                      achinta.me<span className="text-sky-600 dark:text-sky-400 font-semibold">{project.vanitySlug}</span>
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </span>
                  </button>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  {showPreview && (
                    <button
                      onClick={() => {
                        onClose();
                        onPreview?.(project);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-sky-50 dark:bg-sky-600/20 hover:bg-sky-100 dark:hover:bg-sky-600/30 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30 text-xs font-semibold transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-sky-600 dark:fill-sky-400" />
                      <span>Preview</span>
                    </button>
                  )}

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm transition-all"
                    >
                      <span>Launch</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-700 transition-all"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Quick Infrastructure Summary */}
              <div className="p-4 rounded-xl bg-white/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-xs space-y-2">
                <span className="font-bold text-zinc-800 dark:text-zinc-200 uppercase text-[10px] tracking-wider block">
                  Design Architecture
                </span>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                  {doc.architectureSummary}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: EXACT 3-SECTION CONTINUOUS DOCUMENTATION */}
          <div className="lg:col-span-8 p-4 sm:p-6 lg:p-8 lg:overflow-y-auto space-y-8 sm:space-y-10 bookshelf-right-unfold bookshelf-crease">
            
            {/* ── SECTION 1: 3 MAIN POINTS BRIEF DETAILS ── */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                      1. Core Architecture Highlights
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      The three primary pillars defining the system design and operational integrity.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/60 hidden sm:inline-block">
                  3 Key Tenets
                </span>
              </div>

              {/* 3 Pillar Cards Grid */}
              <div className="grid grid-cols-1 gap-4">
                {doc.threeMainPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="relative p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2.5">
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                          0{idx + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                            {point.title}
                          </h4>
                          <p className="text-[11px] font-medium text-sky-600 dark:text-sky-400">
                            {point.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {point.metrics && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                            {point.metrics}
                          </span>
                        )}
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/50">
                          {point.badge}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {point.description}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800/60">
                      {point.highlights.map((highlight, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start gap-2 text-[11px] text-zinc-700 dark:text-zinc-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── SECTION 2: MAIN ARCHITECTURE DIAGRAM ── */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                      2. Interactive System Architecture Topology
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Interactive node-link graph mapping components, protocols, and data routes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Interactive React Flow Canvas */}
              <FlowDiagram data={doc.flowDiagram} />
            </div>

            {/* ── SECTION 3: TECH STACK AND THEIR USAGE ── */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                      3. Technology Stack & Implementation Usage
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Detailed breakdown of every tool in the stack, its operational usage, and engineering rationale.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  {doc.techStackUsage.length} Technologies
                </span>
              </div>

              {/* Tech Stack Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {doc.techStackUsage.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {tech.name}
                      </h4>
                      <span className="text-[9px] font-semibold uppercase px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 shrink-0">
                        {tech.category}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide block">
                          Implementation & Usage:
                        </span>
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-[11px]">
                          {tech.usage}
                        </p>
                      </div>

                      <div className="pt-1.5 border-t border-zinc-100 dark:border-zinc-800/50">
                        <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wide block">
                          Engineering Rationale:
                        </span>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                          {tech.rationale}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
