"use client";

import { motion, useReducedMotion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function AnimatedBackground() {
    const [mounted, setMounted] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    const { resolvedTheme } = useTheme();

    // Mouse tracking for 3D cursor ball
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth trailing springs for the mouse follower
    const ballX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const ballY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    // Additional parallax/reactivity for the rotating grid
    const gridRotateX = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [70, 80]);
    const gridRotateY = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-5, 5]);

    useEffect(() => {
        setMounted(true);

        // Initialize position to center
        if (typeof window !== "undefined") {
            mouseX.set(window.innerWidth / 2);
            mouseY.set(window.innerHeight / 2);
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    if (!mounted) return null;

    return (
        <div
            className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-background"
            style={{ perspective: "1000px" }}
        >
            {/* 3D Rotating Grid Floor */}
            <motion.div
                initial={{ rotateX: 75 }}
                animate={shouldReduceMotion ? {} : { rotateZ: [0, 360] }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute left-[50%] top-[50%] w-[200vw] h-[200vh] opacity-[0.25] dark:opacity-[0.1]"
                style={{
                    marginLeft: "-100vw",
                    marginTop: "-100vh",
                    rotateX: shouldReduceMotion ? 75 : gridRotateX,
                    rotateY: shouldReduceMotion ? 0 : gridRotateY,
                    backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
                    backgroundSize: '4rem 4rem',
                    transformOrigin: 'center center',
                    maskImage: 'radial-gradient(circle at center, black 0%, transparent 60%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 60%)'
                }}
            />

            {/* Glowing 3D Ball tracking the cursor */}
            {!shouldReduceMotion && (
                <motion.div
                    className="absolute top-0 left-0 rounded-full w-[20vw] h-[20vw] min-w-[200px] min-h-[200px] mix-blend-screen"
                    style={{
                        x: ballX,
                        y: ballY,
                        translateX: "-50%",
                        translateY: "-50%",
                        background: "radial-gradient(circle, rgba(var(--primary), 0.8) 0%, rgba(var(--primary), 0.3) 40%, transparent 70%)",
                        boxShadow: "inset 0 0 50px rgba(255,255,255,0.5), 0 0 100px var(--primary)",
                        opacity: 0.6,
                        filter: "blur(40px)"
                    }}
                />
            )}

            {/* Floating Ambient Orbs for depth */}
            <motion.div
                animate={shouldReduceMotion ? {} : {
                    y: [0, -60, 0],
                    x: [0, 40, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] left-[10%] w-[30vw] h-[30vw] min-w-[250px] min-h-[250px] rounded-full blur-[100px] opacity-40 mix-blend-normal dark:mix-blend-screen"
                style={{ backgroundColor: "var(--primary)" }}
            />

            <motion.div
                animate={shouldReduceMotion ? {} : {
                    y: [0, 80, 0],
                    x: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-[40%] right-[5%] w-[40vw] h-[40vw] min-w-[300px] min-h-[300px] bg-blue-500 rounded-full blur-[120px] opacity-30 mix-blend-normal dark:mix-blend-screen"
            />

            <motion.div
                animate={shouldReduceMotion ? {} : {
                    y: [0, -80, 0],
                    x: [0, 60, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                className="absolute bottom-[-10%] left-[30%] w-[35vw] h-[35vw] min-w-[350px] min-h-[350px] bg-purple-500 rounded-full blur-[120px] opacity-20 mix-blend-normal dark:mix-blend-screen"
            />
        </div>
    );
}
