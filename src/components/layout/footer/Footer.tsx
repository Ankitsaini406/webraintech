
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { NewsLetter } from "@/utils/FormFields";
import { Facebook, Instagram, Linkedin, X, Youtube } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AppDispatch, RootState } from "@/store/store";
import { updateNewsLetter } from "@/store/actions/NewsLetterActions";
import { toast } from "sonner";
import ThankYouDialog from "../../dialogs/Thankyou";

function Footer() {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const newsletterState = useSelector((state: RootState) => state.newsletter);
    const { loading, error } = newsletterState;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return;
        }

        dispatch(updateNewsLetter(email)).unwrap().then(() => {
            setShowDialog(true);
            setEmail('');
        }).catch((err) => {
            toast.error(err.message || 'Failed to subscribe to newsletter');
        });
    }


    return (
        <>
            <footer className="mt-auto w-full bg-[ghostwhite] dark:bg-black p-4 sm:p-8">
                <div className="flex flex-col gap-4 md:gap-8 justify-around items-center sm:items-start">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-0 w-full items-start sm:justify-around">
                        <div className="w-full md:w-auto flex items-center flex-col justify-around md:items-start gap-4">
                            <div className="flex flex-col gap-4 items-center md:items-start">
                                <Image className="sm:h-full" src='/favicon.png' alt="WeBrainTech" width={100} height={100} />
                                <p>Acedmic vencher of <Link href={'https://eduengine.in/'} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-red-500 hover:underline hover:underline-offset-4 transition-all duration-300">Eduengine Technologies Pvt. Ltd.</Link></p>
                            </div>
                            {/* Social Media Section */}
                            <div className="flex flex-col gap-4">
                                <h5 className="font-semibold text-lg sm:text-xl">Follow Us</h5>
                                <div className="flex flex-wrap gap-4 sm:gap-6">
                                    <Link href='https://www.facebook.com/webraintech.in'>
                                        <Facebook className="cursor-pointer hover:text-red-500 transition duration-300 text-xl sm:text-2xl" />
                                    </Link>
                                    <Link href='https://www.instagram.com/webraintech.in/'>
                                        <Instagram className="cursor-pointer hover:text-red-500 transition duration-300 text-xl sm:text-2xl" />
                                    </Link>
                                    <Link href='https://x.com/Webraintechin'>
                                        <X className="cursor-pointer hover:text-red-500 transition duration-300 text-xl sm:text-2xl" />
                                    </Link>
                                    <Link href='https://www.linkedin.com/company/webraintech/'>
                                        <Linkedin className="cursor-pointer hover:text-red-500 transition duration-300 text-xl sm:text-2xl" />
                                    </Link>
                                    <Link href='https://www.youtube.com/@webraintech'>
                                        <Youtube className="cursor-pointer hover:text-red-500 transition duration-300 text-xl sm:text-2xl" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Newsletter Subscription */}
                        <div className="w-full md:w-auto flex justify-center">
                            <NewsLetter
                                email={email}
                                setEmail={setEmail}
                                loading={loading}
                                error={error as string}
                                onSubmit={handleSubmit}
                            />
                        </div>
                    </div>

                    {/* Desktop and other large screens */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full items-start sm:justify-around">
                        <div className="hidden md:flex flex-col gap-2 sm:gap-4 items-start">
                            <h5 className="font-bold text-xl sm:text-2xl">Courses</h5>
                            <Link className="hover:text-red-500 transition-all duration-300" href='/courses' >Web Technlogy</Link>
                            <Link className="hover:text-red-500 transition-all duration-300" href='/courses' >AI Python</Link>
                            <Link className="hover:text-red-500 transition-all duration-300" href='/courses' >Ethical Hacking</Link>
                            <Link className="hover:text-red-500 transition-all duration-300" href='/courses' >Digital Marketing</Link>
                            <Link className="hover:text-red-500 transition-all duration-300" href='/courses' >Graphic Animation</Link>
                            <Link className="hover:text-red-500 transition-all duration-300" href='/courses' >German Language</Link>
                            <Link className="hover:text-red-500 transition-all duration-300" href='/courses' >Spoken English</Link>
                        </div>

                        <div className="hidden md:flex flex-col gap-2 sm:gap-4 items-start">
                            <h5 className="font-bold text-xl sm:text-2xl">Ouick Links</h5>
                            <Link className="hover:text-red-500 transition-all duration-300" href='/about-us' >Abouts Us</Link>
                            <Link className="hover:text-red-500 transition-all duration-300" href='/contact-us' >Contact Us</Link>
                            <Link className="hover:text-red-500 transition-all duration-300" href='/' >Support Center</Link>
                            <Link className="hover:text-red-500 transition-all duration-300" href='/' >Blog Post</Link>
                            <Link className="hover:text-red-500 transition-all duration-300" href='/' >Careers</Link>
                        </div>

                        <div className="hidden md:flex flex-col gap-2 sm:gap-4 items-start">
                            <h5 className="font-bold text-xl sm:text-2xl">Connect With Us</h5>
                            <Link className="hover:text-red-500 transition-all duration-300" href='/' >Events</Link>
                            <Link className="hover:text-red-500 transition-all duration-300" href='/' >Testimonials</Link>
                            <Link className="hover:text-red-500 transition-all duration-300" href='/' >Resources</Link>
                            <Link className="hover:text-red-500 transition-all duration-300" href='/' >FAQs</Link>
                        </div>
                    </div>

                    {/* Mobile and other small screens */}
                    <div className="flex md:hidden flex-col gap-4 w-full mb-8">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-base py-4">Courses</AccordionTrigger>
                                <AccordionContent className="pl-8 pt-4 text-lg">
                                    <Link className="hover:text-red-500 transition-all duration-300" href="/"><AccordionContent>Web Technlogy</AccordionContent></Link>
                                    <Link className="hover:text-red-500 transition-all duration-300" href="/"><AccordionContent>AI Python</AccordionContent></Link>
                                    <Link className="hover:text-red-500 transition-all duration-300" href="/"><AccordionContent>Ethical Hacking</AccordionContent></Link>
                                    <Link className="hover:text-red-500 transition-all duration-300" href="/"><AccordionContent>Digital Marketing</AccordionContent></Link>
                                    <Link className="hover:text-red-500 transition-all duration-300 pb-4" href="/"><AccordionContent>Graphic Animation</AccordionContent></Link>
                                    <Link className="hover:text-red-500 transition-all duration-300 pb-4" href="/"><AccordionContent>German Language</AccordionContent></Link>
                                    <Link className="hover:text-red-500 transition-all duration-300 pb-4" href="/"><AccordionContent>Spoken English</AccordionContent></Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-base py-4">Quick Links</AccordionTrigger>
                                <AccordionContent className="pl-8 pt-4 text-lg">
                                    <Link className="hover:text-red-500 transition-all duration-300" href="/about-us"><AccordionContent>About Us</AccordionContent></Link>
                                    <Link className="hover:text-red-500 transition-all duration-300" href="/contact-us"><AccordionContent>Contact Us</AccordionContent></Link>
                                    <Link className="hover:text-red-500 transition-all duration-300" href="/"><AccordionContent>Support Center</AccordionContent></Link>
                                    <Link className="hover:text-red-500 transition-all duration-300" href="/"><AccordionContent>Blog Post</AccordionContent></Link>
                                    <Link className="hover:text-red-500 transition-all duration-300 pb-4" href="/"><AccordionContent>Careers</AccordionContent></Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
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
                        <Link className="underline underline-offset-2 hover:text-red-500 hover:underline hover:underline-offset-4 transition-all duration-300" href='/privacy-policy' >Privacy Policy</Link>
                        <Link className="underline underline-offset-2 hover:text-red-500 hover:underline hover:underline-offset-4 transition-all duration-300" href='/terms-and-conditions' >Terms of Service</Link>
                        {/* <Link className="underline underline-offset-2 hover:text-red-500 hover:underline hover:underline-offset-4 transition-all duration-300" href='/'>Cookies Settings</Link> */}
                    </div>
                </div>
            </footer>
            <ThankYouDialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
                title="🎉 Thank you for subscribing! 🎉"
                description="Thank you for subscribing! Get ready for the latest courses, trends, and tips straight to your inbox. Stay tuned for exciting updates! 🚀"
                gifUrl="/tank-you.gif"
            />
        </>
    );
}

export default Footer;