import React, { Fragment } from "react";

const Intro = () => {
  return (
    <Fragment>
      <div className="py-128px px-68px intro flex flex-col md:flex-row">
        <div className="md:px-10 md:my-auto">
          <h1 className="text-[#FF8303] font-intro1 text-[40px] text-center">
            Samaresh Das
          </h1>
          <h2 className="text-[#F0E3CA] text-[32px] font-intro2 text-center py-5">
            Frontend Developer
          </h2>
          <p className="text-[#F0E3CA] text-[24px] font-intro3 text-center">
            Hi there, Samaresh here, welcome to my portfolio. Glad you landed
            here. I aim to innovate web and software for the world. Below you
            can see some of my projects and more about me. Thanks.
          </p>
        </div>
        <div className="photo pt-[60px] relative md:w-[200rem] md:pt-0 ">
          <img
            src="./Assets/intro-text.png"
            alt="background code"
            className="md:h-[35rem]"
          />
          <div className="absolute inset-8 pt-[90px]">
            <img
              src="./Assets/dp.jpg"
              alt="Profile Photo"
              className="h-[220px] md:h-[250px] border-[#FF8303] object-cover  border-x-4 rounded-full mx-auto"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Intro;
