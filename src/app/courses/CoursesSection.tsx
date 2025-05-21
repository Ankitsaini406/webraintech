'use client'

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import useCourses from "@/hooks/useCoursesList";
import { Course } from "@/types/types";
import { ButtonBlack } from "@/utils/Buttons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CoursesSection() {
    const { courses, loading } = useCourses();
    const publishedCourses = courses.filter(item => item.isPublish === true);

    return (
        <div className="container mx-auto p-4 sm:p-8">
            <h1 className="font-bold text-xl sm:text-3xl pb-4">Courses</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    Array(6).fill(0).map((_, i) => (
                        <div key={i} className="flex gap-2 flex-col border p-4">
                            <Skeleton className="h-[300px] w-full rounded-none" />
                            <Skeleton className="h-[200px] w-full rounded-none" />
                        </div>
                    ))
                ) : publishedCourses.length === 0 ? (
                    Array(3).fill(0).map((_, i) => (
                    <motion.div key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-center py-16 flex flex-col items-center justify-center gap-4"
                    >
                        <div className="relative w-32 h-32">
                            <Image
                                src="/webrainPlaceholder.webp"
                                alt="No courses"
                                className=" opacity-70"
                                fill
                            />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 dark:text-gray-300">
                            No courses available yet
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-md">
                            We’re working on something awesome! Please check back soon.
                        </p>
                    </motion.div>
                    ))
                ) : (
                    publishedCourses.map(course => (
                        <CourseCard key={course.title} course={course} />
                    ))
                )}
            </div>
        </div>
    );
}

export function CourseCard({ course }: { course: Course }) {
    const placeholder = "/webrainPlaceholder.webp";
    const [imgSrc, setImgSrc] = useState(course.image || placeholder);

    return (
        <div className="border shrink-0 flex flex-col dark:shadow-slate-950 justify-between hover:shadow-lg transition-all duration-300 p-4">
            <div>
                <div className="bg-linear-to-b from-transparent to-black/30 dark:to-white/50 aspect-square w-full overflow-hidden relative z-10">
                    <Image
                        className="object-cover h-full hover:scale-105 transition-transform duration-300"
                        src={imgSrc}
                        alt={course.title || "Course Image"}
                        width={720}
                        height={300}
                        onError={() => setImgSrc(placeholder)}
                        blurDataURL={placeholder}
                        placeholder="blur"
                    />
                </div>
                <h3 className="py-2 sm:py-4 text-base sm:text-xl font-bold">{course.title}</h3>
                <h4>{course.intro}</h4>
            </div>
            <Link className="mt-4" href={`/courses/${course.slug}`}>
                <ButtonBlack title="View Course" />
            </Link>
        </div>
    );
}
