"use client";

import { toast } from "sonner";
import React, { useState } from "react";
import { Input } from "@/utils/FormFields";
import { AppDispatch } from "@/store/store";
import { FormButton } from "@/utils/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { loginStudent } from "@/store/actions/StudentActions";
import { useRouter } from "next/navigation";

export default function StudentLogin() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector(
        (state: { student: { loading: boolean; error: string | null } }) =>
            state.student
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(loginStudent(formData)).unwrap();
            router.push("/");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred");
            }
        }
    };

    return (
        <div className="bg-gradient-to-r from-slate-500 min-h-screen flex justify-center items-center">
            <div className="bg-white bg-opacity-30 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h1 className="text-2xl font-semibold text-center mb-6 text-white">
                    Student Login
                </h1>
                <form className="w-full" onSubmit={handleSubmit}>
                    <Input
                        title="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <Input
                        title="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    <FormButton
                        title={loading ? "Please Wait" : "Login"}
                        disabled={loading}
                    />
                </form>
            </div>
        </div>
    );
}
