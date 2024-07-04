"use client";
import Coins from "./Coins";
import CoinConverterToggle from "./CoinConverterToggle";
import HomePageGraphs from "./HomePageGraphs";
import { useSelectedToggler } from "@/redux/features/convertorToggler-Slice";
import CoinConvertor from "./CoinConvertor";

export default function LandingPage() {
  const selectedToggle = useSelectedToggler();

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
