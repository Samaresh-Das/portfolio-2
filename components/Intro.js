import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Magnet from "./Magnet";

const Intro = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax speeds for each text element
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const ySubtitle = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yBottom = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yVideo = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scaleVideo = useTransform(scrollYProgress, [0, 0.8], [1, 1.15]);

  // Stagger entrance variants
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: "#0a0a09" }}
    >
      {/* ── VIDEO BACKGROUND (full-bleed) ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: yVideo, scale: scaleVideo }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.5)" }}
        >
          <source
            src="https://sam-portfolio-679.s3.ap-south-1.amazonaws.com/Portfolio+video.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradient overlays for depth and text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a09] via-transparent to-[#0a0a09]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a09]/60 via-transparent to-[#0a0a09]/30" />

        {/* Warm accent glow behind subject */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 70% at 50% 50%, rgba(255,131,3,0.12) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* ── HERO CONTENT OVERLAY ── */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-16 lg:px-24 py-8">

        {/* ── TOP SECTION: Small label ── */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex items-center gap-3 pt-16 md:pt-20"
        >
          <span className="w-10 h-[1px] bg-[#FF8303]" />
          <span className="text-[#FF8303] text-[12px] md:text-[13px] font-intro3 tracking-[0.4em] uppercase">
            Hey, I'm a
          </span>
        </motion.div>

        {/* ── MIDDLE: Big bold overlaid text ── */}
        <div className="flex-1 flex flex-col md:flex-row items-end md:items-center justify-center md:justify-between gap-6 md:gap-12 relative">

          {/* Left — Massive title text */}
          <motion.div style={{ y: yTitle }} className="flex-shrink-0">
            <motion.h1
              {...fadeUp(0.5)}
              className="text-[#F0E3CA] font-intro1 leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(52px, 12vw, 160px)" }}
            >
              Full Stack
              <br />
              <span className="text-transparent [-webkit-text-stroke:1.5px_#FF8303] md:[-webkit-text-stroke:2px_#FF8303]">
                Developer
              </span>
            </motion.h1>
          </motion.div>

          {/* Right — Secondary text block */}
          <motion.div
            style={{ y: yRight }}
            className="max-w-[360px] text-left md:text-right flex-shrink-0"
          >
            <motion.h2
              {...fadeUp(0.7)}
              className="text-[#F0E3CA] font-intro2 text-[22px] md:text-[30px] lg:text-[36px] leading-tight mb-4"
            >
              Great code should
              <br />
              feel{" "}
              <span className="text-[#FF8303]">invisible.</span>
            </motion.h2>
            <motion.p
              {...fadeUp(0.9)}
              className="text-[#F0E3CA]/85 font-intro3 text-[14px] md:text-[16px] leading-relaxed"
            >
              From concept to deploy, I build apps that
              <br className="hidden md:block" /> connect and convert.
            </motion.p>
          </motion.div>
        </div>

        {/* ── BOTTOM BAR: Stats + CTA ── */}
        <motion.div
          style={{ y: yBottom }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-4 md:pb-8"
        >
          {/* Stats row */}
          <motion.div
            {...fadeUp(1.1)}
            className="flex gap-8 md:gap-16"
          >
            {[
              { num: "#01", label: "Web Development" },
              { num: "#02", label: "Product Design" },
              { num: "#03", label: "Scalable Systems" },
              { num: "#04", label: "Startup Building" },
            ].map((stat) => (
              <div key={stat.num} className="hidden md:block">
                <span className="text-[#FF8303] font-intro1 text-[14px] block mb-1">
                  {stat.num}
                </span>
                <span className="text-[#F0E3CA]/70 font-intro3 text-[12px] md:text-[13px] leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
            {/* Mobile: show only first 2 */}
            {[
              { num: "#01", label: "Web Dev" },
              { num: "#02", label: "Product Design" },
            ].map((stat) => (
              <div key={stat.num + "-m"} className="block md:hidden">
                <span className="text-[#FF8303] font-intro1 text-[13px] block mb-1">
                  {stat.num}
                </span>
                <span className="text-[#F0E3CA]/70 font-intro3 text-[11px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...fadeUp(1.3)}
            className="flex gap-4"
          >
            <Magnet>
              <motion.a
                href="#projects"
                className="relative overflow-hidden px-7 py-3.5 md:px-9 md:py-4 rounded-full bg-[#FF8303] text-[#0a0a09] font-intro2 text-[14px] md:text-[15px] tracking-wide inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
                View my work
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </motion.a>
            </Magnet>
            <Magnet>
              <motion.a
                href="#contacts"
                className="px-7 py-3.5 md:px-9 md:py-4 rounded-full border border-[#F0E3CA]/30 text-[#F0E3CA] font-intro3 text-[14px] md:text-[15px] tracking-wide hover:border-[#FF8303] hover:text-[#FF8303] transition-colors inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in touch
              </motion.a>
            </Magnet>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-[#FF8303] to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Intro;
