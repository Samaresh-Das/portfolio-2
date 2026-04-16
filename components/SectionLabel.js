import React from "react";

/**
 * SectionLabel — numbered section identifier
 * Usage: <SectionLabel number="01" label="About" />
 */
const SectionLabel = ({ number, label }) => {
  return (
    <div className="flex items-center gap-3 mb-4 opacity-50">
      <span
        className="text-[#FF8303] text-[12px] font-intro1 tracking-[0.25em]"
        aria-hidden="true"
      >
        {number} —
      </span>
      <span className="text-[#F0E3CA] text-[11px] font-intro3 tracking-[0.3em] uppercase">
        {label}
      </span>
    </div>
  );
};

export default SectionLabel;
