import { createSlice } from "@reduxjs/toolkit";

type InitialThemeStateType = {
  isDarkMode: boolean;
};

let initialState: InitialThemeStateType = { isDarkMode: true };

if (typeof window !== "undefined") {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    initialState = JSON.parse(storedTheme);
  }
}

const setTheme = (theme: boolean) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", JSON.stringify({ isDarkMode: theme }));
  }
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
