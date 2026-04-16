import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Name from "./Name";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const borderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        borderRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: borderRef.current,
            start: "top 95%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className="px-6 md:px-12 pb-10 pt-0">
      {/* Animated top border */}
      <div
        ref={borderRef}
        className="h-[1px] bg-gradient-to-r from-[#FF8303]/50 via-[#F0E3CA]/20 to-transparent mb-8"
        style={{ transformOrigin: "left" }}
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="opacity-80 hover:opacity-100 transition-opacity"
        >
          <Name />
        </motion.div>

        {/* Center — tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#F0E3CA]/30 text-[13px] font-intro3 text-center"
        >
          Crafting the web, one commit at a time.
        </motion.p>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#F0E3CA]/30 text-[12px] font-intro3"
        >
          © {new Date().getFullYear()} Samaresh Das
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
