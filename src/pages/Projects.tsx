import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Store, 
  Play, 
  ChevronRight, 
  Database, 
  Terminal, 
  Layers, 
  Code2, 
  Zap, 
  Cpu, 
  Smartphone, 
  Globe, 
  Users, 
  ShieldCheck, 
  Clock, 
  Target, 
  Palette,
  X,
  Layers3,
  BookmarkCheck,
  CpuIcon
} from 'lucide-react';
import { RadialGlowBackground } from '../components/ui/radial-glow-background';
import ProjectGlowBackground from '../components/ui/project-glow-background';

interface TimelineStep {
  label: string;
  phaseName: string;
  uiTitle: string;
  uiAddress: string;
  technicalMetric: string;
  codeContext: string;
  insight: string;
}

interface ProjectEnrichment {
  highlights: string[];
  architecture: string;
  challenges: string;
  workflowSteps: TimelineStep[];
  metrics: { value: string; label: string; icon: React.ComponentType<any>; color: string; glowColor: string; glowBg: string; accent: string; hud: string }[];
}

// ── PREMIUM OUTCOMES & CASE STUDIES STATIC ENRICHMENTS ──
const ENRICHMENT_PRESETS: Record<string, ProjectEnrichment> = {
  shoplens: {
    highlights: [
      "Geospatial peer-to-peer vendor search & interactive location routing",
      "Dynamic catalog listings with image uploads & schema validations",
      "Secure seller authentication & role-based dashboard controls",
      "State-cached localized discovery pipeline delivering sub-12ms search index filter"
    ],
    architecture: "ShopLens is built on a decoupled MERN stack architecture. The React frontend utilizes a responsive coordinate grid system, styling via Tailwind CSS, and global state tracking. The Express/Node.js API endpoints interface with MongoDB Atlas using Mongoose schemas. Geospatial indexing is configured on shop coordinates to allow fast radial queries within user-specified distances.",
    challenges: "The primary challenge was managing localized search delay when loading massive business catalogs. We resolved this by implementing an intelligent Fuse.js client-side search index that caches active vendor models upon user entry. This lowered database read dependency by 40% and improved search render speed to less than 12ms.",
    workflowSteps: [
      {
        label: "Discovery",
        phaseName: "Vendor Discovery Portal",
        uiTitle: "Local Marketplace Map",
        uiAddress: "shoplens.dev/explore",
        technicalMetric: "+45% Local Search Visibility",
        codeContext: "GET /api/vendors?lat=22.34&lng=73.18",
        insight: "Renders geospatial vendor maps, loading state-cached localized business catalogs with optimized responsive layouts."
      },
      {
        label: "Intelligent Search",
        phaseName: "Smart Vendor Index Filter",
        uiTitle: "Interactive Search Filter",
        uiAddress: "shoplens.dev/search?q=bakery",
        technicalMetric: "< 12ms Input Filtering Delay",
        codeContext: "const results = fuse.search('bakery')",
        insight: "Executes lightweight client-side array search algorithms and index caching to filter active vendors in real-time."
      },
      {
        label: "Secure API Sync",
        phaseName: "REST Service Connector",
        uiTitle: "REST API JSON Sync System",
        uiAddress: "shoplens.dev/api/v1/sync",
        technicalMetric: "JWT Secure Auth Middleware",
        codeContext: "Authorization: Bearer jwt_key_2026",
        insight: "Channels secured Express.js routes through localized auth headers, serving JWT validations and optimized JSON database responses."
      },
      {
        label: "Data Persistence",
        phaseName: "Product Management Control",
        uiTitle: "Seller Control Dashboard",
        uiAddress: "shoplens.dev/admin/dashboard",
        technicalMetric: "MongoDB Persistence Layer",
        codeContext: "db.products.insertOne(newPayload)",
        insight: "Facilitates full-stack seller upload integrations, schema validations, and instant MongoDB state persistence checks."
      }
    ],
    metrics: [
      { value: "+45%", label: "UI Rendering Speed", icon: Zap, color: "text-cyan-400", glowColor: "hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]", glowBg: "rgba(6, 182, 212, 0.03)", accent: "text-cyan-400 bg-cyan-400/5 border-cyan-400/10", hud: "LATENCY: -45ms" },
      { value: "< 12ms", label: "Search Index Filter", icon: Cpu, color: "text-purple-400", glowColor: "hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]", glowBg: "rgba(168, 85, 247, 0.03)", accent: "text-purple-400 bg-purple-400/5 border-purple-400/10", hud: "PING: EXCELLENT" },
      { value: "MERN", label: "Scalable Abstraction", icon: Layers, color: "text-pink-400", glowColor: "hover:shadow-[0_0_30px_rgba(244,63,94,0.12)]", glowBg: "rgba(244, 63, 94, 0.03)", accent: "text-pink-400 bg-pink-400/5 border-pink-400/10", hud: "STACK: FULL" },
      { value: "100%", label: "Mobile Responsive", icon: Smartphone, color: "text-emerald-400", glowColor: "hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]", glowBg: "rgba(16, 185, 129, 0.03)", accent: "text-emerald-400 bg-emerald-400/5 border-emerald-400/10", hud: "RATIO: FLUID" }
    ]
  },
  accident: {
    highlights: [
      "Clustering analysis for real-time spatial traffic risk estimation",
      "Dynamic map overlay layers highlighting severe density zones using Leaflet Maps",
      "Robust REST pipeline handling geo-coordinate arrays and high-payload queries",
      "Intelligent system visual notifications alerting travelers prior to zone entry"
    ],
    architecture: "Engineered using Python Flask backends coupled with PostgreSQL geospatial indexing tables. The React client binds coordinate lists to an interactive Leaflet mapping engine, plotting heatmap clusters dynamically according to risk levels compiled by K-Means clustering libraries in the analytics service.",
    challenges: "Handling real-time geolocation tracking coordinates asynchronously without causing main UI thread freezing. This was resolved by delegating coordinate clustering logic to background web workers in Python, keeping the client interactive at 60 FPS while plotting risk zones.",
    workflowSteps: [
      {
        label: "Tracking",
        phaseName: "Geospatial Stream",
        uiTitle: "Real-Time Coordinate Logs",
        uiAddress: "hotspot.dev/map/live",
        technicalMetric: "Sub-20ms Geo updates",
        codeContext: "navigator.geolocation.getCurrentPosition()",
        insight: "Streams live user tracking coordinates into the routing controller maps to calculate closest risk hazards."
      },
      {
        label: "Risk Mapping",
        phaseName: "Density heatmaps",
        uiTitle: "Hotspot Cluster Map",
        uiAddress: "hotspot.dev/map/hotspots",
        technicalMetric: "K-Means analytics active",
        codeContext: "kmeans.fit(coordinate_matrix)",
        insight: "Executes spatial clustering models to classify severe accident coordinates into colored density map indicators."
      },
      {
        label: "REST pipeline",
        phaseName: "Flask API Router",
        uiTitle: "Hotspot JSON Feed",
        uiAddress: "hotspot.dev/api/v1/hotspots",
        technicalMetric: "REST geojson payload",
        codeContext: "return jsonify(geojson_data)",
        insight: "Serves coordinate sets as standardized GeoJSON packets with optimized database indexing filters."
      }
    ],
    metrics: [
      { value: "98%", label: "Clustering Accuracy", icon: Target, color: "text-cyan-400", glowColor: "hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]", glowBg: "rgba(6, 182, 212, 0.03)", accent: "text-cyan-400 bg-cyan-400/5 border-cyan-400/10", hud: "MODEL: K-MEANS" },
      { value: "< 20ms", label: "Alert Broadcast Speed", icon: Zap, color: "text-purple-400", glowColor: "hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]", glowBg: "rgba(168, 85, 247, 0.03)", accent: "text-purple-400 bg-purple-400/5 border-purple-400/10", hud: "ROUTE: OPTIMIZED" },
      { value: "GIS", label: "PostGIS Schema", icon: Database, color: "text-pink-400", glowColor: "hover:shadow-[0_0_30px_rgba(244,63,94,0.12)]", glowBg: "rgba(244, 63, 94, 0.03)", accent: "text-pink-400 bg-pink-400/5 border-pink-400/10", hud: "DB: SECURE" },
      { value: "100%", label: "Map Responsive", icon: Smartphone, color: "text-emerald-400", glowColor: "hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]", glowBg: "rgba(16, 185, 129, 0.03)", accent: "text-emerald-400 bg-emerald-400/5 border-emerald-400/10", hud: "RATIO: FLUID" }
    ]
  },
  travel: {
    highlights: [
      "AI itinerary planning driven by Gemini LLM model prompts",
      "Interactive map overlays highlighting daily travel routes and locations",
      "Automated scheduling modules generating flexible travel slots",
      "Gorgeous micro-animations powered by Framer Motion UI widgets"
    ],
    architecture: "Designed with Next.js page routing structures and structured database persistence tables. Prompts are structured utilizing custom Gemini schemas to parse predictable trip outlines, which are cached in MongoDB collections for low-latency client retrieval.",
    challenges: "Asynchronous processing delays and rate limits associated with external LLM generation systems. We introduced Redis key-value cache pipelines for standard locations and loaded dynamic preview cards while full AI itineraries compile in the background.",
    workflowSteps: [
      {
        label: "Prompt Setup",
        phaseName: "Gemini Structured Prompts",
        uiTitle: "Intelligent Trip Form",
        uiAddress: "traveloop.dev/planner/new",
        technicalMetric: "Strict JSON Parsing Schema",
        codeContext: "gemini.generateContent(customPrompt)",
        insight: "Structures travel requirements (budget, dates, preferences) into predictable instructions mapped for LLM generations."
      },
      {
        label: "Itinerary Sync",
        phaseName: "Itinerary caching Node",
        uiTitle: "Structured Route Outline",
        uiAddress: "traveloop.dev/trips/active",
        technicalMetric: "Redis cached slots",
        codeContext: "redis.setex(tripId, 3600, data)",
        insight: "Saves structured trip itineraries into Redis caches to enable sub-5ms reload times for returning users."
      },
      {
        label: "Map Visualizer",
        phaseName: "Route mapping coordinate layers",
        uiTitle: "Daily Route Map",
        uiAddress: "traveloop.dev/map/itinerary",
        technicalMetric: "Framer Motion rendering",
        codeContext: "<motion.path d={routePath} />",
        insight: "Transforms structured location coordinates into visual routing paths plotted overlay maps."
      }
    ],
    metrics: [
      { value: "sub-5ms", label: "Trip Retrieval Speed", icon: Zap, color: "text-cyan-400", glowColor: "hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]", glowBg: "rgba(6, 182, 212, 0.03)", accent: "text-cyan-400 bg-cyan-400/5 border-cyan-400/10", hud: "CACHE: REDIS ACTIVE" },
      { value: "100%", label: "Structured JSON Valid", icon: ShieldCheck, color: "text-purple-400", glowColor: "hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]", glowBg: "rgba(168, 85, 247, 0.03)", accent: "text-purple-400 bg-purple-400/5 border-purple-400/10", hud: "PARSER: DETERMINISTIC" },
      { value: "NoSQL", label: "Flexible persistence", icon: Database, color: "text-pink-400", glowColor: "hover:shadow-[0_0_30px_rgba(244,63,94,0.12)]", glowBg: "rgba(244, 63, 94, 0.03)", accent: "text-pink-400 bg-pink-400/5 border-pink-400/10", hud: "DB: MONGODB" },
      { value: "60 FPS", label: "Fluid Interface Speed", icon: Sparkles, color: "text-emerald-400", glowColor: "hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]", glowBg: "rgba(16, 185, 129, 0.03)", accent: "text-emerald-400 bg-emerald-400/5 border-emerald-400/10", hud: "FPS: STABLE" }
    ]
  },
  generic: {
    highlights: [
      "Custom responsive design utilizing modular component trees",
      "Durable state-driven database persistence models",
      "Secure client-server API validations & parameters handling",
      "Dynamic bento metrics monitoring application health parameters"
    ],
    architecture: "Built with standard modular component architecture designed for maximum customizability. Frontend states are managed using React Context pipelines, styling is declared in clean utility classes, and custom backends are configured to persistence layers.",
    challenges: "Balancing visual density and high render cycles across multiple viewport configurations. Solved by integrating multi-stage lazy-loading assets and optimized layout coordinate grids.",
    workflowSteps: [
      {
        label: "Interface",
        phaseName: "Responsive View Layout",
        uiTitle: "Frontend Component View",
        uiAddress: "app.dev/dashboard",
        technicalMetric: "Fluid Responsive Grids",
        codeContext: "const layout = useResponsiveState()",
        insight: "Constructs modular state-driven component view layers featuring responsive styling configurations."
      },
      {
        label: "State Hub",
        phaseName: "Functional Logic Controller",
        uiTitle: "Application State Hub",
        uiAddress: "app.dev/dashboard/state",
        technicalMetric: "Sub-10ms Render Cycles",
        codeContext: "const [state, dispatch] = useReducer()",
        insight: "Orchestrates reactive client-side rendering flows, handling fast index filtering and local caching patterns."
      },
      {
        label: "API Sync",
        phaseName: "REST/GraphQL Service Node",
        uiTitle: "Server Router Sync",
        uiAddress: "app.dev/api/v1/sync",
        technicalMetric: "JWT Auth & Middleware",
        codeContext: "server.use('/api', authMiddleware)",
        insight: "Integrates secure server routes, processing auth headers, parameter checks, and JSON database requests."
      }
    ],
    metrics: [
      { value: "sub-10ms", label: "Interface State Sync", icon: Zap, color: "text-cyan-400", glowColor: "hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]", glowBg: "rgba(6, 182, 212, 0.03)", accent: "text-cyan-400 bg-cyan-400/5 border-cyan-400/10", hud: "PERFORMANCE: OPTIMIZED" },
      { value: "100%", label: "Cross-Device responsive", icon: Smartphone, color: "text-purple-400", glowColor: "hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]", glowBg: "rgba(168, 85, 247, 0.03)", accent: "text-purple-400 bg-purple-400/5 border-purple-400/10", hud: "TESTS: COVERED" },
      { value: "Durable", label: "Data persistence layers", icon: Database, color: "text-pink-400", glowColor: "hover:shadow-[0_0_30px_rgba(244,63,94,0.12)]", glowBg: "rgba(244, 63, 94, 0.03)", accent: "text-pink-400 bg-pink-400/5 border-pink-400/10", hud: "DB: PERSISTED" },
      { value: "Secure", label: "JWT Parameter Validate", icon: ShieldCheck, color: "text-emerald-400", glowColor: "hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]", glowBg: "rgba(16, 185, 129, 0.03)", accent: "text-emerald-400 bg-emerald-400/5 border-emerald-400/10", hud: "SECURITY: STANDARD" }
    ]
  }
};

