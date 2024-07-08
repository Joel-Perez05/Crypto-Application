import { createSlice } from "@reduxjs/toolkit";

type InitialThemeStateType = {
  isDarkMode: boolean;
};

const getInitialTheme = (): InitialThemeStateType => {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return JSON.parse(storedTheme);
    }
  }
  return { isDarkMode: true };
};

const initialState = getInitialTheme();

const setTheme = (theme: boolean) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", JSON.stringify({ isDarkMode: theme }));
  }
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      setTheme(state.isDarkMode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
