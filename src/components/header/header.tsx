import Link from "next/link";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";


export default function Header() {
    return (
        <header className="sticky top-0 w-full bg-red-800 text-white p-4 border-b-0 shadow-lg">
            <div className="h-14 container flex items-center">
            {/* Desktop */}
            <MainNav />


            {/* Mobile */}
            <MobileNav />

            {/* Desktop & mobile */}
            <h1 className="felx items-center justify-end flex-1">
                <Link href='/'>Home</Link>
            </h1>
            </div>
        </header>
    )
}