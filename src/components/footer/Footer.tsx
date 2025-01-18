import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Facebook, Instagram, Linkedin, X, Youtube } from "lucide-react";
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
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-base py-4">Quick Links</AccordionTrigger>
                            <AccordionContent className="pl-8 pt-4 text-lg">
                                <Link className="hover:text-red-500 transition-all duration-300" href="/about-us"><AccordionContent>About Us</AccordionContent></Link>
                                <Link className="hover:text-red-500 transition-all duration-300" href="/contact-us"><AccordionContent>Contact Us</AccordionContent></Link>
                                <Link className="hover:text-red-500 transition-all duration-300" href="/"><AccordionContent>Support Center</AccordionContent></Link>
                                <Link className="hover:text-red-500 transition-all duration-300" href="/"><AccordionContent>Blog Post</AccordionContent></Link>
                                <Link className="hover:text-red-500 transition-all duration-300 pb-4" href="/"><AccordionContent>Careers</AccordionContent></Link>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger className="text-base py-4">Connect With Us</AccordionTrigger>
                            <AccordionContent className="pl-8 pt-4 text-lg">
                                <Link className="hover:text-red-500 transition-all duration-300" href="/"><AccordionContent>Events</AccordionContent></Link>
                                <Link className="hover:text-red-500 transition-all duration-300" href="/"><AccordionContent>Testimonials</AccordionContent></Link>
                                <Link className="hover:text-red-500 transition-all duration-300" href="/"><AccordionContent>Resources</AccordionContent></Link>
                                <Link className="hover:text-red-500 transition-all duration-300 pb-4" href="/"><AccordionContent>FAQs</AccordionContent></Link>
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