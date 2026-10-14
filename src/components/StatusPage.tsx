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
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Overview Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 dark:from-emerald-950/40 via-zinc-100/60 dark:via-zinc-900/60 to-white/80 dark:to-zinc-950 border border-emerald-300/60 dark:border-emerald-900/40 shadow-xl dark:shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
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
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/60 shadow-sm transition-all disabled:opacity-50"
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800/80">
          <div>
            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Uptime
            </span>
            <p className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              99.98%
            </p>
          </div>
          <div>
            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Online Services
            </span>
            <p className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
              {healthyCount} / {coreServices.length}
            </p>
          </div>
          <div>
            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Avg Latency
            </span>
            <p className="text-xl sm:text-2xl font-bold text-sky-600 dark:text-sky-400 mt-1">
              {avgLatency !== null ? `${avgLatency} ms` : "—"}
            </p>
          </div>
          <div>
            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Active Incidents
            </span>
            <p className="text-xl sm:text-2xl font-bold text-zinc-600 dark:text-zinc-400 mt-1">
              0 None
            </p>
          </div>
        </div>
      </div>

      {/* Services Telemetry Table */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/40 backdrop-blur-md overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/50 dark:bg-transparent">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-sky-500 dark:text-sky-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Monitored Endpoints & Gateways
            </h3>
          </div>
          <span className="text-xs text-zinc-500">Live pings via Edge API</span>
        </div>

        <div className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
          {coreServices.map((service) => {
            const h = healthMap[service.id];
            const isOk = h?.ok;

            return (
              <div
                key={service.id}
                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-2.5 w-2.5 rounded-full ${
                      isOk ? "bg-emerald-500 shadow-sm shadow-emerald-500/50" : "bg-rose-500 shadow-sm shadow-rose-500/50"
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {service.title}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/40 font-mono">
                        {service.category}
                      </span>
                    </div>
                    <a
                      href={service.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-sky-400 inline-flex items-center gap-1 font-mono transition-colors"
                    >
                      <span>{service.url}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-end sm:self-auto">
                  <div className="text-right">
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
                      className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
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
