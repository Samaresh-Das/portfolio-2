import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import skill_data from "../data/SKILL_DATA";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    title: "Frontend",
    items: ["React Js", "Next Js", "Javascript", "Typescript", "HTML", "CSS"],
  },
  {
    title: "Backend",
    items: ["Node Js", "Express Js", "MongoDB", "GraphQL"],
  },
  {
    title: "Cloud & Tools",
    items: ["AWS"],
  },
];

// Duplicate for seamless marquee loop
const ALL_SKILLS = [...skill_data, ...skill_data];

const Skills = () => {
  const sectionRef = useRef(null);

  const getSkill = (name) => skill_data.find((s) => s.text === name);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        ".skills-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-heading",
            start: "top 82%",
            once: true,
          },
        }
      );

      // Groups stagger
      gsap.fromTo(
        ".skill-group",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skill-group",
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-28 md:py-36 relative overflow-hidden"
    >
      {/* Decorative bg text */}
      <span
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-intro1 text-[#F0E3CA] select-none pointer-events-none whitespace-nowrap"
        style={{ fontSize: "clamp(80px, 18vw, 220px)", opacity: 0.02, lineHeight: 1 }}
        aria-hidden="true"
      >
        SKILLS
      </span>

      {/* ── Awesome Marquee Ribbon ── */}
      <div className="marquee-container mb-24 relative z-10 w-[105vw] -left-[2.5vw] overflow-hidden flex flex-col gap-6 py-8 -rotate-2 bg-[#1A1917]/80 border-y border-[#FF8303]/20 shadow-[0_0_40px_rgba(255,131,3,0.05)] backdrop-blur-md">
        {/* Row 1 - Forward */}
        <div className="marquee-track gap-12 items-center">
          {ALL_SKILLS.map((skill, i) => (
            <div
              key={`fwd-${skill.id}-${i}`}
              className="flex items-center gap-4 flex-shrink-0 px-6 py-2.5 rounded-full bg-[#21201D] border border-[#F0E3CA]/10 shadow-lg"
            >
              <img
                src={skill.logo}
                alt={skill.text}
                className="w-6 h-6 object-contain opacity-80"
              />
              <span className="text-[#F0E3CA]/80 text-[15px] font-intro3 whitespace-nowrap">
                {skill.text}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2 - Reverse */}
        <div className="marquee-track-reverse gap-12 items-center">
          {[...ALL_SKILLS].reverse().map((skill, i) => (
            <div
              key={`rev-${skill.id}-${i}`}
              className="flex items-center gap-4 flex-shrink-0 px-6 py-2.5 rounded-full bg-[#21201D] border border-[#F0E3CA]/10 shadow-lg"
            >
              <img
                src={skill.logo}
                alt={skill.text}
                className="w-6 h-6 object-contain opacity-80"
              />
              <span className="text-[#F0E3CA]/80 text-[15px] font-intro3 whitespace-nowrap">
                {skill.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Skills Grid ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <SectionLabel number="03" label="Tech Stack" />
        <h2 className="skills-heading text-[#FF8303] font-intro2 text-[38px] md:text-[44px] mb-20 opacity-0">
          Skills
        </h2>

        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="skill-group opacity-0">
              {/* Group header */}
              <div className="flex items-center gap-3 mb-7">
                <span className="w-5 h-[1.5px] bg-[#FF8303]" />
                <h3 className="text-[#F0E3CA] text-[16px] font-intro2 tracking-wide">
                  {group.title}
                </h3>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-3">
                {group.items.map((name, i) => {
                  const skill = getSkill(name);
                  if (!skill) return null;
                  return (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ y: -3, scale: 1.05 }}
                      className="flex items-center gap-2.5 px-4 py-2 bg-[#21201D] border border-[#F0E3CA]/12 rounded-full cursor-default hover:border-[#FF8303]/60 hover:bg-[#FF8303]/5 transition-colors duration-200 group"
                    >
                      <img
                        src={skill.logo}
                        alt={skill.text}
                        className="w-[18px] h-[18px] object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                      />
                      <span className="text-[#F0E3CA]/70 text-[14px] font-intro3 group-hover:text-[#F0E3CA] transition-colors duration-200">
                        {skill.text}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
