import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Cpu, Code2, ShieldAlert, Award } from 'lucide-react';

export default function Journey() {
  const milestones = [
    {
      title: "1. Research Phase",
      subtitle: "COGNITIVE BEHAVIOR MATRIX",
      icon: Compass,
      date: "Q3 2024",
      desc: "Conducted user research to evaluate how fixed-interval multi-stage assessments impact student memory retention compared to traditional worksheets.",
      color: "text-purple-400 border-purple-500/25 bg-purple-500/10"
    },
    {
      title: "2. Design Phase",
      subtitle: "GLASSMORPHIC SCHEMATICS",
      icon: Sparkles,
      date: "Q1 2025",
      desc: "Drafted mockups for QuizPose's interface, moving completely away from boring observability tables into glowing dark mesh states.",
      color: "text-cyan-400 border-cyan-500/25 bg-cyan-500/10"
    },
    {
      title: "3. AI Training",
      subtitle: "LLM REASONER COUPLING",
      icon: Cpu,
      date: "Q3 2025",
      desc: "Optimized prompt templates utilizing Gemini 1.5 API models to guarantee that generated quizzes align with high-cognitive learning schemas.",
      color: "text-indigo-400 border-indigo-500/25 bg-indigo-500/10"
    },
    {
      title: "4. Product Build",
      subtitle: "MONOREPO INCEPTION",
      icon: Code2,
      date: "Q1 2026",
      desc: "Assembled the monorepo under `pnpm-workspace.yaml`, building React clients and wiring the Express + PostgreSQL backend.",
      color: "text-violet-400 border-violet-500/25 bg-violet-500/10"
    },
    {
      title: "5. User Testing",
      subtitle: "COGNITIVE STREAK DIAGNOSTICS",
      icon: ShieldAlert,
      date: "Q2 2026",
      desc: "Shipped early prototype sandboxes to pilot students. Analyzed response latencies and recalibrated the slider difficulty scoring engine.",
      color: "text-red-400 border-red-500/25 bg-red-500/10"
    },
    {
      title: "6. Production Deployment",
      subtitle: "THE NEURAL PLATFORM IS LIVE",
      icon: Award,
      date: "Ongoing",
      desc: "Deployed the aggregated web application statlessly. The learning intelligence ecosystem is fully functional.",
      color: "text-emerald-400 border-emerald-500/25 bg-emerald-500/10"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center relative px-4">
      
      {/* Background radial spotlight glows */}
      <div className="absolute top-[20%] left-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl w-full space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] text-purple-400 font-bold uppercase tracking-[0.25em]">EVOLUTION PATH</span>
          <h2 className="text-3xl md:text-5xl heading-font font-black text-white">
            QuizPose{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Evolution Path
            </span>
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Trace the development progression of our adaptive AI assessment platform from paper concept to production.
          </p>
        </div>

        {/* Vertical Timeline Path */}
        <div className="relative border-l border-white/10 pl-8 md:pl-12 ml-4 md:ml-8 space-y-12">
          
          {/* Glowing Animated line overlay */}
          <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-purple-500 via-cyan-500 to-transparent pointer-events-none" />

          {milestones.map((milestone, idx) => {
            const Icon = milestone.icon;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative glass-panel p-6 rounded-2xl border-white/5 space-y-3 hover:border-purple-500/25 transition-all group"
              >
                
                {/* Glowing Dot Checkpoint on the timeline axis */}
                <div className="absolute top-6 -left-[41px] md:-left-[57px] w-6 h-6 rounded-full bg-neutral-950 border-2 border-purple-500/40 flex items-center justify-center z-10 group-hover:border-cyan-400 transition-colors shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
                </div>

                {/* Milestone Date and Label */}
                <div className="flex justify-between items-start flex-col md:flex-row gap-2 text-[10px] font-mono border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded border flex items-center justify-center shrink-0 ${milestone.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-purple-400 font-bold uppercase tracking-wider">
                      {milestone.subtitle}
                    </span>
                  </div>
                  <span className="text-cyan-400 font-bold tracking-widest">
                    {milestone.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base heading-font font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {milestone.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-450 text-xs font-light leading-relaxed">
                  {milestone.desc}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>
    </div>
  );
}
