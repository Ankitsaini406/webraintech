import type { Metadata } from "next";
import ChildLayout from "./childlayout";
import "./globals.css";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased bg-background text-foreground selection:bg-black selection:text-white dark:selection:text-black dark:selection:bg-white ">
        <ChildLayout >
          {children}
        </ChildLayout>
      </body>
    </html>
  );
}
