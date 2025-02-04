"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/theme-context";

export default function ParticlesBackground() {
    const { theme } = useTheme();
    const [isPortrait, setIsPortrait] = useState(false);
    const [needsInteraction, setNeedsInteraction] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const updateSize = () => {
            setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
        };

        updateSize();
        window.addEventListener("resize", updateSize);

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => setNeedsInteraction(true)); // Show button if autoplay fails
            }
        }
    }, [theme]);

    const handleUserInteraction = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setNeedsInteraction(false); // Hide overlay
        }
    };

    const videoSrc = theme === "dark"
        ? "/particles-dark.webm"
        : "/particles-light.webm";

    return (
        <>
            {needsInteraction && (
                <button
                    onClick={handleUserInteraction}
                    className="fixed inset-0 w-full h-full bg-transparent z-50"
                    aria-label="Start Background Animation"
                />
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
