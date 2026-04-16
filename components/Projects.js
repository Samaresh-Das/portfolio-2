import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cards from "./Cards";
import WPCards from "./WPCards";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  { id: "all", label: "Projects" },
  { id: "wordpress", label: "WordPress" },
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");
  const headingRef = useRef(null);

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
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="relative overflow-hidden">
      {/* Heading area — outside of the horizontal scroll block */}
      <div className="py-20 md:py-28 px-6 md:px-12 relative z-10">
        {/* Decorative bg text */}
        <span
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-intro1 text-[#F0E3CA] select-none pointer-events-none whitespace-nowrap"
          style={{ fontSize: "clamp(60px, 14vw, 180px)", opacity: 0.022, lineHeight: 1 }}
          aria-hidden="true"
        >
          WORK
        </span>

        <div className="max-w-6xl mx-auto">
          <div ref={headingRef} className="opacity-0">
            <SectionLabel number="04" label="My Works" />
            <h2 className="text-[#FF8303] font-intro2 text-[38px] md:text-[44px] mb-10">
              My Works
            </h2>
          </div>

          {/* Tab Bar */}
          <div className="flex justify-start mb-0">
            <div className="relative flex items-center gap-1 bg-[#1A1917] border border-[#F0E3CA]/10 rounded-full p-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 px-5 py-2 rounded-full text-[14px] font-intro3 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "text-black font-intro2"
                      : "text-[#F0E3CA]/50 hover:text-[#F0E3CA]"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 bg-[#FF8303] rounded-full"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content — Cards handles its own layout (h-scroll or vertical) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === "all" ? (
            <Cards />
          ) : (
            <div className="px-6 md:px-12 pb-28">
              <WPCards />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Projects;