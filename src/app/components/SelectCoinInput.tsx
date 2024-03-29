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
        isDarkMode ? "bg-custom-dark2 text-white" : "bg-gray-300 text-black"
      } rounded-md h-14 w-full`}
    >
      <label
        htmlFor="coinName"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none transition-all duration-300"
      ></label>
      <select
        className={`${
          isDarkMode ? "bg-custom-dark2 text-white" : "bg-gray-300 text-black"
        } border-none focus:outline-none focus:ring-2 focus:ring-green-500 text-xl w-full h-full p-2 pl-4 rounded-md`}
        name="coinName"
        id="coinName"
        placeholder="Select Coin"
        onChange={(e) => handleCoinSelection(e)}
      >
        <option
          className={`${isDarkMode ? "text-white" : "text-black"}`}
          value=""
        >
          Select Coin
        </option>
        {coinNameList.map((coin, idx) => {
          return (
            <option
              className={`${isDarkMode ? "text-white" : "text-black"}`}
              key={idx}
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
