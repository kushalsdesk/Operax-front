"use client";

import React, { useState, useEffect } from "react";
import { Game, Loader } from "@/components/exports";
import axios from "redaxios";
import { IGame } from "@/utils/interfaces";
import useGamesStore from "@/store/game.store";

const Games: React.FC = () => {
  const { games, loading, fetchGames } = useGamesStore();
  useEffect(() => {
    if (!games) {
      fetchGames();
    }

  }, [games, fetchGames]);
  const errHandler = (error: Error) => {
    console.error("Error for fetching Games Data", error);

  }

  return (
    <>
      <main className="flex flex-wrap flex-row flex-1 justify-center items-center md:justify-evenly lg:justify-evenly md:flex-row lg:flex-row gap-x-5 bg-trasnparent w-full md:w-[90%] lg:w-[95%] mx-auto md:border-white/10 lg:border-white/10 md:border-x-[1px] lg:border-x-[1px] mt-[100px] p-10 ">
        {loading
          ? [...Array(8).keys()].map((i) => <Loader key={i} />)
          : games?.map((game: IGame) => <Game key={game._id} gameId={game._id} />)
        }
        {!loading && !games && <div>Error fetching games</div>}
      </main>
    </>
  );
};

export default Games;
