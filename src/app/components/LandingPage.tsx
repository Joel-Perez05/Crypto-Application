"use client";
import Coins from "./Coins";
import { useAppSelector } from "@/redux/store";
import CoinConverterToggle from "./CoinConverterToggle";
import HomePageGraphs from "./HomePageGraphs";

export default function LandingPage() {
  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <main
      className={`h-full w-1296 ${isDarkMode ? "bg-[#13121A]" : "bg-white"}`}
    >
      <CoinConverterToggle />
      <HomePageGraphs />
      <Coins />
    </main>
  );
}
