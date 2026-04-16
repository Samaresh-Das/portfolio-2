import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../utils/firebase";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isDesktop;
};

// Single project card (vertical layout, used in mobile + inside h-scroll)
const ProjectCard = ({ project, index }) => {
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    el.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
  };

  const handleMouseLeave = () => {
    if (imgRef.current) imgRef.current.style.transform = "translate(0,0) scale(1)";
  };

  return (
    <div
      className="group relative flex flex-col items-start gap-6 w-full p-5 bg-[#1A1917] border border-[#F0E3CA]/10 rounded-2xl mb-8 hover:border-[#FF8303]/30 transition-all duration-300"
      style={{ boxShadow: "0 0 40px rgba(255,131,3,0.02)" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Index number */}
      <span className="hidden absolute -left-10 top-10 text-[#FF8303]/20 font-intro1 text-[40px] leading-none select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* IMAGE */}
      <div className="w-full overflow-hidden rounded-xl flex-shrink-0 relative">
        <div
          ref={imgRef}
          style={{ transition: "transform 0.2s ease" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917]/60 via-transparent to-transparent z-10 pointer-events-none" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[220px] object-cover rounded-xl group-hover:brightness-105 transition-all duration-500"
            loading="lazy"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 text-left">
        {/* Tags */}
        {project.tags && (
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-0.5 rounded-full border border-[#FF8303]/30 text-[#FF8303]/70 font-intro3"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-[#F0E3CA] text-[20px] md:text-[22px] font-intro2 group-hover:text-[#FF8303] transition-colors duration-200 mb-2">
          {project.title}
        </h3>

        <p className="text-[#F0E3CA]/60 text-[15px] font-intro3 leading-relaxed">
          {project.description}
        </p>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-5">
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden px-5 py-2.5 rounded-full bg-[#FF8303] text-black font-intro2 text-[13px] tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ boxShadow: "0 0 0 rgba(255,131,3,0)" }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-500 bg-white/15 skew-x-12" />
              Live ↗
            </motion.a>
          )}
          {project.code && (
            <motion.a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full border border-[#F0E3CA]/25 text-[#F0E3CA]/70 font-intro3 text-[13px] hover:border-[#FF8303]/50 hover:text-[#FF8303] transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Code
            </motion.a>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Desktop Horizontal Scroll ───────────────────────────────────────────────
const HorizontalScrollCards = ({ projects }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current || projects.length === 0) return;

    const ctx = gsap.context(() => {
      const totalWidth = trackRef.current.scrollWidth - window.innerWidth;

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <div ref={containerRef} className="h-screen overflow-hidden relative hidden md:block">
      {/* Track */}
      <div
        ref={trackRef}
        className="flex items-center h-full gap-0"
        style={{ width: `${projects.length * 100}vw` }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id || index}
            className="w-screen h-full flex items-center px-16 lg:px-24"
          >
            <div className="max-w-6xl mx-auto w-full">
              <div className="grid grid-cols-2 gap-16 items-center">
                {/* Text side — alternates */}
                <div className={index % 2 === 0 ? "order-1" : "order-2"}>
                  <span className="text-[#FF8303]/30 font-intro1 text-[80px] leading-none select-none block mb-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {project.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2.5 py-0.5 rounded-full border border-[#FF8303]/30 text-[#FF8303]/70 font-intro3"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3 className="text-[#F0E3CA] font-intro2 text-[32px] leading-tight mb-4">
                    {project.title}
                  </h3>

                  <p className="text-[#F0E3CA]/60 font-intro3 text-[16px] leading-relaxed mb-7 max-w-md">
                    {project.description}
                  </p>

                  <div className="flex gap-4">
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative overflow-hidden px-6 py-3 rounded-full bg-[#FF8303] text-black font-intro2 text-[14px]"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(255,131,3,0.5)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-500 bg-white/15 skew-x-12" />
                        Live ↗
                      </motion.a>
                    )}
                    {project.code && (
                      <motion.a
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full border border-[#F0E3CA]/25 text-[#F0E3CA]/70 font-intro3 text-[14px] hover:border-[#FF8303]/50 hover:text-[#FF8303] transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        Code
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Image side */}
                <div className={`${index % 2 === 0 ? "order-2" : "order-1"} relative group`}>
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#FF8303]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="relative w-full h-[380px] object-cover rounded-2xl border border-[#F0E3CA]/8 group-hover:border-[#FF8303]/30 transition-colors duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll progress dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {projects.map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#F0E3CA]/30" />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 text-[#F0E3CA]/30">
        <span className="text-[11px] font-intro3 tracking-widest uppercase [writing-mode:vertical-rl]">
          Scroll to explore
        </span>
        <span className="text-lg">→</span>
      </div>
    </div>
  );
};

// ── Mobile vertical list ────────────────────────────────────────────────────
const VerticalCards = ({ projects }) => (
  <div className="max-w-4xl mx-auto px-6 pb-28">
    {projects.map((project, index) => (
      <motion.div
        key={project.id || index}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProjectCard project={project} index={index} />
      </motion.div>
    ))}
  </div>
);

// ── Main Export ─────────────────────────────────────────────────────────────
const Cards = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const db = getDatabase(app);
    const projectRef = ref(db, "projects/");
    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
      const values = data
        ? Object.values(data).filter((p) => p && p.title)
        : [];
      setProjects(values);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <p className="text-center text-[#F0E3CA]/50 font-intro3 py-20">
        Loading projects...
      </p>
    );
  }

  if (projects.length === 0) {
    return (
      <p className="text-center text-[#F0E3CA]/40 font-intro3 py-20">
        No projects found.
      </p>
    );
  }

  return isDesktop ? (
    <HorizontalScrollCards projects={projects} />
  ) : (
    <VerticalCards projects={projects} />
  );
};

export default Cards;
