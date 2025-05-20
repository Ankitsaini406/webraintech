"use server";

import prisma from "@/lib/db";
import { Course, LexicalDescription } from "@/types/types";

export async function getCourse(slug: string): Promise<Course> {
    try {
        const course = await prisma.course.findUnique({
            where: { slug },
            include: {
                teacher: true,
                enrollments: { include: { student: true } },
                chapters: true,
                faqs: true,
            },
        });

        if (!course) {
            console.error("Course not found for slug:", slug);
            throw new Error("Course not found");
        }

        // Properly format and narrow chapter fields
        const chapters = course.chapters.map((chapter) => ({
            id: chapter.id,
            title: chapter.title,
            slug: chapter.slug,
            videoUrl: chapter.videoUrl,
            duration: chapter.duration,
            order: chapter.order,
            description:
                chapter.description &&
                    typeof chapter.description === "object" &&
                    "root" in chapter.description
                    ? (chapter.description as unknown as LexicalDescription)
                    : { root: { children: [] } },
        }));

        return {
            id: course.id,
            title: course.title,
            slug: course.slug,
            image: course.image,
            bannerImage: course.bannerImage,
            intro: course.intro,
            description: course.description,
            price: course.price,
            certification: course.certification,
            introVideo: course.introVideo ?? undefined,
            thumbnail: course.thumbnail,
            teacher: course.teacher
                ? {
                    id: course.teacher.id,
                    name: course.teacher.name,
                    email: course.teacher.email,
                    brief: course.teacher.brief,
                    phoneNumber: course.teacher.phoneNumber,
                }
                : null,
            enrollments: course.enrollments.map((e) => ({ studentId: e.studentId })),
            chapters,
            faqs: course.faqs.map((faq) => ({
                id: faq.id,
                question: faq.question,
                answer: faq.answer,
            })),
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
        };
    } catch (error) {
        console.error("Error fetching course:", error);
        throw error;
    }
}

export async function DeleteCourse(slug: string) {
    try {
        await prisma.course.update({
            where: { slug },
            data: {
                isDelete: true,
                isPublish: false,
            },
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: String(error) };
    }
}