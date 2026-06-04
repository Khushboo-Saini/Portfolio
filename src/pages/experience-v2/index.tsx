import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, Sparkles, Activity, Briefcase, 
  ChevronRight, ExternalLink, ShieldCheck, Flame, GitBranch, Terminal
} from 'lucide-react';
import axios from 'axios';
import { io } from 'socket.io-client';

interface ExperienceEntry {
  id: string;
  companyName: string;
  roleTitle: string;
  employmentType: string;
  location: string;
  workMode: string;
  startDate: string;
  endDate: string;
  currentWorking: boolean;
  tagline: string;
  description: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  coverImage: string | null;
  backgroundImage: string | null;
  logo: string | null;
  accentColor: string | null;
  themeVariant: string | null;
  buttonText: string | null;
  buttonUrl: string | null;
  openInNewTab: boolean;
  timelineOrder: number;
  timelineVisible: boolean;
  timelineHighlight: boolean;
  timelineDotColor: string | null;
  featured: boolean;
  published: boolean;
}

export default function ExperienceV2() {
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  // Fetch initial experiences
  const fetchExperiences = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/ks/experience');
      const data = res.data.data.experiences || [];
      const publishedOnly = data.filter((e: ExperienceEntry) => e.published);
      setExperiences(publishedOnly);
      
      // Default active to featured or first experience
      const featured = publishedOnly.find((e: ExperienceEntry) => e.featured);
      if (featured) {
        setActiveNodeId(featured.id);
      } else if (publishedOnly.length > 0) {
        setActiveNodeId(publishedOnly[0].id);
      }
    } catch (err) {
      console.error('Failed to load experiences on frontend:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();

    // Hook up real-time socket updates
    const socket = io('http://localhost:5000');
    socket.emit('portfolio:join', 'khushaboo');

    socket.on('experience_ks:updated', (payload) => {
      const data = payload.experiences || [];
      const publishedOnly = data.filter((e: ExperienceEntry) => e.published);
      setExperiences(publishedOnly);
      
      // Ensure active node exists in new list, else fallback
      if (publishedOnly.length > 0) {
        const stillExists = publishedOnly.some((e: ExperienceEntry) => e.id === activeNodeId);
        if (!stillExists) {
          const featured = publishedOnly.find((e: ExperienceEntry) => e.featured);
          setActiveNodeId(featured ? featured.id : publishedOnly[0].id);
        }
      } else {
        setActiveNodeId(null);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [activeNodeId]);

  // Find current active experience details
  const activeExperience = experiences.find(e => e.id === activeNodeId) || experiences[0];

  // Auto-color tag styling helper
  const getBadgeStyle = (tech: string) => {
    const hash = tech.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      'bg-pink-500/10 text-pink-400 border border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.05)]',
      'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.05)]',
      'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.05)]',
      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.05)]',
      'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.05)]',
      'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.05)]'
    ];
    return colors[hash % colors.length];
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-t-2 border-pink-500 border-solid rounded-full animate-spin" />
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Accessing Career Registers...</span>
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4 text-center">
        <Briefcase className="w-12 h-12 text-zinc-700 animate-bounce" />
        <h3 className="text-md font-bold text-white uppercase tracking-wider">No professional nodes found</h3>
        <p className="text-xs text-zinc-500 max-w-xs">The experience chronology workspace is currently empty.</p>
      </div>
    );
  }

  // Active details styles
  const accentColor = activeExperience?.accentColor || '#ec4899';
  const isNeonTheme = activeExperience?.themeVariant === 'neon';
  const isGlassTheme = activeExperience?.themeVariant === 'glass';

  // Formatting description text helper
  const renderDescription = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((para, i) => (
      <p key={i} className="text-xs text-neutral-400 font-light leading-relaxed mb-3">
        {para}
      </p>
    ));
  };

  return (
    <section id="experience" className="py-20 md:py-28 relative overflow-hidden select-none text-left bg-transparent">
      {/* Absolute top blur line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Ambient Lights */}
      <div 
        className="absolute top-20 left-10 w-[35vw] h-[35vw] rounded-full blur-[120px] pointer-events-none transition-all duration-700" 
        style={{ backgroundColor: `${accentColor}05` }}
      />
      <div className="absolute bottom-20 right-10 w-[30vw] h-[30vw] bg-purple-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10 space-y-16">
        
        {/* ================= 1. HERO EXPERIENCE HEADER ================= */}
        <div className="flex flex-col items-center text-center gap-3.5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-transparent animate-pulse" />
            <Activity className="w-3.5 h-3.5 text-pink-500 animate-pulse relative z-10" />
            <span className="text-[8.5px] font-mono tracking-[0.25em] text-white/50 uppercase relative z-10">
              Professional Catalog V2
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1] font-heading">
            Engineering & Product Systems
          </h2>
          
          <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed max-w-lg">
            A chronological timeline of my internships, roles, and engineering contributions. Hover or select nodes to inspect architectural case studies and metrics.
          </p>

          {/* Underline pulse line */}
          <div className="w-32 h-[1.5px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent mt-2 relative">
            <motion.div 
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 w-3 h-full bg-pink-400 rounded-full blur-[1px]"
            />
          </div>
        </div>

        {/* ================= 2. CINEMATIC SPLIT EXPERIENCE CARD ================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExperience.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`grid grid-cols-1 lg:grid-cols-12 w-full min-h-[480px] rounded-[32px] border transition-all duration-500 relative overflow-hidden group ${
              isNeonTheme 
                ? 'bg-black shadow-[0_0_60px_rgba(236,72,153,0.12)] border-pink-500/20' 
                : isGlassTheme 
                  ? 'bg-white/[0.01] backdrop-blur-2xl border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)]'
                  : 'bg-[#0c0c0e]/30 border-white/[0.04] hover:bg-[#0c0c0e]/50 shadow-[0_20px_50px_rgba(0,0,0,0.4)]'
            }`}
          >
            {/* Ambient Background image overlay */}
            {activeExperience.backgroundImage && (
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-[0.03] mix-blend-overlay pointer-events-none -z-10" 
                style={{ backgroundImage: `url(${activeExperience.backgroundImage})` }}
              />
            )}
            
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent z-10" />

            {/* LEFT SPEC PANEL (col-span-5) */}
            <div className="lg:col-span-5 relative w-full h-[280px] lg:h-auto overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.04] bg-black/60 flex flex-col justify-between p-6">
              {activeExperience.coverImage ? (
                <img 
                  src={activeExperience.coverImage} 
                  alt={activeExperience.companyName} 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:scale-102 group-hover:grayscale-0 group-hover:opacity-75 transition-all duration-700 ease-out -z-10"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-neutral-900 to-zinc-900 -z-10" />
              )}

              {/* Vignette Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/90 via-black/40 to-transparent -z-10" />
              
              {/* Floating Company Badge */}
              <div className="inline-flex self-start items-center gap-2 px-3.5 py-2 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md z-20">
                {activeExperience.logo ? (
                  <img src={activeExperience.logo} alt="logo" className="w-5 h-5 object-contain" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: accentColor }} />
                )}
                <span className="text-[9.5px] font-mono font-black uppercase text-white tracking-widest leading-none">
                  {activeExperience.companyName}
                </span>
              </div>

              {/* Date & Location telemetry */}
              <div className="z-20 space-y-2 mt-auto">
                <span className="text-[8.5px] font-mono uppercase bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-neutral-300 backdrop-blur-sm tracking-wide inline-block">
                  📅 {activeExperience.startDate} — {activeExperience.currentWorking ? 'Present' : activeExperience.endDate}
                </span>
                <div className="flex items-center gap-1.5 text-[8.5px] font-mono text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="uppercase tracking-widest font-bold" style={{ color: accentColor }}>
                    {activeExperience.workMode} • {activeExperience.location}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT CAREER CONTENT PANEL (col-span-7) */}
            <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between space-y-6 relative z-10 text-left">
              
              <div className="space-y-4">
                {/* Role and Company */}
                <div className="space-y-1">
                  <span className="text-[8.5px] font-mono font-black uppercase tracking-widest block" style={{ color: accentColor }}>
                    {activeExperience.employmentType} Spec Node
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-tight font-heading">
                    {activeExperience.roleTitle}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mt-0.5">
                    {activeExperience.tagline}
                  </span>
                </div>

                {/* Narrative Description */}
                <div className="border-t border-white/[0.04] pt-4 select-text">
                  {renderDescription(activeExperience.description)}
                </div>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeExperience.techStack.map((tech, tIdx) => (
                    <span 
                      key={tIdx} 
                      className={`text-[8.5px] font-mono uppercase rounded-lg px-2.5 py-0.5 tracking-wide font-medium ${getBadgeStyle(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom telemetry (Metrics & CTA) */}
              <div className="space-y-5">
                {/* Dynamic Metrics */}
                {activeExperience.metrics && activeExperience.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-t border-white/[0.04] pt-5">
                    {activeExperience.metrics.slice(0, 4).map((met, mIdx) => (
                      <div 
                        key={mIdx} 
                        className="px-3 py-2.5 bg-white/[0.01] border border-white/[0.03] rounded-2xl flex flex-col items-center justify-center text-center backdrop-blur-sm"
                      >
                        <span className="text-xs font-mono font-bold block" style={{ color: accentColor }}>
                          {met.value}
                        </span>
                        <span className="text-[7.5px] font-mono text-neutral-500 uppercase tracking-wider mt-0.5 leading-none">
                          {met.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Links */}
                {activeExperience.buttonText && activeExperience.buttonUrl && (
                  <div className="flex justify-end pt-1">
                    <a
                      href={activeExperience.buttonUrl}
                      target={activeExperience.openInNewTab ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="px-4.5 py-2.5 border rounded-xl text-[9px] font-mono font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]"
                      style={{
                        borderColor: `${accentColor}25`,
                        color: accentColor,
                        backgroundColor: `${accentColor}0a`
                      }}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{activeExperience.buttonText}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* ================= 3. PROGRESSION TIMELINE STRIP ================= */}
        {experiences.length > 0 && (
          <div className="max-w-3xl mx-auto pt-8 border-t border-white/[0.04] select-none">
            <div className="text-center mb-6">
              <span className="text-[8.5px] font-mono font-black uppercase text-neutral-500 tracking-[0.25em]">
                Interactive progression track
              </span>
            </div>
            
            <div className="relative flex items-center justify-between px-8 md:px-12">
              {/* Horizontal connecting track line */}
              <div className="absolute left-16 right-16 h-[1px] bg-white/[0.03] z-0 top-[15px]">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/10 to-transparent" />
              </div>

              {experiences.map((exp, idx) => {
                const isActive = exp.id === activeNodeId;
                const dotColor = exp.timelineDotColor || exp.accentColor || '#ec4899';
                
                return (
                  <button
                    key={exp.id}
                    onClick={() => setActiveNodeId(exp.id)}
                    className="relative z-10 flex flex-col items-center gap-2 group/node cursor-pointer border-none bg-transparent focus:outline-none"
                  >
                    {/* Ring dot */}
                    <div 
                      className="w-8 h-8 rounded-full bg-[#0a0a0b] border flex items-center justify-center transition-all duration-300 shadow group-hover/node:border-white/20"
                      style={{ 
                        borderColor: isActive 
                          ? dotColor 
                          : exp.timelineHighlight 
                            ? `${dotColor}40` 
                            : 'rgba(255, 255, 255, 0.08)' 
                      }}
                    >
                      <motion.div 
                        animate={{ scale: isActive ? 1.25 : 1 }}
                        className="w-2.5 h-2.5 rounded-full transition-transform duration-300"
                        style={{ backgroundColor: dotColor }}
                      />
                    </div>
                    
                    <div className="text-center space-y-0.5">
                      <p 
                        className="text-[9px] font-mono font-black uppercase truncate max-w-[90px] leading-tight transition-colors duration-300"
                        style={{ color: isActive ? '#ffffff' : '#737373' }}
                      >
                        {exp.companyName}
                      </p>
                      <p className="text-[7.5px] font-mono text-neutral-500 uppercase leading-none">
                        {exp.startDate.split(' ')[1] || exp.startDate}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
