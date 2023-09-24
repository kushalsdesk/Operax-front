import React from "react";
import Game from "./Game";

const Games = () => {
  return (
    <main className="flex flex-wrap flex-1 justify-between items-center md:flex-row lg:flex-row gap-x-2 bg-trasnparent w-full md:w-[90%] lg:w-[85%] mx-auto border-white/10 border-x-[1px] h-[100vh] mt-[100px] p-10 ">
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
