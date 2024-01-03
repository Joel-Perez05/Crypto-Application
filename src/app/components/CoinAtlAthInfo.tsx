"use client";

import { CoinType } from "../coin/[id]/page";

type MarketDataPropsType = {
  market_data?: CoinType["market_data"];
};

const CoinAtlAthInfo: React.FC<MarketDataPropsType> = (props) => {
  console.log(props.market_data);

  return (
    <div className="text-white bg-custom-dark2 w-80 h-64 rounded-2xl flex items-center justify-evenly flex-col"></div>
  );
};

export default CoinAtlAthInfo;

// const [ath, setAth] = useState<AthAtlType>();
// const [athPercent, setAthPercent] = useState<AthAtlPercentType>();
// const [athDate, setAthDate] = useState<AthAtlDateType>();
// const [atl, setAtl] = useState<AthAtlType>();
// const [atlPercent, setAtlPercent] = useState<AthAtlPercentType>();
// const [atlDate, setAtlDate] = useState<AthAtlDateType>();

// setAth(res.data.market_data.ath);
// setAthPercent(res.data.market_data.ath_change_percentage);
// setAthDate(res.data.market_data.ath_date);
// setAtl(res.data.market_data.atl);
// setAtlPercent(res.data.market_data.atl_change_percentage);
// setAtlDate(res.data.market_data.atl_date);
