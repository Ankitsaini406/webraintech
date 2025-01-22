'use client';

import React, { useEffect } from "react";
import store from "@/store/store";
import { Provider } from "react-redux";
import Header from "@/components/header/header";
import Footer from "@/components/footer/Footer";
import TailwindIndicator from "@/lib/tailwindIndicater";
import { setTheme } from "@/store/slices/themeSlice";
import WhatsAppWidget from "@/components/whatsappWidget";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";

export default function ChildLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

    const pathName = usePathname();
    const noHeaderFooterRoutes = ['/auth/students/login', 'auth/teachers/login', 'auth/students/register', 'auth/teachers/register'];
    const noHeaderFooter = noHeaderFooterRoutes.includes(pathName);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark";
        if (savedTheme) {
            store.dispatch(setTheme(savedTheme));
        }
    }, []);

    return (
        <Provider store={store}>
            {!noHeaderFooter && <Header />}
            <main>{children}</main>
            <TailwindIndicator />
            {!noHeaderFooter && <WhatsAppWidget />}
            <Toaster position="top-right" richColors />
            {!noHeaderFooter && <Footer />}
        </Provider>
    )
}