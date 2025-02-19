"use client";

import { useReducer } from "react";
import { Input, TextArea } from "@/utils/FormFields";
import { addCourse } from "@/actions/AddData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const initialState = {
    title: "",
    image: "",
    bannerImage: "",
    intro: "",
    description: "",
    thumbnail: "",
    introVideo: "",
    price: 0,
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
    | { type: "UPDATE_ARRAY_FIELD"; field: keyof CourseState; index: number; subField: string; value: string | number }
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
            return { ...state, [action.field]: [...(state[action.field] as (Chapter[] | FAQ[])), action.newItem] };
        case "REMOVE_ITEM":
            return { ...state, [action.field]: (state[action.field] as (Chapter | FAQ)[]).filter((_, idx) => idx !== action.index) };
        case "RESET":
            return initialState;
        default:
            return state;
    }
};

const AddCourse = () => {
    const [course, dispatch] = useReducer(reducer, initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ type: "UPDATE_FIELD", field: e.target.name, value: e.target.value });
    };

    const handleArrayChange = (field: keyof CourseState, index: number, subField: string, value: string | number) => {
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
            const form = new FormData();

            form.append("title", course.title);
            form.append("price", course.price.toString());
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
        } catch (error: unknown) {
            console.error("Error adding course:", error);
            toast.error(`An unknown error occurred : ${error}`);
        }
    };

    return (
        <div className="container p-4">
            <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <Input title="Title" name="title" value={course.title} onChange={handleChange} placeholder="Course Title" />
                    <Input title="Price" type="number" name="price" value={course.price} onChange={handleChange} placeholder="Price" />
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <TextArea title="Intro" name="intro" value={course.intro} onChange={handleChange} />
                    <TextArea title="Description" name="description" value={course.description} onChange={handleChange} className="h-[100px]" />
                </div>

                {(["chapters", "faqs"] as (keyof CourseState)[]).map((field) => {
                    const label = field.charAt(0).toUpperCase() + field.slice(1);
                    const template =
                        field === "chapters"
                            ? { title: "", description: "", videoUrl: "", duration: 0 }
                            : { question: "", answer: "" };

                    return (
                        <div key={field}>
                            <h3 className="font-bold">{label}</h3>
                            {(course[field] as (Chapter[] | FAQ[])).map((item, index) => (
                                <div key={index} className="text-center">
                                    <div className="flex flex-col lg:flex-row gap-4 text-left">
                                        {Object.keys(template).map((key) => {
                                            const isTextArea = (field === "chapters" && key === "description") || (field === "faqs" && key === "answer");

                                            return isTextArea ? (
                                                <TextArea
                                                    key={key}
                                                    title={key.charAt(0).toUpperCase() + key.slice(1)}
                                                    name={key}
                                                    value={String(item[key as keyof typeof item])}
                                                    onChange={(e) =>
                                                        handleArrayChange(field, index, key as keyof typeof item, e.target.value)
                                                    }
                                                />
                                            ) : (
                                                <Input
                                                    key={key}
                                                    title={key.charAt(0).toUpperCase() + key.slice(1)}
                                                    name={key}
                                                    value={String(item[key as keyof typeof item])}
                                                    onChange={(e) =>
                                                        handleArrayChange(field, index, key as keyof typeof item, e.target.value)
                                                    }
                                                />
                                            );
                                        })}
                                    </div>
                                    <button type="button" onClick={() => removeItem(field, index)} className="rounded px-8 py-2 bg-red-500 hover:bg-red-600 text-white my-4">
                                        ✖
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={() => addMore(field, template)} className="rounded px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white my-4">
                                + Add {label}
                            </button>
                        </div>
                    );
                })}
                <Button type="submit" className="rounded px-8 py-2 bg-green-500 hover:bg-green-600 text-white my-4 font-bold uppercase">Submit Course</Button>
            </form>
        </div>
    );
};

export default AddCourse;
