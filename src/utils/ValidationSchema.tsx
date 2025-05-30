import { z } from "zod";

export const studentSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    alternativeNumber: z.string().optional(),
    phoneNumber: z.string().length(10, "Phone number must be 10 digits"),
    aadhaarNumber: z.string().length(12, "Aadhaar must be 12 digits"),
    course: z.array(z.string()).min(1, "At least one course must be selected"),
    address: z.string().min(5, "Address is required"),
    dob: z.coerce.date().refine((date) => date <= new Date(), "Invalid Date of Birth"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["STUDENT", "TEACHER"]),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})
    .superRefine((data, ctx) => {
        if (data.role === "STUDENT") {
            if (!data.fatherName || data.fatherName.trim().length < 3) {
                ctx.addIssue({
                    path: ["fatherName"],
                    code: z.ZodIssueCode.custom,
                    message: "Father's name is required for students",
                });
            }

            if (!data.motherName || data.motherName.trim().length < 3) {
                ctx.addIssue({
                    path: ["motherName"],
                    code: z.ZodIssueCode.custom,
                    message: "Mother's name is required for students",
                });
            }
        }
    });

export const courseSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title should be less than 100 characters"),
    image: z.string().min(1, "Invalid URL format for Image"),
    bannerImage: z.string().min(1, "Invalid URL format for Banner Image"),
    intro: z.string().min(1, "Intro is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().nonnegative("Price must be a positive number"),
    discount: z.number().nonnegative("Discount must be a non-negative number").optional(),
    certification: z.string().min(1, "Certification is required"),
    introVideo: z.string().min(1, "Invalid URL format for Intro Video"),
    thumbnail: z.string().min(1, "Invalid URL format for Thumbnail"),
    chapters: z.array(
        z.object({
            title: z.string().min(1, "Chapter title is required"),
            description: z.record(z.any()),
        })
    ).min(1, "At least one chapter is required"),
    faqs: z.array(
        z.object({
            question: z.string().min(1, "FAQ question is required"),
            answer: z.string().min(1, "FAQ answer is required"),
        })
    ).min(1, "At least one FAQ is required"),
});

export const placementSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
    linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
    companyName: z.string().min(1, "Company Name is required"),
    address: z.string().min(1, "Address is required"),
});

export type PlacementFormData = z.infer<typeof placementSchema>;