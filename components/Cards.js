// import React, { Fragment, useEffect, useState } from "react";
// import Button from "./Button";
// import { getDatabase, ref, onValue } from "firebase/database";
// import { app } from "../utils/firebase";

// const Cards = () => {
//   const [projectDatas, setProjectDatas] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const db = getDatabase(app);
//     const getProjects = () => {
//       const getProject = ref(db, "projects/");
//       onValue(getProject, (snapshot) => {
//         const data = snapshot.val();
//         setProjectDatas(data || []); // Set an empty array if data is undefined
//         setLoading(false);
//       });
//     };

//     getProjects();
//   }, []);

//   const { metadata, ...projects } = projectDatas;

//   if (!projectDatas) {
//     return null; // Render nothing or a loading indicator while data is being fetched
//   }

//   const renderedProjects =
//     projects &&
//     Object.keys(projects).map((key) => {
//       const data = projects[key];

//       return (
//         <div
//           className="flex flex-col justify-between rounded-lg shadow-md bg-[#21201D] border-2 border-[#ff8303] mx-auto md:mx-[auto] w-[285px] md:w-[500px] transition ease-in-out delay-150 hover:scale-105 duration-300"
//           key={data.id}
//         >
//           <div>
//             <div>
//               <img className="rounded-t-lg " src={data.image} alt="" />
//             </div>
//             <div className="p-5">
//               <a href="#">
//                 <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                   {data.title}
//                 </h5>
//               </a>
//               <p className="mb-3 font-normal text-[#fefae0]">
//                 {data.description}.
//               </p>
//             </div>
//           </div>
//           <div>
//             <div className=" flex justify-around py-6">
//               {data.live && (
//                 <Button path={data.live} text="Live" className="md:my-auto" />
//               )}
//               {data.code && <Button path={data.code} text="Code" />}
//             </div>
//           </div>
//         </div>
//       );
//     });

//   return <Fragment>{loading ? <p>Loading...</p> : renderedProjects}</Fragment>;
// };

// export default Cards;


import React, { useEffect, useState } from "react";
import Button from "./Button";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../utils/firebase";
import { motion } from "framer-motion";

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isDesktop;
};

const Cards = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const isDesktop = useIsDesktop();


  useEffect(() => {
    const db = getDatabase(app);
    const projectRef = ref(db, "projects/");
    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
      const values = data
        ? Object.values(data).filter((p) => p && p.title)
        : [];
      setProjects(values);
      setLoading(false);
    });
  }, []);



  if (loading) {
    return <p className="text-center text-[#F0E3CA]">Loading projects...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-24">
      {projects.map((project, index) => {
        const alignLeft = index % 2 === 0;


        return (
          <motion.div
            key={project.id}
            initial={{
              opacity: 0,
              y: isDesktop ? 0 : 40,
              x: isDesktop ? (alignLeft ? -80 : 80) : 0,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              x: 0,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center md:block"
          >

            {/* STRIP */}
            <div
              className={`
          group
          w-full
          md:w-[85%]
          flex flex-col md:flex-row
          gap-6 md:gap-8
          items-start md:items-center
          border-b border-[#F0E3CA]/20
          pb-6
          transition
          hover:border-[#FF8303]/50
          ${!alignLeft ? "md:ml-auto" : ""}
        `}
            >
              {/* IMAGE */}
              <div className="w-full md:w-[40%] relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="
              w-full
              h-[180px] md:h-[160px]
              object-cover
              rounded-md
              transition duration-500
              group-hover:brightness-110
            "
                />

                {/* mobile accent */}
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-[#FF8303] opacity-60 md:hidden"></span>
              </div>

              {/* CONTENT */}
              <div className="w-full md:w-[60%] text-left md:text-left">
                <h3 className="text-[#F0E3CA] text-[22px] font-semibold">
                  {project.title}
                </h3>

                <p className="text-[#F0E3CA]/80 text-[15px] mt-2 leading-relaxed">
                  {project.description}
                </p>

                {/* ACTIONS */}
                <div className="flex  md:justify-start gap-4 mt-4">
                  {project.live && <Button path={project.live} text="Live" />}
                  {project.code && <Button path={project.code} text="Code" />}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

    </div>
  );
};

export default Cards;
