import React from "react";

const Button = (props) => {
  return (
    <div className={`${props.classNameDiv}`}>
      <a
        href={props.path}
        className={`${props.className} px-3 py-2 text-center bg-[#fb5607] rounded-lg text-[#F0E3CA] hover:bg-[#F0E3CA] hover:text-[#fb5607]`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.text}
      </a>
    </div>
  );
};

export default Button;
