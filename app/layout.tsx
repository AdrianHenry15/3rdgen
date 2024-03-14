// These styles apply to every route in the application
import "@/styles/globals.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Loader } from "@/components/loader";
import { ClerkProvider } from "@clerk/nextjs";
import AudioPlayer from "@/components/audio-player";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const title = "Third Generation Studios";
const description = "The best developers of websites and sound production";
export const metadata: Metadata = {
    title,
    description,
};

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <link rel="icon" href="/logos/triangle.png" sizes="96x96" />
                {/* <link rel="icon" href="/triangle-32.png" sizes="32x32" />
                <link rel="icon" href="/triangle-16.png" sizes="16x16" /> */}
                <body className={inter.variable}>
                    <Toaster />
                    <div className="flex flex-col overflow-x-hidden">
                        <Suspense fallback={<Loader />}>
                            {children}
                            <Suspense fallback={<Loader />}>
                                <AudioPlayer />
                            </Suspense>
                        </Suspense>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
