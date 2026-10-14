"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/data/projects";
import {
  X,
  ExternalLink,
  RotateCw,
  Monitor,
  Tablet,
  Smartphone,
  ShieldAlert,
  Copy,
  Check,
  Globe,
} from "lucide-react";

interface LivePreviewModalProps {
  project: Project | null;
  onClose: () => void;
}

type DeviceMode = "desktop" | "tablet" | "mobile";

export default function LivePreviewModal({ project, onClose }: LivePreviewModalProps) {
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  }, [project, device]);

  if (!project) return null;

  const targetUrl = project.previewUrl || project.url;

  const handleCopy = () => {
    if (targetUrl) {
      navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getContainerWidth = () => {
    switch (device) {
      case "mobile":
        return "w-[390px] h-[780px] max-h-full rounded-3xl border-4 border-zinc-300 dark:border-zinc-800 shadow-2xl";
      case "tablet":
        return "w-[768px] h-[820px] max-h-full rounded-2xl border-4 border-zinc-300 dark:border-zinc-800 shadow-2xl";
      case "desktop":
      default:
        return "w-full h-full min-h-[600px] rounded-b-xl border border-zinc-200 dark:border-zinc-800 shadow-inner flex flex-col";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full h-[95vh] max-w-7xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl transition-colors duration-200">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-zinc-50/90 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 text-sky-600 dark:text-sky-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 border border-sky-300 dark:border-sky-800/50">
                  {project.category}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block truncate max-w-md">
                {targetUrl || "Local Project"}
              </p>
            </div>
          </div>

          {/* Device Controls */}
          {project.allowIframe && targetUrl && (
            <div className="flex items-center gap-1 bg-zinc-200/70 dark:bg-zinc-950 p-1 rounded-lg border border-zinc-300/80 dark:border-zinc-800">
              <button
                onClick={() => setDevice("desktop")}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  device === "desktop"
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice("tablet")}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  device === "tablet"
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice("mobile")}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  device === "mobile"
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {targetUrl && (
              <>
                <button
                  onClick={() => setIframeKey((k) => k + 1)}
                  className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                  title="Reload Iframe"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopy}
                  className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                  title="Copy Direct URL"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors shadow-sm"
                >
                  <span>Launch</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 rounded-lg transition-colors ml-1"
              title="Close Preview (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport Body */}
        <div className="relative flex-1 w-full bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center p-2 sm:p-4 overflow-auto transition-colors">
          {project.allowIframe && targetUrl ? (
            <div className={`relative transition-all duration-300 overflow-hidden ${getContainerWidth()}`}>
              {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm gap-3">
                  <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading {targetUrl}...</p>
                </div>
              )}
              <iframe
                key={iframeKey}
                src={targetUrl}
                title={project.title}
                className="w-full h-full min-h-[600px] flex-1 bg-white dark:bg-zinc-900 border-0 block"
                onLoad={() => setIsLoading(false)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          ) : (
            <div className="max-w-md p-8 text-center bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:text-amber-400 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  External Launch Required
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {project.category === "Backend & APIs"
                    ? "This service is a backend engine with restrictive origin policies."
                    : project.category === "Desktop Apps"
                    ? "This is a native client application built with Tauri & Rust."
                    : "This application restricts iframe embedding via Content-Security-Policy."}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 w-full mt-2">
                {targetUrl && (
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-colors shadow-sm"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl transition-colors border border-zinc-200 dark:border-zinc-700"
                  >
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
