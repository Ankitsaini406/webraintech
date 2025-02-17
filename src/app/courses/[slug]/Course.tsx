"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { getCourse } from "@/actions/GetCourse";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BuyButton } from "@/utils/Buttons";

interface Course {
    id: string;
    title: string;
    slug: string;
    image: string;
    bannerImage: string;
    intro: string;
    description: string;
    price: number;
    certification: string;
    introVideo?: string;
    thumbnail: string;
    teacher: {
        id: string;
        name: string;
        email: string;
        brief: string | null;
        phoneNumber: string;
    };
    enrollments: {
        studentId: string
    }[];
    chapters: {
        id: string;
        title: string;
        description: string;
        slug: string
    }[];
    createdAt: Date;
    updatedAt: Date;
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

    console.log(`This is course data : `, course);

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
                            <Skeleton className="my-8 h-[300px] w-full" />
                            <Skeleton className="mt-4 h-[50px] w-full md:w-1/2 mx-auto" />
                            <Skeleton className="mt-4 h-[50px] w-full md:w-1/2 mx-auto" />
                            <Skeleton className="mt-4 h-[50px] w-full md:w-1/2 mx-auto" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-gradient-to-b from-transparent to-black/30 aspect-square w-full h-[500px] overflow-hidden relative z-10">
                            <Image className="object-cover h-full hover:scale-105 transition-transform duration-300" src={course.bannerImage} alt={course.title} title={course.title} fill />
                        </div>
                        <div className="container p-4 sm:p-8">
                            <div className="flex justify-between gap-8 flex-col md:flex-row">
                                <p className="">{course.intro}</p>
                                <div className="border w-full max-w-[500px] aspect-video">Video</div>
                            </div>
                            <p className="my-8 text-xl first-letter:text-5xl first-letter:font-bold first-letter:text-red-500 leading-8">
                                {course.description}
                            </p>
                            <Accordion type="single" collapsible className="w-full md:w-3/4 lg:w-1/2 m-auto">
                                {course.chapters.map((item, index) => (
                                    <AccordionItem key={item.id} value={item.id}>
                                        <AccordionTrigger className="text-xl">{`${index + 1}. ${item.title}`}</AccordionTrigger>
                                        <AccordionContent className="text-lg px-4">{item.description}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                            <BuyButton title="Enroll Now" />
                            <div className="mt-20 w-full lg:w-11/12 xl:w-3/4 mx-auto flex flex-col md:flex-row justify-between gap-8">
                                <div className="border w-full max-w-[500px] aspect-video">Photo</div>
                                <div>
                                    <h4 className="text-2xl font-bold mb-4">{course.teacher.name}</h4>
                                    <p className="leading-6">{course.teacher.brief}</p>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}