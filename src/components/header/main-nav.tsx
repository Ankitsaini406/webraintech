import Link from "next/link";


function MainNav() {
    return (
        <div className="hidden md:flex items-center gap-3 lg:gap-4">

            <nav className="flex items-center gap-3 lg:gap-4">
                <Link href='/'>Home</Link>
                <Link href='/'>Projects</Link>
                <Link href='/'>Course</Link>
            </nav>
        </div>
    )
}

export default MainNav;
