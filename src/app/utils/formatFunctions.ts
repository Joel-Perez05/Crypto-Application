import numeral from "numeral";
import { format } from "date-fns";

export const convertToShorterNum = (num: number | undefined) => {
  if (num !== undefined) {
    if (num >= 1000000000000) {
      return numeral(num / 1000000000000).format("0.00") + "T";
    } else if (num >= 1000000000) {
      return numeral(num / 1000000000).format("0.00") + "B";
    } else if (num >= 1000000) {
      return numeral(num / 1000000).format("0.00") + "M";
    } else if (num >= 100000) {
      return numeral(num / 100000).format("0.00") + "K";
    } else {
      return numeral(num).format("0,0");
    }
  }
};

export const formatToNearestTenth = (num: number | undefined) => {
  if (num !== undefined) {
    return numeral(num).format("0.00");
  }
};

export const formatToNearestWhole = (num: number | undefined) => {
  if (num !== undefined) {
    return numeral(num).format("0");
  }
};

export const getTotalVol = (
  vol: number | undefined,
  price: number | undefined
) => {
  if (vol !== undefined && price !== undefined) {
    return numeral(vol / price).format("00,000");
  }
};

export const getVolToMarket = (
  vol: number | undefined,
  market: number | undefined
) => {
  if (vol !== undefined && market !== undefined) {
    return numeral(vol / market).format("0.000000");
  }
};

export const getMarketToVolume = (
  market: number | undefined,
  vol: number | undefined
) => {
  if (vol !== undefined && market !== undefined) {
    return numeral((vol / market) * 100).format("0.00");
  }
};

export const getCircVsMax = (
  circ: number | undefined,
  max: number | undefined
) => {
  if (circ !== undefined && max !== undefined) {
    return numeral((circ / max) * 100).format("0.00");
  }
};

export const getCircVsMaxWhole = (
  circ: number | undefined,
  max: number | undefined
) => {
  if (circ !== undefined && max !== undefined) {
    return numeral((circ / max) * 100).format("00");
  }
};

export const dateFormatter = (date: string) => {
  return format(new Date(date), "MM.dd.yyyy");
};

export const convertMarketCap = (num: number | undefined) => {
  if (num !== undefined) {
    if (num >= 1000000000000) {
      return numeral(num).format("000,000,000,000,000");
    } else if (num >= 1000000000) {
      return numeral(num).format("000,000,000,000");
    } else if (num >= 1000000) {
      return numeral(num).format("000,000,000");
    } else if (num >= 100000) {
      return numeral(num).format("000,000");
    } else {
      return numeral(num).format("0,0");
    }
  }
};

export const coinPageDateFormat = (date: string | undefined) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  const dayOfWeek = format(parsedDate, "eee");
  const day = format(parsedDate, "dd");
  const month = format(parsedDate, "MMM");
  const year = format(parsedDate, "yyyy");
  const time = format(parsedDate, "HH:mm:ss");

  return `${dayOfWeek}, ${day} ${month} ${year} ${time} GMT`;
};
