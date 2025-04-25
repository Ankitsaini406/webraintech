import React, { forwardRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RefreshCcw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonBlackProps {
    title: string;
    className?: string;
    isLoading?: boolean;
}

export function ButtonWhite({ title, className, isLoading = false }: ButtonBlackProps) {
    return (
        <Button
            disabled={isLoading}
            className={cn(
                "p-2 px-8 border border-black dark:border-white bg-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:border-black dark:hover:text-black hover:bg-black hover:text-white text-black transition-all duration-300 transform hover:scale-105",
                className)}
        >
            {isLoading && <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>}
            {title}
        </Button>
    );
}

export function ButtonBlack({ title, className, isLoading = false }: ButtonBlackProps) {
    return (
        <Button
            disabled={isLoading}
            className={cn(
                "p-2 px-8 border border-transparent bg-black dark:bg-[ghostwhite] dark:text-black dark:hover:bg-black dark:hover:border-white dark:hover:text-white hover:bg-[ghostwhite] hover:text-black hover:border-black text-white transition-all duration-300 transform hover:scale-105",
                className
            )}
        >
            {isLoading && <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>}
            {title}
        </Button>
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

export function FormButton({ title, disabled, className }: { title: string; disabled?: boolean; className?: string }) {
    return (
        <button
            disabled={disabled}
            type="submit"
            className={`w-auto sm:w-40 ${disabled ? 'bg-zinc-500' : 'bg-red-500'} ${disabled ? '' : 'hover:bg-red-600'} text-white px-4 py-2 rounded-md  transition ${className}`}
        >
            {disabled ? "Loading..." : title}
        </button>
    );
}

export const BuyButton = forwardRef<
    HTMLButtonElement,
    {
        title: string;
        disabled?: boolean;
        className?: string;
    }
>(({ title, disabled, className }, ref) => {
    return (
        <div className="my-8 text-center">
            <button
                ref={ref}  // Pass ref here to forward it to the button element
                disabled={disabled}
                className={`${disabled ? 'bg-zinc-500' : 'bg-red-500'} ${disabled ? '' : 'hover:bg-red-600'} text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 ${className}`}
            >
                {disabled ? "Please Wait..." : title}
            </button>
        </div>
    );
});

BuyButton.displayName = "BuyButton";

export default function RefreshButton({ handleRefresh }: { handleRefresh: () => void }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={handleRefresh}
                        className="p-2 rounded-full hover:bg-gray-200 transition"
                    >
                        <RefreshCcw />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Refresh</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
