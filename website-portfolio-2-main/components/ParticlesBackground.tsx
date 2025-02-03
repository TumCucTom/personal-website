"use client";

import React, { useEffect } from "react";
import { useTheme } from "@/context/theme-context"; // Import theme context

export default function ParticlesBackground() {
    const { theme } = useTheme(); // Get the current theme ("light" or "dark")

    useEffect(() => {
        const loadParticles = async () => {
            try {
                // @ts-ignore
                if (typeof window !== "undefined" && !window.particlesJS) {
                    await new Promise<void>((resolve, reject) => {
                        const script = document.createElement("script");
                        script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
                        script.async = true;
                        script.onload = () => resolve();
                        script.onerror = () => reject(new Error("Failed to load particles.js"));
                        document.body.appendChild(script);
                    });
                }

                // Determine the correct particle config based on the theme
                const configFile = theme === "dark"
                    ? "/particlesjs-config-dark.json"
                    : "/particlesjs-config-light.json";

                // Remove any existing particles instance before reloading
                // @ts-ignore
                if (window.pJSDom && window.pJSDom.length) {
                    // @ts-ignore
                    window.pJSDom[0].pJS.fn.vendors.destroypJS();
                    // @ts-ignore
                    window.pJSDom = [];
                }

                // Load particles with the correct theme configuration
                // @ts-ignore
                if (window.particlesJS) {
                    // @ts-ignore
                    window.particlesJS.load("particles-container", configFile, function () {
                        console.log(`Particles.js loaded with ${theme} theme!`);
                    });
                } else {
                    console.error("particlesJS is still undefined after script load.");
                }
            } catch (error) {
                console.error("Error loading particles.js:", error);
            }
        };

        loadParticles();
    }, [theme]); // Re-run when theme changes

    return <div id="particles-container" className="absolute inset-0 -z-10"></div>;
}
