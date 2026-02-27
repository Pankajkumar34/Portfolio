"use client"

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-white pt-32 pb-20 px-6 bg-gradient-to-b from-indigo-900 via-[#0f0f1a] to-black">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-3 border border-slate-600 rounded-full px-5 py-2 backdrop-blur-md bg-white/5"
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            className="h-10 w-10 rounded-full"
            width={40}
            height={40}
            priority
            alt="profile"
            src="https://avatars.githubusercontent.com/u/136339307?v=4"
          />
        </motion.div>
        <span className="text-lg font-medium">Pankaj Kushwaha</span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center text-4xl md:text-6xl font-semibold mt-6 max-w-3xl leading-tight"
      >
        MERN Stack Developer
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-center text-gray-300 mt-4 max-w-xl text-sm md:text-base"
      >
        Full Stack Developer with 2.5+ years of experience building scalable web
        applications using the MERN stack.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, staggerChildren: 0.2 }}
        className="flex items-center gap-4 mt-8 flex-wrap justify-center"
      >
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <Link
            href="/Pankaj.pdf"
            download
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition text-white active:scale-95 rounded-lg px-7 h-11"
          >
            Download CV
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
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <Link
            href="https://github.com/Pankajkumar34"
            target="_blank"
            className="border border-slate-400 hover:bg-white/10 transition active:scale-95 rounded-lg px-8 h-11 flex items-center"
          >
            GitHub Link
          </Link>
        </motion.div>
      </motion.div>

    </section>
  );
}