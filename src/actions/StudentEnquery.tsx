"use server";

import prisma from "@/lib/db";

export async function createEnquery(formData: FormData) {
    await prisma.enquery.create({
        data: {
            name: formData.get("name") as string,
            slug: (formData.get("name") as string).replace(/\s+/g, "-").toLowerCase(),
            email: formData.get("email") as string,
            phoneNumber: formData.get("phoneNumber") as string,
            message: formData.get("message") as string,
            fatherName: formData.get("fatherName") as string,
        }
    });
}

export async function createContactUs(formData: FormData) {
    await prisma.contactUs.create({
        data: {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phoneNumber: formData.get("phoneNumber") as string,
            message: formData.get("message") as string,
        }
    });
}

export async function createPlacementEnquery(formData: FormData) {
    await prisma.placement.create({
        data: {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phoneNumber: formData.get("phoneNumber") as string,
            website: formData.get("website") as string,
            linkedin: formData.get("linkedin") as string,
            companyName: formData.get("companyName") as string,
            address: formData.get("address") as string,
        }
    });
}