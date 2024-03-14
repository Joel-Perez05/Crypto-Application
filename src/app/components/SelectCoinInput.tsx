import React, { ChangeEvent } from "react";
import { InitialAssetType } from "@/redux/features/assets-Slice";

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

  return (
    <div className="relative bg-custom-dark2 rounded-md h-14 w-full">
      <label
        htmlFor="coinName"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none transition-all duration-300"
      ></label>
      <select
        className="bg-custom-dark2 border-none focus:outline-none focus:ring-2 focus:ring-green-500 text-white text-xl w-full h-full p-2 pl-4 rounded-md"
        name="coinName"
        id="coinName"
        placeholder="Select Coin"
        onChange={(e) => handleCoinSelection(e)}
      >
        <option value="">Select Coin</option>
        {coinNameList.map((coin, idx) => {
          return (
            <option key={idx} value={coin}>
              {coin}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectCoinInput;
