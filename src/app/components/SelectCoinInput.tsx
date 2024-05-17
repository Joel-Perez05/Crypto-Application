import React, { ChangeEvent } from "react";
import { InitialAssetType } from "@/redux/features/assets-Slice";
import { useAppSelector } from "@/redux/store";

type SelectCoinInputProps = {
  coinNameList: string[];
  assetObj: InitialAssetType;
  setAssetObj: React.Dispatch<React.SetStateAction<InitialAssetType>>;
};

const SelectCoinInput: React.FC<SelectCoinInputProps> = (props) => {
  const { assetObj, setAssetObj, coinNameList } = props;

  const handleCoinSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    const coinName = e.target.value;
    setAssetObj((prevState) => ({
      ...prevState,
      coinId: coinName,
    }));
  };

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div
      className={`relative ${
        isDarkMode ? "bg-[#191925] text-white" : "bg-gray-300 text-black"
      } rounded-md h-11 w-full`}
    >
      <label
        htmlFor="coinName"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none transition-all duration-300"
      ></label>
      <select
        className={`${
          isDarkMode ? "bg-[#191925] text-white" : "bg-gray-300 text-black"
        } border-none focus:outline-none text-sm w-full h-full p-2 pl-4 rounded-md`}
        name="coinName"
        id="coinName"
        placeholder="Select Coin"
        onChange={(e) => handleCoinSelection(e)}
      >
        <option
          className={`text-sm ${isDarkMode ? "text-white" : "text-black"}`}
          value=""
        >
          Select Coin
        </option>
        {coinNameList.map((coin) => {
          return (
            <option
              className={`text-sm ${isDarkMode ? "text-white" : "text-black"}`}
              key={coin}
              value={coin}
            >
              {coin}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectCoinInput;
