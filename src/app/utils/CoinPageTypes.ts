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
    ath: CurrencyNumberType;
    ath_change_percentage: CurrencyNumberType;
    ath_date: CurrencyStringType;
    atl: CurrencyNumberType;
    atl_change_percentage: CurrencyNumberType;
    atl_date: CurrencyStringType;
    current_price: CurrencyNumberType;
    market_cap: CurrencyNumberType;
    fully_diluted_valuation: CurrencyNumberType;
    total_volume: CurrencyNumberType;
    high_24h: CurrencyNumberType;
    price_change_percentage_24h?: number;
    market_cap_change_percentage_24h?: number;
    circulating_supply?: number;
    total_supply?: number;
    max_supply?: number;
  };
};

export type CurrencyNumberType = {
  [key: string]: number;
};

type CurrencyStringType = {
  [key: string]: string;
};

export type CoinPriceType = {
  prices?: Array<[number, number]>;
};

export type FormCoin = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  image: string;
};

export type FormData = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  image: string;
};

export type PortfolioCoinData = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
};

export type MarketOverviewTypes = {
  active_cryptocurrencies: number | undefined;
  markets: number | undefined;
  market_cap_change_percentage_24h_usd: number | undefined;
  market_cap_percentage: MarketSubTypes;
};

type MarketSubTypes = {
  [key: string]: number | undefined;
};

export type MarketPercentageTypes = {
  btc: number | undefined;
  eth: number | undefined;
};

export type SearchBarNamesTypes = {
  name: string;
};

export type CurrencySelect = {
  value: string;
  label: string;
  symbol: string;
};

type SparklinePrice = {
  price: [number];
};

export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  market_cap: number;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  circulating_supply: number;
  total_supply: number;
  sparkline_in_7d: SparklinePrice;
  [key: string]: number | string | SparklinePrice;
};
