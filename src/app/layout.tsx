import type { Metadata } from "next";
import "./globals.css";

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
      </body>
    </html>
  );
}
