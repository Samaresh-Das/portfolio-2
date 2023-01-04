import React, { Fragment } from "react";
import Cards from "./Cards";

const Projects = () => {
  return (
    <Fragment>
      <div className="py-[64px]" id="projects">
        <h1 className="text-[#FF8303] font-intro2 text-[40px] text-center mb-[32px]">
          My Works
        </h1>
        <div className="space-y-4 md:mx-auto md:space-y-0 md:grid md:grid-cols-2 md:gap-x-4   md:gap-y-4">
          <Cards />
        </div>
      </div>
    </Fragment>
  );
};

export default Projects;
