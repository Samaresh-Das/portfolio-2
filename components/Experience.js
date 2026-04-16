import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../utils/firebase";
import Button from "./Button";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";

gsap.registerPlugin(ScrollTrigger);

// Per-card tilt effect
const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.15s ease" }}
    >
      {children}
    </div>
  );
};

const Experience = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const db = getDatabase(app);
    const expRef = ref(db, "experience/");
    onValue(expRef, (snapshot) => {
      const data = snapshot.val();
      const values = data
        ? Object.values(data).filter(
          (item) =>
            item &&
            item.companyName &&
            item.jobTitle &&
            Array.isArray(item.responsibility)
        )
        : [];
      setExperienceData(values);
      setLoading(false);
    });
  }, []);

  // Timeline line draw on scroll
  useEffect(() => {
    if (!lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [loading]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-28 md:py-36 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Decorative background text */}
      <span
        className="absolute left-0 top-1/2 -translate-y-1/2 font-intro1 text-[#F0E3CA] select-none pointer-events-none"
        style={{
          fontSize: "clamp(80px, 16vw, 200px)",
          opacity: 0.022,
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
        aria-hidden="true"
      >
        EXPERIENCE
      </span>

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionLabel number="02" label="My Experience" />
        <h2 className="text-[#FF8303] font-intro2 text-[38px] md:text-[44px] text-center mb-20">
          My Experience
        </h2>

        {/* Timeline container */}
        <div className="relative">
          {/* Timeline vertical line — draws on scroll */}
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FF8303] via-[#FF8303]/60 to-transparent hidden md:block"
            style={{ scaleY: 0, transformOrigin: "top" }}
          />

          <div className="space-y-16 md:space-y-24">
            {loading && (
              <p className="text-center text-[#F0E3CA]/50 font-intro3">
                Loading experience...
              </p>
            )}

            {experienceData.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={exp.id || index}
                  className={`relative md:flex ${isLeft ? "md:justify-start" : "md:justify-end"}`}
                >
                  {/* Timeline node dot */}
                  <motion.span
                    className={`hidden md:block absolute ${isLeft ? "left-[49.2%]" : "right-[49.2%]"} top-7 w-4 h-4 rounded-full bg-[#FF8303] z-10`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 300 }}
                    style={{ boxShadow: "0 0 12px rgba(255,131,3,0.6)" }}
                  />

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="md:w-[47%]"
                  >
                    <TiltCard>
                      <div className="bg-[#21201D] border border-[#F0E3CA]/10 hover:border-[#FF8303]/40 rounded-2xl p-7 md:p-8 transition-colors duration-300 group">
                        {/* Company name */}
                        <h3 className="text-[#F0E3CA] text-[22px] font-intro2 group-hover:text-[#FF8303] transition-colors duration-200">
                          {exp.companyName}
                        </h3>

                        {/* Role + timeline */}
                        <div className="flex flex-wrap items-center gap-2 mt-1.5 mb-5">
                          <span className="text-[#FF8303] font-intro3 text-[15px]">
                            {exp.jobTitle}
                          </span>
                          <span className="text-[#F0E3CA]/40 text-[13px] font-intro3">
                            · {exp.timeLine}
                          </span>
                        </div>

                        {/* Responsibilities */}
                        {Array.isArray(exp.responsibility) && (
                          <ul className="space-y-2">
                            {exp.responsibility.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2.5 text-[#F0E3CA]/70 text-[14px] font-intro3 leading-relaxed"
                              >
                                <span className="text-[#FF8303] mt-1 flex-shrink-0 text-[10px]">
                                  ▶
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Skills */}
                        {exp.skills && (
                          <p className="mt-4 text-[13px] text-[#F0E3CA]/50 font-intro3 border-t border-[#F0E3CA]/8 pt-4">
                            <span className="text-[#FF8303]">Stack —</span>{" "}
                            {exp.skills}
                          </p>
                        )}

                        {/* Certificate button */}
                        {exp.certificate && (
                          <div className="mt-5">
                            <Button
                              path={exp.certificate}
                              text="View Certificate"
                              className="text-[13px]"
                            />
                          </div>
                        )}
                      </div>
                    </TiltCard>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
