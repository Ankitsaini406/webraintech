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

    const courseRaw = formData.getAll("course");
    const course = Array.isArray(courseRaw) ? courseRaw.map(String) : [String(courseRaw)];

    await prisma.user.create({
        data: {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            fatherName: formData.get("fatherName") as string,
            motherName: formData.get("motherName") as string,
            phoneNumber: formData.get("phoneNumber") as string,
            alternativeNumber: formData.get("alternativeNumber") as string,
            aadhaarNumber: formData.get("aadhaarNumber") as string,
            course: course,
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

    const courseRaw = formData.getAll("course");
    const course = Array.isArray(courseRaw) ? courseRaw.map(String) : [String(courseRaw)];
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
            course: course,
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