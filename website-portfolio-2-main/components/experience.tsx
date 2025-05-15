'use client';
import React from 'react';
import { useSectionInView } from '@/lib/hooks';
import SectionHeading from './section-heading';
import { experiencesData } from '@/lib/data';
import { useTheme } from '@/context/theme-context';

export default function Experience() {
    const { ref } = useSectionInView('Experience');
    const { theme } = useTheme();

    return (
        <section ref={ref} id="experience" className="mb-28 scroll-mt-28 text-center sm:mb-40">
            <SectionHeading>My Experience</SectionHeading>

            {/* Desktop: Two-column grid */}
            <div className="hidden sm:grid grid-cols-2 gap-8 max-w-6xl mx-auto">
                {experiencesData.map((item, index) => (
                    <div
                        key={index}
                        className="relative bg-opacity-75 p-6 rounded-lg shadow-lg border border-black/5
                      flex items-start gap-4 bg-white dark:bg-white/10 dark:hover:bg-white/20"
                    >
                        {/* Icon Container */}
                        <div
                            className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-400
                         bg-white dark:bg-black shadow-md text-xl"
                        >
                            {item.icon}
                        </div>

                        {/* Experience Details */}
                        <div className="text-left w-full">
                            <h3 className="font-bold text-lg dark:text-white/80">{item.title}</h3>
                            <h4 className="font-semibold text-md dark:text-white/60">{item.subtitle}</h4>
                            <p className="text-gray-500 dark:text-gray-300 text-sm">{item.date}</p>
                            <p className="text-gray-700 dark:text-white/75 mt-2 leading-relaxed whitespace-pre-line">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile: Stacked vertical layout */}
            <div className="sm:hidden block space-y-6">
                {experiencesData.map((item, index) => (
                    <div
                        key={index}
                        className="relative bg-opacity-75 p-6 rounded-lg shadow-lg border border-black/5
                      flex items-start gap-4 bg-white dark:bg-white/10 dark:hover:bg-white/20"
                    >
                        <div
                            className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-400
                         bg-white dark:bg-black shadow-md text-xl"
                        >
                            {item.icon}
                        </div>
                        <div className="text-left w-full">
                            <h3 className="font-bold text-lg dark:text-white/80">{item.title}</h3>
                            <h4 className="font-semibold text-md dark:text-white/60">{item.subtitle}</h4>
                            <p className="text-gray-500 dark:text-gray-300 text-sm">{item.date}</p>
                            <p className="text-gray-700 dark:text-white/75 mt-2 leading-relaxed whitespace-pre-line">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
