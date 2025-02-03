"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/theme-context";

export default function ParticlesBackground() {
    const { theme } = useTheme(); // Get the current theme ("light" or "dark")
    const [videoSize, setVideoSize] = useState({ width: "100vw", height: "100vh" });

    useEffect(() => {
        const updateSize = () => {
            const aspectRatio = 16 / 9; // Adjust based on your video
            const windowRatio = window.innerWidth / window.innerHeight;

            if (windowRatio > aspectRatio) {
                // If screen is wider than video aspect ratio → set height to full screen
                setVideoSize({ width: "auto", height: "100vh" });
            } else {
                // If screen is taller than video aspect ratio → set width to full screen
                setVideoSize({ width: "100vw", height: "auto" });
            }
        };

        updateSize(); // Call initially
        window.addEventListener("resize", updateSize);

        return () => window.removeEventListener("resize", updateSize);
    }, []); // Empty dependency array ensures this runs only once

    // Choose video based on theme
    const videoSrc = theme === "dark"
        ? "/particles-dark.webm"  // Dark particles for light theme
        : "/particles-light.webm"; // Light particles for dark theme

    return (
        <video
            className="absolute top-0 left-0 -z-10"
            autoPlay
            loop
            muted
            playsInline
            key={videoSrc} // Forces React to re-render when theme changes
            style={{
                width: videoSize.width,
                height: videoSize.height,
                objectFit: "cover",
                position: "fixed"
            }}
        >
            <source src={videoSrc} type="video/webm" />
            <source src={videoSrc.replace(".webm", ".mp4")} type="video/mp4" />
        </video>
    );
}
