'use client';

import React, { useEffect } from "react";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/Footer";
import TailwindIndicator from "@/lib/tailwindIndicater";
import { setTheme } from "@/store/actions/ThemeActions";
import WhatsAppWidget from "@/components/whatsappWidget";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/hooks/useReduxhook";

export default function ChildLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

    const pathName = usePathname();
    const noHeaderFooterRoutes = ['/auth/login', 'auth/register', '/admin'];
    const noHeaderFooter = noHeaderFooterRoutes.some(route => pathName.startsWith(route));
    const dispatch = useAppDispatch();

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark";
        if (savedTheme) {
            dispatch(setTheme(savedTheme));
        }
    }, [dispatch]);

    return (
        <>
            {!noHeaderFooter && <Header />}
            <main>
                {children}
            </main>
            <TailwindIndicator />
            {!noHeaderFooter && <WhatsAppWidget />}
            <Toaster position="top-right" richColors />
            {!noHeaderFooter && <Footer />}
        </>
    )
}