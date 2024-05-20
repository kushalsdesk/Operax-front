"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import placeholder from "../public/placeholder.svg";
import { IGame } from "@/utils/interfaces";
import useGamesStore from "@/store/game.store";

interface Props {
  gameId: string
}

const Game: React.FC<Props> = ({ gameId }) => {
  const { games } = useGamesStore();
  const [game, setGame] = useState<IGame | undefined>();

  useEffect(() => {
    const getGame = games?.find((game) => game._id === gameId);
    setGame(getGame);
  }, [game, gameId])


  return (
    <>
      <main className="flex flex-col flex-1  lg:flex-none my-4 justify-between h-[350px] md:h-[350px] lg:min-w-[320px] min-w-[270px] bg-white bg-opacity-10 shadow-lg shadow-white/[0.1] backdrop-blur-[0.5rem] px-2 py-2 rounded-xl items-center">
        <div className="py-1 h-[85%] flex justify-center items-center">
          <Image
            alt="Card background "
            className="object-contain rounded-md "
            src={game?.imageUrl || placeholder}
            width={300}
            height={200}
            loading="lazy"
            quality={70}
          />
        </div>
        <div className="py-4 items-start w-full">
          <section className="pb-0 pt-2 px-4 flex-col items-starts">
            <h4 className="font-bold text-large">{game?.title}</h4>
            <h6 className="text-default-500">{game?.genre}</h6>
            <div className="flex flex-row justify-between">
              <p className="text-tiny uppercase mt-[0.3rem] font-bold">
                {game?.developer}
              </p>
              <p className="text-tiny uppercase mt-[0.3rem] font-bold">
                {game?.releaseYear}
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Game;
