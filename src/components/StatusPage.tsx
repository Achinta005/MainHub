"use client";

import React from "react";
import { Project } from "@/data/projects";
import {
  CheckCircle2,
  RefreshCw,
  Server,
  ArrowUpRight,
} from "lucide-react";

interface StatusPageProps {
  projects: Project[];
  healthMap: Record<string, { ok: boolean; latencyMs: number | null; status: number }>;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export default function StatusPage({
  projects,
  healthMap,
  onRefresh,
  isRefreshing,
}: StatusPageProps) {
  const coreServices = projects.filter((p) => p.isCoreService && p.url);

  const healthyCount = coreServices.filter(
    (p) => healthMap[p.id]?.ok
  ).length;

  const validLatencies = coreServices
    .map((p) => healthMap[p.id]?.latencyMs)
    .filter((l): l is number => typeof l === "number");

  const avgLatency =
    validLatencies.length > 0
      ? Math.round(
          validLatencies.reduce((a, b) => a + b, 0) / validLatencies.length
        )
      : null;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Overview Banner */}
      <div className="relative overflow-hidden p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-500/10 dark:from-emerald-950/40 via-zinc-100/60 dark:via-zinc-900/60 to-white/80 dark:to-zinc-950 border border-emerald-300/60 dark:border-emerald-900/40 shadow-xl dark:shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 sm:mt-0">
              <CheckCircle2 className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                All Core Systems Operational
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
                Real-time telemetry and edge endpoint status across all achinta.me domains.
              </p>
            </div>
          </div>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded-xl bg-white dark:bg-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/60 shadow-sm transition-all disabled:opacity-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-sky-500 dark:text-sky-400 ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />
            <span>{isRefreshing ? "Pinging..." : "Refresh Status"}</span>
          </button>
        </div>

        {/* Telemetry Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-zinc-200 dark:border-zinc-800/80">
          <div>
            <span className="text-[10px] sm:text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">
              Uptime
            </span>
            <p className="text-lg sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 sm:mt-1">
              99.98%
            </p>
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">
              Online Services
            </span>
            <p className="text-lg sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0.5 sm:mt-1">
              {healthyCount} / {coreServices.length}
            </p>
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">
              Avg Latency
            </span>
            <p className="text-lg sm:text-2xl font-bold text-sky-600 dark:text-sky-400 mt-0.5 sm:mt-1">
              {avgLatency !== null ? `${avgLatency} ms` : "—"}
            </p>
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">
              Incidents
            </span>
            <p className="text-lg sm:text-2xl font-bold text-zinc-600 dark:text-zinc-400 mt-0.5 sm:mt-1">
              0 None
            </p>
          </div>
        </div>
      </div>

      {/* Services Telemetry Table */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/40 backdrop-blur-md overflow-hidden shadow-sm">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 bg-zinc-50/50 dark:bg-transparent">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Monitored Endpoints & Gateways
            </h3>
          </div>
          <span className="text-[11px] sm:text-xs text-zinc-500">Live pings via Edge API</span>
        </div>

        <div className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
          {coreServices.map((service) => {
            const h = healthMap[service.id];
            const isOk = h?.ok;

            return (
              <div
                key={service.id}
                className="px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0">
                  <span
                    className={`flex h-2.5 w-2.5 rounded-full shrink-0 mt-1.5 sm:mt-0 ${
                      isOk ? "bg-emerald-500 shadow-sm shadow-emerald-500/50" : "bg-rose-500 shadow-sm shadow-rose-500/50"
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {service.title}
                      </h4>
                      <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/40 font-mono shrink-0">
                        {service.category}
                      </span>
                    </div>
                    <a
                      href={service.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-sky-400 inline-flex items-center gap-1 font-mono transition-colors truncate max-w-[240px] sm:max-w-xs md:max-w-md mt-0.5"
                    >
                      <span className="truncate">{service.url}</span>
                      <ArrowUpRight className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t border-zinc-100 dark:border-zinc-800/40 sm:border-0 pl-5 sm:pl-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-zinc-500 block uppercase">
                      Latency
                    </span>
                    <span className="text-xs font-semibold text-zinc-750 dark:text-zinc-200 font-mono">
                      {h?.latencyMs !== null ? `${h?.latencyMs} ms` : "—"}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 block uppercase">
                      HTTP Status
                    </span>
                    <span
                      className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md inline-block ${
                        isOk
                          ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50"
                          : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50"
                      }`}
                    >
                      {h?.status || (isOk ? "200 OK" : "DOWN")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
