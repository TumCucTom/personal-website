"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/theme-context";
import Link from "next/link";
import {BsArrowRight} from "react-icons/bs";
import {HiDownload} from "react-icons/hi";
import {SocialIcon} from "react-social-icons";
import {useActiveSectionContext} from "@/context/active-section-context";


const timelineEvents = [
    { date: "June 2023", title: "AI for Chess in 3 Dimensions", img: "/chess.png" },
    { date: "July 2024", title: "Ironman Switzerland 140.6", img: "/IS3.png" },
    { date: "September 2024", title: "Veloworks Founded", img: "vel.png" },
    { date: "September 2024", title: "DigitalU3 u3Core Contract", img: "/u3.png" },
    { date: "December 2024", title: "DeepSynthetics Racing Trading", img: "/AWH.png" },
    { date: "December 2024", title: "MIT iQuHack IonQ Content Bounty", img: "/bris2.png" },
    { date: "December 2024", title: "UOBQC Founded", img: "/bris1.png" },
    { date: "February 2025", title: "Winner - ETH Oxford Hackathon", img: "/medi.png" },
    { date: "February 2025", title: "Machine Learning Researcher", img: "/emotional.png" },
    { date: "March 2025", title: "Google Deepmind Research Internship Offer", img: "/deep.png" },
    { date: "April 2025", title: "EncodeAI Wormhole Bounty", img: "/encode.png" },
    { date: "May 2025", title: "UK HPC Team For ISC'25", img: "/isc.png" },
    { date: "August 2025", title: "Demonstrator", img: "/bris-logo.png" },
    { date: "August 2025", title: "Graduate Teacher", img: "/bris-logo.png" },
];


