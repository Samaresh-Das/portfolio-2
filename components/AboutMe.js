// import React, { Fragment } from "react";

// const AboutMe = () => {
//   return (
//     <Fragment>
//       <div className="about" id="about">
//         <h1 className="text-[#FF8303] font-intro2 text-[40px] text-center hidden md:block">
//           About Me
//         </h1>
//         <div className=" flex flex-col md:flex-row md:mx-auto md:px-56">
//           <div>
//             <img
//               src="./Assets/Logo.png"
//               alt="Logo"
//               className="w-[100px] md:w-[200px] mx-auto mt-[64px] mb-[32px]"
//             />
//           </div>
//           <h1 className="text-[#FF8303] font-intro2 text-[40px] text-center md:hidden">
//             About Me
//           </h1>
//           <div className="p-[64px]">
//             <p className="text-[#F0E3CA] text-[24px] font-intro3 text-center">
//               I am a full-stack developer experienced working in both front-end
//               and back-end as well as DevOps. MERN stack is my main. Passionate
//               in web development. Like to build projects{" "}
//               {"{I am a project nerd :) }"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default AboutMe;

import React from "react";
import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <section id="about" className="py-32 px-6 md:px-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* VISUAL BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center md:justify-start"
        >
          <div className="relative">
            {/* subtle frame */}
            <div className="absolute inset-0 border-2 border-[#FF8303] opacity-20 rounded-xl translate-x-4 translate-y-4"></div>

            <div className="relative bg-[#21201D] rounded-xl p-10">
              <img
                src="./Assets/Logo.png"
                alt="Logo"
                className="w-[120px] md:w-[160px] mx-auto"
              />
            </div>
          </div>
        </motion.div>

        {/* TEXT BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-center md:text-left"
        >
          <h2 className="text-[#FF8303] font-intro2 text-[40px] mb-6">
            About Me
          </h2>

          <p className="text-[#F0E3CA] text-[20px] font-intro3 leading-relaxed opacity-90">
            I’m a full-stack developer who enjoys building clean, scalable,
            and maintainable products. My core strength lies in translating
            ideas into reliable user experiences using modern frontend and
            backend technologies.
          </p>

          <p className="text-[#F0E3CA] text-[20px] font-intro3 leading-relaxed opacity-90 mt-6">
            I primarily work with the MERN stack and care deeply about UI
            clarity, performance, and real-world usability. I like shipping
            things fast — but never sloppy.
          </p>

          {/* subtle highlight */}
          <div className="mt-8 inline-block">
            <span className="text-[#FF8303] text-[18px] font-intro3 border-b border-[#FF8303] border-opacity-40 pb-1">
              Project-driven. Detail-oriented. Always learning.
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutMe;
