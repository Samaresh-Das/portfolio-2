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

  const desktopNavbar = (
    <nav class=" hidden md:block  px-2 sm:px-4 py-2.5 rounded ">
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul class="flex flex-col p-4 mt-4  rounded-lg  md:flex-row md:space-x-20 md:mt-0 md:text-sm md:text-[20px]">
          <li>
            <a
              href="#about"
              class="block py-2 pl-3 pr-4 text-[#F0E3CA] rounded hover:text-[#FF8303] md:p-0 "
              aria-current="page"
            >
              About Me
            </a>
          </li>
          <li>
            <a
              href="#experience"
              class="block py-2 pl-3 pr-4 text-[#F0E3CA] hover:text-[#FF8303] md:border-0  md:p-0  "
            >
              My Experience
            </a>
          </li>
          <li>
            <a
              href="#skills"
              class="block py-2 pl-3 pr-4 text-[#F0E3CA] hover:text-[#FF8303] md:border-0  md:p-0  "
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#projects"
              class="block py-2 pl-3 pr-4 text-[#F0E3CA] hover:text-[#FF8303] md:border-0  md:p-0  "
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contacts"
              class="block py-2 pl-3 pr-4 text-[#F0E3CA]  md:border-0  md:p-0  "
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );

  return (
    <Fragment>
      <div className="px-8px py-16px flex flex-row justify-between">
        <Name />
        {mobileNav}
        {desktopNavbar}
        {mobileNavbar}
      </div>
    </Fragment>
  );
};

export default Navbar;
