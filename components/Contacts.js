import React, { Fragment } from "react";
import socials from "../data/SocialLinks";

const Contacts = () => {
  const socialCards = socials.map((sc) => (
    <div
      className="flex flex-row h-[60px] w-[285px] bg-[#1b1a17] rounded-lg md:mb-[20px]"
      key={sc.id}
    >
      <img
        src={sc.logo}
        alt={sc.text}
        className="h-[50px] w-[50px] my-auto mx-6"
      />
      {/* <div className="image">
      </div> */}
      <div className="title">
        <a
          href={sc.text === "Email" ? `mailto:${sc.data}` : sc.data}
          target="_blank"
        >
          <p className="text-center text-[#F0E3CA] text-[16px] mx-5 my-3">
            {sc.text}
          </p>
        </a>
      </div>
    </div>
  ));

  return (
    <Fragment>
      <div id="contacts">
        <h1 className="text-[#FF8303] font-intro2 text-[40px] text-center mb-[32px] md:text-left">
          Contact Me
        </h1>
        <div className="flex flex-col mx-auto md:flex-none md:mx-0 w-[285px] md:w-full space-y-4 md:space-y-0  md:grid md:grid-cols-2">
          {socialCards}
        </div>
      </div>
    </Fragment>
  );
};

export default Contacts;
