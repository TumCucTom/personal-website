"use client";

import React, { createContext, useContext, useEffect } from "react";

type Theme = "light";

const ThemeContext = createContext<ThemeContextType | null>(null);

type ThemeContextProviderProps = {
    children: React.ReactNode;
};

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void; // no-op
};

export default function ThemeContextProvider({
                                                 children,
                                             }: ThemeContextProviderProps) {
    const theme: Theme = "light";

    // Remove dark class on mount
    useEffect(() => {
        document.documentElement.classList.remove("dark");
        window.localStorage.setItem("theme", "light");
    }, []);

    const toggleTheme = () => {
        // no-op since dark mode is disabled
        console.log("Theme is locked to light mode.");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === null) {
        throw new Error("useTheme must be used within a ThemeContextProvider");
    }

    return context;
}
