import type { Metadata } from "next";
import "./globals.css";
import WhatsAppWidget from "@/components/whatsappWidget";
import Header from "@/components/header/header";
import TailwindIndicator from "@/lib/tailwindIndicater";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "WeBrainTech",
  description: "Education websites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
        <TailwindIndicator />
        <WhatsAppWidget />
        <Footer />
      </body>
    </html>
  );
}
