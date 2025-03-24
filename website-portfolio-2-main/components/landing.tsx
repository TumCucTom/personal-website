"use client";

import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        const savedIndex = parseInt(localStorage.getItem(LOCAL_STORAGE_KEY) || "0");
        const nextIndex = (savedIndex + 1) % videoList.length;
        setVideoIndex(nextIndex);
        localStorage.setItem(LOCAL_STORAGE_KEY, nextIndex.toString());
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
            <div className="hidden md:flex w-full absolute top-1/5 px-20 justify-between items-center z-20">
                {/* Left Text */}
                <div className="text-black text-left">
                    <div className="flex flex-col items-center space-y-1">
                        <div className="header-title text-2xl font-semibold">Thomas Bale</div>
                        <div className="some text-base text-gray-600 text-center">
                            Entrepreneur | Athlete | Developer | Student
                        </div>
                    </div>
                    {/* Right Logo */}
                    <div className="img-wrapper w-full max-w-xs">
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
            </div>

            {/* Video Section */}
            <div
                className="w-full max-w-3xl mx-auto overflow-hidden cursor-pointer transition duration-300"
                onClick={handleClick}
            >
                {!isLoaded && (
                    <div className="h-full bg-white animate-pulse rounded-xl"/>
                )}

                <video
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
