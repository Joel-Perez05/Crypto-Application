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
  purchasePrice: 0,
  currentPrice: 0,
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
    const { coinId, purchasePrice, date } = assetObj;

    const foundCoin = coinData.find((coin: FormData) => coin.name === coinId);

    if (foundCoin) {
      setAssetObj((prevState) => {
        if (prevState.currentPrice !== foundCoin.current_price) {
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

    const areInputsFilled = coinId && purchasePrice !== 0 && date;
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
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
      <div
        className={`${
          isDarkMode ? "bg-custom-dark1" : "bg-white"
        } md:w-2/3 xl:w-2/5 p-6 rounded-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50`}
      >
        <div
          className={`${
            isDarkMode ? "text-white" : "text-black"
          } flex justify-center`}
        >
          <h2 className="text-2xl">Select Coins</h2>
        </div>
        <div className="flex justify-around mt-8">
          <CoinSelectPreview selectedCoin={selectedCoin} />
          <div className="w-3/5">
            <form onSubmit={submitHandler} className="flex flex-col gap-7">
              <SelectCoinInput
                coinNameList={coinNameList}
                assetObj={assetObj}
                setAssetObj={setAssetObj}
              />
              <SelectPriceInput assetObj={assetObj} setAssetObj={setAssetObj} />
              <SelectDateInput assetObj={assetObj} setAssetObj={setAssetObj} />
              <div className="flex justify-between">
                <div
                  className={`h-14 w-56 ${
                    isDarkMode
                      ? "text-white bg-custom-dark2"
                      : "text-black bg-gray-300"
                  } rounded-lg flex justify-center items-center`}
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
                    isDisabled
                      ? "bg-green-900 text-gray-500"
                      : "text-white bg-green-500"
                  } h-14 w-56  rounded-lg flex justify-center items-center`}
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
