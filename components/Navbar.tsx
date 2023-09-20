"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ILink {
  href: string;
  value: string;
}

const navLinks: ILink[] = [
  { href: "/", value: "Home" },
  { href: "/about", value: "About" },
  { href: "/creators", value: "Creator's" },
];

const Navbar = () => {
  const [scrolling, setScrolling] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarStyle = {
    backgroundColor: scrolling ? "white" : "transparent",
  };

  return (
    <header className={`absolute inset-x-0 top-0 z-50 `}>
      <nav
        className={`flex w-full items-center justify-between  lg:px-8
        aria-label="Global" transition-all duration-300 ${
          scrolling
            ? "background_tran fixed rounded-full p-2.5"
            : "bg-transparent absolute p-6"
        }
      }   `}
      >
        <div className="flex lg:flex-1 flex-row items-center cursor-pointer  gap-2">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Operax</span>
            <img
              id="image"
              className="h-[50px] w-[50px]"
              src="logo.png"
              alt="logo_img"
            />
          </Link>
          <label
            htmlFor="image"
            className="text-white font-bold text-xl cursor-pointer "
          >
            Operax
          </label>
        </div>

        <div className="flex gap-8 lg:flex lg:gap-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.value}
              href={link.href}
              className="text-sm font-semibold leading-6 text-white cursor-pointer "
            >
              {link.value}
            </Link>
          ))}
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end cursor-pointer">
          <Link href="#" className="text-sm font-semibold leading-6 text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
