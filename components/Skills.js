// import React, { Fragment } from "react";
// import skill_data from "../data/SKILL_DATA";

// const Skills = () => {
//   const cards = skill_data.map((skill) => (
//     <div
//       className="flex flex-row md:flex-col h-[60px] md:h-[300px] w-[285px] md:min-w-[150px] bg-[#21201D] rounded-lg mx-auto md:my-4 md:mx-4 transition ease-in-out delay-150 hover:scale-110 duration-300"
//       key={skill.id}
//     >
//       <img
//         src={skill.logo}
//         alt={skill.text}
//         className="h-[50px] w-[50px] md:h-[100px] md:min-w-[100px] my-auto mx-6 md:mx-auto"
//       />
//       {/* <div className="image">
//       </div> */}
//       <div className="title">
//         <p className="text-center text-[#F0E3CA] text-[24px] mx-5 my-3">
//           {skill.text}
//         </p>
//       </div>
//     </div>
//   ));

//   return (
//     <Fragment>
//       <div className="py-[64px]" id="skills">
//         <h1 className="text-[#FF8303] font-intro2 text-[40px] text-center mb-[32px]">
//           My Skills
//         </h1>
//         <div className="flex flex-col  md:flex-row md:flex-wrap  md:justify-evenly md:mx-[50px]  space-y-4 md:space-x-4 ">
//           {cards}
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default Skills;

import React from "react";
import { motion } from "framer-motion";
import skill_data from "../data/SKILL_DATA";

const SKILL_GROUPS = [
  {
    title: "Frontend",
    items: ["React Js", "Next Js", "Javascript", "Typescript", "HTML", "CSS"],
  },
  {
    title: "Backend",
    items: ["Node Js", "Express Js", "MongoDB", "GraphQL"],
  },
  {
    title: "Cloud & Tools",
    items: ["AWS"],
  },
];

const Skills = () => {
  const getSkill = (name) =>
    skill_data.find((skill) => skill.text === name);

  return (
    <section id="skills" className="py-32 px-6 md:px-24">
      <h2 className="text-[#FF8303] font-intro2 text-[40px] text-center mb-20">
        Skills
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">
        {SKILL_GROUPS.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
          >
            {/* Branch title */}
            <h3 className="text-[#F0E3CA] text-[24px] font-intro2 mb-8 relative inline-block">
              {group.title}
              <span className="absolute -bottom-2 left-0 w-12 h-[2px] bg-[#FF8303] opacity-40"></span>
            </h3>

            {/* Skills */}
            <div className="flex flex-wrap gap-5">
              {group.items.map((name) => {
                const skill = getSkill(name);
                if (!skill) return null;

                return (
                  <div
                    key={skill.id}
                    className="
                      flex items-center gap-3
                      px-4 py-2
                      bg-[#21201D]
                      border border-[#F0E3CA]/30
                      rounded-full
                      transition
                      hover:border-[#FF8303]
                    "
                  >
                    <img
                      src={skill.logo}
                      alt={skill.text}
                      className="w-6 h-6 object-contain opacity-70"
                    />
                    <span className="text-[#F0E3CA] text-[16px]">
                      {skill.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* connector hint */}
      <div className="mt-24 flex justify-center">
        <span className="w-1 h-12 bg-[#FF8303] opacity-20 rounded-full"></span>
      </div>
    </section>
  );
};

export default Skills;
