import React, { ChangeEvent } from "react";
import { InitialAssetType } from "@/redux/features/assets-Slice";

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

  return (
    <div className="relative bg-custom-dark2 rounded-md h-14 w-full">
      <label
        htmlFor="purchaseDate"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none transition-all duration-300"
      ></label>
      <input
        className="bg-custom-dark2 appearance-none border-none focus:outline-none focus:ring-2 focus:ring-green-500 text-white text-xl w-full h-full p-2 pl-4 rounded-md"
        id="purchaseDate"
        type="date"
        onChange={(e) => handleDateSelection(e)}
      />
    </div>
  );
};

export default SelectDateInput;
