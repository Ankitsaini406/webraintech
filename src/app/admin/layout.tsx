"use client";

import React from "react";
import store from "@/store/store";
import { Provider } from "react-redux";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import ThemeSwitcher from "@/utils/ThemeSwitcher";
import { Separator } from "@/components/ui/separator";
import TailwindIndicator from "@/lib/tailwindIndicater";
import { AdminSiderBar } from "@/components/admin/AdminSiderBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const paths = pathname.split("/").filter(Boolean);

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

export function Header({paths} : {paths: string[]}) {
    return (
        <header className="flex items-center">
        {/* Sidebar Toggle */}
        <SidebarTrigger className="ml-1" />
        {/* Separator */}
        <Separator orientation="vertical" className="mr-2 h-4" />
        {/* Breadcrumb */}
        <Breadcrumb>
            <BreadcrumbList>
                {paths.slice(1).map((path, index) => {
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
    )
}
