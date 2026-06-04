import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Sparkles, Cpu, BookOpen, Activity, ArrowRight } from 'lucide-react';

export default function AIEngine() {
  const [activeLayer, setActiveLayer] = useState(0);

  const engineLayers = [
    {
      title: "1. Input Cognition Layer",
      subtitle: "STUDENT ACTIVITY",
      icon: UserCheck,
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      description: "QuizPose reads real-time mouse latency, keystroke patterns, and assessment answer profiles to draft the learner's initial memory threshold index."
    },
    {
      title: "2. Processing Reasoning Layer",
      subtitle: "AI BRAIN OPTIMIZATION",
      icon: Cpu,
      color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      description: "Generates prompt structures through standard Gemini LLM configurations, structuring custom assessment models with strict context-matching benchmarks."
    },
    {
      title: "3. Adaptation Engine Layer",
      subtitle: "DIFFICULTY MATRIX ANALYSIS",
      icon: Activity,
      color: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
      description: "Dynamically calculates problem scores and cognitive thresholds. If performance drops or latency spikes, it immediately scales problem difficulty levels."
    },
    {
      title: "4. Output Learning Layer",
      subtitle: "PERSONALIZED PATHWAY",
      icon: BookOpen,
      color: "text-violet-400 border-violet-500/30 bg-violet-500/10",
      description: "Renders the optimized knowledge roadmap directly to the student UI, featuring intelligent real-time tips, badging feedback, and score adjustments."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center relative px-4">
      
      {/* Background glowing effects */}
      <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[20%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl w-full space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] text-purple-400 font-bold uppercase tracking-[0.25em]">COGITIVE ENGINE ARCHITECTURE</span>
          <h2 className="text-3xl md:text-5xl heading-font font-black text-white">
            Inside the{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              QuizPose Core
            </span>
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Witness the abstraction flow of how neural feedback loops shape personalized learning structures.
          </p>
        </div>

        {/* Dynamic Interaction Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Layer list triggers */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[9px] text-neutral-500 font-mono tracking-widest block mb-2">INTELLIGENCE STAGES</span>
            {engineLayers.map((layer, idx) => {
              const Icon = layer.icon;
              const isActive = activeLayer === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveLayer(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-500 text-white shadow-lg' 
                      : 'bg-white/[0.01] border-white/5 text-neutral-400 hover:bg-white/[0.02] hover:text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${layer.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-cyan-400 block tracking-wider uppercase">{layer.subtitle}</span>
                      <span className="text-xs heading-font font-bold block">{layer.title}</span>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-purple-400' : 'text-neutral-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Center/Right: Wow active animated visual node abstraction */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border-white/5 relative min-h-[420px] flex flex-col justify-between overflow-hidden">
            
            {/* Ambient beam pattern background */}
            <div className="absolute inset-0 animated-grid pointer-events-none opacity-40" />

            {/* Stage heading & description */}
            <div className="z-10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[9px] text-cyan-400 font-mono tracking-widest uppercase">
                  COGNITIVE SCHEDULING UNIT
                </span>
                <span className="text-[9px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded uppercase font-bold font-mono">
                  Stage_0{activeLayer + 1}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLayer}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl heading-font font-black text-white">{engineLayers[activeLayer].title}</h3>
                  <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
                    {engineLayers[activeLayer].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Neural Abstract visual connections */}
            <div className="h-44 mt-8 bg-neutral-950/45 border border-white/5 rounded-2xl relative flex items-center justify-center overflow-hidden z-10">
              
              {/* Central Active Node Sphere */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600/25 to-cyan-500/25 border border-purple-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)] z-20">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>

              {/* Pulsing connections from nodes based on active layer */}
              <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>

                {/* Blinking connection links */}
                <line x1="20" y1="50" x2="90" y2="50" stroke="url(#linkGrad)" strokeWidth="0.75" strokeDasharray="3,3" />
                <line x1="110" y1="50" x2="180" y2="50" stroke="url(#linkGrad)" strokeWidth="0.75" strokeDasharray="3,3" />
                
                {/* Flowing particle dot beam simulation */}
                <motion.circle 
                  cx="20" 
                  cy="50" 
                  r="2" 
                  fill="#a78bfa"
                  animate={{ cx: [20, 90] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle 
                  cx="110" 
                  cy="50" 
                  r="2" 
                  fill="#22d3ee"
                  animate={{ cx: [110, 180] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }}
                />
              </svg>

              {/* Connected node visual bubbles */}
              <div className="absolute left-6 w-8 h-8 rounded-lg bg-neutral-900 border border-purple-500/25 flex items-center justify-center text-purple-400 shadow-md">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="absolute right-6 w-8 h-8 rounded-lg bg-neutral-900 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shadow-md">
                <BookOpen className="w-4 h-4" />
              </div>

              {/* Status display */}
              <span className="absolute bottom-2 left-4 text-[8px] text-neutral-500 font-mono uppercase">
                COGNITIVE NETWORK LOAD: STABLE
              </span>
              <span className="absolute bottom-2 right-4 text-[8px] text-cyan-400 font-mono uppercase">
                TUNING ACCURACY: 99.8%
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
