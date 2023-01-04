import React, { Fragment, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import Name from "./Name";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const mobileNav = (
    <button
      id="dropdownUserAvatarButton"
      data-dropdown-toggle="dropdownAvatar"
      type="button"
      className="icons text-white text-[48px] md:hidden relative z-10"
      onClick={handleClick}
    >
      {!open ? <FiMenu /> : <RxCross1 />}
    </button>
  );

  const mobileNavbar = (
    <div
      id="dropdownAvatar"
      className={`z-0 ${
        !open && "hidden"
      } right-0 top-[80px] bg-[#1B1A17] divide-y absolute divide-gray-100 rounded shadow w-full`}
    >
      <div className="px-4 py-3  text-[#F0E3CA] ">
        <div className="font-intro1 text-[30px]">Samaresh Das</div>
        <div className="font-medium truncate font-intro3 text-[24px]">
          samareshmail679@gmail.com
        </div>
      </div>
      <ul
        className="py-1 font-intro3 text-[24px] text-[#F0E3CA] "
        aria-labelledby="dropdownUserAvatarButton"
      >
        <li>
          <a href="#about" className="block px-4 py-2  hover:text-[#FF8303]">
            About Me
          </a>
        </li>
        <li>
          <a
            href="#experience"
            className="block px-4 py-2  hover:text-[#FF8303]"
          >
            My Experience
          </a>
        </li>
        <li>
          <a href="#skills" className="block px-4 py-2  hover:text-[#FF8303]">
            Skills
          </a>
        </li>
        <li>
          <a href="#projects" className="block px-4 py-2  hover:text-[#FF8303]">
            Projects
          </a>
        </li>
        <li>
          <a href="#contacts" className="block px-4 py-2  hover:text-[#FF8303]">
            Contacts
          </a>
        </li>
      </ul>
    </div>
  );

  return (
    <Fragment>
      <div className="px-8px py-16px flex flex-row justify-between">
        <Name />
        {mobileNav}
        {mobileNavbar}
      </div>
    </Fragment>
  );
};

export default Navbar;
