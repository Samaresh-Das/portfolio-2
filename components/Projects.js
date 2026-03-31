import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cards from "./Cards";
import WPCards from "./WPCards";

const TABS = [
  { id: "all", label: "Projects" },
  { id: "wordpress", label: "WordPress Projects" },
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <section id="projects" className="py-32 px-6 md:px-24">
      {/* Heading */}
      <h2 className="text-[#FF8303] font-intro2 text-[40px] text-center mb-12">
        My Works
      </h2>

      {/* Tab Bar */}
      <div className="flex justify-center mb-16">
        <div className="relative flex items-center gap-1 bg-[#1A1917] border border-[#F0E3CA]/10 rounded-full p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative z-10 px-5 py-2 rounded-full text-[14px] font-medium transition-colors duration-200 ${activeTab === tab.id
                ? "text-black"
                : "text-[#F0E3CA]/50 hover:text-[#F0E3CA]"
                }`}
            >
              {/* Active pill background */}
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

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.38, ease: "easeInOut" }}
        >
          {activeTab === "all" ? <Cards /> : <WPCards />}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Projects;