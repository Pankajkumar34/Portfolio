import Image from "next/image";
import Hero from "@/components/hero"
import ExperienceSlider from "@/components/exprience"
import LastCompnise from "@/components/lastCompnise"
import OurTechSkills from "@/components/skills"
import TechSlider from "@/components/techLogo"
export default function Home() {
  return (
    <>
<section id="hero">
  <Hero />
</section>

<section id="last-company">
  <LastCompnise />
</section>

<section id="exprience">
  <ExperienceSlider />
</section>

<section id="skills">
  <OurTechSkills />
  <TechSlider/>
</section>
    </>
  );
}
