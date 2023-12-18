"use client";
import { Container } from "postcss";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import Coins from "./Coins";

export default function LandingPage() {
  return (
    <main className="h-full md:w-full xl:w-1/2 p-4 bg-custom-dark1">
      <h2 className="text-white text-3xl mb-6">Your Overview</h2>
      <div className="flex justify-around">
        <div className="rounded-2xl p-4 w-5/12 h-72 text-white bg-custom-dark2">
          <LineChart />
        </div>
        <div className="rounded-2xl p-4 w-5/12 h-72 text-white bg-custom-dark2">
          <BarChart />
        </div>
      </div>
      <div className="flex justify-center mt-20">
        <Coins />
      </div>
    </main>
  );
}
