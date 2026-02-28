"use client"

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const defaultHero = {
  title: 'MERN Stack Developer',
  subtitle: 'I am a passionate MERN Stack Developer with 2.5+ years of experience building scalable web applications using the MERN stack.',
  name: 'Pankaj Kumar Kushwaha',
  profileImage: 'https://avatars.githubusercontent.com/u/136339307?v=4',
  cvLink: '/Pankaj.pdf',
  githubLink: 'https://github.com/Pankajkumar34',
  openToWork: true,
};

export default function Hero() {
  const [heroData, setHeroData] = useState(defaultHero);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const res = await fetch('/api/section?sectionName=hero');
      if (res.ok) {
        const data = await res.json();
        if (data.content) {
          setHeroData({ ...defaultHero, ...data.content });
        }
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-white pt-32 pb-20 px-6 bg-gradient-to-b from-indigo-900 via-[#0f0f1a] to-black">
      {heroData.openToWork && (
        <div className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-500 group">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs md:text-sm font-medium tracking-wide text-emerald-400 uppercase">
            Open to Work
          </span>
          <span className="overflow-hidden w-0 group-hover:w-3 transition-all duration-300 ease-out text-emerald-400">
            →
          </span>
        </div>
      )}
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
            src={heroData.profileImage}
          />
        </motion.div>
        <span className="text-lg font-medium">{heroData.name}</span>
      </motion.div>

      <motion.div className="flex  items-start space-y-2 mt-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[12px] md:text-[15px] font-semibold text-amber-400 drop-shadow-lg"
        >
          Hi,
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-[12px] md:text-[15px] font-bold text-white drop-shadow-xl"
        >
          I am {heroData.name}
        </motion.p>
      </motion.div >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center text-4xl md:text-6xl font-semibold  max-w-3xl leading-tight"
      >
        {heroData.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-center text-gray-300 mt-4 max-w-xl text-sm md:text-base"
      >
        {heroData.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, staggerChildren: 0.2 }}
        className="flex items-center gap-4 mt-8 flex-wrap justify-center"
      >
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <Link
            href={heroData.cvLink}
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
            href={heroData.githubLink}
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
