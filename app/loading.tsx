"use client";
import React from "react";
import { Skeleton } from "@nextui-org/skeleton";

const Loading = () => {
  return (
    <Skeleton className="grid place-items-center bg-white bg-opacity-40 shadow-2xl shadow-white/[0.05] backdrop-blur-[0.5rem]  px-6 py-24 sm:py-32 lg:px-8 mt-[100px] h-[50%] rounded-md "></Skeleton>
  );
};

export default Loading;
