import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ProjectArchive from "@/components/ProjectArchive";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Scene from "@/components/Scene";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      {/* 3D Canvas Background fixed behind everything */}
      <Scene />

      {/* Foreground Content Layers */}
      <div className="relative z-10 w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ProjectArchive />
        <Certifications />
        <Contact />
      </div>
    </main>
  );
}
