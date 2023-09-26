import React from "react";
import Game from "./Game";

const Games = () => {
  return (
    <main className="flex flex-wrap flex-row flex-1 justify-center items-center md:justify-evenly lg:justify-evenly md:flex-row lg:flex-row gap-x-2 bg-trasnparent w-full md:w-[90%] lg:w-[95%] mx-auto md:border-white/10 lg:border-white/10 md:border-x-[1px] lg:border-x-[1px] mt-[100px] p-10 ">
      <Game />
      <Game />
      <Game />
      <Game />
      <Game />
      <Game />
      <Game />
      <Game />
      <Game />
      <Game />
      <Game />
      <Game />
      <Game />
    </main>
  );
};

export default Games;
