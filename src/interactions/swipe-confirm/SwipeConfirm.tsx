"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { Duration, Easing, Spring } from "../../tokens/motion";

export function SwipeConfirm() {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const x = useMotionValue(0);

    // DRAG logic
    const dragRange = [0, 240];
    const opacityRange = useTransform(x, dragRange, [0.8, 0]);
    const bgRange = useTransform(x, dragRange, ["#f4f4f5", "#22c55e"]); // text-muted -> text-success bg

    const handleDragEnd = (event: any, info: any) => {
        // Threshold is 180px
        if (info.offset.x > 180) {
            setIsConfirmed(true);
            x.set(240); // Dock it to the end
        } else {
            // Return to start
            x.set(0);
        }
    };

    const handleKeyboardConfirm = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            setIsConfirmed(true);
            x.set(240);
            e.preventDefault();
        }
    };

    const reset = () => {
        setIsConfirmed(false);
        x.set(0);
    };

    // If simple state logic for reduced motion
    if (shouldReduceMotion) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4">
                <button
                    onClick={() => setIsConfirmed(true)}
                    disabled={isConfirmed}
                    className="w-full max-w-sm rounded-xl py-4 font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none h-16"
                    style={{ backgroundColor: isConfirmed ? "#22c55e" : "#09090b" }}
                >
                    {isConfirmed ? (
                        <span className="flex items-center justify-center gap-2">
                            <ShieldCheck size={24} /> Confirmed
                        </span>
                    ) : (
                        "Click to Confirm"
                    )}
                </button>
                {isConfirmed && (
                    <button onClick={reset} className="text-sm underline text-muted-foreground mr-1">
                        Reset
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <div
                className="relative flex h-16 w-80 items-center overflow-hidden rounded-full border border-border bg-card shadow-sm"
            >
                <motion.div
                    className="absolute inset-0 z-0 bg-success opacity-20"
                    style={{ opacity: useTransform(x, dragRange, [0, 1]) }}
                />

                <motion.div
                    className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-sm font-medium whitespace-nowrap"
                    style={{ opacity: opacityRange }}
                >
                    Slide to confirm
                </motion.div>

                {isConfirmed && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: Duration.normal, ...Spring.bouncy }}
                        className="absolute inset-0 z-20 flex items-center justify-center text-white bg-green-500 font-semibold"
                    >
                        <ShieldCheck className="mr-2" size={24} />
                        Confirmed
                    </motion.div>
                )}

                <motion.div
                    className="absolute left-1 z-30 flex h-14 w-14 cursor-grab items-center justify-center rounded-full bg-foreground text-background shadow-md active:cursor-grabbing hover:bg-neutral-800 dark:hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    style={{ x }}
                    drag={isConfirmed ? false : "x"}
                    dragConstraints={{ left: 0, right: 240 }}
                    dragElastic={0.1}
                    onDragEnd={handleDragEnd}
                    whileTap={{ scale: 0.95 }}
                    tabIndex={0}
                    onKeyDown={handleKeyboardConfirm}
                    role="button"
                    aria-label={isConfirmed ? "Confirmed" : "Slide right to confirm"}
                    aria-pressed={isConfirmed}
                >
                    <ChevronRight size={28} />
                </motion.div>
            </div>

            {isConfirmed && (
                <motion.button
                    onClick={reset}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-sm underline text-muted-foreground hover:text-foreground transition-colors"
                >
                    Reset demonstration
                </motion.button>
            )}
        </div>
    );
}
