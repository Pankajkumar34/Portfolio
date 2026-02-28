export default function OurTechSkills() {
  return (
    <section className="shadow-lg transition-all duration-300 ease-out
    
    hover:scale-[0.98] 
    hover:shadow-inner 
    hover:[transform:perspective(1000px)_rotateX(2deg)_rotateY(-1deg)]
    active:scale-95  relative overflow-hidden
   flex flex-col items-center">
      
      {/* Heading */}
      <div className="flex flex-col items-center mt-32">
        <h2
          className="text-center text-4xl font-semibold max-w-2xl"
          style={{ opacity: 1, transform: "none" }}
        >
          My{" "}
          <span className="bg-gradient-to-t from-indigo-600 to-black p-1 bg-left inline-block bg-no-repeat">
            Tech Skills
          </span>
        </h2>

        <p className="text-center text-slate-400 max-w-lg mt-3">
          Technologies and tools I use to build scalable, high-performance applications.
        </p>
      </div>

      {/* Main Card */}
      <div className="relative max-w-5xl py-20 md:py-26 mt-18 md:w-full overflow-hidden mx-2 md:mx-auto border border-indigo-900 flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-[#401B98]/5 to-[#180027]/10 rounded-3xl p-6 md:p-10 text-white">
        
        {/* Glow Effects */}
        <div className="absolute pointer-events-none top-10 -z-10 left-20 size-64 bg-gradient-to-br from-[#536DFF] to-[#4F39F6]/60 blur-[180px]"></div>
        <div className="absolute pointer-events-none bottom-10 -z-10 right-20 size-64 bg-gradient-to-br from-[#536DFF] to-[#4F39F6]/60 blur-[180px]"></div>

        {/* Left Content */}
        <div className="flex flex-col items-center md:items-start max-md:text-center">
          
          <h1 className="text-3xl font-medium max-w-xl mt-5 bg-gradient-to-r from-white to-[#b6abff] text-transparent bg-clip-text">
            Full Stack Developer
          </h1>

          <p className="text-base text-slate-400 max-w-lg mt-4">
            I specialize in building modern web applications using the latest
            frontend and backend technologies with scalable cloud deployment.
          </p>
        </div>

        {/* Right Skills Section */}
        <div className="md:-mr-10 max-md:mt-10 space-y-6 text-sm">
          
          <div>
            <h3 className="text-indigo-400 font-semibold mb-2">Frontend</h3>
            <p className="text-slate-300">
              React.js, Next.js, Redux Toolkit, TypeScript, Tailwind CSS, MUI,
              HTML, CSS
            </p>
          </div>

          <div>
            <h3 className="text-indigo-400 font-semibold mb-2">Backend</h3>
            <p className="text-slate-300">
              Node.js, Express.js, Socket.IO, RESTful APIs, Redis, MongoDB,
              MySQL
            </p>
          </div>

          <div>
            <h3 className="text-indigo-400 font-semibold mb-2">
              DevOps / Tools
            </h3>
            <p className="text-slate-300">
              AWS (S3, CloudFront, EC2), Git/GitHub, Firebase, Postman
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}