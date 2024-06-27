import React from "react";
import Link from "next/link";

const CoinConverterToggle: React.FC = () => {
  return (
    <div className="w-506 h-53 flex justify-center items-center text-white bg-[#191925] rounded-lg">
      <div className={`w-244 h-45 rounded-md bg-[#6161d686]`}>
        <Link href="/">
          <button className="text-center w-full h-full">Coins</button>
        </Link>
      </div>
      <div className={`w-244 h-45 rounded-md bg-[#232336]`}>
        <Link href="/convertor">
          <button className="text-center w-full h-full">Convertor</button>
        </Link>
      </div>
    </div>
  );
};

export default CoinConverterToggle;
