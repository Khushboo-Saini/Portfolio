import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, Layout, Zap, Award, LineChart, BookOpen, BarChart3 } from 'lucide-react';

export default function Features() {
  const [difficulty, setDifficulty] = useState(5);
  const [xp, setXp] = useState(720);
  const [selectedSubject, setSelectedSubject] = useState('Computer Science');
  const [wavePoints, setWavePoints] = useState<string>('0,50 20,40 40,60 60,30 80,70 100,50');

  // Interactive subjects list
  const subjects = [
    { name: "Computer Science", node: "CS Node", color: "border-purple-500/30 text-purple-400" },
    { name: "Quantum Physics", node: "QP Node", color: "border-cyan-500/30 text-cyan-400" },
    { name: "Synthetic Biology", node: "SB Node", color: "border-indigo-500/30 text-indigo-400" },
    { name: "Data Architecture", node: "DA Node", color: "border-violet-500/30 text-violet-400" }
  ];

  // Randomise wave chart simulation on mount
  useEffect(() => {
    const interval = setInterval(() => {
      const p1 = Math.floor(30 + Math.random() * 30);
      const p2 = Math.floor(20 + Math.random() * 40);
      const p3 = Math.floor(40 + Math.random() * 30);
      const p4 = Math.floor(10 + Math.random() * 50);
      const p5 = Math.floor(50 + Math.random() * 40);
      setWavePoints(`0,${p1} 20,${p2} 40,${p3} 60,${p4} 80,${p5} 100,30`);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center relative px-4">
      <div className="max-w-6xl w-full space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] text-purple-400 font-bold uppercase tracking-[0.25em]">BENTO CAPABILITIES</span>
          <h2 className="text-3xl md:text-5xl heading-font font-black text-white">
            Designed for{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              High-Agency Learning
            </span>
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Explore our state-of-the-art learning engine features mapped out in an interactive Bento Matrix.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: AI Quiz Generation (Double width on large screen) */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 space-y-4 md:col-span-2 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[9px] text-neutral-500 font-mono">MODULE // GEN_01</span>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg heading-font font-bold text-white">AI Quiz Generation</h3>
              <p className="text-neutral-400 text-xs font-light leading-relaxed">
                Automatically author custom assessment papers tailored to your exact subject boundaries. The engine leverages advanced system prompt graphs to structure high-cognitive, contextual problem sets.
              </p>
            </div>

            {/* Micro-simulation inside card */}
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-3 relative">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-purple-400">STATUS: REASONING COMPILING</span>
                <span className="text-neutral-500">92% MATCH</span>
              </div>
              <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden border border-neutral-950">
                <motion.div 
                  className="bg-purple-500 h-full rounded-full"
                  animate={{ width: ["10%", "92%", "92%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <p className="text-[10px] text-neutral-500 italic">"Prompt parsed: Generate 4 multi-stage quantum nodes..."</p>
            </div>
          </div>

          {/* Card 2: Smart Difficulty Adaptation */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 space-y-6 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[9px] text-neutral-500 font-mono">MODULE // ADAPT_02</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base heading-font font-bold text-white">Smart Difficulty Adaptation</h3>
              <p className="text-neutral-450 text-xs font-light leading-relaxed">
                Adjusts real-time problem scaling based on parameters of correctness and response speed.
              </p>
            </div>

            {/* Slider Simulation */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-neutral-400">Difficulty Gauge</span>
                <span className="text-cyan-400 font-bold">LVL {difficulty}/10</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={difficulty}
                onChange={(e) => setDifficulty(parseInt(e.target.value))}
                className="w-full h-1 bg-neutral-850 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[9px] text-neutral-500 block text-right font-mono">
                {difficulty > 7 ? 'HIGH ALGORITHM CALIBRATION' : difficulty > 4 ? 'BALANCED COGNITION' : 'FOUNDATION SYNC'}
              </span>
            </div>
          </div>

          {/* Card 3: Real-Time Analytics */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 space-y-6 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <LineChart className="w-5 h-5" />
              </div>
              <span className="text-[9px] text-neutral-500 font-mono">MODULE // CHART_03</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base heading-font font-bold text-white">Real-Time Analytics</h3>
              <p className="text-neutral-450 text-xs font-light leading-relaxed">
                Watch your performance map update on-the-fly as you answer subject milestones.
              </p>
            </div>

            {/* SVG Simulated Chart */}
            <div className="h-20 bg-neutral-900/35 border border-white/5 rounded-xl flex items-end p-2 relative overflow-hidden">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <motion.polyline
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="2"
                  points={wavePoints}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>
              <span className="absolute bottom-1 right-2 text-[8px] text-indigo-400 font-mono">COGNITIVE LATENCY INDEX</span>
            </div>
          </div>

          {/* Card 4: Multi-Subject Intelligence */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 space-y-6 md:col-span-2 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[9px] text-neutral-500 font-mono">MODULE // NODE_04</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg heading-font font-bold text-white">Multi-Subject Intelligence Nodes</h3>
              <p className="text-neutral-400 text-xs font-light leading-relaxed">
                Connect and swap seamlessly between diverse subject modules. Click the nodes below to trigger network routing:
              </p>
            </div>

            {/* Interactive Subject Nodes grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              {subjects.map((subj, index) => {
                const isSelected = selectedSubject === subj.name;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedSubject(subj.name)}
                    className={`p-3 rounded-xl border text-[10px] font-bold text-center transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 border-purple-500 text-white shadow-md' 
                        : 'bg-white/[0.01] border-white/5 text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.02]'
                    }`}
                  >
                    <span>{subj.name}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="text-[9px] text-center text-neutral-500 font-mono">
              ACTIVE NODE ROUTED: <span className="text-violet-400 font-bold uppercase">{selectedSubject}</span>
            </div>

          </div>

          {/* Card 5: Gamification & Level XP */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 space-y-6 md:col-span-3 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[9px] text-neutral-500 font-mono">MODULE // XP_05</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-base heading-font font-bold text-white">Gamification & XP Acceleration</h3>
                <p className="text-neutral-400 text-xs font-light leading-relaxed">
                  Maintain daily response streaks, unlock cognitive badges, and level up your IQ threshold.
                </p>
              </div>

              {/* XP progress bar simulation */}
              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-neutral-400">EXPERIENCE RANK</span>
                  <span className="text-purple-400 font-bold">{xp} / 1000 XP</span>
                </div>
                <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden border border-neutral-950">
                  <motion.div 
                    className="bg-purple-500 h-full rounded-full"
                    style={{ width: `${(xp / 1000) * 100}%` }}
                    animate={{ width: `${(xp / 1000) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-neutral-500">LEVEL 12 MIND</span>
                  <button 
                    onClick={() => setXp(prev => Math.min(prev + 70, 1000))}
                    className="px-2.5 py-1 bg-purple-500/25 hover:bg-purple-500/35 border border-purple-500/30 rounded text-[9px] font-bold text-purple-300 transition-all cursor-pointer"
                  >
                    +70 XP Boost
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
