import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

interface ThemeState {
    theme: Theme;
}

const initialState: ThemeState = {
    theme: "light", // Default theme
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            const newTheme = state.theme === "light" ? "dark" : "light";
            state.theme = newTheme;
            // Update the HTML class
            document.documentElement.classList.toggle("dark", newTheme === "dark");
        },
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
            // Update the HTML class
            document.documentElement.classList.toggle("dark", action.payload === "dark");
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
