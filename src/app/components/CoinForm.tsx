"use client";
import React, { useState, useEffect, use } from "react";
import SelectCoinInput from "./SelectCoinInput";
import SelectPriceInput from "./SelectPriceInput";
import SelectDateInput from "./SelectDateInput";
import { InitialAssetType, addNewAsset } from "@/redux/features/assets-Slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { FormCoin, FormData } from "../utils/CoinPageTypes";
import CoinSelectPreview from "./CoinSelectPreview";
import { useAppSelector } from "@/redux/store";

type CoinFormProps = {
  coinData: FormData[];
  formToggler: boolean;
  setFormToggler: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialAssetState: InitialAssetType = {
  coinId: "",
  purchasedAmount: 0,
  priceWhenPurchased: 0,
  date: "",
};

const initialSelectedCoin = {
  coin: "",
  img: "",
  symbol: "",
};

const CoinForm: React.FC<CoinFormProps> = (props) => {
  const { formToggler, setFormToggler, coinData } = props;
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [assetObj, setAssetObj] = useState(initialAssetState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [coinNameList, setCoinNameList] = useState<string[]>([]);
  const [selectedCoin, setSelectedCoin] = useState(initialSelectedCoin);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsLoading(true);
    const nameList: string[] = coinData
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((coin: FormCoin) => coin.name);
    setCoinNameList(nameList);
  }, [coinData]);

  useEffect(() => {
    const { coinId, purchasedAmount, date } = assetObj;

    const foundCoin = coinData.find((coin: FormData) => coin.name === coinId);

    if (foundCoin) {
      setAssetObj((prevState) => {
        if (prevState.priceWhenPurchased !== foundCoin.current_price) {
          return {
            ...prevState,
            currentPrice: foundCoin.current_price,
          };
        }
        return prevState;
      });

      setSelectedCoin((prevState) => ({
        ...prevState,
        coin: foundCoin.name,
        img: foundCoin.image,
        symbol: foundCoin.symbol,
      }));
    }

    const areInputsFilled = coinId && purchasedAmount !== 0 && date;
    setIsDisabled(!areInputsFilled);
  }, [assetObj, coinData]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addNewAsset(assetObj));
    setFormToggler(!formToggler);
  };

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-[#262437] opacity-30 z-50"></div>
      <div
        className={`${
          isDarkMode ? "bg-[#13121A]" : "bg-white"
        } w-886 h-393 p-12 rounded-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50`}
      >
        <div
          className={`${
            isDarkMode ? "text-white" : "text-black"
          } flex justify-between w-790 h-6`}
        >
          <h2 className="text-sm">Select Coins</h2>
          <div className="h-6 w-6 flex justify-center items-center text-sm border border-white rounded-full">
            <button
              className="h-full w-full relative bottom-0.5"
              onClick={() => setFormToggler(!formToggler)}
            >
              x
            </button>
          </div>
        </div>
        <div className="flex justify-between w-790 h-241 mt-8">
          <CoinSelectPreview selectedCoin={selectedCoin} />
          <div className="w-461 h-full">
            <form onSubmit={submitHandler} className="flex flex-col gap-4">
              <SelectCoinInput
                coinNameList={coinNameList}
                assetObj={assetObj}
                setAssetObj={setAssetObj}
              />
              <SelectPriceInput assetObj={assetObj} setAssetObj={setAssetObj} />
              <SelectDateInput assetObj={assetObj} setAssetObj={setAssetObj} />
              <div className="flex justify-between mt-4">
                <div
                  className={`h-45 w-222.5 ${
                    isDarkMode
                      ? "text-white bg-[#232336]"
                      : "text-black bg-gray-300"
                  } rounded-md flex justify-center items-center`}
                >
                  <button
                    className="w-full h-full"
                    onClick={() => setFormToggler(!formToggler)}
                  >
                    Close
                  </button>
                </div>
                <div
                  className={`${
                    isDisabled ? "bg-[#6161d648]" : " bg-[#6161d67e]"
                  } h-45 text-white w-222.5 rounded-md flex justify-center items-center`}
                >
                  <button
                    type="submit"
                    className="w-full h-full"
                    disabled={isDisabled}
                  >
                    Save and Continue
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinForm;
