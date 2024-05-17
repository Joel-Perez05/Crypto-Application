"use client";
import LandingPage from "./components/LandingPage";
import { useAppSelector } from "@/redux/store";

export default function Home() {
  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between w-full ${
        isDarkMode ? "bg-[#13121A]" : "bg-gray-300"
      }`}
    >
      <LandingPage />
    </main>
  );
}
