"use client";

import { ButtonBlack } from "@/utils/Buttons";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CoursesSection() {

    interface Course {
        title: string;
        image: string;
        intro: string;
        slug: string;
    }

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get('/api/courses');
                setCourses(data.data);
            } catch (error) {
                console.error(`Error fetching courses : `, error);
            } finally {
                setLoading(false);
            }
        }

        fetchCourses();
    }, []);

    if (loading) return <p>Loading courses...</p>;

    return (
        <div>

            <div className="container p-4 sm:p-8">
                <h1 className="font-bold text-xl sm:text-3xl pb-4">Courses</h1>
                <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        courses.map((item) => (
                            <div key={item.title} className="border flex-shrink-0 flex flex-col bg-primary-foreground dark:shadow-slate-950 justify-between hover:shadow-lg transition-all duration-300 p-4">
                                <div>
                                <div className="bg-gradient-to-b from-transparent to-black/30 aspect-square w-full overflow-hidden relative z-10">
                                    <Image className="object-cover h-full hover:scale-105 transition-transform duration-300" src={item.image} alt={item.image} width={720} height={300} />
                                </div>
                                <h3 className="py-2 sm:py-4 text-base sm:text-xl font-bold">{item.title}</h3>
                                <h4>{item.intro}</h4>
                                </div>
                                <Link className="mt-4" href={`/courses/${item.slug}`}>
                                    <ButtonBlack title="View Course" />
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}