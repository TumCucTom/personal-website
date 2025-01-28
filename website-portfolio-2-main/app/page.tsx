import Image from 'next/image'
import Intro from "@/components/intro"
import SectionDivider from '@/components/section-divider'
import About from '@/components/about'
import Projects from '@/components/projects'
import Experience from '@/components/experience'
import Skills from '@/components/skills'
import Contact from '@/components/contact'
import Interests from '@/components/PersonalInterestsAndAchievements'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro/>
      <SectionDivider/>
      <About/>
      <Projects/>
      <Experience/>
      <Skills/>
      <Interests/>
      <Contact/>
      <Toaster/>
    </main>
  )
}
