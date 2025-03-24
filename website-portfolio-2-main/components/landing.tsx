"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "@/context/theme-context";

const videoListWhite = [
    "/video/first-house.mp4",
    "/video/main-tower.mp4",
    "/video/tower.mp4",
    "/video/tower-water.mp4",
    "/video/zero-home.mp4",
];

const LOCAL_STORAGE_KEY = "lastPlayedVideoIndex";

export default function VideoCyclePlayer() {
    const { theme } = useTheme();
    const videoList = videoListWhite;

    const [videoIndex, setVideoIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const savedIndex = parseInt(localStorage.getItem(LOCAL_STORAGE_KEY) || "0");
        const nextIndex = (savedIndex + 1) % videoList.length;
        setVideoIndex(nextIndex);
        localStorage.setItem(LOCAL_STORAGE_KEY, nextIndex.toString());

        const handlePlayVideo = () => {
            videoRef.current?.play().catch(() => {});
        };

        window.addEventListener("playLandingVideo", handlePlayVideo);
        return () => window.removeEventListener("playLandingVideo", handlePlayVideo);
    }, [theme]);

    const handleClick = () => {
        const nextIndex = (videoIndex + 1) % videoList.length;
        setVideoIndex(nextIndex);
        localStorage.setItem(LOCAL_STORAGE_KEY, nextIndex.toString());
        setIsLoaded(false); // Reset loader when switching
    };

    return (
        <section
            id="home"
            className="relative min-h-screen w-full bg-white flex flex-col items-top justify-start z-10"
        >
            {/* Desktop Header (absolute, left and right) */}
            <div className="hidden md:flex w-full absolute style={{ top: '21%' }} px-20 justify-between z-20">
                {/* Left Text - 3/4 Up (25% from top) */}
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

            {/* Right Logo - 3/4 Down (75% from top) */}
            <div className="hidden md:flex w-full absolute top-3/4 px-10 justify-between z-20">
                <div className="absolute right-10 bottom-1/4 img-wrapper max-w-xs w-full">
                    <a target="_self" href="/">
                        <img
                            className="header-logo w-full"
                            id="header-logo"
                            src="/veloworks.png"
                            alt="Logo"
                        />
                    </a>
                </div>
            </div>

            {/* Video Section */}
            <div
                className="absolute left-1/2 top-1/2 md:top-10 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl cursor-pointer transition duration-300"
                onClick={handleClick}
            >
                {!isLoaded && (
                    <div className="h-full bg-white animate-pulse rounded-xl"/>
                )}

                <video
                    ref={videoRef}
                    key={videoList[videoIndex]}
                    className={`w-full h-auto ${!isLoaded ? "hidden" : "block"}`}
                    src={videoList[videoIndex]}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedData={() => setIsLoaded(true)}
                />
            </div>

                {/* Mobile Stacked Header (below video) */}
                <div className="md:hidden flex flex-col items-center mt-6 px-6 text-black text-center space-y-4">
                    <div className="text-2xl font-semibold">Thomas Bale</div>
                    <div className="text-base text-gray-600">
                        Entrepreneur | Athlete | Developer | Student
                    </div>
                    <div className="w-full max-w-sm">
                        <a target="_self" href="/">
                            <img
                                className="header-logo w-full"
                                id="header-logo"
                                src="/veloworks.png"
                                alt="Logo"
                            />
                        </a>
                    </div>
                </div>
        </section>

);
}
