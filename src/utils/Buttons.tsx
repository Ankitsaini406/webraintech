import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// White Button component
export function ButtonWhite({ title }: { title: string }) {
    return (
        <button className="p-2 px-8 border border-black dark:border-white bg-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:border-black dark:hover:text-black hover:bg-black hover:text-white text-black transition-all duration-300 transform hover:scale-105">
            {title}
        </button>
    );
}

// Black Button component
export function ButtonBlack({ title }: { title: string }) {
    return (
        <button className="p-2 px-8 border border-transparent bg-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:border-white dark:hover:text-white hover:bg-white hover:text-black hover:border-black text-white transition-all duration-300 transform hover:scale-105">
            {title}
        </button>
    );
}

// ButtonLink component with forwardRef support for both button and link
export const ButtonLink = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, {
    title: string;
    href?: string;
    className?: string;
    onClick?: () => void;
}>(
    ({ title, href, className, onClick }, ref) => {
        const buttonClass = `flex gap-2 transition-all duration-300 transform hover:scale-105 ${className}`;

        if (href) {
            return (
                <Link ref={ref as React.Ref<HTMLAnchorElement>} className={buttonClass} href={href}>
                    {title}<ArrowRight />
                </Link>
            );
        } else {
            return (
                <button ref={ref as React.Ref<HTMLButtonElement>} className={buttonClass} onClick={onClick}>
                    {title}<ArrowRight />
                </button>
            );
        }
    }
);

ButtonLink.displayName = "ButtonLink";
