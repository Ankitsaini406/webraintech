"use client";

import { useReducer } from "react";
import { Input, TextArea } from "@/utils/FormFields";

const initialState = {
    title: "",
    slug: "",
    image: "",
    bannerImage: "",
    intro: "",
    description: "",
    thumbnail: "",
    introVideo: "",
    price: 0,
    certification: "Yes",
    teacherId: "",
    chapters: [],
    courseVideos: [],
    faqs: [],
};

interface CourseState {
    title: string;
    slug: string;
    image: string;
    bannerImage: string;
    intro: string;
    description: string;
    thumbnail: string;
    introVideo: string;
    price: number;
    certification: string;
    teacherId: string;
    chapters: Chapter[];
    courseVideos: CourseVideo[];
    faqs: FAQ[];
}

interface Chapter {
    title: string;
    description: string;
    slug: string;
}

interface CourseVideo {
    title: string;
    slug: string;
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
    | { type: "ADD_ITEM"; field: keyof CourseState; newItem: Chapter | CourseVideo | FAQ }
    | { type: "REMOVE_ITEM"; field: keyof CourseState; index: number }
    | { type: "RESET" };

const reducer = (state: CourseState, action: Action): CourseState => {
    switch (action.type) {
        case "UPDATE_FIELD":
            return { ...state, [action.field]: action.value };
        case "UPDATE_ARRAY_FIELD":
            return {
                ...state,
                [action.field]: (state[action.field] as (Chapter | CourseVideo | FAQ)[]).map((item, idx) =>
                    idx === action.index ? { ...item, [action.subField]: action.value } : item
                ),
            };
        case "ADD_ITEM":
            return { ...state, [action.field]: [...(state[action.field] as (Chapter[] | CourseVideo[] | FAQ[])), action.newItem] };
        case "REMOVE_ITEM":
            return { ...state, [action.field]: (state[action.field] as (Chapter | CourseVideo | FAQ)[]).filter((_, idx) => idx !== action.index) };
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

    const addMore = (field: keyof CourseState, newItem: Chapter | CourseVideo | FAQ) => {
        dispatch({ type: "ADD_ITEM", field, newItem });
    };

    const removeItem = (field: keyof CourseState, index: number): void => {
        dispatch({ type: "REMOVE_ITEM", field, index });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const response = await fetch("/api/course/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(course),
            });
            const data: { error?: string } = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to add course");
            alert("Course added successfully!");
            dispatch({ type: "RESET" });
        } catch (error: unknown) {
            console.error("Error adding course:", error);
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("An unknown error occurred");
            }
        }
    };

    return (
        <div className="container p-4">
            <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <Input title="Title" name="title" value={course.title} onChange={handleChange} placeholder="Course Title" />
                    <Input title="Price" type="number" name="price" value={course.price} onChange={handleChange} placeholder="Price" />
                    <Input title="Teacher ID" name="teacherId" value={course.teacherId} onChange={handleChange} placeholder="Teacher ID" />
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <TextArea title="Intro" name="intro" value={course.intro} onChange={handleChange} />
                    <TextArea title="Description" name="description" value={course.description} onChange={handleChange} className="h-[100px]" />
                </div>

                {(["chapters", "courseVideos", "faqs"] as (keyof CourseState)[]).map((field) => {
                    const label = field.charAt(0).toUpperCase() + field.slice(1);
                    const template =
                        field === "chapters"
                            ? { title: "", description: "", slug: "" }
                            : field === "courseVideos"
                                ? { title: "", videoUrl: "", duration: 0, slug: "" }
                                : { question: "", answer: "" };

                    return (
                        <div key={field}>
                            <h3 className="font-bold">{label}</h3>
                            {(course[field] as (Chapter[] | CourseVideo[] | FAQ[])).map((item, index) => (
                                <div key={index} className="flex flex-col lg:flex-row gap-4">
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
                                    <button type="button" onClick={() => removeItem(field, index)} className="btn-delete">
                                        ✖
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={() => addMore(field, template)} className="btn-add">
                                + Add {label}
                            </button>
                        </div>
                    );
                })}
                <button type="submit" className="btn-submit">Submit Course</button>
            </form>
        </div>
    );
};

export default AddCourse;
