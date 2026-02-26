"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { Duration, Easing, Spring } from "../../tokens/motion";
import { cn } from "../../utils/cn";

export function LikeToggle() {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(1337);
    const shouldReduceMotion = useReducedMotion();

    const toggleLike = () => {
        setLiked((prev) => !prev);
        setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    };

    return (
        <div className="flex items-center gap-3">
            <motion.button
                onClick={toggleLike}
                className={cn(
                    "relative flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    liked && "text-red-500 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30"
                )}
                aria-pressed={liked}
                aria-label={liked ? "Unlike" : "Like"}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.85 }}
            >
                <motion.div
                    animate={{ scale: liked ? [1, 1.4, 1] : 1 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: Easing.easeInOut }}
                >
                    <Heart
                        size={24}
                        className={cn("transition-colors", liked && "fill-current")}
                    />
                </motion.div>

                {/* Particle effect */}
                {liked && !shouldReduceMotion && (
                    <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: Duration.slow, ease: Easing.easeOut }}
                        className="absolute inset-0 rounded-full border-2 border-red-500 pointer-events-none"
                    />
                )}
            </motion.button>

            {/* Counter animated */}
            <div className="relative flex h-12 w-16 items-center overflow-hidden text-lg font-semibold tabular-nums">
                <motion.div
                    key={likesCount}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: liked ? 10 : -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: liked ? -10 : 10 }}
                    transition={{ duration: Duration.fast, ease: Easing.easeOut }}
                    className="absolute"
                >
                    {likesCount}
                </motion.div>
            </div>
        </div>
    );
}
