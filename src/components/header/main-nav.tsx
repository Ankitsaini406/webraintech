
import Link from "next/link";
import { usePathname  } from "next/navigation";

function MainNav() {
    const pathname  = usePathname ();

    return (
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <nav className="flex items-center gap-3 lg:gap-4">
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <Link
                            href="/courses"
                            className={`p-2 border-2 transition duration-300 transform 
                                ${pathname === '/courses' ? 'text-red-500 border-red-500' : 'border-transparent hover:border-red-500'}`}
                        >
                            Courses
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
                            href="/about-us"
                            className={`p-2 border-2 transition duration-300 transform 
                                ${pathname === '/about-us' ? 'text-red-500 border-red-500' : 'border-transparent hover:border-red-500'}`}
                        >
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact-us"
                            className={`p-2 border-2 transition duration-300 transform 
                                ${pathname === '/contact-us' ? 'text-red-500 border-red-500' : 'border-transparent hover:border-red-500'}`}
                        >
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default MainNav;
