import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../common/navbar"
import Footer from "../common/footer"
import  VisitorCounter from "../components/VisitorCounter"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pankaj Kushwaha | MERN Stack Developer",
  description:
    "Pankaj Kushwaha portfolio - Full Stack MERN Developer with 2.5+ years of experience building scalable web applications.",
  keywords: [
    "Pankaj Kushwaha",
    "MERN Stack Developer",
    "React.js",
    "Node.js",
    "MongoDB",
    "Next.js",
    "Full Stack Developer",
    "Portfolio",
    "Web Developer",
    "Frontend Developer",
  ],
  authors: [{ name: "Pankaj Kushwaha", url: "https://your-portfolio.com" }],
  creator: "Pankaj Kushwaha",
  themeColor: "#4f46e5", // Indigo 600 for Tailwind
  openGraph: {
    title: "Pankaj Kushwaha | MERN Stack Developer",
    description:
      "Portfolio of Pankaj Kushwaha, Full Stack MERN Developer, building scalable web applications.",
    url: "https://your-portfolio.com",
    siteName: "Pankaj Kushwaha Portfolio",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/136339307?v=4",
        width: 1200,
        height: 630,
        alt: "Pankaj Kushwaha Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pankaj Kushwaha | MERN Stack Developer",
    description:
      "Portfolio of Pankaj Kushwaha, Full Stack MERN Developer, building scalable web applications.",
    site: "", // optional
    creator: "@yourtwitterhandle",
    images: ["https://avatars.githubusercontent.com/u/136339307?v=4"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
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
        <Navbar/>
        {children}
        <Footer/>
        {/* <VisitorCounter /> */}
      </body>
    </html>
  );
}
