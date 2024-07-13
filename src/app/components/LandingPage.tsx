"use client";
import Coins from "./Coins";
import CoinConverterToggle from "./CoinConverterToggle";
import HomePageGraphs from "./HomePageGraphs";
import CoinConvertor from "./CoinConvertor";
import { useAppSelector } from "@/redux/store";

export default function LandingPage() {
  const selectedToggle = useAppSelector((state) => state.toggler.toggler);

  return (
    <main
      className={`h-full w-1296 mt-14 mb-14 dark:bg-[#13121A] bg-[#f2f2fd]`}
    >
      <CoinConverterToggle />
      {selectedToggle === "coins" ? (
        <>
          {" "}
          <HomePageGraphs />
          <Coins />
        </>
      ) : (
        <CoinConvertor />
      )}
    </main>
  );
}
