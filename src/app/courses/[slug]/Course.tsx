"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { getCourse } from "@/actions/GetCourse";

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
                    </>
                ) : (
                    <>
                        <div className="bg-gradient-to-b from-transparent to-black/30 aspect-square w-full h-[500px] overflow-hidden relative z-10">
                            <Image className="object-cover h-full hover:scale-105 transition-transform duration-300" src={course.bannerImage} alt={course.bannerImage} fill />
                        </div>
                        <div className="container p-4 sm:p-8">
                            <div className="flex justify-between gap-8 flex-col md:flex-row">
                                <p className="">{course.intro}</p>
                                <div className="border w-full max-w-[500px] aspect-video">Video</div>
                            </div>
                            <p className="my-8 text-xl first-letter:text-5xl first-letter:font-bold first-letter:text-red-500 leading-8">
                                {course.description}
                            </p>
                        </div>
                    </>
                )
            }
        </div>
    )
}