"use client"

import React from 'react'
import SectionHeading from './section-heading'
import { motion } from 'framer-motion'
import { useSectionInView } from '@/lib/hooks'
import { useTheme } from '@/context/theme-context' // Import your custom useTheme

export default function About() {
    const { ref } = useSectionInView("About", 0.8)
    const { theme } = useTheme() // Use your custom theme hook

    const getFontWeight = (isDarkTheme) => isDarkTheme ? 'font-bold' : 'font-semibold'

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
                <span className={` ${getFontWeight(theme === 'dark')}`}>Thomas (Tom) Bale </span>
                and I&apos;m a student, developer, business owner and Ironman AG Athlete. I am pursuing a Bachelor&apos;s degree in{" "}
                <span className={` ${getFontWeight(theme === 'dark')}`}>
                  Computer Science
                </span>{" "}
                at the
                <span className={` ${getFontWeight(theme === 'dark')}`}>
                  {" "}
                    University of Bristol,
                </span>{" "}
                currently achieving
                <span className={` ${getFontWeight(theme === 'dark')}`}>
                  {" "}
                    83.5% (1st class)
                </span>{" "}
                in my contributing modules. Alongside my university work, I explore my strong super-curricular passions for quantum computing, AI and HPC. I also participate triathlons / Ironman training and co-own a performance cycling products small business.
            </p>
            <p className="mb-5">
                My academic, super curricular and professional experience have given me a good foundation in full-stack development, computer vision and ML; and quantum computing and algorithms. Find my projects below or on my GitHub relating to quantum and AI.
            </p>
            <p >
                Please contact me below if you have any queries or find out more about me on my LinkedIn profile!
            </p>

        </motion.section>
    )
}
