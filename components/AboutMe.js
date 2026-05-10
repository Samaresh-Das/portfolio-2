import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionLabel from "./SectionLabel";
import AnimatedText from "./AnimatedText";
import FadeIn from "./FadeIn";

const AboutMe = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgTextX = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-28 md:py-40 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Decorative large text */}
      <motion.div
        style={{ x: bgTextX }}
        className="absolute right-0 top-1/3 text-[150px] md:text-[250px] font-intro1 text-[#F0E3CA] select-none pointer-events-none leading-none z-0"
        aria-hidden="true"
      >
        <span style={{ opacity: 0.025 }}>ABOUT</span>
      </motion.div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
        {/* VISUAL BLOCK - Slides in from left */}
        <motion.div 
          className="flex justify-center md:justify-start"
          initial={{ opacity: 0, x: -100, rotateY: -30 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, type: "spring", stiffness: 50 }}
          style={{ perspective: "1000px" }}
        >
          <div className="relative group">
            {/* Offset frame */}
            <div className="absolute inset-0 border border-[#FF8303]/30 rounded-3xl translate-x-6 translate-y-6 transition-transform group-hover:translate-x-4 group-hover:translate-y-4 duration-500" />

            <div className="relative bg-[#151412] rounded-3xl p-12 border border-[#F0E3CA]/10 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF8303]/10 blur-3xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F0E3CA]/5 blur-3xl rounded-full" />
              
              <img
                src="./Assets/Logo.png"
                alt="Samaresh Das Logo"
                className="w-[140px] md:w-[180px] mx-auto relative z-10"
              />

              {/* Stats row */}
              <div className="flex justify-center gap-12 mt-10 pt-8 border-t border-[#F0E3CA]/10 relative z-10">
                <div className="text-center">
                  <p className="text-[#FF8303] font-intro1 text-[32px] leading-none">3+</p>
                  <p className="text-[#F0E3CA]/50 text-[12px] font-intro3 mt-2 tracking-widest uppercase">Years<br/>Coding</p>
                </div>
                <div className="text-center">
                  <p className="text-[#FF8303] font-intro1 text-[32px] leading-none">10+</p>
                  <p className="text-[#F0E3CA]/50 text-[12px] font-intro3 mt-2 tracking-widest uppercase">Projects<br/>Shipped</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* TEXT BLOCK - Slides in from right */}
        <motion.div 
          className="text-center md:text-left"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, type: "spring", stiffness: 50 }}
        >
          <SectionLabel number="01" label="About Me" />

          <FadeIn delay={0.2} y={20}>
            <h2 className="text-[#F0E3CA] font-intro2 text-[42px] md:text-[54px] mb-8 leading-tight">
              About <span className="text-[#FF8303]">Me</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.3} y={20}>
            <AnimatedText 
              text="I'm a full-stack developer who enjoys building clean, scalable, and maintainable products. My core strength lies in translating ideas into reliable user experiences using modern frontend and backend technologies."
              className="text-[#F0E3CA]/70 text-[17px] md:text-[18px] font-intro3 leading-relaxed mb-6"
            />
          </FadeIn>

          <FadeIn delay={0.4} y={20}>
            <AnimatedText 
              text="I primarily work with the MERN stack and care deeply about UI clarity, performance, and real-world usability. I like shipping things fast — but never sloppy."
              className="text-[#F0E3CA]/70 text-[17px] md:text-[18px] font-intro3 leading-relaxed"
            />
          </FadeIn>

          {/* Tagline with animated underline */}
          <FadeIn delay={0.5} y={20} className="mt-10 inline-block text-center md:text-left">
            <span className="text-[#FF8303] text-[16px] md:text-[18px] font-intro3 relative inline-block">
              Project-driven. Detail-oriented. Always learning.
              <motion.span
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
                className="absolute -bottom-2 left-0 h-[2px] bg-[#FF8303]/60"
              />
            </span>
          </FadeIn>

          {/* Traits grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            {[
              "MERN Stack",
              "TypeScript",
              "AWS / Cloud",
              "GraphQL",
              "Performance",
              "Clean Code",
            ].map((trait, i) => (
              <FadeIn key={trait} delay={0.6 + i * 0.1} y={15}>
                <div className="flex items-center gap-3 text-[15px] text-[#F0E3CA]/70 font-intro3 bg-[#151412] border border-[#F0E3CA]/10 rounded-full px-4 py-2 hover:border-[#FF8303]/40 hover:text-[#F0E3CA] transition-colors cursor-default">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8303] flex-shrink-0 shadow-[0_0_8px_rgba(255,131,3,0.8)]" />
                  {trait}
                </div>
              </FadeIn>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
