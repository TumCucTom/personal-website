"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/theme-context";

export default function ParticlesBackground() {
    const { theme, toggleTheme } = useTheme();
    const [isPortrait, setIsPortrait] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [fadeIn, setFadeIn] = useState(false); // NEW
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // Attempt to autoplay video on mount
    useEffect(() => {
        if (videoRef.current) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    setShowPopup(true);
                });
            }
        }
    }, []);

    // Handle theme selection & play video
    const handleThemeSelection = (selectedTheme: "light" | "dark") => {
        const currentTheme = window.localStorage.getItem("theme");
        if (currentTheme !== selectedTheme) {
            toggleTheme();
        }

        setShowPopup(false);

        // Play this background video
        videoRef.current?.play().catch(() => {});

        // ✅ Dispatch event to notify other components (e.g., landing video)
        window.dispatchEvent(new Event("playLandingVideo"));
    };

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
            setFadeIn(scrollY > triggerPoint);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const videoSrc = "/particles-light.webm";

    return (
        <>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
                    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg text-center">
                        <p className="mb-4 text-lg">Choose a theme:</p>
                        <button
                            onClick={() => handleThemeSelection("light")}
                            className="bg-white text-black px-6 py-2 rounded-lg mb-2 w-full"
                        >
                            Light Mode
                        </button>
                    </div>
                </div>
            )}

            <video
                ref={videoRef}
                className={`fixed top-0 left-0 -z-10 transition-opacity duration-[1500ms] ease-in-out ${
                    fadeIn ? "opacity-100" : "opacity-0"
                }`}
                autoPlay
                loop
                muted
                playsInline
                key={videoSrc}
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
                <source src={videoSrc} type="video/webm" />
                <source src={videoSrc.replace(".webm", ".mp4")} type="video/mp4" />
            </video>
        </>
    );
}