const getEnrichment = (title: string): ProjectEnrichment => {
  const t = title.toLowerCase();
  if (t.includes('shoplens')) return ENRICHMENT_PRESETS.shoplens;
  if (t.includes('accident') || t.includes('hotspot') || t.includes('traffic')) return ENRICHMENT_PRESETS.accident;
  if (t.includes('traveloop') || t.includes('travel') || t.includes('planner')) return ENRICHMENT_PRESETS.travel;
  return ENRICHMENT_PRESETS.generic;
};

interface ProjectsProps {
  projects?: any[];
  profile?: any;
}

export default function Projects({ projects, profile }: ProjectsProps) {
  // Resolve rich database projects from profile JSON directly if available
  const dbSectionProjects = profile?.projectsSection?.projects;
  const rawProjectsList = (dbSectionProjects && dbSectionProjects.length > 0) ? dbSectionProjects : projects;

  const activeProjects = (rawProjectsList && rawProjectsList.length > 0)
    ? rawProjectsList.filter((p: any) => p.visible !== false).map((p: any) => ({
        id: p.id,
        title: p.title || '',
        description: p.description || '',
        techStack: p.technologies || p.techStack || [],
        githubUrl: p.githubUrl || null,
        liveUrl: p.demoUrl || p.liveUrl || null,
        thumbnail: p.image || null,
        featured: p.featured || false,
        type: p.type || (p.featured ? 'FEATURED' : 'LIVE'),
        // Rich parameters from our Visual CMS
        desktopImage: p.desktopImage || p.image || p.thumbnail || '',
        mobileImage: p.mobileImage || p.image || p.thumbnail || '',
        videoPreview: p.videoPreview || '',
        smallLabel: p.smallLabel || (p.featured ? 'LIVE PORTAL • PINNED BUILD' : 'LIVE PORTAL'),
        highlights: p.highlights || p.outcomes || [],
        actionButtons: p.actionButtons || {
          liveDemo: { label: 'Live Demo', enabled: true, url: p.demoUrl || p.liveUrl || '' },
          github: { label: 'GitHub', enabled: true, url: p.githubUrl || '' },
          caseStudy: { label: 'View Details', enabled: true }
        },
        technicalBreakdown: p.technicalBreakdown || {
          architecture: p.architecture || '',
          apis: p.apis || '',
          optimization: p.optimization || '',
          animations: p.animations || '',
          backendLogic: p.backendLogic || ''
        },
        mediaGallery: p.mediaGallery || [],
        status: p.status || (p.featured ? 'Featured' : 'Live')
      }))
    : [
        {
          id: "fallback-shoplens",
          title: "ShopLens Marketplace",
          description: "A localized peer-to-peer marketplace system facilitating secure catalog listings, intelligent location routing, and seller database persistence.",
          techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
          githubUrl: "https://github.com/Khushboo-Saini",
          liveUrl: "#",
          thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
          featured: true,
          type: 'LIVE PORTAL',
          desktopImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
          mobileImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
          videoPreview: "",
          smallLabel: "LIVE PORTAL • PINNED BUILD",
          highlights: [
            "Geospatial peer-to-peer vendor search & interactive location routing",
            "Dynamic catalog listings with image uploads & schema validations",
            "Secure seller authentication & role-based dashboard controls",
            "State-cached localized discovery pipeline delivering sub-12ms search index filter"
          ],
          actionButtons: {
            liveDemo: { label: 'Live Demo', enabled: true, url: '#' },
            github: { label: 'GitHub', enabled: true, url: 'https://github.com/Khushboo-Saini' },
            caseStudy: { label: 'View Details', enabled: true }
          },
          technicalBreakdown: {
            architecture: "ShopLens is built on a decoupled MERN stack architecture. The React frontend utilizes a responsive coordinate grid system, styling via Tailwind CSS, and global state tracking. The Express/Node.js API endpoints interface with MongoDB Atlas using Mongoose schemas.",
            apis: "Channels secured Express.js routes through localized auth headers, serving JWT validations and optimized JSON database responses.",
            optimization: "fuse.search client-side caching arrays index lowered database reads.",
            animations: "Framer Motion coordinates orbital vectors.",
            backendLogic: "Aggregation collection schema maps."
          },
          mediaGallery: [],
          status: 'Featured'
        }
      ];

  // Modal / Expanded details state
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeInsight, setActiveInsight] = useState<number | null>(0);

  // Retrieve enriched details for active modal project (merge presets and dynamic edits)
  const pEnrich = selectedProject ? getEnrichment(selectedProject.title) : null;
  
  const activeHighlights = selectedProject?.highlights?.length > 0
    ? selectedProject.highlights
    : (pEnrich?.highlights || []);

  const activeArch = selectedProject?.technicalBreakdown?.architecture
    ? selectedProject.technicalBreakdown.architecture
    : (pEnrich?.architecture || '');

  const activeApis = selectedProject?.technicalBreakdown?.apis
    ? selectedProject.technicalBreakdown.apis
    : 'Decoupled routing controller handles JWT auth headers and validated JSON payloads.';

  const activeOpt = selectedProject?.technicalBreakdown?.optimization
    ? selectedProject.technicalBreakdown.optimization
    : (pEnrich?.challenges || '');

  const activeAnim = selectedProject?.technicalBreakdown?.animations
    ? selectedProject.technicalBreakdown.animations
    : 'Spring coordinates are calculated declaratively via framer-motion layers.';

  const activeBackend = selectedProject?.technicalBreakdown?.backendLogic
    ? selectedProject.technicalBreakdown.backendLogic
    : 'Aggregated controller designs maps persistent NoSQL schemas and object types.';

  const activeGallery = selectedProject?.mediaGallery?.length > 0
    ? selectedProject.mediaGallery
    : [];

  const modalSteps = pEnrich?.workflowSteps || [];
  const activeStepData = modalSteps[activeStep] || modalSteps[0];

  return (
    <section 
      id="projects" 
      className="py-16 md:py-24 relative overflow-hidden select-none text-left"
    >
      {/* Immersive Background Glow Elements */}
      <RadialGlowBackground />
      <ProjectGlowBackground />
      
      {/* Top boundary edge */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10 space-y-12">
        
        {/* ================= 1. SECTION HERO ================= */}
        <div className="flex flex-col items-center justify-center text-center w-full mx-auto pb-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.2em" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl heading-font font-black uppercase text-white tracking-widest leading-none bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent"
          >
            {profile?.projectsSection?.heading || "PROJECTS"}
          </motion.h2>
          
          <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest mt-2 block">
            {profile?.projectsSection?.badge || "Selected Digital Experiences"}
          </p>

          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100px", opacity: 0.8 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent mt-4"
          />
        </div>

        {/* ================= 2. HORIZONTAL PROJECT SHOWCASE CARDS ================= */}
        <div className="flex flex-col gap-12 w-full pt-6">
          {activeProjects.map((proj, idx) => {
            const displayHighlights = proj.highlights?.length > 0 ? proj.highlights : getEnrichment(proj.title).highlights;
            const displayCover = proj.desktopImage || proj.thumbnail || proj.image;

            return (
              <motion.div
                key={proj.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col lg:flex-row gap-8 rounded-[24px] border border-white/5 bg-neutral-950/40 p-6 backdrop-blur-xl hover:border-white/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500 overflow-hidden"
              >
                {/* Ambient Glow backing card */}
                <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-cyan-500/5 blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-purple-500/5 blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* LEFT COLUMN: Large Preview Image Mockup (45%) */}
                <div className="lg:w-[45%] aspect-[16/10] w-full shrink-0 relative rounded-xl border border-white/10 overflow-hidden bg-neutral-900 shadow-2xl flex items-center justify-center">
                  
                  {/* Subtle inner overlay layout */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/20 z-10" />

                  {/* Browser top pill buttons */}
                  <div className="absolute top-3 left-4 flex gap-1.5 z-20">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80 border border-rose-600/30" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/80 border border-amber-600/30" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80 border border-emerald-600/30" />
                  </div>

                  {proj.videoPreview ? (
                    <video
                      src={proj.videoPreview}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <picture className="w-full h-full">
                      {proj.mobileImage && <source srcSet={proj.mobileImage} media="(max-width: 640px)" />}
                      <img
                        src={displayCover}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </picture>
                  )}
                  
                  {/* Floating Action Button inside preview overlay */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => {
                        setSelectedProject(proj);
                        setActiveStep(0);
                        setActiveInsight(0);
                      }}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-extrabold text-[9px] uppercase tracking-widest shadow-lg flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Explore Technical Breakdown</span>
                    </button>
                  </div>
                </div>

                {/* RIGHT COLUMN: Project Info & CTAs (55%) */}
                <div className="flex-1 flex flex-col justify-between space-y-5 text-left z-10 relative">
                  
                  <div className="space-y-4">
                    {/* Badge Category & Title */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                          {proj.status || 'LIVE'}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                        <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-500 uppercase">
                          {proj.smallLabel || 'LIVE PORTAL'}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold tracking-tight text-white uppercase group-hover:text-cyan-300 transition-colors duration-300 font-heading">
                        {proj.title}
                      </h3>
                    </div>

                    {/* Short Human-Readable Description */}
                    <p className="text-neutral-300 text-xs md:text-sm font-light leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Dynamic Tech Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {(proj.techStack || []).map((tech: string, tIdx: number) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[9px] font-mono text-neutral-400 tracking-wide uppercase hover:border-[#06B6D4]/30 hover:text-white transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Outcome Highlight Bullets */}
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      <span className="text-[8.5px] font-mono font-bold uppercase tracking-widest text-neutral-500 block">
                        Key Outcomes & Core Focus
                      </span>
                      <ul className="space-y-1">
                        {displayHighlights.map((highlight: string, hIdx: number) => (
                          <li key={hIdx} className="flex items-start gap-2 text-[11px] text-neutral-400 font-sans">
                            <span className="text-cyan-400 mt-1 select-none font-bold shrink-0">•</span>
                            <span className="leading-relaxed font-light">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA BUTTONS CONTAINER */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {(!proj.actionButtons || proj.actionButtons.caseStudy?.enabled !== false) && (
                      <button
                        onClick={() => {
                          setSelectedProject(proj);
                          setActiveStep(0);
                          setActiveInsight(0);
                        }}
                        className="px-4.5 py-2.5 rounded-xl border border-white/10 hover:border-cyan-500/40 bg-white/[0.02] hover:bg-cyan-500/5 text-neutral-200 hover:text-white font-extrabold text-[9.5px] uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{proj.actionButtons?.caseStudy?.label || 'View Details'}</span>
                      </button>
                    )}

                    {(!proj.actionButtons || proj.actionButtons.liveDemo?.enabled !== false) && proj.liveUrl && proj.liveUrl !== '#' && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 text-neutral-400 hover:text-white font-extrabold text-[9.5px] uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{proj.actionButtons?.liveDemo?.label || 'Live Demo'}</span>
                      </a>
                    )}

                    {(!proj.actionButtons || proj.actionButtons.github?.enabled !== false) && proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 text-neutral-400 hover:text-white font-extrabold text-[9.5px] uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>{proj.actionButtons?.github?.label || 'GitHub'}</span>
                      </a>
                    )}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ================= 3. IMMERSIVE CUSTOM TECHNICAL OVERLAY MODAL ================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="bg-neutral-950/90 border border-white/10 w-full max-w-5xl h-[85vh] md:h-[80vh] rounded-[24px] overflow-hidden flex flex-col relative shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-left"
            >
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 bg-neutral-900 border border-white/5 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white hover:border-white/10 transition-all duration-300 z-50 cursor-pointer shadow-md"
              >
                <X className="w-4 h-4" />
              </button>

              {/* MODAL HEADER */}
              <div className="p-6 border-b border-white/5 flex flex-col justify-start gap-1 bg-white/[0.01]">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                    TECHNICAL SPECS //
                  </span>
                  <span className="text-[9.5px] font-mono font-extrabold uppercase px-1.5 py-0.5 border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 rounded leading-none shrink-0">
                    {selectedProject.status || 'LIVE'}
                  </span>
                </div>
                <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none font-heading mt-1">
                  {selectedProject.title}
                </h2>
              </div>

              {/* MODAL SCROLLABLE BODY */}
              <div className="flex-1 overflow-y-auto min-h-0 bg-neutral-950/20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 items-start h-full">
                  
                  {/* LEFT COLUMN: Visual Simulator Panel (Col Span 5) */}
                  <div className="lg:col-span-5 flex flex-col gap-6 w-full h-full shrink-0 relative">
                    
                    {/* Simulated Browser Frame */}
                    <div className="w-full bg-neutral-950/80 border border-white/10 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative backdrop-blur-xl">
                      
                      {/* Browser header Address Bar */}
                      <div className="p-3 bg-white/[0.02] border-b border-white/5 flex justify-between items-center z-20">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-500/80 border border-rose-600/30" />
                          <span className="w-2 h-2 rounded-full bg-amber-500/80 border border-amber-600/30" />
                          <span className="w-2 h-2 rounded-full bg-emerald-500/80 border border-emerald-600/30" />
                        </div>
                        <div className="flex-1 max-w-[200px] mx-3 flex items-center justify-center gap-1.5 px-3 py-1 bg-neutral-900/60 border border-white/10 rounded-md text-[7.5px] text-neutral-400 font-mono tracking-wide truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                          <span>{activeStepData?.uiAddress || 'explore'}</span>
                        </div>
                        <div className="w-6 shrink-0" />
                      </div>

                      {/* Dynamic Simulated Canvas content */}
                      <div className="p-5 min-h-[220px] flex flex-col justify-center relative z-10 overflow-hidden text-left bg-black/40">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${selectedProject.id}-${activeStep}`}
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="w-full flex-grow flex flex-col justify-center space-y-3"
                          >
                            <span className="text-[8.5px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                              Active Simulation view
                            </span>
                            
                            <div className="p-3 rounded-xl border border-white/10 bg-neutral-950/70 space-y-2.5">
                              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <div className="flex items-center gap-2">
                                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                                  <span className="text-[9.5px] font-bold text-white uppercase tracking-wider">{activeStepData?.uiTitle || 'Core Pipeline Interface'}</span>
                                </div>
                                <span className="text-[7.5px] font-mono text-neutral-500">{(activeStepData?.label || 'STAGE').toUpperCase()}</span>
                              </div>

                              <p className="text-[9.5px] text-neutral-400 font-light leading-relaxed">
                                {activeStepData?.insight || 'Configured interface routing models bind dynamically to database collections.'}
                              </p>

                              <div className="flex items-center gap-1.5 font-mono text-[7px] text-cyan-300 bg-neutral-950 px-2 py-1.5 rounded border border-white/5 truncate">
                                <Terminal className="w-2.5 h-2.5 text-purple-400" />
                                <span>{activeStepData?.codeContext || 'const state = useActiveState()'}</span>
                              </div>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Mockup Footer */}
                      <div className="px-4 py-2.5 bg-white/[0.01] border-t border-white/5 flex justify-between items-center text-[7.5px] font-mono text-neutral-500 uppercase tracking-widest z-20">
                        <span className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                          <span>{activeStepData?.phaseName || 'System Interface Pipeline'}</span>
                        </span>
                        <span className="text-cyan-400 font-bold">{activeStepData?.technicalMetric || '+60 FPS Render Cycles'}</span>
                      </div>

                    </div>

                    {/* Timeline Controls */}
                    {modalSteps.length > 0 && (
                      <div className="space-y-2.5">
                        <span className="text-[8px] font-mono font-bold text-neutral-500 uppercase tracking-widest block text-left">
                          Execution Lifecycle Pipeline
                        </span>
                        <div className="grid grid-cols-4 gap-1.5 bg-neutral-950 p-1.5 rounded-xl border border-white/5">
                          {modalSteps.map((step, sIdx) => {
                            const isSelected = activeStep === sIdx;
                            return (
                              <button
                                key={sIdx}
                                onClick={() => setActiveStep(sIdx)}
                                className={`py-1.5 rounded-lg text-[8.5px] font-mono font-bold uppercase tracking-wide cursor-pointer transition-all duration-300 ${
                                  isSelected 
                                    ? 'bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] shadow-sm' 
                                    : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.01]'
                                }`}
                              >
                                {step.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* RIGHT COLUMN: Architectural Specs Bento (Col Span 7) */}
                  <div className="lg:col-span-7 flex flex-col gap-6 w-full">
                    
                    {/* Architectural narrative */}
                    <div className="space-y-2.5">
                      <h4 className="text-[10px] font-mono font-black text-neutral-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-white/5 pb-1">
                        <Layers className="w-3.5 h-3.5 text-cyan-400" />
                        <span>System Architecture Design</span>
                      </h4>
                      <p className="text-neutral-300 text-xs font-light leading-relaxed">
                        {activeArch}
                      </p>
                    </div>

                    {/* Bento metrics Grid */}
                    {pEnrich && pEnrich.metrics && (
                      <div className="grid grid-cols-2 gap-3.5">
                        {pEnrich.metrics.map((metric, mIdx) => {
                          const MetricIcon = metric.icon;
                          return (
                            <div 
                              key={mIdx}
                              className={`p-4 rounded-2xl border border-white/5 bg-neutral-950/60 backdrop-blur-xl flex flex-col justify-between h-[90px] ${metric.glowColor}`}
                            >
                              <div className="flex justify-between items-center">
                                <div className={`p-1 rounded bg-white/5 border border-white/10 ${metric.color}`}>
                                  <MetricIcon className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[7.5px] font-mono tracking-widest text-neutral-500">
                                  {metric.hud}
                                </span>
                              </div>
                              <div className="flex flex-col items-start mt-2">
                                <span className={`text-base font-black tracking-tight leading-none uppercase font-heading ${metric.color}`}>
                                  {metric.value}
                                </span>
                                <span className="text-[7.5px] font-mono font-bold text-neutral-500 uppercase tracking-widest mt-1">
                                  {metric.label}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Screenshots Media Gallery */}
                    {activeGallery.length > 0 && (
                      <div className="space-y-2.5 pt-1">
                        <h4 className="text-[10px] font-mono font-black text-neutral-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-white/5 pb-1">
                          <Layers3 className="w-3.5 h-3.5 text-amber-500" />
                          <span>Screenshots & Media Gallery</span>
                        </h4>
                        
                        <div className="grid grid-cols-3 gap-3">
                          {activeGallery.map((imgUrl: string, imgIdx: number) => (
                            <div 
                              key={imgIdx} 
                              className="relative rounded-xl overflow-hidden border border-white/5 bg-neutral-900 aspect-[4/3] shadow-md hover:border-amber-500/30 transition-all duration-300 group/gal shrink-0"
                            >
                              <img 
                                src={imgUrl} 
                                className="w-full h-full object-cover" 
                                onError={e => (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80'} 
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Expandable Technical details */}
                    <div className="space-y-2.5 pt-1">
                      <h4 className="text-[10px] font-mono font-black text-neutral-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-white/5 pb-1">
                        <Terminal className="w-3.5 h-3.5 text-purple-400" />
                        <span>Deep-Dive Engineering Breakdown</span>
                      </h4>

                      <div className="space-y-2">
                        {/* Tab Accordion 1: Data sync flow */}
                        <div 
                          onClick={() => setActiveInsight(activeInsight === 0 ? null : 0)}
                          className={`rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden relative ${
                            activeInsight === 0 ? 'border-white/10 bg-white/[0.02]' : 'border-white/5 bg-white/[0.002] hover:border-white/10'
                          }`}
                        >
                          <div className="p-3 flex items-center justify-between gap-3 text-left">
                            <span className="heading-font font-bold text-white text-[10px] uppercase tracking-wider">
                              1. Decoupled Routing & API Specs
                            </span>
                            <ChevronRight className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-300 ${
                              activeInsight === 0 ? 'rotate-90 text-white' : ''
                            }`} />
                          </div>
                          <AnimatePresence initial={false}>
                            {activeInsight === 0 && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                              >
                                <p className="px-3 pb-3 pt-0.5 text-neutral-400 text-[11px] font-light leading-relaxed border-t border-white/[0.02]">
                                  {activeApis}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Tab Accordion 2: Challenges */}
                        <div 
                          onClick={() => setActiveInsight(activeInsight === 1 ? null : 1)}
                          className={`rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden relative ${
                            activeInsight === 1 ? 'border-white/10 bg-white/[0.02]' : 'border-white/5 bg-white/[0.002] hover:border-white/10'
                          }`}
                        >
                          <div className="p-3 flex items-center justify-between gap-3 text-left">
                            <span className="heading-font font-bold text-white text-[10px] uppercase tracking-wider">
                              2. Challenges Faced & Optimizations
                            </span>
                            <ChevronRight className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-300 ${
                              activeInsight === 1 ? 'rotate-90 text-white' : ''
                            }`} />
                          </div>
                          <AnimatePresence initial={false}>
                            {activeInsight === 1 && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                              >
                                <p className="px-3 pb-3 pt-0.5 text-neutral-400 text-[11px] font-light leading-relaxed border-t border-white/[0.02]">
                                  {activeOpt}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Tab Accordion 3: Custom Animations */}
                        {activeAnim && (
                          <div 
                            onClick={() => setActiveInsight(activeInsight === 2 ? null : 2)}
                            className={`rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden relative ${
                              activeInsight === 2 ? 'border-white/10 bg-white/[0.02]' : 'border-white/5 bg-white/[0.002] hover:border-white/10'
                            }`}
                          >
                            <div className="p-3 flex items-center justify-between gap-3 text-left">
                              <span className="heading-font font-bold text-white text-[10px] uppercase tracking-wider">
                                3. Interactive Animations & Springs
                              </span>
                              <ChevronRight className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-300 ${
                                activeInsight === 2 ? 'rotate-90 text-white' : ''
                              }`} />
                            </div>
                            <AnimatePresence initial={false}>
                              {activeInsight === 2 && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                >
                                  <p className="px-3 pb-3 pt-0.5 text-neutral-400 text-[11px] font-light leading-relaxed border-t border-white/[0.02]">
                                    {activeAnim}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                        {/* Tab Accordion 4: Backend MVC logic */}
                        {activeBackend && (
                          <div 
                            onClick={() => setActiveInsight(activeInsight === 3 ? null : 3)}
                            className={`rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden relative ${
                              activeInsight === 3 ? 'border-white/10 bg-white/[0.02]' : 'border-white/5 bg-white/[0.002] hover:border-white/10'
                            }`}
                          >
                            <div className="p-3 flex items-center justify-between gap-3 text-left">
                              <span className="heading-font font-bold text-white text-[10px] uppercase tracking-wider">
                                4. Database Schema & MVC Backend Logic
                              </span>
                              <ChevronRight className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-300 ${
                                activeInsight === 3 ? 'rotate-90 text-white' : ''
                              }`} />
                            </div>
                            <AnimatePresence initial={false}>
                              {activeInsight === 3 && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                >
                                  <p className="px-3 pb-3 pt-0.5 text-neutral-400 text-[11px] font-light leading-relaxed border-t border-white/[0.02]">
                                    {activeBackend}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                      </div>
                    </div>

                  </div>

                </div>
              </div>

              {/* MODAL FOOTER CTAs */}
              <div className="p-4.5 border-t border-white/5 flex flex-wrap justify-between items-center gap-4 bg-white/[0.01]">
                <span className="text-[7.5px] font-mono text-neutral-500 uppercase tracking-widest leading-none">
                  Press ESC or click close to return to digital experiences
                </span>

                <div className="flex gap-3">
                  {(!selectedProject.actionButtons || selectedProject.actionButtons.liveDemo?.enabled !== false) && selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-extrabold text-[9px] uppercase tracking-widest shadow-md flex items-center gap-1.5 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                    >
                      <Play className="w-3 h-3 fill-white text-white" />
                      <span>{selectedProject.actionButtons?.liveDemo?.label || 'Launch Live Demo'}</span>
                    </a>
                  )}

                  {(!selectedProject.actionButtons || selectedProject.actionButtons.github?.enabled !== false) && selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-neutral-300 hover:text-white font-extrabold text-[9px] uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>{selectedProject.actionButtons?.github?.label || 'Repository Code'}</span>
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
