"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon } from "@heroicons/react/20/solid";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "@/redux/store";

const ActiveLinkToggler = () => {
  const pathName = usePathname();
  const isActiveHome = pathName === "/";
  const isActivePortfolio = pathName === "/portfolio";

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div className="flex items-center justify-between">
      <div
        className={`w-1/2 xl:mr-16 flex items-center ${
          isActiveHome
            ? isDarkMode
              ? "text-white"
              : "text-black"
            : "text-gray-500"
        }`}
      >
        <HomeIcon className="w-6 h-6 mr-2" />
        <Link href="/">
          <h2 className="text-xl">Home</h2>
        </Link>
      </div>
      <div
        className={`w-1/2 flex items-center ${
          isActivePortfolio
            ? isDarkMode
              ? "text-white"
              : "text-black"
            : "text-gray-500"
        }`}
      >
        <Square3Stack3DIcon className="w-6 h-6 mr-2" />
        <Link href="/portfolio">
          <h2 className="text-xl">Portfolio</h2>
        </Link>
      </div>
    </div>
  );
};

export default ActiveLinkToggler;
