import { z } from "zod";

export const studentSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    fatherName: z.string().min(3, "Father's name is required"),
    motherName: z.string().min(3, "Mother's name is required"),
    phoneNumber: z.string().length(10, "Phone number must be 10 digits"),
    alternativeNumber: z.string().length(10, "Alternative number must be 10 digits").optional(),
    aadhaarNumber: z.string().length(12, "Aadhaar must be 12 digits"),
    course: z.array(z.string()).min(1, "At least one course must be selected"),
    address: z.string().min(5, "Address is required"),
    dob: z.date().refine((date) => date <= new Date(), "Invalid Date of Birth"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["STUDENT", "TEACHER"]),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const courseSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title should be less than 100 characters"),
    slug: z.string().min(1, "Slug is required").max(100, "Slug should be less than 100 characters"),
    image: z.string().url("Invalid URL format for Image"),
    bannerImage: z.string().url("Invalid URL format for Banner Image"),
    intro: z.string().min(1, "Intro is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be a positive number"),
    certification: z.string().min(1, "Certification is required"),
    introVideo: z.string().url("Invalid URL format for Intro Video").optional(),
    thumbnail: z.string().url("Invalid URL format for Thumbnail"),
    teacher: z.object({
        id: z.string().min(1, "Teacher ID is required"),
        name: z.string().min(1, "Teacher name is required"),
        email: z.string().email("Invalid email format"),
        phoneNumber: z.string().min(1, "Phone number is required"),
        brief: z.string().optional(),
    }),
    chapters: z.array(
        z.object({
            id: z.string().min(1, "Chapter ID is required"),
            title: z.string().min(1, "Chapter title is required"),
            description: z.string().min(1, "Chapter description is required"),
            slug: z.string().min(1, "Chapter slug is required"),
        })
    ).min(1, "At least one chapter is required"),
    faqs: z.array(
        z.object({
            id: z.string().min(1, "FAQ ID is required"),
            question: z.string().min(1, "FAQ question is required"),
            answer: z.string().min(1, "FAQ answer is required"),
        })
    ).min(1, "At least one FAQ is required"),
});

