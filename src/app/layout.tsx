import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import MainUploadMusic from "@/components/upload-music/MainUploadMusic";
import MainPlayer from "@/components/player/MainPlayer";
import BackgroundGradient from "@/components/ui/BackgroundGradient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative z-999 overflow-x-hidden min-h-full flex flex-col items-center w-full bg-background dark:text-white">
        <BackgroundGradient />
        <Header />
        {/* <div className="flex items-center justify-end w-[90%] xl:w-[80%]">
          <MainUploadMusic />
        </div> */}
        <div className="w-[90%] xl:w-[80%] mb-44">{children}</div>
        <footer className="w-full">
          <MainPlayer />
        </footer>
      </body>
    </html>
  );
}
