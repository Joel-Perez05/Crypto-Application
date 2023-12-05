"use client";
import { Container } from "postcss";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

export default function LandingPage() {
  return (
    <main
      className="h-full md:w-full xl:w-1/2 p-4"
      style={{ background: "rgb(30, 30, 40)" }}
    >
      <h2 className="text-white text-3xl mb-6">Your Overview</h2>
      <div className="flex justify-around">
        <div
          className="rounded-2xl p-4 w-96 h-60 text-white"
          style={{ background: "rgb(20, 20, 30)" }}
        >
          <LineChart />
        </div>
        <div
          className="rounded-2xl p-4 w-96 h-60 text-white"
          style={{ background: "rgb(20, 20, 30)" }}
        >
          <BarChart />
        </div>
      </div>
    </main>
  );
}
