import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wpProjectData } from "../data/projectData";

// ─── Image Slider ───────────────────────────────────────────────────────────
const ImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const autoRef = useRef(null);
  const isSingle = images.length === 1;

  const next = useCallback(() => {
    if (!isSingle) setCurrent((p) => (p + 1) % images.length);
  }, [images.length, isSingle]);

  const prev = useCallback(() => {
    if (!isSingle) setCurrent((p) => (p - 1 + images.length) % images.length);
  }, [images.length, isSingle]);

  useEffect(() => {
    if (isSingle) return;
    autoRef.current = setInterval(next, 3500);
    return () => clearInterval(autoRef.current);
  }, [next, isSingle]);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 3500);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStartX(e.type === "touchstart" ? e.touches[0].clientX : e.clientX);
  };
  const handleDragEnd = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const endX = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX - endX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); resetAuto(); }
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-t-2xl select-none"
      style={{ height: "280px" }}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`slide-${current}`}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917]/80 via-transparent to-transparent pointer-events-none" />

      {/* Arrows */}
      {!isSingle && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); resetAuto(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm flex items-center justify-center hover:bg-[#FF8303]/80 transition-all duration-200 z-10"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); resetAuto(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm flex items-center justify-center hover:bg-[#FF8303]/80 transition-all duration-200 z-10"
            aria-label="Next"
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {!isSingle && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); resetAuto(); }}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === current ? "w-5 h-1.5 bg-[#FF8303]" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {!isSingle && (
        <span className="absolute top-2 right-2 text-[11px] text-white/70 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full z-10">
          {current + 1} / {images.length}
        </span>
      )}
    </div>
  );
};

// ─── Tag Pill ────────────────────────────────────────────────────────────────
const Tag = ({ label }) => (
  <span className="text-[11px] px-2.5 py-0.5 rounded-full border border-[#FF8303]/35 text-[#FF8303]/75 font-intro3 tracking-wide">
    {label}
  </span>
);

// ─── WP Card ─────────────────────────────────────────────────────────────────
const WPCard = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#1A1917] border border-[#F0E3CA]/10 hover:border-[#FF8303]/35 transition-all duration-400"
      style={{ "--hover-shadow": "0 0 40px rgba(255,131,3,0.1)" }}
      whileHover={{ y: -4 }}
    >
      {/* Image slider */}
      <ImageSlider images={project.images} />

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Year + case study badge */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#FF8303]/60 tracking-widest uppercase font-intro2">
            {project.year}
          </span>
          {project.stats && (
            <span className="text-[10px] text-[#F0E3CA]/35 italic font-intro3 border border-[#F0E3CA]/15 px-2 py-0.5 rounded-full">
              Case Study
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-[#F0E3CA] text-[17px] font-intro2 leading-snug group-hover:text-[#FF8303] transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[#F0E3CA]/55 text-[13.5px] font-intro3 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.map((tag) => <Tag key={tag} label={tag} />)}
        </div>

        {/* Stats grid */}
        {project.stats && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {project.stats.map((s) => (
              <div
                key={s.label}
                className="bg-[#FF8303]/5 border border-[#FF8303]/12 rounded-xl px-3 py-2"
              >
                <p className="text-[#FF8303] font-intro1 text-[15px]">{s.value}</p>
                <p className="text-[#F0E3CA]/45 text-[10px] font-intro3 leading-tight mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Expandable highlights */}
        <div className="mt-auto pt-2">
          <button
            onClick={() => setExpanded((p) => !p)}
            className="text-[12px] text-[#FF8303]/65 hover:text-[#FF8303] transition-colors flex items-center gap-1.5 font-intro3"
          >
            <motion.span
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              ▶
            </motion.span>
            {expanded ? "Hide" : "Show"} highlights
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden mt-3 space-y-2"
              >
                {project.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-start gap-2 text-[12.5px] text-[#F0E3CA]/55 font-intro3 leading-relaxed"
                  >
                    <span className="text-[#FF8303] mt-0.5 flex-shrink-0">—</span>
                    {h}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Key takeaway */}
        <p className="text-[11px] text-[#F0E3CA]/35 italic border-t border-[#F0E3CA]/8 pt-3 mt-1 font-intro3 leading-relaxed">
          "{project.keyTakeaway}"
        </p>

        {/* Visit site */}
        {project.live && (
          <div className="mt-3">
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF8303] text-black text-[13px] font-intro2 overflow-hidden"
              whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(255,131,3,0.45)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              <span className="relative z-10">Visit site ↗</span>
            </motion.a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── WPCards Grid ─────────────────────────────────────────────────────────────
const WPCards = () => (
  <div className="max-w-6xl mx-auto">
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-[#F0E3CA]/45 text-center text-[14px] font-intro3 mb-12 max-w-xl mx-auto leading-relaxed"
    >
      WordPress projects built with constraint-aware engineering — pushing the
      platform's limits while keeping content fully manageable.
    </motion.p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wpProjectData.map((project, index) => (
        <WPCard key={project.id} project={project} index={index} />
      ))}
    </div>
  </div>
);

export default WPCards;