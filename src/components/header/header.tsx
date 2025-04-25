import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";
import { CircleUserRound } from "lucide-react";
import ThemeSwitcher from "@/utils/ThemeSwitcher";
import { getCookie } from "cookies-next";
import { decodeToken } from "@/utils/jwt";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/actions/UserActions";
import { AppDispatch, RootState } from "@/store/store";
import { Users } from "@/utils/InitialState";

export default function Header() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        const token = getCookie("authToken");
        if (token) {
            const decodedToken = decodeToken(token as string) as Users;
            if (decodedToken && typeof decodedToken !== "string") {
                dispatch(setUser(decodedToken));
            }
        }
    }, [dispatch]);

    return (
        <header className="sticky top-0 bg-background dark:bg-foreground w-full z-30 p-4 shadow-lg dark:shadow-lg border-none border-gray-200 dark:border-gray-700">
            <div className="h-14 flex items-center justify-between">
                <Link href="/">
                    <Image className="w-40 sm:w-56" loading="eager" alt="WeBrainTech" width={250} height={150} src="/weBrain.png" priority />
                </Link>
                <div className="flex gap-3 lg:gap-4 items-baseline md:items-center">
                    <MainNav />
                    <h1 className="flex items-center justify-end flex-1 gap-2">
                        <Link href={user ? "/profile" : "/auth/login"}>
                            <CircleUserRound />
                        </Link>
                        <ThemeSwitcher />
                    </h1>
                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
