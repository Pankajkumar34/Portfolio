import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import models
import Section from '../model/section.js';
import MenuSetting from '../model/menuSetting.js';
import ChatAI from '../model/chatAI.js';

// Sample portfolio data
const portfolioData = {
  hero: {
    sectionName: 'hero',
    content: {
      title: 'MERN Stack Developer',
      subtitle: 'I am a passionate MERN Stack Developer with 2.5+ years of experience building scalable web applications using the MERN stack.',
      name: 'Pankaj Kumar Kushwaha',
      profileImage: 'https://avatars.githubusercontent.com/u/136339307?v=4',
      cvLink: '/Pankaj.pdf',
      githubLink: 'https://github.com/Pankajkumar34',
      openToWork: true,
    },
    isActive: true,
  },
  profile: {
    sectionName: 'profile',
    content: {
      personalDetails: [
        { label: "Name", value: "Pankaj Kumar Kushwaha" },
        { label: "Mobile No", value: "8115809072" },
        { label: "Current Location", value: "Mohali, Punjab" },
        { label: "Designation", value: "MERN Stack Developer" },
        { label: "Experience", value: "2.5 Years" },
        { label: "Completed Projects", value: "6+" },
      ],
      education: [
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
      ],
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.2345678912345!2d76.64278451501716!3d30.704649181779038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fedf6a7c12345%3A0xabcdef123456789!2sMohali%2C+Punjab%2C+India!5e0!3m2!1sen!2sin!4v1709022331234!5m2!1sen!2sin'
    },
    isActive: true,
  },
  experience: {
    sectionName: 'experience',
    content: [
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
    ],
    isActive: true,
  },
  skills: {
    sectionName: 'skills',
    content: {
      title: 'Full Stack Developer',
      description: 'I specialize in building modern web applications using the latest frontend and backend technologies with scalable cloud deployment.',
      frontend: 'React.js, Next.js, Redux Toolkit, TypeScript, Tailwind CSS, MUI, HTML, CSS',
      backend: 'Node.js, Express.js, Socket.IO, RESTful APIs, Redis, MongoDB, MySQL',
      devops: 'AWS (S3, CloudFront, EC2), Git/GitHub, Firebase, Postman',
    },
    isActive: true,
  },
  companies: {
    sectionName: 'companies',
    content: [
      {
        name: "QuantumCrafters Studio Private Limited",
        logo: "https://www.qcsstudio.com/logo.png",
        link: "https://www.qcsstudio.com/",
        period: "Aug 2025 – Present",
        description: "Worked on ElevatrX - social media automation platform",
      },
      {
        name: "CQLsys Technologies Private Limited",
        logo: "https://www.cqlsys.com/logo.png",
        link: "https://www.cqlsys.com/",
        period: "Feb 2024 – May 2025",
        description: "Worked on Palmetto Pickleball and LetMeCU platforms",
      },
      {
        name: "Baseline IT Development Private Limited",
        logo: "https://baselineitdevelopment.com/logo.png",
        link: "https://baselineitdevelopment.com",
        period: "May 2023 – Feb 2024",
        description: "Worked on HostTravel travel booking platform",
      },
    ],
    isActive: true,
  },
};

// Default menu settings
const menuSettings = {
  key: 'dashboard_menu',
  items: [
    { id: 'hero', label: 'Home', icon: '🏠', sectionName: 'hero', sectionType: 'hero', isActive: true, order: 1 },
    { id: 'profile', label: 'Profile', icon: '👤', sectionName: 'profile', sectionType: 'profile', isActive: true, order: 2 },
    { id: 'companies', label: 'Companies', icon: '🏢', sectionName: 'companies', sectionType: 'companies', isActive: true, order: 3 },
    { id: 'experience', label: 'Experience', icon: '💼', sectionName: 'experience', sectionType: 'experience', isActive: true, order: 4 },
    { id: 'skills', label: 'Skills', icon: '🛠️', sectionName: 'skills', sectionType: 'skills', isActive: true, order: 5 },
    { id: 'chat', label: 'Chat', icon: '💬', sectionName: 'chat', sectionType: 'custom', isActive: true, order: 6 },
  ],
};

