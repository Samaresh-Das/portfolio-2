import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import socials from "../data/SocialLinks";
import SectionLabel from "./SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading word-by-word reveal
      gsap.fromTo(
        ".contact-heading-word",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      // Contact rows stagger
      gsap.fromTo(
        rowsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rowsRef.current[0],
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !rowsRef.current.includes(el)) {
      rowsRef.current.push(el);
    }
  };

  const headingWords = "Let's build something meaningful".split(" ");

  return (
    <section
      ref={sectionRef}
      id="contacts"
      className="py-28 md:py-40 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Decorative bg text */}
      <span
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-intro1 text-[#F0E3CA] select-none pointer-events-none whitespace-nowrap"
        style={{ fontSize: "clamp(60px, 14vw, 180px)", opacity: 0.022, lineHeight: 1 }}
        aria-hidden="true"
      >
        CONTACT
      </span>

      {/* Gradient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,131,3,0.08) 0%, transparent 70%)" }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <SectionLabel number="05" label="Contact" />

        {/* HEADING with word-by-word reveal */}
        <div ref={headingRef} className="overflow-hidden mb-8">
          <h2 className="text-[#FF8303] font-intro2 text-[36px] md:text-[52px] leading-tight">
            {headingWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-3">
                <span className="contact-heading-word inline-block opacity-0">
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-[#F0E3CA]/60 text-[17px] md:text-[19px] font-intro3 max-w-2xl mx-auto leading-relaxed mb-16"
        >
          If you have an idea, a project, or an opportunity you'd like to discuss,
          feel free to reach out. I'm always open to meaningful conversations
          and interesting work.
        </motion.p>

        {/* Contact rows */}
        <div className="space-y-0">
          {socials.map((sc) => (
            <a
              key={sc.id}
              ref={addToRefs}
              href={sc.text === "Email" ? `mailto:${sc.data}` : sc.data}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-6 border-b border-[#F0E3CA]/12 hover:border-[#FF8303]/40 transition-colors duration-300 opacity-0"
            >
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-xl bg-[#21201D] border border-[#F0E3CA]/10 flex items-center justify-center group-hover:border-[#FF8303]/40 transition-colors duration-300">
                  <img src={sc.logo} alt={sc.text} className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-left">
                  <p className="text-[#F0E3CA]/40 text-[11px] font-intro3 uppercase tracking-widest mb-0.5">
                    {sc.text}
                  </p>
                  <p className="text-[#F0E3CA] text-[16px] font-intro3 group-hover:text-[#FF8303] transition-colors duration-200">
                    {sc.data}
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <motion.span
                className="text-[#FF8303]/40 text-xl group-hover:text-[#FF8303] transition-all duration-200"
                whileHover={{ x: 4 }}
              >
                ↗
              </motion.span>
            </a>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="mt-20 h-[1px] bg-gradient-to-r from-transparent via-[#FF8303]/40 to-transparent origin-center"
        />
      </div>
    </section>
  );
};

export default Contact;
