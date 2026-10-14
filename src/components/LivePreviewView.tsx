"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/data/projects";
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  ExternalLink,
  Copy,
  Check,
  Globe,
  ShieldAlert,
} from "lucide-react";

interface LivePreviewViewProps {
  projects: Project[];
  initialProject?: Project;
}

type DeviceMode = "desktop" | "tablet" | "mobile";

export default function LivePreviewView({
  projects,
  initialProject,
}: LivePreviewViewProps) {
  const previewable = projects.filter(
    (p) => p.category === "Web Apps" && p.url && p.allowIframe
  );
  const [selectedProject, setSelectedProject] = useState<Project>(
    initialProject || previewable[0] || projects[0]
  );
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  }, [selectedProject, device]);

  const targetUrl = selectedProject.previewUrl || selectedProject.url;

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
        return "w-full h-full min-h-[750px] rounded-2xl border border-zinc-200 dark:border-zinc-800/80 shadow-lg";
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Workspace Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 backdrop-blur-xl shadow-sm">
        {/* Left: App Switcher Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 max-w-full">
          {previewable.map((p) => {
            const isSelected = selectedProject.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                    : "bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-700/40"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Center: Device Switcher */}
        {selectedProject.allowIframe && targetUrl && (
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setDevice("desktop")}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                device === "desktop"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
              title="Desktop View (100%)"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice("tablet")}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                device === "tablet"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                device === "mobile"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
              title="Mobile View (390px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {targetUrl && (
            <>
              <button
                onClick={() => setIframeKey((k) => k + 1)}
                className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700/60 transition-colors"
                title="Reload Preview"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleCopy}
                className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700/60 transition-colors"
                title="Copy Direct Link"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
              <a
                href={targetUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-sm transition-colors"
              >
                <span>Launch App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </>
          )}
        </div>
      </div>

      {/* Main Preview Canvas */}
      <div className="relative h-[820px] min-h-[750px] w-full rounded-3xl bg-zinc-100/60 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/80 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
        {selectedProject.allowIframe && targetUrl ? (
          <div className={`relative transition-all duration-300 overflow-hidden flex flex-col ${getContainerWidth()}`}>
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm gap-3">
                <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading {targetUrl}...</p>
              </div>
            )}
            <iframe
              key={iframeKey}
              src={targetUrl}
              title={selectedProject.title}
              className="w-full h-full min-h-[750px] flex-1 bg-white dark:bg-zinc-900 border-0 block"
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
                Direct Launch Only
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {selectedProject.category === "Backend & APIs"
                  ? "This service is an API hub with strict CORS and origin security policies."
                  : selectedProject.category === "Desktop Apps"
                  ? "This is a native client application built with Tauri & Rust."
                  : "This application restricts third-party iframe embedding."}
              </p>
            </div>
            {targetUrl && (
              <a
                href={targetUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-colors"
              >
                <span>Open in Dedicated Window</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
