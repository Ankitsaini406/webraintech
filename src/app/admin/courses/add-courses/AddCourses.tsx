"use client";

import { useReducer, useState } from "react";
import { Input, TextArea } from "@/utils/FormFields";
import { addCourse } from "@/actions/AddData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { courseSchema } from "@/utils/ValidationSchema";
import { ButtonBlack } from "@/utils/Buttons";
import { z } from "zod";
import Editor from "@/utils/Editor/Editor";
import { Chapter, courseinitial, CourseState, FAQ } from "@/types/types";

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
            return courseinitial;
        default:
            return state;
    }
};

const AddCourse = () => {
    const [course, dispatch] = useReducer(reducer, courseinitial);
    const [errors, setErrors] = useReducer(
        (
            state: Record<string, Record<number, Record<string, string>>>,
            action: Record<string, Record<number, Record<string, string>>>
        ) => ({ ...state, ...action }),
        {}
    );
    const [isLoading, setIsLoading] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

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

            console.log(`This is app data : `, form);

            const responce = await addCourse(form);
            if (responce.success) {
                toast.success("🎉 Course added successfully!");
                dispatch({ type: "RESET" });
            } else {
                toast.error("Failed to add course.");
            }
        } catch (error) {
            toast.error(
                "Failed to add course." +
                (error instanceof Error ? ` ${error.message}` : ` ${String(error)}`)
            );
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
        } finally {
            setIsLoading(false);
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
                    const template: Chapter | FAQ =
                        field === "chapters"
                            ? { title: "", description: {} } as Chapter
                            : { question: "", answer: "" } as FAQ;

                    return (
                        <div key={field} className="mb-6">
                            <h3 className="font-bold text-lg mb-2">{label}</h3>
                            {Array.isArray(course[field]) &&
                                (course[field] as Chapter[] | FAQ[]).map((item, index) => (
                                    <div key={index} className="text-center">
                                        <div className="flex flex-wrap gap-4 text-left">
                                            {Object.keys(template).map((key) => {
                                                const value = item[key as keyof typeof item];
                                                const errorMessage = errors?.[field]?.[index]?.[key];

                                                return (
                                                    <div key={key} className="w-full">
                                                        {field === "chapters" && key === "description" ? (
                                                            <div className="mb-4">
                                                                <label className="block font-medium mb-2">
                                                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                                                </label>
                                                                <Editor
                                                                    onChange={(content) =>
                                                                        dispatch({
                                                                            type: "UPDATE_ARRAY_FIELD", field, index, subField: key,
                                                                            value: JSON.stringify(content),
                                                                        })
                                                                    }
                                                                />
                                                            </div>
                                                        ) : (
                                                            <Input
                                                                title={key.charAt(0).toUpperCase() + key.slice(1)}
                                                                name={key}
                                                                value={String(value)}
                                                                onChange={(e) =>
                                                                    handleArrayChange(field, index, key, e.target.value)
                                                                }
                                                                className="w-full"
                                                                error={errorMessage}
                                                            />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div>
                                            <Button
                                                variant="outline"
                                                className="mt-4"
                                                onClick={() => removeItem(field, index)}
                                            >
                                                Remove {label.slice(0, -1)}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            <Button
                                type="button"
                                className="mt-6"
                                variant="outline"
                                onClick={() => addMore(field, template)}
                            >
                                Add More {label.slice(0, -1)}
                            </Button>
                        </div>
                    );
                })}


                <div className="flex justify-center">
                    <ButtonBlack type="submit" className="mt-4" title={isLoading ? "Submitting..." : "Add Course"} isLoading={isLoading}
                    />
                </div>
            </form>
        </div>
    );
};

export default AddCourse;