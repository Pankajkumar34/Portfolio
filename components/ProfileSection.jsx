// components/ProfileSection.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ProfileSection = () => {
  const personalDetails = [
    { label: "Name", value: "Pankaj Kumar Kushwaha" },
    {label:"Mobile No",value:"8115809072"},
    { label: "Current Location", value: "Mohali, Punjab" },
    { label: "Designation", value: "MERN Stack Developer" },
    { label: "Experience", value: "2.5 Years" },
    { label: "Completed Projects", value: "6+" },
  ];

  const education = [
    {
      degree: "Diploma in Computer Science",
      institute: "Delhi Institute of Management & Engineering Studies",
      year: "2019 – 2022",
    },
    {
      degree: "12th & 10th (U.P. Board)",
      institute: "JSI College, Kushinagar",
      year: "2017 – 2019",
      languages: "Hindi, English (Proficient)",
    },
  ];

  return (

<section  
  style={{
    maxWidth: "70rem", 
    margin: "auto",
    // Adding a custom box-shadow with a gradient feel
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 15px 2px rgba(99, 102, 241, 0.3)" 
  }} 
  className="
    flex flex-col md:flex-row items-start md:items-center justify-between 
    p-8 rounded-lg gap-8
    shadow-lg transition-all duration-300 ease-out
    
    hover:scale-[0.98] 
    hover:shadow-inner 
    hover:[transform:perspective(1000px)_rotateX(2deg)_rotateY(-1deg)]
    active:scale-95
  "
>     
      {/* Left Side: Personal Details */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-1"
      >
        <h2 className="text-3xl font-bold mb-4">Personal Details</h2>
        <ul className="space-y-2 mb-6">
          {personalDetails.map((item) => (
            <li key={item.label} className="flex">
              <span className="font-semibold w-40">{item.label}:</span>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-3xl font-bold mb-4">Education</h2>
        <ul className="space-y-4">
          {education.map((edu, index) => (
            <li key={index} className="border-l-2 border-indigo-600 pl-4">
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-gray-700">{edu.institute}</p>
              <p className="text-gray-500 text-sm">{edu.year}</p>
              {edu.languages && (
                <p className="text-gray-500 text-sm">Languages: {edu.languages}</p>
              )}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Right Side: Map */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-1 w-full h-96 "
      >
        <iframe
          className="w-full h-full rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.2345678912345!2d76.64278451501716!3d30.704649181779038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fedf6a7c12345%3A0xabcdef123456789!2sMohali%2C+Punjab%2C+India!5e0!3m2!1sen!2sin!4v1709022331234!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </section>
  );
};

export default ProfileSection;