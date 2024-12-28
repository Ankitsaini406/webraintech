'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setTheme, toggleTheme } from '@/store/features/themeSlice';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useSelector((state: RootState) => state.theme.theme);
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