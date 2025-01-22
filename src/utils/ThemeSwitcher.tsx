"use client";

import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "@/store/slices/themeSlice";

export default function ThemeSwitcher() {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <button
            onClick={() => dispatch(toggleTheme())}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="relative group text-foreground hover:opacity-80 transition-opacity"
        >
            <span className="absolute top-8 right-0 bg-gray-800 dark:bg-slate-100 dark:text-black text-white p-1 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {theme === "light" ? <span>Dark&nbsp;Mode</span> : <span>Light&nbsp;Mode</span>}
            </span>
            {theme === "light" ? <Moon /> : <Sun />}
        </button>
    );
}
