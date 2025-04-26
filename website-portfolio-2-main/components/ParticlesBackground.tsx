"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/theme-context";

export default function ParticlesBackground() {
    const { theme, toggleTheme } = useTheme();
    const [isPortrait, setIsPortrait] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [fadeInIndex, setFadeInIndex] = useState(0); // Track which image is fading in
    const images = [
        "/heatmaps/1.png",
        "/heatmaps/3.png",
        "/heatmaps/4.png",
        "/heatmaps/5.png", // Add more images as needed
    ];

    // Function to change the current image every 15 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setFadeInIndex((prevIndex) => (prevIndex + 1) % images.length); // Change to the next image
        }, 15000); // 15 seconds interval

        return () => clearInterval(interval);
    }, []);

    // Update screen orientation
    useEffect(() => {
        const updateSize = () => {
            setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // NEW: Detect scroll past landing section
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const triggerPoint = window.innerHeight * 0.8; // 80% down the first section
            setFadeInIndex(scrollY > triggerPoint ? fadeInIndex : -1); // Fade images when scrolled past a certain point
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [fadeInIndex]);

    return (
        <>

            <div
                className={`fixed top-0 left-0 -z-10`}
                style={{
                    minWidth: isPortrait ? "100vh" : "100vw",
                    minHeight: isPortrait ? "100vw" : "100vh",
                    width: isPortrait ? "100vh" : "100vw",
                    height: isPortrait ? "100vw" : "100vh",
                    objectFit: "cover",
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: isPortrait
                        ? "translate(-50%, -50%) rotate(90deg)"
                        : "translate(-50%, -50%)",
                    transformOrigin: "center center",
                }}
            >
                <div
                    className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out`}
                    style={{
                        opacity: fadeInIndex === 0 ? 1 : 0, // Fade the first image out
                    }}
                >
                    <img
                        src={images[(fadeInIndex - 1 + images.length) % images.length]} // Show the previous image when fading out
                        alt="Background"
                        className="object-cover w-full h-full"
                    />
                </div>

                <div
                    className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out`}
                    style={{
                        opacity: fadeInIndex === 0 ? 0 : 1, // Fade the next image in
                    }}
                >
                    <img
                        src={images[fadeInIndex]} // Show the current image when fading in
                        alt="Background"
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </>
    );
}
