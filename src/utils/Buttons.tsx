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
    type?: "button" | "submit" | "reset" | undefined;
}

export function LoadingSpinner({ className = "text-white" }) {
    return (
        <svg
            className={`animate-spin mr-2 h-5 w-5 ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
        </svg>
    );
}

export function ButtonWhite({ title, className, isLoading = false, type = "button" }: ButtonBlackProps) {
    return (
        <Button
            variant='outline'
            disabled={isLoading}
            type={type}
            className={cn(
                "cursor-pointer p-2 px-8 border transition-all duration-300 transform hover:scale-105",
                className)}
        >
            {isLoading && <LoadingSpinner/>}
            {title}
        </Button>
    );
}

export function ButtonBlack({ title, className, isLoading = false }: ButtonBlackProps) {
    return (
        <Button
            variant='default'
            disabled={isLoading}
            className={cn(
                "p-2 px-8 border border-transparent transition-all duration-300 transform hover:scale-105 cursor-pointer",
                className
            )}
        >
            {isLoading && <LoadingSpinner />}
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
        const buttonClass = `flex gap-2 transition-all duration-300 transform hover:scale-105 cursor-pointer ${className}`;

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
            className={`cursor-pointer w-auto sm:w-40 ${disabled ? 'bg-zinc-500' : 'bg-red-500'} ${disabled ? '' : 'hover:bg-red-600'} text-white px-4 py-2 rounded-md  transition ${className}`}
        >
            {disabled ? <span className="flex items-center"><LoadingSpinner /> {title}</span>: title}
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
                className={`${disabled ? 'bg-zinc-500' : 'bg-red-500'} ${disabled ? '' : 'hover:bg-red-600'} cursor-pointer text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 ${className}`}
            >
                {disabled ? <span className="flex items-center"><LoadingSpinner /> {title}</span>: title}
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
