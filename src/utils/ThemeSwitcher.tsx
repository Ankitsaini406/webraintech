"use client";

import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "@/store/actions/ThemeActions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ThemeSwitcher() {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => dispatch(toggleTheme())}
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
