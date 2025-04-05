"use client";

import React, { useEffect, useState } from "react";
import store from "@/store/store";
import { Provider, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import ThemeSwitcher from "@/utils/ThemeSwitcher";
import { Separator } from "@/components/ui/separator";
import TailwindIndicator from "@/lib/tailwindIndicater";
import { AdminSiderBar } from "@/components/admin/AdminSiderBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getCookie } from "cookies-next";
import { decodeToken } from "@/utils/jwt";
import { setUser } from "@/store/actions/UserActions";
import { AppDispatch } from "@/store/store";
import { Users } from "@/utils/InitialState";
import Loading from "./loading";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const paths = pathname.split("/").filter(Boolean);
    const dispatch = useDispatch<AppDispatch>();

    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const token = getCookie("authToken");

        if (!token || typeof token !== "string") {
            router.push("/auth/login");
            return;
        }

        const decodedToken = decodeToken(token);

        if (!decodedToken || typeof decodedToken === "string") {
            router.push("/auth/login");
            return;
        }

        const user = decodedToken as Users;

        dispatch(setUser(user));

        if (user.role !== "ADMIN" && user.role !== "TEACHER") {
            router.push("/auth/login");
            return;
        }

        setIsAuthorized(true);
    }, [dispatch, router]);

    if (isAuthorized === null) {
        return <Loading />;
    }

    return (
        <Provider store={store}>
            <SidebarProvider>
                {/* Sidebar */}
                <AdminSiderBar />

                <div className="flex flex-col flex-1">
                    {/* Top Bar */}
                    <Header paths={paths} />
                    {/* Main Content */}
                    <main>
                        {children}
                    </main>
                </div>

                {/* Other UI Components */}
                <TailwindIndicator />
                <Toaster position="top-right" richColors />
            </SidebarProvider>
        </Provider>
    );
}

export function Header({ paths }: { paths: string[] }) {
    return (
        <header className="flex items-center">
            {/* Sidebar Toggle */}
            <SidebarTrigger className="ml-1" />
            {/* Separator */}
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/* Breadcrumb */}
            <Breadcrumb>
                <BreadcrumbList>
                    {paths.slice(0).map((path, index) => {
                        const formattedPath = path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                        return (
                            <React.Fragment key={path}>
                                {index !== 0 && <BreadcrumbSeparator key={`sep-${index}`} />}
                                <BreadcrumbItem key={path}>
                                    <BreadcrumbPage>{formattedPath}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
            {/* Theme Switcher */}
            <div className="ml-auto">
                <ThemeSwitcher />
            </div>
        </header>
    );
}
