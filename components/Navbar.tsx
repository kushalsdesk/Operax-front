"use client";

import Link from "next/link";
import { Avatar } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import useUserStore from "@/store/user.store";
import { UserProfile, LoginButton } from "./Signer";
import { onAuthStateChanged } from "firebase/auth";
import { signIn, auth } from "@/services/firebase.service";


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
  const [isLoading, setLoading] = useState<boolean>(true);

  const { isLoggedIn, loginStatus } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        loginStatus({
          firstName: currentUser?.displayName?.split(' ')[0] || "",
          avatarImg: currentUser?.photoURL || "",
          emailId: currentUser?.email || "",
        })
        if (isLoggedIn) setLoading(false);
      } else {
        setLoading(false);
      }

    })

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoggedIn]);

  return (
    <header
      className={`relative inset-x-0 top-0 z-10 w-screen flex justify-center `}
    >
      <nav
        className={`flex items-center lg:px-6 h-[4.5rem] mt-0.5
        aria-label="Global" transition-all duration-500
        ${scrolling
            ? "fixed p-2 md:px-4 justify-between md:justify-evenly  lg:justify-evenly border-white/40  bg-black/40  text-white w-[95%] sm:w-[90%] md:w-[90%] lg:w-[80%] m-auto rounded-b-xl shadow-xl shadow-black/[0.05] backdrop-blur-[0.5rem] h-[3.5rem] gap-16 "
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
            <Image
              id="image"
              width={35}
              height={35}
              loading="lazy"
              src="/logo.png"
              alt="logo_img"
            />
            <label
              htmlFor="image"
              className={`${scrolling ? "hidden" : "font-bold text-xl cursor-pointer z-10 "
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
              onPress={(e) => router.push(link.href)}
              key={link.href}
              href={link.href}
              className={`font-semibold leading-6 mx-2 cursor-pointer md:text-sm `}
            >
              {link.value}
            </Button>
          ))}
        </div>
        {/**This is the section for Signer*/}
        <div
          className={`lg:flex lg:flex-1 lg:justify-end md:flex cursor-pointer flex `}
        >
          {
            isLoading ? (
              <Avatar
                showFallback
                isBordered
                radius="md"
                size="md"
                src="https://images.unsplash.com/broken"
              /> // Use default Avatar
            ) : isLoggedIn ? (
              <UserProfile />
            ) : (
              <LoginButton />
            )}
        </div>
        {/**Mobile navlinks */}
      </nav>
    </header >
  );
};

export default Navbar;
