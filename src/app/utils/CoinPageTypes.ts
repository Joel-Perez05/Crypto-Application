export type CoinType = {
  id: string;
  symbol?: string;
  name?: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  links?: {
    homepage: string;
    blockchain_site: string;
  };
  description?: {
    en?: string;
  };
  market_data?: {
    ath: {
      usd?: number;
    };
    ath_change_percentage: {
      usd?: number;
    };
    ath_date: {
      usd?: string;
    };
    atl: {
      usd?: number;
    };
    atl_change_percentage: {
      usd?: number;
    };
    atl_date: {
      usd?: string;
    };
    current_price: {
      usd?: number;
    };
    price_change_percentage_24h?: number;
    market_cap: {
      usd?: number;
    };
    market_cap_change_percentage_24h?: number;
    fully_diluted_valuation: {
      usd?: number;
    };
    total_volume: {
      usd?: number;
    };
    high_24h: {
      usd?: number;
    };
    circulating_supply?: number;
    max_supply?: number;
  };
};

export type CoinPriceType = {
  prices?: Array<[number, number]>;
};
