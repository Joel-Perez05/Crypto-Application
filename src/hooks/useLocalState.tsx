import { useState } from "react";

export function useLocalState<T>(
  key: string,
  initialVal: T
): [T, (value: T) => void] {
  const storedVal = window.localStorage.getItem(key);
  const item = storedVal ? JSON.parse(storedVal) : initialVal;
  const [state, setState] = useState<T>(item);

  const updateState = (value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setState(value);
  };

  return [state, updateState];
}
