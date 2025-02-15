"use server";

import prisma from "@/lib/db";

export async function getCourse(slug: string) {
    const course = await prisma.course.findUnique({
        where: { slug },
        include: {
            teacher: true,
            enrollments: true,
            chapters: true,
        },
    });

    return course;
}
