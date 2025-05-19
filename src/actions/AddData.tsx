'use server';

import prisma from "@/lib/db";
import { createSlug } from "@/utils/Utils";
import { FAQ, Role, Chapter } from "@prisma/client";

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

function safeParseJSON<T>(data: string, fallback: T): T {
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("JSON parse error:", error);
        return fallback;
    }
}

export async function addCourse(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        if (!title) throw new Error("Title is required.");

        const slug = createSlug(title) || title.toLowerCase().replace(/\s+/g, "-");
        const image = (formData.get("image") as string) || "";
        const bannerImage = (formData.get("bannerImage") as string) || "";
        const intro = (formData.get("intro") as string) || "";
        const description = (formData.get("description") as string) || "";
        const thumbnail = (formData.get("thumbnail") as string) || "";
        const introVideo = (formData.get("introVideo") as string) || "";
        const price = parseFloat(formData.get("price") as string) || 0;
        const discount = parseFloat(formData.get("discount") as string) || 0;
        const certification = (formData.get("certification") as string) || "";

        const chaptersString = formData.get("chapters") as string;
        const faqsString = formData.get("faqs") as string;

        if (!chaptersString || !faqsString) {
            throw new Error("Chapters or FAQs are missing from the form data.");
        }

        const chapters = safeParseJSON<Chapter[]>(chaptersString, []);
        const faqs = safeParseJSON<FAQ[]>(faqsString, []);

        if (!Array.isArray(chapters) || chapters.length === 0) {
            throw new Error("Chapters must be a non-empty array.");
        }

        if (!Array.isArray(faqs)) {
            throw new Error("FAQs must be an array.");
        }

        const chaptersWithSlugs = chapters.map((chapter, index) => ({
            title: chapter.title,
            slug: createSlug(chapter.title),
            description: typeof chapter.description === "string"
                ? JSON.parse(chapter.description)
                : chapter.description,
            videoUrl: chapter.videoUrl || "",
            duration: Number.isNaN(Number(chapter.duration)) ? 0 : parseInt(chapter.duration as unknown as string, 10),
            pdf: chapter.pdf || null,
            order: chapter.order ?? index,
            isVisible: typeof chapter.isVisible === "boolean" ? chapter.isVisible : true,
        }));

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
            discount,
            certification,
            chapters: {
                create: chaptersWithSlugs,
            },
            faqs: {
                create: faqs.map((faq) => ({
                    question: faq.question,
                    answer: faq.answer,
                })),
            },
            createdAt: new Date(),
        };

        const newCourse = await prisma.course.create({
            data: payload,
            include: {
                chapters: true,
                faqs: true,
            },
        });

        return { success: true, course: newCourse };
    } catch (error) {
        console.error("Error adding course:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to add course",
        };
    }
}
