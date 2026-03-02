import Image from "next/image";
import Hero from "@/components/hero"
import ExperienceSlider from "@/components/exprience"
import LastCompnise from "@/components/lastCompnise"
import OurTechSkills from "@/components/skills"
// import TechSlider from "@/components/techLogo"
import ProfileSection from "@/components/ProfileSection"
import ChatWidget from "@/components/ChatWidget"
import dynamic from 'next/dynamic';

const TechSlider = dynamic(() => import('../components/techLogo'), {
  loading: () => (
    <div className="h-24 w-full bg-slate-800/20 animate-pulse rounded-lg flex items-center justify-center">
      <span className="text-slate-500 text-sm">Loading Tech Stack...</span>
    </div>
  ),
});
export default function Home() {
  return (
    <>
<section id="hero">
  <Hero />
</section>
<ProfileSection/>
<section id="last-company">
  <LastCompnise />
</section>

<section id="exprience">
  <ExperienceSlider />
</section>

<section id="skills">
  <OurTechSkills />
</section>
 <TechSlider/>
 <ChatWidget/>
    </>
  );
}
