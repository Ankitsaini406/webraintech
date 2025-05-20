"use client";

import Image from "next/image";
import { useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BuyButton } from "@/utils/Buttons";
import { Button } from "@/components/ui/button";
import { Course } from "@/types/types";
import RichTextPreview from "@/utils/Editor/RichTextPreview";

export default function CoursePage({ course }: { course: Course }) {
    const enrollButtonRef = useRef<HTMLButtonElement | null>(null);

    const scrollToEnroll = () => {
        if (enrollButtonRef.current) {
            enrollButtonRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest"
            });
        }
    };

    return (
        <div>
            {
                !course ? (
                    <>
                        <Skeleton className="w-full h-[500px]" />
                        <div className="container mx-auto p-4 sm:p-8">
                            <div className="flex justify-between gap-8 flex-col md:flex-row">
                                <Skeleton className="w-full" />
                                <Skeleton className="border w-full max-w-[500px] aspect-video" />
                            </div>
                            <Skeleton className="mt-4 h-[50px] w-full md:w-1/2 mx-auto" />
                            <Skeleton className="mt-4 h-[50px] w-full md:w-1/2 mx-auto" />
                            <Skeleton className="mt-4 h-[50px] w-full md:w-1/2 mx-auto" />

                            <Skeleton className="w-3/4 h-[300px] my-6 mx-auto" />

                            <Skeleton className="mt-4 h-[50px] w-full md:w-1/2 mx-auto" />
                            <Skeleton className="mt-4 h-[50px] w-full md:w-1/2 mx-auto" />
                            <Skeleton className="mt-4 h-[50px] w-full md:w-1/2 mx-auto" />
                        </div>
                    </>
                ) : (
                    <>

                        {/* Courses Banner */}
                        <div className="relative bg-linear-to-b from-transparent to-black/30 aspect-square w-full h-[500px] overflow-hidden">
                            {/* Image */}
                            <Image
                                className="object-cover h-full hover:scale-105 transition-transform duration-300"
                                src={course.bannerImage}
                                alt={course.title}
                                title={course.title}
                                fill
                            />

                            {/* Overlay with course name and button */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full">
                                <h2 className="text-4xl font-bold mb-4">{course.title}</h2>
                                <Button className="bg-red-500 hover:bg-red-600 text-xl font-bold px-10 py-6 dark:text-white" onClick={scrollToEnroll}>Enroll Now</Button>
                            </div>
                        </div>

                        <div className="container mx-auto p-4 sm:p-8">

                            {/* Course Introduction */}
                            <div className="flex justify-between gap-8 flex-col xl:flex-row">
                                <p className="text-xl first-letter:text-5xl first-letter:font-bold first-letter:text-red-500 leading-8">
                                    {course.description}
                                </p>
                                {/* <div className="relative bg-linear-to-b from-transparent to-black/30 border w-full lg:min-w-[500px] h-[300px] aspect-video">Video</div> */}
                            </div>

                            {/* Course Chapters */}
                            <div className="my-8">
                                <h3 className="text-3xl font-bold mb-4">Course Critique</h3>
                                <Accordion type="single" collapsible className="w-full md:w-3/4 lg:w-1/2 m-auto">
                                    {course.chapters.map((item, index) => (
                                        <AccordionItem key={item.id} value={item.id}>
                                            <AccordionTrigger className="text-xl">{`${index + 1}. ${item.title}`}</AccordionTrigger>
                                            <AccordionContent className="text-lg px-4"><RichTextPreview lexicalJson={item.description} /></AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>

                            <BuyButton ref={enrollButtonRef} title="Enroll Now" />

                            {/* Course Teacher */}
                            {course.teacher && (
                                <div className="mt-20 mb-10 w-full lg:w-11/12 xl:w-3/4 mx-auto flex flex-col md:flex-row justify-between gap-8">
                                    <div className="relative bg-linear-to-b from-transparent to-black/30 border w-full max-w-[500px] aspect-video">Photo</div>
                                    <div>
                                        <h4 className="text-2xl font-bold mb-4">{course.teacher.name}</h4>
                                        <p className="leading-6">{course.teacher.brief}</p>
                                    </div>
                                </div>
                            )}

                            {/* Course FAQ'S */}
                            <div className="my-8">
                                <h3 className="text-2xl font-bold my-4">FAQ&apos;S</h3>
                                <Accordion type="single" collapsible className="w-full">
                                    {course.faqs.map((item, index) => (
                                        <AccordionItem key={item.id} value={item.id}>
                                            <AccordionTrigger className="text-xl">{`${index + 1}. ${item.question}`}</AccordionTrigger>
                                            <AccordionContent className="text-lg px-4">{item.answer}</AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}