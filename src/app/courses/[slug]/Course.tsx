"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface Course {
    title: string;
    image: string;
    bannerImage: string;
    intro: string;
}

export default function CoursePage() {
    const { slug } = useParams();
    const [course, setCourse] = useState<Course | null>(null);

    useEffect(() => {
        if (!slug) return;

        const fetchCourse = async () => {
            try {
                const response = await fetch(`/api/courses/${slug}`);
                const data = await response.json();

                if (data.success) {
                    setCourse(data.data);
                } else {
                    console.error("Course not found");
                }
            } catch (error) {
                console.error("Error fetching course:", error);
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
                            <div className="flex justify-between">
                                <h1>{course.intro}</h1>
                                <div className="border w-[300px] sm:w-[500px] aspect-video">Video</div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}