'use server';

import prisma from "@/lib/db";
import { createSlug } from "@/utils/UnitConvert";
import { FAQ, Role, CourseVideo, Chapter } from "@prisma/client";

type RoleType = keyof typeof Role;
export async function createStudent(formData: FormData) {
    const dobString = formData.get("dob") as string;
    const dob = dobString ? new Date(dobString) : null;

    if (!dob || isNaN(dob.getTime())) {
        throw new Error("Invalid Date of Birth");
    }

    const role = formData.get("role") as RoleType;
    if (!role || !Object.values(Role).includes(role)) {
        throw new Error("Invalid Role");
    }

    const enrollments = formData.getAll("enrollments").map(String);

    await prisma.user.create({
        data: {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            fatherName: formData.get("fatherName") as string,
            motherName: formData.get("motherName") as string,
            phoneNumber: formData.get("phoneNumber") as string,
            alternativeNumber: formData.get("alternativeNumber") as string,
            aadhaarNumber: formData.get("aadhaarNumber") as string,
            enrollments: {
                create: enrollments.map((enrollmentId) => ({
                    id: enrollmentId,
                    course: { connect: { id: formData.get("courseId") as string } }
                })),
            },
            address: formData.get("address") as string,
            dob: dob,
            password: formData.get("password") as string,
            role: role,
        }
    });
}

export async function createTeacher(formData: FormData) {
    const dobString = formData.get("dob") as string;
    const dob = dobString ? new Date(dobString) : null;

    if (!dob || isNaN(dob.getTime())) {
        throw new Error("Invalid Date of Birth");
    }

    const role = formData.get("role") as RoleType;
    if (!role || !Object.values(Role).includes(role)) {
        throw new Error("Invalid Role");
    }

    const coursesAsign = formData.getAll("coursesAsign").map(String);
    await prisma.user.create({
        data: {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            fatherName: formData.get("fatherName") as string,
            motherName: formData.get("motherName") as string,
            phoneNumber: formData.get("phoneNumber") as string,
            alternativeNumber: formData.get("alternativeNumber") as string,
            aadhaarNumber: formData.get("aadhaarNumber") as string,
            address: formData.get("address") as string,
            dob: dob,
            password: formData.get("password") as string,
            role: role,
            coursesAsign: {
                connect: coursesAsign.map((courseId) => ({ id: courseId })),
            },
            details: formData.get("details") as string,
            brief: formData.get("brief") as string,
            facebook: formData.get("facebook") as string,
            instagram: formData.get("instagram") as string,
            linkdin: formData.get("linkdin") as string,
            youtube: formData.get("youtube") as string,
            x: formData.get("x") as string,
        }
    });
}

export async function addCourse(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const slug = createSlug(title);
        const image = formData.get("image") as string || "";
        const bannerImage = formData.get("bannerImage") as string || "";
        const intro = formData.get("intro") as string || "";
        const description = formData.get("description") as string || "";
        const thumbnail = formData.get("thumbnail") as string || "";
        const introVideo = formData.get("introVideo") as string || "";
        const price = parseFloat(formData.get("price") as string) || 0;
        const certification = formData.get("certification") as string || "Yes";
        const chaptersString = formData.get("chapters") as string || '[]';
        const courseVideosString = formData.get("courseVideos") as string || '[]';
        const faqsString = formData.get("faqs") as string || '[]';
        const chapters = chaptersString ? JSON.parse(chaptersString) : [];
        const courseVideos = courseVideosString ? JSON.parse(courseVideosString) : [];
        const faqs = faqsString ? JSON.parse(faqsString) : [];
        const chaptersWithSlugs = chapters.map((chapter: Chapter) => ({
            ...chapter,
            slug: createSlug(chapter.title),
        }));

        const courseVideosWithSlugs = courseVideos.map((video: CourseVideo) => {
            const chapterSlug = createSlug(video.title);
            const chapter = chaptersWithSlugs.find((ch: { title: string; }) => createSlug(ch.title) === chapterSlug);
            return {
                ...video,
                slug: createSlug(video.title),
                duration: parseInt(video.duration as unknown as string, 10) || 0,
                chapterId: chapter ? chapter.id : null,
            };
        });

        if (!Array.isArray(chaptersWithSlugs) || !Array.isArray(courseVideosWithSlugs) || !Array.isArray(faqs)) {
            throw new Error("Invalid data format in one of the arrays (chapters, videos, faqs).");
        }

        const payload = {
            title,
            slug,
            image,
            bannerImage,
            intro,
            description,
            thumbnail,
            introVideo,
            price,
            certification,
            chapters: {
                create: chaptersWithSlugs.map((chapter: Chapter) => ({
                    title: chapter.title,
                    description: chapter.description,
                    slug: chapter.slug,
                })),
            },
            courseVideos: {
                create: courseVideosWithSlugs.map((video: CourseVideo) => ({
                    title: video.title,
                    slug: video.slug,
                    videoUrl: video.videoUrl,
                    duration: video.duration,
                    chapterId: video.chapterId,
                })),
            },
            faqs: {
                create: faqs.map((faq: FAQ) => ({
                    question: faq.question,
                    answer: faq.answer,
                })),
            },
        };

        if (!payload || Object.keys(payload).length === 0) {
            throw new Error("Invalid payload data.");
        }

        const newCourse = await prisma.course.create({
            data: payload,
            include: {
                chapters: true,
                courseVideos: true,
                faqs: true,
            },
        });

        return { success: true, course: newCourse };
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error adding course:", error.message);
        } else {
            console.error("Error adding course:", error);
        }
        return { success: false, error: error instanceof Error ? error.message : "Failed to add course" };
    }
}
