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
