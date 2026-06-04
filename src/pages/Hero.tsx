import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);
import { 
  ArrowRight, ArrowDown, Sparkles, GraduationCap, Zap, Rocket, 
  Monitor, Cpu, Palette, Target, Code2, Globe, Clock, Layers, Shield, Heart,
  Code, Terminal, Database
} from 'lucide-react';
import { DottedSurface } from '../components/ui/dotted-surface';
import DotCard from '../components/ui/moving-dot-card';
import { ShinyButton } from '../components/ui/shiny-button';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Sparkles, GraduationCap, Zap, Rocket, Monitor, Cpu, Palette, Target, Code2, Globe,
  Clock, Layers, Shield, Heart, Code, Terminal, Database
};

const getIconComponent = (iconName: string) => {
  return ICON_MAP[iconName] || Sparkles;
};

interface HeroProps {
  setActiveTab: (tab: string) => void;
  profile?: any;
}

export default function Hero({ setActiveTab, profile }: HeroProps) {
  // Dynamic rotating text
  const dynamicLines = (profile?.heroSection?.rotatingLines && profile.heroSection.rotatingLines.length > 0)
    ? profile.heroSection.rotatingLines
    : [
        "Crafting Responsive Interfaces",
        "Engineering MERN Applications",
        "Building Scalable Platforms",
        "Creating Interactive Dashboards",
        "Designing Modern Frontends",
        "Optimizing User Experiences",
        "Developing REST API Systems",
        "Solving Real-World Problems",
        "Transforming Ideas Into Products",
        "Architecting Clean UI Systems",
        "Passionate About Web Innovation",
        "Turning Concepts Into Experiences",
        "Focused on Modern Development",
        "Building Products With Purpose",
        "Engineering Seamless Experiences",
        "Designing For Real Users",
        "Learning. Building. Scaling.",
        "Creating Technology That Matters",
        "Experiences That Feel Premium",
        "Interfaces Designed To Convert",
        "Smooth UI With Powerful Logic",
        "Elegant Frontend Architecture",
        "Minimal Design. Maximum Impact.",
        "Performance Meets Creativity"
      ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLineIndex((prev) => (prev + 1) % dynamicLines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [dynamicLines.length]);

  // Journey Steps for the interactive timeline (Floating Nodes Studio)
  const journeySteps = (profile?.statsCards && profile.statsCards.length > 0)
    ? profile.statsCards.filter((card: any) => card.visible !== false).map((card: any, index: number) => ({
        id: `0${index + 1}`,
        title: card.title,
        thought: card.subtitle || card.value || "",
        description: card.subtitle || card.value || "",
        icon: getIconComponent(card.icon || "Globe"),
        glowColor: card.glowColor || "#ec4899"
      }))
    : [
        {
          id: "01",
          title: "Research & Strategy",
          thought: "Understanding the problem...",
          description: "Understanding requirements, mapping out architectures, and planning scalable solutions.",
          icon: Target,
          glowColor: "#a855f7"
        },
        {
          id: "02",
          title: "UI/UX Design",
          thought: "Crafting intuitive experiences...",
          description: "Crafting intuitive, premium, and interactive user interfaces focusing on user experience.",
          icon: Palette,
          glowColor: "#06b6d4"
        },
        {
          id: "03",
          title: "Frontend Engineering",
          thought: "Building responsive interfaces...",
          description: "Building responsive, animated, and performant client-side applications using modern frameworks.",
          icon: Monitor,
          glowColor: "#ec4899"
        },
        {
          id: "04",
          title: "Backend & APIs",
          thought: "Connecting logic & data...",
          description: "Developing robust REST APIs, integrating databases, and ensuring secure data flow.",
          icon: Cpu,
          glowColor: "#10b981"
        },
        {
          id: "05",
          title: "Optimization",
          thought: "Refining performance...",
          description: "Enhancing performance, refining animations, and ensuring lightning-fast load times.",
          icon: Zap,
          glowColor: "#f59e0b"
        },
        {
          id: "06",
          title: "Deployment",
          thought: "Launching to production...",
          description: "Publishing to production, setting up CI/CD pipelines, and monitoring application stability.",
          icon: Rocket,
          glowColor: "#06b6d4"
        }
      ];

  // GSAP Animation Refs
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  useEffect(() => {
    if (!pathRef.current || !avatarRef.current || !sectionRef.current) return;

    // 1. Subtle camera zoom on the whole section
    const zoomTween = gsap.to(sectionRef.current, {
      scale: 1.02,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const totalSteps = journeySteps.length;

    // 2. Position static nodes flawlessly on the SVG path
    const positionNodes = () => {
      nodeRefs.current.forEach((node, i) => {
        if (node && pathRef.current && totalSteps > 1) {
          const ratio = i / (totalSteps - 1);
          gsap.set(node, {
            motionPath: {
              path: pathRef.current,
              align: pathRef.current,
              alignOrigin: [0.5, 0.5],
              start: ratio,
              end: ratio
            }
          });
        }
      });
    };

    // Give browser a moment to compute SVG layout, then snap nodes
    setTimeout(positionNodes, 100);
    window.addEventListener('resize', positionNodes);

    // 3. Build the Master Journey Timeline
    const tl = gsap.timeline({ repeat: -1 });

    // Initial fade in
    gsap.set(avatarRef.current, { opacity: 0 });
    tl.to(avatarRef.current, { opacity: 1, duration: 1.5 });

    // Step 0 Pause
    tl.call(() => setActiveNode(0));
    tl.to({}, { duration: 2.0 });
    tl.call(() => setActiveNode(null));

    // Travel between steps
    for (let i = 0; i < totalSteps - 1; i++) {
      const startRatio = i / (totalSteps - 1);
      const endRatio = (i + 1) / (totalSteps - 1);
      tl.to(avatarRef.current, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          start: startRatio,
          end: endRatio
        },
        duration: 3.5, // smooth, elegant travel
        ease: "power1.inOut"
      });
      // Pause at next step
      tl.call(() => setActiveNode(i + 1));
      tl.to({}, { duration: 2.0 });
      tl.call(() => setActiveNode(null));
    }

    // Final fade out before loop restarts
    tl.to(avatarRef.current, { opacity: 0, duration: 1.5, delay: 0.5 });

    return () => {
      window.removeEventListener('resize', positionNodes);
      tl.kill();
      zoomTween.kill();
    };
  }, [journeySteps.length]);

  const handleCtaClick = (btn: any) => {
    if (!btn || !btn.link) return;
    const cleanLink = btn.link.replace('#', '');
    const tabNames = ['home', 'skills', 'projects', 'experience', 'certificates', 'contact'];
    if (tabNames.includes(cleanLink)) {
      setActiveTab(cleanLink);
    } else if (cleanLink.startsWith('http') || cleanLink.includes('.')) {
      window.open(btn.link, '_blank', 'noopener,noreferrer');
    } else {
      setActiveTab(cleanLink);
    }
  };

  const getCtaStyle = (style: string) => {
    switch (style) {
      case 'solid-pink':
      case 'solid-gradient':
        return "px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-pink-500/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 cursor-pointer border-0";
      case 'outline-neon':
      case 'neon-border':
        return "px-8 py-4 rounded-full border border-[#06B6D4]/40 hover:border-[#06B6D4]/80 bg-cyan-950/20 text-[#06B6D4] hover:text-white hover:bg-cyan-500/10 font-extrabold text-xs uppercase tracking-widest hover:-translate-y-0.5 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.1)] flex items-center gap-2 cursor-pointer";
      default: // translucent-glass / glass-card
        return "px-8 py-4 rounded-full glass-card hover:border-purple-500/50 hover:bg-purple-500/[0.02] text-white font-extrabold text-xs uppercase tracking-widest hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center gap-2";
    }
  };

  const getBadgeStyle = (glowStyle: string) => {
    switch (glowStyle) {
      case 'Holographic':
        return "bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] text-cyan-300";
      case 'Solid Glow':
      case 'Solid':
        return "bg-purple-500/10 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)] text-purple-300";
      case 'Subtle Amber':
      case 'Amber':
        return "bg-amber-500/10 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)] text-amber-300";
      default:
        return "bg-purple-500/10 border-purple-500/20 text-purple-300";
    }
  };

  const accentColor = profile?.themeSection?.visualIdentity?.accentColor || "#06B6D4";
  const BadgeIcon = getIconComponent(profile?.heroSection?.heroBadge?.icon || "Sparkles");

  return (
    <div className="w-full">
      
      {/* ================= HERO INTRO SECTION ================= */}
      <section 
        id="home-intro" 
        className="min-h-[75vh] flex flex-col justify-center pt-32 pb-0 relative overflow-hidden"
      >
        <div className="max-w-[900px] mx-auto px-6 flex flex-col items-center text-center relative z-10 w-full flex-1">
          
          {/* Accent Small Tag */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8 ${getBadgeStyle(profile?.heroSection?.heroBadge?.glowStyle || "Holographic")}`}>
            <BadgeIcon className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              {profile?.heroSection?.heroBadge?.text || "Full-Stack Web Developer"}
            </span>
          </div>

          {/* Premium Headline with Glow */}
          <div className="relative mb-6 w-full flex flex-col items-center">
            {/* Background subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120px] rounded-[100%] bg-gradient-to-r from-purple-500 to-cyan-500 blur-[90px] opacity-25 pointer-events-none" />
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] heading-font font-bold text-white leading-[1.1] tracking-tight relative z-10 flex flex-col items-center">
              {(profile?.heroSection?.heroTitleLines && profile.heroSection.heroTitleLines.length > 0)
                ? profile.heroSection.heroTitleLines.map((line: any, idx: number) => {
                    if (line.isGradient) {
                      if (line.highlightWords) {
                        const parts = line.text.split(new RegExp(`(${line.highlightWords})`, 'gi'));
                        return (
                          <span key={idx} className="block mt-1">
                            {parts.map((part: string, pIdx: number) => {
                              const isHighlight = part.toLowerCase() === line.highlightWords.toLowerCase();
                              return isHighlight ? (
                                <span key={pIdx} className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                  {part}
                                </span>
                              ) : part;
                            })}
                          </span>
                        );
                      } else {
                        return (
                          <span key={idx} className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent block mt-1">
                            {line.text}
                          </span>
                        );
                      }
                    }
                    return <span key={idx} className="block mt-1">{line.text}</span>;
                  })
                : (
                  <>
                    <span>Building Digital Products</span>
                    <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent block mt-1">Architecting Clean UI Systems</span>
                  </>
                )
              }

              {/* Dynamic Rotating text lines */}
              <div className="h-[1.2em] relative flex justify-center w-full mt-4 overflow-visible text-2xl sm:text-3xl md:text-4xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentLineIndex}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent w-full text-center font-bold"
                  >
                    {dynamicLines[currentLineIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </h1>
          </div>

          {/* Body Subheading */}
          <p className="mt-10 text-[rgba(255,255,255,0.82)] font-medium text-[17px] md:text-[19px] leading-[1.8] max-w-[680px] mx-auto mb-10 drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
            {profile?.heroSection?.descOne || "Computer Science Engineering student passionate about building responsive, user-friendly, and scalable web applications using modern web technologies."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-5">
            <button
              onClick={() => handleCtaClick(profile?.heroSection?.ctaButton1 || { link: 'projects' })}
              className={getCtaStyle(profile?.heroSection?.ctaButton1?.style || "solid-pink")}
            >
              <span>{profile?.heroSection?.ctaButton1?.text || "View Projects"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleCtaClick(profile?.heroSection?.ctaButton2 || { link: 'contact' })}
              className={getCtaStyle(profile?.heroSection?.ctaButton2?.style || "translucent-glass")}
            >
              {profile?.heroSection?.ctaButton2?.text || "Contact Me"}
            </button>
          </div>
          
        </div>

        {/* Step 4: Scroll Explore Indicator */}
        <div className="w-full flex flex-col items-center justify-center pt-10 pb-4 select-none relative z-10">
          <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.25em] animate-pulse">
            Scroll to explore
          </span>
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="mt-2 text-purple-400"
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </div>

      </section>

      {/* ================= CINEMATIC GSAP JOURNEY ================= */}
      <section 
        id="home-journey" 
        ref={sectionRef}
        className="w-full relative pt-10 pb-20 overflow-hidden transform-gpu"
        style={{ minHeight: '75vh' }}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col relative z-10 justify-center h-full">
          
          {/* Centered Dramatic Heading */}
          <div className="w-full flex flex-col items-center text-center mb-2 lg:mb-4 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-2">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                {profile?.heroSection?.storyBlocks?.subheadline || "Development Philosophy"}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-[72px] heading-font font-bold text-white tracking-normal leading-[1.1] [word-spacing:0.2em]">
              {profile?.heroSection?.storyBlocks?.headline ? (
                (() => {
                  const words = profile.heroSection.storyBlocks.headline.split(' ');
                  const splitIdx = Math.ceil(words.length / 2);
                  const firstHalf = words.slice(0, splitIdx).join(' ');
                  const secondHalf = words.slice(splitIdx).join(' ');
                  return (
                    <>
                      {firstHalf} <br />
                      <motion.span 
                        animate={{ backgroundPosition: ["0%", "200%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-[length:200%_auto] bg-clip-text text-transparent inline-block mt-1 md:mt-3"
                      >
                        {secondHalf}
                      </motion.span>
                    </>
                  );
                })()
              ) : (
                <>
                  Engineering Modern <br />
                  <motion.span 
                    animate={{ backgroundPosition: ["0%", "200%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-[length:200%_auto] bg-clip-text text-transparent inline-block mt-1 md:mt-3"
                  >
                    Digital Experiences
                  </motion.span>
                </>
              )}
            </h2>
          </div>

          {/* GSAP SVG Timeline Wrapper (Scrollable on mobile) */}
          <div className="w-full relative h-[500px] overflow-x-auto overflow-y-hidden hide-scrollbar scroll-smooth">
            <div className="min-w-[1100px] w-full max-w-[1200px] h-full relative mx-auto">
              
              {/* 1. Curved SVG Path */}
              <svg 
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" 
                viewBox="0 0 1200 500" 
                preserveAspectRatio="none"
              >
                {/* Glowing background track */}
                <path 
                  d="M 50 275 C 250 400, 350 150, 600 275 C 850 400, 950 150, 1150 275"
                  fill="none"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="4"
                />
                {/* Real path for motion tracking */}
                <path 
                  ref={pathRef}
                  d="M 50 275 C 250 400, 350 150, 600 275 C 850 400, 950 150, 1150 275"
                  fill="none"
                  stroke="transparent"
                  strokeWidth="2"
                />
              </svg>

              {/* 2. Floating Cyber Avatar (Character) */}
              <div 
                ref={avatarRef} 
                className="absolute top-0 left-0 z-40 pointer-events-none flex items-center justify-center opacity-0"
              >
                {/* Main glowing core */}
                <div 
                  className="w-4 h-4 rounded-full relative z-10 flex items-center justify-center"
                  style={{ 
                    backgroundColor: accentColor,
                    boxShadow: `0 0 30px 10px ${accentColor}`
                  }}
                >
                   <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </div>
                
                {/* Cyber Rings */}
                <div 
                  className="absolute inset-[-14px] rounded-full border animate-[spin_4s_linear_infinite]" 
                  style={{ borderColor: `${accentColor}80` }}
                />
                <div 
                  className="absolute inset-[-24px] rounded-full border animate-[spin_5s_linear_infinite_reverse]" 
                  style={{ borderColor: `rgba(168,85,247,0.3)` }}
                />
                
                {/* Drone glow trail */}
                <div 
                  className="absolute w-[90px] h-[90px] blur-[25px] rounded-full" 
                  style={{ backgroundColor: `${accentColor}33` }}
                />
              </div>

              {/* 3. Placed Nodes on the Path */}
              {journeySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div 
                    key={step.id}
                    ref={el => { nodeRefs.current[index] = el; }}
                    className="absolute top-0 left-0 z-30 group"
                  >
                    {/* Ambient background blob when active */}
                    <div 
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] blur-[50px] transition-all duration-1000 pointer-events-none rounded-full ${activeNode === index ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`} 
                      style={{ backgroundColor: `${step.glowColor}25` }}
                    />
                    
                    {/* Glass Node Card */}
                    <div 
                      className={`w-[60px] h-[60px] rounded-full glass-card flex items-center justify-center transition-all duration-700 relative z-10 backdrop-blur-md shadow-xl cursor-pointer`}
                      style={{
                        borderColor: activeNode === index ? step.glowColor : 'rgba(255,255,255,0.1)',
                        backgroundColor: activeNode === index ? `${step.glowColor}15` : 'rgba(5,5,10,0.6)',
                        boxShadow: activeNode === index ? `0 0 30px ${step.glowColor}50` : 'none',
                        transform: activeNode === index ? 'scale(1.25)' : 'none'
                      }}
                    >
                       <Icon 
                         className={`w-5 h-5 transition-colors duration-700`}
                         style={{ color: activeNode === index ? step.glowColor : '#737373' }}
                       />
                    </div>

                    {/* Permanent Label Below */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[140px] text-center pointer-events-none">
                       <span 
                         className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-700 block`}
                         style={{ color: activeNode === index ? step.glowColor : '#a3a3a3' }}
                       >
                         {step.title}
                       </span>
                    </div>

                    {/* Frosted Glass Thought Bubble (Shows on active OR hover) */}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-5 w-[190px] text-center transition-all duration-700 ${activeNode === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0'}`}>
                       <div className="px-4 py-3 rounded-xl glass-card bg-white/5 border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl relative">
                          {/* Little triangle pointer for bubble */}
                          <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#0d091a] border-b border-r border-white/10 rotate-45 backdrop-blur-xl" />
                          
                          <span 
                            className="text-[10px] font-bold uppercase tracking-widest block mb-1.5"
                            style={{ color: step.glowColor }}
                          >
                            {step.title}
                          </span>
                          <p className="text-[12px] text-neutral-200 font-medium leading-[1.4]">
                            "{step.thought}"
                          </p>
                       </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
