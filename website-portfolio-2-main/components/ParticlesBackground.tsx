"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/theme-context";

export default function ParticlesBackground() {
    const { theme } = useTheme();
    const [isPortrait, setIsPortrait] = useState(false);

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
        <video
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
    );
}
