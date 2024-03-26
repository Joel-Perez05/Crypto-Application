import React from "react";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import { InitialAssetType } from "@/redux/features/assets-Slice";
import { useAppSelector } from "@/redux/store";

type SelectPriceInputProps = {
  assetObj: InitialAssetType;
  setAssetObj: React.Dispatch<React.SetStateAction<InitialAssetType>>;
};

const SelectPriceInput: React.FC<SelectPriceInputProps> = (props) => {
  const { assetObj, setAssetObj } = props;

  const handlePurchasePrice = (values: NumberFormatValues) => {
    if (values && values.floatValue !== undefined) {
      const PurchasePrice = values.floatValue!.toFixed(2);
      const formattedPurchasePrice = parseFloat(PurchasePrice);
      setAssetObj((prevState) => ({
        ...prevState,
        purchasePrice: formattedPurchasePrice,
      }));
    } else {
      setAssetObj((prevState) => ({
        ...prevState,
        purchasePrice: 0,
      }));
    }
  };

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div
      className={`relative ${
        isDarkMode ? "bg-custom-dark2 text-white" : "bg-gray-300 text-black"
      } rounded-md h-14 w-full`}
    >
      <label
        htmlFor="purchasePrice"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none transition-all duration-300"
      ></label>
      <NumericFormat
        className={`${
          isDarkMode ? "bg-custom-dark2 text-white" : "bg-gray-300 text-black"
        } appearance-none border-none focus:outline-none focus:ring-2 focus:ring-green-500 text-xl w-full h-full p-2 pl-4 rounded-md`}
        id="purchasePrice"
        placeholder="$0"
        decimalScale={2}
        allowNegative={false}
        allowLeadingZeros={false}
        thousandSeparator=","
        onValueChange={handlePurchasePrice}
      />
    </div>
  );
};

export default SelectPriceInput;
