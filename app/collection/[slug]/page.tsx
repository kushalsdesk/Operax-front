"use client"
import useUserStore from "@/store/user.store";
import React from "react";

const Collection: React.FC = () => {
  const { user } = useUserStore();

  return (
    <>
      <p>Welcome, {user?.firstName} </p>
      <p> Your Collection is Ready</p>
    </>
  );
};


export default Collection;
