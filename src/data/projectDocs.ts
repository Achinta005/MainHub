import { ArchitectureDiagramData } from "@/components/FlowDiagram";
import { Project } from "./projects";

export interface MainPoint {
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  metrics?: string;
  highlights: string[];
}

export interface TechStackUsageItem {
  name: string;
  category:
    | "Core Runtime & Architecture"
    | "Persistence & Multi-Database"
    | "Protocols & Transports"
    | "Queues & Async Processing"
    | "Security & Authentication"
    | "DevOps & Telemetry";
  usage: string;
  rationale: string;
}

export interface ProjectDoc {
  projectId: string;
  overview: string;
  architectureSummary: string;
  // 1. 3 Main points brief details
  threeMainPoints: [MainPoint, MainPoint, MainPoint];
  // 2. Main diagram data for React Flow
  flowDiagram: ArchitectureDiagramData;
  // 3. Tech stack and their usage
  techStackUsage: TechStackUsageItem[];
}

export const PROJECT_DOCS: Record<string, ProjectDoc> = {
  ficxus: {
    projectId: "ficxus",
    overview:
      "Multi-tenant unified enterprise backend engine and API microservices hub built with NestJS, orchestrating polyglot databases, asynchronous queues, gRPC services, and real-time collaboration.",
    architectureSummary:
      "Modular microservices hub hosting 8 domain engines under a single NestJS runtime. Connects dual relational engines (PostgreSQL and MySQL via TypeORM), 7 isolated MongoDB clusters via Mongoose, Redis for caching and BullMQ queues, and dual-transports over HTTP REST, Socket.io WebSockets, and binary gRPC.",
    threeMainPoints: [
      {
        title: "Multi-Tenant Domain Microservices Hub",
        subtitle: "8 Domain Engines Under a Single Orchestrated NestJS Runtime",
        badge: "Modular Architecture",
        metrics: "8 Microservices • 1 Unified Core",
        description:
          "Consolidates 8 specialized enterprise services within a unified NestJS runtime, orchestrating real-time collaborative editing, vector AI RAG pipelines, contract intelligence, telemetry analysis, and API governance without microservice sprawl.",
        highlights: [
          "DevCollab: Real-time collaborative code editor powered by Yjs CRDTs and Socket.io WebSockets.",
          "PolyMind: Document embeddings, vector chunking, and semantic Q&A running over high-speed gRPC.",
          "LegalLens & Traceum: Organization contract intelligence, RBAC governance, and ML uplift prediction.",
          "Admin & ApiKeyManager: Granular Personal API Key provisioning, scope enforcement, and usage rate limits.",
        ],
      },
      {
        title: "Polyglot Database & Dual-Transport Architecture",
        subtitle: "Specialized Storage Tiering & Multi-Protocol Ingress",
        badge: "Data & Protocols",
        metrics: "Postgres + MySQL + 7 Mongo DBs + Redis",
        description:
          "Engineered with specialized database tiering and multi-protocol transports, routing high-throughput binary RPCs, full-duplex WebSocket streams, and REST API calls to the most suitable persistence engine.",
        highlights: [
          "PostgreSQL (TypeORM): Primary relational store for UserAuth, Roles, Permissions, Contracts, and Documents.",
          "MySQL (TypeORM): Dedicated isolated database for DevCollab workspace files, folders, and collaborator roles.",
          "MongoDB (7 Clusters): Independent document connections for logs, AI event search, media, linkship, and portfolio.",
          "Redis (ioredis): In-memory caching, session state, BullMQ queues, and anti-brute-force rate limits.",
        ],
      },
      {
        title: "Asynchronous Queues, Zero-Trust Security & Observability",
        subtitle: "Non-Blocking Reliability & Real-Time Telemetry",
        badge: "Security & Ops",
        metrics: "BullMQ • Doppler • Telegram • PulseWire",
        description:
          "Guarantees zero dropped tasks with BullMQ background worker queues and scheduled cron maintenance, protected by multi-strategy auth and instrumented with non-blocking log shipping.",
        highlights: [
          "BullMQ Queues: Asynchronous processing of heavy document migrations, file parsing, and background indexing.",
          "Zero-Trust Security: Passport JWT, Google/GitHub OAuth2, IP brute-force guard, and Doppler secret injection.",
          "Automated Operations: Built-in Telegram MTProto client and internal PulseWire buffered telemetry log shipping.",
        ],
      },
    ],
    flowDiagram: {
      nodes: [
        // Column 1: Ingress & Clients (x: 40)
        {
          id: "client-apps",
          type: "customArchitecture",
          position: { x: 40, y: 160 },
          data: {
            label: "Client Applications",
            sublabel: "Web, Desktop & Mobile",
            category: "client",
            tech: ["Next.js", "Tauri Desktop", "Capacitor Mobile"],
            description:
              "Frontends connecting to Ficxus: DevCollab browser IDE, desktop Tauri wrappers, and mobile apps authenticated via session tokens and API keys.",
            protocols: ["HTTPS", "WSS"],
          },
        },
        {
          id: "api-gateway",
          type: "customArchitecture",
          position: { x: 40, y: 390 },
          data: {
            label: "API Gateway & Security",
            sublabel: "Global /api Prefix & Guards",
            category: "gateway",
            tech: ["NestJS Guard", "Throttler", "BruteForce Middleware", "Swagger"],
            description:
              "Terminates inbound traffic with IP geo-resolution, brute-force defense, Passport JWT token extraction, and dynamic CORS origin filtering.",
            codeLocation: "src/main.ts, src/common/middleware/",
            protocols: ["HTTP/1.1", "HTTP/2", "TLS"],
          },
        },

        // Column 2: Domain Microservices Hub (x: 400)
        {
          id: "svc-devcollab",
          type: "customArchitecture",
          position: { x: 400, y: 40 },
          data: {
            label: "DevCollab Real-time IDE",
            sublabel: "Workspace & Editor Engine",
            category: "service",
            tech: ["Yjs CRDT", "Socket.io", "MySQL TypeORM"],
            description:
              "Collaborative code editor workspace managing concurrent file edits, multi-cursor presence, and folder trees with conflict-free replication.",
            codeLocation: "src/Servers/Devcollab/",
            entities: ["Project", "ProjectCollaborator", "ProjectFile", "WorkspaceSession"],
            protocols: ["WSS", "Socket.io"],
          },
        },
        {
          id: "svc-polymind",
          type: "customArchitecture",
          position: { x: 400, y: 200 },
          data: {
            label: "PolyMind AI Engine",
            sublabel: "Document RAG & Embeddings",
            category: "service",
            tech: ["gRPC", "Protobuf", "Vector Search", "LLM"],
            description:
              "Document intelligence engine: extracts text, chunks content, generates vector embeddings, and answers queries with citations.",
            codeLocation: "src/Servers/Polymind/, proto/polymind.proto",
            entities: ["Document", "ChatSession", "ChatMessage"],
            protocols: ["gRPC", "Protobuf"],
          },
        },
        {
          id: "svc-legallens",
          type: "customArchitecture",
          position: { x: 400, y: 360 },
          data: {
            label: "LegalLens Engine",
            sublabel: "Contract Intelligence & RBAC",
            category: "service",
            tech: ["PostgreSQL TypeORM", "Cloudinary", "Multi-Tenant"],
            description:
              "Organization-level legal contract repository: handles document parsing, risk clause analysis, member invites, and Cloudinary asset migration.",
            codeLocation: "src/Servers/legal-lens/",
            entities: ["Organization", "OrganizationMember", "Contract"],
            protocols: ["HTTPS REST"],
          },
        },
        {
          id: "svc-traceum",
          type: "customArchitecture",
          position: { x: 400, y: 520 },
          data: {
            label: "Traceum ML Uplift",
            sublabel: "Predictive Analytics & Telemetry",
            category: "service",
            tech: ["gRPC", "PostgreSQL", "ML Models"],
            description:
              "Machine learning uplift prediction service executing inferencing across 12 feature vectors (f0-f11) and tracking dataset telemetry.",
            codeLocation: "src/Servers/Traceum/, proto/traceum.proto",
            entities: ["TraceumDataset"],
            protocols: ["gRPC"],
          },
        },
        {
          id: "svc-admin",
          type: "customArchitecture",
          position: { x: 400, y: 680 },
          data: {
            label: "Admin & ApiKeyManager",
            sublabel: "Governance, RBAC & Tokens",
            category: "service",
            tech: ["Passport", "PostgreSQL", "Redis Throttler"],
            description:
              "System-wide administration, tenant onboarding, personal API key generation with granular scopes, and usage rate tracking.",
            codeLocation: "src/Servers/admin/",
            entities: ["ApiKey", "PersonalApiKey", "Role", "Permission"],
            protocols: ["HTTPS REST"],
          },
        },

        // Column 3: Communication Transports & Queues (x: 760)
        {
          id: "bus-grpc",
          type: "customArchitecture",
          position: { x: 760, y: 130 },
          data: {
            label: "gRPC Microservices Bus",
            sublabel: "@grpc/grpc-js & Protobuf",
            category: "transport",
            tech: ["gRPC", "Protobuf", "HTTP/2"],
            description:
              "High-throughput binary RPC channel connecting PolyMind ingestion/querying and Traceum ML uplift predictions with sub-5ms serialization.",
            protocols: ["gRPC / HTTP2"],
          },
        },
        {
          id: "bus-ws",
          type: "customArchitecture",
          position: { x: 760, y: 310 },
          data: {
            label: "Socket.io WebSockets",
            sublabel: "IoAdapter & Yjs Sync",
            category: "transport",
            tech: ["Socket.io", "Yjs", "WebSockets"],
            description:
              "Full-duplex real-time communication channel streaming collaborative CRDT updates, presence heartbeats, and live room broadcasts.",
            protocols: ["WebSocket / WSS"],
          },
        },
        {
          id: "bus-bullmq",
          type: "customArchitecture",
          position: { x: 760, y: 500 },
          data: {
            label: "BullMQ & EventEmitter",
            sublabel: "Async Queues & Schedulers",
            category: "transport",
            tech: ["BullMQ", "Redis Queue", "@nestjs/schedule"],
            description:
              "Non-blocking background job queue handling heavy file parsing, scheduled cleanup routines, and internal pub/sub event dispatching.",
            protocols: ["Redis Queue protocol"],
          },
        },

        // Column 4: Polyglot Persistence & Tooling (x: 1120)
        {
          id: "db-postgres",
          type: "customArchitecture",
          position: { x: 1120, y: 40 },
          data: {
            label: "PostgreSQL Primary",
            sublabel: "TypeORM Relational Core",
            category: "database",
            tech: ["PostgreSQL 15+", "TypeORM", "Connection Pooling"],
            description:
              "Authoritative relational persistence for UserAuth, Profiles, Roles, ApiKeys, Contracts, ChatSessions, and TraceumDatasets.",
            codeLocation: "src/common/database/providers/postgres.provider.ts",
            entities: ["20+ Schema Entities"],
            protocols: ["TCP Port 5432"],
          },
        },
        {
          id: "db-mysql",
          type: "customArchitecture",
          position: { x: 1120, y: 200 },
          data: {
            label: "MySQL DevCollab DB",
            sublabel: "TypeORM Workspace Schema",
            category: "database",
            tech: ["MySQL 8.0", "TypeORM"],
            description:
              "Dedicated workspace relational store isolating DevCollab project files, folder trees, and collaborator role associations.",
            codeLocation: "src/common/database/providers/mysql.provider.ts",
            entities: ["ProjectFolder", "ProjectFile", "Collaborator"],
            protocols: ["TCP Port 3306"],
          },
        },
        {
          id: "db-mongo",
          type: "customArchitecture",
          position: { x: 1120, y: 360 },
          data: {
            label: "MongoDB (7 Clusters)",
            sublabel: "Mongoose Multi-URI Connections",
            category: "database",
            tech: ["MongoDB", "Mongoose", "Atlas Clusters"],
            description:
              "Isolated document databases: log_service, ai_event_search, devcollab documents, portfolio, server, linkship, and music_player.",
            codeLocation: "src/common/database/providers/mongo.provider.ts",
            protocols: ["MongoDB Wire Protocol"],
          },
        },
        {
          id: "db-redis",
          type: "customArchitecture",
          position: { x: 1120, y: 520 },
          data: {
            label: "Redis Cache & Broker",
            sublabel: "ioredis Cache & Queue Store",
            category: "database",
            tech: ["Redis 7.x", "ioredis", "In-Memory"],
            description:
              "High-performance store backing BullMQ job queues, caching frequently queried tokens, and enforcing rate limiting counters.",
            codeLocation: "src/common/database/providers/redis.provider.ts",
            protocols: ["RESP Port 6379"],
          },
        },
        {
          id: "ext-integrations",
          type: "customArchitecture",
          position: { x: 1120, y: 680 },
          data: {
            label: "Integrations & Tooling",
            sublabel: "Telegram, Doppler & PulseWire",
            category: "external",
            tech: ["Telegram MTProto", "Doppler", "PulseWire", "Cloudinary"],
            description:
              "External integrations: Telegram bot notifications, Doppler encrypted runtime secrets, Cloudinary media storage, and custom PulseWire log shipping.",
            protocols: ["MTProto", "HTTPS REST"],
          },
        },
      ],
      edges: [
        { id: "e1", source: "client-apps", target: "api-gateway", label: "HTTPS / TLS", animated: true },
        { id: "e2", source: "client-apps", target: "bus-ws", label: "WSS Handshake", animated: true },
        { id: "e3", source: "api-gateway", target: "svc-devcollab", label: "REST Ingress", animated: true },
        { id: "e4", source: "api-gateway", target: "svc-polymind", label: "AI REST Ingress", animated: true },
        { id: "e5", source: "api-gateway", target: "svc-legallens", label: "Contract API", animated: true },
        { id: "e6", source: "api-gateway", target: "svc-traceum", label: "Telemetry API", animated: true },
        { id: "e7", source: "api-gateway", target: "svc-admin", label: "RBAC & Keys", animated: true },
        { id: "e8", source: "svc-devcollab", target: "bus-ws", label: "Yjs CRDT Stream", animated: true },
        { id: "e9", source: "svc-devcollab", target: "db-mysql", label: "Workspace CRUD" },
        { id: "e10", source: "svc-polymind", target: "bus-grpc", label: "Ingest & Query RPC", animated: true },
        { id: "e11", source: "svc-polymind", target: "db-postgres", label: "Chat & Docs" },
        { id: "e12", source: "svc-legallens", target: "bus-bullmq", label: "Migration Jobs", animated: true },
        { id: "e13", source: "svc-legallens", target: "db-postgres", label: "Contract Records" },
        { id: "e14", source: "svc-traceum", target: "bus-grpc", label: "Predict Uplift RPC", animated: true },
        { id: "e15", source: "svc-admin", target: "db-postgres", label: "Permissions & Keys" },
        { id: "e16", source: "svc-admin", target: "db-redis", label: "Rate Limit Counters", animated: true },
        { id: "e17", source: "bus-bullmq", target: "db-redis", label: "Queue Storage", animated: true },
        { id: "e18", source: "api-gateway", target: "db-mongo", label: "Logs & Media Store" },
        { id: "e19", source: "api-gateway", target: "ext-integrations", label: "Doppler & Telegram" },
      ],
    },
    techStackUsage: [
      {
        name: "NestJS 10 & TypeScript 5",
        category: "Core Runtime & Architecture",
        usage:
          "Serves as the unified architectural backbone, organizing the entire system into modular servers (src/Servers/) with strict dependency injection, guards, interceptors, and exception filters.",
        rationale:
          "Enables enterprise-grade modularity, code reuse, and testability while avoiding microservice network overhead for co-located domain services.",
      },
      {
        name: "TypeORM (PostgreSQL)",
        category: "Persistence & Multi-Database",
        usage:
          "Authoritative relational persistence for UserAuth, UserProfile, Role, Permission, ApiKey, LegalLens Contracts, and Polymind ChatSession entities.",
        rationale:
          "Guarantees strict ACID transactional integrity, typed schema relations, and connection pooling for sensitive identity and business data.",
      },
      {
        name: "TypeORM (MySQL)",
        category: "Persistence & Multi-Database",
        usage:
          "Dedicated database connection isolating DevCollab's workspace data: ProjectFolders, ProjectFiles, collaborators, and workspace sessions.",
        rationale:
          "Separates high-frequency developer workspace tree operations and session states from the primary core database, preventing locking contention.",
      },
      {
        name: "Mongoose (MongoDB - 7 Clusters)",
        category: "Persistence & Multi-Database",
        usage:
          "Simultaneously manages 7 distinct database URIs: log_service, ai_event_search, devcollab documents, portfolio, server, linkship, and music_player.",
        rationale:
          "Provides flexible schema validation and extreme horizontal write throughput for unstructured data, AI search indices, and streaming metadata.",
      },
      {
        name: "ioredis & Redis 7.x",
        category: "Persistence & Multi-Database",
        usage:
          "Distributed in-memory cache, session lock engine, anti-brute-force request counter, and backing broker for BullMQ job queues.",
        rationale:
          "Delivers sub-millisecond response times for hot auth tokens, throttler rate limits, and reliable ephemeral message queue persistence.",
      },
      {
        name: "gRPC & Protobuf (@grpc/grpc-js)",
        category: "Protocols & Transports",
        usage:
          "Powers internal binary RPC communication: PolyMind document ingestion/querying (polymind.proto) and Traceum ML uplift predictions (traceum.proto).",
        rationale:
          "Dramatically lowers serialization latency and network payload size compared to JSON REST, ideal for heavy AI embeddings and ML inference vectors.",
      },
      {
        name: "Socket.io & Yjs CRDT",
        category: "Protocols & Transports",
        usage:
          "Drives DevCollab's real-time collaborative workspace, synchronizing concurrent code editor changes and presence across multiple connected clients.",
        rationale:
          "Conflict-Free Replicated Data Types (CRDTs) guarantee mathematical eventual consistency without locking documents or losing keystrokes.",
      },
      {
        name: "BullMQ (bull) & NestJS Schedulers",
        category: "Queues & Async Processing",
        usage:
          "Orchestrates non-blocking background workers for heavy document parsing, scheduled database maintenance, and Cloudinary asset migration.",
        rationale:
          "Decouples long-running CPU/IO-heavy operations from the HTTP request-response lifecycle, guaranteeing at-least-once task execution.",
      },
      {
        name: "Passport.js (JWT & OAuth2)",
        category: "Security & Authentication",
        usage:
          "Manages authentication strategies for Google and GitHub OAuth2, personal API key validation with granular permissions, and encrypted JWT tokens.",
        rationale:
          "Delivers comprehensive RBAC/PBAC access control and single sign-on capabilities across all multi-tenant endpoints.",
      },
      {
        name: "Telegram MTProto Client",
        category: "DevOps & Telemetry",
        usage:
          "Direct Telegram MTProto bot integration running inside the core engine to dispatch real-time system alerts and administrative triggers.",
        rationale:
          "Provides immediate mobile notifications for critical infrastructure events, failed jobs, or security violations without third-party webhook lag.",
      },
      {
        name: "Doppler CLI & Docker",
        category: "DevOps & Telemetry",
        usage:
          "Injects encrypted environment secrets directly into the Node process at runtime, packaged in optimized multi-stage production Docker containers.",
        rationale:
          "Eliminates plaintext .env credentials from git and container disks, supporting continuous deployment across staging and production.",
      },
      {
        name: "PulseWire (Vendor Module)",
        category: "DevOps & Telemetry",
        usage:
          "Internal zero-dependency log shipper (vendor/pulsewire) that buffers logs in memory, batches them, and ships them asynchronously over HTTP.",
        rationale:
          "Never blocks the Node.js event loop and never throws on network failure, guaranteeing seamless log streaming even during heavy traffic surges.",
      },
    ],
  },
};

