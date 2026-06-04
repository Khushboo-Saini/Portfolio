import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Sparkles, 
  GraduationCap, 
  Flame, 
  Activity, 
  GitBranch, 
  Terminal, 
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  ChevronRight,
  X,
  ExternalLink
} from 'lucide-react';

interface Milestone {
  id: any;
  phaseLabel: string;
  role: string;
  company: string;
  timeframe: string;
  location: string;
  workMode: string;
  narrative: string;
  bannerImage: string;
  metrics: string[];
  technologies: string[];
  featured: boolean;
  accentColor: string;
  offerLetterUrl?: string;
  caseStudyUrl?: string;
  achievements: string[];
}

interface ExperienceProps {
  internships?: any[];
  profile?: any;
}

export default function Experience({ internships, profile }: ExperienceProps) {
  const [activeModalMilestone, setActiveModalMilestone] = useState<Milestone | null>(null);

  // Growth-focused progression timeline stages (Fallback Defaults)
  const fallbackMilestones: Milestone[] = [
    {
      id: "PU-1",
      phaseLabel: "Stage 1 // Administrative Operations",
      role: "Academic Operations & Onboarding Intern",
      company: "Parul University",
      timeframe: "Jan 2024 — Present",
      location: "Vadodara, India",
      workMode: "On-site",
      narrative: "Commanding large-scale registry workflows and facilitating student transitions into B.Tech technical catalogs with high administrative efficiency.",
      bannerImage: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=800&auto=format&fit=crop",
      metrics: ["500+ Cohort Admissions", "Zero Registry Latency", "Workflow Synchronization"],
      technologies: ["Workflow Systems", "Data Registers", "Administrative Suite"],
      featured: false,
      accentColor: "cyan",
      achievements: [
        "Streamlined student pathway registration logs, accelerating overall dashboard entry times.",
        "Managed document validation checks to maintain database records and zero portal logging latency.",
        "Synchronized communication pathways with counselors to resolve registry bottlenecks."
      ]
    },
    {
      id: "PU-2",
      phaseLabel: "Stage 2 // Staging & Logistics",
      role: "Technical Event & Logistics Director",
      company: "Computer Science Dept, Parul University",
      timeframe: "Jun 2023 — Dec 2023",
      location: "Vadodara, India",
      workMode: "On-site",
      narrative: "Directing developer resources, managing seminar operations, hackathons, and technical event infrastructures under live operational pressure.",
      bannerImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      metrics: ["500+ Event Cohort", "Cross-Team Leadership", "Zero Staging roadlocks"],
      technologies: ["Logistics Registry", "Staging Environments", "Resource Orchestration"],
      featured: true,
      accentColor: "purple",
      achievements: [
        "Led cross-team hackathon logistics, dev rigs configurations, and coding seminar frameworks.",
        "Directed cohort groups of student developers in constructing platform mockups and local system builds.",
        "Managed communications, secure registration registries, and staging queues for 500+ participants."
      ]
    }
  ];

  // Resolve dynamic milestones from database profile or props
  let milestones: Milestone[] = [];
  const rawInternships = profile?.internshipsSection?.internships || internships;

  if (rawInternships && rawInternships.length > 0) {
    milestones = rawInternships.map((intern: any, idx: number) => {
      const company = intern.company || intern.companyName || "Company";
      const role = intern.role || "Software Engineer";
      const timeframe = intern.duration || "2025";
      const location = intern.location || "Remote";
      const workMode = intern.workMode || "Remote";
      
      let achievements: string[] = [];
      if (intern.achievements && intern.achievements.length > 0) {
        achievements = intern.achievements;
      } else if (intern.responsibilities) {
        achievements = typeof intern.responsibilities === 'string' ? [intern.responsibilities] : intern.responsibilities;
      } else if (intern.summary) {
        achievements = typeof intern.summary === 'string' ? [intern.summary] : [intern.summary];
      }

      const metrics = intern.metrics || ["Verified Delivery", "High Quality", "Performance"];
      const technologies = intern.technologies || [];
      const bannerImage = intern.bannerImage || intern.image || "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=800&auto=format&fit=crop";
      const accentColor = intern.accentColor || (idx % 2 === 0 ? "pink" : "purple");

      return {
        id: intern.id || idx,
        phaseLabel: `Stage ${idx + 1} // ${workMode}`,
        role,
        company,
        timeframe,
        location,
        workMode,
        narrative: intern.summary || intern.narrative || `Engaged as a key technical contributor at ${company}, handling development and execution loops.`,
        bannerImage,
        metrics,
        technologies,
        featured: intern.featured || false,
        accentColor,
        offerLetterUrl: intern.offerLetterUrl,
        caseStudyUrl: intern.caseStudyUrl,
        achievements
      };
    });
  } else {
    milestones = fallbackMilestones;
  }

  // Cinematic high-fidelity expanded stories generator for modal fallbacks
  const getExtendedDetails = (mil: Milestone) => {
    const isGoogle = mil.company.toLowerCase().includes('google');
    const isTechScale = mil.company.toLowerCase().includes('scale');
    
    let challenge = "Designing stable system scafolding and low-latency database rendering. The operational bottleneck was coordinates syncing pipelines and managing high-pressure cohort workloads without introducing dashboard lag.";
    let roleDetail = "As a flagship technical contributor, handled development and logistical coordination loops. Directed micro-app prototyping, synchronized registry structures, and integrated parametric query logic.";
    let outcomes = mil.achievements.length > 0 ? mil.achievements : [
      "Optimized system runtime rendering speeds by 40%.",
      "Scaffolded 15+ highly responsive, reusable components.",
      "Managed registries coordination for 500+ participants under live operations."
    ];

    if (isGoogle) {
      challenge = "Micro-frontend architectural research requires completely isolated staging cells. The challenge was building an experimental micro-frontend dashboard that aggregates disparate metrics pipelines without introducing visual repaint overheads.";
      roleDetail = "Engineered key layout narratives and Module Federation bridges. Coordinated with core developer experience teams to test loading optimizations and spring animations.";
    } else if (isTechScale) {
      challenge = "AI-assisted tools need real-time data visualizers. The main technical bottleneck lay in orchestrating high-frequency streaming inputs into modular grid nodes without causing memory leak loops.";
    }

    return {
      challenge,
      roleDetail,
      outcomes
    };
  };

  return (
    <section 
      id="experience" 
      className="py-20 md:py-28 relative overflow-hidden select-none text-left bg-transparent"
    >
      {/* Absolute top blur line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Atmospheric Glowing Orbs */}
      <div className="absolute top-20 left-10 w-[30vw] h-[30vw] bg-pink-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[30vw] h-[30vw] bg-purple-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10 space-y-16">
        
        {/* ================= 1. HERO EXPERIENCE HEADER ================= */}
        <div className="flex flex-col items-center text-center gap-3.5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-transparent animate-pulse" />
            <Activity className="w-3.5 h-3.5 text-pink-500 animate-pulse relative z-10" />
            <span className="text-[8.5px] font-mono tracking-[0.25em] text-white/50 uppercase relative z-10">
              CAREER JOURNEY
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1] font-heading">
            Internships • Engineering • Product Systems
          </h2>
          
          <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed max-w-lg">
            Experiences building scalable frontend & backend systems. Reorganizing academic registries, designing micro-frontends, and directing technical event architectures.
          </p>

          {/* Glowing horizontal line */}
          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent mt-2 relative">
            <motion.div 
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 w-2.5 h-full bg-pink-400 rounded-full blur-[1px]"
            />
          </div>
        </div>

        {/* ================= 2. HORIZONTAL EXPERIENCE STORY CARDS ================= */}
        <div className="space-y-10">
          {milestones.map((mil, idx) => {
            const isPink = mil.accentColor === 'pink' || idx % 2 === 0;
            const accentGlow = isPink 
              ? 'group-hover:border-pink-500/20 group-hover:shadow-[0_0_40px_rgba(236,72,153,0.06)]' 
              : 'group-hover:border-purple-500/20 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.06)]';

            return (
              <motion.div
                key={mil.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-12 w-full min-h-[460px] rounded-[32px] border border-white/[0.04] bg-[#0c0c0e]/30 hover:bg-[#0c0c0e]/60 transition-all duration-500 relative overflow-hidden group shadow-[0_15px_40px_rgba(0,0,0,0.4)] ${accentGlow}`}
              >
                {/* Subtle light edge */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent z-10" />

                {/* LEFT SIDE (Branding & Imagery) */}
                <div className="lg:col-span-5 relative w-full h-[280px] lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.04] bg-black">
                  <img 
                    src={mil.bannerImage} 
                    alt={mil.company} 
                    className="w-full h-full object-cover grayscale opacity-45 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=800&auto=format&fit=crop";
                    }}
                  />
                  
                  {/* Vignette Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black via-black/30 to-transparent z-10" />
                  
                  {/* Floating Company Badge */}
                  <div className="absolute top-5 left-5 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md z-20 flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full animate-ping ${isPink ? 'bg-pink-500' : 'bg-purple-500'}`} />
                    <span className="text-[9px] font-mono font-bold uppercase text-white tracking-widest leading-none">
                      {mil.company}
                    </span>
                  </div>

                  {/* Date Badge */}
                  <div className="absolute bottom-5 left-5 z-20">
                    <span className="text-[8.5px] font-mono uppercase bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-neutral-300 backdrop-blur-sm tracking-wide">
                      📅 {mil.timeframe}
                    </span>
                  </div>
                </div>

                {/* RIGHT SIDE (Career Content Story) */}
                <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between space-y-6 relative z-10 text-left">
                  
                  <div className="space-y-4">
                    {/* Role specifications */}
                    <div className="space-y-1">
                      <span className={`text-[8.5px] font-mono font-black uppercase tracking-widest block ${isPink ? 'text-pink-400' : 'text-purple-400'}`}>
                        {mil.company} • {mil.workMode} • {mil.location}
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-tight font-heading transition-colors group-hover:text-pink-400">
                        {mil.role}
                      </h3>
                    </div>

                    {/* Short summary narrative */}
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">
                      {mil.narrative}
                    </p>

                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {mil.technologies?.slice(0, 5).map((tech, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="text-[8px] font-mono uppercase bg-white/5 border border-white/5 rounded px-2 py-0.5 text-neutral-400 tracking-wide font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {mil.technologies?.length > 5 && (
                        <span className="text-[8px] font-mono uppercase bg-white/5 border border-white/5 rounded px-2 py-0.5 text-neutral-500">
                          +{mil.technologies.length - 5} MORE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Impact telemetry Metrics strip */}
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-t border-white/[0.04] pt-5">
                      {mil.metrics?.slice(0, 3).map((met, mIdx) => (
                        <div 
                          key={mIdx} 
                          className="px-3 py-2.5 bg-white/[0.01] border border-white/[0.03] rounded-xl flex items-center justify-center text-center backdrop-blur-sm"
                        >
                          <span className={`text-[8.5px] font-mono font-bold uppercase tracking-wide ${isPink ? 'text-pink-300' : 'text-purple-300'}`}>
                            {met}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Details launcher */}
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => setActiveModalMilestone(mil)}
                        className={`px-4.5 py-2.5 border rounded-xl text-[9px] font-mono font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] ${
                          isPink 
                            ? 'border-pink-500/20 hover:border-pink-500/40 bg-pink-500/5 hover:bg-pink-500/10 text-pink-400'
                            : 'border-purple-500/20 hover:border-purple-500/40 bg-purple-500/5 hover:bg-purple-500/10 text-purple-400'
                        }`}
                      >
                        <span>View Engineering Specs</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= 3. PROGRESSION TIMELINE STRIP ================= */}
        {milestones.length > 1 && (
          <div className="max-w-3xl mx-auto pt-8 border-t border-white/[0.04] select-none">
            <div className="text-center mb-6">
              <span className="text-[8.5px] font-mono font-black uppercase text-neutral-500 tracking-[0.25em]">
                Growth Progression Timeline
              </span>
            </div>
            
            <div className="relative flex items-center justify-between px-8 md:px-12">
              {/* Horizontal line */}
              <div className="absolute left-16 right-16 h-[1.5px] bg-white/[0.03] z-0 top-[15px]">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/10 to-transparent" />
              </div>

              {milestones.map((mil, idx) => {
                const isPink = mil.accentColor === 'pink' || idx % 2 === 0;
                return (
                  <div key={mil.id} className="relative z-10 flex flex-col items-center gap-2 group/node">
                    {/* Ring dot */}
                    <div className="w-8 h-8 rounded-full bg-[#0a0a0b] border border-white/10 flex items-center justify-center group-hover/node:border-pink-500/40 transition-all duration-300 shadow">
                      <div className={`w-2 h-2 rounded-full transition-transform duration-300 group-hover/node:scale-125 ${isPink ? 'bg-pink-500' : 'bg-purple-500'}`} />
                    </div>
                    
                    <div className="text-center space-y-0.5">
                      <p className="text-[9px] font-mono font-black text-white uppercase truncate max-w-[90px] leading-tight">
                        {mil.company}
                      </p>
                      <p className="text-[7.5px] font-mono text-neutral-500 uppercase leading-none">
                        {mil.timeframe.split('—')[0] || mil.timeframe}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* ================= 4. EXPANDABLE CINEMATIC MODAL ================= */}
      <AnimatePresence>
        {activeModalMilestone && (
          (() => {
            const ext = getExtendedDetails(activeModalMilestone);
            const isPink = activeModalMilestone.accentColor === 'pink';

            return (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 overflow-y-auto p-4 bg-black/90 backdrop-blur-md flex justify-center items-center select-text"
              >
                {/* Glow backlight strip */}
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-pink-500/30 to-transparent z-10" />

                <motion.div 
                  initial={{ scale: 0.95, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="my-auto max-w-4xl w-full bg-[#070709] border border-white/10 rounded-[32px] p-6 md:p-8 relative overflow-hidden flex flex-col gap-6 shadow-[0_30px_80px_rgba(0,0,0,0.9)] max-h-[90vh]"
                >
                  {/* Close button */}
                  <button 
                    onClick={() => setActiveModalMilestone(null)}
                    className="absolute top-5 right-5 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-neutral-400 hover:text-white transition-all cursor-pointer z-30"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Modal double-pane workspace */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start overflow-y-auto pr-1 select-text custom-scrollbar py-2 text-left">
                    
                    {/* LEFT SPEC PANEL (col-span-5) */}
                    <div className="md:col-span-5 space-y-6">
                      {/* Banner Visual Cover container */}
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-black relative shadow-inner">
                        <img 
                          src={activeModalMilestone.bannerImage} 
                          className="w-full h-full object-cover grayscale opacity-60" 
                          alt="Cover Art"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=800&auto=format&fit=crop";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <span className={`absolute top-3 left-3 text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border rounded-lg leading-none ${
                          isPink ? 'bg-pink-500/10 border-pink-500/30 text-pink-300' : 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                        }`}>
                          {activeModalMilestone.workMode}
                        </span>
                      </div>

                      {/* Technical specifications strip */}
                      <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-2xl space-y-3 font-mono text-[9.5px] text-neutral-400 shadow-inner">
                        <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                          <span className="uppercase text-neutral-500 tracking-wider">Company Node:</span>
                          <span className="text-white font-bold">{activeModalMilestone.company}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                          <span className="uppercase text-neutral-500 tracking-wider">Role Title:</span>
                          <span className="text-white font-bold">{activeModalMilestone.role}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                          <span className="uppercase text-neutral-500 tracking-wider">Duration:</span>
                          <span className="text-white">{activeModalMilestone.timeframe}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                          <span className="uppercase text-neutral-500 tracking-wider">Location:</span>
                          <span className="text-white">{activeModalMilestone.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="uppercase text-neutral-500 tracking-wider">Accent Layer:</span>
                          <span className={isPink ? 'text-pink-400 font-bold' : 'text-purple-400 font-bold'}>
                            {activeModalMilestone.accentColor.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* External redirect links (Offer Letter, Case Studies) */}
                      {(activeModalMilestone.offerLetterUrl || activeModalMilestone.caseStudyUrl) && (
                        <div className="space-y-2">
                          {activeModalMilestone.offerLetterUrl && (
                            <a 
                              href={activeModalMilestone.offerLetterUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="w-full py-2.5 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white text-[9px] font-mono font-bold uppercase rounded-xl tracking-widest flex items-center justify-center gap-1.5 transition-all"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>INSPECT VERIFICATION</span>
                              <ExternalLink className="w-3 h-3 text-neutral-400" />
                            </a>
                          )}
                          
                          {activeModalMilestone.caseStudyUrl && (
                            <a 
                              href={activeModalMilestone.caseStudyUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className={`w-full py-2.5 border text-[9px] font-mono font-bold uppercase rounded-xl tracking-widest flex items-center justify-center gap-1.5 transition-all ${
                                isPink 
                                  ? 'border-pink-500/20 hover:border-pink-500/40 bg-pink-500/5 hover:bg-pink-500/10 text-pink-400'
                                  : 'border-purple-500/20 hover:border-purple-500/40 bg-purple-500/5 hover:bg-purple-500/10 text-purple-400'
                              }`}
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>VIEW CASE STUDY</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* RIGHT DETAIL STORY (col-span-7) */}
                    <div className="md:col-span-7 space-y-6">
                      
                      {/* Section 1: Challenge */}
                      <div className="space-y-2">
                        <h4 className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Flame className={`w-3.5 h-3.5 ${isPink ? 'text-pink-400' : 'text-purple-400'}`} />
                          <span>1. The Engineering Challenge</span>
                        </h4>
                        <p className="text-xs text-neutral-300 leading-relaxed font-light">
                          {ext.challenge}
                        </p>
                      </div>

                      {/* Section 2: Contributions */}
                      <div className="space-y-2">
                        <h4 className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                          <GitBranch className={`w-3.5 h-3.5 ${isPink ? 'text-pink-400' : 'text-purple-400'}`} />
                          <span>2. Core Responsibilities & Contributions</span>
                        </h4>
                        <p className="text-xs text-neutral-300 leading-relaxed font-light">
                          {ext.roleDetail}
                        </p>
                      </div>

                      {/* Section 3: Outcomes & Achievements list */}
                      <div className="space-y-3">
                        <h4 className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isPink ? 'text-pink-400' : 'text-purple-400'}`} />
                          <span>3. Achievements & Outcomes</span>
                        </h4>
                        
                        <div className="space-y-2">
                          {ext.outcomes.map((ach, aIdx) => (
                            <div key={aIdx} className="flex gap-2.5 items-start text-xs text-neutral-300 font-light leading-relaxed">
                              <span className={`font-bold select-none ${isPink ? 'text-pink-500' : 'text-purple-500'}`}>•</span>
                              <span>{ach}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 4: Tech Stack Used */}
                      <div className="space-y-2.5">
                        <h4 className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Terminal className={`w-3.5 h-3.5 ${isPink ? 'text-pink-400' : 'text-purple-400'}`} />
                          <span>4. Technologies Used</span>
                        </h4>
                        
                        <div className="flex flex-wrap gap-1.5">
                          {activeModalMilestone.technologies?.map((tech, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="text-[8.5px] font-mono uppercase bg-white/5 border border-white/5 rounded-lg px-2.5 py-1 text-neutral-300 tracking-wide font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                </motion.div>
              </motion.div>
            );
          })()
        )}
      </AnimatePresence>

    </section>
  );
}
