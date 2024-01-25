import React from "react";

type SelectCoinInputProps = {
  coinName: string;
  setCoinName: React.Dispatch<React.SetStateAction<string>>;
};

const SelectCoinInput: React.FC<SelectCoinInputProps> = (props) => {
  return (
    <div className="relative bg-custom-dark2 rounded-md h-14 w-full">
      <label
        htmlFor="coinName"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none transition-all duration-300"
      ></label>
      <input
        className="bg-custom-dark2 border-none focus:outline-none focus:ring-2 focus:ring-green-500 text-white text-xl w-full h-full p-2 pl-4 rounded-md"
        id="coinName"
        type="text"
        placeholder="Select Coin"
      />
    </div>
  );
};

export default SelectCoinInput;
