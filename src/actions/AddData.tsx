'use server';

import prisma from "@/lib/db";
import { Role } from "@prisma/client";

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
        const newCourse = await prisma.course.create({
            data: {
                title: formData.get("title") as string,
                slug: formData.get("slug") as string,
                image: formData.get("image") as string,
                bannerImage: formData.get("bannerImage") as string,
                intro: formData.get("intro") as string,
                description: formData.get("description") as string,
                thumbnail: formData.get("thumbnail") as string,
                introVideo: formData.get("introVideo") as string,
                price: parseFloat(formData.get("price") as string),
                certification: formData.get("certification") as string,
                chapters: {
                    create: JSON.parse(formData.get("chapters") as string || "[]"),
                },
                courseVideos: {
                    create: JSON.parse(formData.get("courseVideos") as string || "[]"),
                },
                faqs: {
                    create: JSON.parse(formData.get("faqs") as string || "[]"),
                },
            },
            include: {
                chapters: true,
                courseVideos: true,
                faqs: true,
            },
        });

        return { success: true, course: newCourse };
    } catch (error) {
        console.error("Error adding course:", error);
        return { success: false, error: "Failed to add course" };
    }
}
