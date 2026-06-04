import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Trophy, 
  Sparkles, 
  Clock, 
  ChevronRight,
  X,
  Eye,
  Activity
} from 'lucide-react';

interface CertificateModule {
  id: any;
  title: string;
  issuer: string;
  issueDate: string;
  description: string;
  tags: string[];
  credentialUrl: string;
  certificateImage: string;
  featured: boolean;
  verified: boolean;
  accentColor: string;
}

interface CertificatesProps {
  certificates?: any[];
  profile?: any;
}

export default function Certificates({ certificates, profile }: CertificatesProps) {
  const [activePreviewCert, setActivePreviewCert] = useState<CertificateModule | null>(null);

  // High-fidelity fallback defaults
  const fallbackCertificates: CertificateModule[] = [
    {
      id: "cert-google-ux",
      title: "Google UX Design Professional Certificate",
      issuer: "Google Career Certifications",
      issueDate: "Jan 2026",
      description: "Rigorous 7-course program specializing in user experience research, wireframing, high-fidelity prototyping, and digital accessibility compliance.",
      tags: ["UI Systems", "Accessibility", "Interaction Design", "Prototyping"],
      credentialUrl: "https://coursera.org",
      certificateImage: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=800&auto=format&fit=crop",
      featured: true,
      verified: true,
      accentColor: "amber"
    },
    {
      id: "cert-aws-cloud",
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      issueDate: "Jan 2026",
      description: "Verified validation of core cloud security schemas, foundational infrastructure architecture, cost models, and global network systems orchestration.",
      tags: ["AWS Cloud", "DevOps", "Infrastructure Systems", "Cloud Security"],
      credentialUrl: "https://aws.amazon.com",
      certificateImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      featured: false,
      verified: true,
      accentColor: "cyan"
    }
  ];

  // Resolve dynamic certificates from database profile or props
  let certificatesList: CertificateModule[] = [];
  const rawCertificates = profile?.certificatesSection?.certificates || certificates;

  if (rawCertificates && rawCertificates.length > 0) {
    certificatesList = rawCertificates
      .filter((c: any) => c.visible !== false)
      .map((c: any, idx: number) => {
        return {
          id: c.id || idx,
          title: c.title || "Technical Credentials",
          issuer: c.issuer || c.organization || "Academic Entity",
          issueDate: c.issueDate || c.date || "2026",
          description: c.description || c.narrative || "Credential representing accomplished academic and visual systems course timelines.",
          tags: c.tags || c.skills || [],
          credentialUrl: c.credentialUrl || c.credentialLink || c.url || "",
          certificateImage: c.certificateImage || c.imageUrl || "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=800&auto=format&fit=crop",
          featured: c.featured || false,
          verified: c.verified !== false,
          accentColor: c.accentColor || (idx % 2 === 0 ? "amber" : "cyan")
        };
      });
  } else {
    certificatesList = fallbackCertificates;
  }

  // Accent HSL color styles mapper
  const getGlowStyles = (color: string) => {
    const acc = (color || "amber").toLowerCase();
    if (acc === "purple") {
      return {
        glowClass: "group-hover:border-purple-500/30 group-hover:shadow-[0_0_35px_rgba(168,85,247,0.06)]",
        badge: "bg-purple-500/10 border-purple-500/20 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.15)]",
        btn: "border-purple-500/20 hover:border-purple-500/40 bg-purple-500/5 hover:bg-purple-500/10 text-purple-400"
      };
    }
    if (acc === "blue") {
      return {
        glowClass: "group-hover:border-blue-500/30 group-hover:shadow-[0_0_35px_rgba(59,130,246,0.06)]",
        badge: "bg-blue-500/10 border-blue-500/20 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.15)]",
        btn: "border-blue-500/20 hover:border-blue-500/40 bg-blue-500/5 hover:bg-blue-500/10 text-blue-400"
      };
    }
    if (acc === "emerald" || acc === "green") {
      return {
        glowClass: "group-hover:border-emerald-500/30 group-hover:shadow-[0_0_35px_rgba(16,185,129,0.06)]",
        badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
        btn: "border-emerald-500/20 hover:border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400"
      };
    }
    if (acc === "cyan") {
      return {
        glowClass: "group-hover:border-cyan-500/30 group-hover:shadow-[0_0_35px_rgba(6,182,212,0.06)]",
        badge: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.15)]",
        btn: "border-cyan-500/20 hover:border-cyan-500/40 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-400"
      };
    }
    // Amber default
    return {
      glowClass: "group-hover:border-amber-500/30 group-hover:shadow-[0_0_35px_rgba(245,158,11,0.06)]",
      badge: "bg-amber-500/10 border-amber-500/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.15)]",
      btn: "border-amber-500/20 hover:border-amber-500/40 bg-amber-500/5 hover:bg-amber-500/10 text-amber-400"
    };
  };

  return (
    <section 
      id="certificates" 
      className="py-20 md:py-28 relative overflow-hidden select-none text-left bg-transparent"
    >
      {/* Absolute top separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Radiant Background highlights */}
      <div className="absolute top-1/4 right-5 w-[35vw] h-[35vw] bg-amber-500/[0.02] rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-5 w-[35vw] h-[35vw] bg-cyan-500/[0.02] rounded-full blur-[100px] pointer-events-none animate-pulse" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10 space-y-16">
        
        {/* ================= 1. HERO HEADER ================= */}
        <div className="flex flex-col items-center text-center gap-3.5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent animate-pulse" />
            <Award className="w-3.5 h-3.5 text-amber-400 animate-pulse relative z-10" />
            <span className="text-[8.5px] font-mono tracking-[0.25em] text-white/50 uppercase relative z-10">
              {profile?.certificatesSection?.badge || "CERTIFICATIONS"}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1] font-heading uppercase">
            {profile?.certificatesSection?.heading || "Verified Learning & Technical Credentials"}
          </h2>
          
          <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed max-w-lg">
            {profile?.certificatesSection?.description || "Industry certifications, engineering programs, and practical technical achievements."}
          </p>

          {/* Golden glow visual divider */}
          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mt-2 relative">
            <motion.div 
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 w-2.5 h-full bg-amber-400 rounded-full blur-[1px]"
            />
          </div>
        </div>

        {/* ================= 2. MAIN HORIZONTAL CERTIFICATE LAYOUT ================= */}
        <div className="space-y-8">
          {certificatesList.map((cert, idx) => {
            const styles = getGlowStyles(cert.accentColor);
            
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-12 w-full min-h-[320px] rounded-[28px] border border-white/[0.04] bg-[#0c0c0e]/30 hover:bg-[#0c0c0e]/60 transition-all duration-500 relative overflow-hidden group shadow-[0_15px_30px_rgba(0,0,0,0.4)] ${styles.glowClass}`}
              >
                {/* Visual light top border */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent z-10" />

                {/* LEFT SIDE (Certificate Preview) */}
                <div className="lg:col-span-4 relative w-full h-[220px] lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.04] bg-black">
                  <img 
                    src={cert.certificateImage} 
                    alt={cert.title} 
                    className="w-full h-full object-cover grayscale opacity-45 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-85 transition-all duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=800&auto=format&fit=crop";
                    }}
                  />
                  
                  {/* Vignette Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
                  
                  {/* Floating organization visual logo */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md z-20 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span className="text-[8.5px] font-mono font-bold text-white uppercase tracking-widest leading-none">
                      {cert.issuer.split(' ')[0]}
                    </span>
                  </div>

                  {/* Verified Capsule floating */}
                  {cert.verified && (
                    <div className="absolute bottom-4 left-4 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/25 rounded-lg backdrop-blur-md z-20 flex items-center gap-1.5 leading-none">
                      <ShieldCheck className="w-3 h-3 text-emerald-400 animate-pulse" />
                      <span className="text-[7.5px] font-mono font-bold uppercase text-emerald-300 tracking-wider">
                        Verified Proof
                      </span>
                    </div>
                  )}
                </div>

                {/* RIGHT SIDE (Certificate dynamic parameters) */}
                <div className="lg:col-span-8 p-6 md:p-8 flex flex-col justify-between space-y-6 relative z-10 text-left">
                  
                  <div className="space-y-4">
                    {/* Header tags */}
                    <div className="space-y-1">
                      <span className="text-[8.5px] font-mono font-bold text-amber-500 uppercase tracking-widest block">
                        {cert.issuer} • Issued {cert.issueDate}
                      </span>
                      <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight leading-tight transition-colors group-hover:text-amber-400 font-heading">
                        {cert.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">
                      {cert.description}
                    </p>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-1">
                      {cert.tags?.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="text-[8px] font-mono uppercase bg-white/5 border border-white/5 rounded px-2 py-0.5 text-neutral-300 tracking-wide font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Button CTA blocks */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-white/[0.04] pt-4.5">
                    {/* Unique Verification ID */}
                    <div className="space-y-0.5">
                      <span className="text-[8px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">
                        Credential ID
                      </span>
                      <span className="text-[9.5px] font-mono font-bold text-zinc-300">
                        {cert.id.toString().startsWith('cert-') ? cert.id.toUpperCase() : `KS-CERT-${cert.id.toString().slice(0,8).toUpperCase()}`}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 self-end sm:self-auto">


                      <button
                        onClick={() => setActivePreviewCert(cert)}
                        className={`px-4.5 py-2.5 border rounded-xl text-[9px] font-mono font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] ${styles.btn}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Certificate</span>
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= 3. TRANSITION FOOTER ================= */}
        <div className="pt-8 text-center select-none relative z-10 max-w-sm mx-auto">
          <div className="w-px h-12 bg-gradient-to-b from-white/10 to-transparent mx-auto mb-4" />
          <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.25em] animate-pulse">
            Learning Never Stops
          </span>
        </div>

      </div>

      {/* ================= 4. PREMIUM EXPANDABLE MODAL ================= */}
      <AnimatePresence>
        {activePreviewCert && (
          (() => {
            const styles = getGlowStyles(activePreviewCert.accentColor);
            
            return (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 overflow-y-auto p-4 bg-black/92 backdrop-blur-md flex justify-center items-center select-text"
              >
                {/* Radiant top line */}
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent z-10" />

                <motion.div 
                  initial={{ scale: 0.95, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="my-auto max-w-3xl w-full bg-[#070709] border border-white/10 p-6 md:p-8 rounded-[32px] relative overflow-hidden flex flex-col gap-6 shadow-[0_30px_80px_rgba(0,0,0,0.9)] max-h-[90vh]"
                >
                  {/* Close btn */}
                  <button 
                    onClick={() => setActivePreviewCert(null)}
                    className="absolute top-5 right-5 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-neutral-400 hover:text-white transition-all cursor-pointer z-30"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center overflow-y-auto pr-1 select-text custom-scrollbar py-2 text-left">
                    
                    {/* LEFT PANEL: Certificate Showcase Image (col-span-7) */}
                    <div className="md:col-span-7 space-y-4">
                      <div className="border border-white/10 rounded-2xl overflow-hidden bg-black shadow-lg relative group aspect-[4/3] flex items-center justify-center">
                        <img 
                          src={activePreviewCert.certificateImage} 
                          className="w-full h-full object-contain"
                          alt="Full Certificate Preview"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=800&auto=format&fit=crop";
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                    </div>

                    {/* RIGHT PANEL: Dynamic Details specifications (col-span-5) */}
                    <div className="md:col-span-5 space-y-5 text-left">
                      
                      <div className="space-y-1">
                        <span className="text-[8.5px] font-mono font-bold text-amber-500 uppercase tracking-widest block">
                          {activePreviewCert.issuer}
                        </span>
                        <h4 className="text-base font-black text-white uppercase tracking-tight leading-tight font-heading">
                          {activePreviewCert.title}
                        </h4>
                        <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-wider block mt-1">
                          📅 Issued {activePreviewCert.issueDate}
                        </span>
                      </div>

                      <div className="space-y-2 border-t border-white/[0.04] pt-4 text-xs font-light text-neutral-400 leading-relaxed">
                        <h5 className="text-[8.5px] font-mono font-bold text-neutral-500 uppercase tracking-widest">
                          Learning Outcomes & Impact
                        </h5>
                        <p>{activePreviewCert.description}</p>
                      </div>

                      {/* Tech stack skills covered */}
                      <div className="space-y-2">
                        <h5 className="text-[8.5px] font-mono font-bold text-neutral-500 uppercase tracking-widest">
                          Covered Skill Domains
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {activePreviewCert.tags?.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="text-[8px] font-mono uppercase bg-white/5 border border-white/5 rounded px-2 py-0.5 text-neutral-300 tracking-wide font-medium"
                            >
                              {tag}
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
