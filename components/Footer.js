import React, { Fragment } from "react";
import Contacts from "./Contacts";
import Name from "./Name";

const Footer = () => {
  return (
    <Fragment>
      <div className="md:grid md:grid-cols-2 md:mt-[100px] md:mb-[50px] md:mx-auto">
        <div className="text-center py-[64px] mx-[55px] md:ml-[200px] md:py-0">
          <Name />
          <h3 className="text-[#F0E3CA] text-[24px] font-intro3 text-center mt-[30px]">
            If you liked my work and skills and you need me, feel free to reach
            me. I'm ready to talk to you.
          </h3>
        </div>
        <Contacts />
      </div>
    </Fragment>
  );
};

export default Footer;
