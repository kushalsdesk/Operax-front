import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";

const Game = () => {
  return (
    <>
      <main className="flex flex-col flex-1 lg:flex-none my-4 justify-between h-[350px] md:h-[350px] lg:h-[350px] w-[320px] min-w-[270px] bg-white bg-opacity-10 shadow-lg shadow-white/[0.1] backdrop-blur-[0.5rem] px-2 py-2 rounded-md items-center ">
        <div className="py-2 h-[75%] flex justify-center items-center">
          <Image
            alt="Card background "
            className="object-contain rounded-xl "
            src="https://firebasestorage.googleapis.com/v0/b/game-lib-bd07d.appspot.com/o/files%2F20251946_6172384.jpg?alt=media&token=b7b9b57e-2c92-491e-8088-52ceed2bbfdf"
            width={300}
            height={300}
          />
        </div>
        <div className="py-4 items-start">
          <section className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">Assassin's Creed Syndicate</h4>
            <h6 className="text-default-500">Action-Adventure</h6>
            <p className="text-tiny uppercase mt-[0.3rem] font-bold">Ubisoft</p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Game;
