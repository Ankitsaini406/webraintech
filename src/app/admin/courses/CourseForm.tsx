"use client";

import { useReducer, useState } from "react";
import { Input, TextArea } from "@/utils/FormFields";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { courseSchema } from "@/utils/ValidationSchema";
import { Chapter, courseinitial, CourseState, FAQ } from "@/types/types";
import { ButtonBlack } from "@/utils/Buttons";
import EditableEditor from "@/utils/Editor/EditableEditor";
import { useRouter } from "next/navigation";

type CourseFormProps = {
    initialData?: CourseState;
    onSubmit: (formData: FormData) => Promise<{ success: boolean; message?: string }>;
};

type Action =
    | { type: "UPDATE_FIELD"; field: string; value: string | number | object }
    | {
        type: "UPDATE_ARRAY_FIELD";
        field: keyof CourseState;
        index: number;
        subField: string;
        value: string | number | object;
    }
    | { type: "ADD_ITEM"; field: keyof CourseState; newItem: Chapter | FAQ }
    | { type: "REMOVE_ITEM"; field: keyof CourseState; index: number }
    | { type: "RESET"; payload: CourseState };

const reducer = (state: CourseState, action: Action): CourseState => {
    switch (action.type) {
        case "UPDATE_FIELD":
            return { ...state, [action.field]: action.value };
        case "UPDATE_ARRAY_FIELD":
            return {
                ...state,
                [action.field]: (state[action.field] as (Chapter | FAQ)[]).map((item, idx) =>
                    idx === action.index ? { ...item, [action.subField]: action.value } : item
                ),
            };
        case "ADD_ITEM":
            return {
                ...state,
                [action.field]: [...(state[action.field] as Chapter[] | FAQ[]), action.newItem],
            };
        case "REMOVE_ITEM":
            return {
                ...state,
                [action.field]: (state[action.field] as (Chapter | FAQ)[]).filter((_, idx) => idx !== action.index),
            };
        case "RESET":
            return action.payload;
        default:
            return state;
    }
};

