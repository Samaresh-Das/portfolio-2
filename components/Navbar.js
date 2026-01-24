// import React, { Fragment, useState } from "react";
// import { FiMenu } from "react-icons/fi";
// import { RxCross1 } from "react-icons/rx";
// import Name from "./Name";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);

//   const handleClick = () => {
//     setOpen(!open);
//   };

//   const mobileNav = (
//     <button
//       id="dropdownUserAvatarButton"
//       data-dropdown-toggle="dropdownAvatar"
//       type="button"
//       className="icons text-white text-[48px] md:hidden relative z-10"
//       onClick={handleClick}
//     >
//       {!open ? <FiMenu /> : <RxCross1 />}
//     </button>
//   );

//   const mobileNavbar = (
//     <div
//       id="dropdownAvatar"
//       className={`z-0 ${
//         !open && "hidden"
//       } right-0 top-[80px] bg-[#1B1A17] divide-y absolute divide-gray-100 rounded shadow w-full`}
//     >
//       <div className="px-4 py-3  text-[#F0E3CA] ">
//         <div className="font-intro1 text-[30px]">Samaresh Das</div>
//         <div className="font-medium truncate font-intro3 text-[24px]">
//           samareshmail679@gmail.com
//         </div>
//       </div>
//       <ul
//         className="py-1 font-intro3 text-[24px] text-[#F0E3CA] "
//         aria-labelledby="dropdownUserAvatarButton"
//       >
//         <li>
//           <a href="#about" className="block px-4 py-2  hover:text-[#FF8303]">
//             About Me
//           </a>
//         </li>
//         <li>
//           <a
//             href="#experience"
//             className="block px-4 py-2  hover:text-[#FF8303]"
//           >
//             My Experience
//           </a>
//         </li>
//         <li>
//           <a href="#skills" className="block px-4 py-2  hover:text-[#FF8303]">
//             Skills
//           </a>
//         </li>
//         <li>
//           <a href="#projects" className="block px-4 py-2  hover:text-[#FF8303]">
//             Projects
//           </a>
//         </li>
//         <li>
//           <a href="#contacts" className="block px-4 py-2  hover:text-[#FF8303]">
//             Contacts
//           </a>
//         </li>
//       </ul>
//     </div>
//   );

//   const desktopNavbar = (
//     <nav className=" hidden md:block  px-2 sm:px-4 py-2.5 rounded ">
//       <div className="hidden w-full md:block md:w-auto" id="navbar-default">
//         <ul className="flex flex-col p-4 mt-4  rounded-lg  md:flex-row md:space-x-20 md:mt-0 md:text-sm md:text-[20px]">
//           <li>
//             <a
//               href="#about"
//               className="block py-2 pl-3 pr-4 text-[#F0E3CA] rounded hover:text-[#FF8303] md:p-0 "
//               aria-current="page"
//             >
//               About Me
//             </a>
//           </li>
//           <li>
//             <a
//               href="#experience"
//               className="block py-2 pl-3 pr-4 text-[#F0E3CA] hover:text-[#FF8303] md:border-0  md:p-0  "
//             >
//               My Experience
//             </a>
//           </li>
//           <li>
//             <a
//               href="#skills"
//               className="block py-2 pl-3 pr-4 text-[#F0E3CA] hover:text-[#FF8303] md:border-0  md:p-0  "
//             >
//               Skills
//             </a>
//           </li>
//           <li>
//             <a
//               href="#projects"
//               className="block py-2 pl-3 pr-4 text-[#F0E3CA] hover:text-[#FF8303] md:border-0  md:p-0  "
//             >
//               Projects
//             </a>
//           </li>
//           <li>
//             <a
//               href="#contacts"
//               className="block py-2 pl-3 pr-4 text-[#F0E3CA]  md:border-0  md:p-0  "
//             >
//               Contact
//             </a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );

//   return (
//     <Fragment>
//       <div className="px-8px py-16px flex flex-row justify-between">
//         <Name />
//         {mobileNav}
//         {desktopNavbar}
//         {mobileNavbar}
//       </div>
//     </Fragment>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import Name from "./Name";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contacts" },
  ];

  return (
    <>
      {/* NAVBAR WRAPPER (keeps layout safe) */}
      <header className="sticky top-0 z-50 w-full">
        {/* GLASS CONTAINER */}
        <div
          className="
            glass
            backdrop-blur-md
            border-b border-[#F0E3CA]/10
          "
        >
          <div className="max-w-6xl mx-auto px-6 md:px-24 h-[72px] flex items-center justify-between">

            {/* Logo */}
            <Name />

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-12 text-[15px] font-intro3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="
                    text-[#F0E3CA]/80
                    hover:text-[#FF8303]
                    transition
                    relative
                    after:absolute
                    after:left-0
                    after:-bottom-1
                    after:h-[1px]
                    after:w-0
                    after:bg-[#FF8303]
                    hover:after:w-full
                    after:transition-all
                  "
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#F0E3CA] text-3xl"
              onClick={() => setOpen(!open)}
            >
              {open ? <RxCross1 /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm">
          <div className="glass absolute top-[80px] left-1/2 -translate-x-1/2 w-[90%] rounded-xl p-6 space-y-4 text-center">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-[#F0E3CA] text-[20px] hover:text-[#FF8303]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
