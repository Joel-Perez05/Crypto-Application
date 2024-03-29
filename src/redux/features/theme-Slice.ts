import { createSlice } from "@reduxjs/toolkit";

type initialThemeStateType = {
  isDarkMode: boolean;
};

const storedTheme = localStorage.getItem("theme");

const initialState: initialThemeStateType = storedTheme
  ? JSON.parse(storedTheme)
  : { isDarkMode: true };

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
  },
});

export const { toggleTheme } = theme.actions;
export default theme.reducer;
