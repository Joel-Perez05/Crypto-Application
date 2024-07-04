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

  return (
    <div className="flex items-center h-48 w-265 justify-between">
      <div
        className={`w-110 flex items-center p-4 ${
          isActiveHome ? "dark:text-white text-[#353570]" : "text-gray-500"
        }`}
      >
        <HomeIcon className="w-6 h-6 mr-2" />
        <Link href="/">
          <h2>Home</h2>
        </Link>
      </div>
      <div
        className={`w-131 flex items-center p-4 ${
          isActivePortfolio ? "dark:text-white text-[#353570]" : "text-gray-500"
        }`}
      >
        <Square3Stack3DIcon className="w-6 h-6 mr-2" />
        <Link href="/portfolio">
          <h2>Portfolio</h2>
        </Link>
      </div>
    </div>
  );
};

export default ActiveLinkToggler;
