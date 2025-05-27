"use client";

import { editCourse, getCourse } from "@/actions/Courses";
import CourseForm from "../../CourseForm";
import { useEffect, useState } from "react";
import { Course } from "@/types/types";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const courseId = params?.id as string;
    const [courseData, setCourseData] = useState<Course | null>(null);

    useEffect(() => {
        const fetch = async () => {
            const data = await getCourse(courseId);
            setCourseData(data);
        };
        fetch();
    }, [courseId]);

    const handleUpdate = async (formData: FormData) => {
        const data: Record<string, string | File> = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        return await editCourse(courseId, data);
    };

    if (!courseData) return <p>Loading...</p>;

    return (
        <div className="container p-4">
            <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
            <CourseForm
                initialData={{
                    ...courseData,
                    introVideo: courseData.introVideo ?? ""
                }}
                onSubmit={handleUpdate}
            />
        </div>
    );
};

