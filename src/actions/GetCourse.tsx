"use server";

import prisma from "@/lib/db";

export async function getCourse(slug: string) {
    try {
        const course = await prisma.course.findUnique({
            where: { slug },
            include: {
                teacher: true,
                enrollments: { include: { student: true } },
                chapters: true,
            },
        });

        if (!course) {
            throw new Error("Course not found");
        }

        return course;
    } catch (error) {
        console.error("Error fetching course:", error);
        return null;
    }
}
