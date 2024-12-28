"use client";

import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "@/store/features/themeSlice";

export default function ThemeSwitcher() {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <button
            onClick={() => dispatch(toggleTheme())}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="text-foreground hover:opacity-80 transition-opacity"
        >
            {theme === "light" ? <Moon /> : <Sun />}
        </button>
    );
}
