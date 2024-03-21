"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon } from "@heroicons/react/20/solid";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

const ActiveLinkToggler = () => {
  const pathName = usePathname();
  const isActiveHome = pathName === "/";
  const isActivePortfolio = pathName === "/portfolio";

  return (
    <div className="text-white flex items-center justify-between">
      <div
        className={`w-1/2 flex items-center ${
          isActiveHome ? "text-white" : "text-gray-500"
        }`}
      >
        <HomeIcon className="w-6 h-6 mr-2" />
        <Link href="/">
          <h2 className="text-xl">Home</h2>
        </Link>
      </div>
      <div
        className={`w-1/2 flex items-center ${
          isActivePortfolio ? "text-white" : "text-gray-500"
        }`}
      >
        <Square3Stack3DIcon className="w-12 h-12 mr-2" />
        <Link href="/portfolio">
          <h2 className="text-xl">Portfolio</h2>
        </Link>
      </div>
    </div>
  );
};

export default ActiveLinkToggler;
