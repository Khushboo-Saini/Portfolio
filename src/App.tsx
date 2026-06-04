import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Sparkles, Instagram, FileText } from 'lucide-react';
import { GradientBackground } from './components/ui/dark-gradient-background';
import CertificateBackground from './components/ui/background-glow-demo';
import TunnelBackground from './components/ui/tunnel-hero';

// Layout & Section Components
import Navbar from './components/layout/Navbar';
import Hero from './pages/Hero';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import ExperienceV2 from './pages/experience-v2';
import Certificates from './pages/Certificates';
import CertificatesV2 from './pages/certificates-v2';
import Contact from './pages/Contact';

const API_BASE = 'http://localhost:5000/api';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play video on home activeTab
  useEffect(() => {
    if (activeTab === 'home' && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn("Video background playback blocked by browser settings:", err);
      });
    }
  }, [activeTab]);

  const [slug, setSlug] = useState('khushaboo');
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [internships, setInternships] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load portfolio data dynamically from backend API on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const querySlug = params.get('slug') || 'khushaboo';
    setSlug(querySlug);

    const loadPortfolioData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/portfolio/slug/${querySlug}`);
        const payload = res.data.data;
        setUser(payload.user);
        setProfile(payload.profile);
        setProjects(payload.projects || []);
        setSkills(payload.skills || []);
        setCertificates(payload.certificates || []);
        setInternships(payload.internships || []);

        // Resolve visitor's geolocated IP, country, and browser dynamically to avoid hardcoded mock data
        const getBrowserName = () => {
          const ua = navigator.userAgent;
          if (ua.includes('Firefox')) return 'Firefox';
          if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
          if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
          if (ua.includes('Edg')) return 'Edge';
          if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
          return 'Unknown';
        };

        const fireTelemetry = async () => {
          let country = 'Unknown';
          let visitorIp = '';
          try {
            const geoRes = await axios.get('https://ipapi.co/json/', { timeout: 2200 });
            if (geoRes.data) {
              country = geoRes.data.country_name || 'Unknown';
              visitorIp = geoRes.data.ip || '';
            }
          } catch (e) {
            console.warn('Dynamic GeoIP lookup failed. Relying on backend fallback.');
          }

          try {
            await axios.post(`${API_BASE}/analytics/log`, {
              portfolioSlug: querySlug,
              country,
              visitorIp,
              browser: getBrowserName(),
              device: window.innerWidth < 768 ? 'Mobile' : 'Desktop',
            });
          } catch (err) {
            console.warn('Background telemetry log failed:', err);
          }
        };

        fireTelemetry();
      } catch (err) {
        console.warn('Backend connection failed, using local/static fallback.', err);
      } finally {
        setLoading(false);
      }
    };
    loadPortfolioData();
  }, []);

  // Routing renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <Hero setActiveTab={setActiveTab} profile={profile} />;
      case 'skills':
        return <Skills skills={skills} profile={profile} />;
      case 'projects':
        return <Projects projects={projects} profile={profile} />;
      case 'experience':
        return <ExperienceV2 />;
      case 'certificates':
        return <CertificatesV2 />;
      case 'contact':
        return <Contact profile={profile} />;
      default:
        return <Hero setActiveTab={setActiveTab} profile={profile} />;
    }
  };

  const getIconComponent = (iconName: string) => {
    const MAP: Record<string, React.ComponentType<any>> = {
      Github, Linkedin, Mail, Instagram, FileText
    };
    return MAP[iconName] || Sparkles;
  };

  const footerName = profile?.footerSection?.footerName || "Khushaboo Saini";
  const statusText = profile?.footerSection?.statusText || "SYSTEM ONLINE // AVAILABLE FOR OPPORTUNITIES";
  const creditsText = profile?.footerSection?.creditsText || "Designed & Engineered by Khushaboo Saini";
  const copyrightText = profile?.footerSection?.copyright || `© 2026 KHUSHABOO SAINI. ALL RIGHTS RESERVED.`;
  const footerDivider = profile?.footerSection?.footerDivider ?? true;
  const footerSpacing = profile?.footerSection?.footerSpacing ?? 80;
  const footerBlur = profile?.footerSection?.footerBlur ?? 0;
  const footerOpacity = (profile?.footerSection?.footerOpacity ?? 100) / 100;
  const footerGlow = profile?.footerSection?.footerGlow ?? 80;

  const rawSocialLinks = profile?.footerSection?.socialLinks || [
    { icon: 'Linkedin', url: 'https://www.linkedin.com/in/khushaboo-saini', enabled: true },
    { icon: 'Github', url: 'https://github.com/Khushboo-Saini', enabled: true },
    { icon: 'Mail', url: 'mailto:khushboosaini066@gmail.com', enabled: true }
  ];
  const activeSocialLinks = rawSocialLinks.filter((item: any) => item.enabled);

  const rawVideoUrl = profile?.themeSection?.visualIdentity?.videoBackground?.videoUrl || "/khushboo-trim.mp4";
  const videoUrl = rawVideoUrl.startsWith('/uploads') ? `http://localhost:5000${rawVideoUrl}` : rawVideoUrl;
  const overlayDarkness = profile?.themeSection?.visualIdentity?.overlayControl?.darkness ?? 75;
  const overlayBlur = profile?.themeSection?.visualIdentity?.overlayControl?.blur ?? 0;

  return (
    <div className="min-h-screen text-neutral-300 font-sans selection:bg-purple-950/40 selection:text-purple-300 flex flex-col justify-between relative overflow-hidden bg-[#03000a] atmospheric-stars">
      
      {/* 1. ATMOSPHERIC BACKDROP SYSTEM */}
      
      {/* Delicate floating ambient slate / charcoal lights */}
      {activeTab !== 'experience' && (
        <>
          <div className="fixed -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-zinc-900/15 blur-[130px] pointer-events-none z-0" />
          <div className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-slate-900/15 blur-[130px] pointer-events-none z-0" />
        </>
      )}

      {/* 2. PERSISTENT DYNAMIC VIDEO BACKGROUND (Full-bleed, edge-to-edge, across all pages) */}
      <div className="fixed inset-0 w-full h-full overflow-hidden bg-black pointer-events-none z-0 select-none">
        <style>
          {`
            @keyframes slowZoom {
              0% { transform: scale(1.0); }
              100% { transform: scale(1.05); }
            }
          `}
        </style>
        <video
          key={videoUrl}
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
          style={{ 
            animation: 'slowZoom 20s linear infinite alternate',
            filter: `blur(${overlayBlur}px)`
          }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Cinematic layered overlay for better text legibility */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(to bottom, rgba(0,0,0,${overlayDarkness / 100}), rgba(0,0,0,${overlayDarkness / 200}), rgba(0,0,0,${overlayDarkness / 100}))` 
          }}
        />
      </div>

      {/* 3. TRANSLUCENT FLOATING HEADER */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} profile={profile} />

      {/* 3. TRANSITION WORKSPACE CONTAINER */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. PREMIUM MINIMALIST FOOTER */}
      <footer 
        className="w-full pb-8 relative z-10 overflow-hidden transition-all duration-300"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
          paddingTop: `${footerSpacing}px`,
          opacity: footerOpacity,
          backdropFilter: `blur(${footerBlur}px)`,
          WebkitBackdropFilter: `blur(${footerBlur}px)`
        }}
      >
        {/* Animated glowing signature line */}
        {footerDivider && (
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#5eeeff]/30 to-transparent" />
        )}
        
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          
          {/* Logo brand signature */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5 group">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center shadow-md animate-pulse">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="heading-font font-bold text-white text-xs tracking-widest uppercase">
                {footerName}
              </span>
            </div>
            
            {/* System Online Status Indicator */}
            {statusText && (
              <div className="flex items-center gap-1.5 mt-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[8px] font-mono tracking-wider uppercase text-emerald-400 font-bold">
                  {statusText}
                </span>
              </div>
            )}
          </div>

          {/* Center: Signature with animated underline */}
          <div className="flex flex-col items-center text-center gap-1">
            <span className="text-xs font-mono font-medium text-white/80 tracking-wide select-none">
              {creditsText}
            </span>
            {/* Underline pulse line */}
            <motion.div 
              animate={{
                width: ["0%", "100%", "0%"],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="h-[1.5px] bg-gradient-to-r from-transparent via-[#5eeeff] to-transparent"
              style={{ width: "80px" }}
            />
          </div>

          {/* Socials & Copyright mark */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-3">
            <div className="flex items-center gap-2.5">
              {activeSocialLinks.map((item, idx) => {
                const Icon = getIconComponent(item.icon);
                return (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-white/[0.01] border border-white/5 text-neutral-400 hover:text-[#5eeeff] hover:border-[#5eeeff]/20 hover:bg-[#5eeeff]/[0.02] transition-all duration-300 cursor-pointer"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
            <span className="text-[8px] text-neutral-500 font-mono tracking-widest uppercase">
              {copyrightText}
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
