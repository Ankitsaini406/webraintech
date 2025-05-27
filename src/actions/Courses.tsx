"use server";

import prisma from "@/lib/db";
import { Chapter, Course, FAQ, LexicalDescription } from "@/types/types";
import { createSlug } from "@/utils/Utils";

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
            isDelete: false,
            isPublish: false,
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
            discount: course.discount,
        };
    } catch (error) {
        console.error("Error fetching course:", error);
        throw error;
    }
}

export async function deleteCourse({ slug, Delete }: { slug: string, Delete: boolean }) {
    try {
        await prisma.course.update({
            where: { slug },
            data: {
                isDelete: Delete,
                isPublish: false,
            },
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: String(error) };
    }
}

export async function publishCourse({ slug, publish }: { slug: string, publish: boolean }) {
    try {
        await prisma.course.update({
            where: { slug },
            data: {
                isPublish: publish,
            },
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: String(error) };
    }
}

export async function editCourse(
    slug: string,
    data: Partial<Omit<Course, "id" | "createdAt" | "updatedAt" | "enrollments" | "teacher">> & {
        chapters?: Array<Pick<Chapter, "title" | "description">>;
        faqs?: Array<Pick<FAQ, "question" | "answer">>;
    }
): Promise<{ success: true }> {
    try {
        const existing = await prisma.course.findUnique({
            where: { slug },
            include: { chapters: true, faqs: true },
        });

        if (!existing) throw new Error("Course not found.");

        const {
            title = existing.title,
            image = existing.image,
            bannerImage = existing.bannerImage,
            intro = existing.intro,
            description = existing.description,
            thumbnail = existing.thumbnail,
            introVideo = existing.introVideo,
            certification = existing.certification,
            isPublish = existing.isPublish,
            isDelete = existing.isDelete,
        } = data;

        console.log(`This is data : `, data);

        const price = data.price !== undefined ? parseFloat(data.price.toString()) : existing.price;
        const discount = data.discount !== undefined ? parseFloat(data.discount.toString()) : existing.discount;
        const newSlug = title !== existing.title ? createSlug(title) : slug;

        const updated = await prisma.course.update({
            where: { slug },
            data: {
                title,
                slug: newSlug,
                image,
                bannerImage,
                intro,
                description,
                thumbnail,
                introVideo,
                price,
                discount,
                certification,
                isPublish,
                isDelete,
            },
        });

        if (Array.isArray(data.chapters)) {
            // Delete old chapters
            await prisma.chapter.deleteMany({ where: { courseId: updated.id } });

            // Create new chapters
            await prisma.chapter.createMany({
                data: data.chapters.map((chapter) => ({
                    courseId: updated.id,
                    slug: createSlug(chapter.title),
                    title: chapter.title,
                    description: JSON.stringify(chapter.description),
                })),
            });
        }

        if (Array.isArray(data.faqs)) {
            await prisma.fAQ.deleteMany({ where: { courseId: updated.id } });

            await prisma.fAQ.createMany({
                data: data.faqs.map((faq) => ({
                    courseId: updated.id,
                    question: faq.question,
                    answer: faq.answer,
                })),
            });
        }

        return { success: true };
    } catch (error: unknown) {
        console.error("❌ Failed to edit course:", error);
        if (error instanceof Error) {
            throw new Error(error.message || "Something went wrong while updating the course.");
        }
        throw new Error("Something went wrong while updating the course.");
    }
}
