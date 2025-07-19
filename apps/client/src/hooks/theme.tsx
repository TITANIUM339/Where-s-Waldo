import { useState } from "react";

type Theme = "dark" | "light";

export default function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem("theme");

        const preferredTheme = window?.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches
            ? "dark"
            : "light";

        return storedTheme === "dark" || storedTheme === "light"
            ? storedTheme
            : preferredTheme;
    });

    return {
        theme,
        toggleTheme(this: void) {
            const newTheme = theme === "dark" ? "light" : "dark";

            localStorage.setItem("theme", newTheme);

            setTheme(newTheme);
        },
    };
}
