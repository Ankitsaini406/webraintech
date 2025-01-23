
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";
import { CircleUserRound } from "lucide-react";
import ThemeSwitcher from "@/utils/ThemeSwitcher";
import { getCookie } from "cookies-next";
import { decodeToken } from "@/utils/jwt";
import { Users } from "@/utils/InitialState";

export default function Header() {

    const [user, setUser] = useState<Users | null>(null);

    useEffect(() => {
        const token = getCookie("authToken");
        if (token) {
            const decodedToken = decodeToken(token as string);
            if (decodedToken && typeof decodedToken !== 'string') {
                setUser(decodedToken as Users);
            }
        }
    }, []);

    return (
        <header className="sticky top-0 w-full z-20 bg-white dark:bg-black text-foreground p-4 shadow-lg dark:shadow-lg border-none border-gray-200 dark:border-gray-700">
            <div className="h-14 flex items-center justify-between">

                <Link href='/'>
                    <Image className="w-40 sm:w-56" loading="eager" alt="WeBrainTech" width={250} height={150} src='/weBrain.png' priority />
                </Link>

                {/* Desktop */}
                <div className="flex gap-3 lg:gap-4 items-start md:items-center">
                    <MainNav />

                    {/* Desktop & mobile */}
                    <h1 className="flex items-center justify-end flex-1 gap-2">
                            <Link href={user ? "/profile" : "/auth/students/login"}>
                                <CircleUserRound />
                            </Link>
                        <ThemeSwitcher />
                    </h1>
                    {/* Mobile */}
                    <MobileNav />
                </div>
            </div>
        </header>
    )
}