import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import Name from "./Name";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contacts" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const headerRef = useRef(null);

  // Mount animation — slide down from above
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  // Hide on scroll down / reveal on scroll up
  useEffect(() => {
    let lastY = 0;
    const trigger = ScrollTrigger.create({
      start: "top -80px",
      onUpdate: (self) => {
        const currentY = self.scroll();
        if (currentY > lastY && currentY > 120) {
          // Scrolling down
          gsap.to(headerRef.current, {
            y: -90,
            duration: 0.4,
            ease: "power2.inOut",
          });
        } else {
          // Scrolling up
          gsap.to(headerRef.current, {
            y: 0,
            duration: 0.4,
            ease: "power2.inOut",
          });
        }
        lastY = currentY;
      },
    });
    return () => trigger.kill();
  }, []);

  // Active section detection
  useEffect(() => {
    const sections = links.map(({ href }) =>
      document.querySelector(href)
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection("#" + entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 w-full">
        <div className="glass border-b border-[#F0E3CA]/10">
          <div className="max-w-6xl mx-auto px-6 md:px-12 h-[68px] flex items-center justify-between">

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Name />
            </motion.div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-10 text-[14px] font-intro3">
              {links.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`relative py-1 transition-colors duration-200 ${
                      isActive ? "text-[#FF8303]" : "text-[#F0E3CA]/70 hover:text-[#F0E3CA]"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[1px] bg-[#FF8303] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-[#F0E3CA] text-2xl p-2"
              onClick={() => setOpen(!open)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  {open ? <RxCross1 /> : <FiMenu />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            {/* Menu panel */}
            <motion.div
              className="glass fixed top-[68px] left-4 right-4 z-50 rounded-2xl overflow-hidden border border-[#F0E3CA]/10"
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="p-6 space-y-1">
                {links.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-[18px] font-intro3 transition-colors ${
                      activeSection === link.href
                        ? "text-[#FF8303] bg-[#FF8303]/8"
                        : "text-[#F0E3CA]/80 hover:text-[#FF8303] hover:bg-[#FF8303]/5"
                    }`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <span className="text-[#FF8303]/50 text-sm mr-2">
                      0{i + 1}.
                    </span>
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-[68px]" />
    </>
  );
};

export default Navbar;
