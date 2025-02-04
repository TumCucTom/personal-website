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
        <section
            className="flex flex-col sm:flex-row items-center justify-between w-full px-6 space-y-20 sm:space-y-0 sm:space-x-40"
        >
            {/* Intro Section */}
            <motion.div
                ref={homeRef}
                id="home"
                className="w-full sm:w-1/2 flex flex-col items-center text-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "tween", delay: 0.1, duration: 0.3 }}
            >
                <h1
                    className={`text-5xl sm:text-7xl font-bold transition-colors duration-300 ${
                        theme === "light" ? "text-black" : "text-white"
                    }`}
                >
                    Hi! I am Thomas Bale
                </h1>

                {/* Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-10 px-4 py-10 text-lg font-medium"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Link href="#contact" className="group bg-gray-900 text-white px-10 py-4 flex
                        items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110
                        hover:bg-gray-950 active:scale-105 transition"
                          onClick={() => {
                              setActiveSection("Contact");
                              setTimeOfLastClick(Date.now());
                          }}
                    >
                        Contact me here <BsArrowRight className="group-hover:opacity-60 group-hover:translate-x-2 transition"/>
                    </Link>

                    <a className="group bg-gray-900 text-white px-10 py-4 flex
                        items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110
                        hover:bg-gray-950 active:scale-105 transition"
                       onClick={() => {
                           window.open("https://www.shopveloworks.com/", "_blank");
                           setTimeOfLastClick(Date.now());
                       }}
                    >
                        Business Website <BsArrowRight className="group-hover:opacity-60 group-hover:translate-x-2 transition"/>
                    </a>

                    <a
                        className="group bg-white bg-opacity-90 px-10 py-4 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer border border-black dark:bg-gray-950 dark:bg-opacity-75"
                        href="/CV_Thomas_Bale.pdf"
                        download
                    >
                        Download CV
                        <HiDownload className="opacity-60 group-hover:translate-y-1 transition"/>
                    </a>
                </motion.div>

                {/* Social Icons */}
                <div className="flex gap-5 mt-4">
                    <SocialIcon bgColor="transparent" fgColor="currentColor"
                                style={{ color: theme === "light" ? "black" : "white", width: "120px", height: "120px" }}
                                url="https://www.linkedin.com/in/thomas-bale-5863542a4/"
                    />
                    <SocialIcon bgColor="transparent" fgColor="currentColor"
                                style={{ color: theme === "light" ? "black" : "white", width: "120px", height: "120px" }}
                                url="https://github.com/TumCucTom"
                    />
                </div>
            </motion.div>

            {/* About Section */}
            <motion.div
                ref={aboutRef}
                id="about"
                className="w-full sm:w-1/2 text-center"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 100, y: 0 }}
                transition={{ delay: 0.175 }}
            >
                <SectionHeading>About Me</SectionHeading>
                <p className="mb-10 text-lg leading-9">
                    Hi, my name is{" "}
                    <span className="font-bold">Thomas (Tom) Bale</span>, and I&apos;m a student, developer, business owner, and Ironman AG Athlete. I am pursuing a Bachelor&apos;s degree in{" "}
                    <span className="font-bold">Computer Science</span>
                    {" "} at the{" "}
                    <span className="font-bold">University of Bristol</span>
                    , currently achieving{" "}
                    <span className="font-bold">83.5% (1st class)</span>
                    {" "} average in my contributing modules. Alongside my university work, I explore my strong super-curricular passions for quantum computing, AI, and HPC. I also participate in triathlons/Ironman training and co-own a performance cycling products small business.
                </p>
                <p className="mb-10 text-lg leading-9">
                    My academic, super-curricular, and professional experience have given me a strong foundation in full-stack development, computer vision, ML, quantum computing, and algorithms. Find my projects below or on my GitHub relating to quantum and AI.
                </p>
                <p className="text-lg leading-9">
                    Please contact me below if you have any queries, or find out more about me on my LinkedIn profile!
                </p>
            </motion.div>
        </section>
    );
}
