// export default function Creations() {
//   const items = [
//     {
//       title: "Prompt engineers",
//       description:
//         "Bridging the gap between human intent and machine understanding through expert prompt design.",
//       image:
//         "https://images.unsplash.com/photo-1543269865-0a740d43b90c?q=80&w=800&h=400&auto=format&fit=crop",
//       position: "object-center",
//     },
//     {
//       title: "Data scientists",
//       description:
//         "Turning data into actionable insights that drive intelligent innovation and growth.",
//       image:
//         "https://images.unsplash.com/photo-1714976326351-0ecf0244f0fc?q=80&w=800&h=400&auto=format&fit=crop",
//       position: "object-right",
//     },
//     {
//       title: "Software engineers",
//       description:
//         "Building scalable and efficient systems that bring ideas to life through code.",
//       image:
//         "https://images.unsplash.com/photo-1736220690062-79e12ca75262?q=80&w=800&h=400&auto=format&fit=crop",
//       position: "object-center",
//     },
//   ];

//   return (
//     <section className="flex flex-col items-center" id="creations">
//       {/* Heading */}
//       <div className="flex flex-col items-center mt-32">
//         <h2 className="text-center text-4xl font-semibold max-w-2xl">
//           Our latest{" "}
//           <span className="bg-gradient-to-t from-indigo-600 to-black p-1 inline-block">
//             creation
//           </span>
//         </h2>

//         <p className="text-center text-slate-400 max-w-lg mt-3">
//           A visual collection of our most recent works - each piece crafted
//           with intention, emotion, and style.
//         </p>
//       </div>

//       {/* Accordion Cards */}
//       <div className="flex items-center gap-4 w-full max-w-5xl mt-16 mx-auto h-[400px]">
//         {items.map((item, index) => (
//           <div
//             key={index}
//             className="relative group flex-1 hover:flex-[3] transition-all duration-500 rounded-xl overflow-hidden cursor-pointer"
//           >
//             <img
//               src={item.image}
//               alt={item.title}
//               className={`h-full w-full object-cover ${item.position}`}
//             />

//             {/* Overlay */}
//             <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/60" />

//             {/* Content */}
//             <div className="absolute bottom-0 p-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
//               <h3 className="text-2xl font-semibold">{item.title}</h3>
//               <p className="text-sm mt-2 max-w-sm">
//                 {item.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
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
  const [index, setIndex] = useState(0);

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