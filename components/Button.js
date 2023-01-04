import React from "react";

const Button = (props) => {
  return (
    <div className="mt-[30px]">
      <a
        href={props.path}
        className="px-3 py-2 text-center text-white bg-[#fb5607] rounded-lg text-[#F0E3CA] hover:bg-[#F0E3CA] hover:text-[#fb5607]"
        target="_blank"
      >
        {props.text}
      </a>
    </div>
  );
};

export default Button;
