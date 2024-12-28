import { Facebook, Instagram, Linkedin, X, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


function Footer() {
    return (
        <footer className="w-full bg-background dark:bg-black bg-neutral-200 p-4 sm:p-8">
            <div className="flex flex-col gap-8 sm:flex-row justify-around items-center sm:items-start">
                <div className="flex flex-col gap-2 sm:gap-4 items-center sm:items-start">
                <Image className="h-full" src='/favicon.ico' alt="WeBrainTech" width={100} height={100} />
                <div className="flex flex-col gap-2 sm:gap-4 items-center sm:items-start">
                    <h5 className="font-bold text-xl sm:text-2xl">Follow Us</h5>
                    <div className="flex flex-row gap-4 sm:gap-8">
                    <Facebook className="cursor-pointer hover:text-red-500 transition-all duration-300"/>
                    <Instagram className="cursor-pointer hover:text-red-500 transition-all duration-300"/>
                    <X className="cursor-pointer hover:text-red-500 transition-all duration-300"/>
                    <Linkedin className="cursor-pointer hover:text-red-500 transition-all duration-300"/>
                    <Youtube className="cursor-pointer hover:text-red-500 transition-all duration-300"/>
                    </div>
                </div>
                </div>
                <div className="flex flex-col gap-2 sm:gap-4 items-center sm:items-start">
                    <h5 className="font-bold text-xl sm:text-2xl">Ouick Links</h5>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >Abouts Us</Link>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >Contact Us</Link>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >Support Center</Link>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >Blog Post</Link>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >Careers</Link>
                </div>
                <div className="flex flex-col gap-2 sm:gap-4 items-center sm:items-start">
                    <h5 className="font-bold text-xl sm:text-2xl">Connect With Us</h5>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >Events</Link>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >Testimonials</Link>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >Resources</Link>
                    <Link className="hover:text-red-500 transition-all duration-300" href='/' >FAQs</Link>
                </div>
            </div>
            <hr className="my-4 sm:my-6 dark:border-white border-black"></hr>
            <div className="flex justify-between flex-col-reverse items-center gap-4 sm:gap-0 sm:flex-row">
                <p className="sm:text-sm text-center text-xs">© 2024 WeBrainTech. All rights reserved.</p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                    <Link className="underline underline-offset-2 hover:text-red-500 hover:underline hover:underline-offset-4 transition-all duration-300" href='/' >Privacy Policy</Link>
                    <Link className="underline underline-offset-2 hover:text-red-500 hover:underline hover:underline-offset-4 transition-all duration-300" href='/' >Terms of Service</Link>
                    <Link className="underline underline-offset-2 hover:text-red-500 hover:underline hover:underline-offset-4 transition-all duration-300" href='/'>Cookies Settings</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;