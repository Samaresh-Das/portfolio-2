import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const AGENTS = [
  {
    id: "01",
    title: "Research & Topic Agent",
    icon: "🕵️‍♂️",
    description: "Uses News API & custom prompts to fetch trending developer topics. Filters topics relevant to programming, AI, SaaS, and dev tools.",
    tags: ["News API", "Cron Jobs", "Python"]
  },
  {
    id: "02",
    title: "Content Generation Agent",
    icon: "✍️",
    description: "Powered by Google AI Studio (Gemini). Generates LinkedIn hooks and long-form markdown blogs with practical, developer-focused insights.",
    tags: ["Gemini API", "Prompt Engineering"]
  },
  {
    id: "03",
    title: "Asset & Publishing Agent",
    icon: "🚀",
    description: "Uses Stability AI for dev-themed visuals. Autonomously publishes to Dev.to & Hashnode via API architectures.",
    tags: ["Stability AI", "GraphQL", "REST APIs"]
  }
];

const AgentCard = ({ agent, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col items-start gap-4 w-full p-8 bg-[#1A1917] border border-[#F0E3CA]/10 rounded-2xl hover:border-[#FF8303]/30 transition-all duration-300 overflow-hidden"
    >
      {/* Background radial gradient that follows mouse hover */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 131, 3, 0.08), transparent 40%)"
        }}
      />
      
      {/* Index Number Outline */}
      <span className="absolute -right-4 -top-6 text-[#FF8303]/10 font-intro1 text-[120px] select-none pointer-events-none z-0">
        {agent.id}
      </span>

      <div className="relative z-10 w-full">
        {/* Icon */}
        <div className="w-14 h-14 flex items-center justify-center bg-[#FF8303]/10 border border-[#FF8303]/20 rounded-full mb-6 text-2xl group-hover:scale-110 transition-transform duration-300">
          {agent.icon}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {agent.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-3 py-1 rounded-full border border-[#F0E3CA]/20 text-[#F0E3CA]/70 font-intro3 backdrop-blur-sm group-hover:border-[#FF8303]/40 group-hover:text-[#FF8303]/90 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <h3 className="text-[#F0E3CA] text-[22px] font-intro2 group-hover:text-[#FF8303] transition-colors duration-300 mb-3">
          {agent.title}
        </h3>

        <p className="text-[#F0E3CA]/60 text-[15px] font-intro3 leading-relaxed">
          {agent.description}
        </p>
      </div>
    </motion.div>
  );
};

const AgenticAIs = () => {
  const headingRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="agentic-ais" className="relative overflow-hidden py-20 md:py-28" ref={containerRef}>
      {/* Decorative bg element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF8303]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div ref={headingRef} className="opacity-0 mb-16">
          <SectionLabel number="05" label="Agentic AI Systems" />
          <h2 className="text-[#FF8303] font-intro2 text-[38px] md:text-[44px] mb-6">
            Agentic AI Content Pipeline
          </h2>
          
          <div className="max-w-3xl">
            <p className="text-[#F0E3CA]/70 font-intro3 text-[16px] leading-relaxed mb-6">
              I have engineered a zero-cost, fully automated multi-agent system that autonomously orchestrates the generation and distribution of highly engaging, developer-focused content. Driven by a cron-scheduled GitHub Actions pipeline.
            </p>

            {/* Note badge */}
            <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-[#FF8303]/10 border border-[#FF8303]/20 rounded-xl relative overflow-hidden group">
              <span className="text-xl">🔒</span>
              <p className="text-[#F0E3CA]/80 font-intro3 text-[14px]">
                <span className="text-[#FF8303] font-intro2">Confidential Codebase:</span> Due to sensitive API credentials, the source is private. I'm happy to demonstrate the full architecture on a call!
              </p>
            </div>
          </div>
        </div>

        {/* 3 Agent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AGENTS.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} index={index} />
          ))}
        </div>

        {/* Target Platforms Flow */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col items-center text-center"
        >
          {/* Flow Visual */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#FF8303]/40 to-[#FF8303]/10" />
            <div className="w-2 h-2 rounded-full bg-[#FF8303]/50 shadow-[0_0_10px_rgba(255,131,3,0.5)]" />
          </div>
          
          <h3 className="text-[#F0E3CA] font-intro2 text-[22px] md:text-[26px] mb-2">Automated Publishing Pipeline</h3>
          <p className="text-[#F0E3CA]/60 font-intro3 text-[14px] mb-10 max-w-lg">
            Once generated and formatted, the content is seamlessly pushed to the following developer communities.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 w-full max-w-4xl">
            {/* LinkedIn */}
            <div className="flex-1 flex items-center justify-center sm:justify-start gap-4 px-6 py-5 bg-[#1A1917] border border-[#F0E3CA]/10 rounded-2xl hover:border-[#0077b5]/50 hover:bg-[#0077b5]/5 transition-all duration-300">
              <div className="w-10 h-10 flex items-center justify-center bg-[#0077b5]/10 text-[#0077b5] rounded-xl text-xl font-bold font-sans">
                in
              </div>
              <div className="text-left">
                <p className="text-[#F0E3CA] font-intro2 text-[16px]">LinkedIn</p>
                <p className="text-[#F0E3CA]/50 font-intro3 text-[12px] mt-0.5">Semi-automated Hooks</p>
              </div>
            </div>

            {/* Dev.to */}
            <div className="flex-1 flex items-center justify-center sm:justify-start gap-4 px-6 py-5 bg-[#1A1917] border border-[#F0E3CA]/10 rounded-2xl hover:border-gray-300/50 hover:bg-white/5 transition-all duration-300">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-600 border border-gray-500 text-white rounded-xl text-xs font-bold tracking-widest">
                DEV
              </div>
              <div className="text-left">
                <p className="text-[#F0E3CA] font-intro2 text-[16px]">Dev.to</p>
                <p className="text-[#F0E3CA]/50 font-intro3 text-[12px] mt-0.5">REST API Integration</p>
              </div>
            </div>

            {/* Hashnode */}
            <div className="flex-1 flex items-center justify-center sm:justify-start gap-4 px-6 py-5 bg-[#1A1917] border border-[#F0E3CA]/10 rounded-2xl hover:border-[#2962FF]/50 hover:bg-[#2962FF]/5 transition-all duration-300">
              <div className="w-10 h-10 flex items-center justify-center bg-[#2962FF]/10 text-[#2962FF] rounded-xl text-xl font-bold font-serif italic">
                h
              </div>
              <div className="text-left">
                <p className="text-[#F0E3CA] font-intro2 text-[16px]">Hashnode</p>
                <p className="text-[#F0E3CA]/50 font-intro3 text-[12px] mt-0.5">GraphQL Mutations</p>
              </div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default AgenticAIs;
