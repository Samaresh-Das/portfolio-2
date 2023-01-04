import React, { Fragment } from "react";

const AboutMe = () => {
  return (
    <Fragment>
      <div className="about" id="about">
        <h1 className="text-[#FF8303] font-intro2 text-[40px] text-center hidden md:block">
          About Me
        </h1>
        <div className=" flex flex-col md:flex-row md:mx-auto md:px-56">
          <div>
            <img
              src="./Assets/Logo.png"
              alt="Logo"
              className="w-[100px] md:w-[200px] mx-auto mt-[64px] mb-[32px]"
            />
          </div>
          <h1 className="text-[#FF8303] font-intro2 text-[40px] text-center md:hidden">
            About Me
          </h1>
          <div className="p-[64px]">
            <p className="text-[#F0E3CA] text-[24px] font-intro3 text-center">
              I am a full-stack developer experienced working in both front-end
              and back-end as well as DevOps. MERN stack is my main. Passionate
              in web development. Like to build projects{" "}
              {"{I am a project nerd :) }"}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutMe;
