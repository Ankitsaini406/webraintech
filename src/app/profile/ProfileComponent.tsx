"use client";

import React, { useState } from "react";
import { LayoutDashboard, LogIn, Settings, User } from "lucide-react";

export function ProfileComponent() {
    const [activeTab, setActiveTab] = useState("dashboard");

    // Content for each tab
    const renderTabContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <div>Welcome to your dashboard! Here you can manage your activities.</div>;
            case "teachers":
                return <div>Here is the list of teachers.</div>;
            case "account":
                return <div>Update your account information here.</div>;
            case "signout":
                return <div>You have successfully signed out.</div>;
            default:
                return <div>Select a tab to view content.</div>;
        }
    };

    return (
        <div className="container mx-auto my-4 sm:my-8 grid grid-cols-[300px_1fr] md:grid-cols-[400px_1fr]">
            {/* Profile Tabs */}
            <div className="border rounded p-4">
                <div className="flex gap-4 flex-col items-center">
                    <div className="flex items-center justify-center w-[200px] aspect-square rounded-full bg-gray-400 shadow-md">
                        <h1 className="text-white text-9xl">P</h1>
                    </div>
                    <div className="flex flex-col gap-1 items-center">
                        <h2 className="text-2xl font-bold">Howdy! Prashant</h2>
                        <h2 className="text-slate-400">prashantbagriya62@gmail.com</h2>
                    </div>

                    <div className="flex flex-col gap-4 w-2/3">
                        <button
                            onClick={() => setActiveTab("dashboard")}
                            className={`flex gap-2 font-bold w-full py-2 px-4 rounded duration-300 ${
                                activeTab === "dashboard"
                                    ? "bg-red-500 text-white shadow-md"
                                    : "hover:bg-red-100 hover:shadow-md"
                            }`}
                        >
                            <LayoutDashboard />
                            Dashboard
                        </button>
                        <button
                            onClick={() => setActiveTab("teachers")}
                            className={`flex gap-2 font-bold w-full py-2 px-4 rounded duration-300 ${
                                activeTab === "teachers"
                                    ? "bg-red-500 text-white shadow-md"
                                    : "hover:bg-red-100 hover:shadow-md"
                            }`}
                        >
                            <User />
                            Teachers
                        </button>
                        <button
                            onClick={() => setActiveTab("account")}
                            className={`flex gap-2 font-bold w-full py-2 px-4 rounded duration-300 ${
                                activeTab === "account"
                                    ? "bg-red-500 text-white shadow-md"
                                    : "hover:bg-red-100 hover:shadow-md"
                            }`}
                        >
                            <Settings />
                            Account Details
                        </button>
                        <button
                            onClick={() => setActiveTab("signout")}
                            className={`flex gap-2 font-bold w-full py-2 px-4 rounded duration-300 ${
                                activeTab === "signout"
                                    ? "bg-red-500 text-white shadow-md"
                                    : "hover:bg-red-100 hover:shadow-md"
                            }`}
                        >
                            <LogIn />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile View */}
            <div className="border rounded p-4">{renderTabContent()}</div>
        </div>
    );
}
