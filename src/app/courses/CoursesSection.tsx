'use client';

import { Skeleton } from "@/components/ui/skeleton";
import useCourses from "@/hooks/useCoursesList";
import { ButtonBlack } from "@/utils/Buttons";
import Image from "next/image";
import Link from "next/link";

export default function CoursesSection() {

    const { courses, loading } = useCourses();

    const course = courses.filter(item => item.isPublish === true);

    return (
        <div>

            <div className="container mx-auto p-4 sm:p-8">
                <h1 className="font-bold text-xl sm:text-3xl pb-4">Courses</h1>
                <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        loading ?
                            (
                                <>
                                    <div className="flex gap-2 flex-col border p-4">
                                        <Skeleton className="h-[300px] w-full rounded-none" />
                                        <Skeleton className="h-[200px] w-full rounded-none" />
                                    </div>
                                    <div className="flex gap-2 flex-col border p-4">
                                        <Skeleton className="h-[300px] w-full rounded-none" />
                                        <Skeleton className="h-[200px] w-full rounded-none" />
                                    </div>
                                    <div className="flex gap-2 flex-col border p-4">
                                        <Skeleton className="h-[300px] w-full rounded-none" />
                                        <Skeleton className="h-[200px] w-full rounded-none" />
                                    </div>
                                    <div className="flex gap-2 flex-col border p-4">
                                        <Skeleton className="h-[300px] w-full rounded-none" />
                                        <Skeleton className="h-[200px] w-full rounded-none" />
                                    </div>
                                    <div className="flex gap-2 flex-col border p-4">
                                        <Skeleton className="h-[300px] w-full rounded-none" />
                                        <Skeleton className="h-[200px] w-full rounded-none" />
                                    </div>
                                    <div className="flex gap-2 flex-col border p-4">
                                        <Skeleton className="h-[300px] w-full rounded-none" />
                                        <Skeleton className="h-[200px] w-full rounded-none" />
                                    </div>
                                    <div className="flex gap-2 flex-col border p-4">
                                        <Skeleton className="h-[300px] w-full rounded-none" />
                                        <Skeleton className="h-[200px] w-full rounded-none" />
                                    </div>
                                </>
                            )
                            : (course.map((item) => (
                                <div key={item.title} className="border shrink-0 flex flex-col bg-primary-foreground dark:shadow-slate-950 justify-between hover:shadow-lg transition-all duration-300 p-4">
                                    <div>
                                        <div className="bg-linear-to-b from-transparent to-black/30 aspect-square w-full overflow-hidden relative z-10">
                                            {item.image === '' ? null : <Image className="object-cover h-full hover:scale-105 transition-transform duration-300" src={item.image} alt={item.image} width={720} height={300} />}
                                        </div>
                                        <h3 className="py-2 sm:py-4 text-base sm:text-xl font-bold">{item.title}</h3>
                                        <h4>{item.intro}</h4>
                                    </div>
                                    <Link className="mt-4" href={`/courses/${item.slug}`}>
                                        <ButtonBlack title="View Course" />
                                    </Link>
                                </div>
                            )))
                    }
                </div>
            </div>
        </div>
    )
}