import React, { ChangeEvent } from "react";
import { InitialAssetType } from "@/redux/features/assets-Slice";
import { useAppSelector } from "@/redux/store";

type SelectDateInputProps = {
  assetObj: InitialAssetType;
  setAssetObj: React.Dispatch<React.SetStateAction<InitialAssetType>>;
};

const SelectDateInput: React.FC<SelectDateInputProps> = (props) => {
  const { assetObj, setAssetObj } = props;

  const handleDateSelection = (e: ChangeEvent<HTMLInputElement>) => {
    setAssetObj((prevState) => ({
      ...prevState,
      date: e.target.value,
    }));
  };

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div
      className={`relative ${
        isDarkMode ? "bg-[#191925]" : "bg-gray-300"
      } rounded-md h-11 w-full`}
    >
      <label
        htmlFor="purchaseDate"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none transition-all duration-300"
      ></label>
      <input
        className={`${
          isDarkMode ? "bg-[#191925] text-white" : "bg-gray-300 text-black"
        } appearance-none border-none focus:outline-none text-sm w-full h-full p-2 pl-4 rounded-md`}
        id="purchaseDate"
        type="date"
        onChange={(e) => handleDateSelection(e)}
      />
    </div>
  );
};

export default SelectDateInput;
