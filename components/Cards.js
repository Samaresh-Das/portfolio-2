import React, { Fragment } from "react";
import Button from "./Button";
import { projects } from "../data/projectData";

const Cards = () => {
  const projectDatas = projects.map((data) => (
    <div
      className=" rounded-lg shadow-md bg-[#21201D] border-2 border-[#ff8303] mx-auto md:mx-[auto] w-[285px] md:w-[500px]"
      key={data.id}
    >
      <a href="#">
        <img className="rounded-t-lg" src={data.image} alt="" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-[#fefae0]">{data.description}.</p>
        <div className="mx-auto flex justify-around">
          {data.live && <Button path={data.live} text="Live" />}
          <Button path={data.code} text="Code" />
        </div>
      </div>
    </div>
  ));
  return <Fragment>{projectDatas}</Fragment>;
};

export default Cards;
