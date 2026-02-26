// Shared animation constants for consistency across the playground

export const Easing = {
    // Faster in -> slower out (Deceleration)
    easeOut: [0.16, 1, 0.3, 1] as const,
    // Slower in -> faster out -> slower out (Standard)
    easeInOut: [0.65, 0, 0.35, 1] as const,
    // Spring-like defaults
    bounce: [0.34, 1.56, 0.64, 1] as const,
    // Smooth
    smooth: [0.22, 1, 0.36, 1] as const
};

export const Duration = {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    xs: 0.1,
};

export const Spring = {
    snappy: { type: "spring", stiffness: 400, damping: 25 } as const,
    bouncy: { type: "spring", stiffness: 300, damping: 15 } as const,
    smooth: { type: "spring", stiffness: 200, damping: 20 } as const,
};

// Common motion variants for variants prop
export const defaultFade = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: Duration.normal, ease: Easing.easeOut } },
    exit: { opacity: 0, transition: { duration: Duration.fast, ease: Easing.easeOut } }
};
