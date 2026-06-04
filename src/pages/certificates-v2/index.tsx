import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, ShieldCheck, Calendar, ExternalLink, FileText, ChevronRight,
  Sparkles, X, Info, Trophy, Layers, Clock, ShieldAlert
} from 'lucide-react';
import axios from 'axios';
import { io } from 'socket.io-client';

const API_BASE = 'http://localhost:5000/api';

interface Certificate {
  id: string;
  tenant: string;
  title: string;
  issuer: string;
  credentialId: string;
  issueDate: string;
  expiryDate: string | null;
  neverExpires: boolean;
  shortDescription: string;
  detailedDescription: string;
  artwork: string | null;
  modalImage: string | null;
  accentColor: string | null;
  glowColor: string | null;
  themeStyle: string; // neon, gold, cyan, violet, glass-dark
  skills: string[];
  verificationEnabled: boolean;
  verificationUrl: string | null;
  verifiedProofBadge: boolean;
  certificatePdf: string | null;
  modalLearningOutcomes: string | null;
  modalSkillDomainsHeading: string | null;
  modalExtraNotes: string | null;
  modalAchievementLevel: string | null;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  showInHero: boolean;
  enableModal: boolean;
}

interface HeroCMS {
  badgeText: string;
  mainHeading: string;
  subtitle: string;
  accentColor: string;
  bgOverlayStrength: number;
}

