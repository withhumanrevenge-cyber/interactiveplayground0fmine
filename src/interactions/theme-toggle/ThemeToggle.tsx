"use client";

import { useTheme } from "next-themes";
import { motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Duration, Easing, Spring } from "../../tokens/motion";
import { cn } from "../../utils/cn";

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button
                className="relative flex h-14 w-24 items-center rounded-full bg-secondary p-1 shadow-inner opacity-50 cursor-not-allowed"
                disabled
                aria-label="Toggle theme initializing"
            />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
                "relative flex h-14 w-28 items-center rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isDark ? "bg-accent" : "bg-neutral-200"
            )}
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            aria-pressed={isDark}
        >
            <span className="sr-only">Toggle theme</span>

            {/* Background track icons */}
            <div className="flex w-full justify-between px-2 text-muted-foreground pointer-events-none">
                <Moon size={20} />
                <Sun size={20} />
            </div>

            <motion.div
                className="absolute left-2 flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-sm"
                animate={{
                    x: isDark ? 0 : 56, // Total width (112) - padding (8*2) - knob (40) = 56
                }}
                transition={shouldReduceMotion ? { duration: 0 } : Spring.snappy}
            >
                <motion.div
                    animate={{
                        rotate: isDark ? 0 : 180,
                        scale: isDark ? 1 : 0.8,
                        opacity: isDark ? 1 : 0
                    }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: Duration.normal, ease: Easing.easeOut }}
                    className="absolute"
                >
                    <Moon size={18} className="text-foreground" />
                </motion.div>

                <motion.div
                    animate={{
                        rotate: isDark ? -180 : 0,
                        scale: isDark ? 0.8 : 1,
                        opacity: isDark ? 0 : 1
                    }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: Duration.normal, ease: Easing.easeOut }}
                    className="absolute"
                >
                    <Sun size={18} className="text-amber-500" />
                </motion.div>
            </motion.div>
        </button>
    );
}
