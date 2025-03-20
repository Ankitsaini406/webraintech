"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Item {
    title: string;
    description: string;
    image: string;
    href: string;
}

interface HorizontalScrollProps {
    data: Item[];
}

export function HorizontalScroll({ data }: HorizontalScrollProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollPosition = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", checkScrollPosition);
            checkScrollPosition();
        }
        return () => {
            if (container) container.removeEventListener("scroll", checkScrollPosition);
        };
    }, []);

    return (
        <div className="relative flex items-center">
            {/* Left Scroll Button */}
            {canScrollLeft && (
                <button
                    onClick={scrollLeft}
                    className="hidden absolute -left-5 z-20 w-10 h-10 bg-red-500 text-white shadow-md rounded-full cursor-pointer lg:flex items-center justify-center hover:bg-gray-200 dark:hover:bg-zinc-600 transition-all"
                >
                    <ArrowLeft />
                </button>
            )}

            {/* Scrollable Content */}
            <div
                ref={scrollContainerRef}
                className="relative flex gap-4 sm:gap-8 overflow-x-auto w-full scroll-smooth no-scrollbar"
            >
                {data.map((item) => (
                    <Link href={item.href} key={item.title} className="z-10 w-60 sm:w-60 lg:w-96 flex-shrink-0 flex flex-col items-start cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300 p-4">
                        <div className="bg-gradient-to-b from-transparent to-black/30 aspect-square w-full overflow-hidden relative z-10">
                            <Image className="object-cover h-full hover:scale-105 transition-transform duration-300" src={item.image} alt={item.title} width={720} height={300} />
                        </div>
                        <h3 className="py-2 sm:py-4 text-base sm:text-xl font-bold">{item.title}</h3>
                        <h4>{item.description}</h4>
                    </Link>
                ))}
            </div>

            {/* Right Scroll Button */}
            {canScrollRight && (
                <button
                    onClick={scrollRight}
                    className="hidden absolute -right-5 z-20 w-10 h-10 bg-red-500 text-white shadow-md rounded-full cursor-pointer lg:flex items-center justify-center hover:bg-gray-200 dark:hover:bg-zinc-600 transition-all"
                >
                    <ArrowRight />
                </button>
            )}
        </div>
    );
}
