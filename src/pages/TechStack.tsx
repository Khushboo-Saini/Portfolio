import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Sparkles, Server, Database, Cpu, Atom } from 'lucide-react';

export default function TechStack() {
  const [selectedPlanet, setSelectedPlanet] = useState<string>('AI APIs');

  const planets = [
    { 
      name: "React", 
      role: "Client-side interactive visual engine", 
      icon: Atom, 
      pos: { x: 50, y: 15 }, 
      desc: "Powers our fast multi-client virtual DOM interfaces, enabling 60fps card transitions, interactive quiz nodes, and instant tab routes.",
      color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" 
    },
    { 
      name: "Next.js", 
      role: "Hybrid production web frame", 
      icon: Layers, 
      pos: { x: 80, y: 35 }, 
      desc: "Guarantees premium search indexing, edge static builds, and statless server-rendered routing layers.",
      color: "text-white border-white/20 bg-white/5" 
    },
    { 
      name: "Node.js", 
      role: "High-concurrency API runtime", 
      icon: Server, 
      pos: { x: 80, y: 70 }, 
      desc: "Drives our Express backend routing clusters, maintaining sub-millisecond event loop speeds under massive client load.",
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" 
    },
    { 
      name: "PostgreSQL", 
      role: "Decoupled relational storage pool", 
      icon: Database, 
      pos: { x: 50, y: 85 }, 
      desc: "Neon serverless PG database securely hosting user profile structures, transactional streams, and visitors telemetry records.",
      color: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10" 
    },
    { 
      name: "AI APIs", 
      role: "Generative intelligence prompt engine", 
      icon: Cpu, 
      pos: { x: 20, y: 70 }, 
      desc: "Orchestrates complex context prompt graphs utilizing Gemini models to dynamically draft custom math and technical quiz cards.",
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10" 
    },
    { 
      name: "TensorFlow", 
      role: "Predictive student scoring engine", 
      icon: Sparkles, 
      pos: { x: 20, y: 35 }, 
      desc: "Analyzes student response latencies and streak rates locally to score and shift assessment difficulty thresholds dynamically.",
      color: "text-amber-500 border-amber-500/30 bg-amber-500/10" 
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center relative px-4">
      
      {/* Background glow filters */}
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl w-full space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] text-purple-400 font-bold uppercase tracking-[0.25em]">TECHNOLOGY GALAXY</span>
          <h2 className="text-3xl md:text-5xl heading-font font-black text-white">
            Our Architecture{"   "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Galaxy Map
            </span>
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Click any floating planet in the interactive SVG constellation below to parse its engineering specifications.
          </p>
        </div>

        {/* Constellation Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Galaxy interactive map (Col-span 7) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl border-white/5 p-6 h-[420px] relative flex items-center justify-center overflow-hidden">
            
            {/* SVG Orbits & lines */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Inner Orbit circles */}
              <circle cx="50" cy="50" r="35" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="22" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" fill="none" />

              {/* Connecting constellation vectors */}
              <line x1="50" y1="15" x2="80" y2="35" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="0.5" />
              <line x1="80" y1="35" x2="80" y2="70" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="0.5" />
              <line x1="80" y1="70" x2="50" y2="85" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="0.5" />
              <line x1="50" y1="85" x2="20" y2="70" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="0.5" />
              <line x1="20" y1="70" x2="20" y2="35" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="0.5" />
              <line x1="20" y1="35" x2="50" y2="15" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="0.5" />

              {/* Cross center nodes */}
              <line x1="50" y1="50" x2="50" y2="15" stroke="rgba(255,255,255,0.03)" strokeWidth="0.25" />
              <line x1="50" y1="50" x2="80" y2="35" stroke="rgba(255,255,255,0.03)" strokeWidth="0.25" />
              <line x1="50" y1="50" x2="80" y2="70" stroke="rgba(255,255,255,0.03)" strokeWidth="0.25" />
              <line x1="50" y1="50" x2="50" y2="85" stroke="rgba(255,255,255,0.03)" strokeWidth="0.25" />
              <line x1="50" y1="50" x2="20" y2="70" stroke="rgba(255,255,255,0.03)" strokeWidth="0.25" />
              <line x1="50" y1="50" x2="20" y2="35" stroke="rgba(255,255,255,0.03)" strokeWidth="0.25" />
            </svg>

            {/* Central Sun: QuizPose Engine core */}
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 border border-purple-400/40 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.4)] z-10 glowing-orb">
              <span className="text-[8px] font-black text-white uppercase tracking-widest text-center leading-none">
                QUIZPOSE<br />CORE
              </span>
            </div>

            {/* Constellation Planets Map */}
            {planets.map((planet, idx) => {
              const Icon = planet.icon;
              const isSelected = selectedPlanet === planet.name;
              
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedPlanet(planet.name)}
                  className={`absolute w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 z-20 ${
                    isSelected 
                      ? 'border-cyan-400 bg-cyan-950/20 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-110' 
                      : 'border-white/5 bg-neutral-900 text-neutral-400'
                  }`}
                  style={{
                    left: `${planet.pos.x}%`,
                    top: `${planet.pos.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <Icon className="w-5 h-5 animate-pulse" />
                </button>
              );
            })}

          </div>

          {/* Right: Technical Planet Spec Description (Col-span 5) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {planets.map((planet) => {
                if (planet.name !== selectedPlanet) return null;
                const Icon = planet.icon;
                return (
                  <motion.div
                    key={planet.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                    className="glass-panel p-8 rounded-3xl border-white/5 space-y-6 relative overflow-hidden h-[420px] flex flex-col justify-between"
                  >
                    <div className="absolute top-0 right-0 p-4 text-[9px] text-cyan-400 font-mono tracking-widest uppercase">
                      GALAXY SPEC // PARSED
                    </div>

                    <div className="space-y-6 mt-4">
                      {/* Logo and title */}
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${planet.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-purple-400 block tracking-wider uppercase">
                            {planet.role}
                          </span>
                          <h3 className="text-xl heading-font font-black text-white">
                            {planet.name}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
                        {planet.desc}
                      </p>
                    </div>

                    {/* Node status indicators */}
                    <div className="border-t border-white/5 pt-4 space-y-1.5 text-[9px] font-mono text-neutral-500 uppercase">
                      <div className="flex justify-between">
                        <span>INTEGRATION LINK:</span>
                        <span className="text-emerald-400 font-bold">ONLINE & SHIPPED</span>
                      </div>
                      <div className="flex justify-between">
                        <span>LATENCY RESPONSE:</span>
                        <span className="text-cyan-400 font-bold">SUB 12MS STABLE</span>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
