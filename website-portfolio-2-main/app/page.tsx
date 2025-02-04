import Intro from "@/components/intro";
import SectionDivider from "@/components/section-divider";
import About from "@/components/about";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import Interests from "@/components/PersonalInterestsAndAchievements";
import { Toaster } from "react-hot-toast";
import ParticlesBackground from "@/components/ParticlesBackground"; // Import the new component

export default function Home() {
    return (
        <div className="relative w-full min-h-screen">
            <div className="absolute inset-0 z-0" />
                <ParticlesBackground />

                <main className="relative flex flex-col items-center px-4">
                    <Intro />
                    <SectionDivider />
                    <Projects />
                    <Experience />
                    <Skills />
                    <Interests />
                    <Contact />
                    <Toaster />
                </main>
            <div/>
        </div>
    );
}
