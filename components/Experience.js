// import React, { Fragment, useRef, useEffect, useState } from "react";
// import Button from "./Button";
// // import experienceData from "../data/ExperiencData";
// import { motion, useInView, useAnimation } from "framer-motion";
// import { getDatabase, ref as sRef, onValue } from "firebase/database";
// import { app } from "../utils/firebase";

// const Experience = () => {
//   const [experienceData, setExperienceData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const expRef = useRef(null);
//   const isInView = useInView(expRef, { once: true });
//   const db = getDatabase(app);
//   const mainControls = useAnimation();

//   useEffect(() => {
//     if (isInView) {
//       //fire transition
//       mainControls.start("visible");
//     }
//   }, [isInView]);

//   useEffect(() => {
//     const getData = () => {
//       const getExperience = sRef(db, "experience/");
//       onValue(getExperience, (snapshot) => {
//         const data = snapshot.val();
//         setExperienceData(data);
//         setLoading(false);
//       });
//     };

//     getData();
//   }, []);

//   const { metadata, ...experience } = experienceData;

//   const experienceCard =
//     experience &&
//     Object.keys(experience).map((key) => {
//       const data = experience[key];
//       return (
//         <div
//           className="md:flex md:flex-col md:justify-between p-6 md:px-10 bg-[#21201D] border-4 border-[#F0E3CA] rounded-lg experiences w-[285px] md:w-auto mx-auto md:mx-10 my-0 md:h-auto"
//           key={data.id}
//         >
//           <div className="mb-4">
//             <h3 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
//               {data.companyName}
//             </h3>
//             <h4 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
//               {data.jobTitle}{" "}
//               <span className="font-light">({data.timeLine})</span>
//             </h4>
//             <ul className="m-2 font-normal text-[#fefae0] list-disc list-inside">
//               {data.responsibility.map((role, i) => (
//                 <li key={i}>{role}</li>
//               ))}
//             </ul>
//             {data.skills && (
//               <h3 className="m-2 font-bold text-[#fefae0] list-disc list-inside text-[19px]">
//                 {" "}
//                 Skills - {data.skills}
//               </h3>
//             )}
//           </div>
//           <div>
//             {data.certificate && (
//               <Button
//                 path={data.certificate}
//                 text="Certificate"
//                 className="transition ease-in-out delay-150 hover:scale-110 duration-300"
//                 classNameDiv=" md:bottom-[20px] "
//               />
//             )}
//           </div>
//         </div>
//       );
//     });
//   return (
//     <Fragment>
//       <div id="experience" ref={expRef}>
//         <h1 className="text-[#FF8303] font-intro2 text-[40px] text-center mb-[32px]">
//           My Experience
//         </h1>
//         <motion.div
//           variants={{
//             hidden: { opacity: 0, y: 75 },
//             visible: { opacity: 1, y: 0 },
//           }}
//           initial="hidden"
//           animate={mainControls}
//           transition={{ duration: 0.5, delay: 0.25 }}
//           className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-2"
//         >
//           {loading ? <p>Loading</p> : experienceCard}
//         </motion.div>
//       </div>
//     </Fragment>
//   );
// };

// export default Experience;


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../utils/firebase";
import Button from "./Button";

const Experience = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase(app);
    const expRef = ref(db, "experience/");
    onValue(expRef, (snapshot) => {
      const data = snapshot.val();
      const values = data
        ? Object.values(data).filter(
          (item) =>
            item &&
            item.companyName &&
            item.jobTitle &&
            Array.isArray(item.responsibility)
        )
        : [];

      setExperienceData(values);

      setLoading(false);
    });
  }, []);

  return (
    <section id="experience" className="py-32 px-6 md:px-24 relative">
      <h2 className="text-[#FF8303] font-intro2 text-[40px] text-center mb-20">
        My Experience
      </h2>

      {/* Timeline line */}
      <div className="absolute left-1/2 top-[160px] bottom-0 w-[2px] bg-[#FF8303] opacity-20 hidden md:block"></div>

      <div className="space-y-20">
        {loading && <p className="text-center text-[#F0E3CA]">Loading...</p>}

        {experienceData.map((exp, index) => {
          if (!exp.companyName) return null;
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`relative md:flex ${isLeft ? "md:justify-start" : "md:justify-end"
                }`}
            >
              {/* Timeline node */}
              <span className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full bg-[#FF8303]"></span>

              {/* Card */}
              <div className="md:w-[46%] bg-[#21201D] border border-[#F0E3CA] rounded-xl p-8">
                <h3 className="text-2xl font-bold text-[#F0E3CA]">
                  {exp.companyName}
                </h3>

                <p className="text-[#FF8303] mt-1 font-medium">
                  {exp.jobTitle}{" "}
                  <span className="text-[#F0E3CA] opacity-70">
                    ({exp.timeLine})
                  </span>
                </p>

                <ul className="mt-4 space-y-2 text-[#F0E3CA] opacity-90 list-disc list-inside">
                  {Array.isArray(exp.responsibility) && (
                    <ul className="mt-4 space-y-2 text-[#F0E3CA] opacity-90 list-disc list-inside">
                      {exp.responsibility.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                </ul>

                {exp.skills && (
                  <p className="mt-4 text-[#F0E3CA] text-sm opacity-80">
                    <span className="text-[#FF8303]">Skills:</span>{" "}
                    {exp.skills}
                  </p>
                )}

                {exp.certificate && (
                  <div className="mt-6">
                    <Button
                      path={exp.certificate}
                      text="Certificate"
                      className="transition hover:translate-y-[-2px]"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
