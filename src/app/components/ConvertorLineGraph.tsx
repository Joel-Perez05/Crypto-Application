"use client";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { Line } from "react-chartjs-2";
import homepageGradient from "../utils/homePageGraphGradients";
import {
  Chart as ChartJS,
  ChartData,
  LineElement,
  PointElement,
  CategoryScale,
  Tooltip,
  LinearScale,
  Legend,
} from "chart.js";

const ConvertorLineGraph = () => {
  const coinNameA = useAppSelector((state) => state.convert.coinA);
  const coinNameB = useAppSelector((state) => state.convert.coinB);
  const pricesA = useAppSelector((state) => state.convert.coinA.prices);
  const pricesB = useAppSelector((state) => state.convert.coinB.prices);
  const interval = useAppSelector((state) => state.interval.converterInterval);

  const coinSymbolA = coinNameA.symbol.toUpperCase();
  const coinSymbolB = coinNameB.symbol.toUpperCase();

  ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
  );

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        min: 0,
        max: interval,
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        type: "linear" as const,
        display: false,
        position: "left" as const,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y1: {
        type: "linear" as const,
        display: false,
        position: "right" as const,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        beginAtZero: false,
      },
    },
  };

  const labels = pricesA.map((_, idx) => `hr${(idx % 24) + 1}`);

  const dataA: ChartData<"line", number[], string> = {
    labels: labels,
    datasets: [
      {
        label: `${coinNameA.name} (${coinSymbolA})`,
        data: pricesA,
        tension: 0.4,
        borderColor: "#7878FA",
        fill: true,
        pointStyle: false,
        borderWidth: 2,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return;
          }
          return homepageGradient(
            ctx,
            chartArea,
            "#7474f263",
            "#7474f260",
            "#1b1932"
          );
        },
        yAxisID: "y",
      },
    ],
  };

  const dataB: ChartData<"line", number[], string> = {
    labels: labels,
    datasets: [
      {
        label: `${coinNameB.name} (${coinSymbolB})`,
        data: pricesB,
        tension: 0.4,
        borderColor: "#9D62D9",
        fill: true,
        pointStyle: false,
        borderWidth: 2,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return;
          }
          return homepageGradient(
            ctx,
            chartArea,
            "#9D62D963",
            "#B374F260",
            "#201932"
          );
        },
        yAxisID: "y1",
      },
    ],
  };
  console.log(pricesA.length);

  return (
    <div className="w-full h-293 flex flex-col justify-center items-center dark:bg-[#191932] bg-white rounded-2xl">
      <div className="h-6 w-full flex justify-around text-xl dark:text-white text-[#353570]">
        {coinNameA.name ? (
          <div className="w-600 h-full">
            {coinNameA.name} ({coinSymbolA})
          </div>
        ) : (
          <div className="w-600 h-full"></div>
        )}
        {coinNameB.name ? (
          <div className="w-600 h-full">
            {coinNameB.name} ({coinSymbolB})
          </div>
        ) : (
          <div className="w-600 h-full"></div>
        )}
      </div>
      <div className="h-197 w-full flex justify-around">
        <div className="w-600 h-full">
          <Line data={dataA} options={options} />
        </div>
        <div className="w-600 h-full">
          <Line data={dataB} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ConvertorLineGraph;
