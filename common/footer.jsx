import { FaLinkedin, FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f1a] text-white py-10 mt-32 border-t border-indigo-900">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">

        {/* Name & Title */}
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
          Pankaj Kushwaha
        </h2>
        <p className="text-slate-400 mt-2">Full Stack Developer</p>

        {/* Social Icons */}
        <div className="flex gap-6 mt-6 text-xl">
          <a
            href="https://www.linkedin.com/in/pankaj-kushwaha-16171326a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition duration-300"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/Pankajkumar34"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition duration-300"
          >
            <FaGithub />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition duration-300"
          >
            <FaInstagram />
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition duration-300"
          >
            <FaFacebook />
          </a>
        </div>

        {/* Bottom Text */}
        <p className="text-slate-500 text-sm mt-8">
          © {new Date().getFullYear()} Pankaj Kushwaha. All rights reserved.
        </p>
      </div>
    </footer>
  );
}