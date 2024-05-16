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
      <h2
        className={`${isDarkMode ? "text-white" : "text-black"} w-101 text-2xl`}
      >
        Portfolio
      </h2>
      <button
        className="w-244 max-sm:mt-4 h-45 shadow-md shadow-[#7878FA]/50 text-white border border-[#7878FA] rounded-md bg-[#6161d67e] text-md"
        onClick={() => setFormToggler(!formToggler)}
      >
        Add Asset
      </button>
    </div>
  );
};

export default FormToggler;
