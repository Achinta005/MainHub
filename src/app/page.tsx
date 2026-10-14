"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import LivePreviewModal from "@/components/LivePreviewModal";
import LivePreviewView from "@/components/LivePreviewView";
import StatusPage from "@/components/StatusPage";
import RedirectsView from "@/components/RedirectsView";
import ProjectDocPanel from "@/components/ProjectDocPanel";
import { PROJECTS, Project } from "@/data/projects";
import { Search, X, Server } from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"projects" | "preview" | "status" | "redirects">("projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [docProject, setDocProject] = useState<Project | null>(null);
  const [healthMap, setHealthMap] = useState<
    Record<string, { ok: boolean; latencyMs: number | null; status: number }>
  >({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input on '/' key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch health telemetry for core services
  const pingServices = async () => {
    setIsRefreshing(true);
    const coreProjects = PROJECTS.filter((p) => p.isCoreService && p.url);

    const results = await Promise.all(
      coreProjects.map(async (project) => {
        try {
          const res = await fetch(`/api/health-check?url=${encodeURIComponent(project.url!)}`);
          const data = await res.json();
          return { id: project.id, data };
        } catch {
          return {
            id: project.id,
            data: { ok: false, latencyMs: null, status: 0 },
          };
        }
      })
    );

    const newMap: Record<string, { ok: boolean; latencyMs: number | null; status: number }> = {};
    results.forEach((r) => {
      newMap[r.id] = r.data;
    });

    setHealthMap(newMap);
    setIsRefreshing(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    pingServices();
  }, []);

  const categories = [
    "All",
    "Web Apps",
    "Desktop Apps",
    "Mobile Apps",
    "Backend & APIs",
    "Libraries",
    "Extensions",
    "Utilities",
  ];

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery =
      project.title.toLowerCase().includes(q) ||
      project.tagline.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.tags.some((t) => t.toLowerCase().includes(q)) ||
      (project.vanitySlug ? project.vanitySlug.toLowerCase().includes(q) : false) ||
      String(project.order) === q ||
      `#${project.order}` === q;

    return matchesCategory && matchesQuery;
  }).sort((a, b) => a.order - b.order);

  const coreServices = PROJECTS.filter((p) => p.isCoreService && p.url);
  const liveCount = coreServices.filter((p) => healthMap[p.id]?.ok).length;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200 selection:bg-sky-500/30 selection:text-sky-800 dark:selection:text-sky-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        liveCount={liveCount}
        totalServices={coreServices.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-12 pb-24 sm:pb-16 md:pb-12">
        {/* Showcase Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6 sm:space-y-10 animate-in fade-in duration-300">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-4 px-1">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:via-zinc-100 dark:to-zinc-400">
                Showcase & Infrastructure Hub
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                Explore production web applications, desktop command tools, microservices, and live browser extensions running under the root domain.
              </p>
            </div>

            {/* Centered Search Bar & Category Controls */}
            <div className="max-w-2xl mx-auto space-y-3.5 sm:space-y-4">
              <div className="relative">
                <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, stacks, tags... (Press / to focus)"
                  className="w-full pl-10 sm:pl-11 pr-10 sm:pr-12 py-3 sm:py-3.5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 focus:border-sky-500/60 focus:ring-4 focus:ring-sky-500/10 text-base sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition-all shadow-lg sm:shadow-xl shadow-zinc-200/50 dark:shadow-black/40 backdrop-blur-md"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Pills (Horizontal scroll on mobile, wrap on tablet/desktop) */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const count =
                    cat === "All"
                      ? PROJECTS.length
                      : PROJECTS.filter((p) => p.category === cat).length;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                          : "bg-white dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800/80 shadow-xs"
                      }`}
                    >
                      {cat} <span className="opacity-60 ml-0.5">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-1 sm:pt-2">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onPreview={(p) => setPreviewProject(p)}
                    onSelect={(p) => setDocProject(p)}
                    health={healthMap[project.id]}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/20 max-w-md mx-auto">
                <Server className="w-10 h-10 text-zinc-400 dark:text-zinc-600 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
                  No matching projects found
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Try adjusting your search terms or selecting another category filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 px-3 py-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 dark:hover:bg-sky-900/50 rounded-lg border border-sky-200 dark:border-sky-800/50 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Live Previews Tab */}
        {activeTab === "preview" && (
          <LivePreviewView projects={PROJECTS} />
        )}

        {/* Status Page Tab */}
        {activeTab === "status" && (
          <StatusPage
            projects={PROJECTS}
            healthMap={healthMap}
            onRefresh={pingServices}
            isRefreshing={isRefreshing}
          />
        )}

        {/* Redirects View Tab */}
        {activeTab === "redirects" && <RedirectsView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md py-6 sm:py-8 pb-20 md:pb-8 mt-10 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Achinta Portal</span>
            <span className="hidden sm:inline">·</span>
            <span>All systems routed via root domain <strong className="text-zinc-800 dark:text-zinc-400">achinta.me</strong></span>
          </div>

          <div className="flex items-center flex-wrap justify-center gap-x-4 gap-y-2">
            <button
              onClick={() => setActiveTab("preview")}
              className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
            >
              Live Previews
            </button>
            <button
              onClick={() => setActiveTab("status")}
              className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
            >
              System Health
            </button>
            <button
              onClick={() => setActiveTab("redirects")}
              className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
            >
              Root Redirects
            </button>
            <a
              href="https://github.com/Achinta005"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
            >
              GitHub Profile
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Live Preview Modal */}
      <LivePreviewModal
        project={previewProject}
        onClose={() => setPreviewProject(null)}
      />

      {/* Interactive Architecture & Documentation Panel */}
      <ProjectDocPanel
        project={docProject}
        onClose={() => setDocProject(null)}
        onPreview={(p) => setPreviewProject(p)}
        health={docProject ? healthMap[docProject.id] : undefined}
      />
    </div>
  );
}
