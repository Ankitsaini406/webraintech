import { useReducer, useState } from "react";
import { z } from "zod";
import { studentSchema } from "@/utils/ValidationSchema";
import { AddPersons } from "@/utils/InitialState";
import { createStudent, createTeacher } from "@/actions/AddData";
import { toast } from "sonner";

// Enum and Initial State
enum Role {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
}

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

type Action =
    | { type: "SET_FIELD"; field: keyof AddPersons; value: string | string[] | Date }
    | { type: "RESET_FORM" };

const reducer = (state: AddPersons, action: Action): AddPersons => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "RESET_FORM":
            return { ...initialState, dob: new Date() };
        default:
            return state;
    }
};

export function useAddPersonForm() {

    const courseOptions = [
        "Web Development",
        "Data Science",
        "Graphic Design",
        "Digital Marketing",
        "Cyber Security",
        "AI & Machine Learning",
        "Business Analytics",
    ];

    const [formData, dispatch] = useReducer(reducer, initialState);
    const [errors, setErrors] = useReducer(
        (state: Record<string, string>, action: Record<string, string>) => ({ ...state, ...action }),
        {}
    );
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ type: "SET_FIELD", field: e.target.name as keyof AddPersons, value: e.target.value });
    };

    const handleDateChange = (date: Date) => {
        dispatch({ type: "SET_FIELD", field: "dob", value: date });
    };

    const handleCourseChange = (course: string) => {
        if (!formData.course.includes(course)) {
            dispatch({ type: "SET_FIELD", field: "course", value: [...formData.course, course] });
        }
    };

    const removeCourse = (courseToRemove: string) => {
        dispatch({
            type: "SET_FIELD",
            field: "course",
            value: formData.course.filter((c) => c !== courseToRemove),
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        try {
            console.log("This is raw formData:", formData);

            // 👇 Preprocess formData to match schema expectations
            const cleanedData = {
                ...formData,
                dob: new Date(formData.dob), // Ensure date is a real Date object
                course: Array.isArray(formData.course) ? formData.course : [formData.course], // Ensure array
            };

            const validatedData = studentSchema.parse(cleanedData);
            const form = new FormData();

            Object.entries(validatedData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((val) => form.append(key, val));
                } else {
                    form.append(key, String(value));
                }
            });

            if (validatedData.role === "TEACHER") {
                await createTeacher(form);
                toast.success("Teacher added successfully!");
            } else {
                await createStudent(form);
                toast.success("Student added successfully!");
            }

            dispatch({ type: "RESET_FORM" });
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error("🧨 Zod validation errors:", error.errors);

                const formatted: Record<string, string> = {};
                const errorMessages = error.errors.map((err) => {
                    const path = err.path.join(".");
                    formatted[path] = err.message;
                    return `${path}: ${err.message}`;
                });

                // ✅ Show all error messages joined by newline (or break if HTML)
                toast.error(`Validation failed:\n${errorMessages.join("\n")}`);

                setErrors(formatted);
            } else {
                console.error("❌ Submission error:", error);
                toast.error("Submission failed. Try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };


    return {
        formData,
        errors,
        isLoading,
        courseOptions,
        handleChange,
        handleDateChange,
        handleCourseChange,
        removeCourse,
        handleSubmit,
        dispatch,
    };
}
