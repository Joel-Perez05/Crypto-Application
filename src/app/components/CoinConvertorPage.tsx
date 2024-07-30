"use client";
import ConvertorLineGraph from "./ConvertorLineGraph";
import CoinConvertor from "./CoinConvertor";
import ConverterChartInterval from "./ConverterChartInterval";

const CoinConvertorPage: React.FC = () => {
  return (
    <div className="w-1296 h-724 mt-14 flex flex-col justify-between">
      <CoinConvertor />
      <div className="w-full h-375 flex flex-col justify-between">
        <ConvertorLineGraph />
        <ConverterChartInterval />
      </div>
    </div>
  );
};
export default CoinConvertorPage;
