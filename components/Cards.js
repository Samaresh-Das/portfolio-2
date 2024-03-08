import React, { Fragment, useEffect, useState } from "react";
import Button from "./Button";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../utils/firebase";

const Cards = () => {
  const [projectDatas, setProjectDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase(app);
    const getProjects = () => {
      const getProject = ref(db, "projects/");
      onValue(getProject, (snapshot) => {
        const data = snapshot.val();
        setProjectDatas(data || []); // Set an empty array if data is undefined
        setLoading(false);
      });
    };

    getProjects();
  }, []);

  const { metadata, ...projects } = projectDatas;

  if (!projectDatas) {
    return null; // Render nothing or a loading indicator while data is being fetched
  }

  const renderedProjects =
    projects &&
    Object.keys(projects).map((key) => {
      const data = projects[key];

      return (
        <div
          className="flex flex-col justify-between rounded-lg shadow-md bg-[#21201D] border-2 border-[#ff8303] mx-auto md:mx-[auto] w-[285px] md:w-[500px] transition ease-in-out delay-150 hover:scale-105 duration-300"
          key={data.id}
        >
          <div>
            <div>
              <img className="rounded-t-lg " src={data.image} alt="" />
            </div>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {data.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-[#fefae0]">
                {data.description}.
              </p>
            </div>
          </div>
          <div>
            <div className=" flex justify-around py-6">
              {data.live && (
                <Button path={data.live} text="Live" className="md:my-auto" />
              )}
              {data.code && <Button path={data.code} text="Code" />}
            </div>
          </div>
        </div>
      );
    });

  return <Fragment>{loading ? <p>Loading...</p> : renderedProjects}</Fragment>;
};

export default Cards;
