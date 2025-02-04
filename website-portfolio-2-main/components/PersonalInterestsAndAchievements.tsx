"use client";

import { interestsAndAchievements } from "@/lib/data";
import SectionHeading from './section-heading'
import { motion } from "framer-motion";
import Image from "next/image";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import React from "react";

export default function PersonalInterestsAndAchievements() {
    const { ref } = useSectionInView('Achievements');
    const { theme } = useTheme();
    return (
        <div ref={ref} id="achievements" className="p-6 space-y-8 mb-28 scroll-mt-28 text-center sm:mb-40">
            <SectionHeading>My achievements and interests</SectionHeading>
            {interestsAndAchievements.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-white/55 border border-black/5 rounded-lg
                        overflow-hidden sm:pr-8 relative mb-3 sm:mb-8 last:mb-0 even:pl-8
                        hover:bg-white/90 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20 shadow-lg p-6 mx-auto max-w-screen-sm"
                    style={{ maxWidth: "850px" }} // Limiting the width
                >

                    <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                    <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                    {item.photos && item.photos.length > 0 && (
                        <div className="mt-4 overflow-x-auto flex space-x-4 pb-4">
                            {item.photos.slice(0, 3).map((photo, photoIndex) => (
                                <div key={photoIndex} className="flex-shrink-0">
                                    <Image
                                        src={photo}
                                        alt={`${item.title} photo ${photoIndex + 1}`}
                                        width={200}
                                        height={200}
                                        className="rounded-lg shadow-md object-cover aspect-square sm:w-[250px] sm:h-[250px]"
                                    />
                                </div>
                            ))}
                        </div>
                )}
                </motion.div>
            ))}
        </div>
    );
}
