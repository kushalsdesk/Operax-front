import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="grid min-h-full place-items-center h-full bg-gray-700 rounded-lg px-6 py-24 sm:py-32 lg:px-8"></main>
    </>
  );
}
