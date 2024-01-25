"use client";
import { useState, useEffect } from "react";
import SelectCoinInput from "./SelectCoinInput";
import SelectPriceInput from "./SelectPriceInput";
import SelectDateInput from "./SelectDateInput";

type CoinFormProps = {
  formToggler: boolean;
  setFormToggler: React.Dispatch<React.SetStateAction<boolean>>;
};

const CoinForm: React.FC<CoinFormProps> = (props) => {
  const { formToggler, setFormToggler } = props;

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [coinName, setCoinName] = useState<string>("");
  const [coinPrice, setCoinPrice] = useState<string>("");
  const [coinDate, setCoinDate] = useState<string>("");

  useEffect(() => {
    setIsDisabled(!(coinName && coinPrice && coinDate));
  }, [coinName, coinPrice, coinDate]);

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
      <div className="md:w-2/3 xl:w-2/5 p-6 rounded-2xl bg-custom-dark1 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="flex justify-center">
          <h2 className="text-white text-2xl">Select Coins</h2>
        </div>
        <div className="flex justify-around mt-8">
          <div className="w-1/4 h-56 rounded-md bg-custom-dark2">
            <h2>Coin(Symbol)</h2>
          </div>
          <div className="w-3/5">
            <form className="flex flex-col gap-7">
              <SelectCoinInput coinName={coinName} setCoinName={setCoinName} />
              <SelectPriceInput
                coinPrice={coinPrice}
                setCoinPrice={setCoinPrice}
              />
              <SelectDateInput coinDate={coinDate} setCoinDate={setCoinDate} />
              <div className="flex justify-between">
                <div className="h-14 w-56 text-white bg-custom-dark2 rounded-lg flex justify-center items-center">
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
                  <button className="w-full h-full" disabled={isDisabled}>
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
