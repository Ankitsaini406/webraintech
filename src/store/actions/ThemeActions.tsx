'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useSelector((state: RootState) => (state.theme as ThemeState).theme);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // Initialize theme from localStorage
        const savedTheme = localStorage.getItem("theme") as "light" | "dark";
        if (savedTheme) {
            dispatch(setTheme(savedTheme));
        }
        // Apply the theme to the document
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }, [dispatch]);

    useEffect(() => {
        // Sync theme changes to localStorage and document
        localStorage.setItem("theme", theme);
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <div>
            <button onClick={handleToggleTheme} className="p-2">
                Toggle Theme
            </button>
            {children}
        </div>
    );
};

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