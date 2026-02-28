import ProjectCard from "../../components/card"
import image1 from "../../assets/projectImg/image1.png"
import image2 from "../../assets/projectImg/image2.png"
import image3 from "../../assets/projectImg/image3.png"
import image4 from "../../assets/projectImg/image4.png"
import logo1 from "../../assets/projectImg/logo/PickleballLogo1-cxr-Tord.png"
import logo2 from "../../assets/projectImg/logo/elavtorx.png"
import logo3 from "../../assets/projectImg/logo/image3.png"

const projects = [
  {
    name: "ElevatrX",
    logo: logo2,
    screenshot: image4,
    description: "ElevatrX is a social media automation and business management platform that allows organizations to connect and manage multiple social media accounts from a single dashboard. Users can create organizations and companies, link platforms like LinkedIn, Facebook (Meta), Instagram, and YouTube via third-party integrations, and publish posts across all connected accounts simultaneously. The platform provides centralized control, analytics, and streamlined content management for businesses.",
    link: "https://elevatrx.app/",
    tech: ["React js", "Node Js", "Express Js"],
    db: ["Firebase", "MySql"],
    devops: ["Aws", "CloudFront", "S3Bucket"]
  },
  {
    name: "Palmetto Pickleball",
    logo: logo1,
    screenshot: image1,
    description: "Palmetto Pickleball is a real-time sports booking and community platform designed to let players play when and where they want. The platform enables users to create teams, send and receive real-time team requests, and compete in league matches consisting of 5 rounds. It includes group chat and single chat functionality, FCM push notifications, and efficient state management using Redux Toolkit to handle high real-time activity.",
    link: "https://palmettopickleball.com",
    tech: ["React js", "Node Js", "Express Js"],
    db: ["Firebase", "MySql"],
    devops: ["Aws", "CloudFront", "S3Bucket"]
  },
  {
    name: "Letmecu",
    logo: "/logos/palmetto.png",
    screenshot: image3,
    description: "A social video platform with two types of users: content creators and viewers. Creators can upload both free and paid videos, while users can purchase premium content through Stripe payment gateway. Includes a real-time single chat system, FCM push notifications, Redux Toolkit for state management, and a scalable architecture built with reusable components.",
    link: "",
    tech: ["React js", "Node Js", "Express Js"],
    db: ["Firebase", "MongoDB"],
    devops: ["Aws", "CloudFront", "S3Bucket"]
  },
  {
    name: "HostTravel.org",
    logo: logo3,
    screenshot: image2,
    description: "A location-based hotel booking platform that allows users to search and book hotels seamlessly. Integrated Stripe for secure online payments and includes an admin dashboard to manage hotels, users, and bookings. Features a real-time single chat system, SMTP email notifications, web push notifications, and a scalable architecture built with reusable components and Redux Toolkit for state management.",
    link: "https://hosttravel.org",
    tech: ["Next.js", "Node Js", "Express Js"],
    db: ["Firebase", "MongoDB"],
    devops: ["Aws", "CloudFront", "S3Bucket"]
  }
];
const MyProject = () => {


  return (
    <>
      <div>
        <h2 className="text-4xl font-semibold text-center mb-12">
          My <span className="text-indigo-600">My Projects</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10 bg-black">

          {projects.map((proj, index) => (
            <ProjectCard key={index} project={proj} />
          ))}
        </div>
      </div>

    </>

  )
}
export default MyProject