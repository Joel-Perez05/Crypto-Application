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
      [key: string]: number;
    };
    ath_change_percentage: {
      [key: string]: number;
    };
    ath_date: {
      [key: string]: string;
    };
    atl: {
      [key: string]: number;
    };
    atl_change_percentage: {
      [key: string]: number;
    };
    atl_date: {
      [key: string]: string;
    };
    current_price: {
      [key: string]: number;
    };
    market_cap: {
      [key: string]: number;
    };
    fully_diluted_valuation: {
      [key: string]: number;
    };
    total_volume: {
      [key: string]: number;
    };
    high_24h: {
      [key: string]: number;
    };
    price_change_percentage_24h?: number;
    market_cap_change_percentage_24h?: number;
    circulating_supply?: number;
    max_supply?: number;
  };
};

export type CoinPriceType = {
  prices?: Array<[number, number]>;
};