const CourseForm: React.FC<CourseFormProps> = ({ initialData = courseinitial, onSubmit }) => {
    const [course, dispatch] = useReducer(reducer, initialData);
    const [errors, setErrors] = useReducer(
        (
            state: Record<string, Record<number, Record<string, string>>>,
            action: Record<string, Record<number, Record<string, string>>>
        ) => ({ ...state, ...action }),
        {}
    );
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        dispatch({
            type: "UPDATE_FIELD",
            field: name,
            value: type === "number" ? (value === "" ? "" : Number(value)) : value,
        });
    };

    const handleArrayChange = (
        field: keyof CourseState,
        index: number,
        subField: string,
        value: string | number
    ) => {
        dispatch({ type: "UPDATE_ARRAY_FIELD", field, index, subField, value });
    };

    const addMore = (field: keyof CourseState, newItem: Chapter | FAQ) => {
        dispatch({ type: "ADD_ITEM", field, newItem });
    };

    const removeItem = (field: keyof CourseState, index: number): void => {
        dispatch({ type: "REMOVE_ITEM", field, index });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const validatedData = courseSchema.parse(course);
            const form = new FormData();

            console.log("Submitting course data:", validatedData, form);

            Object.entries(validatedData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    form.append(key, JSON.stringify(value));
                } else {
                    form.append(key, String(value));
                }
            });

            const result = await onSubmit(form);

            if (result.success) {
                toast.success("✅ Operation successful!");
                dispatch({ type: "RESET", payload: courseinitial });
                router.push("/admin/courses/all-courses");
            } else {
                toast.error("❌ Operation failed. " + (result.message ?? ""));
            }
        } catch (error) {
            toast.error("Failed to submit course." + (error instanceof Error ? ` ${error.message}` : ` ${String(error)}`));
            console.error("Failed to submit course." + (error instanceof Error ? ` ${error.message}` : ` ${String(error)}`));
            if (error instanceof z.ZodError) {
                const formattedErrors: Record<string, Record<number, Record<string, string>>> = {};
                error.errors.forEach((err) => {
                    if (err.path.length === 1) {
                        formattedErrors[err.path[0]] = { 0: { "": err.message } };
                    } else if (err.path.length === 3) {
                        const [field, index, subField] = err.path as [string, number, string];
                        if (!formattedErrors[field]) formattedErrors[field] = {};
                        if (!formattedErrors[field][index]) formattedErrors[field][index] = {};
                        formattedErrors[field][index][subField] = err.message;
                    }
                });
                setErrors(formattedErrors);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {["title", "thumbnail", "introVideo", "price", "discount", "image", "bannerImage", "certification"].map((field) => (
                    <Input
                        key={field}
                        type={field === "price" || field === "discount" ? "number" : "text"}
                        title={field.charAt(0).toUpperCase() + field.slice(1)}
                        name={field}
                        value={String(course[field as keyof CourseState] ?? "")}
                        onChange={handleChange}
                        placeholder={field}
                        error={errors[field]?.[0]?.[""]}
                    />
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["intro", "description"].map((field) => (
                    <TextArea
                        key={field}
                        title={field.charAt(0).toUpperCase() + field.slice(1)}
                        name={field}
                        value={String(course[field as keyof CourseState])}
                        onChange={handleChange}
                        className="h-[100px]"
                        error={errors[field]?.[0]?.[""]}
                    />
                ))}
            </div>

            {/* Chapters Section */}
            <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Chapters</h3>
                {Array.isArray(course.chapters) &&
                    course.chapters.map((chapter, index) => {
                        const initialContent = typeof chapter.description === "string"
                            ? JSON.parse(chapter.description)
                            : chapter.description;
                        return (
                            <div key={index} className="text-center">
                                <div className="flex flex-wrap gap-4 text-left">
                                    <div className="w-full">
                                        <Input
                                            title="Title"
                                            name="title"
                                            value={chapter.title}
                                            onChange={(e) => handleArrayChange("chapters", index, "title", e.target.value)}
                                            className="w-full"
                                            error={errors?.chapters?.[index]?.title}
                                        />
                                    </div>
                                    <div className="w-full mb-4">
                                        <label className="block font-medium mb-2">Description</label>
                                        <EditableEditor
                                            initialValue={initialContent}
                                            onChange={(content) =>
                                                dispatch({
                                                    type: "UPDATE_ARRAY_FIELD",
                                                    field: "chapters",
                                                    index,
                                                    subField: "description",
                                                    value: content,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={() => removeItem("chapters", index)}
                                >
                                    Remove Chapter
                                </Button>
                            </div>
                        )
                    })}
                <Button
                    type="button"
                    className="mt-6"
                    variant="outline"
                    onClick={() => addMore("chapters", {
                        title: "", description: {
                            root: {
                                children: []
                            }
                        }
                    })}
                >
                    Add More Chapter
                </Button>
            </div>

            {/* FAQs Section */}
            <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">FAQs</h3>
                {Array.isArray(course.faqs) &&
                    course.faqs.map((faq, index) => (
                        <div key={index} className="text-center">
                            <div className="flex flex-wrap gap-4 text-left">
                                <div className="w-full">
                                    <Input
                                        title="Question"
                                        name="question"
                                        value={faq.question}
                                        onChange={(e) => handleArrayChange("faqs", index, "question", e.target.value)}
                                        className="w-full"
                                        error={errors?.faqs?.[index]?.question}
                                    />
                                </div>
                                <div className="w-full">
                                    <Input
                                        title="Answer"
                                        name="answer"
                                        value={faq.answer}
                                        onChange={(e) => handleArrayChange("faqs", index, "answer", e.target.value)}
                                        className="w-full"
                                        error={errors?.faqs?.[index]?.answer}
                                    />
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => removeItem("faqs", index)}
                            >
                                Remove FAQ
                            </Button>
                        </div>
                    ))}
                <Button
                    type="button"
                    className="mt-6"
                    variant="outline"
                    onClick={() => addMore("faqs", { question: "", answer: "" })}
                >
                    Add More FAQ
                </Button>
            </div>

            <div className="flex justify-center">
                <ButtonBlack type="submit" className="mt-4" title={isLoading ? "Submitting..." : "Submit"} isLoading={isLoading} />
            </div>
        </form>
    );
};

export default CourseForm;
