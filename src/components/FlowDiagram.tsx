"use client";

import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  NodeProps,
  Edge,
  Node,
  MarkerType,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Globe,
  ShieldCheck,
  Cpu,
  Database,
  Radio,
  Cloud,
  Layers,
  Maximize2,
  Minimize2,
  Sparkles,
} from "lucide-react";

export interface ArchitectureNodeData extends Record<string, unknown> {
  label: string;
  sublabel: string;
  category: "client" | "gateway" | "service" | "transport" | "database" | "external";
  tech: string[];
  description: string;
  codeLocation?: string;
  entities?: string[];
  protocols?: string[];
}

export interface ArchitectureDiagramData {
  nodes: Node<ArchitectureNodeData>[];
  edges: Edge[];
}

// Custom Node Renderer
function CustomArchitectureNode({ data, selected }: NodeProps<Node<ArchitectureNodeData>>) {
  const getCategoryStyles = () => {
    switch (data.category) {
      case "client":
        return {
          icon: <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-500" />,
          badge: "Client Tier",
          badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
          border: "border-sky-500/30 dark:border-sky-500/20",
          glow: "hover:border-sky-500/60 shadow-sky-500/5",
        };
      case "gateway":
        return {
          icon: <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />,
          badge: "Security & Ingress",
          badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
          border: "border-emerald-500/30 dark:border-emerald-500/20",
          glow: "hover:border-emerald-500/60 shadow-emerald-500/5",
        };
      case "service":
        return {
          icon: <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />,
          badge: "Microservice",
          badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
          border: "border-indigo-500/30 dark:border-indigo-500/20",
          glow: "hover:border-indigo-500/60 shadow-indigo-500/5",
        };
      case "transport":
        return {
          icon: <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />,
          badge: "Transport & Bus",
          badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
          border: "border-amber-500/30 dark:border-amber-500/20",
          glow: "hover:border-amber-500/60 shadow-amber-500/5",
        };
      case "database":
        return {
          icon: <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500" />,
          badge: "Polyglot Store",
          badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
          border: "border-cyan-500/30 dark:border-cyan-500/20",
          glow: "hover:border-cyan-500/60 shadow-cyan-500/5",
        };
      case "external":
        return {
          icon: <Cloud className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-fuchsia-500" />,
          badge: "Integration",
          badgeColor: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20",
          border: "border-fuchsia-500/30 dark:border-fuchsia-500/20",
          glow: "hover:border-fuchsia-500/60 shadow-fuchsia-500/5",
        };
      default:
        return {
          icon: <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500" />,
          badge: "Component",
          badgeColor: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
          border: "border-zinc-300 dark:border-zinc-700",
          glow: "hover:border-zinc-400",
        };
    }
  };

  const style = getCategoryStyles();

  return (
    <div
      className={`relative w-56 sm:w-64 rounded-xl p-3 sm:p-3.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border shadow-lg transition-all duration-200 cursor-pointer ${
        style.border
      } ${style.glow} ${
        selected ? "ring-2 ring-sky-500 shadow-xl shadow-sky-500/10 scale-[1.02]" : ""
      }`}
    >
      {/* Connector Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2 !h-2 sm:!w-2.5 sm:!h-2.5 !bg-sky-500 !border-2 !border-white dark:!border-zinc-900 !-left-1"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-2 !h-2 sm:!w-2.5 sm:!h-2.5 !bg-sky-500 !border-2 !border-white dark:!border-zinc-900 !-right-1"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="!w-2 !h-2 sm:!w-2.5 sm:!h-2.5 !bg-sky-500 !border-2 !border-white dark:!border-zinc-900 !-top-1"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!w-2 !h-2 sm:!w-2.5 sm:!h-2.5 !bg-sky-500 !border-2 !border-white dark:!border-zinc-900 !-bottom-1"
      />

      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1 sm:p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 shrink-0">
              {style.icon}
            </div>
            <div className="min-w-0">
              <h4 className="text-[11px] sm:text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                {data.label}
              </h4>
              <p className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                {data.sublabel}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-1 pt-1 border-t border-zinc-100 dark:border-zinc-800/60">
          <span
            className={`text-[8px] sm:text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-md border ${style.badgeColor}`}
          >
            {style.badge}
          </span>
          <div className="flex items-center gap-1 overflow-hidden">
            {data.tech.slice(0, 2).map((t) => (
              <span
                key={t}
                className="text-[8px] sm:text-[9px] font-mono px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 truncate"
              >
                {t}
              </span>
            ))}
            {data.tech.length > 2 && (
              <span className="text-[8px] sm:text-[9px] text-zinc-400 font-mono">
                +{data.tech.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const nodeTypes = {
  customArchitecture: CustomArchitectureNode,
};

interface FlowDiagramProps {
  data: ArchitectureDiagramData;
}

export default function FlowDiagram({ data }: FlowDiagramProps) {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNodeData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Escape key to close the fullscreen modal
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [isModalOpen]);

  // Default select first service node if not selected
  const initialSelected = useMemo(() => {
    return (
      data.nodes.find((n) => n.data.category === "service")?.data ||
      data.nodes[0]?.data ||
      null
    );
  }, [data.nodes]);

  const activeNode = selectedNode || initialSelected;

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.data as ArchitectureNodeData);
  };

  return (
    <>
      {/* ── STANDARD EMBEDDED DIAGRAM ── */}
      <div className="relative flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950/5 dark:bg-black/40 overflow-hidden w-full transition-all duration-300">
        {/* Top Diagram Header Bar */}
        <div className="px-3.5 sm:px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md flex items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                Interactive Microservices Topology
              </h4>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 hidden sm:block">
                Click any node to inspect modules, entities & protocols. Pan & zoom freely.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hidden sm:inline">
              {data.nodes.length} Nodes • {data.edges.length} Channels
            </span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 border border-sky-200 dark:border-sky-800/60 transition-all shadow-xs cursor-pointer active:scale-95"
              title="Open full height and width diagram modal"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Maximize</span>
            </button>
          </div>
        </div>

        {/* React Flow Canvas Container (Responsive height) */}
        <div className="h-[360px] sm:h-[460px] lg:h-[500px] w-full">
          <ReactFlow
            nodes={data.nodes}
            edges={data.edges}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            fitView
            fitViewOptions={{ padding: 0.12 }}
            minZoom={0.25}
            maxZoom={1.8}
            defaultEdgeOptions={{
              type: "smoothstep",
              animated: true,
              style: { strokeWidth: 2, stroke: "#0284c7" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#0284c7",
                width: 14,
                height: 14,
              },
            }}
            className="dark:bg-zinc-950 bg-zinc-50"
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1.2}
              className="opacity-40"
              color="currentColor"
            />
            <Controls
              className="!bg-white dark:!bg-zinc-900 !border !border-zinc-200 dark:!border-zinc-800 !rounded-xl !shadow-lg"
              showInteractive={false}
            />
          </ReactFlow>
        </div>

        {/* Selected Node Deep Inspector */}
        {activeNode && (
          <div className="p-3.5 sm:p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-3">
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800/60">
                    {activeNode.category}
                  </span>
                  <h5 className="text-xs sm:text-sm font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                    {activeNode.label}
                  </h5>
                  <span className="text-[11px] sm:text-xs text-zinc-500 font-mono">
                    ({activeNode.sublabel})
                  </span>
                  {activeNode.codeLocation && (
                    <span className="text-[10px] sm:text-[11px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                      📂 {activeNode.codeLocation}
                    </span>
                  )}
                </div>

                <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {activeNode.description}
                </p>
              </div>

              {/* Quick Specs for Selected Node */}
              <div className="flex flex-wrap sm:flex-col gap-1.5 sm:gap-2 sm:items-end shrink-0 sm:border-l sm:border-zinc-200 dark:sm:border-zinc-800 sm:pl-4">
                <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                  {activeNode.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {activeNode.protocols && activeNode.protocols.length > 0 && (
                  <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                    <span>Protocols:</span>
                    <span className="font-semibold text-sky-600 dark:text-sky-400">
                      {activeNode.protocols.join(", ")}
                    </span>
                  </div>
                )}

                {activeNode.entities && activeNode.entities.length > 0 && (
                  <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                    <span>Entities:</span>
                    <span className="text-zinc-700 dark:text-zinc-300">
                      {activeNode.entities.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── SINGLE FULL HEIGHT + WIDTH MODAL (PORTALED DIRECTLY TO BODY) ── */}
      {isModalOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex flex-col w-screen h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-hidden select-none animate-in fade-in duration-200">
            {/* Fullscreen Header */}
            <div className="px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md flex items-center justify-between gap-3 shrink-0 shadow-sm">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20 shadow-xs shrink-0">
                  <Layers className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight truncate">
                      Topology Canvas
                    </h3>
                    <span className="text-[9px] sm:text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800/60 shrink-0">
                      Full View
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 hidden sm:block">
                    Interactive topology with pan, pinch-to-zoom, and deep component inspection.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono hidden md:inline">
                  {data.nodes.length} Nodes • {data.edges.length} Channels • Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[10px] text-zinc-700 dark:text-zinc-300">Esc</kbd> to exit
                </span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700/80 transition-all text-xs font-bold shadow-xs cursor-pointer active:scale-95"
                  title="Exit Fullscreen (Esc)"
                >
                  <Minimize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Exit Fullscreen</span>
                  <span className="sm:hidden">Exit</span>
                </button>
              </div>
            </div>

            {/* Giant Fullscreen React Flow Canvas */}
            <div className="flex-1 w-full min-h-0 relative bg-zinc-50 dark:bg-zinc-950">
              <ReactFlow
                nodes={data.nodes}
                edges={data.edges}
                nodeTypes={nodeTypes}
                onNodeClick={onNodeClick}
                fitView
                fitViewOptions={{ padding: 0.12 }}
                minZoom={0.2}
                maxZoom={2.4}
                defaultEdgeOptions={{
                  type: "smoothstep",
                  animated: true,
                  style: { strokeWidth: 2.2, stroke: "#0284c7" },
                  markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: "#0284c7",
                    width: 16,
                    height: 16,
                  },
                }}
                className="bg-zinc-50 dark:bg-zinc-950"
              >
                <Background
                  variant={BackgroundVariant.Dots}
                  gap={24}
                  size={1.4}
                  className="opacity-40"
                  color="currentColor"
                />
                <Controls
                  className="!bg-white dark:!bg-zinc-900 !border !border-zinc-200 dark:!border-zinc-800 !rounded-xl !shadow-2xl"
                  showInteractive={false}
                />
                <MiniMap
                  nodeStrokeWidth={3}
                  zoomable
                  pannable
                  className="!bg-white/95 dark:!bg-zinc-900/95 !border !border-zinc-200 dark:!border-zinc-800 !rounded-2xl !shadow-2xl !overflow-hidden hidden md:block"
                  maskColor="rgba(0, 0, 0, 0.45)"
                  nodeColor={(n) => {
                    switch (n.data?.category) {
                      case "client":
                        return "#0ea5e9";
                      case "gateway":
                        return "#10b981";
                      case "service":
                        return "#6366f1";
                      case "transport":
                        return "#f59e0b";
                      case "database":
                        return "#06b6d4";
                      case "external":
                        return "#d946ef";
                      default:
                        return "#71717a";
                    }
                  }}
                />
              </ReactFlow>
            </div>

            {/* Bottom Node Inspector in Fullscreen Modal (Scrollable on mobile) */}
            {activeNode && (
              <div className="px-4 sm:px-6 py-3 sm:py-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shrink-0 shadow-lg max-h-[35vh] sm:max-h-none overflow-y-auto pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3">
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800/60">
                        {activeNode.category}
                      </span>
                      <h5 className="text-xs sm:text-sm font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                        {activeNode.label}
                      </h5>
                      <span className="text-[11px] sm:text-xs text-zinc-500 font-mono">
                        ({activeNode.sublabel})
                      </span>
                      {activeNode.codeLocation && (
                        <span className="text-[10px] sm:text-[11px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                          📂 {activeNode.codeLocation}
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-5xl">
                      {activeNode.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0 lg:border-l lg:border-zinc-200 dark:lg:border-zinc-800 lg:pl-5">
                    <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                      {activeNode.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {activeNode.protocols && activeNode.protocols.length > 0 && (
                      <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-zinc-500 font-mono">
                        <span>Protocols:</span>
                        <span className="font-semibold text-sky-600 dark:text-sky-400">
                          {activeNode.protocols.join(", ")}
                        </span>
                      </div>
                    )}

                    {activeNode.entities && activeNode.entities.length > 0 && (
                      <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-zinc-500 font-mono">
                        <span>Entities:</span>
                        <span className="text-zinc-700 dark:text-zinc-300">
                          {activeNode.entities.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>,
          document.body
        )}
    </>
  );
}
