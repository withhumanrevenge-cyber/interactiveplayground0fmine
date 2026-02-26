"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Duration, Easing, Spring } from "../../tokens/motion";
import { cn } from "../../utils/cn";

const tabs = [
    { id: "world", label: "World" },
    { id: "sports", label: "Sports" },
    { id: "economy", label: "Economy" },
    { id: "tech", label: "Tech" },
];

export function AnimatedTabs() {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const shouldReduceMotion = useReducedMotion();

    return (
        <div className="flex space-x-2 rounded-xl bg-secondary p-1">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                        "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-selected={activeTab === tab.id}
                    role="tab"
                >
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="active-tab-indicator"
                            className="absolute inset-0 rounded-lg bg-card shadow-sm"
                            transition={shouldReduceMotion ? { duration: 0 } : Spring.snappy}
                        />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                </button>
            ))}
        </div>
    );
}
