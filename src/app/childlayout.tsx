'use client';

import React, { useEffect } from "react";
import store from "@/store/store";
import { Provider } from "react-redux";
import Header from "@/components/header/header";
import Footer from "@/components/footer/Footer";
import TailwindIndicator from "@/lib/tailwindIndicater";
import { setTheme } from "@/store/features/themeSlice";
// import WhatsAppWidget from "@/components/whatsappWidget";

export default function ChildLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark";
        if (savedTheme) {
            store.dispatch(setTheme(savedTheme));
        }
    }, []);

    return (
        <>
            <Provider store={store}>
                    <Header />
                    {children}
                    <TailwindIndicator />
                    {/* <WhatsAppWidget /> */}
                    <Footer />
            </Provider>
        </>
    )
}