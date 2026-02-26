"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Duration, Easing, Spring } from "../../tokens/motion";
import { cn } from "../../utils/cn";

export function InlineValidation() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const validate = (value: string) => {
        setEmail(value);

        if (value.length === 0) {
            setError(null);
            setSuccess(false);
            return;
        }

        if (!value.includes("@")) {
            setError("Please enter a valid email address");
            setSuccess(false);
        } else if (value.length < 5) {
            setError("Email address is too short");
            setSuccess(false);
        } else {
            setError(null);
            setSuccess(true);
        }
    };

    const shakeAnimation = {
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
    };

    return (
        <div className="w-full max-w-sm flex flex-col space-y-2">
            <label htmlFor="email-input" className="text-sm font-medium">
                Email
            </label>
            <div className="relative">
                <motion.input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => validate(e.target.value)}
                    placeholder="you@example.com"
                    className={cn(
                        "flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
                        error ? "border-red-500 focus-visible:ring-red-500" :
                            success ? "border-green-500 focus-visible:ring-green-500" :
                                "border-border focus-visible:ring-primary focus-visible:ring-offset-2"
                    )}
                    animate={error && !shouldReduceMotion ? shakeAnimation : undefined}
                    aria-invalid={!!error}
                    aria-describedby={error ? "email-error" : undefined}
                />

                {/* Success Icon */}
                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5, rotate: -45 }}
                            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
                            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
                            transition={shouldReduceMotion ? { duration: 0 } : Spring.bouncy}
                            className="absolute right-3 top-3 text-green-500"
                        >
                            <CheckCircle2 size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        id="email-error"
                        initial={shouldReduceMotion ? { opacity: 0, height: 0 } : { opacity: 0, height: 0, y: -10 }}
                        animate={shouldReduceMotion ? { opacity: 1, height: "auto" } : { opacity: 1, height: "auto", y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0, height: 0 } : { opacity: 0, height: 0, y: -10 }}
                        transition={shouldReduceMotion ? { duration: 0 } : { duration: Duration.fast, ease: Easing.easeOut }}
                        className="overflow-hidden"
                    >
                        <div className="flex items-center gap-2 pt-1 text-sm text-red-500 font-medium">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
