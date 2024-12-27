
import Link from "next/link";
import { usePathname  } from "next/navigation";

function MainNav() {
    const pathname  = usePathname (); // Get current route

    return (
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <nav className="flex items-center gap-3 lg:gap-4">
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <Link
                            href="/"
                            className={`p-2 border-2 transition duration-300 transform 
                                ${pathname === '/' ? 'text-red-500 border-red-500' : 'border-transparent hover:border-red-500'}`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={`p-2 border-2 transition duration-300 transform 
                                ${pathname === '/about' ? 'text-red-500 border-red-500' : 'border-transparent hover:border-red-500'}`}
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/services"
                            className={`p-2 border-2 transition duration-300 transform 
                                ${pathname === '/services' ? 'text-red-500 border-red-500' : 'border-transparent hover:border-red-500'}`}
                        >
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className={`p-2 border-2 transition duration-300 transform 
                                ${pathname === '/contact' ? 'text-red-500 border-red-500' : 'border-transparent hover:border-red-500'}`}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default MainNav;