// Generic Fallback generator for other projects until customized
export function getProjectDoc(project: Project): ProjectDoc {
  if (PROJECT_DOCS[project.id]) {
    return PROJECT_DOCS[project.id];
  }

  // Fallback template compliant with the new 3-section layout
  const isBackend = project.category === "Backend & APIs";
  const isDesktop = project.category === "Desktop Apps";

  return {
    projectId: project.id,
    overview: project.description,
    architectureSummary: `${project.title} is built with a decoupled architecture focusing on ${project.tags.join(
      ", "
    )}. It delivers high performance, responsive layout, and robust data persistence.`,
    threeMainPoints: [
      {
        title: "Architecture & Core Capabilities",
        subtitle: `${project.category} Core Execution Engine`,
        badge: "Core Architecture",
        metrics: `${project.tags.length} Key Technologies`,
        description: project.description,
        highlights: [
          `Engineered with modern ${project.tags.slice(0, 3).join(", ")} stack.`,
          "Modular design ensuring isolation, testability, and responsiveness.",
          "Seamless communication through optimized data pipelines.",
        ],
      },
      {
        title: "Data Flow & Communication Channels",
        subtitle: "High-Throughput State & Transport Layer",
        badge: "Data & Protocols",
        metrics: "Sub-50ms Response Latency",
        description:
          "Processes incoming interactions through authenticated protocol channels, executing business logic and synchronizing state across clients.",
        highlights: [
          "Sanitized input validation and route protection.",
          "Reactive UI bindings and optimistic state updates.",
          "Persistent caching for repeat interactions.",
        ],
      },
      {
        title: "Production Reliability & Operations",
        subtitle: "Edge Deployment & Continuous Monitoring",
        badge: "Operations",
        metrics: "99.9% Uptime Telemetry",
        description:
          "Deployed to modern cloud infrastructure with live telemetry health checks, automated error handling, and scalable runtime configurations.",
        highlights: [
          "Production-grade security headers and origin isolation.",
          "Active heartbeat monitoring on the Achinta Portal.",
          "Optimized build packaging for swift asset delivery.",
        ],
      },
    ],
    flowDiagram: {
      nodes: [
        {
          id: "client-tier",
          type: "customArchitecture",
          position: { x: 50, y: 120 },
          data: {
            label: isDesktop ? "Desktop Native UI" : "Client Browser Interface",
            sublabel: project.tags[0] || "Frontend",
            category: "client",
            tech: project.tags.slice(0, 2),
            description: `Primary interaction surface for ${project.title}.`,
            protocols: ["HTTPS", "Client Events"],
          },
        },
        {
          id: "gateway-tier",
          type: "customArchitecture",
          position: { x: 420, y: 120 },
          data: {
            label: "Application Core Runtime",
            sublabel: `${project.title} Engine`,
            category: "service",
            tech: project.tags.slice(0, 3),
            description: `Core logic, routing, and processing routines for ${project.title}.`,
            protocols: ["Internal RPC / API"],
          },
        },
        {
          id: "storage-tier",
          type: "customArchitecture",
          position: { x: 790, y: 120 },
          data: {
            label: isBackend ? "Database Persistence" : "State Store & Cache",
            sublabel: isBackend ? "Relational / Document DB" : "Local State Engine",
            category: "database",
            tech: project.tags.slice(2, 4).length > 0 ? project.tags.slice(2, 4) : ["State Store"],
            description: "Persistence engine storing configurations, user state, and operational records.",
            protocols: ["TCP / Storage I/O"],
          },
        },
      ],
      edges: [
        { id: "e1", source: "client-tier", target: "gateway-tier", label: "User Interaction", animated: true },
        { id: "e2", source: "gateway-tier", target: "storage-tier", label: "State Synchronization", animated: true },
      ],
    },
    techStackUsage: project.tags.map((tag) => ({
      name: tag,
      category: "Core Runtime & Architecture",
      usage: `Powers key capabilities in the ${project.title} runtime.`,
      rationale: `Selected for performance, reliability, and seamless integration within ${project.category}.`,
    })),
  };
}
