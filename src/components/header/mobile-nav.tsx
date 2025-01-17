import Link from "next/link";
import { AlignJustify } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function MobileNav() {

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
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-xl px-4">Courses</AccordionTrigger>
                                <div className="bg-slate-100 dark:bg-black-opacity-30">
                                    <AccordionContent className="pl-8 pt-4 text-lg">
                                        <Link href='/courses'>All Courses</Link>
                                    </AccordionContent>
                                    <AccordionContent className="pl-8 pt-4 text-lg">Web Technology</AccordionContent>
                                    <AccordionContent className="pl-8 pt-4 text-lg">AI Python</AccordionContent>
                                    <AccordionContent className="pl-8 pt-4 text-lg">Ethical Hacking</AccordionContent>
                                    <AccordionContent className="pl-8 pt-4 text-lg">Digital Marketing</AccordionContent>
                                    <AccordionContent className="pl-8 pt-4 text-lg">Graohic Animation</AccordionContent>
                                    <AccordionContent className="pl-8 pt-4 text-lg">German Language</AccordionContent>
                                    <AccordionContent className="pl-8 pt-4 text-lg">Spoken English</AccordionContent>
                                </div>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-xl px-4">Services</AccordionTrigger>
                                <div className="bg-slate-100 dark:bg-black-opacity-30">
                                    <AccordionContent className="pl-8 pt-4 text-lg">Career Counselling</AccordionContent>
                                    <AccordionContent className="pl-8 pt-4 text-lg">Placement</AccordionContent>
                                </div>
                            </AccordionItem>
                        </Accordion>
                        <Link href="/about-us" className="pl-4 text-xl w-full">About Us</Link>
                        <Link href="/contact-us" className="pl-4 text-xl w-full">Contact Us</Link>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default MobileNav;
