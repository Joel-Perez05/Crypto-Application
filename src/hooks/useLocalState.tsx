import { useState, useEffect } from "react";

function getWindow(): Window | null {
  return typeof window !== "undefined" ? window : null;
}

export function useLocalState<T>(
  key: string,
  initialVal: T
): [T, (value: T) => void] {
  const windowObject = getWindow();
  if (!windowObject || !windowObject.localStorage) {
    return [initialVal, () => {}];
  }
  const storedVal = windowObject
    ? windowObject.localStorage.getItem(key)
    : null;
  let item: T;
  try {
    item = storedVal ? JSON.parse(storedVal) : initialVal;
  } catch (error) {
    console.error(`Error parsing local storage for key "${key}";`, error);
    item = initialVal;
  }

  const [state, setState] = useState<T>(item);

  useEffect(() => {
    if (windowObject) {
      windowObject.localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state, windowObject]);

  const updateState = (value: T) => {
    if (windowObject) {
      windowObject.localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    }
  };

  return [state, updateState];
}
