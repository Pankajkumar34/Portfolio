import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../common/navbar"
import Footer from "../common/footer"
import VisitorCounter from "../components/VisitorCounter"
import TorchEffect from "../components/highlighter"
import {VisitorProviderComp} from "../provider/visitorProvider"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://pankajkushwahadev.vercel.app"),

  title: {
    default: "Pankaj Kushwaha | MERN Stack Developer",
    template: "%s | Pankaj Kushwaha",
  },

  description:
    "Pankaj Kushwaha is a Full Stack MERN Developer with 2.5+ years of experience building scalable, high-performance web applications using React, Next.js, Node.js and MongoDB.",

  keywords: [
    "Pankaj Kushwaha",
    "Pankaj Kushwaha MERN Developer",
    "MERN Stack Developer in India",
    "React.js Developer",
    "Next.js Developer",
    "Node.js Developer",
    "MongoDB Developer",
    "Full Stack Developer Portfolio",
  ],

  authors: [
    {
      name: "Pankaj Kushwaha",
      url: "https://pankajkushwahadev.vercel.app",
    },
  ],

  creator: "Pankaj Kushwaha",
  publisher: "Pankaj Kushwaha",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  themeColor: "#4f46e5",

  openGraph: {
    title: "Pankaj Kushwaha | MERN Stack Developer",
    description:
      "Official portfolio of Pankaj Kushwaha - Full Stack MERN Developer building scalable web applications.",
    url: "https://pankajkushwahadev.vercel.app",
    siteName: "Pankaj Kushwaha Portfolio",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/136339307?v=4",
        width: 1200,
        height: 630,
        alt: "Pankaj Kushwaha - MERN Stack Developer Portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  
  alternates: {
    canonical: "https://pankajkushwahadev.vercel.app",
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <VisitorProviderComp>
          <TorchEffect />
          <Navbar />

          {children}
          <Footer />
          <VisitorCounter />
        </VisitorProviderComp>
        

      </body>
    </html>
  );
}
