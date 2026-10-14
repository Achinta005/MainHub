"use client";

import React, { useState } from "react";
import { Project } from "@/data/projects";
import {
  ExternalLink,
  Play,
  Mail,
  Terminal,
  Cloud,
  Server,
  Music,
  Clock,
  Zap,
  Copy,
  Check,
  Search,
  Smartphone,
  Users,
  Scale,
  Monitor,
  Brain,
  Sparkles,
  Activity,
  Link2,
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

interface ProjectCardProps {
  project: Project;
  onPreview: (project: Project) => void;
  health?: { ok: boolean; latencyMs: number | null; status: number };
}

export default function ProjectCard({
  project,
  onPreview,
  health,
}: ProjectCardProps) {
  const [copied, setCopied] = useState(false);

  const renderIcon = () => {
    switch (project.iconType) {
      case "mail":
        return <Mail className="w-5 h-5 text-sky-500 dark:text-sky-400" />;
      case "terminal":
        return <Terminal className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />;
      case "cloud":
        return <Cloud className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />;
      case "server":
        return <Server className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />;
      case "spotify":
        return <Music className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />;
      case "clock":
        return <Clock className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
      case "bolt":
        return <Zap className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />;
      case "search":
        return <Search className="w-5 h-5 text-purple-500 dark:text-purple-400" />;
      case "smartphone":
        return <Smartphone className="w-5 h-5 text-violet-500 dark:text-violet-400" />;
      case "users":
        return <Users className="w-5 h-5 text-teal-500 dark:text-teal-400" />;
      case "scale":
        return <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case "monitor":
        return <Monitor className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />;
      case "brain":
        return <Brain className="w-5 h-5 text-fuchsia-500 dark:text-fuchsia-400" />;
      case "sparkles":
        return <Sparkles className="w-5 h-5 text-pink-500 dark:text-pink-400" />;
      case "activity":
        return <Activity className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />;
      case "link":
        return <Link2 className="w-5 h-5 text-blue-500 dark:text-blue-400" />;
      default:
        return <Server className="w-5 h-5 text-sky-500 dark:text-sky-400" />;
    }
  };

  const handleCopyVanity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project.vanitySlug) return;
    const fullVanity = `https://achinta.me${project.vanitySlug}`;
    navigator.clipboard.writeText(fullVanity);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const showPreview =
    project.category === "Web Apps" && project.allowIframe && !!project.url;

  return (
    <div className="group relative flex flex-col justify-between p-6 bg-white/80 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-900/80 border border-zinc-200/90 dark:border-zinc-800/80 hover:border-sky-500/40 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl dark:hover:shadow-2xl hover:shadow-sky-500/5 backdrop-blur-md">
      <div>
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 shadow-inner">
              {renderIcon()}
            </div>
            <div>
              <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide uppercase">
                {project.category}
              </span>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors tracking-tight">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Health Telemetry Badge (shown only if url is monitored) */}
          {health && project.url && (
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                health.ok
                  ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400"
                  : "bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-400"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  health.ok ? "bg-emerald-500 dark:bg-emerald-400 animate-pulse" : "bg-rose-500 dark:bg-rose-400"
                }`}
              />
              <span>{health.ok ? `${health.latencyMs ?? 0}ms` : "Down"}</span>
            </div>
          )}
        </div>

        {/* Tagline & Description */}
        <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 mb-2">
          {project.tagline}
        </p>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-4">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer / Vanity & Action Buttons */}
      <div className="space-y-3 pt-3 border-t border-zinc-200 dark:border-zinc-800/60">
        {/* Vanity Redirect Pill - Hidden if not found without error */}
        {project.vanitySlug && project.url && (
          <button
            onClick={handleCopyVanity}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors group/vanity"
            title="Click to copy root vanity link"
          >
            <span className="font-mono text-zinc-600 dark:text-zinc-400">
              achinta.me<span className="text-sky-600 dark:text-sky-400 font-semibold">{project.vanitySlug}</span>
            </span>
            <span className="flex items-center gap-1 text-[10px] text-zinc-500 group-hover/vanity:text-zinc-700 dark:group-hover/vanity:text-zinc-300">
              {copied ? (
                <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              <span>{copied ? "Copied" : "Copy"}</span>
            </span>
          </button>
        )}

        {/* Buttons - Preview shown ONLY for Web Apps type */}
        {showPreview || project.url || project.githubUrl ? (
          <div className="flex items-center gap-2">
            {showPreview && (
              <button
                onClick={() => onPreview(project)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sky-50 dark:bg-sky-600/20 hover:bg-sky-100 dark:hover:bg-sky-600/30 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30 text-xs font-semibold transition-all"
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
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium border border-zinc-300 dark:border-zinc-700/60 transition-all"
              >
                <span>Launch</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-300 dark:border-zinc-700/60 transition-all"
                title="View Source on GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between text-[11px] text-zinc-500 py-1 font-mono">
            <span>Local / Device Workspace</span>
            <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-400">
              Offline App
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
