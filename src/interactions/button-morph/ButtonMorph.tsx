"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Loader2, Check } from "lucide-react";
import { Duration, Easing, Spring } from "../../tokens/motion";
import { cn } from "../../utils/cn";

export function ButtonMorph() {
    const [state, setState] = useState<"idle" | "loading" | "success">("idle");
    const shouldReduceMotion = useReducedMotion();

    const handleClick = () => {
        if (state !== "idle") return;

        setState("loading");

        // Simulate API call
        setTimeout(() => {
            setState("success");

            // Reset after showing success
            setTimeout(() => {
                setState("idle");
            }, 2000);
        }, 1500);
    };

    const variants = {
        idle: { width: 140, borderRadius: 8 },
        loading: { width: 56, borderRadius: 28 },
        success: { width: 180, borderRadius: 8 }
    };

    return (
        <motion.button
            onClick={handleClick}
            disabled={state !== "idle"}
            className={cn(
                "relative flex h-14 items-center justify-center overflow-hidden bg-primary text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                state !== "idle" && "cursor-default"
            )}
            animate={state}
            variants={shouldReduceMotion ? undefined : variants}
            // Provide a fallback for reduced motion
            style={shouldReduceMotion ? { width: state === "success" ? 180 : 140, borderRadius: 8 } : undefined}
            transition={Spring.smooth}
            aria-live="polite"
            aria-busy={state === "loading"}
        >
            <AnimatePresence mode="wait">
                {state === "idle" && (
                    <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: Duration.fast, ease: Easing.easeOut }}
                        className="font-medium"
                    >
                        Submit
                    </motion.span>
                )}

                {state === "loading" && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: Duration.fast }}
                    >
                        <Loader2 className="animate-spin" size={24} />
                        <span className="sr-only">Submitting...</span>
                    </motion.div>
                )}

                {state === "success" && (
                    <motion.div
                        key="success"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: Duration.normal }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, ...Spring.bouncy }}
                        >
                            <Check size={20} strokeWidth={3} />
                        </motion.div>
                        <span className="font-medium">Success!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
