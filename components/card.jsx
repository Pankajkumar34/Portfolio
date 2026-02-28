import Image from 'next/image';
import Link from 'next/link';



export default function ProjectCard({ project }) {
  return (
    <div 
      className="
        /* Layout & Border */
        group relative flex flex-col p-6 rounded-2xl border border-slate-700/50
        bg-slate-900/50 backdrop-blur-sm
        
        /* Transition Physics (Buttery Smooth) */
        transition-all duration-500 cubic-bezier(0.2, 0.8, 0.2, 1)
        will-change-transform
        
        /* Shadow Glow & Inner Click */
        shadow-[0_0_15px_rgba(99,102,241,0.1)] 
        hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]
        hover:border-indigo-500/30
        
        /* 3D Push & Tilt Effect */
        hover:scale-[0.98] 
        hover:translate-y-[-2px]
        hover:[transform:perspective(1000px)_rotateX(2deg)_rotateY(-1deg)]
        
        /* Snappy Click Feedback */
        active:scale-95 
        active:duration-100
      "
    >
      {/* Header: Logo + Name + Link */}
      <div className="flex items-center gap-4 mb-5">
        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-700 bg-black">
          <Image src={project.logo} alt={`${project.name} Logo`} priority={true} fill className="object-cover" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
            {project.name}
          </h3>
          <Link href={project.link} target="_blank" className="text-sm text-indigo-400 hover:text-indigo-200">
            View Live →
          </Link>
        </div>
      </div>

      {/* Screenshot (Main Image) */}
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-5 border border-slate-700">
        <Image 
          src={project.screenshot} 
          alt={project.name} 
          fill 
          priority={true}
          className="object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>

      {/* Functionality & Tech Details */}
      <div className="space-y-3 text-sm text-slate-300 flex-grow">
        <p className="line-clamp-2">{project.description}</p>
        
        <div className="space-y-1">
          <p><span className="font-semibold text-white">Tech:</span> {project.tech.join(', ')}</p>
          <p><span className="font-semibold text-white">DB/Tools:</span> {[...project.db, ...project.devops].join(', ')}</p>
        </div>
      </div>
    </div>
  );
}