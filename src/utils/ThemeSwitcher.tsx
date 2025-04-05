"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { toggleTheme, setTheme } from "@/store/actions/ThemeActions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxhook";
import { getCookie, setCookie } from "cookies-next";

export default function ThemeSwitcher() {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.theme);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        let savedTheme = getCookie("theme") as string | undefined;

        if (!savedTheme) {
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            savedTheme = systemPrefersDark ? "dark" : "light";
            setCookie("theme", savedTheme, { maxAge: 60 * 60 * 24 * 7 });
        }

        dispatch(setTheme(savedTheme as "light" | "dark"));
        setMounted(true);
    }, [dispatch]);

    if (!mounted) return null;

    const handleThemeToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        dispatch(toggleTheme());
        setCookie("theme", newTheme, { maxAge: 60 * 60 * 24 * 7 });
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={handleThemeToggle}
                        aria-label={`${theme === "light" ? "dark" : "light"} mode`}
                        className="text-foreground hover:opacity-80 transition-opacity p-2 rounded-md"
                    >
                        {theme === "light" ? <Moon /> : <Sun />}
                    </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
