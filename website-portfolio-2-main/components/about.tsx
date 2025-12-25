"use client"

import React from 'react'
import SectionHeading from './section-heading'
import { motion } from 'framer-motion'
import { useSectionInView } from '@/lib/hooks'
import { useTheme } from '@/context/theme-context' // Import your custom useTheme

export default function About() {
    const { ref } = useSectionInView("About", 0.8)
    const { theme } = useTheme() // Use your custom theme hook

    // Explicitly define the type of `isDarkTheme` as boolean
    const getFontWeight = (isDarkTheme: boolean): string => isDarkTheme ? 'font-bold' : 'font-semibold'

    return (
        <motion.section ref={ref} className='mb-28 max-w-[45rem] text-center leading-8 sm:mb-40
        scroll-mt-28'
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 100, y: 0 }}
                        transition={{ delay: 0.175 }}
                        id="about"
        >
            <SectionHeading>About me</SectionHeading>
            <p className="mb-5">
                Hi, my name is{" "}
                <span className={` ${getFontWeight(true)}`}>Thomas (Tom) Bale </span>
                and I&apos;m a student, developer, business owner and Ironman AG Athlete. I am pursuing a Bachelor&apos;s degree in{" "}
                <span className={` ${getFontWeight(true)}`}>
                  Computer Science
                </span>{" "}
                at the
                <span className={` ${getFontWeight(true)}`}>
                  {" "}
                    University of Bristol,
                </span>{" "}
                currently achieving
                <span className={` ${getFontWeight(true)}`}>
                  {" "}
                    78.33% (First Class)
                </span>{" "}
                average. I serve as Treasurer and Planning & Control Team Lead in Formula Student AI, and I am the Founder, President, and Competitions Lead of UoB Quantum Computing Society. Alongside my university work, I explore my strong super-curricular passions for quantum computing, AI and HPC. I also participate in triathlons / Ironman training and co-own a performance cycling products small business.
            </p>
            <p className="mb-5">
                My academic, super-curricular and professional experience have given me a strong foundation in full-stack development, computer vision, ML, quantum computing and algorithms. Find my projects below or on my GitHub relating to quantum and AI.
            </p>
            <p >
                Please contact me below if you have any queries or find out more about me on my LinkedIn profile!
            </p>

        </motion.section>
    )
}
