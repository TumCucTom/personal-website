"use client";

import React, { useState, useRef, useEffect } from "react";
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

    const containerRef = useRef<HTMLElement>(null);
    const indexRef = useRef(0);
    const directionRef = useRef(1);
    const isPausedRef = useRef(false);
    const scrollTimeoutRef = useRef<number>();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const wrapper = container.querySelector(".flex.space-x-20");
        if (!wrapper) return;
        const items = Array.from(wrapper.children) as HTMLElement[];

        // Calculate nearest index based on current scroll position
        const calculateIndexFromScroll = () => {
            const containerCenter = container.scrollLeft + container.clientWidth / 2;
            let nearest = 0;
            let minDist = Infinity;
            items.forEach((el, idx) => {
                const elCenter = el.offsetLeft + el.offsetWidth / 2;
                const dist = Math.abs(elCenter - containerCenter);
                if (dist < minDist) {
                    minDist = dist;
                    nearest = idx;
                }
            });
            return nearest;
        };

        // Scroll a specific element into center smoothly
        const scrollToCenter = (el: HTMLElement) => {
            const containerCenter = container.clientWidth / 2;
            const elCenter = el.offsetLeft + el.offsetWidth / 2;
            const offset = elCenter - containerCenter;
            container.scrollTo({ left: offset, behavior: "smooth" });
        };

        // Advance to next index with bounce
        const advanceIndex = () => {
            let next = indexRef.current + directionRef.current;
            if (next >= items.length) {
                directionRef.current = -1;
                next = items.length - 2;
            } else if (next < 0) {
                directionRef.current = 1;
                next = 1;
            }
            indexRef.current = next;
            scrollToCenter(items[next]);
        };

        // Interval for auto advance
        const intervalId = window.setInterval(() => {
            if (!isPausedRef.current) advanceIndex();
        }, 2000);

        // On user scroll, pause and reset index after end
        const onScroll = () => {
            isPausedRef.current = true;
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = window.setTimeout(() => {
                const newIndex = calculateIndexFromScroll();
                indexRef.current = newIndex;
                isPausedRef.current = false;
            }, 150);
        };

        container.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            clearInterval(intervalId);
            container.removeEventListener("scroll", onScroll);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, []);

    // Auto-cycle mobile timeline
    useEffect(() => {
        const interval = setInterval(() => {
            setMobileIdx((idx) => (idx + 2) % total);
        }, 4000);
        return () => clearInterval(interval);
    }, [total]);

    return (
        <section
            id="home"
            className="relative min-h-screen w-full bg-white flex flex-col items-top justify-start z-10 overflow-hidden"
        >
            {/* Desktop Header */}
            <div className="hidden md:flex w-full absolute top-[0%] px-20 justify-between z-20">
                <div className="text-black absolute left-1/2 transform -translate-x-1/2 text-center">
                    <div className="flex flex-col items-center space-y-1">
                        <div className="header-title text-6xl font-semibold">Hi, I&apos;m Thomas Bale</div>
                        <div className="some text-xl text-gray-600 text-center">
                            Athlete | Developer | Student | Entrepreneur
                        </div>
                        <div className="some text-lg text-gray-600 text-center">
                            Quantum | ML | AI | HPC
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Right Logo */}
            <div className="hidden md:flex w-full absolute top-3/4 px-10 justify-between z-20">
                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 img-wrapper max-w-xs w-full">
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
                ref={containerRef as any}
                className="hidden md:flex absolute left-0 top-[40%] transform -translate-y-1/2 w-full h-[500px] overflow-x-auto overflow-y-hidden flex items-center snap-x snap-mandatory hide-scrollbar z-10"
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
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-600 z-20" />

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
                                    {isAbove && <div className="text-xl font-bold text-gray-800 mb-2">{event.date}</div>}
                                    <div className="p-6 bg-gray-100 rounded-xl shadow-lg text-center z-10">
                                        <div className="text-lg text-gray-700">{event.title}</div>
                                    </div>
                                    {!isAbove && <div className="text-xl font-bold text-gray-800 mt-2">{event.date}</div>}
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Center Horizontal Line (desktop only) */}
            <div className="hidden md:block absolute top-[40%] transform -translate-y-1/2 w-full h-1 bg-gray-300 z-0" />

            {/* Mobile Layout */}
            <div className="md:hidden w-full flex flex-col items-center text-center px-6">
                {/* Name & roles */}
                <div className="mt-6 space-y-2">
                    <div className="text-5xl font-semibold">Thomas Bale</div>
                    <div className="text-base text-gray-600">Entrepreneur | Athlete | Developer | Student</div>
                </div>

                {/* Mobile Timeline */}
                <div className="relative w-full h-[300px] flex flex-col items-center justify-center mt-8">
                    <motion.div
                        key={`above-${mobileIdx}`}
                        initial={{opacity: 0, y: -50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.4, ease: "easeOut"}}
                        className="flex flex-col items-center"
                    >
                        <div className="text-xl font-bold text-gray-800 mb-2">{aboveEvent.date}</div>
                        <div className="p-4 bg-gray-100 rounded-xl shadow-lg text-center w-full max-w-xs break-words">
                            <div className="text-lg text-gray-700">{aboveEvent.title}</div>
                        </div>
                    </motion.div>

                    <motion.div
                        key={`below-${mobileIdx}`}
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.4, ease: "easeOut"}}
                        className="flex flex-col items-center pt-6"
                    >
                        <div className="p-4 bg-gray-100 rounded-xl shadow-lg text-center w-full max-w-xs break-words">
                            <div className="text-lg text-gray-700">{belowEvent.title}</div>
                        </div>
                        <div className="text-xl font-bold text-gray-800 mt-2">{belowEvent.date}</div>
                    </motion.div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex space-x-4 mt-6 mb-6">
                    <button onClick={() => setMobileIdx((mobileIdx - 2 + total) % total)}
                            className="px-4 py-2 bg-gray-200 rounded-lg shadow">←
                    </button>
                    <button onClick={() => setMobileIdx((mobileIdx + 2) % total)}
                            className="px-4 py-2 bg-gray-200 rounded-lg shadow">→
                    </button>
                </div>
                <div className="absolute mb-6 bottom-[20%]">
                    <a>
                        <img className="w-full max-w-full" src="/veloworks.png" alt="Logo"
                             onClick={() => window.open("https://www.shopveloworks.com/", "_blank")}/>
                    </a>
                </div>
            </div>
        </section>
    );
}
