"use client";

import { projectsData } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

type ProjectProps = (typeof projectsData)[number];

export default function ProjectsGrid() {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-5 sm:px-10 py-10">
            {projectsData.map((project, index) => (
                <Project key={index} {...project} />
            ))}
        </section>
    );
}

function Project({ title, description, tags, imageUrl, link }: ProjectProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"],
    });
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    const [isOpen, setIsOpen] = useState(false); // Modal state

    return (
        <>
            {/* Project Card */}
            <motion.div
                ref={ref}
                style={{
                    scale: scaleProgress,
                    opacity: opacityProgress,
                }}
                className="group bg-white/55 dark:bg-white/10 border border-black/5 rounded-lg
                    overflow-hidden transition hover:bg-white/90 dark:hover:bg-white/20 shadow-lg"
            >
                <section
                    className="cursor-pointer flex flex-col sm:flex-row h-[320px] p-6 gap-4"
                    onClick={() => setIsOpen(true)}
                >
                    {/* Image on the Left with Fixed Size on Mobile */}
                    <div className="w-full sm:w-1/3 flex-shrink-0">
                        <Image
                            src={imageUrl}
                            alt="Project I worked on"
                            quality={95}
                            className="w-[250px] h-[180px] sm:w-full sm:h-full object-cover rounded-md mx-auto sm:mx-0"
                        />
                    </div>

                    {/* Text Content on the Right */}
                    <div className="flex flex-col w-full sm:w-2/3">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h3>

                        {/* Truncated Description */}
                        <p className="mt-2 text-gray-700 dark:text-white/70 leading-relaxed line-clamp-3">
                            {description}
                        </p>

                        {/* Tags */}
                        <ul className="flex flex-wrap mt-4 py-2 gap-2">
                            {tags.map((tag, index) => (
                                <li
                                    className="bg-blue-500 dark:bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase
                                    tracking-wider text-white rounded-full dark:text-white/70"
                                    key={index}
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </motion.div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-2xl">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold">{title}</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
                            >
                                ✖
                            </button>
                        </div>

                        {/* Full Project Description */}
                        <p className="text-gray-700 dark:text-white/70">{description}</p>

                        {/* External Link */}
                        <div className="mt-4">
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                View Project ↗
                            </a>
                        </div>

                        {/* Close Button */}
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
