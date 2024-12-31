import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ButtonWhite({ title }: { title: string }) {
    return (
        <button className="p-2 px-8 border border-black dark:border-white bg-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:border-black dark:hover:text-black hover:bg-black hover:text-white text-black transition-all duration-300 transform hover:scale-105">
            {title}
        </button>
    );
}

export function ButtonBlack({ title }: { title: string }) {
    return (
        <button className="p-2 px-8 border border-transparent bg-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:border-white dark:hover:text-white hover:bg-white hover:text-black hover:border-black text-white transition-all duration-300 transform hover:scale-105">
            {title}
        </button>
    )
}

export function ButtonLink({title, className}: {title: string, className?: string}) {
    return (
        <Link className={`flex gap-2 transition-all duration-300 transform hover:scale-105 ${className}`} href='/' >{title}<ArrowRight /></Link>
    )
}
