import Link from "next/link";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";


export default function Header() {
    return (
        <header className="sticky top-0 w-full bg-red-800 text-white p-4 shadow-lg border-b-0">
            <div className="h-14 container flex items-center justify-between">

            <Link href='/'>
                <Image alt="WeBrainTech" width={50} height={50} src='/favicon.ico' />
            </Link>

                {/* Desktop */}
                <div className="flex gap-3 lg:gap-4 items-start">
                <MainNav />

                {/* Desktop & mobile */}
                <h1 className="flex items-center justify-end flex-1">
                    <Link href='/'><CircleUserRound /></Link>
                </h1>

                {/* Mobile */}
                <MobileNav />
                </div>
            </div>
        </header>
    )
}