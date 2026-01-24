import React from "react";
import Button from "./Button";

const ProjectCards = ({ project }) => {
    return (
        <div
            className="
        relative bg-[#21201D]
        border border-[#F0E3CA]/30
        rounded-xl overflow-hidden
        transition
        hover:border-[#FF8303]
      "
        >
            {/* Image */}
            <div className="relative">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[220px] object-cover opacity-90"
                />

                {/* Hover overlay */}
                <div
                    className="
            absolute inset-0
            bg-black/50
            opacity-0
            hover:opacity-100
            transition
            flex items-center justify-center gap-4
          "
                >
                    {project.live && <Button path={project.live} text="Live" />}
                    {project.code && <Button path={project.code} text="Code" />}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-[#F0E3CA] text-[22px] font-bold">
                    {project.title}
                </h3>

                <p className="text-[#F0E3CA]/80 text-[16px] mt-3 leading-relaxed">
                    {project.description}
                </p>
            </div>
        </div>
    );
};

export default ProjectCards;
