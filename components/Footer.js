// import React, { Fragment } from "react";
// import Contacts from "./Contacts";
// import Name from "./Name";

// const Footer = () => {
//   return (
//     <Fragment>
//       <div className="md:grid md:grid-cols-2 md:mt-[100px] md:mb-[50px] md:mx-auto">
//         <div className="text-center py-[64px] mx-[55px] md:ml-[200px] md:py-0">
//           <Name />
//           <h3 className="text-[#F0E3CA] text-[24px] font-intro3 text-center mt-[30px]">
//             If you liked my work and skills and you need me, feel free to reach
//             me. I&apos;m ready to talk to you.
//           </h3>
//         </div>
//         <Contacts />
//       </div>
//     </Fragment>
//   );
// };

// export default Footer;


import React from "react";
import Name from "./Name";

const Footer = () => {
  return (
    <footer className="mt-32 px-6 md:px-24 pb-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#F0E3CA]/20 pt-8">

        {/* Identity */}
        <div className="opacity-80">
          <Name />
        </div>

        {/* Meta */}
        <p className="text-[#F0E3CA]/60 text-[14px] font-intro3 text-center">
          © {new Date().getFullYear()} Samaresh Das. Built with care.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
