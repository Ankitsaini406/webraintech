"use client";

import { useReducer } from "react";
import { Input, TextArea } from "@/utils/FormFields";
import { addCourse } from "@/actions/AddData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { courseSchema } from "@/utils/ValidationSchema";
import { z } from "zod";

const initialState = {
    title: "",
    image: "",
    bannerImage: "",
    intro: "",
    description: "",
    thumbnail: "",
    introVideo: "",
    price: 0,
    discount: 0,
    certification: "",
    chapters: [],
    faqs: [],
};

interface CourseState {
    title: string;
    image: string;
    bannerImage: string;
    intro: string;
    description: string;
    thumbnail: string;
    introVideo: string;
    price: number;
    discount: number;
    certification: string;
    chapters: Chapter[];
    faqs: FAQ[];
}

interface Chapter {
    title: string;
    description: string;
    videoUrl: string;
    duration: number;
}

interface FAQ {
    question: string;
    answer: string;
}

type Action =
    | { type: "UPDATE_FIELD"; field: string; value: string | number }
    | {
        type: "UPDATE_ARRAY_FIELD";
        field: keyof CourseState;
        index: number;
        subField: string;
        value: string | number;
    }
    | { type: "ADD_ITEM"; field: keyof CourseState; newItem: Chapter | FAQ }
    | { type: "REMOVE_ITEM"; field: keyof CourseState; index: number }
    | { type: "RESET" };

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
            return initialState;
        default:
            return state;
    }
};

const AddCourse = () => {
    const [course, dispatch] = useReducer(reducer, initialState);
    const [errors, setErrors] = useReducer(
        (
            state: Record<string, Record<number, Record<string, string>>>,
            action: Record<string, Record<number, Record<string, string>>>
        ) => ({ ...state, ...action }),
        {}
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({
            type: "UPDATE_FIELD",
            field: e.target.name,
            value: e.target.value,
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const validatedData = courseSchema.parse(course);
            const form = new FormData();

            Object.entries(validatedData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    form.append(key, JSON.stringify(value));
                } else {
                    form.append(key, String(value));
                }
            });

            form.append("title", course.title);
            form.append("price", course.price.toString());
            form.append("discount", course.discount.toString());
            form.append("intro", course.intro);
            form.append("description", course.description);
            form.append("thumbnail", course.thumbnail);
            form.append("introVideo", course.introVideo);
            form.append("certification", course.certification);
            form.append("chapters", JSON.stringify(course.chapters));
            form.append("faqs", JSON.stringify(course.faqs));
            form.append("image", course.image);
            form.append("bannerImage", course.bannerImage);

            await addCourse(form);
            toast.success("🎉 Course added successfully!");
            dispatch({ type: "RESET" });
        } catch (error) {
            if (error instanceof z.ZodError) {
                const formattedErrors: Record<string, Record<number, Record<string, string>>> = {};

                error.errors.forEach((err) => {
                    if (err.path.length === 1) {
                        formattedErrors[err.path[0]] = { 0: { "": err.message } };
                    } else if (err.path.length === 3) {
                        const [field, index, subField] = err.path as [string, number, string];
                        if (!formattedErrors[field]) {
                            formattedErrors[field] = {};
                        }
                        if (!formattedErrors[field][index]) {
                            formattedErrors[field][index] = {};
                        }
                        formattedErrors[field][index][subField] = err.message;
                    }
                });
                setErrors(formattedErrors);
            }
        }
    };

    return (
        <div className="container p-4">
            <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {["title", "thumbnail", "introVideo", "price", "discount", "image", "bannerImage", "certification"].map(
                        (field) => (
                            <Input
                                key={field}
                                title={field.charAt(0).toUpperCase() + field.slice(1)}
                                name={field}
                                value={String(course[field as keyof CourseState])}
                                onChange={handleChange}
                                placeholder={field}
                                error={errors[field]?.[0]?.[""]}
                            />
                        )
                    )}
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

                {(["chapters", "faqs"] as (keyof CourseState)[]).map((field) => {
                    const label = field.charAt(0).toUpperCase() + field.slice(1);
                    const template =
                        field === "chapters"
                            ? { title: "", description: "", videoUrl: "", duration: 0 }
                            : { question: "", answer: "" };

                    return (
                        <div key={field} className="mb-6">
                            <h3 className="font-bold text-lg mb-2">{label}</h3>
                            {(course[field] as Chapter[] | FAQ[]).map((item, index) => (
                                <div key={index} className="text-center">
                                    <div className="flex flex-wrap gap-4 text-left">
                                        {Object.keys(template).map((key) => {
                                            const isTextArea =
                                                (field === "chapters" && key === "description") ||
                                                (field === "faqs" && key === "answer");

                                            const errorMessage = errors?.[field]?.[index]?.[key];

                                            return (
                                                <div key={key} className="w-full">
                                                    {isTextArea ? (
                                                        <TextArea
                                                            title={key.charAt(0).toUpperCase() + key.slice(1)}
                                                            name={key}
                                                            value={String(item[key as keyof typeof item])}
                                                            onChange={(e) =>
                                                                handleArrayChange(field, index, key as keyof typeof item, e.target.value)
                                                            }
                                                            className="w-full h-[100px]"
                                                            error={errorMessage}
                                                        />
                                                    ) : (
                                                        <Input
                                                            title={key.charAt(0).toUpperCase() + key.slice(1)}
                                                            name={key}
                                                            value={String(item[key as keyof typeof item])}
                                                            onChange={(e) =>
                                                                handleArrayChange(field, index, key as keyof typeof item, e.target.value)
                                                            }
                                                            className="w-full"
                                                            error={errorMessage}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeItem(field, index)}
                                        className="rounded px-6 py-2 bg-red-500 hover:bg-red-600 text-white my-4"
                                    >
                                        ✖ Remove {label}
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addMore(field, template)}
                                className="rounded px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white my-4"
                            >
                                + Add {label}
                            </button>
                        </div>
                    );
                })}

                <Button
                    type="submit"
                    className="rounded px-8 py-5 bg-green-500 hover:bg-green-600 text-white my-4 font-bold uppercase"
                >
                    Submit Course
                </Button>
            </form>
        </div>
    );
};

export default AddCourse;
