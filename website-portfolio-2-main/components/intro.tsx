"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import { SocialIcon } from 'react-social-icons';
import SectionHeading from './section-heading';
import { useActiveSectionContext } from '@/context/active-section-context';
import { useSectionInView } from '@/lib/hooks';
import { useTheme } from '@/context/theme-context';

export default function IntroAbout() {
    const { ref: homeRef } = useSectionInView("Home", 0.5);
    const { ref: aboutRef } = useSectionInView("About", 0.8);
    const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
    const { theme } = useTheme();

    return (
        <section className="w-full px-6 sm:px-12 md:px-20 max-w-8xl mx-auto">

            {/* Main Container - Responsive Layout */}
            <div className="flex flex-col md:flex-row items-center md:items-start w-full gap-y-10">

                {/* SVG Section (Full width on mobile, left-aligned on desktop) */}
                <motion.div
                    ref={homeRef}
                    id="home"
                    className="w-[100vw] scale-[1.5] md:w-[45%] flex flex-col items-center md:items-start"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "tween", delay: 0.1, duration: 0.3 }}
                >
                    <a href="https://github.com/TumCucTom/TumCucTom">
                        <img
                            alt="Thomas Bale&apos;s GitHub Profile"
                            src={
                                theme === "light"
                                    ? "https://raw.githubusercontent.com/TumCucTom/TumCucTom/main/light_mode.svg"
                                    : "https://raw.githubusercontent.com/TumCucTom/TumCucTom/main/dark_mode.svg"
                            }
                            className="w-full max-w-full mx-auto opacity-70"
                        />
                    </a>
                </motion.div>

                {/* About Me Section (Full Width on Mobile, Right-Aligned on Desktop) */}
                <motion.div
                    ref={aboutRef}
                    id="about"
                    className="w-full md:w-[55%] text-center md:text-center text-sm md:text-lg"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.175 }}
                >
                    <SectionHeading>About Me</SectionHeading>
                    <p className="mb-4 text-lg leading-9">
                        Hi, my name is <span className="font-bold">Thomas (Tom) Bale</span>, and I&apos;m a
                        student, developer, business owner, and Ironman AG Athlete. I am pursuing a
                        Bachelor&apos;s degree in <span className="font-bold">Computer Science</span> at the{" "}
                        <span className="font-bold">University of Bristol</span>, currently achieving{" "}
                        <span className="font-bold">83.5% (1st class)</span> average in my contributing
                        modules and <span className="font-bold">top in cohort</span> for computer systems A (86%). Alongside my university work,
                        I explore my strong super-curricular passions
                        for quantum computing, AI, and HPC. I also participate in triathlons/Ironman training
                        and co-own a performance cycling products small business.
                    </p>
                    <p className="mb-4 text-lg leading-9">
                        My academic, super-curricular, and professional experience have given me a strong
                        foundation in full-stack development, computer vision, ML, quantum computing, and
                        algorithms. Find my projects below or on my GitHub relating to quantum and AI.
                    </p>
                    <p className="text-lg leading-9">
                        Please contact me below if you have any queries, or find out more about me on my
                        LinkedIn profile!
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
