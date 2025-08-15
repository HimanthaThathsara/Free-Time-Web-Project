
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".tools-providers");
    const iconHeight = 32; // Base height of the icons in px (e.g., 2rem * 16px)
    const centerScale = 2; // Scale for the hovered item
    const siblingScale = 1.5; // Scale for adjacent siblings
    const breakpoint = 982; // Mobile breakpoint

    const isMobile = () => window.innerWidth <= breakpoint;

    const applyHoverAnimation = () => {
        // Apply hover animations for desktop
        items.forEach((item, index) => {
            item.addEventListener("mouseenter", () => {
                // Animate the hovered item (scale and move up)
                gsap.to(item, {
                    scale: centerScale,
                    y: -((centerScale - 1) * iconHeight) / 2,
                    duration: 0.3,
                    ease: "power2.out",
                });

                // Animate the previous sibling (scale and move up slightly)
                if (index > 0) {
                    gsap.to(items[index - 1], {
                        scale: siblingScale,
                        y: -((siblingScale - 1) * iconHeight) / 2,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                }

                // Animate the next sibling (scale and move up slightly)
                if (index < items.length - 1) {
                    gsap.to(items[index + 1], {
                        scale: siblingScale,
                        y: -((siblingScale - 1) * iconHeight) / 2,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                }
            });

            item.addEventListener("mouseleave", () => {
                // Reset all items to their base scale and position
                gsap.to(items, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });
        });
    };

    const removeAnimations = () => {
        // Clear any applied styles for mobile
        gsap.to(items, { clearProps: "all" });
    };

    const initAnimations = () => {
        if (isMobile()) {
            removeAnimations(); // Disable animations on mobile
        } else {
            applyHoverAnimation(); // Enable hover animations for desktop
        }
    };

    // Initialize on load
    initAnimations();

    // Reinitialize on resize
    window.addEventListener("resize", initAnimations);
});