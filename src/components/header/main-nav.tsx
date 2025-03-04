import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

function MainNav() {
    const pathname = usePathname();

    const courses = [
        { title: "Web Technology", href: "/" },
        { title: "AI Python", href: "/" },
        { title: "Ethical Hacking", href: "/" },
        { title: "Digital Marketing", href: "/" },
        { title: "Graphic Animation", href: "/" },
        { title: "German Language", href: "/" },
        { title: "Spoken English", href: "/" },
    ];

    const services = [
        { title: "Career Counselling", href: "/" },
        { title: "Placement", href: "/placement" },
    ];

    return (
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <nav className="flex items-center gap-6 lg:gap-8">
                <ul className="hidden md:flex space-x-6 items-center">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger
                                    className={`rounded-none !py-5 border-2 transition duration-300 transform !bg-white dark:!bg-black
                                    ${pathname === '/courses' ? 'text-red-500 border-red-500' : 'border-transparent hover:border-red-500 text-base hover:!bg-white dark:hover:!bg-black'}`}
                                >
                                    Courses
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[300px] gap-3 p-4 md:w-[450px] md:grid-cols-2">
                                        {courses.map((course) => (
                                            <Link
                                                key={course.title}
                                                href={course.href}
                                                className="text-base hover:text-red-500"
                                            >
                                                {course.title}
                                            </Link>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger
                                    className={`rounded-none !py-5 border-2 transition duration-300 transform !bg-white dark:!bg-black
                                    ${pathname === '/services' ? 'text-red-500 border-red-500' : 'border-transparent hover:border-red-500 text-base hover:!bg-white dark:hover:!bg-black'}`}
                                >
                                    Services
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[300px] gap-3 p-4 md:w-[450px] md:grid-cols-2">
                                        {services.map((service) => (
                                            <Link
                                                key={service.title}
                                                href={service.href}
                                                className="text-base hover:text-red-500"
                                            >
                                                {service.title}
                                            </Link>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem className={`p-2 border-2 transition duration-300 transform 
                                    ${pathname === '/about-us' ? 'text-red-500 border-red-500' : 'border-transparent hover:border-red-500'}`}>
                                <Link href="/about-us" legacyBehavior passHref>
                                    <NavigationMenuLink>
                                        About Us
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem className={`p-2 border-2 transition duration-300 transform 
                                    ${pathname === '/contact-us' ? 'text-red-500 border-red-500' : 'border-transparent hover:border-red-500'}`}>
                                <Link href="/contact-us" legacyBehavior passHref>
                                    <NavigationMenuLink>
                                        Contact Us
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </ul>
            </nav>
        </div>
    );
}

export default MainNav;
