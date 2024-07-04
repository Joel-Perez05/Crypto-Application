"use client";
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const ThemeToggler = () => {
  const [darkmode, setDarkmode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("themee") === "dark";
    }
    return true;
  });

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("themee", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("themee", "light");
    }
  }, [darkmode]);

  return (
    <div className="flex items-center justify-center border-2 rounded-md border-white dark:border-[#212140] h-48 w-48">
      <button
        className="dark:bg-[#191925] bg-[#ccccfa63] h-full w-full flex justify-center items-center rounded-md"
        onClick={() => setDarkmode(!darkmode)}
      >
        {darkmode ? (
          <SunIcon className="w-6 h-6 text-white" />
        ) : (
          <MoonIcon className="w-6 h-6 text-black" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggler;
