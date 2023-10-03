"use client";

import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Button } from "@nextui-org/react";
import { signIn, auth } from "@/services/firebase.service";
import { User, onAuthStateChanged } from "firebase/auth";
import axios from "redaxios";

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
  const router = useRouter();
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [image, setImage] = useState<string | undefined>(undefined);

  const isSignedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      }
    });
  };

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
    isSignedIn();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignIn = async () => {
    try {
      const user = await signIn();
      console.log("User signed in successfully", user);

      const requestObj = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      const apiUrl = "https://operax.cyclic.cloud/api/user/";
      //const apiUrl = "http://localhost:8080/api/user";

      const response = await axios.post(apiUrl, requestObj);
      console.log(response.data);
      setImage(response.data.photoUrl);
    } catch (err) {
      console.log("Error While Signing In", err);
      throw new Error();
    }
  };

  return (
    <header
      className={`relative inset-x-0 top-0 z-10 w-screen flex justify-center `}
    >
      <nav
        className={`flex items-center lg:px-6 h-[4.5rem] mt-0.5
        aria-label="Global" transition-all duration-500 ${
          scrolling
            ? "fixed p-2 md:px-4 justify-between md:justify-evenly  lg:justify-evenly  border-white/40  bg-white/10  text-white w-[95%] sm:w-[90%] md:w-[90%] lg:w-[80%] m-auto rounded-b-xl shadow-xl shadow-black/[0.05] backdrop-blur-[0.5rem] h-[3.5rem] gap-16  "
            : "bg-transparent text-white justify-between absolute p-6 w-full"
        }
      }   `}
      >
        <div className="flex lg:flex-1 flex-row items-center cursor-pointer gap-2">
          <Link
            href="/"
            className="flex flex-row items-center justify-between gap-1 "
          >
            <span className="sr-only ">Operax</span>
            <img
              id="image"
              className="h-[30px] w-[30px] z-10"
              src="logo.png"
              alt="logo_img"
            />
            <label
              htmlFor="image"
              className={`${
                scrolling ? "hidden" : "font-bold text-xl cursor-pointer z-10 "
              }  `}
            >
              Operax
            </label>
          </Link>
        </div>

        {/**
         * Desktop Navilnks & Log In --Should Only be visible in
         * Desktop $ Tablet
         */}

        <div className="hidden lg:flex lg:gap-x-4 md:flex md:gap-x-4">
          {navLinks.map((link) => (
            <Button
              variant="light"
              size="sm"
              onClick={() => router.push(link.href)}
              key={link.href}
              href={link.href}
              className={`font-semibold leading-6 mx-2 cursor-pointer md:text-sm `}
            >
              {link.value}
            </Button>
          ))}
        </div>

        <div
          className={`lg:flex lg:flex-1 lg:justify-end md:flex cursor-pointer flex `}
        >
          {isLoggedIn ? (
            <Avatar
              isBordered
              radius="lg"
              color="primary"
              size="sm"
              src={image}
            />
          ) : (
            <Button
              className={`font-semibold leading-6`}
              variant="light"
              size="md"
              onPress={() => handleSignIn()}
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Button>
          )}
        </div>

        {/**Mobile navlinks */}
      </nav>
    </header>
  );
};

export default Navbar;
