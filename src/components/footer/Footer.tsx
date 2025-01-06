import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Facebook, Instagram, Linkedin, X, Youtube, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


function Footer() {
    return (
        <footer className="mt-auto w-full bg-[ghostwhite] dark:bg-black p-4 sm:p-8">
            <div className=" container flex flex-col gap-8 sm:flex-row justify-around items-center sm:items-start">
                <div className="flex flex-row sm:flex-col gap-4 sm:gap-8 items-center sm:items-start">
                    <Image className="h-12 w-12 sm:h-full" src='/favicon.ico' alt="WeBrainTech" width={100} height={100} />
                    <div className="flex flex-col gap-2 sm:gap-4 items-start">
                        <h5 className="font-bold text-xl sm:text-2xl">Follow Us</h5>
                        <div className="flex flex-row gap-4 sm:gap-8">
                            <Facebook className="cursor-pointer hover:text-red-500 transition-all duration-300" />
                            <Instagram className="cursor-pointer hover:text-red-500 transition-all duration-300" />
                            <X className="cursor-pointer hover:text-red-500 transition-all duration-300" />
                            <Linkedin className="cursor-pointer hover:text-red-500 transition-all duration-300" />
                            <Youtube className="cursor-pointer hover:text-red-500 transition-all duration-300" />
                        </div>
                    </div>
                </div>

                {/* Desktop and other large screens */}
                <div className="hidden sm:flex flex-col gap-2 sm:gap-4 items-start">
                    <h5 className="font-bold text-xl sm:text-2xl">Ouick Links</h5>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >Abouts Us</Link>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >Contact Us</Link>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >Support Center</Link>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >Blog Post</Link>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >Careers</Link>
                </div>

                <div className="hidden sm:flex flex-col gap-2 sm:gap-4 items-start">
                    <h5 className="font-bold text-xl sm:text-2xl">Connect With Us</h5>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >Events</Link>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >Testimonials</Link>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >Resources</Link>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >FAQs</Link>
                </div>

                {/* Mobile and other small screens */}
                <div className="flex sm:hidden flex-col gap-4 w-full mb-8">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1" className="flex flex-col gap-4 border-b border-black dark:border-white">
                            <AccordionTrigger className="flex justify-between items-center font-bold text-xl sm:text-2xl group w-full">
                                Quick Links
                                <ChevronDown
                                    className="ml-2 h-5 w-5 text-black dark:text-white group-data-[state=open]:rotate-180 transition-transform duration-300"
                                />
                            </AccordionTrigger>
                            <AccordionContent className="flex sm:hidden flex-col gap-2 sm:gap-4 items-start">
                                <Link className="hover:text-red-500 transition-all duration-300" href="/">About Us</Link>
                                <Link className="hover:text-red-500 transition-all duration-300" href="/">Contact Us</Link>
                                <Link className="hover:text-red-500 transition-all duration-300" href="/">Support Center</Link>
                                <Link className="hover:text-red-500 transition-all duration-300" href="/">Blog Post</Link>
                                <Link className="hover:text-red-500 transition-all duration-300 pb-4" href="/">Careers</Link>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-2" className="flex flex-col gap-4 border-b border-black dark:border-white">
                            <AccordionTrigger className="flex justify-between items-center font-bold text-xl sm:text-2xl group w-full">
                                Connect With Us
                                <ChevronDown
                                    className="ml-2 h-5 w-5 text-black dark:text-white group-data-[state=open]:rotate-180 transition-transform duration-300"
                                />
                            </AccordionTrigger>
                            <AccordionContent className="flex sm:hidden flex-col gap-2 sm:gap-4 items-start">
                                <Link className="hover:text-red-500 transition-all duration-300" href="/">Events</Link>
                                <Link className="hover:text-red-500 transition-all duration-300" href="/">Testimonials</Link>
                                <Link className="hover:text-red-500 transition-all duration-300" href="/">Resources</Link>
                                <Link className="hover:text-red-500 transition-all duration-300 pb-4" href="/">FAQs</Link>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

            </div>
            <hr className="hidden sm:block my-4 sm:my-6 dark:border-white border-black"></hr>
            <div className="flex justify-between flex-col-reverse items-center gap-4 sm:gap-0 sm:flex-row">
                <p className="sm:text-sm text-center text-xs">© 2024 WeBrainTech. All rights reserved.</p>
                <div className="flex flex-row flex-wrap gap-2 sm:gap-6">
                    <Link className="underline underline-offset-2 hover:text-red-500 hover:underline hover:underline-offset-4 transition-all duration-300" href='/' >Privacy Policy</Link>
                    <Link className="underline underline-offset-2 hover:text-red-500 hover:underline hover:underline-offset-4 transition-all duration-300" href='/' >Terms of Service</Link>
                    <Link className="underline underline-offset-2 hover:text-red-500 hover:underline hover:underline-offset-4 transition-all duration-300" href='/'>Cookies Settings</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;