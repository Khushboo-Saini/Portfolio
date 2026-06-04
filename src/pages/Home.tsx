import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Sparkles, Database, BarChart3 } from 'lucide-react';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export default function Home({ setActiveTab }: HomeProps) {
  // Stats counters
  const metrics = [
    { label: "Questions Seeded", value: "50K+", icon: Database, color: "text-purple-400" },
    { label: "AI Adaptability", value: "Real-time", icon: Cpu, color: "text-cyan-400" },
    { label: "Performance Gauge", value: "99.2%", icon: BarChart3, color: "text-indigo-400" },
    { label: "Cognition Index", value: "Smart", icon: Sparkles, color: "text-violet-400" }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col justify-center items-center relative overflow-hidden px-4">
      
      {/* Visual background spotlights */}
      <div className="absolute top-[20%] left-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px] glowing-orb" />
      <div className="absolute bottom-[20%] right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px] glowing-orb" style={{ animationDelay: '3s' }} />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Cinematic Copywriting */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold uppercase tracking-wider text-purple-300"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>NEURAL LEARNING ECOSYSTEM</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-6xl heading-font font-black leading-tight tracking-wide text-white"
          >
            AI-Powered <br />
            <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-cyan-400 bg-clip-text text-transparent glow-text-purple">
              Learning Reimagined
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-light"
          >
            QuizPose dynamically generates personalized knowledge streams, maps student cognitive profiles, and leverages intelligent feedback loops to forge an adaptive, premium educational experience.
          </motion.p>

          {/* CTA Buttons row */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4"
          >
            <button
              onClick={() => setActiveTab('experience')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-purple-500/20 hover:shadow-cyan-400/20 transition-all cursor-pointer flex items-center justify-center gap-2 group hover:-translate-y-0.5"
            >
              <span>Launch Experience</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('features')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl glass-panel glass-panel-hover text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              Explore Ecosystem
            </button>

            <button
              onClick={() => setActiveTab('tech-stack')}
              className="w-full sm:w-auto px-5 py-4 text-neutral-400 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              View Intelligence Stack
            </button>
          </motion.div>
        </div>

        {/* Right Side: Animated AI Brain / Floating Neural Sphere visual */}
        <div className="lg:col-span-5 flex justify-center items-center z-10 relative">
          
          {/* Rotating Backing Rings */}
          <div className="absolute w-[320px] h-[320px] rounded-full border border-purple-500/10 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute w-[260px] h-[260px] rounded-full border border-dashed border-cyan-500/10 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />

          {/* Floating Brain/Neural Core */}
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-[280px] h-[280px] rounded-full flex items-center justify-center bg-white/[0.01] backdrop-blur-3xl border border-white/5 shadow-[0_0_50px_rgba(139,92,246,0.15)] relative overflow-visible"
          >
            {/* SVG Complex Neural Engine Sphere */}
            <svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              {/* Outer connected nodes */}
              <circle cx="50" cy="15" r="1.5" fill="#a78bfa" />
              <circle cx="85" cy="50" r="1.5" fill="#22d3ee" />
              <circle cx="50" cy="85" r="1.5" fill="#818cf8" />
              <circle cx="15" cy="50" r="1.5" fill="#f472b6" />
              
              <circle cx="25" cy="25" r="1" fill="#c084fc" />
              <circle cx="75" cy="25" r="1" fill="#c084fc" />
              <circle cx="75" cy="75" r="1" fill="#22d3ee" />
              <circle cx="25" cy="75" r="1" fill="#22d3ee" />

              {/* Core active links */}
              <path d="M50 15 L50 85 M15 50 L85 50 M25 25 L75 75 M25 75 L75 25" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
              
              {/* Center Brain Lobes */}
              <path d="M50 35 C42 35 38 42 38 50 C38 58 42 65 50 65 C58 65 62 58 62 50 C62 42 58 35 50 35 Z" fill="url(#coreGradient)" opacity="0.85" />
              
              {/* Animated neural particles floating across links */}
              <circle cx="50" cy="50" r="4" fill="#a78bfa" className="animate-pulse" />
              <circle cx="50" cy="50" r="8" stroke="#22d3ee" strokeWidth="0.5" fill="none" className="animate-ping" style={{ animationDuration: '3s' }} />

              <defs>
                <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="70%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#312e81" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>

            {/* Orbiting Quiz assessment Card mini elements */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 pointer-events-none"
            >
              {/* Floating Orbiting Card 1 */}
              <div className="absolute top-2 left-2 p-2 px-3 rounded-lg glass-panel text-[8px] font-bold text-white shadow-lg border-purple-500/20 transform -translate-x-1/2 -translate-y-1/2">
                MATH NODE 04
              </div>
              
              {/* Floating Orbiting Card 2 */}
              <div className="absolute bottom-2 right-2 p-2 px-3 rounded-lg glass-panel text-[8px] font-bold text-cyan-400 shadow-lg border-cyan-500/20 transform translate-x-1/2 translate-y-1/2">
                COGNITION SYNC
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>

      {/* Bottom Row: Animated Metrics Panel */}
      <div className="max-w-6xl w-full mt-24 border-t border-white/5 pt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="p-5 glass-panel rounded-xl flex flex-col gap-2 relative group overflow-hidden border-white/5"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg bg-white/[0.02] border border-white/5 ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider font-mono">
                    {stat.label}
                  </span>
                </div>
                <span className="text-xl font-bold text-white heading-font tracking-wide mt-1">
                  {stat.value}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
