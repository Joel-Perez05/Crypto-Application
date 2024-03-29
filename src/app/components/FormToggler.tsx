"use client";
import React from "react";
import { useAppSelector } from "@/redux/store";

type FormTogglerProps = {
  formToggler: boolean;
  setFormToggler: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormToggler: React.FC<FormTogglerProps> = (props) => {
  const { formToggler, setFormToggler } = props;

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div className="flex justify-between items-center mt-14">
      <h2 className={`${isDarkMode ? "text-white" : "text-black"} text-3xl`}>
        Portfolio
      </h2>
      <button
        className="w-72 h-12 shadow-md shadow-cyan-500/50 rounded-xl bg-cyan-500 text-white text-xl border border-green-500 hover:bg-custom-dark2 hover:border-white"
        onClick={() => setFormToggler(!formToggler)}
      >
        Add Asset
      </button>
    </div>
  );
};

export default FormToggler;
