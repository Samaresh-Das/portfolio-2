// import React, { Fragment } from "react";
// import socials from "../data/SocialLinks";

// const Contacts = () => {
//   const socialCards = socials.map((sc) => (
//     <div
//       className="flex flex-row h-[60px] w-[285px] bg-[#1b1a17] rounded-lg md:mb-[20px]"
//       key={sc.id}
//     >
//       <img
//         src={sc.logo}
//         alt={sc.text}
//         className="h-[50px] w-[50px] my-auto mx-6"
//       />
//       {/* <div className="image">
//       </div> */}
//       <div className="title">
//         <a
//           href={sc.text === "Email" ? `mailto:${sc.data}` : sc.data}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <p className="text-center text-[#F0E3CA] text-[16px] mx-5 my-3">
//             {sc.text}
//           </p>
//         </a>
//       </div>
//     </div>
//   ));

//   return (
//     <Fragment>
//       <div id="contacts">
//         <h1 className="text-[#FF8303] font-intro2 text-[40px] text-center mb-[32px] md:text-left">
//           Contact Me
//         </h1>
//         <div className="flex flex-col mx-auto md:flex-none md:mx-0 w-[285px] md:w-full space-y-4 md:space-y-0  md:grid md:grid-cols-2">
//           {socialCards}
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default Contacts;


import React from "react";
import { motion } from "framer-motion";
import socials from "../data/SocialLinks";

const Contact = () => {
  return (
    <section id="contacts" className="py-32 px-6 md:px-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* Heading */}
        <h2 className="text-[#FF8303] font-intro2 text-[40px] mb-6">
          Let’s build something meaningful
        </h2>

        {/* Subtext */}
        <p className="text-[#F0E3CA] text-[20px] font-intro3 max-w-2xl mx-auto leading-relaxed">
          If you have an idea, a project, or an opportunity you’d like to discuss,
          feel free to reach out. I’m always open to meaningful conversations
          and interesting work.
        </p>

        {/* Contact methods */}
        <div className="mt-16 space-y-6">
          {socials.map((sc) => (
            <a
              key={sc.id}
              href={sc.text === "Email" ? `mailto:${sc.data}` : sc.data}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                flex items-center justify-center gap-4
                py-4
                border-b border-[#F0E3CA]/20
                transition
                hover:border-[#FF8303]/50
              "
            >
              <img
                src={sc.logo}
                alt={sc.text}
                className="w-6 h-6 opacity-70 group-hover:opacity-100"
              />
              <span className="text-[#F0E3CA] text-[18px]">
                {sc.text}
              </span>
            </a>
          ))}
        </div>

        {/* subtle closing accent */}
        <div className="mt-20 flex justify-center">
          <span className="w-1 h-14 bg-[#FF8303] opacity-30 rounded-full"></span>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
