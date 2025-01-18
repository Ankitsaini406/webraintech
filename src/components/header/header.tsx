
import Link from "next/link";
import Image from "next/image";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";
import { CircleUserRound } from "lucide-react";
import ThemeSwitcher from "@/utils/ThemeSwitcher";

export default function Header() {

    return (
        <header className="sticky top-0 w-full z-20 bg-white dark:bg-black text-foreground p-4 shadow-lg dark:shadow-lg border-none border-gray-200 dark:border-gray-700">
            <div className="h-14 container flex items-center justify-between">

                <Link href='/'>
                    <Image className="w-40 sm:w-60" loading="eager" alt="WeBrainTech" width={250} height={150} src='/weBrain.png' />
                </Link>

                {/* Desktop */}
                <div className="flex gap-3 lg:gap-4 items-start md:items-center">
                    <MainNav />

                    {/* Desktop & mobile */}
                    <h1 className="flex items-center justify-end flex-1 gap-2">
                        <Link href='/'><CircleUserRound /></Link>
                        <ThemeSwitcher />
                    </h1>

                    {/* Mobile */}
                    <MobileNav />
                </div>
            </div>
        </header>
    )
}