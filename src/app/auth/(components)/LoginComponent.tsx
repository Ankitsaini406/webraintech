"use client";

import { toast } from "sonner";
import React, { useState } from "react";
import { Input } from "@/utils/FormFields";
import { AppDispatch } from "@/store/store";
import { FormButton } from "@/utils/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/actions/UserActions";
import { useRouter } from "next/navigation";

const LoginComponent = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: { user: { loading: boolean; error: string | null } }) => state.user);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(loginUser({ credentials: formData })).unwrap();
            router.push("/");
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="bg-gray-600 dark:bg-gray-800 min-h-screen flex justify-center items-center">
            <div className="bg-background dark:bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center mb-6 text-slate-600 dark:text-white">
                    Login
                </h1>
                <form className="w-full" onSubmit={handleSubmit}>
                    <Input
                        title="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange} />
                    <Input
                        title="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange} />
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    <FormButton title={loading ? "Please Wait" : "Login"} disabled={loading} />
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;