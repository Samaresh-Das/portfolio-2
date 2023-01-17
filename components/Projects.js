import Link from "next/link";
import React, { Fragment } from "react";
import {ImArrowUpRight2} from 'react-icons/im'
import Cards from "./Cards";

const Projects = () => {
  return (
    <Fragment>
      <div className="pt-[64px] pb-[30px]" id="projects">
        <h1 className="text-[#FF8303] font-intro2 text-[40px] text-center mb-[32px]">
          My Works
        </h1>
        <div className="space-y-4 md:mx-auto md:space-y-0 md:grid md:grid-cols-2 md:gap-x-4   md:gap-y-4">
          <Cards />
        </div>
          <h3 className="text-[#fefae0] text-center mt-[50px] text-[19px]">I have many projects, these are only the best ones. To see all of them click <Link target='_blank' href="https://sam-all-projects.netlify.app/ " className="font-bold">here<ImArrowUpRight2 className="inline ml-1" /></Link> </h3>
      </div>
    </Fragment>
  );
};

export default Projects;
