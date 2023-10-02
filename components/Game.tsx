import React from "react";
import Image from "next/image";
import IGame from "@/utils/interfaces";

interface Props {
  game: IGame;
}

const Game: React.FC<Props> = ({ game }) => {
  return (
    <>
      <main className="flex flex-col flex-1  lg:flex-none my-4 justify-between h-[350px] md:h-[350px] lg:h-[350px] w-[320px] min-w-[270px] bg-white bg-opacity-10 shadow-lg shadow-white/[0.1] backdrop-blur-[0.5rem] px-2 py-2 rounded-md items-center hover:underline ">
        <div className="py-1 h-[85%] flex justify-center items-center">
          <Image
            alt="Card background "
            className="object-contain rounded-md "
            src={game.imageUrl}
            width={300}
            height={200}
            loading="lazy"
            quality={70}
          />
        </div>
        <div className="py-4 items-start w-full">
          <section className="pb-0 pt-2 px-4 flex-col items-starts">
            <h4 className="font-bold text-large">{game.title}</h4>
            <h6 className="text-default-500">{game.genre}</h6>
            <div className="flex flex-row justify-between">
              <p className="text-tiny uppercase mt-[0.3rem] font-bold">
                {game.developer}
              </p>
              <p className="text-tiny uppercase mt-[0.3rem] font-bold">
                {game.releaseYear}
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Game;
