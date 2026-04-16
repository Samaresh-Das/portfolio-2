import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const textLinesRef = useRef([]);
  const taglineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo 3D flip reveal on scroll
      gsap.fromTo(
        logoRef.current,
        { rotateY: -40, opacity: 0, transformPerspective: 800 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Text lines cascade reveal
      gsap.fromTo(
        textLinesRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textLinesRef.current[0],
            start: "top 82%",
            once: true,
          },
        }
      );

      // Tagline underline draw
      gsap.fromTo(
        ".about-underline",
        { width: "0%" },
        {
          width: "100%",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: taglineRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !textLinesRef.current.includes(el)) {
      textLinesRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-28 md:py-36 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Decorative large text */}
      <span
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[120px] md:text-[200px] font-intro1 text-[#F0E3CA] select-none pointer-events-none leading-none"
        style={{ opacity: 0.025, lineHeight: 1 }}
        aria-hidden="true"
      >
        ABOUT
      </span>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">

        {/* VISUAL BLOCK */}
        <div className="flex justify-center md:justify-start">
          <div
            ref={logoRef}
            className="relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Offset frame */}
            <div className="absolute inset-0 border border-[#FF8303]/30 rounded-2xl translate-x-5 translate-y-5" />

            <div className="relative bg-[#21201D] rounded-2xl p-12 border border-[#F0E3CA]/8">
              <img
                src="./Assets/Logo.png"
                alt="Samaresh Das Logo"
                className="w-[130px] md:w-[160px] mx-auto"
              />

              {/* Stats row */}
              <div className="flex justify-center gap-8 mt-8 pt-6 border-t border-[#F0E3CA]/10">
                <div className="text-center">
                  <p className="text-[#FF8303] font-intro1 text-[28px]">3+</p>
                  <p className="text-[#F0E3CA]/50 text-[12px] font-intro3 mt-1">Years coding</p>
                </div>
                <div className="text-center">
                  <p className="text-[#FF8303] font-intro1 text-[28px]">10+</p>
                  <p className="text-[#F0E3CA]/50 text-[12px] font-intro3 mt-1">Projects shipped</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TEXT BLOCK */}
        <div className="text-center md:text-left">
          <SectionLabel number="01" label="About Me" />

          <h2
            ref={addToRefs}
            className="text-[#FF8303] font-intro2 text-[38px] md:text-[44px] mb-6"
          >
            About Me
          </h2>

          <p
            ref={addToRefs}
            className="text-[#F0E3CA]/80 text-[17px] font-intro3 leading-relaxed"
          >
            I'm a full-stack developer who enjoys building clean, scalable,
            and maintainable products. My core strength lies in translating
            ideas into reliable user experiences using modern frontend and
            backend technologies.
          </p>

          <p
            ref={addToRefs}
            className="text-[#F0E3CA]/80 text-[17px] font-intro3 leading-relaxed mt-5"
          >
            I primarily work with the MERN stack and care deeply about UI
            clarity, performance, and real-world usability. I like shipping
            things fast — but never sloppy.
          </p>

          {/* Tagline with animated underline */}
          <div ref={taglineRef} className="mt-8 inline-block text-center md:text-left">
            <span className="text-[#FF8303] text-[16px] font-intro3 relative">
              Project-driven. Detail-oriented. Always learning.
              <span
                className="about-underline absolute -bottom-1 left-0 h-[1.5px] bg-[#FF8303] opacity-50"
                style={{ width: "0%" }}
              />
            </span>
          </div>

          {/* Traits grid */}
          <div
            ref={addToRefs}
            className="grid grid-cols-2 gap-3 mt-10"
          >
            {[
              "MERN Stack",
              "TypeScript",
              "AWS / Cloud",
              "GraphQL",
              "Performance",
              "Clean Code",
            ].map((trait) => (
              <motion.div
                key={trait}
                className="flex items-center gap-2 text-[14px] text-[#F0E3CA]/60 font-intro3"
                whileHover={{ x: 4, color: "#F0E3CA" }}
                transition={{ duration: 0.2 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8303] flex-shrink-0" />
                {trait}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
