import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';
import {
  Send, AlertCircle, CheckCircle, Sparkles, Clock, MessageSquare,
  Globe, Quote, Linkedin, Github, Twitter, Mail
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

const DEFAULT_CMS = {
  hero: {
    badgeText: "LET'S CONNECT",
    mainHeadingLine1: "Let's Create Something",
    gradientHeadingLine2: "That People Remember.",
    description: "I enjoy building modern digital experiences that combine clean engineering with thoughtful design. Whether it's a startup idea, freelance collaboration, or an ambitious product vision — I'm always open to meaningful conversations."
  },
  quoteCard: {
    quoteText: "Great products are built through collaboration, iteration, and curiosity.",
    quoteIconStyle: "Quote",
    floatingCardEnabled: true
  },
  contactFormSettings: {
    formTitle: "What are you building?",
    submitButtonText: "Send Message",
    successMessage: "Message sent successfully. I'll get back to you soon!",
    errorMessage: "Something went wrong. Please try again or email me directly.",
    autoReplyEnabled: false
  },
  footerInfo: {
    locationLabel: "Based In",
    locationValue: "India (UTC+5:30)",
    responseTime: "Within 24 Hours",
    currentFocus: "Interactive Web & MERN"
  },
  socialLinks: [
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/khushaboo-saini", enabled: true },
    { platform: "GitHub", url: "https://github.com/Khushboo-Saini", enabled: true },
    { platform: "Mail", url: "mailto:khushboosaini066@gmail.com", enabled: true }
  ],
  visualSettings: {
    gradientStart: "#a855f7",
    gradientEnd: "#22d3ee",
    overlayOpacity: 0.28,
    glassBlurStrength: 10,
    statusText: "SYSTEM ONLINE // AVAILABLE FOR OPPORTUNITIES",
    statusEnabled: true,
    statusAccentColor: "#10b981"
  }
};

export default function Contact({ profile }: { profile?: any }) {
  const [cms, setCms] = useState<any>(DEFAULT_CMS);

  // Form Fields
  const [senderName, setSenderName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Load Contact CMS settings
  const loadCMS = async () => {
    try {
      const res = await axios.get(`${API_BASE}/ks/communication/contact-cms`);
      if (res.data.data.contactCMS) {
        setCms(res.data.data.contactCMS);
      }
    } catch (err) {
      console.warn('Failed to load Contact CMS on frontend. Falling back to default settings.');
    }
  };

  useEffect(() => {
    loadCMS();

    // Hook up real-time socket updates for CMS configurations
    const socket = io('http://localhost:5000');
    socket.emit('portfolio:join', 'khushaboo');

    socket.on('communication_ks:updated', (payload) => {
      if (payload.contactCMS) {
        setCms(payload.contactCMS);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !email || !message) {
      setError('Please provide all required fields.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess(false);

      await axios.post(`${API_BASE}/ks/communication/messages`, {
        name: senderName,
        email,
        message
      });

      setSuccess(true);
      setSenderName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      console.error('Message submission failed:', err);
      setError(cms.contactFormSettings?.errorMessage || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Social link platform icon renderer
  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return <Linkedin className="w-3.5 h-3.5" />;
      case 'github': return <Github className="w-3.5 h-3.5" />;
      case 'twitter': return <Twitter className="w-3.5 h-3.5" />;
      case 'mail': default: return <Mail className="w-3.5 h-3.5" />;
    }
  };

  // Active Social links filter
  const activeSocials = (cms.socialLinks || DEFAULT_CMS.socialLinks).filter((s: any) => s.enabled);

  return (
    <section 
      id="contact" 
      className="py-24 relative overflow-hidden bg-transparent flex flex-col items-center justify-center min-h-[85vh]"
    >
      {/* Soft Ambient Radial Glow linked to visual settings colors */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] pointer-events-none z-0 rounded-full blur-[140px] opacity-40 transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${(cms.visualSettings?.gradientStart || '#a855f7')}15 0%, ${(cms.visualSettings?.gradientEnd || '#22d3ee')}10 40%, transparent 70%)`
        }}
      />

      <div className="max-w-[800px] w-full mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        
        {/* ================= TOP: EMOTIONAL INTRO ================= */}
        <div className="text-center space-y-6 mb-12 flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-2 backdrop-blur-md">
            <Sparkles className="w-4 h-4" style={{ color: cms.visualSettings?.gradientStart || '#a855f7' }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
              {cms.hero?.badgeText || "LET'S CONNECT"}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-[64px] heading-font font-bold text-white leading-[1.1] tracking-tight uppercase">
            {cms.hero?.mainHeadingLine1 || "Let's Create Something"} <br/>
            <span 
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${(cms.visualSettings?.gradientStart || '#a855f7')}, ${(cms.visualSettings?.gradientEnd || '#22d3ee')})`
              }}
            >
              {cms.hero?.gradientHeadingLine2 || "That People Remember."}
            </span>
          </h2>

          <p className="text-sm md:text-base text-neutral-300 font-light max-w-[600px] mx-auto leading-relaxed mt-4">
            {cms.hero?.description || "I enjoy building modern digital experiences that combine clean engineering..."}
          </p>

        </div>

        {/* ================= CENTER: FLOATING CONVERSATIONAL FORM ================= */}
        <div className="w-full max-w-[600px] relative">
          
          {/* Floating Quote */}
          {cms.quoteCard?.floatingCardEnabled && (
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -right-12 hidden md:flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl z-20"
              style={{ 
                background: 'rgba(8, 10, 25, 0.5)', 
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)' 
              }}
            >
              <Quote className="w-5 h-5 opacity-50 shrink-0" style={{ color: cms.visualSettings?.gradientEnd || '#22d3ee' }} />
              <span className="text-[11px] font-medium text-neutral-200 italic tracking-wide max-w-[200px] leading-relaxed">
                "{cms.quoteCard?.quoteText || "Great products are built through collaboration..."}"
              </span>
            </motion.div>
          )}

          {/* Main Form Panel */}
          <div 
            className="w-full p-8 md:p-10 rounded-3xl relative z-10 transition-all duration-500"
            style={{ 
              background: `rgba(8, 10, 25, ${(cms.visualSettings?.overlayOpacity ?? 0.28)})`, 
              backdropFilter: `blur(${(cms.visualSettings?.glassBlurStrength ?? 10)}px)`,
              WebkitBackdropFilter: `blur(${(cms.visualSettings?.glassBlurStrength ?? 10)}px)`,
              border: '1px solid rgba(255,255,255,0.05)',
              boxShadow: focusedField ? `0 0 50px ${(cms.visualSettings?.gradientStart || '#a855f7')}20` : '0 20px 40px rgba(0,0,0,0.4)'
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-2 relative group">
                  <label className={`text-[11px] font-medium tracking-wider transition-colors duration-300 ${focusedField === 'name' ? 'text-primary' : 'text-neutral-400'}`}
                         style={{ color: focusedField === 'name' ? cms.visualSettings?.gradientStart : undefined }}>
                    Name
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={senderName}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full py-3 bg-transparent border-b border-white/10 focus:border-purple-400 text-sm text-white focus:outline-none focus:ring-0 transition-all placeholder:text-neutral-600"
                    style={{ borderBottomColor: focusedField === 'name' ? cms.visualSettings?.gradientStart : undefined }}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2 relative group">
                  <label className={`text-[11px] font-medium tracking-wider transition-colors duration-300 ${focusedField === 'email' ? 'text-primary' : 'text-neutral-400'}`}
                         style={{ color: focusedField === 'email' ? cms.visualSettings?.gradientStart : undefined }}>
                    Email
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={email}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-3 bg-transparent border-b border-white/10 focus:border-purple-400 text-sm text-white focus:outline-none focus:ring-0 transition-all placeholder:text-neutral-600"
                    style={{ borderBottomColor: focusedField === 'email' ? cms.visualSettings?.gradientStart : undefined }}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2 relative group pt-2">
                <label className={`text-[11px] font-medium tracking-wider transition-colors duration-300 ${focusedField === 'message' ? 'text-primary' : 'text-neutral-400'}`}
                       style={{ color: focusedField === 'message' ? cms.visualSettings?.gradientStart : undefined }}>
                  {cms.contactFormSettings?.formTitle || "What are you building?"}
                </label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Tell me about your project, vision, or idea..."
                  value={message}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full py-3 bg-transparent border-b border-white/10 focus:border-purple-400 text-sm text-white focus:outline-none focus:ring-0 transition-all placeholder:text-neutral-600 resize-none"
                  style={{ borderBottomColor: focusedField === 'message' ? cms.visualSettings?.gradientStart : undefined }}
                />
              </div>

              {/* Status Messages */}
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-4 bg-red-500/10 text-red-400 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
                {success && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-4 bg-emerald-500/10 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{cms.contactFormSettings?.successMessage || "Message sent successfully!"}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit CTA */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="w-full py-4 rounded-xl bg-white text-black hover:bg-neutral-200 disabled:opacity-50 font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>{cms.contactFormSettings?.submitButtonText || "Send Message"}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>

        {/* ================= BOTTOM: COLLABORATION DETAILS ================= */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-6 md:gap-12 text-center text-neutral-400">
          
          <div className="flex flex-col items-center gap-1.5">
            <Globe className="w-4 h-4 text-neutral-500 mb-1" />
            <span className="text-[9px] font-bold tracking-widest uppercase text-neutral-500">{cms.footerInfo?.locationLabel || "Based In"}</span>
            <span className="text-xs text-neutral-300">{cms.footerInfo?.locationValue || "India"}</span>
          </div>

          <div className="w-[1px] h-10 bg-white/5 hidden md:block" />

          <div className="flex flex-col items-center gap-1.5">
            <Clock className="w-4 h-4 text-neutral-500 mb-1" />
            <span className="text-[9px] font-bold tracking-widest uppercase text-neutral-500">Response Time</span>
            <span className="text-xs text-neutral-300">{cms.footerInfo?.responseTime || "Within 24 Hours"}</span>
          </div>

          <div className="w-[1px] h-10 bg-white/5 hidden md:block" />

          <div className="flex flex-col items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-neutral-500 mb-1" />
            <span className="text-[9px] font-bold tracking-widest uppercase text-neutral-500">Currently Exploring</span>
            <span className="text-xs text-neutral-300">{cms.footerInfo?.currentFocus || "Interactive Web & MERN"}</span>
          </div>

        </div>

        {/* Dynamic availability strip & social links */}
        <div className="mt-12 flex flex-col items-center gap-6">
          {cms.visualSettings?.statusEnabled && (
            <div className="flex items-center gap-1.5 bg-black/40 border border-white/5 px-4 py-2 rounded-xl backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: cms.visualSettings?.statusAccentColor || '#10b981' }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: cms.visualSettings?.statusAccentColor || '#10b981' }}></span>
              </span>
              <span className="text-[8px] font-mono tracking-wider uppercase font-bold" style={{ color: cms.visualSettings?.statusAccentColor || '#10b981' }}>
                {cms.visualSettings?.statusText || "SYSTEM ONLINE // AVAILABLE"}
              </span>
            </div>
          )}

          {activeSocials.length > 0 && (
            <div className="flex items-center gap-2.5">
              {activeSocials.map((item: any, idx: number) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white/[0.01] border border-white/5 text-neutral-400 hover:border-white/20 hover:text-white transition cursor-pointer"
                  style={{ '--hover-accent': cms.visualSettings?.gradientStart } as React.CSSProperties}
                >
                  {renderSocialIcon(item.platform)}
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
