// import React, { Fragment, useEffect, useState } from "react";
// import { TypeAnimation } from "react-type-animation";

// const Intro = () => {
//   const [dynamicClassLeft, setDynamicClassLeft] = useState(
//     "md:-translate-x-32 md:-translate-y-16 md:opacity-25"
//   );

//   const [dynamicClassRight, setDynamicClassRight] = useState(
//     "md:translate-x-32 md:-translate-y-16 md:opacity-25"
//   );

//   useEffect(() => {
//     md: setDynamicClassLeft(
//       "md:translate-x-0 md:opacity-100 md:-translate-y-0"
//     );
//     setDynamicClassRight("md:-translate-x-0 md:opacity-100 md:-translate-y-0");
//   }, []);

//   return (
//     <Fragment>
//       <div className="py-128px px-68px intro flex flex-col md:flex-row">
//         <div
//           className={`md:px-10 md:my-auto ${dynamicClassLeft} md:duration-500 md:transform md:transition-all md:ease-out`}
//         >
//           {/* <h1 className="text-[#FF8303] font-intro1 text-[40px] text-center"> */}
//           <TypeAnimation
//             sequence={["Samaresh Das", 1000, ""]}
//             speed={10}
//             wrapper="h1"
//             className="text-[#FF8303] font-intro1 text-[40px] text-center"
//             repeat={Infinity}
//           />
//           {/* </h1> */}
//           <h2 className="text-[#F0E3CA] text-[32px] font-intro2 text-center py-5">
//             Full Stack Developer
//           </h2>
//           <p className="text-[#F0E3CA] text-[24px] font-intro3 text-center">
//             👋 Hi there, Samaresh here! 🚀 Welcome to my portfolio. 🌐 Glad you
//             landed here. 🌟 I aim to innovate web and software for the world. 💻
//             Below you can see some of my projects and learn more about me. 📂
//             Thanks! 🙏
//           </p>
//         </div>
//         <div
//           className={`photo pt-[60px] relative md:w-[200rem] md:pt-0 ${dynamicClassRight} md:duration-500 md:transform md:transition-all md:ease-out`}
//         >
//           <img
//             src="./Assets/intro-text.png"
//             alt="background code"
//             className="md:h-[35rem]"
//           />
//           <div className="absolute inset-8 pt-[90px]">
//             <img
//               src="./Assets/dp.jpg"
//               alt="Profile Photo"
//               className="h-[220px] md:h-[250px] border-[#FF8303] object-cover  border-x-4 rounded-full mx-auto"
//             />
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default Intro;

import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Intro = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-24">
      <div className="grid md:grid-cols-2 gap-16 items-center">

        {/* TEXT BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center md:text-left max-w-xl mx-auto"
        >
          <TypeAnimation
            sequence={["Samaresh Das", 1500]}
            speed={10}
            wrapper="h1"
            repeat={Infinity}
            className="text-[#FF8303] font-intro1 text-[42px] md:text-[48px]"
          />

          <h2 className="text-[#F0E3CA] text-[28px] md:text-[32px] font-intro2 mt-4">
            Full Stack Developer
          </h2>

          <p className="text-[#F0E3CA] text-[20px] font-intro3 mt-6 leading-relaxed opacity-90">
            I’m a full-stack developer who builds production-ready web apps, not demos. I work with founders, startups, and small teams to ship fast, clean, and scalable products — from quick landing pages to full web applications.

          </p>
        </motion.div>

        {/* IMAGE BLOCK */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative flex justify-center"
        >
          {/* background code image */}
          <img
            src="./Assets/intro-text.png"
            alt="code background"
            className="absolute w-80 md:max-w-[420px] opacity-40 md:opacity-90"
          />

          {/* profile image */}
          <div className="relative z-10">
            <img
              src="./Assets/dp.jpg"
              alt="Profile"
              className="h-[220px] md:h-[260px] w-[220px] md:w-[260px]
                         object-cover rounded-full
                         border-x-4 border-[#FF8303]"
            />
          </div>
        </motion.div>

      </div>

      {/* subtle divider / root hint */}
      <div className="mt-20 flex justify-center">
        <span className="w-1 h-16 bg-[#FF8303] opacity-20 rounded-full"></span>
      </div>
    </section>
  );
};

export default Intro;
