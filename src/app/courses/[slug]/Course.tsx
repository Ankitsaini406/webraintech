"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { getCourse } from "@/actions/GetCourse";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Course {
    title: string;
    image: string;
    bannerImage: string;
    intro: string;
    description: string;
}

export default function CoursePage() {
    const { slug } = useParams();
    const [course, setCourse] = useState<Course | null>(null);

    useEffect(() => {
        if (!slug) return;

        const fetchCourse = async () => {
            const data = await getCourse(slug as string);
            if (data) {
                setCourse(data);
            }
        };

        fetchCourse();
    }, [slug]);

    return (
        <div>
            {
                !course ? (
                    <>
                        <Skeleton className="w-full h-[500px]" />
                        <div className="container p-4 sm:p-8">
                            <div className="flex justify-between gap-8 flex-col md:flex-row">
                                <Skeleton className=" w-full h-" />
                                <Skeleton className="border w-full max-w-[500px] aspect-video" />
                            </div>
                            <Skeleton className="my-8 h-[500px] w-full" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-gradient-to-b from-transparent to-black/30 aspect-square w-full h-[500px] overflow-hidden relative z-10">
                            <Image className="object-cover h-full hover:scale-105 transition-transform duration-300" src={course.bannerImage} alt={course.bannerImage} title={course.bannerImage} fill />
                        </div>
                        <div className="container p-4 sm:p-8">
                            <div className="flex justify-between gap-8 flex-col md:flex-row">
                                <p className="">{course.intro}</p>
                                <div className="border w-full max-w-[500px] aspect-video">Video</div>
                            </div>
                            <p className="my-8 text-xl first-letter:text-5xl first-letter:font-bold first-letter:text-red-500 leading-8">
                                {course.description}
                            </p>
                            <Accordion type="single" collapsible className="w-full md:w-3/4 lg:w-1/2 m-auto" >
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>1. Introduction</AccordionTrigger>
                                        <AccordionContent>

                                        </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-2">
                                    <AccordionTrigger>2. HTML</AccordionTrigger>
                                        <AccordionContent>

                                        </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-3">
                                    <AccordionTrigger>3. CSS</AccordionTrigger>
                                        <AccordionContent>

                                        </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </>
                )
            }
        </div>
    )
}