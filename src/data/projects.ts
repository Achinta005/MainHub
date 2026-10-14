export interface Project {
  id: string;
  order: number;
  title: string;
  tagline: string;
  description: string;
  category: "Web Apps" | "Backend & APIs" | "Desktop Apps" | "Mobile Apps" | "Libraries" | "Extensions" | "Utilities";
  tags: string[];
  url?: string;
  vanitySlug?: string; // e.g. "/mail" -> achinta.me/mail (optional: hidden if not found)
  githubUrl?: string;
  allowIframe?: boolean; // shown only for Web Apps type
  previewUrl?: string;
  isCoreService?: boolean; // included in status telemetry pings
  iconType: "mail" | "terminal" | "cloud" | "server" | "spotify" | "clock" | "bolt" | "github" | "search" | "smartphone" | "users" | "scale" | "monitor" | "brain" | "sparkles" | "activity" | "link";
}

const RAW_PROJECTS: Project[] = [
  {
    id: "ficxus",
    order: 1,
    title: "Ficxus Backend Engine",
    tagline: "Multi-tenant unified enterprise backend & microservices hub",
    description:
    "Enterprise backend ecosystem centralizing multi-database persistence, asynchronous queues, real-time WebSockets, microservices, and AI pipeline orchestration.",
    category: "Backend & APIs",
    tags: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "Microservices", "Docker"],
    url: "https://server.achinta.me/api",
    vanitySlug: "/ficxus",
    githubUrl: "https://github.com/Achinta005/Ficxus",
    allowIframe: false,
    previewUrl: "https://server.achinta.me/api/docs",
    isCoreService: true,
    iconType: "server",
  },
  {
    id: "portfolio",
    order: 5,
    title: "Interactive 3D Portfolio",
    tagline: "Dual-mode interactive 3D WebGL experience & personal digital portfolio",
    description:
      "Personal developer portfolio built with Next.js 16, React 19, and Three.js/R3F. Features an adaptive dual-engine interface: an immersive 3D WebGL interactive workspace and a high-performance responsive mode with Lenis smooth scrolling.",
    category: "Web Apps",
    tags: ["Next.js 16", "React 19", "Three.js", "R3F", "Tailwind CSS v4", "Framer Motion", "GSAP", "Lenis"],
    url: "https://portfolio.achinta.me",
    vanitySlug: "/portfolio",
    githubUrl: "https://github.com/Achinta005/Portfolio",
    allowIframe: true,
    previewUrl: "https://portfolio.achinta.me",
    isCoreService: true,
    iconType: "sparkles",
  },
  {
    id: "devcollab",
    order: 10,
    title: "DevCollab",
    tagline: "Real-time collaborative cloud IDE, Monaco code editor & terminal sync",
    description:
      "A comprehensive real-time developer collaboration platform combining Monaco code editing with Yjs CRDTs, multi-user presence, integrated web terminals, local file sync agent, and project communication.",
    category: "Web Apps",
    tags: ["Next.js 16", "React 19", "Monaco Editor", "Yjs", "WebSockets", "Xterm.js", "Tailwind CSS"],
    url: "https://devcollab.achinta.me",
    vanitySlug: "/collab",
    githubUrl: "https://github.com/Achinta005/DevCollab",
    allowIframe: true,
    previewUrl: "https://devcollab.achinta.me",
    isCoreService: true,
    iconType: "users",
  },
  {
    id: "polymind",
    order: 15,
    title: "PolyMind",
    tagline: "AI research assistant, document embeddings & semantic intelligence",
    description:
      "Enterprise AI research assistant and document intelligence platform. Features multi-format document parsing, high-dimensional vector embeddings, gRPC AI pipeline orchestration, and semantic multi-turn Q&A.",
    category: "Web Apps",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "AI/NLP", "gRPC", "Vector Embeddings"],
    url: "https://polymind.achinta.me",
    vanitySlug: "/polymind",
    githubUrl: "https://github.com/Achinta005/PolyMind",
    allowIframe: true,
    previewUrl: "https://polymind.achinta.me",
    isCoreService: true,
    iconType: "brain",
  },  {
    id: "legallens",
    order: 20,
    title: "LegalLens",
    tagline: "AI-powered legal contract review, clause risk analysis & intelligence platform",
    description:
      "Enterprise legal contract review platform featuring split-screen clause viewer, bounding-box overlays, semantic Q&A chat, multi-contract cross queries, and role-based access control.",
    category: "Web Apps",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "AI/NLP", "Zustand"],
    url: "https://legallens.achinta.me",
    vanitySlug: "/legal",
    githubUrl: "https://github.com/Achinta005/legal-lens",
    allowIframe: true,
    previewUrl: "https://legallens.achinta.me",
    isCoreService: true,
    iconType: "scale",
  },
    {
    id: "url-shortener",
    order: 25,
    title: "Shortly URL Shortener",
    tagline: "High-performance link management, short URL redirection & click analytics",
    description:
      "Full-stack link shortener and click telemetry platform built with Next.js 16, React 19, and Node.js. Features custom alias creation, instant redirection, visit telemetry, and Recharts traffic analytics.",
    category: "Web Apps",
    tags: ["Next.js 16", "React 19", "Node.js", "Express", "Tailwind CSS v4", "Recharts", "MongoDB"],
    url: "https://shortly.achinta.me",
    vanitySlug: "/shortly",
    githubUrl: "https://github.com/Achinta005/Url-Shortener",
    allowIframe: true,
    previewUrl: "https://shortly.achinta.me",
    isCoreService: true,
    iconType: "link",
  },
    {
    id: "ai-event-search",
    order: 30,
    title: "AI Event Search",
    tagline: "Natural language cross-database query platform with live SSE streaming",
    description:
      "Intelligent search system that transforms natural language queries into cross-database execution (SQL & NoSQL) with real-time SSE progress streaming and JWT double-token authentication.",
    category: "Web Apps",
    tags: ["Next.js", "TypeScript", "Node.js", "AI/NLP", "PostgreSQL", "MongoDB", "SSE", "JWT"],
    url: "https://ai-search.achinta.me",
    vanitySlug: "/search",
    githubUrl: "https://github.com/Achinta005/ai-event-search",
    allowIframe: true,
    previewUrl: "https://ai-search.achinta.me",
    isCoreService: true,
    iconType: "search",
  },
  {
    id: "groq-proxy",
    order: 35,
    title: "Groq Proxy Gateway",
    tagline: "Ultra-low-latency Groq AI inference reverse proxy & streaming bridge",
    description:
      "A dedicated, high-speed reverse proxy and gateway service for Groq LLM inference APIs, managing secure CORS headers, token streaming, and API routing.",
    category: "Backend & APIs",
    tags: ["Node.js", "Express", "Groq AI", "Reverse Proxy", "REST API"],
    url: "https://groq-proxy-0t5r.onrender.com",
    vanitySlug: "/groq",
    githubUrl: "https://github.com/Achinta005/groq-proxy",
    allowIframe: false,
    isCoreService: true,
    iconType: "bolt",
  },
    {
    id: "pulsewire",
    order: 40,
    title: "Pulsewire",
    tagline: "Lightweight, non-blocking telemetry & live log streaming client library",
    description:
      "High-throughput, dependency-minimal multi-language library (Node.js & Python) that buffers and batches live application logs from any service to a central collector server with zero blocking or crash risk.",
    category: "Libraries",
    tags: ["Node.js", "Python", "TypeScript", "FastAPI", "Express", "Logging", "Telemetry"],
    iconType: "activity",
  },
    {
    id: "omnicon",
    order: 45,
    title: "Omnicon",
    tagline: "Native desktop control center, CMS admin suite & system observability hub",
    description:
      "High-performance native desktop command suite built with Tauri v2 and React 19. Features CMS management, visitor analytics & IP tracking, real-time activity audit logs, and multimedia toolkits.",
    category: "Desktop Apps",
    tags: ["Tauri v2", "Rust", "React 19", "TypeScript", "Tailwind CSS", "Recharts", "Vite"],
    iconType: "monitor",
  },
    {
    id: "apex",
    order: 50,
    title: "Apex",
    tagline: "Cross-platform Android & Desktop local Wi-Fi P2P sync and cloud music hub",
    description:
      "A multipurpose application for Android and Desktop featuring cloud music library sync with offline storage, and zero-internet local Wi-Fi P2P direct file sharing between mobile phone and PC.",
    category: "Mobile Apps",
    tags: ["Capacitor", "Android", "Next.js", "React", "TypeScript", "P2P", "Wi-Fi Direct"],
    iconType: "smartphone",
  },
    {
    id: "achinta-nexus",
    order: 55,
    title: "Achinta Nexus",
    tagline: "Desktop command center & base domain infrastructure visualizer",
    description:
      "Native desktop command hub built with Tauri v2 and Rust. Features real-time system architecture topology visualizer, terminal telemetry, and service launcher.",
    category: "Desktop Apps",
    tags: ["Tauri v2", "Rust", "Next.js 16", "React 19", "Tailwind v4"],
    vanitySlug: "/nexus",
    githubUrl: "https://github.com/Achinta005/Achinta-Nexus",
    allowIframe: true,
    isCoreService: true,
    iconType: "terminal",
  },
    {
    id: "coding-manager-ui",
    order: 60,
    title: "Coding Manager UI",
    tagline: "Cloud code workspace, hierarchical folder manager & execution viewer",
    description:
      "Web-based developer workspace featuring folder tree navigation, Monaco code editor, file upload pipelines, VS Code extension integration, and remote code execution via Piston API.",
    category: "Web Apps",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Monaco Editor", "Piston API"],
    vanitySlug: "/code",
    githubUrl: "https://github.com/Achinta005/coding-manager-ui",
    allowIframe: true,
    isCoreService: true,
    iconType: "terminal",
  },
  {
    id: "webmail",
    order: 65,
    title: "WebMail Client",
    tagline: "High-performance webmail client for custom domains and aliases",
    description:
    "A fast, privacy-focused email mailbox interface built for achinta.me domains and aliases with IMAP/SMTP sync, rich composer, and multi-alias routing.",
    category: "Web Apps",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "IMAP/SMTP"],
    vanitySlug: "/mail",
    githubUrl: "https://github.com/Achinta005/WebMail",
    allowIframe: true,
    isCoreService: true,
    iconType: "mail",
  },
    {
    id: "wallpaper-extension",
    order: 70,
    title: "Spicetify Wallpaper Manager",
    tagline: "Dynamic wallpaper and aesthetic manager extension for Spotify",
    description:
      "A Spicetify Spotify client extension providing remote API-driven dynamic wallpaper cycling, visual themes synchronization, and modern UI controls.",
    category: "Extensions",
    tags: ["TypeScript", "Spicetify", "CSS3", "REST API"],
    vanitySlug: "/wallpaper",
    allowIframe: false,
    iconType: "spotify",
  },
  {
    id: "routine-extension",
    order: 75,
    title: "Routine Extension",
    tagline: "Focus blocks and developer routine tracker browser extension",
    description:
      "Browser productivity extension designed to automate recurring workflows, block distractions, and track daily routine completion rates.",
    category: "Extensions",
    tags: ["WebExtensions", "JavaScript", "HTML5", "CSS3"],
    vanitySlug: "/routine",
    allowIframe: false,
    iconType: "clock",
  },
  {
    id: "telegram-drive",
    order: 80,
    title: "Telegram Drive",
    tagline: "Personal cloud drive workspace powered by Telegram channels",
    description:
      "Cross-platform desktop file manager turning Telegram into an unlimited cloud drive with streaming, folder organization, local REST API, and encrypted file transfers.",
    category: "Desktop Apps",
    tags: ["Tauri v2", "Rust", "React", "TypeScript", "Telegram API"],
    vanitySlug: "/drive",
    allowIframe: true,
    isCoreService: true,
    iconType: "cloud",
  },
  {
    id: "sfree",
    order: 85,
    title: "Sfree Service",
    tagline: "Lightweight resource optimization and server fleet utility",
    description:
      "Modular system service providing automated resource management, routine cleanup tasks, and micro-utilities for the Achinta infrastructure fleet.",
    category: "Utilities",
    tags: ["Go", "Bash", "Linux", "Systemd"],
    vanitySlug: "/sfree",
    allowIframe: false,
    isCoreService: false,
    iconType: "bolt",
  },
];

