"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "../interactions/theme-toggle/ThemeToggle";
import { ButtonMorph } from "../interactions/button-morph/ButtonMorph";
import { SwipeConfirm } from "../interactions/swipe-confirm/SwipeConfirm";
import { LikeToggle } from "../interactions/like-toggle/LikeToggle";
import { AnimatedTabs } from "../interactions/animated-tabs/AnimatedTabs";
import { InlineValidation } from "../interactions/inline-validation/InlineValidation";
import { MagneticButton } from "../interactions/magnetic-button/MagneticButton";
import { TiltCard } from "../interactions/tilt-card/TiltCard";
import { Duration, Easing } from "../tokens/motion";

const interactions = [
  {
    id: "theme-toggle",
    title: "System: Theme Toggle",
    component: <ThemeToggle />,
    desc: "Persisted state toggle with animated sun/moon transition.",
    trigger: "Click/Space",
    a11y: "ARIA-pressed state, Reduced motion fallback"
  },
  {
    id: "button-morph",
    title: "Feedback: Button Morph",
    component: <ButtonMorph />,
    desc: "Idle → Loading → Success state morphing button.",
    trigger: "Click/Enter",
    a11y: "ARIA-live polite, disables on active"
  },
  {
    id: "swipe-confirm",
    title: "Gestures: Swipe Confirm",
    component: <SwipeConfirm />,
    desc: "Swipe to confirm with drag resistance and threshold.",
    trigger: "Drag/Enter",
    a11y: "Keyboard alternative, ARIA-pressed"
  },
  {
    id: "like-toggle",
    title: "State: Like Toggle",
    component: <LikeToggle />,
    desc: "Optimistic update with heart spring pop animation.",
    trigger: "Click/Space",
    a11y: "ARIA-pressed, Screen reader hidden particles"
  },
  {
    id: "animated-tabs",
    title: "Navigation: Animated Tabs",
    component: <AnimatedTabs />,
    desc: "Smooth layout animation for tab indicator.",
    trigger: "Click/Arrow keys",
    a11y: "Role=tab, ARIA-selected states"
  },
  {
    id: "inline-validation",
    title: "Errors: Inline Validation",
    component: <InlineValidation />,
    desc: "Shake on error and smooth height transition.",
    trigger: "Input change",
    a11y: "ARIA-invalid, ARIA-describedby"
  },
  {
    id: "magnetic-button",
    title: "Gestures: Magnetic Hover",
    component: <MagneticButton />,
    desc: "Button attracted to cursor with spring physics proximity.",
    trigger: "Hover",
    a11y: "Respects prefers-reduced-motion"
  },
  {
    id: "tilt-card",
    title: "Cards: 3D Tilt Card",
    component: <TiltCard />,
    desc: "3D tilt mapping based on bounded mouse position coordinates.",
    trigger: "Hover",
    a11y: "Preserve-3d gracefully degrades"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: Duration.normal, ease: Easing.easeOut } }
};

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 md:py-24">
      <header className="mb-16">
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: Duration.normal, ease: Easing.easeOut }}
        >
          Advanced Micro-Interaction Playground
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: Duration.normal, delay: 0.2 }}
        >
          A curated collection of isolated, high-fidelity UI interactions demonstrating advanced animation, gesture handling, motion systems, and accessibility-first engineering.
        </motion.p>
      </header>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {interactions.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="flex flex-col border border-border rounded-xl overflow-hidden bg-card/60 backdrop-blur-md shadow-lg"
          >
            <div className="flex-1 flex items-center justify-center p-12 min-h-[300px] relative">
              <div className="absolute inset-0 bg-secondary/10 pointer-events-none" />
              {item.component}
            </div>
            <div className="p-6 border-t border-border flex flex-col h-full bg-card/40 group">
              <h2 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h2>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{item.desc}</p>

              <div className="flex flex-col gap-2 pt-4 border-t border-border/50 text-xs text-muted-foreground mt-auto">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground/80">Trigger:</span>
                  <span>{item.trigger}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground/80">Accessibility:</span>
                  <span>{item.a11y}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
