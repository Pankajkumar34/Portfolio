"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const defaultExperiences = [
  {
    role: "Full Stack Developer",
    company: "QuantumCrafters Studio Pvt. Ltd.",
    duration: "Aug 2025 – Feb 2026",
    project: "ElevatrX (Live Platform)",
    link: "#",
    points: [
      "Engineered social media automation platform integrating Meta & Instagram APIs.",
      "Implemented OAuth secure authentication & AI-assisted post creation.",
      "Built scalable backend using Node.js, MongoDB & Redis caching.",
      "Deployed on AWS with S3 and Firebase Cloud Messaging (FCM).",
    ],
  },
  {
    role: "MERN Stack Developer",
    company: "CQLSYS Technologies Pvt. Ltd.",
    duration: "Feb 2024 – May 2025",
    project: "Palmetto Pickleball (Live)",
    link: "https://palmettopickleball.com/",
    points: [
      "Developed real-time multiplayer sports platform with chat systems.",
      "Implemented push notifications & cron automation.",
      "Built reusable React components with Redux Toolkit.",
      "Deployed on AWS using S3 & FCM.",
    ],
  },
  {
    role: "MERN Stack Developer",
    company: "Baseline IT Development",
    duration: "May 2023 – Feb 2024",
    project: "HostTravel.org (Live)",
    link: "https://hosttravel.org/",
    points: [
      "Built travel booking platform using Next.js with SSR optimization.",
      "Implemented caching strategies & REST APIs.",
      "Integrated AWS S3 for storage & FCM for notifications.",
    ],
  },
];

export default function ExperienceSlider() {
  const [experiences, setExperiences] = useState(defaultExperiences);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchExperienceData();
  }, []);

  const fetchExperienceData = async () => {
    try {
      const res = await fetch('/api/section?sectionName=experience');
      if (res.ok) {
        const data = await res.json();
        if (data.content && Array.isArray(data.content) && data.content.length > 0) {
          setExperiences(data.content);
        }
      }
    } catch (error) {
      console.error('Error fetching experience data:', error);
    }
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % experiences.length);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? experiences.length - 1 : prev - 1
    );
  };

  return (
    <section className="max-w-4xl mx-auto py-10 px-6">
      <h2 className="text-4xl font-semibold text-center mb-12">
        My <span className="text-indigo-600">Experience</span>
      </h2>

      <div className="
                  shadow-lg transition-all duration-300 ease-out
                  
                  hover:scale-[0.98] 
                  hover:shadow-inner 
                  hover:[transform:perspective(1000px)_rotateX(2deg)_rotateY(-1deg)]
                  active:scale-95  relative overflow-hidden
                " >

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-[#111827] border border-indigo-900 rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl font-semibold">
              {experiences[index].role}
            </h3>
            <p className="text-indigo-400 mt-1">
              {experiences[index].company} | {experiences[index].duration}
            </p>

            <a
              href={experiences[index].link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline mt-3 inline-block"
            >
              {experiences[index].project}
            </a>

            <ul className="list-disc pl-5 mt-4 text-slate-400 space-y-2 text-sm">
              {experiences[index].points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevSlide}
            className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            Prev
          </button>
          <button
            onClick={nextSlide}
            className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