export const PROJECTS: Project[] = [...RAW_PROJECTS].sort((a, b) => a.order - b.order);

export const ROOT_REDIRECTS = [
  { source: "/mail", destination: "https://mail.achinta.me", label: "WebMail Client" },
  { source: "/drive", destination: "https://drive.achinta.me", label: "Telegram Drive" },
  { source: "/nexus", destination: "https://nexus.achinta.me", label: "Achinta Nexus" },
  { source: "/ficxus", destination: "https://server.achinta.me/api", label: "Ficxus API Engine" },
  { source: "/search", destination: "https://ai-search.achinta.me", label: "AI Event Search" },
  { source: "/collab", destination: "https://devcollab.achinta.me", label: "DevCollab IDE" },
  { source: "/groq", destination: "https://groq-proxy-0t5r.onrender.com", label: "Groq Proxy Gateway" },
  { source: "/legal", destination: "https://legallens.achinta.me", label: "LegalLens Platform" },
  { source: "/polymind", destination: "https://polymind.achinta.me", label: "PolyMind AI" },
  { source: "/portfolio", destination: "https://portfolio.achinta.me", label: "3D Portfolio" },
  { source: "/shortly", destination: "https://shortly.achinta.me", label: "Shortly URL Shortener" },
  { source: "/github", destination: "https://github.com/Achinta005", label: "GitHub Profile" },
];
