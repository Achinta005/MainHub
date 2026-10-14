"use client";

import React, { useState } from "react";
import { ROOT_REDIRECTS } from "@/data/projects";
import { Copy, Check, ExternalLink, ArrowRight, Layers } from "lucide-react";

export default function RedirectsView() {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const handleCopy = (source: string) => {
    const fullUrl = `https://achinta.me${source}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(source);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20 shrink-0">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Root Domain Vanity Redirects
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Clean shortcut paths routed directly through your root domain <code className="text-sky-600 dark:text-sky-400 font-semibold">achinta.me</code>.
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4">
          {ROOT_REDIRECTS.map((r) => (
            <div
              key={r.source}
              className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-zinc-50/80 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 min-w-0">
                <div className="shrink-0">
                  <span className="text-[10px] uppercase font-semibold text-zinc-500 block">
                    Source Route
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold text-sky-600 dark:text-sky-300">
                    achinta.me<span className="text-zinc-900 dark:text-white">{r.source}</span>
                  </span>
                </div>

                <ArrowRight className="w-4 h-4 text-zinc-400 dark:text-zinc-600 hidden sm:block shrink-0" />

                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-zinc-500 block">
                    Target ({r.label})
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 break-all block">
                    {r.destination}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 w-full sm:w-auto pt-2.5 sm:pt-0 border-t border-zinc-200/60 dark:border-zinc-800/60 sm:border-0 shrink-0">
                <button
                  onClick={() => handleCopy(r.source)}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium border border-zinc-200 dark:border-zinc-700/60 shadow-sm transition-colors"
                >
                  {copiedSlug === r.source ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedSlug === r.source ? "Copied" : "Copy Link"}</span>
                </button>

                <a
                  href={r.destination}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl bg-sky-50 dark:bg-sky-600/20 hover:bg-sky-100 dark:hover:bg-sky-600/30 text-sky-700 dark:text-sky-300 text-xs font-semibold border border-sky-200 dark:border-sky-500/30 transition-colors"
                >
                  <span>Test Route</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
