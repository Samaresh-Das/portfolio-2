import React, { Fragment } from "react";
import skill_data from "../data/SKILL_DATA";

const Skills = () => {
  const cards = skill_data.map((skill) => (
    <div
      className="flex flex-row md:flex-col h-[60px] md:h-[300px] w-[285px] md:min-w-[150px] bg-[#21201D] rounded-lg mx-auto md:my-4 md:mx-4 transition ease-in-out delay-150 hover:scale-110 duration-300"
      key={skill.id}
    >
      <img
        src={skill.logo}
        alt={skill.text}
        className="h-[50px] w-[50px] md:h-[100px] md:min-w-[100px] my-auto mx-6 md:mx-auto"
      />
      {/* <div className="image">
      </div> */}
      <div className="title">
        <p className="text-center text-[#F0E3CA] text-[24px] mx-5 my-3">
          {skill.text}
        </p>
      </div>
    </div>
  ));

  return (
    <Fragment>
      <div className="py-[64px]" id="skills">
        <h1 className="text-[#FF8303] font-intro2 text-[40px] text-center mb-[32px]">
          My Skills
        </h1>
        <div className="flex flex-col  md:flex-row md:flex-wrap  md:justify-evenly md:mx-[50px]  space-y-4 md:space-x-4 ">
          {cards}
        </div>
      </div>
    </Fragment>
  );
};

export default Skills;
