import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

function MainNav() {
    const pathname = usePathname();

    const courses = [
        { title: "Web Technology", href: "/courses" },
        { title: "AI Python", href: "/courses" },
        { title: "Ethical Hacking", href: "/courses" },
        { title: "Digital Marketing", href: "/courses" },
        { title: "Graphic Animation", href: "/courses" },
        { title: "German Language", href: "/courses" },
        { title: "Spoken English", href: "/courses" },
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
                                <Link href="/about-us">
                                        About Us
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem className={`p-2 border-2 transition duration-300 transform 
                                    ${pathname === '/contact-us' ? 'text-red-500 border-red-500' : 'border-transparent hover:border-red-500'}`}>
                                <Link href="/contact-us">
                                        Contact Us
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
