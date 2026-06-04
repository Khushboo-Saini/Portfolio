import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Terminal, 
  Database, 
  Cpu, 
  Sparkles, 
  ChevronRight,
  Activity,
  Code2,
  FolderGit2,
  BadgeAlert
} from 'lucide-react';
import BackgroundGradientSnippet from '../components/ui/background-gradient-snippet';
import BackgroundDemo from '../components/ui/background-glow-demo';

interface SkillItem {
  name: string;
  level: number; // percentage
}

interface Capability {
  id: number;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  icon: React.ComponentType<any>;
  technologies: string[];
  skills: SkillItem[];
  gradientClass: string; // Tailwind gradient classes
  glowColor: string;
  accentColor: string;
}

interface SkillItemFromDb {
  id: string;
  skillName: string;
  skillLevel: number;
  category: string;
}

export default function Skills({ skills = [], profile }: { skills?: SkillItemFromDb[]; profile?: any }) {
  // Stacked expertise cards with premium copywriting and distinct color systems
  const capabilities: Capability[] = [
    {
      id: 0,
      title: "Frontend Engineering",
      shortDesc: "Creating immersive, high-performance UI systems",
      detailedDesc: "Designing rich modular systems, responsive layout structures, premium micro-animations, and reusable components using modern frameworks.",
      icon: Layers,
      technologies: ["React.js", "Tailwind CSS", "Framer Motion", "Responsive UI", "Component Systems", "HTML5 & CSS3"],
      skills: [
        { name: "Component Architecture", level: 92 },
        { name: "Responsive Layouts", level: 96 },
        { name: "Fluid Motion & CSS", level: 88 }
      ],
      gradientClass: "from-cyan-400 to-blue-500",
      glowColor: "rgba(34, 211, 238, 0.15)",
      accentColor: "text-cyan-400"
    },
    {
      id: 1,
      title: "Backend Development",
      shortDesc: "Architecting modular routes, servers, and controllers",
      detailedDesc: "Constructing scalable server-side systems, RESTful API endpoints, secure JSON Web Token (JWT) authorization gates, and clean middleware flows.",
      icon: Terminal,
      technologies: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Secure Middleware", "JSON Handling"],
      skills: [
        { name: "Server Architectures", level: 88 },
        { name: "API Logic & Security", level: 85 },
        { name: "Database Integration", level: 90 }
      ],
      gradientClass: "from-purple-400 to-pink-500",
      glowColor: "rgba(192, 132, 252, 0.15)",
      accentColor: "text-purple-400"
    },
    {
      id: 2,
      title: "Database Systems",
      shortDesc: "Modeling schemas and optimizing relational storage",
      detailedDesc: "Handling persistent data models, designing document schemas, structural query indexing, and optimizing low-latency full-stack database aggregations.",
      icon: Database,
      technologies: ["MongoDB", "MySQL", "Data Modeling", "Query Optimization", "Aggregation Layers", "Schema Design"],
      skills: [
        { name: "Data Modeling", level: 86 },
        { name: "Query Performance", level: 82 },
        { name: "MERN Interconnectivity", level: 94 }
      ],
      gradientClass: "from-emerald-400 to-cyan-500",
      glowColor: "rgba(52, 211, 153, 0.15)",
      accentColor: "text-emerald-400"
    },
    {
      id: 3,
      title: "Problem Solving",
      shortDesc: "Structuring clean algorithms and logic concepts",
      detailedDesc: "Formulating optimal algorithms utilizing core Data Structures (DSA), solid Object-Oriented Patterns (OOPs), and writing clean, scalable software.",
      icon: Cpu,
      technologies: ["Java", "JavaScript", "OOPs Core", "DSA Patterns", "Logic Structuring", "Complexity Analysis"],
      skills: [
        { name: "Data Structures (DSA)", level: 82 },
        { name: "OOP Principles & Design", level: 86 },
        { name: "Time/Space Efficiencies", level: 80 }
      ],
      gradientClass: "from-orange-400 to-red-500",
      glowColor: "rgba(251, 146, 60, 0.15)",
      accentColor: "text-orange-400"
    }
  ];

  const getIconComponent = (iconName: string) => {
    const MAP: Record<string, React.ComponentType<any>> = {
      Layers, Terminal, Database, Cpu, Sparkles, ChevronRight, Activity, Code2, FolderGit2, BadgeAlert
    };
    return MAP[iconName] || Layers;
  };

  const displayCapabilities = React.useMemo(() => {
    if (profile?.skillsSection?.capabilities) {
      return profile.skillsSection.capabilities.map((cap: any) => ({
        ...cap,
        icon: getIconComponent(cap.icon)
      }));
    }

    if (!skills || skills.length === 0) {
      return capabilities;
    }

    const grouped: Record<string, { name: string; level: number }[]> = {};
    skills.forEach((s) => {
      const cat = s.category || 'Other';
      if (!grouped[cat]) {
        grouped[cat] = [];
      }
      grouped[cat].push({
        name: s.skillName,
        level: s.skillLevel * 10,
      });
    });

    const categoryIcons: Record<string, any> = {
      'Frontend': Layers,
      'Backend': Terminal,
      'Database': Database,
      'AI & Data': Cpu,
      'DevOps': Cpu,
    };

    const categoryGlows: Record<string, string> = {
      'Frontend': "rgba(34, 211, 238, 0.15)",
      'Backend': "rgba(192, 132, 252, 0.15)",
      'Database': "rgba(52, 211, 153, 0.15)",
      'AI & Data': "rgba(192, 132, 252, 0.15)",
      'DevOps': "rgba(59, 130, 246, 0.15)",
    };

    const categoryGradients: Record<string, string> = {
      'Frontend': "from-cyan-400 to-blue-500",
      'Backend': "from-purple-400 to-pink-500",
      'Database': "from-emerald-400 to-cyan-500",
      'AI & Data': "from-purple-400 to-pink-500",
      'DevOps': "from-blue-400 to-indigo-500",
    };

    const categoryAccents: Record<string, string> = {
      'Frontend': "text-cyan-400",
      'Backend': "text-purple-400",
      'Database': "text-emerald-400",
      'AI & Data': "text-purple-400",
      'DevOps': "text-blue-400",
    };

    return Object.entries(grouped).map(([title, items], idx) => {
      const cleanTitle = title.charAt(0).toUpperCase() + title.slice(1);
      const techs = items.map(i => i.name);
      return {
        id: idx,
        title: cleanTitle + " Capabilities",
        shortDesc: `Managing dynamic ${cleanTitle} architectures and structures`,
        detailedDesc: `Engineered using custom ${cleanTitle} solutions: ${techs.join(', ')}.`,
        icon: categoryIcons[cleanTitle] || Layers,
        technologies: techs,
        skills: items,
        gradientClass: categoryGradients[cleanTitle] || "from-cyan-400 to-blue-500",
        glowColor: categoryGlows[cleanTitle] || "rgba(34, 211, 238, 0.15)",
        accentColor: categoryAccents[cleanTitle] || "text-cyan-400",
      };
    });
  }, [skills, profile?.skillsSection?.capabilities]);

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(0); // Default open first card
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Stats Grid Data for Left Identity Block
  const identityStats = profile?.skillsSection?.profile?.stats || [
    { value: "10+", label: "Projects Completed", color: "text-cyan-400" },
    { value: "MERN", label: "Core Stack Focus", color: "text-purple-400" },
    { value: "Frontend", label: "UI Specialist", color: "text-pink-400" }
  ];

  // Technology Universe marquee keywords
  const marqueeTechs = profile?.skillsSection?.techStrip?.filter((t: any) => t.enabled !== false) || [
    { name: "React.js", color: "text-[#61DAFB]" },
    { name: "Node.js", color: "text-[#339933]" },
    { name: "Express.js", color: "text-neutral-300" },
    { name: "MongoDB", color: "text-[#47A248]" },
    { name: "MySQL", color: "text-[#4479A1]" },
    { name: "Java", color: "text-[#007396]" },
    { name: "JavaScript", color: "text-[#F7DF1E]" },
    { name: "Tailwind CSS", color: "text-[#38BDF8]" },
    { name: "REST APIs", color: "text-purple-400" },
    { name: "Framer Motion", color: "text-pink-400" },
    { name: "GitHub", color: "text-neutral-200" },
    { name: "Postman", color: "text-[#FF6C37]" },
    { name: "VS Code", color: "text-[#007ACC]" },
    { name: "OOPs", color: "text-cyan-400" },
    { name: "DSA", color: "text-emerald-400" },
    { name: "Responsive UI", color: "text-sky-300" },
  ];

  return (
    <section 
      ref={containerRef}
      id="skills-ecosystem" 
      className="py-16 md:py-24 relative overflow-hidden select-none text-left"
    >
      {/* Dynamic Vercel / Linear Background Snippets */}
      <BackgroundGradientSnippet />
      <BackgroundDemo />
      
      {/* Subtle top edge grid boundary divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-[1300px] mx-auto px-6 md:px-10 relative z-10 space-y-16">
        
        {/* ================= 1. SECTION TITLE INTRO ================= */}
        <div className="flex flex-col items-center justify-center text-center w-full mx-auto pb-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.2em" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl heading-font font-black uppercase text-white tracking-widest leading-none bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent"
          >
            {profile?.skillsSection?.hero?.title || profile?.heroSection?.storyBlocks?.sections?.skills?.title || "SKILLS"}
          </motion.h2>
          
          {(profile?.skillsSection?.hero?.intro || profile?.heroSection?.storyBlocks?.sections?.skills?.intro) && (
            <p className="text-neutral-400 text-xs md:text-sm max-w-[600px] mt-3 font-medium text-center">
              {profile?.skillsSection?.hero?.intro || profile.heroSection.storyBlocks.sections.skills.intro}
            </p>
          )}

          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: `${profile?.skillsSection?.hero?.underlineWidth ?? 100}px`, opacity: 0.8 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="h-[2px] mt-4"
            style={{
              background: profile?.skillsSection?.hero?.underlineColor 
                ? `linear-gradient(to right, transparent, ${profile.skillsSection.hero.underlineColor}, transparent)`
                : "linear-gradient(to right, transparent, #06B6D4, transparent)",
              boxShadow: profile?.skillsSection?.hero?.underlineGlow !== false 
                ? `0 0 10px ${profile?.skillsSection?.hero?.underlineColor || "#06B6D4"}` 
                : "none"
            }}
          />
        </div>

        {/* ================= 2. MODERN ENGINEERING DASHBOARD GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT SIDE: STRONG IDENTITY BLOCK (40%) ================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Identity Card */}
            <div className="glass-card rounded-2xl border border-white/5 bg-neutral-950/40 p-6 flex flex-col gap-5 relative overflow-hidden group shadow-lg">
              
              {/* Sleek Vercel-style subtle top gradient boundary */}
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              {/* Top Row: User Avatar & Basic Info */}
              <div className="flex items-center gap-4.5">
                
                {/* Sleek Minimalist Glowing Logo Icon */}
                <div className="w-[85px] h-[85px] rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center shrink-0 relative group/avatar overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-purple-500/20 opacity-40 group-hover/avatar:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  {/* Subtle inner grid glow */}
                  <div className="absolute w-[60px] h-[60px] bg-cyan-500/10 blur-[15px] rounded-full group-hover/avatar:bg-purple-500/20 transition-all duration-500" />
                  <Code2 className="w-8 h-8 text-cyan-400 group-hover/avatar:text-purple-300 group-hover/avatar:scale-110 transition-all duration-500 relative z-10" />
                </div>

                {/* Developer Identification Details */}
                <div className="space-y-1">
                  <h3 className="heading-font font-bold text-white text-lg tracking-wide">
                    {profile?.user?.name || "Khushaboo Saini"}
                  </h3>
                  <p className="text-neutral-400 text-xs font-medium">
                    {profile?.headline || "Full Stack Developer"}
                  </p>
                  
                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-cyan-500/5 rounded-full border border-cyan-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[7.5px] font-mono text-cyan-300 font-bold tracking-widest uppercase">
                      {profile?.availabilityStatus ? profile.availabilityStatus.toUpperCase() : "AVAILABLE FOR ROLES"}
                    </span>
                  </div>
                </div>

              </div>

              {/* Bio Summary Block */}
              <p className="text-neutral-300 text-xs font-light leading-relaxed border-t border-white/[0.04] pt-4.5">
                {profile?.bio || "Building scalable web applications with modern frontend experiences, robust server architectures, clean route models, and persistent databases."}
              </p>

              {/* Mini Stats Module Grid */}
              <div className="grid grid-cols-3 gap-3 border-t border-white/[0.04] pt-4.5">
                {identityStats.map((stat, idx) => (
                  <div 
                    key={idx}
                    className="bg-white/[0.01] border border-white/[0.03] p-3 rounded-xl flex flex-col justify-center text-left hover:border-white/10 transition-colors"
                  >
                    <span className={`text-base font-bold heading-font ${stat.color}`}>
                      {stat.value}
                    </span>
                    <span className="text-[8px] font-mono font-bold text-neutral-500 uppercase tracking-wide mt-0.5 leading-none">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* Micro-System Metrics Card */}
            <div className="glass-card rounded-2xl border border-white/5 bg-neutral-950/20 p-4.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <Activity className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-white text-[11px] font-mono font-bold uppercase tracking-wider">
                    {profile?.skillsSection?.pipelineCard?.title || "Developer Pipeline"}
                  </h4>
                  <span className="text-neutral-500 text-[9px] font-mono uppercase tracking-widest block mt-0.5">
                    {profile?.skillsSection?.pipelineCard?.subtitle || "MERN WORKFLOW INTEGRATION"}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest px-2 py-0.5 bg-emerald-500/5 rounded-full border border-emerald-500/10">
                {profile?.skillsSection?.pipelineCard?.status || "ACTIVE"}
              </span>
            </div>

          </div>

          {/* ================= RIGHT SIDE: STACKED EXPERTISE CAPABILITY STACK (60%) ================= */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {displayCapabilities.map((cap) => {
              const Icon = cap.icon;
              const isSelected = activeCard === cap.id;

              return (
                <div
                  key={cap.id}
                  onMouseEnter={() => setHoveredCard(cap.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setActiveCard(isSelected ? null : cap.id)}
                  className={`glass-card rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden relative group text-left ${
                    isSelected 
                      ? 'border-white/10 bg-neutral-950/40 shadow-[0_12px_24px_-8px_rgba(255,255,255,0.02)]' 
                      : 'border-white/5 hover:border-white/10 bg-white/[0.01]'
                  }`}
                  style={{
                    boxShadow: isSelected ? `0 12px 30px -10px ${cap.glowColor}` : 'none'
                  }}
                >
                  
                  {/* High fidelity dynamic gradient edge highlight */}
                  <div className={`absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b ${cap.gradientClass} transition-all duration-500 ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-30'
                  }`} />

                  {/* Card Header Row */}
                  <div className="p-4.5 flex items-center justify-between gap-4">
                    
                    <div className="flex items-center gap-4 min-w-0">
                      
                      {/* Shield Frame Icon */}
                      <div className={`w-9.5 h-9.5 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-500 ${
                        isSelected 
                          ? `bg-white/5 border-white/10 ${cap.accentColor}`
                          : 'bg-white/5 border-white/5 text-neutral-400 group-hover:text-neutral-200'
                      }`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>

                      {/* Labels and copywriting */}
                      <div className="min-w-0">
                        <h4 className="heading-font font-bold text-white text-xs md:text-sm tracking-wide group-hover:text-neutral-200 transition-colors">
                          {cap.title}
                        </h4>
                        <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest block mt-0.5 group-hover:text-neutral-400 transition-colors">
                          {cap.shortDesc}
                        </span>
                      </div>

                    </div>

                    {/* Toggle arrow indicator */}
                    <div className={`w-5.5 h-5.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-neutral-400 transition-transform duration-500 ${
                      isSelected ? 'rotate-90 text-white border-white/10' : ''
                    }`}>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>

                  </div>

                  {/* Expandable detailed drawer panel */}
                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-4.5 pb-4.5 pt-1 border-t border-white/[0.03] space-y-4">
                          
                          {/* Expanded detailed description */}
                          <p className="text-neutral-400 text-xs font-light leading-relaxed">
                            {cap.detailedDesc}
                          </p>

                          {/* Level meters */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {cap.skills.map((skill, sIdx) => (
                              <div key={sIdx} className="space-y-1">
                                <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400 font-bold">
                                  <span>{skill.name}</span>
                                  <span className={cap.accentColor}>{skill.level}%</span>
                                </div>
                                <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className={`h-full rounded-full bg-gradient-to-r ${cap.gradientClass}`}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Skill pills */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {cap.technologies.map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2.5 py-1 text-[8.5px] font-mono font-extrabold text-neutral-400 bg-white/[0.02] border border-white/5 rounded-md hover:border-white/10 hover:text-white transition-all duration-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}

          </div>

        </div>

        {/* ================= 3. PREMIUM SLIDABLE TAPE TICKER MARQUEE ================= */}
        <div className="pt-8">
          <div className="glass-card rounded-2xl border border-white/5 p-4 bg-neutral-950/20 backdrop-blur-md relative overflow-hidden shadow-md">
            
            {/* Seamless fading edge rules */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#03000a] via-[#03000a]/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#03000a] via-[#03000a]/50 to-transparent z-10 pointer-events-none" />

            <div className="marquee-container relative z-10">
              
              <div className="marquee-content flex items-center">
                
                {/* 1st loop marquee list */}
                {marqueeTechs.map((tech, idx) => {
                  const isTailwind = tech.color && (tech.color.startsWith('text-') || tech.color.startsWith('text-['));
                  return (
                    <div key={idx} className="flex items-center gap-2.5 shrink-0 px-5 group/marquee">
                      <Sparkles className="w-3 h-3 text-neutral-400 group-hover/marquee:scale-110 group-hover/marquee:text-white transition-all duration-300" />
                      <span 
                        className={`text-[9.5px] font-mono font-extrabold tracking-widest uppercase ${isTailwind ? tech.color : ''}`}
                        style={!isTailwind ? { color: tech.color } : {}}
                      >
                        {tech.name}
                      </span>
                    </div>
                  );
                })}

                {/* 2nd duplicated loop block for seamless translation */}
                {marqueeTechs.map((tech, idx) => {
                  const isTailwind = tech.color && (tech.color.startsWith('text-') || tech.color.startsWith('text-['));
                  return (
                    <div key={`dup-${idx}`} className="flex items-center gap-2.5 shrink-0 px-5 group/marquee">
                      <Sparkles className="w-3 h-3 text-neutral-400 group-hover/marquee:scale-110 group-hover/marquee:text-white transition-all duration-300" />
                      <span 
                        className={`text-[9.5px] font-mono font-extrabold tracking-widest uppercase ${isTailwind ? tech.color : ''}`}
                        style={!isTailwind ? { color: tech.color } : {}}
                      >
                        {tech.name}
                      </span>
                    </div>
                  );
                })}

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
