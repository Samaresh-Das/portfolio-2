import React, { Fragment, useRef, useEffect } from "react";
import Button from "./Button";
import experienceData from "../data/ExperiencData";
import { motion, useInView, useAnimation } from "framer-motion";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      //fire transition
      mainControls.start("visible");
    }
  }, [isInView]);

  const experienceCard = experienceData.map((data) => (
    <div
      className=" p-6 md:px-10 bg-[#21201D] border-4 border-[#F0E3CA] rounded-lg experiences w-[285px] md:w-auto mx-auto md:mx-10 my-0 md:relative md:h-[300px]"
      key={data.id}
    >
      <h3 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        {data.companyName}
      </h3>
      <h4 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
        {data.jobTitle} <span className="font-light">({data.timeLine})</span>
      </h4>
      <ul className="m-2 font-normal text-[#fefae0] list-disc list-inside">
        {data.responsibility.map((role, i) => (
          <li key={i}>{role}</li>
        ))}
      </ul>
      {data.skills && (
        <h3 className="m-2 font-bold text-[#fefae0] list-disc list-inside text-[19px]">
          {" "}
          Skills - {data.skills}
        </h3>
      )}
      {data.certificate && (
        <Button
          path={data.certificate}
          text="Certificate"
          className="transition ease-in-out delay-150 hover:scale-110 duration-300"
          classNameDiv="md:absolute md:bottom-[20px] "
        />
      )}
    </div>
  ));
  return (
    <Fragment>
      <div id="experience" ref={ref}>
        <h1 className="text-[#FF8303] font-intro2 text-[40px] text-center mb-[32px]">
          My Experience
        </h1>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-2"
        >
          {/* {experienceCard} */}

          {experienceCard}
        </motion.div>
      </div>
    </Fragment>
  );
};

export default Experience;
