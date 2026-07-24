import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "@/components/header/Header";
import MainPlayer from "@/components/player/MainPlayer";
import BackgroundGradient from "@/components/ui/BackgroundGradient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Music Player",
  description: "music player by Nzext.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="relative z-999 overflow-x-hidden min-h-full flex flex-col items-center w-full bg-background dark:text-white">
        <BackgroundGradient />
        <Suspense fallback={"searching..."}>
          <Header />
        </Suspense>
        <div className="w-[90%] xl:w-[80%] mb-44">{children}</div>
        <footer className="w-full">
          <MainPlayer />
        </footer>
      </body>
    </html>
  );
}
