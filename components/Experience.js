import React, { Fragment } from "react";
import Button from "./Button";
import experienceData from "../data/ExperiencData";

const Experience = () => {
  const experienceCard = experienceData.map((data) => (
    <div class=" p-6 md:px-10 bg-[#21201D] border-4 border-[#F0E3CA] rounded-lg experiences w-[285px] md:w-auto mx-auto md:mx-10 my-0">
      <h3 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        {data.companyName}
      </h3>
      <h4 class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
        {data.jobTitle} <span className="font-light">({data.timeLine})</span>
      </h4>
      <ul class="m-2 font-normal text-[#fefae0] list-disc list-inside">
        {data.responsibility.map((role) => (
          <li>{role}</li>
        ))}
      </ul>
      <div className="my-4">
        <Button path={data.certificate} text="Certificate" />
      </div>
    </div>
  ));
  return (
    <Fragment>
      <div id="experience">
        <h1 className="text-[#FF8303] font-intro2 text-[40px] text-center mb-[32px]">
          My Experience
        </h1>
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-2">
          {experienceCard}
        </div>
      </div>
    </Fragment>
  );
};

export default Experience;