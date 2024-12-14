import type { Metadata } from "next";
import "./globals.css";
import WhatsAppWidget from "@/components/whatsappWidget";

export const metadata: Metadata = {
  title: "We Brain Tech",
  description: "Education websites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
