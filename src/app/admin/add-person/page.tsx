"use client";

import { createStudent, createTeacher } from "@/actions/AddPerson";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ButtonBlack } from "@/utils/Buttons";
import { DateField, Input, MultipleSlection, Password, Section, TextArea } from "@/utils/FormFields";
import { AddPersons } from "@/utils/InitialState";
import { studentSchema } from "@/utils/ValidationSchema";
import { z } from "zod";
import { useReducer } from "react";
import { toast } from "sonner";

// Role Enum
enum Role {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
}

// Initial State
const initialState: AddPersons = {
    name: "",
    email: "",
    fatherName: "",
    motherName: "",
    phoneNumber: "",
    alternativeNumber: "",
    aadhaarNumber: "",
    course: [],
    address: "",
    dob: new Date(),
    password: "",
    confirmPassword: "",
    role: Role.STUDENT,
    details: "",
    brief: "",
    facebook: "",
    instagram: "",
    linkdin: "",
    youtube: "",
    x: "",
    updateAt: new Date(),
    createdAt: new Date(),
};

// Action Types
type Action =
    | { type: "SET_FIELD"; field: keyof AddPersons; value: string | string[] | Date }
    | { type: "RESET_FORM" };

// Reducer Function
const formReducer = (state: AddPersons, action: Action): AddPersons => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "RESET_FORM":
            return { ...initialState, dob: new Date() }; // Ensure fresh date instance
        default:
            return state;
    }
};

export default function AddPerson() {
    const [formData, dispatch] = useReducer(formReducer, initialState);
    const [errors, setErrors] = useReducer(
        (state: Record<string, string>, action: Record<string, string>) => ({ ...state, ...action }),
        {}
    );

    const courseOptions = [
        "Web Development",
        "Data Science",
        "Graphic Design",
        "Digital Marketing",
        "Cyber Security",
        "AI & Machine Learning",
        "Business Analytics",
    ];

    // Handle Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ type: "SET_FIELD", field: e.target.name as keyof AddPersons, value: e.target.value });
    };

    // Handle Date Change
    const handleDateChange = (date: Date) => {
        dispatch({ type: "SET_FIELD", field: "dob", value: date });
    };

    // Handle Course Selection
    const handleCourseChange = (selectedCourse: string) => {
        if (!formData.course.includes(selectedCourse)) {
            dispatch({ type: "SET_FIELD", field: "course", value: [...formData.course, selectedCourse] });
        }
    };

    // Remove Selected Course
    const removeCourse = (courseToRemove: string) => {
        dispatch({
            type: "SET_FIELD",
            field: "course",
            value: formData.course.filter((course) => course !== courseToRemove),
        });
    };

    // Handle Form Submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({}); // Reset previous errors

        try {
            const validatedData = studentSchema.parse(formData);
            const form = new FormData();

            Object.entries(validatedData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((val) => form.append(key, val));
                } else {
                    form.append(key, String(value));
                }
            });

            if (validatedData.role === Role.TEACHER) {
                await createTeacher(form);
                toast.success("Teacher added successfully!");
            } else {
                await createStudent(form);
                toast.success("Student added successfully!");
            }

            dispatch({ type: "RESET_FORM" }); // Reset form after submission
        } catch (error) {
            if (error instanceof z.ZodError) {
                const formattedErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    formattedErrors[err.path[0]] = err.message;
                });
                setErrors(formattedErrors);
            } else {
                toast.error("Error submitting form. Please try again.");
            }
        }
    };

    return (
        <form className="p-4" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Add Person</h2>

            {/* Role Selection */}
            <Section title="Select Role">
                <Select
                    onValueChange={(value) => dispatch({ type: "SET_FIELD", field: "role", value: value as Role })}
                    value={formData.role}
                >
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={Role.STUDENT}>Student</SelectItem>
                        <SelectItem value={Role.TEACHER}>Teacher</SelectItem>
                    </SelectContent>
                </Select>
            </Section>

            {/* Personal Information */}
            <Section title="Personal Information">
                <Input title="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
                <Input title="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
                <Input title="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} error={errors.phoneNumber} />
                <Input title="Alternative Number" name="alternativeNumber" value={formData.alternativeNumber} onChange={handleChange} />
                <DateField title="Birthday Date" value={formData.dob} onChange={handleDateChange} />
            </Section>

            {/* Parent Information */}
            {formData.role === Role.STUDENT && (
                <Section title="Parent Information">
                    <Input title="Father Name" name="fatherName" value={formData.fatherName} onChange={handleChange} error={errors.fatherName} />
                    <Input title="Mother Name" name="motherName" value={formData.motherName} onChange={handleChange} error={errors.motherName} />
                </Section>
            )}

            {/* Course Selection */}
            <Section title="Course Selection">
                <MultipleSlection label="Courses" options={courseOptions} selectedOptions={formData.course} onSelect={handleCourseChange} onRemove={removeCourse} error={errors.course} />
            </Section>

            {/* Identification */}
            <Section title="Identification">
                <Input title="Aadhaar Number" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} error={errors.aadhaarNumber} />
                <Input title="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
            </Section>

            {/* Teacher-Specific Fields */}
            {formData.role === Role.TEACHER && (
                <Section title="Teacher Information">
                    <TextArea title="Details" name="details" value={formData.details} onChange={handleChange} />
                    <TextArea title="Brief" name="brief" value={formData.brief} onChange={handleChange} />
                    <Input title="Facebook" name="facebook" value={formData.facebook} onChange={handleChange} />
                    <Input title="Instagram" name="instagram" value={formData.instagram} onChange={handleChange} />
                    <Input title="LinkedIn" name="linkdin" value={formData.linkdin} onChange={handleChange} />
                    <Input title="YouTube" name="youtube" value={formData.youtube} onChange={handleChange} />
                    <Input title="X (Twitter)" name="x" value={formData.x} onChange={handleChange} />
                </Section>
            )}

            {/* Password Section */}
            <Section title="Account Security">
                <Password title="Password" name="password" value={formData.password} onChange={handleChange} error={errors.password} />
                <Password title="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
            </Section>

            {/* Submit Button */}
            <div className="mt-6">
                <ButtonBlack title="Submit" />
            </div>
        </form>
    );
}
