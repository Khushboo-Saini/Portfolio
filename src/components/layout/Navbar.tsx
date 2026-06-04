import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Download, FileText, Award, Briefcase, Layers } from 'lucide-react';
import { HoverButton } from '@/components/ui/hover-glow-button';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile?: any;
}

export default function Navbar({ activeTab, setActiveTab, profile }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getIconComponent = (iconName: string) => {
    const MAP: Record<string, React.ComponentType<any>> = {
      FileText, Award, Briefcase, Layers
    };
    return MAP[iconName] || FileText;
  };

  const logoText = profile?.headerSection?.logoText || "KHUSHABOO";
  const accentDotColor = profile?.headerSection?.accentDotColor || "#06B6D4";
  const mobileLogoScale = profile?.headerSection?.mobileLogoScale ?? 100;
  
  const ctaText = profile?.headerSection?.ctaText || "Resume";
  const ctaLink = profile?.headerSection?.ctaLink || profile?.themeSection?.resumeControl?.publicPdfUrl || profile?.resumeUrl || "/resume.pdf";
  const ctaIcon = profile?.headerSection?.ctaIcon || "FileText";
  const ctaNewTab = profile?.headerSection?.ctaNewTab ?? true;
  const headerBlur = profile?.headerSection?.headerBlur ?? 2;
  const headerTransparency = profile?.headerSection?.headerTransparency ?? 100;
  const headerBorderGlow = profile?.headerSection?.headerBorderGlow || "plain-white";
  const headerSticky = profile?.headerSection?.headerSticky ?? true;

  const rawNavItems = profile?.headerSection?.navMenu || [
    { label: 'HOME', route: '#home', enabled: true },
    { label: 'SKILLS', route: '#skills', enabled: true },
    { label: 'PROJECTS', route: '#projects', enabled: true },
    { label: 'EXPERIENCE', route: '#experience', enabled: true },
    { label: 'CERTIFICATES', route: '#certificates', enabled: true },
    { label: 'CONTACT', route: '#contact', enabled: true }
  ];

  const navItems = rawNavItems.filter((item: any) => item.enabled).map((item: any) => ({
    id: item.route.startsWith('#') ? item.route.slice(1) : item.route,
    label: item.label.charAt(0).toUpperCase() + item.label.slice(1).toLowerCase()
  }));

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const headerBgColor = `rgba(3, 0, 10, ${(100 - headerTransparency) / 100})`;
  const borderStyles = headerBorderGlow === 'glow-pink' 
    ? 'border-b border-pink-500/20 shadow-[0_4px_30px_rgba(236,72,153,0.05)]' 
    : (headerBorderGlow === 'glow-cyan' 
      ? 'border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(6,182,212,0.05)]' 
      : (headerBorderGlow === 'subtle-aura' 
        ? 'border-b border-white/5 shadow-md' 
        : 'border-none'));

  return (
    <header 
      className={`${headerSticky ? 'fixed' : 'absolute'} top-0 left-0 w-full z-50 py-6 transition-all duration-300 ${borderStyles}`}
      style={{
        backgroundColor: headerBgColor,
        backdropFilter: `blur(${headerBlur}px)`,
        WebkitBackdropFilter: `blur(${headerBlur}px)`
      }}
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 flex justify-between items-center">
        
        {/* Elegant Designer Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-1.5 cursor-pointer group"
          style={{ transform: `scale(${mobileLogoScale / 100})`, transformOrigin: 'left center' }}
        >
          <span className="heading-font font-bold text-white tracking-widest text-lg md:text-xl uppercase transition-colors group-hover:text-purple-400 duration-300">
            {logoText}<span className="mix-blend-screen" style={{ color: accentDotColor }}>.</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs font-semibold heading-font uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer relative py-1.5 ${
                  isActive ? 'text-white' : 'text-[rgba(255,255,255,0.9)] hover:text-white'
                }`}
              >
                {item.label}
                {/* Active Indicator Line */}
                <span 
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-400 mix-blend-screen transition-all duration-500 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right side Resume CTA */}
        <div className="hidden lg:flex items-center gap-2">
          {ctaText && (
            <HoverButton
              glowColor={accentDotColor}
              backgroundColor="rgba(0, 0, 0, 0.35)"
              textColor="#ffffff"
              hoverTextColor={accentDotColor}
              className="px-5.5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full border border-white/[0.08] backdrop-blur-md group shadow-none flex items-center gap-1.5"
              href={ctaLink}
              target={ctaNewTab ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              {React.createElement(getIconComponent(ctaIcon), {
                className: "w-3.5 h-3.5 text-neutral-400 group-hover:text-pink-400 transition-colors"
              })}
              <span>{ctaText}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </HoverButton>
          )}
          
          <HoverButton
            glowColor="#a855f7"
            backgroundColor="rgba(0, 0, 0, 0.35)"
            textColor="#ffffff"
            hoverTextColor="#a855f7"
            className="w-[38px] h-[38px] rounded-full border border-white/[0.08] backdrop-blur-md group shadow-none flex items-center justify-center p-0"
            href={ctaLink}
            download="Khushaboo_Saini_Resume.pdf"
            title="Download Resume"
          >
            <Download className="w-3.5 h-3.5 text-neutral-400 group-hover:text-purple-400 transition-colors" />
          </HoverButton>
        </div>

        {/* Mobile Hamburguer Trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white hover:text-purple-400 transition-colors p-1"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      <div 
        className={`fixed inset-0 top-[73px] bg-[#03000a]/98 backdrop-blur-2xl z-40 transition-all duration-500 lg:hidden flex flex-col items-center justify-center gap-8 px-6 border-t border-white/[0.04] ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`text-base font-semibold heading-font uppercase tracking-widest ${
              activeTab === item.id ? 'text-purple-400' : 'text-white hover:text-purple-400'
            } transition-colors`}
          >
            {item.label}
          </button>
        ))}

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 w-full px-6">
          <a
            href={ctaLink}
            target={ctaNewTab ? "_blank" : "_self"}
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
          >
            <span>{ctaText}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          
          <a
            href={ctaLink}
            download="Khushaboo_Saini_Resume.pdf"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full px-8 py-3 rounded-full bg-zinc-900 border border-white/10 text-white hover:text-[#06B6D4] font-extrabold text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </a>
        </div>
      </div>
    </header>
  );
}
