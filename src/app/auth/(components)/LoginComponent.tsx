"use client";

import { toast } from "sonner";
import React, { useState } from "react";
import { Input } from "@/utils/FormFields";
import { AppDispatch } from "@/store/store";
import { FormButton } from "@/utils/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/actions/UserActions";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Type for roles
type UserRole = "student" | "teacher";

type LoginFormProps = {
    role: UserRole;
    formData: { email: string; password: string };
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    loading: boolean;
    error: string | null;
}

// Login form component
const LoginForm = ({ role, formData, onInputChange, onSubmit, loading, error }: LoginFormProps) => (
    <div className="bg-background dark:bg-neutral-800 p-8 rounded-lg shadow-lg w-full">
        <h1 className="text-2xl font-semibold text-center mb-6 text-slate-600 dark:text-white">
            {role.charAt(0).toUpperCase() + role.slice(1)} Login
        </h1>
        <form className="w-full" onSubmit={onSubmit}>
            <Input
                title="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={onInputChange}
            />
            <Input
                title="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={onInputChange}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            <FormButton title={loading ? "Please Wait" : "Login"} disabled={loading} />
        </form>
    </div>
);

const LoginComponent = () => {
    const [studentFormData, setStudentFormData] = useState({ email: "", password: "" });
    const [teacherFormData, setTeacherFormData] = useState({ email: "", password: "" });
    const [role, setRole] = useState<UserRole>("student");
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const { loading, error } = useSelector((state: { user: { loading: boolean; error: string | null } }) => state.user);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (role === "student") {
            setStudentFormData((prevData) => ({ ...prevData, [name]: value }));
        } else {
            setTeacherFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginData = {
            role,
            credentials: role === "student" ? studentFormData : teacherFormData,
        };

        try {
            await dispatch(loginUser(loginData)).unwrap();
            router.push("/"); // Redirect on successful login
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="bg-gray-600 dark:bg-gray-800 min-h-screen flex justify-center items-center">
            <Tabs
                defaultValue="student"
                className="w-[400px]"
                onValueChange={(value) => setRole(value as UserRole)}
            >
                <TabsList className="w-full dark:bg-neutral-800">
                    <TabsTrigger value="student" className="w-full font-bold">Student</TabsTrigger>
                    <TabsTrigger value="teacher" className="w-full font-bold">Teacher</TabsTrigger>
                </TabsList>
                <TabsContent value="student">
                    <LoginForm
                        role="student"
                        formData={studentFormData}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmit}
                        loading={loading}
                        error={error}
                    />
                </TabsContent>
                <TabsContent value="teacher">
                    <LoginForm
                        role="teacher"
                        formData={teacherFormData}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmit}
                        loading={loading}
                        error={error}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default LoginComponent;
