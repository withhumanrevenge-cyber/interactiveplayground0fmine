"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Magnet } from "lucide-react";
import { Spring } from "../../tokens/motion";

export function MagneticButton() {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const shouldReduceMotion = useReducedMotion();

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (shouldReduceMotion) return;

        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Magnetic pull distance logic
        setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div className="flex items-center justify-center p-8 bg-card border border-border/50 rounded-2xl shadow-sm">
            <motion.button
                ref={ref}
                onMouseMove={handleMouse}
                onMouseLeave={reset}
                animate={{ x: position.x, y: position.y }}
                transition={shouldReduceMotion ? { duration: 0 } : Spring.smooth}
                className="relative flex h-16 px-8 items-center gap-2 rounded-full bg-primary text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 overflow-hidden shadow-lg hover:shadow-primary/25 transition-shadow"
            >
                <Magnet size={20} className="relative z-10" />
                <span className="font-semibold relative z-10 text-sm tracking-wide">Hover Me</span>

                {/* Subtle shine effect that also moves */}
                <motion.div
                    className="absolute inset-0 bg-white/20 blur-md pointer-events-none rounded-full"
                    animate={{ x: position.x * 1.5, y: position.y * 1.5 }}
                    transition={Spring.smooth}
                />
            </motion.button>
        </div>
    );
}
