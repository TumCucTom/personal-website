"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/theme-context";

const timelineEvents = [
    { date: "June 2023", title: "AI for Chess in 3 Dimensions" },
    { date: "July 2024", title: "Ironman Switzerland 140.6" },
    { date: "September 2024", title: "Veloworks Founded" },
    { date: "September 2024", title: "DigitalU3 u3Core Contract" },
    { date: "December 2025", title: "Winner - MIT iQuHack IonQ Content Bounty" },
    { date: "December 2025", title: "Winner - UoB Quantum Computing Society Founded" },
    { date: "February 2025", title: "Winner - ETH Oxford Hackathon" },
    { date: "February 2025", title: "Machine Learning Researcher" },
    { date: "February 2025", title: "Winner - ETH Oxford Hackathon" },
    { date: "March 2025", title: "Google Deepmind Research Internship Offer" },
    { date: "April 2025", title: "Winner - EncodeAI Wormhole Bounty" },
];

export default function AchievementsTimeline() {
    const { theme } = useTheme();
    const [mobileIdx, setMobileIdx] = useState(0);
    const total = timelineEvents.length;
    const aboveEvent = timelineEvents[mobileIdx];
    const belowEvent = timelineEvents[(mobileIdx + 1) % total];

    return (
        <section
            id="home"
            className="relative min-h-screen w-full bg-white flex flex-col items-top justify-start z-10 overflow-hidden"
        >
            {/* Desktop Header */}
            <div className="hidden md:flex w-full absolute top-[0%] px-20 justify-between z-20">
                <div className="text-black absolute left-10 text-left">
                    <div className="flex flex-col items-center space-y-1">
                        <div className="header-title text-2xl font-semibold">Thomas Bale</div>
                        <div className="some text-base text-gray-600 text-center">
                            Athlete | Developer | Student | Entrepreneur
                        </div>
                        <div className="some text-base text-gray-600 text-center">
                            Quantum | ML | AI | HPC
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Right Logo */}
            <div className="hidden md:flex w-full absolute top-3/4 px-10 justify-between z-20">
                <div className="absolute right-10 bottom-1/4 img-wrapper max-w-xs w-full">
                    <a>
                        <img
                            className="header-logo w-full"
                            src="/veloworks.png"
                            alt="Logo"
                            onClick={() => window.open("https://www.shopveloworks.com/", "_blank")}
                        />
                    </a>
                </div>
            </div>

            {/* Desktop Timeline */}
            <div
                className="hidden md:flex absolute left-0 top-1/3 transform -translate-y-1/2
                   w-full h-[500px] overflow-x-auto overflow-y-hidden
                   flex items-center snap-x snap-mandatory hide-scrollbar z-10"
            >
                <div className="flex space-x-20 px-20 relative h-full">
                    {timelineEvents.map((event, idx) => {
                        const isAbove = idx % 2 === 0;
                        const initialY = isAbove ? -50 : 50;

                        return (
                            <div
                                key={idx}
                                className="relative flex-shrink-0 flex flex-col items-center justify-center min-w-[300px] snap-center h-full"
                            >
                                {/* dot */}
                                <div
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                              w-3 h-3 rounded-full bg-gray-600 z-20"
                                />

                                <motion.div
                                    className={`relative flex flex-col items-center justify-center ${
                                        isAbove ? "mb-48" : "mt-48"
                                    }`}
                                    initial={{ opacity: 0, y: initialY }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.5 }}
                                    whileHover={{ scale: 1.05, y: isAbove ? -10 : 10 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    {isAbove && (
                                        <div className="text-xl font-bold text-gray-800 mb-2">
                                            {event.date}
                                        </div>
                                    )}

                                    <div className="p-6 bg-gray-100 rounded-xl shadow-lg text-center z-10">
                                        <div className="text-lg text-gray-700">{event.title}</div>
                                    </div>

                                    {!isAbove && (
                                        <div className="text-xl font-bold text-gray-800 mt-2">
                                            {event.date}
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Center Horizontal Line (desktop only) */}
            <div className="hidden md:block absolute top-1/3 transform -translate-y-1/2 w-full h-1 bg-gray-300 z-0" />

            {/* Mobile Layout */}
            <div className="md:hidden w-full flex flex-col items-center text-center px-6">
                {/* Name & roles */}
                <div className="mt-6 space-y-2">
                    <div className="text-2xl font-semibold">Thomas Bale</div>
                    <div className="text-base text-gray-600">
                        Entrepreneur | Athlete | Developer | Student
                    </div>
                </div>

                {/* Mobile Timeline */}
                <div className="relative w-full h-[300px] flex flex-col items-center justify-center mt-8">
                    {/* Above card */}
                    <motion.div
                        key={`above-${mobileIdx}`}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >
                        <div className="text-xl font-bold text-gray-800 mb-2">
                            {aboveEvent.date}
                        </div>
                        <div className="p-4 bg-gray-100 rounded-xl shadow-lg text-center w-full max-w-xs break-words">
                            <div className="text-lg text-gray-700">{aboveEvent.title}</div>
                        </div>
                    </motion.div>

                    {/* Below card */}
                    <motion.div
                        key={`below-${mobileIdx}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex flex-col items-center pt-6"
                    >
                        <div className="p-4 bg-gray-100 rounded-xl shadow-lg text-center w-full max-w-xs break-words">
                            <div className="text-lg text-gray-700">{belowEvent.title}</div>
                        </div>
                        <div className="text-xl font-bold text-gray-800 mt-2">
                            {belowEvent.date}
                        </div>
                    </motion.div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex space-x-4 mt-6 mb-6">
                    <button
                        onClick={() => setMobileIdx((mobileIdx - 2 + total) % total)}
                        className="px-4 py-2 bg-gray-200 rounded-lg shadow"
                    >
                        ←
                    </button>
                    <button
                        onClick={() => setMobileIdx((mobileIdx + 2) % total)}
                        className="px-4 py-2 bg-gray-200 rounded-lg shadow"
                    >
                        →
                    </button>
                </div>

                {/* Veloworks Logo (mobile) */}
                <div className="mb-6">
                    <a>
                        <img
                            className="w-full max-w-full"
                            src="/veloworks.png"
                            alt="Logo"
                            onClick={() =>
                                window.open("https://www.shopveloworks.com/", "_blank")
                            }
                        />
                    </a>
                </div>
            </div>
        </section>
    );
}