export default function CertificatesV2() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [heroCMS, setHeroCMS] = useState<HeroCMS>({
    badgeText: 'CERTIFICATIONS',
    mainHeading: 'Showcasing Professional Excellence',
    subtitle: 'Verifiable credentials, technical competencies, and professional achievements.',
    accentColor: '#a855f7',
    bgOverlayStrength: 0.5
  });
  const [loading, setLoading] = useState(true);
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  
  // Local Category / Issuer Filter
  const [selectedIssuer, setSelectedIssuer] = useState<string>('all');

  // Load Data from Backend
  const loadData = async () => {
    try {
      const certsRes = await axios.get('http://localhost:5000/api/ks/certificates');
      const data = certsRes.data.data.certificates || [];
      // Render only published certificates
      setCertificates(data.filter((c: Certificate) => c.published));

      const heroRes = await axios.get('http://localhost:5000/api/ks/certificates/hero');
      if (heroRes.data.data.hero) {
        setHeroCMS(heroRes.data.data.hero);
      }
    } catch (err) {
      console.error('Failed to load KS Certificates V2 data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Socket listeners for live changes
    const socket = io('http://localhost:5000');
    socket.emit('portfolio:join', 'khushaboo');

    socket.on('certificates_ks:updated', (payload) => {
      if (payload.certificates) {
        const data = payload.certificates || [];
        setCertificates(data.filter((c: Certificate) => c.published));
      }
      if (payload.hero) {
        setHeroCMS(payload.hero);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Filter list by selected Issuer
  const issuers = ['all', ...Array.from(new Set(certificates.map((c) => c.issuer)))];

  const filteredCerts = certificates.filter((c) => {
    if (selectedIssuer === 'all') return true;
    return c.issuer === selectedIssuer;
  });

  // Split featured and regular lists
  const featuredCertificate = certificates.find((c) => c.featured);
  const regularCertificates = filteredCerts.filter((c) => !c.featured);

  // Active detail modal item
  const modalItem = certificates.find((c) => c.id === activeModalId);

  // Color generator for tags
  const getBadgeStyle = (tech: string) => {
    const hash = tech.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_8px_rgba(168,85,247,0.05)]',
      'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_8px_rgba(6,182,212,0.05)]',
      'bg-pink-500/10 text-pink-400 border border-pink-500/20 shadow-[0_0_8px_rgba(236,72,153,0.05)]',
      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.05)]',
      'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.05)]',
      'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_8px_rgba(245,158,11,0.05)]'
    ];
    return colors[hash % colors.length];
  };

  // Resolve preset theme designs
  const getThemeClass = (style: string) => {
    switch (style) {
      case 'neon':
        return 'bg-zinc-950/80 border-purple-500/20 shadow-[0_0_35px_rgba(168,85,247,0.15)] text-purple-100';
      case 'gold':
        return 'bg-stone-950/80 border-amber-500/20 shadow-[0_0_35px_rgba(245,158,11,0.1)] text-amber-100';
      case 'cyan':
        return 'bg-slate-950/80 border-cyan-500/20 shadow-[0_0_35px_rgba(6,182,212,0.15)] text-cyan-100';
      case 'violet':
        return 'bg-neutral-950/80 border-fuchsia-500/20 shadow-[0_0_35px_rgba(217,70,239,0.15)] text-fuchsia-100';
      case 'glass-dark':
      default:
        return 'bg-white/[0.02] backdrop-blur-2xl border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.55)] text-white';
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-t-2 border-purple-500 border-solid rounded-full animate-spin" />
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Decrypting Credentials Vault...</span>
      </div>
    );
  }

  return (
    <section id="certificates" className="py-20 md:py-28 relative overflow-hidden select-none text-left bg-transparent">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Decorative backdrop glows */}
      <div
        className="absolute top-20 right-10 w-[35vw] h-[35vw] rounded-full blur-[140px] pointer-events-none transition-all duration-700 -z-10"
        style={{ backgroundColor: `${heroCMS.accentColor}05` }}
      />
      <div className="absolute bottom-20 left-10 w-[30vw] h-[30vw] bg-purple-900/[0.03] rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10 space-y-16">
        
        {/* ================= 1. KSCertificateHero ================= */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent animate-pulse" />
            <Award className="w-3.5 h-3.5 animate-pulse relative z-10" style={{ color: heroCMS.accentColor }} />
            <span className="text-[8.5px] font-mono tracking-[0.25em] text-white/50 uppercase relative z-10">
              {heroCMS.badgeText || 'CERTIFICATIONS'}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1] font-heading uppercase">
            {heroCMS.mainHeading || 'Showcasing Professional Excellence'}
          </h2>

          <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed max-w-lg">
            {heroCMS.subtitle || 'Verifiable credentials, technical competencies, and professional achievements.'}
          </p>

          {/* Underline color-linked animation */}
          <div className="w-32 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500/35 to-transparent mt-2 relative">
            <motion.div
              animate={{ left: ['0%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 w-3 h-full rounded-full blur-[1px]"
              style={{ backgroundColor: heroCMS.accentColor }}
            />
          </div>
        </div>

        {/* ISSUER FILTER SECTION */}
        {issuers.length > 2 && (
          <div className="flex flex-wrap justify-center items-center gap-2 bg-white/[0.01] border border-white/5 p-2 rounded-2xl max-w-xl mx-auto">
            {issuers.map((issuer) => (
              <button
                key={issuer}
                onClick={() => setSelectedIssuer(issuer)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wider uppercase transition cursor-pointer ${
                  selectedIssuer === issuer
                    ? 'bg-white/10 text-white border border-white/10 shadow-lg'
                    : 'text-neutral-400 hover:text-white border border-transparent'
                }`}
              >
                {issuer === 'all' ? 'All Credentials' : issuer}
              </button>
            ))}
          </div>
        )}

        {/* ================= 2. FEATURED CARD SLIT SPOTLIGHT ================= */}
        {featuredCertificate && selectedIssuer === 'all' && (
          <div className="space-y-4">
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-2">Featured Showcase</span>
            <div
              className={`grid grid-cols-1 lg:grid-cols-12 rounded-[28px] border overflow-hidden relative group transition-all duration-500 ${getThemeClass(
                featuredCertificate.themeStyle
              )}`}
              style={{
                boxShadow: featuredCertificate.glowColor ? `0 0 35px ${featuredCertificate.glowColor}` : undefined
              }}
            >
              {/* Highlight line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent z-10" />

              {/* Left Artwork */}
              <div className="lg:col-span-5 relative w-full h-[220px] lg:h-[340px] overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
                <img
                  src={featuredCertificate.artwork || 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=800&auto=format&fit=crop'}
                  alt={featuredCertificate.title}
                  className="w-full h-full object-cover grayscale opacity-45 group-hover:scale-102 group-hover:grayscale-0 group-hover:opacity-85 transition-all duration-700"
                />
                {featuredCertificate.verificationEnabled && featuredCertificate.verifiedProofBadge && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest font-black">Verified</span>
                  </div>
                )}
              </div>

              {/* Right Content */}
              <div className="lg:col-span-7 p-6 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 font-black">
                      {featuredCertificate.issuer}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400">
                      📅 {featuredCertificate.issueDate}
                    </span>
                  </div>

                  <h3
                    className="text-lg md:text-2xl font-black uppercase tracking-tight"
                    style={{ color: featuredCertificate.accentColor || '#ffffff' }}
                  >
                    {featuredCertificate.title}
                  </h3>

                  <p className="text-xs font-light text-neutral-400 leading-relaxed max-w-xl">
                    {featuredCertificate.shortDescription}
                  </p>

                  {/* Skills tags */}
                  {featuredCertificate.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {featuredCertificate.skills.map((skill) => (
                        <span key={skill} className={`px-2 py-0.5 rounded text-[8px] font-semibold ${getBadgeStyle(skill)}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[8px] font-mono text-neutral-500">
                    ID: {featuredCertificate.credentialId || 'N/A'}
                  </span>
                  
                  {featuredCertificate.enableModal && (
                    <button
                      onClick={() => setActiveModalId(featuredCertificate.id)}
                      className="px-4 py-2 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase rounded-xl transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>Show Credentials Details</span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. TIMELINE progression track ================= */}
        <div className="space-y-6">
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-2">Chronological Timeline</span>
          {regularCertificates.length === 0 && !featuredCertificate ? (
            <div className="text-center py-20 text-neutral-500 text-xs bg-white/[0.01] border border-dashed border-white/10 rounded-3xl">
              No certifications records found in database.
            </div>
          ) : (
            <div className="relative border-l border-white/10 pl-6 md:pl-10 space-y-12 ml-4">
              {/* progression track dot marker */}
              <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-purple-500/50 via-cyan-500/20 to-transparent" />

              {regularCertificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 p-4 rounded-2xl transition duration-300"
                >
                  {/* Timeline dot */}
                  <span
                    className="absolute -left-[31px] md:-left-[47px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#03000a] transition duration-300 flex items-center justify-center group-hover:scale-125"
                    style={{
                      backgroundColor: cert.accentColor || '#a855f7',
                      boxShadow: `0 0 10px ${cert.accentColor || '#a855f7'}`
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping opacity-45"></span>
                  </span>

                  {/* Artwork Image */}
                  <div className="col-span-1 md:col-span-3 rounded-lg overflow-hidden h-20 w-full border border-white/5">
                    <img
                      src={cert.artwork || 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=800&auto=format&fit=crop'}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="col-span-1 md:col-span-7 space-y-1">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 block">
                      {cert.issuer} • {cert.issueDate}
                    </span>
                    <h4
                      className="text-xs font-black uppercase tracking-tight"
                      style={{ color: cert.accentColor || '#ffffff' }}
                    >
                      {cert.title}
                    </h4>
                    <p className="text-[10px] text-neutral-400 font-light leading-relaxed line-clamp-2">
                      {cert.shortDescription}
                    </p>
                  </div>

                  {/* Action Column */}
                  <div className="col-span-1 md:col-span-2 flex justify-end">
                    {cert.enableModal ? (
                      <button
                        onClick={() => setActiveModalId(cert.id)}
                        className="px-3 py-1.5 border border-white/10 hover:border-white/20 hover:bg-white/5 text-[9px] font-bold uppercase rounded-lg cursor-pointer transition flex items-center gap-0.5"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3 h-3 text-neutral-500" />
                      </button>
                    ) : cert.verificationEnabled && cert.verificationUrl ? (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 border border-white/10 hover:border-white/20 hover:bg-white/5 text-[9px] font-bold uppercase rounded-lg cursor-pointer transition flex items-center gap-0.5 text-white"
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-3 h-3 text-neutral-400" />
                      </a>
                    ) : null}
                  </div>

                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* ================= 4. KSCertificateModal ================= */}
      <AnimatePresence>
        {activeModalId && modalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Blur Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalId(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-zinc-950 border border-white/10 rounded-[32px] overflow-hidden max-w-2xl w-full max-h-[85vh] flex flex-col relative shadow-2xl z-10"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setActiveModalId(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 border border-white/10 hover:border-white/20 rounded-full text-white/70 hover:text-white cursor-pointer z-20 transition"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Main Scrolling Body */}
              <div className="overflow-y-auto flex-1">
                {/* Hero Banner Header */}
                <div className="relative h-44 md:h-56 w-full border-b border-white/5 bg-black">
                  <img
                    src={modalItem.modalImage || modalItem.artwork || 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=800&auto=format&fit=crop'}
                    alt={modalItem.title}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-4 left-6 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-black/75 border border-white/10 text-[9px] font-mono text-white/50 tracking-wider uppercase">
                      🏆 {modalItem.modalAchievementLevel || 'Professional Milestone'}
                    </span>
                  </div>
                </div>

                {/* Info Content details */}
                <div className="p-6 md:p-8 space-y-6">
                  
                  {/* Issuer and Title block */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold">
                      {modalItem.issuer}
                    </span>
                    <h3
                      className="text-xl md:text-2xl font-black uppercase tracking-tight"
                      style={{ color: modalItem.accentColor || '#ffffff' }}
                    >
                      {modalItem.title}
                    </h3>
                    <span className="text-[10px] text-neutral-500 font-mono block">
                      📅 Issue Date: {modalItem.issueDate} {modalItem.neverExpires ? '(Never Expires)' : `(Expires: ${modalItem.expiryDate})`}
                    </span>
                  </div>

                  {/* Narrative details */}
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">Credential Description</span>
                    <p className="text-xs font-light text-neutral-300 leading-relaxed whitespace-pre-line">
                      {modalItem.detailedDescription || modalItem.shortDescription}
                    </p>
                  </div>

                  {/* Learning outcomes bullet lists */}
                  {modalItem.modalLearningOutcomes && (
                    <div className="space-y-2 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">Syllabus & Core Outcomes</span>
                      <ul
                        className="text-xs text-neutral-300 font-light list-disc list-inside space-y-1.5"
                        dangerouslySetInnerHTML={{ __html: modalItem.modalLearningOutcomes }}
                      ></ul>
                    </div>
                  )}

                  {/* Skills tags list */}
                  {modalItem.skills.length > 0 && (
                    <div className="space-y-2">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                        {modalItem.modalSkillDomainsHeading || 'Skills Mastered'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {modalItem.skills.map((skill) => (
                          <span key={skill} className={`px-2 py-0.5 rounded text-[8px] font-semibold ${getBadgeStyle(skill)}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Extra Notes */}
                  {modalItem.modalExtraNotes && (
                    <div className="space-y-1 border-t border-white/5 pt-4">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">Special Notes</span>
                      <p className="text-[10px] text-neutral-400 font-light leading-relaxed italic">
                        {modalItem.modalExtraNotes}
                      </p>
                    </div>
                  )}

                  {/* Verification link */}
                  {modalItem.verificationEnabled && (
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-primary/10 border border-primary/20 p-4 rounded-2xl mt-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary animate-pulse" />
                        <div>
                          <span className="block text-xs font-bold text-white">Official Verification Validated</span>
                          <span className="block text-[9px] text-primary">Credential ID: {modalItem.credentialId || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 w-full md:w-auto">
                        {modalItem.certificatePdf && (
                          <a
                            href={modalItem.certificatePdf}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 md:flex-none px-4 py-2 border border-white/10 hover:bg-white/5 text-white text-[10px] font-bold uppercase rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-neutral-400" />
                            <span>Download PDF Proof</span>
                          </a>
                        )}
                        {modalItem.verificationUrl && (
                          <a
                            href={modalItem.verificationUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 md:flex-none px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-bold uppercase rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>Verify Authority</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
