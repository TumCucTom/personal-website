"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/theme-context";

export default function ParticlesBackground() {
    const { theme, toggleTheme } = useTheme();
    const [isPortrait, setIsPortrait] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // Attempt to autoplay video on mount
    useEffect(() => {
        if (videoRef.current) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // If autoplay fails, show theme selection popup
                    setShowPopup(true);
                });
            }
        }
    }, []);

    // Handle theme selection & play video
    const handleThemeSelection = (selectedTheme: "light" | "dark") => {
        const currentTheme = window.localStorage.getItem("theme");

        // Only toggle if the chosen theme is different from the current one
        if (currentTheme !== selectedTheme) {
            toggleTheme();
        }

        setShowPopup(false);

        if (videoRef.current) {
            videoRef.current.play().catch(() => {}); // Ensure play attempt
        }
    };

    // Update screen orientation state
    useEffect(() => {
        const updateSize = () => {
            setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
        };

        updateSize();
        window.addEventListener("resize", updateSize);

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const videoSrc = theme === "dark"
        ? "/particles-dark.webm"
        : "/particles-light.webm";

    return (
        <>
            {/* Theme Selection Popup (Only appears if autoplay fails) */}
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
                        <button
                            onClick={() => handleThemeSelection("dark")}
                            className="bg-gray-700 text-white px-6 py-2 rounded-lg w-full"
                        >
                            Dark Mode
                        </button>
                    </div>
                </div>
            )}

            <video
                ref={videoRef}
                className="fixed inset-0 w-screen h-screen -z-10"
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
                    transform: isPortrait ? "translate(-50%, -50%) rotate(90deg)" : "translate(-50%, -50%)",
                    transformOrigin: "center center",
                    zIndex: "-10",
                }}
            >
                <source src={videoSrc} type="video/webm" />
                <source src={videoSrc.replace(".webm", ".mp4")} type="video/mp4" />
            </video>
        </>
    );
}
