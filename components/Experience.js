import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../utils/firebase";
import Button from "./Button";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";

// Per-card tilt effect
const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    el.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.2s ease-out", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

const Experience = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax background text
  const yBgText = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const opacityBgText = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.05, 0]);

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

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-28 md:py-40 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Decorative Parallax Background Text */}
      <motion.div
        style={{ y: yBgText, opacity: opacityBgText }}
        className="absolute left-0 top-1/4 font-intro1 text-[#F0E3CA] select-none pointer-events-none whitespace-nowrap z-0"
      >
        <span style={{ fontSize: "clamp(80px, 16vw, 250px)", lineHeight: 1 }}>
          EXPERIENCE
        </span>
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        <FadeIn y={30} className="flex flex-col items-center mb-24">
          <SectionLabel number="02" label="My Experience" />
          <h2 className="text-[#F0E3CA] font-intro2 text-[42px] md:text-[54px] text-center mt-6">
            My <span className="text-[#FF8303]">Experience</span>
          </h2>
        </FadeIn>

        {/* Timeline container */}
        <div className="relative">
          {/* Timeline vertical line — draws on scroll */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FF8303] via-[#FF8303]/40 to-transparent hidden md:block origin-top"
          />

          <div className="space-y-20 md:space-y-32">
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
                  <motion.div
                    className={`hidden md:block absolute ${isLeft ? "left-[49.1%]" : "right-[49.1%]"} top-10 w-5 h-5 rounded-full bg-[#151412] border-[3px] border-[#FF8303] z-10`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 300 }}
                    style={{ boxShadow: "0 0 16px rgba(255,131,3,0.4)" }}
                  />

                  {/* Card with Parallax Effect */}
                  <motion.div
                    initial={{ opacity: 0, y: 50, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
                    className="md:w-[45%]"
                  >
                    <TiltCard>
                      <div className="bg-[#151412] border border-[#F0E3CA]/10 hover:border-[#FF8303]/30 rounded-3xl p-8 md:p-10 transition-colors duration-500 group shadow-2xl relative overflow-hidden">
                        {/* Subtle glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF8303]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Company name */}
                        <h3 className="text-[#F0E3CA] text-[24px] md:text-[28px] font-intro2 group-hover:text-[#FF8303] transition-colors duration-300 relative z-10">
                          {exp.companyName}
                        </h3>

                        {/* Role + timeline */}
                        <div className="flex flex-wrap items-center gap-3 mt-2 mb-6 relative z-10">
                          <span className="text-[#FF8303] font-intro3 text-[16px] tracking-wide">
                            {exp.jobTitle}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F0E3CA]/20" />
                          <span className="text-[#F0E3CA]/70 text-[14px] font-intro3 tracking-widest uppercase">
                            {exp.timeLine}
                          </span>
                        </div>

                        {/* Responsibilities */}
                        {Array.isArray(exp.responsibility) && (
                          <ul className="space-y-3 relative z-10">
                            {exp.responsibility.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-[#F0E3CA]/90 text-[15px] font-intro3 leading-relaxed"
                              >
                                <span className="text-[#FF8303] mt-1.5 flex-shrink-0 text-[8px]">
                                  ◆
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Skills */}
                        {exp.skills && (
                          <p className="mt-8 text-[14px] text-[#F0E3CA]/80 font-intro3 border-t border-[#F0E3CA]/15 pt-6 relative z-10">
                            <span className="text-[#FF8303] mr-2">Stack —</span>
                            {exp.skills}
                          </p>
                        )}

                        {/* Certificate button */}
                        {exp.certificate && (
                          <div className="mt-8 relative z-10">
                            <Button
                              path={exp.certificate}
                              text="View Certificate"
                              className="text-[14px]"
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
