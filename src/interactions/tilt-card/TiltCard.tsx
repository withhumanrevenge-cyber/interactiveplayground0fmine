"use client";

import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { Spring } from "../../tokens/motion";

export function TiltCard() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const shouldReduceMotion = useReducedMotion();

    // Create smooth tilt thresholds based on cursor position coordinates
    const rotateX = useTransform(y, [-100, 100], [15, -15]);
    const rotateY = useTransform(x, [-100, 100], [-15, 15]);

    // Adjust lighting / glow based on pointer position relative to center
    const glowX = useTransform(x, [-100, 100], [20, 80]);
    const glowY = useTransform(y, [-100, 100], [20, 80]);

    function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
        if (shouldReduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();

        // Map the relative mouse position from top left (0,0) to center origin (-100 to 100 scale ideally)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        x.set(event.clientX - rect.left - centerX);
        y.set(event.clientY - rect.top - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <div className="perspective-1000 flex items-center justify-center p-8">
            <motion.div
                className="relative flex flex-col justify-end w-64 h-80 rounded-2xl overflow-hidden cursor-crosshair border border-white/10 shadow-xl bg-gradient-to-br from-neutral-800 to-neutral-900 group"
                onMouseMove={handleMouse}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: shouldReduceMotion ? 0 : rotateX,
                    rotateY: shouldReduceMotion ? 0 : rotateY,
                    transformStyle: "preserve-3d",
                }}
                transition={Spring.smooth}
            >
                {/* Abstract 3D shape interior element popping out */}
                <motion.div
                    className="absolute inset-[15%] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-2xl opacity-80"
                    style={{ transform: "translateZ(50px)" }}
                />

                {/* Dynamic Glow Overlay responding to mouse pos overlay */}
                {!shouldReduceMotion && (
                    <motion.div
                        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                        style={{
                            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.15), transparent 60%)`,
                        }}
                    />
                )}

                <div className="relative z-20 p-6 flex items-center gap-3 backdrop-blur-sm bg-black/20 border-t border-white/10" style={{ transform: "translateZ(30px)" }}>
                    <MousePointer2 className="text-white drop-shadow-lg" size={24} />
                    <div className="flex flex-col">
                        <span className="text-white font-bold tracking-tight text-lg leading-tight">3D Hover</span>
                        <span className="text-white/60 text-xs font-medium">Float & Tilt</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
