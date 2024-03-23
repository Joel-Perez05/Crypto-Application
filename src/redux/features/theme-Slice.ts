import { createSlice } from "@reduxjs/toolkit";

type initialThemeStateType = {
  isDarkMode: boolean;
};

const initialState: initialThemeStateType = {
  isDarkMode: true,
};

const setTheme = (theme: boolean) => {
  localStorage.setItem("theme", JSON.stringify({ isDarkMode: theme }));
};

const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      setTheme(state.isDarkMode);
    },
    getInitialTheme: () => {
      const theme = localStorage.getItem("theme");
      if (theme === null) {
        localStorage.setItem("theme", JSON.stringify(initialState));
      }
    },
  },
});

export const { toggleTheme, getInitialTheme } = theme.actions;
export default theme.reducer;
