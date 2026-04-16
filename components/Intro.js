import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import dynamic from "next/dynamic";
import gsap from "gsap";

// Three.js particles — SSR-safe
const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
};

const Intro = () => {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  const textBlockRef = useRef(null);
  const imageRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      // Stagger children of text block
      gsap.fromTo(
        ".hero-line",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.4,
        }
      );

      // Image block
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.7 }
      );

      // Scroll indicator
      gsap.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, delay: 1.5 }
      );
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  // Scroll indicator fades out when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        gsap.to(scrollRef.current, {
          opacity: window.scrollY > 80 ? 0 : 1,
          duration: 0.3,
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative min-h-[calc(100svh-68px)] flex flex-col justify-center px-6 md:px-12 overflow-hidden"
    >
      {/* Particle field — desktop only or reduced on mobile */}
      {!reducedMotion && <ParticleField isMobile={isMobile} />}

      {/* Subtle radial gradient fallback / enhancement */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,131,3,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Grid lines decoration */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#F0E3CA 1px, transparent 1px), linear-gradient(90deg, #F0E3CA 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">

        {/* TEXT BLOCK */}
        <div ref={textBlockRef} className="text-center md:text-left">
          {/* Numbered label */}
          <div className="hero-line flex items-center gap-3 mb-6 justify-center md:justify-start opacity-0">
            <span className="w-8 h-[1px] bg-[#FF8303]" />
            <span className="text-[#FF8303] text-[11px] font-intro3 tracking-[0.35em] uppercase">
              Full Stack Developer
            </span>
          </div>

          {/* Name */}
          <div className="hero-line opacity-0">
            <TypeAnimation
              sequence={["Samaresh Das", 2000, "Sam />"]}
              speed={30}
              wrapper="h1"
              repeat={Infinity}
              className="text-[#FF8303] font-intro1 text-[44px] md:text-[58px] leading-none block"
            />
          </div>

          {/* Descriptor */}
          <h2 className="hero-line text-[#F0E3CA] text-[22px] md:text-[28px] font-intro2 mt-4 opacity-0">
            I build things for the web
          </h2>

          {/* Bio */}
          <p className="hero-line text-[#F0E3CA]/70 text-[16px] md:text-[18px] font-intro3 mt-6 leading-relaxed max-w-lg opacity-0">
            Full-stack developer who ships production-ready web apps — not demos.
            I work with founders, startups, and small teams to build fast, clean,
            and scalable products.
          </p>

          {/* CTA buttons */}
          <div className="hero-line flex gap-4 mt-10 justify-center md:justify-start opacity-0">
            <motion.a
              href="#projects"
              className="relative overflow-hidden px-6 py-3 rounded-full bg-[#FF8303] text-black font-intro2 text-[15px] tracking-wide"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{ boxShadow: "0 0 0 rgba(255,131,3,0)" }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              View my work
            </motion.a>
            <motion.a
              href="#contacts"
              className="px-6 py-3 rounded-full border border-[#F0E3CA]/30 text-[#F0E3CA] font-intro3 text-[15px] tracking-wide hover:border-[#FF8303] hover:text-[#FF8303] transition-colors"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Get in touch
            </motion.a>
          </div>
        </div>

        {/* IMAGE BLOCK */}
        <div ref={imageRef} className="relative flex justify-center items-center opacity-0 mt-16 md:mt-0">
          {/* Background code accent */}
          <img
            src="./Assets/intro-text.png"
            alt="code background"
            className="absolute w-[300px] md:w-[420px] opacity-[0.12] md:opacity-30 select-none pointer-events-none"
            draggable={false}
          />

          {/* Profile photo with float + glow */}
          <div className="relative z-10 float-anim">
            {/* Orange glow ring */}
            <div className="absolute inset-0 rounded-full border-pulse" style={{ borderRadius: "50%" }} />
            <img
              src="./Assets/dp.jpg"
              alt="Samaresh Das — Full Stack Developer"
              className="h-[230px] w-[230px] md:h-[270px] md:w-[270px] object-cover rounded-full border-[3px] border-[#FF8303]"
              style={{ boxShadow: "0 0 40px rgba(255,131,3,0.25)" }}
            />
          </div>

          {/* Decorative orbit ring */}
          <div
            className="absolute rounded-full border border-[#FF8303]/12 pointer-events-none w-[280px] h-[280px] md:w-[340px] md:h-[340px]"
          />
          <div
            className="absolute rounded-full border border-[#FF8303]/06 pointer-events-none w-[330px] h-[330px] md:w-[420px] md:h-[420px]"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 z-10"
      >
        <span className="text-[#F0E3CA]/40 text-[11px] font-intro3 tracking-[0.4em] uppercase">
          Scroll
        </span>
        <div className="scroll-bounce text-[#FF8303]/50">
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
            <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
            <circle cx="10" cy="8" r="2.5" fill="currentColor" className="animate-bounce" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Intro;
