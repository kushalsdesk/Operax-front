"use client";

import React, { useState, useEffect } from "react";
import { Game, Loader } from "@/components/exports";
import axios from "redaxios";
import IGame from "@/utils/interfaces";

export default function Home() {
  const [games, setGames] = useState<IGame[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getGames = async () => {
      try {
        const apiUrl = "https://operax.cyclic.cloud/api/games/";
        //const apiUrl = "http://localhost:8080/api/games";
        const response = await axios.get<IGame[]>(apiUrl);
        setGames(response.data);
        setLoading(false);
      } catch (error) {
        throw new Error();
      }
    };

    getGames();
  }, []);

  return (
    <>
      <main className="flex flex-wrap flex-row flex-1 justify-center items-center md:justify-evenly lg:justify-evenly md:flex-row lg:flex-row gap-x-5 bg-trasnparent w-full md:w-[90%] lg:w-[95%] mx-auto md:border-white/10 lg:border-white/10 md:border-x-[1px] lg:border-x-[1px] mt-[100px] p-10 ">
        {loading
          ? [...Array(8).keys()].map((i) => <Loader key={i} />)
          : games.map((game: IGame) => <Game key={game._id} game={game} />)}
      </main>
    </>
  );
}
