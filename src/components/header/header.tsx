'use client';

import Link from "next/link";
import Image from "next/image";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";
import { CircleUserRound, Moon, Sun } from "lucide-react";
import { useTheme } from "@/Theme/ThemeContext";


export default function Header() {

    const { theme, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 w-full z-10 bg-white dark:bg-black text-foreground p-4 shadow-lg dark:shadow-lg border-none border-gray-200 dark:border-gray-700">
            <div className="h-14 container flex items-center justify-between">

                <Link href='/'>
                    <Image alt="WeBrainTech" width={50} height={50} src='/favicon.ico' />
                </Link>

                {/* Desktop */}
                <div className="flex gap-3 lg:gap-4 items-start">
                    <MainNav />

                    {/* Desktop & mobile */}
                    <h1 className="flex items-center justify-end flex-1 gap-2">
                        <Link href='/'><CircleUserRound /></Link>
                        <button onClick={toggleTheme}
                            className="text-foreground ">
                            {theme === "light" ? <Moon /> : <Sun />}
                        </button>
                    </h1>

                    {/* Mobile */}
                    <MobileNav />
                </div>
            </div>
        </header>
    )
}