"use client";
import React from "react";
import { Skeleton, Card, Spinner } from "@nextui-org/react";

const Loader = () => {
  return (
    <Card
      className="flex flex-1 h-[350px] md:h-[350px] min-w-[270px] lg:min-w-[320px] lg:max-w-[320px] my-4 mx-2  px-2 py-2  space-y-5"
      radius="md"
    >
      <div className="py-1 h-[65%] flex justify-center items-center">
        <Spinner label="loading.." color="secondary" />
      </div>

      <div className="space-y-3 px-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
};

export default Loader;
