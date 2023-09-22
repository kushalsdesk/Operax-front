"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ILink {
  href: string;
  value: string;
}

const navLinks: ILink[] = [
  { href: "/creators", value: "Creator's" },
  { href: "/top", value: "Top-Titles" },
  { href: "/series", value: "Series" },
];

const Navbar = () => {
  const [scrolling, setScrolling] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } /* else if (window.scrollY > 0 && scrolling == false) {
        setScrolling(true);
      } */ else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`relative inset-x-0 top-0 z-10 w-screen flex justify-center `}
    >
      <nav
        className={`flex items-center lg:px-6 h-[4.5rem]
        aria-label="Global" transition-all duration-500 ${
          scrolling
            ? "fixed mt-0.5 p-2 md:px-4 justify-between  lg:justify-center  border-white border-opacity-40 bg-white bg-opacity-40 text-black w-[95%] sm:w-[90%] md:w-[90%] lg:w-[80%] m-auto rounded-xl shadow-xl shadow-black/[0.05] backdrop-blur-[0.5rem] h-[3.5rem] gap-16  "
            : "bg-transparent text-white justify-between absolute p-6 w-full"
        }
      }   `}
      >
        <div className="flex lg:flex-1 flex-row items-center cursor-pointer gap-2">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Operax</span>
            <img
              id="image"
              className="h-[50px] w-[50px]"
              src="logo.png"
              alt="logo_img"
            />
          </Link>
          <label htmlFor="image" className=" font-bold text-xl cursor-pointer ">
            Operax
          </label>
        </div>

        {/**Desktop Navilnks & Log In --Should Only be visible in
         * Desktop $ Tablet
         */}
        <div className="hidden lg:flex lg:gap-x-4 md:flex md:gap-x-4">
          {navLinks.map((link) => (
            <div
              className={`${scrolling ? "bg-neutral-300 px-2 rounded-lg" : ""}`}
            >
              <Link
                key={link.value}
                href={link.href}
                className={`font-semibold leading-6 mx-2  cursor-pointer md:text-sm `}
              >
                {link.value}
              </Link>
            </div>
          ))}
        </div>

        <div
          className={`lg:flex lg:flex-1 lg:justify-end md:flex cursor-pointer flex `}
        >
          <Link
            href="#"
            className={`font-semibold leading-6
         `}
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/**Mobile navlinks */}
      </nav>
    </header>
  );
};

export default Navbar;
