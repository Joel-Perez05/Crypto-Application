"use client";
import LandingPage from "./components/LandingPage";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between w-full dark:bg-[#13121A] bg-[#f2f2fd]`}
    >
      <LandingPage />
    </main>
  );
}
