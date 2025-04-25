'use client';

import { useState, useRef, useEffect } from "react";

function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const testimonials = [
        {
            rating: "★★★★★",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
            name: "Jane Doe",
            title: "Software Engineer, TechCorp",
        },
        {
            rating: "★★★★★",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
            name: "John Smith",
            title: "Product Manager, Innovate Inc.",
        },
        {
            rating: "★★★★★",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
            name: "Emily Johnson",
            title: "CEO, StartupX",
        },
        {
            rating: "★★★★★",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
            name: "Alice Brown",
            title: "UX Designer, CreativeCo",
        },
        {
            rating: "★★★★★",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
            name: "Bob Green",
            title: "CTO, Tech Solutions",
        },
    ];

    const scrollToIndex = (index: number) => {
        const container = scrollContainerRef.current;
        if (container) {
            const childWidth = container.scrollWidth / testimonials.length;
            container.scrollTo({
                left: childWidth * index,
                behavior: "smooth",
            });
            setCurrentIndex(index);
        }
    };

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % testimonials.length;
        scrollToIndex(newIndex);
    };

    // Auto-slide every 10 seconds
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval); // Cleanup on component unmount
    }, [currentIndex]);

    return (
        <div className="container my-7 p-4 sm:p-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Testimonials</h2>
            <h4 className="text-lg sm:text-xl mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h4>
            <div className="relative">
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-scroll w-full snap-mandatory snap-x scroll-smooth h-72 items-center"
                >
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="border p-4 border-black dark:border-white bg-white dark:bg-black flex flex-col w-[calc(100%/1-1rem)] shrink-0 sm:w-[calc(100%/3-1rem)] snap-center cursor-pointer hover:border-red-500 dark:hover:border-red-500 duration-150"
                        >
                            <div className="text-red-500 pb-2 sm:pb-4 text-xl">{testimonial.rating}</div>
                            <div className="pb-2 sm:pb-4">{testimonial.text}</div>
                            <h5>{testimonial.name}</h5>
                            <h6>{testimonial.title}</h6>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default TestimonialsSection;
