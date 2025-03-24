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

const videoListBlack = [
    "/video/001.mp4",
    "/video/002.mp4",
    "/video/003.mp4",
    "/video/004.mp4",
    "/video/005.mp4",
];

const LOCAL_STORAGE_KEY = "lastPlayedVideoIndex";

export default function VideoCyclePlayer() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const videoList = isDark ? videoListBlack : videoListWhite;

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
        <div
            className="w-full max-w-3xl mx-auto overflow-hidden cursor-pointer transition duration-300"
            onClick={handleClick}
        >
            {/* Placeholder with 16:9 aspect ratio */}
            {!isLoaded && (
                <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 animate-pulse rounded-xl" />
            )}

            <video
                key={videoList[videoIndex]} // Force reload on video source change
                className={`w-full h-auto ${!isLoaded ? "hidden" : "block"}`}
                src={videoList[videoIndex]}
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={() => setIsLoaded(true)}
            />
        </div>
    );
}
