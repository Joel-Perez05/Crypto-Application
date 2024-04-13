"use client";
import LandingPage from "./components/LandingPage";
import { useAppSelector } from "@/redux/store";

export default function Home() {
  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between max-sm:mt-14 md:p-24 ${
        isDarkMode ? "bg-custom-dark2" : "bg-gray-300"
      }`}
    >
      <LandingPage />
    </main>
  );
}
