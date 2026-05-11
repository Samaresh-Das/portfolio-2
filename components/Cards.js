import { useEffect, useRef, useState, useCallback } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../utils/firebase";
import { motion, AnimatePresence } from "framer-motion";
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

// ── Animated Tech Stack Pill ────────────────────────────────────────────────
const TechPill = ({ label, index }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.7, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{
      duration: 0.4,
      delay: index * 0.07,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="tech-pill text-[11px] px-3 py-1 rounded-full border border-[#FF8303]/30 text-[#FF8303]/80 font-intro3 tracking-wide relative overflow-hidden"
    style={{ animationDelay: `${index * 0.3}s` }}
  >
    <span className="relative z-10">{label}</span>
  </motion.span>
);

// ── Video Preview (replaces image) ──────────────────────────────────────────
const VideoPreview = ({ src, title, className = "" }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure autoplay works
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [src]);

  if (!src) return null;

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      autoPlay
      loop
      playsInline
      preload="metadata"
      className={`w-full object-cover ${className}`}
      aria-label={`${title} demo`}
    />
  );
};

// ── Project Modal ───────────────────────────────────────────────────────────
const ProjectModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      if (window.lenis) window.lenis.stop();
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (window.lenis) window.lenis.start();
    };
  }, [isOpen, onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) onClose();
  };

  if (!project) return null;

  const techStack = project.techStack || project.tags || [];
  const images = project.images || (project.image ? [project.image] : []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="fixed inset-0 z-[9998] flex items-start justify-center overflow-y-auto py-8 px-4 md:py-12"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
          data-lenis-prevent
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl bg-[#1A1917] border border-[#F0E3CA]/10 rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 0 80px rgba(255,131,3,0.08)" }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-[#F0E3CA]/15 text-[#F0E3CA]/70 hover:text-[#FF8303] hover:border-[#FF8303]/50 transition-all duration-200 flex items-center justify-center text-lg font-intro2"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Video */}
            {project.video && (
              <div className="w-full aspect-video bg-black/50 relative overflow-hidden">
                <video
                  src={project.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917] via-transparent to-transparent pointer-events-none" style={{ height: "30%", top: "auto" }} />
              </div>
            )}

            {/* Content */}
            <div className="p-6 md:p-10">
              {/* Title */}
              <h3 className="text-[#F0E3CA] font-intro1 text-[28px] md:text-[34px] leading-tight mb-6">
                {project.title}
              </h3>

              {/* Images Gallery */}
              {images.length > 0 && (
                <div className="mb-8">
                  <div
                    className={`grid gap-3 ${
                      images.length === 1
                        ? "grid-cols-1"
                        : images.length === 2
                        ? "grid-cols-2"
                        : images.length === 3
                        ? "grid-cols-3"
                        : "grid-cols-2"
                    }`}
                  >
                    {images.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.1 }}
                        className="relative group/img overflow-hidden rounded-xl border border-[#F0E3CA]/8 hover:border-[#FF8303]/30 transition-colors duration-300"
                      >
                        <img
                          src={img}
                          alt={`${project.title} screenshot ${i + 1}`}
                          className="w-full h-[180px] md:h-[220px] object-cover group-hover/img:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rich Description */}
              {project.richDescription && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="rich-description text-[#F0E3CA]/70 font-intro3 text-[14px] md:text-[15px] leading-relaxed mb-8"
                  dangerouslySetInnerHTML={{ __html: project.richDescription }}
                />
              )}

              {/* Tech Stack Pills */}
              {techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {techStack.map((tech, i) => (
                    <TechPill key={tech} label={tech} index={i} />
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-[#F0E3CA]/8">
                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#FF8303] text-black font-intro2 text-[14px] overflow-hidden"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 32px rgba(255,131,3,0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    <span className="relative z-10">Live ↗</span>
                  </motion.a>
                )}
                {project.code && (
                  <motion.a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3 rounded-full border border-[#F0E3CA]/25 text-[#F0E3CA]/70 font-intro3 text-[14px] hover:border-[#FF8303]/50 hover:text-[#FF8303] transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Code
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ── Single project card (mobile + inside h-scroll) ──────────────────────────
const ProjectCard = ({ project, index, onOpen }) => {
  const cardRef = useRef(null);
  const techStack = project.techStack || project.tags || [];

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "translate(0,0)";
  };

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col items-start gap-6 w-full p-5 bg-[#1A1917] border border-[#F0E3CA]/10 rounded-2xl mb-8 hover:border-[#FF8303]/30 transition-all duration-300 cursor-pointer"
      style={{ boxShadow: "0 0 40px rgba(255,131,3,0.02)", transition: "transform 0.2s ease, border-color 0.3s" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(project)}
    >
      {/* VIDEO */}
      <div className="w-full overflow-hidden rounded-xl flex-shrink-0 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917]/60 via-transparent to-transparent z-10 pointer-events-none" />
        {project.video ? (
          <VideoPreview
            src={project.video}
            title={project.title}
            className="h-[220px] rounded-xl group-hover:brightness-105 transition-all duration-500"
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[220px] object-cover rounded-xl group-hover:brightness-105 transition-all duration-500"
            loading="lazy"
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1 text-left">
        {/* Tech Stack Pills */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {techStack.map((tech, i) => (
              <TechPill key={tech} label={tech} index={i} />
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
              onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
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
const HorizontalScrollCards = ({ projects, onOpenModal }) => {
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
        {projects.map((project, index) => {
          const techStack = project.techStack || project.tags || [];
          return (
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

                    {/* Tech Stack Pills */}
                    {techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {techStack.map((tech, i) => (
                          <TechPill key={tech} label={tech} index={i} />
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
                          onClick={(e) => e.stopPropagation()}
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
                          onClick={(e) => e.stopPropagation()}
                          className="px-6 py-3 rounded-full border border-[#F0E3CA]/25 text-[#F0E3CA]/70 font-intro3 text-[14px] hover:border-[#FF8303]/50 hover:text-[#FF8303] transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          Code
                        </motion.a>
                      )}
                      {/* View Details button */}
                      <motion.button
                        onClick={() => onOpenModal(project)}
                        className="px-6 py-3 rounded-full border border-[#FF8303]/20 text-[#FF8303]/60 font-intro3 text-[14px] hover:border-[#FF8303]/60 hover:text-[#FF8303] transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Details →
                      </motion.button>
                    </div>
                  </div>

                  {/* Video / Image side */}
                  <div
                    className={`${index % 2 === 0 ? "order-2" : "order-1"} relative group cursor-pointer`}
                    onClick={() => onOpenModal(project)}
                  >
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#FF8303]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
                    {project.video ? (
                      <VideoPreview
                        src={project.video}
                        title={project.title}
                        className="relative h-[380px] rounded-2xl border border-[#F0E3CA]/8 group-hover:border-[#FF8303]/30 transition-colors duration-300"
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="relative w-full h-[380px] object-cover rounded-2xl border border-[#F0E3CA]/8 group-hover:border-[#FF8303]/30 transition-colors duration-300"
                      />
                    )}
                    {/* Click hint overlay */}
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                      <span className="text-white/0 group-hover:text-white/90 font-intro2 text-[15px] tracking-wide transition-all duration-300 transform scale-90 group-hover:scale-100">
                        View Project →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
const VerticalCards = ({ projects, onOpenModal }) => (
  <div className="max-w-4xl mx-auto px-6 pb-28">
    {projects.map((project, index) => (
      <motion.div
        key={project.id || index}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProjectCard project={project} index={index} onOpen={onOpenModal} />
      </motion.div>
    ))}
  </div>
);

// ── Main Export ─────────────────────────────────────────────────────────────
const Cards = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const isDesktop = useIsDesktop();

  const handleOpenModal = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

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

  return (
    <>
      {isDesktop ? (
        <HorizontalScrollCards projects={projects} onOpenModal={handleOpenModal} />
      ) : (
        <VerticalCards projects={projects} onOpenModal={handleOpenModal} />
      )}

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Cards;
