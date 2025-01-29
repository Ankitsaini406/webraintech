"use client";

import React, { useState } from "react";
import { LayoutDashboard, LogIn, Settings, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { Skeleton } from "@/components/ui/skeleton";
import { logoutStudent } from "@/store//actions/UserActions";
import { useRouter } from "next/navigation";
import { Users } from "@/utils/InitialState";
import Dashboard from "./(components)/Dashboard";
import TeachersSection from "./(components)/TeachersSection";

interface ProfileComponentProps {
    user: Users | null;
}

export function ProfileComponent({ user }: ProfileComponentProps) {
    const [activeTab, setActiveTab] = useState("dashboard");
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const firstLetter = user?.name?.charAt(0).toUpperCase();

    const handleSignout = () => {
        dispatch(logoutStudent());
        router.push("/auth/login");
    };

    // Content for each tab
    const renderTabContent = () => {
        const userRole = user?.role;

        switch (activeTab) {
            case "dashboard":
                return <Dashboard />;
            case "teacher":
                if (userRole === "student") {
                    return <TeachersSection userCourses={user?.course || []} />;
                }
                return <div>Unauthorized to view this content.</div>;
            case "student":
                if (userRole === "teacher") {
                    return <div>Here is the list of students.</div>;
                }
                return <div>Unauthorized to view this content.</div>;
            case "account":
                return <div>Update your account information here.</div>;
            case "signout":
                return (
                    <button
                        onClick={handleSignout}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Sign Out
                    </button>
                );
            default:
                return <div>Select a tab to view content.</div>;
        }
    };

    return (
        <div className="container mx-auto my-4 sm:my-8 grid grid-cols-[300px_1fr] md:grid-cols-[300px_1fr]">
            {/* Profile Tabs */}
            <div className="border rounded p-4 h-full">
                <div className="flex gap-4 flex-col items-center sticky top-24">
                    {user === null ? (
                        <Skeleton className="w-[200px] aspect-square rounded-full" />
                    ) : (
                        <div className="flex items-center justify-center w-[200px] aspect-square rounded-full bg-gray-400 shadow-md">
                            <h1 className="text-white text-9xl">{firstLetter}</h1>
                        </div>
                    )}
                    <div className="flex flex-col gap-1 items-center w-full">
                        {user === null ? (
                            <Skeleton className="h-8 w-[250px]" />
                        ) : (
                            <h2 className="text-2xl font-bold">{user.name}</h2>
                        )}
                        {user === null ? (
                            <Skeleton className="h-6 w-[300px]" />
                        ) : (
                            <h2 className="text-slate-400">{user.email}</h2>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 w-full">
                        <button
                            onClick={() => setActiveTab("dashboard")}
                            className={`flex gap-2 font-bold w-full py-2 px-4 rounded duration-300 ${activeTab === "dashboard"
                                ? "bg-red-500 text-white shadow-md"
                                : "hover:bg-red-100 hover:shadow-md dark:hover:text-black"
                                }`}
                        >
                            <LayoutDashboard />
                            Dashboard
                        </button>
                        <button
                            onClick={() => {
                                if (user?.role === "student") {
                                    setActiveTab("teacher");
                                } else {
                                    setActiveTab("student");
                                }
                            }}
                            className={`flex gap-2 font-bold w-full py-2 px-4 rounded duration-300 ${activeTab === "teacher" || activeTab === "student"
                                ? "bg-red-500 text-white shadow-md"
                                : "hover:bg-red-100 hover:shadow-md dark:hover:text-black"
                                }`}
                        >
                            <User />
                            {user?.role === "student" ? "Teachers" : "Students"}
                        </button>
                        <button
                            onClick={() => setActiveTab("account")}
                            className={`flex gap-2 font-bold w-full py-2 px-4 rounded duration-300 ${activeTab === "account"
                                ? "bg-red-500 text-white shadow-md"
                                : "hover:bg-red-100 hover:shadow-md dark:hover:text-black"
                                }`}
                        >
                            <Settings />
                            Account Details
                        </button>
                        <button
                            onClick={handleSignout}
                            className={`flex gap-2 font-bold w-full py-2 px-4 rounded duration-300 ${activeTab === "signout"
                                ? "bg-red-500 text-white shadow-md"
                                : "hover:bg-red-100 hover:shadow-md dark:hover:text-black"
                                }`}
                        >
                            <LogIn />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile View */}
            <div className="border rounded p-4">
                {renderTabContent()}
            </div>
        </div>
    );
}
