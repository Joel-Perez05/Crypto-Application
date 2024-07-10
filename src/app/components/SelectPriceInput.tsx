import React from "react";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import { InitialAssetType } from "@/redux/features/assets-Slice";

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
        purchasedAmount: formattedPurchasePrice,
      }));
    } else {
      setAssetObj((prevState) => ({
        ...prevState,
        purchasedAmount: 0,
      }));
    }
  };

  return (
    <div
      className={`relative dark:bg-[#191925] dark:text-white bg-white text-black rounded-md h-11 w-full`}
    >
      <label
        htmlFor="purchasedAmount"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none transition-all duration-300"
      ></label>
      <NumericFormat
        className={`dark:bg-[#191925] dark:text-white bg-white text-black appearance-none border-none focus:outline-none text-sm w-full h-full p-2 pl-4 rounded-md`}
        id="purchasedAmount"
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
