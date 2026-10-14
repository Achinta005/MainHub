"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Activity, Layers, ArrowUpRight, Compass, Monitor, Menu, X, ShieldCheck } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

interface NavbarProps {
  activeTab: "projects" | "preview" | "status" | "redirects";
  setActiveTab: (tab: "projects" | "preview" | "status" | "redirects") => void;
  liveCount: number;
  totalServices: number;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  liveCount,
  totalServices,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: "projects" as const,
      label: "Showcase",
      shortLabel: "Projects",
      icon: Compass,
      desc: "All applications & projects",
    },
    {
      id: "preview" as const,
      label: "Live Previews",
      shortLabel: "Previews",
      icon: Monitor,
      desc: "Interactive iframe sandbox",
      accent: "text-sky-500 dark:text-sky-400",
    },
    {
      id: "status" as const,
      label: "Status Page",
      shortLabel: "Status",
      icon: Activity,
      desc: "Real-time edge health telemetry",
      accent: "text-emerald-500 dark:text-emerald-400",
    },
    {
      id: "redirects" as const,
      label: "Redirects",
      shortLabel: "Routes",
      icon: Layers,
      desc: "Root vanity short links",
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Left: Brand */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 p-1.5 shadow-sm overflow-hidden shrink-0">
              <Image src="/icon.png" alt="Portal Logo" width={36} height={36} priority className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm sm:text-base tracking-tight">
                  Achinta
                </span>
                <span className="text-[10px] font-semibold tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-400 border border-sky-300 dark:border-sky-800/60 uppercase">
                  Portal
                </span>
              </div>
              <span className="text-[11px] font-medium text-zinc-500 hidden sm:block truncate max-w-[200px] lg:max-w-none">
                Infrastructure Gateway · achinta.me
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900/80 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800/80 text-xs font-medium">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-200 dark:border-zinc-700/50"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.accent ?? ""}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Telemetry & External Links */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Live Count Pill (Desktop) */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-zinc-700 dark:text-zinc-300 font-medium whitespace-nowrap">
                {liveCount}/{totalServices} Live
              </span>
            </div>

            {/* Live Status Dot Pill (Mobile & Tablet) */}
            <button
              onClick={() => setActiveTab("status")}
              className="flex md:hidden items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-[11px] font-medium text-emerald-700 dark:text-emerald-400"
              title="View live services status"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{liveCount}/{totalServices}</span>
            </button>

            {/* GitHub Profile */}
            <a
              href="https://github.com/Achinta005"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 transition-all text-xs font-medium"
              title="GitHub Profile"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-400 dark:text-zinc-500 hidden sm:block" />
            </a>

            {/* Mobile Menu Dropdown Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-900/80 md:hidden border border-zinc-200 dark:border-zinc-800 transition-colors"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Animated) */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl px-4 py-3 space-y-1.5 animate-in slide-in-from-top-2 duration-200 shadow-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                    isActive
                      ? "bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/60 font-semibold shadow-xs"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isActive
                          ? "bg-sky-100 dark:bg-sky-900/60 text-sky-600 dark:text-sky-300"
                          : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 shrink-0" />
                  )}
                </button>
              );
            })}

            {/* Quick status summary footer */}
            <div className="pt-2 mt-2 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 px-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Edge Telemetry Active</span>
              </span>
              <span className="font-mono text-[11px] text-zinc-400">
                achinta.me
              </span>
            </div>
          </div>
        )}
      </header>

      {/* Floating Mobile Bottom Tab Bar for Instant Thumb Navigation */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800/80 px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-lg shadow-black/10"
      >
        <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
                  isActive
                    ? "text-sky-600 dark:text-sky-400 font-bold bg-sky-50/70 dark:bg-sky-950/50"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 font-medium"
                }`}
              >
                <Icon
                  className={`w-4 h-4 mb-0.5 transition-transform ${
                    isActive ? "scale-110" : ""
                  }`}
                />
                <span className="text-[10px] tracking-tight">{item.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
