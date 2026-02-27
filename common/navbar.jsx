"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between w-full h-18 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur ">

      {/* Logo */}
      <a href="#!">
        <Image
          className="h-9 w-auto rounded-2xl"
          width={138}
          height={36}
          priority={true}
          alt="logo"
          src="https://avatars.githubusercontent.com/u/136339307?v=4"
        />
      </a>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-8 transition duration-500">
        <a href="#hero" className="hover:text-slate-300 transition">
          Home
        </a>
          <a href="#last-company"  className="hover:text-slate-300 transition">
          Last Companies
        </a>

        <a href="#exprience" className="hover:text-slate-300 transition">
          Experience
        </a>

       <a href="#skills" className="hover:text-slate-300 transition">
          Skills
        </a>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden lg:block space-x-3">
        <Link href="/Pankaj.pdf" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition text-white active:scale-95 rounded-lg px-7 h-11">
          CV View
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden active:scale-90 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-18 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 lg:hidden">
          <a href="#hero" className="hover:text-indigo-600 transition text-black">
            Home
          </a>
          <a href="#last-company" className="hover:text-indigo-600 transition  text-black">
            Last Companies
          </a>
          <a href="#exprience" className="hover:text-indigo-600 transition  text-black">
            Experience
          </a>


          <Link href="/Pankaj.pdf" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition text-white active:scale-95 rounded-lg px-7 h-11">
            CV View
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </nav>
  );
}