// ChatAI seed data for portfolio queries
const chatAIData = [
  {
    query: "what is pankaj's name",
    response: "Pankaj Kumar Kushwaha is the name! He's a MERN Stack Developer with 2.5+ years of experience in building scalable web applications."
  },
  {
    query: "who is pankaj",
    response: "Pankaj Kumar Kushwaha is a passionate MERN Stack Developer with 2.5+ years of experience. He specializes in React, Next.js, Node.js, MongoDB, and full-stack web development. He's currently based in Mohali, Punjab."
  },
  {
    query: "what are pankaj's skills",
    response: "Pankaj's technical skills include:\n\nFrontend: React.js, Next.js, Redux Toolkit, TypeScript, Tailwind CSS, MUI, HTML, CSS\n\nBackend: Node.js, Express.js, Socket.IO, RESTful APIs, Redis, MongoDB, MySQL\n\nDevOps: AWS (S3, CloudFront, EC2), Git/GitHub, Firebase, Postman"
  },
  {
    query: "what projects has pankaj worked on",
    response: "Pankaj has worked on several notable projects:\n\n1. ElevatrX - Social media automation platform (QuantumCrafters Studio)\n2. Palmetto Pickleball - Real-time multiplayer sports platform (CQLSYS Technologies)\n3. HostTravel.org - Travel booking platform (Baseline IT Development)\n\nHe has completed 6+ projects in total."
  },
  {
    query: "what is pankaj's experience",
    response: "Pankaj has 2.5+ years of experience as a MERN Stack Developer:\n\n1. QuantumCrafters Studio Pvt. Ltd. - Full Stack Developer (Aug 2025 – Feb 2026)\n2. CQLSYS Technologies Pvt. Ltd. - MERN Stack Developer (Feb 2024 – May 2025)\n3. Baseline IT Development - MERN Stack Developer (May 2023 – Feb 2024)"
  },
  {
    query: "what is pankaj's education",
    response: "Pankaj's education background:\n\n1. Diploma in Computer Science - Delhi Institute of Management & Engineering Studies (2019 – 2022)\n2. 12th & 10th (U.P. Board) - JSI College, Kushinagar (2017 – 2019)\n\nHe is proficient in Hindi and English."
  },
  {
    query: "how to contact pankaj",
    response: "You can contact Pankaj Kumar Kushwaha:\n\n- Mobile: 8115809072\n- Location: Mohali, Punjab\n- GitHub: https://github.com/Pankajkumar34\n- He's open to work opportunities!"
  },
  {
    query: "where does pankaj work",
    response: "Pankaj currently works at QuantumCrafters Studio Pvt. Ltd. as a Full Stack Developer (Aug 2025 – Present), working on the ElevatrX platform - a social media automation tool."
  },
  {
    query: "what is pankaj's current location",
    response: "Pankaj is currently based in Mohali, Punjab, India."
  },
  {
    query: "is pankaj available for hire",
    response: "Yes! Pankaj is open to work opportunities. He's a MERN Stack Developer with 2.5+ years of experience. You can contact him at 8115809072 or reach out through his GitHub profile."
  },
  {
    query: "what technologies does pankaj know",
    response: "Pankaj is proficient in:\n\nFrontend: React.js, Next.js, Redux Toolkit, TypeScript, Tailwind CSS, MUI\n\nBackend: Node.js, Express.js, MongoDB, MySQL, Redis\n\nCloud & Tools: AWS (S3, CloudFront, EC2), Firebase, Git/GitHub, Postman"
  },
  {
    query: "tell me about pankaj",
    response: "Pankaj Kumar Kushwaha is a MERN Stack Developer with 2.5+ years of experience building scalable web applications. He's passionate about creating efficient and user-friendly web solutions. Currently based in Mohali, Punjab, he has worked with multiple companies including QuantumCrafters Studio, CQLSYS Technologies, and Baseline IT Development. He's open to work opportunities and can be reached at 8115809072."
  },
  {
    query: "what is pankaj's github",
    response: "Pankaj's GitHub profile: https://github.com/Pankajkumar34"
  },
  {
    query: "what is pankaj's phone number",
    response: "You can reach Pankaj at: 8115809072"
  },
  {
    query: "does pankaj work on react",
    response: "Yes! React.js is one of Pankaj's core skills. He has extensive experience building React applications with Redux Toolkit, TypeScript, and modern CSS frameworks like Tailwind CSS and MUI."
  },
  {
    query: "does pankaj work on nodejs",
    response: "Yes! Node.js is a key part of Pankaj's tech stack. He builds scalable backend APIs using Node.js and Express.js, with experience in MongoDB, MySQL, and Redis."
  }
];

async function seedDatabase() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      console.error('❌ Please define MONGODB_URI in .env.local');
      process.exit(1);
    }

    console.log('🔄 Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Database connected successfully');

    // // Seed sections
    // console.log('\n🔄 Seeding sections...');
    // for (const [key, data] of Object.entries(portfolioData)) {
    //   const result = await Section.findOneAndUpdate(
    //     { sectionName: data.sectionName },
    //     data,
    //     { new: true, upsert: true }
    //   );
    //   console.log(`✅ Section "${key}" seeded successfully`);
    // }

    // // Seed menu settings
    // console.log('\n🔄 Seeding menu settings...');
    // await MenuSetting.findOneAndUpdate(
    //   { key: menuSettings.key },
    //   menuSettings,
    //   { new: true, upsert: true }
    // );
    // console.log('✅ Menu settings seeded successfully');

    // Seed chatAI data
    console.log('\n🔄 Seeding chatAI data...');
    for (const chatData of chatAIData) {
      await ChatAI.findOneAndUpdate(
        { query: chatData.query },
        chatData,
        { new: true, upsert: true }
      );
    }
    console.log('✅ ChatAI data seeded successfully');

    console.log('\n🎉 Portfolio seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding portfolio:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
