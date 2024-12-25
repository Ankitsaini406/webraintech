import type { Metadata } from "next";
import "./globals.css";
import WhatsAppWidget from "@/components/whatsappWidget";

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
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
