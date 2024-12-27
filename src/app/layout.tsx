import type { Metadata } from "next";
import { ThemeProvider } from "@/Theme/ThemeContext";
// import WhatsAppWidget from "@/components/whatsappWidget";
import Header from "@/components/header/header";
import TailwindIndicator from "@/lib/tailwindIndicater";
import Footer from "@/components/footer/Footer";
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
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider>
          <Header />
          {children}
          <TailwindIndicator />
          {/* <WhatsAppWidget /> */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
