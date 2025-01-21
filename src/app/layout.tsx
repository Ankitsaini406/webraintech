import type { Metadata } from "next";
import ChildLayout from "./childlayout";
import "./globals.css";
import FacebookAnalytics from "./FacebookAnalytics";

const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;

if (!apiPoint) {
  throw new Error("API endpoint is not defined");
}

export const metadata: Metadata = {
  metadataBase: new URL(apiPoint),
  keywords: [
    "Education",
    "Online Learning",
    "WeBrainTech",
    "E-Learning",
    "Skill Development",
    "Courses",
    "Knowledge Platform",
    "Educational Resources",
  ],
  title: {
    default: "WeBrainTech",
    template: "WeBrainTech | %s",
  },
  openGraph: {
    title: "WeBrainTech - Unlock Your Potential",
    description: "Empowering learners through online education and skill development.",
    images: ["/favicon-192.png"],
    url: apiPoint,
  },
  twitter: {
    card: "summary_large_image",
    site: "@webraintechin",
    creator: "@webraintechin",
    title: "WeBrainTech - Unlock Your Potential",
    description: "Empowering learners through online education and skill development.",
    images: ["/favicon-192.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon and Icons */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />

        {/* Mobile Web App Settings */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="WeBrainTech: Online Learning Platform"
        />

        {/* OpenGraph Metadata */}
        <meta property="og:title" content={String(metadata.openGraph?.title) || "WeBrainTech"} />
        <meta property="og:description" content={metadata.openGraph?.description || "Empowering learners through online education and skill development."} />
        <meta property="og:image" content={(metadata.openGraph?.images as string[] | undefined)?.[0] || "/favicon.png"} />
        <meta property="og:url" content={apiPoint || "https://webraintech.in/"} />
        <meta property="og:site_name" content="WeBrainTech" />
        <meta property="og:type" content="website" />
        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@webraintechin" />
        <meta name="twitter:creator" content="@webraintechin" />
        <meta name="twitter:title" content="WeBrainTech - Unlock Your Potential" />
        <meta name="twitter:description" content="Empowering learners through online education and skill development." />
        <meta name="twitter:image" content="/favicon-192.png" />
        <meta name="twitter:url" content={apiPoint || "https://webraintech.in/"} />

        <FacebookAnalytics />
      </head>
      <body className="antialiased flex flex-col min-h-screen bg-background text-foreground selection:bg-blue-600 selection:text-white dark:selection:text-blue-600 dark:selection:bg-white">
        <ChildLayout>
          {children}
        </ChildLayout>
      </body>
    </html>
  );
}