export default function AchievementsTimeline() {
    const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
    const { theme } = useTheme();

    const containerRef = useRef<HTMLElement>(null);
    const mobileContainerRef = useRef<HTMLDivElement>(null);
    const indexRef = useRef(0);
    const directionRef = useRef(1);
    const isPausedRef = useRef(false);
    const scrollTimeoutRef = useRef<number>();
    const mobileScrollPausedRef = useRef(false);
    const mobileScrollTimeoutRef = useRef<number | undefined>(undefined);

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

    // Auto-scroll mobile timeline
    useEffect(() => {
        const container = mobileContainerRef.current;
        if (!container) return;

        // Initialize scroll position
        let lastScrollLeft = 0;
        let isUserScrolling = false;
        let isAutoScrolling = false;
        let scrollStartDelay = setTimeout(() => {
            lastScrollLeft = container.scrollLeft;
        }, 100);

        const scroll = () => {
            if (mobileScrollPausedRef.current || isUserScrolling) return;
            
            isAutoScrolling = true;
            const currentScroll = container.scrollLeft;
            const scrollAmount = currentScroll + 3; // Increased from 1 to 3 pixels per interval
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            // Only auto-scroll forward, don't reset if user might be scrolling
            if (scrollAmount < maxScroll) {
                container.scrollTo({ left: scrollAmount, behavior: 'auto' });
            } else {
                // Only reset if we're at the end and not paused
                if (!mobileScrollPausedRef.current && !isUserScrolling) {
                    container.scrollTo({ left: 0, behavior: 'auto' });
                }
            }
            
            // Reset flag after a short delay
            setTimeout(() => {
                isAutoScrolling = false;
            }, 50);
        };

        // Start auto-scroll after a brief delay to ensure container is ready
        let intervalId: number | undefined;
        const startInterval = setTimeout(() => {
            intervalId = window.setInterval(scroll, 20); // Smooth continuous scroll
        }, 200);

        // Detect user scrolling (only if not auto-scrolling)
        const onScroll = () => {
            if (isAutoScrolling) {
                lastScrollLeft = container.scrollLeft;
                return;
            }
            
            const currentScrollLeft = container.scrollLeft;
            const scrollDifference = Math.abs(currentScrollLeft - lastScrollLeft);
            
            // If scroll difference is significant and not from auto-scroll, user is scrolling
            if (scrollDifference > 10) {
                isUserScrolling = true;
                mobileScrollPausedRef.current = true;
                
                // Clear any pending resume
                if (mobileScrollTimeoutRef.current) clearTimeout(mobileScrollTimeoutRef.current);
                
                // Resume auto-scroll after user stops scrolling
                mobileScrollTimeoutRef.current = window.setTimeout(() => {
                    isUserScrolling = false;
                    mobileScrollPausedRef.current = false;
                }, 3000); // Resume after 3 seconds of no interaction
            }
            
            lastScrollLeft = currentScrollLeft;
        };

        container.addEventListener("scroll", onScroll, { passive: true });
        container.addEventListener("touchstart", () => {
            isUserScrolling = true;
            mobileScrollPausedRef.current = true;
        });
        container.addEventListener("touchend", () => {
            if (mobileScrollTimeoutRef.current) clearTimeout(mobileScrollTimeoutRef.current);
            mobileScrollTimeoutRef.current = window.setTimeout(() => {
                isUserScrolling = false;
                mobileScrollPausedRef.current = false;
            }, 3000);
        });

        return () => {
            clearTimeout(scrollStartDelay);
            clearTimeout(startInterval);
            if (intervalId) clearInterval(intervalId);
            container.removeEventListener("scroll", onScroll);
            if (mobileScrollTimeoutRef.current) clearTimeout(mobileScrollTimeoutRef.current);
        };
    }, []);

    return (
        <section
            id="home"
            className="relative min-h-screen bg-white/50 w-full flex flex-col items-top justify-start z-10 overflow-hidden"
        >

            {/* Desktop Header */}
            <div className="hidden md:flex w-full absolute top-[0%] px-20 justify-between z-20">
                <div className="text-black absolute left-1/2 transform -translate-x-1/2 text-center">
                    <div className="flex flex-col items-center space-y-1">
                        <div className="header-title text-6xl font-semibold">Hi, I&apos;m Thomas Bale</div>
                        <div className="some text-xl text-gray-600 text-center">
                            Founder | Athlete | Developer
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Buttons (Row Layout) */}
            <motion.div
                className="hidden md:flex absolute z-20 flex-wrap bottom-[20%] items-center justify-center gap-6 w-full px-4 py-10 text-lg font-medium"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <a
                    href="mailto:tokbale@outlook.com"
                    className="group bg-gray-900 text-white px-10 py-4 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 transition"
                >
                    Contact me here
                    <BsArrowRight className="group-hover:opacity-60 group-hover:translate-x-2 transition" />
                </a>

                <a
                    className="group bg-gray-900 text-white px-10 py-4 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 transition"
                    onClick={() => window.open("https://www.instagram.com/veloworkscomponents/", "_blank")}
                >
                    Business Website
                    <BsArrowRight className="group-hover:opacity-60 group-hover:translate-x-2 transition" />
                </a>

                <a
                    className="group bg-gray-900 text-white px-10 py-4 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 transition"
                    href="https://thomasbale.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Default portfolio
                    <BsArrowRight className="group-hover:opacity-60 group-hover:translate-x-2 transition" />
                </a>

                <a
                    className="group bg-white bg-opacity-90 px-10 py-4 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 transition cursor-pointer border border-black dark:bg-gray-950 dark:border-white dark:bg-opacity-75"
                    href="/CV_Thomas_Bale.pdf"
                    download
                >
                    Download CV
                    <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
                </a>
                {/* Social Icons in One Row */}
                <div className="flex justify-center gap-6 mt-2">
                    <SocialIcon
                        bgColor="transparent"
                        fgColor="currentColor"
                        className="cursor-pointer w-14 h-14"
                        style={{ color: theme === "light" ? "black" : "white" }}
                        url="https://www.linkedin.com/in/thomas-bale-5863542a4/"
                    />

                    <SocialIcon
                        bgColor="transparent"
                        fgColor="currentColor"
                        className="cursor-pointer w-14 h-14"
                        style={{ color: theme === "light" ? "black" : "white" }}
                        url="https://github.com/TumCucTom"
                    />
                </div>
            </motion.div>

            {/* Desktop Timeline */}
            <div
                ref={containerRef as any}
                className="hidden md:flex absolute left-0 top-[40%] transform -translate-y-1/2 w-full h-[500px] overflow-x-auto overflow-y-hidden flex items-center snap-x snap-mandatory hide-scrollbar z-10"
            >
                <div className="flex space-x-20 px-20 relative h-full">
                    {timelineEvents.map((event, idx) => {
                        const isAbove = idx % 2 === 0;
                        const initialY = isAbove ? 0 : 0;

                        return (
                            <div
                                key={idx}
                                className="relative flex-shrink-0 flex flex-col items-center justify-center min-w-[300px] snap-center h-full"
                            >
                                {/* dot */}
                                <div
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 z-20"/>

                                <motion.div
                                    className={`relative flex flex-col items-center justify-center ${isAbove ? "mb-5" : "mt-5"}`}
                                    initial={{opacity: 0, y: initialY}}
                                    whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: false, amount: 0.5}}
                                    whileHover={{scale: 1.05,}}
                                    transition={{duration: 0.5, ease: "easeOut"}}
                                >
                                    {isAbove ? (
                                        <>
                                        <div className="flex flex-col items-center gap-10">
                                            {/* Date and Title */}
                                            <div className="text-center">
                                            <div className="text-xl font-bold text-gray-800 mb-2">{event.date}</div>
                                            <div className="p-6 bg-gray-100 rounded-xl shadow-lg text-center z-10">
                                                <div className="text-lg text-gray-700">{event.title}</div>
                                            </div>
                                            </div>
                                            {/* Image above */}
                                            <img
                                                src={event.img}
                                                alt={event.title}
                                                className="w-32 h-32 object-cover rounded-lg mb-20 shadow-md"
                                            />
                                        </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex flex-col items-center gap-10">
                                            {/* Image below */}
                                            <img
                                                src={event.img}
                                                alt={event.title}
                                                className="w-32 h-32 object-cover rounded-lg mt-20 shadow-md"
                                            />
                                            {/* Date and Title first */}
                                                <div className="text-center">
                                                    <div
                                                        className="p-6 bg-gray-100 rounded-xl shadow-lg text-center z-10">
                                                        <div className="text-lg text-gray-700">{event.title}</div>
                                                    </div>
                                                    <div
                                                        className="p-6 text-xl font-bold text-gray-800 mb-2">{event.date}</div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Center Horizontal Line (desktop only) */}
            <div className="hidden md:block absolute top-[39%] transform -translate-y-1/2 w-full h-1 bg-gray-300 z-0"/>

            {/* Mobile Layout */}
            <div className="md:hidden w-full flex flex-col items-center text-center px-6">
                {/* Name & roles */}
                <div className="mt-6 space-y-2">
                    <div className="text-5xl font-semibold">Thomas Bale</div>
                    <div className="text-base text-gray-600">Founder | Athlete | Developer</div>
                </div>

                {/* Mobile Timeline */}
                <div 
                    ref={mobileContainerRef}
                    className="relative w-full flex items-center justify-start mt-8 overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-4 scrollbar-hide"
                    style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
                >
                    <div className="flex space-x-6 px-4 relative items-start" style={{ width: 'max-content', minWidth: '100%' }}>
                        {timelineEvents.map((event, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className="relative flex-shrink-0 flex flex-col items-center justify-center w-[200px] snap-center"
                                >
                                    <motion.div
                                        className="relative flex flex-col items-center gap-3"
                                        initial={{opacity: 0, y: 20}}
                                        whileInView={{opacity: 1, y: 0}}
                                        viewport={{once: false, amount: 0.3}}
                                        transition={{duration: 0.4, ease: "easeOut"}}
                                    >
                                        {/* Title above */}
                                        <div className="text-center w-full">
                                            <div className="text-sm font-bold text-gray-800 mb-1">{event.date}</div>
                                            <div className="p-3 bg-gray-100 rounded-xl shadow-lg text-center">
                                                <div className="text-sm text-gray-700 leading-tight">{event.title}</div>
                                            </div>
                                        </div>
                                        {/* Image below - square */}
                                        <img
                                            src={event.img}
                                            alt={event.title}
                                            className="w-32 h-32 object-cover rounded-lg shadow-md"
                                        />
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* Mobile-Only Buttons (Stacked) */}
                <div className="flex flex-col gap-4 w-60 md:hidden">
                    {/* 3 Buttons Stacked */}
                    <a
                        href="mailto:tokbale@outlook.com"
                        className="group bg-gray-900 text-white px-6 py-4 flex items-center justify-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 transition"
                        onClick={() => setTimeOfLastClick(Date.now())}
                    >
                        Contact me here
                        <BsArrowRight className="group-hover:opacity-60 group-hover:translate-x-2 transition" />
                    </a>

                    <a
                        className="group bg-gray-900 text-white px-6 py-4 flex items-center justify-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 transition"
                        onClick={() => {
                            window.open("https://www.instagram.com/veloworkscomponents/", "_blank");
                            setTimeOfLastClick(Date.now());
                        }}
                    >
                        Business Website
                        <BsArrowRight className="group-hover:opacity-60 group-hover:translate-x-2 transition" />
                    </a>

                    <a
                        className="group bg-gray-900 text-white px-6 py-4 flex items-center justify-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 transition"
                        href="https://thomasbale.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setTimeOfLastClick(Date.now())}
                    >
                        Default portfolio
                        <BsArrowRight className="group-hover:opacity-60 group-hover:translate-x-1 transition" />
                    </a>

                    <a
                        className="group bg-white bg-opacity-90 px-6 py-4 flex items-center justify-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 transition cursor-pointer border border-black dark:bg-gray-950 dark:border-white dark:bg-opacity-75"
                        href="/CV_Thomas_Bale.pdf"
                        download
                    >
                        Download CV
                        <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
                    </a>

                    {/* Social Icons in One Row */}
                    <div className="flex justify-center gap-6 mt-2">
                        <SocialIcon
                            bgColor="transparent"
                            fgColor="currentColor"
                            className="cursor-pointer w-14 h-14"
                            style={{ color: theme === "light" ? "black" : "white" }}
                            url="https://www.linkedin.com/in/thomas-bale-5863542a4/"
                        />

                        <SocialIcon
                            bgColor="transparent"
                            fgColor="currentColor"
                            className="cursor-pointer w-14 h-14"
                            style={{ color: theme === "light" ? "black" : "white" }}
                            url="https://github.com/TumCucTom"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
