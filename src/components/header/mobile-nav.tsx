import Link from "next/link";
import { AlignJustify } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function MobileNav() {

    const courses = [
        {
            title: "All Courses",
            href: '/courses'
        },
        {
            title: "Web Technology",
            href: "/",
        },
        {
            title: "AI Python",
            href: "/",
        },
        {
            title: "Ethical Hacking",
            href: "/",
        },
        {
            title: "Digital Marketing",
            href: "/",
        },
        {
            title: "Graphic Animation",
            href: "/",
        },
        {
            title: "German Language",
            href: "/",
        },
        {
            title: "Spoken English",
            href: "/",
        },
    ];

    const services = [
        {
            title: "Career Counselling",
            href: "/",
        },
        {
            title: "Placement",
            href: "/placement" ,
        },
    ]

    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger>
                    <AlignJustify className="w-6 h-6 text-foreground" />
                </SheetTrigger>
                <SheetContent className="p-0">
                    <SheetHeader>
                        <SheetTitle></SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>

                    {/* Mobile Menu Links */}
                    <div className="space-y-4 flex flex-col items-center mt-10">
                        <Accordion type="single" collapsible className="w-full mt-0">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-xl px-4">Courses</AccordionTrigger>
                                <div className="bg-slate-100 dark:bg-black-opacity-30">
                                    {courses.map((course, index) => (
                                        <AccordionContent key={index} className="pl-8 pt-4 text-lg">{course.title}</AccordionContent>
                                    ))}
                                </div>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-xl px-4">Services</AccordionTrigger>
                                <div className="bg-slate-100 dark:bg-black-opacity-30">
                                    {services.map((service, index) => (
                                        <AccordionContent key={index} className="pl-8 pt-4 text-lg">{service.title}</AccordionContent>
                                    ))}
                                </div>
                            </AccordionItem>
                        </Accordion>
                        <Link href="/about-us" className="!mt-0 pl-4 py-4 text-xl w-full">About Us</Link>
                        <Link href="/contact-us" className="!mt-0 pl-4 py-4 text-xl w-full">Contact Us</Link>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default MobileNav;
