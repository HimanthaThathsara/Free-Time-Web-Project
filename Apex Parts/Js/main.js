
document.addEventListener("DOMContentLoaded", function () {
    /******************************************* 
╔══════════════════════════════════════╗ 
║ PLUGIN REGISTRATION & SPLIDE SETUP    ║
╚══════════════════════════════════════╝ 
*******************************************/
    gsap.registerPlugin(ScrollTrigger, Draggable, SplitText, InertiaPlugin);

    /******************************************* 
╔══════════════════════════════════════╗ 
║ SPLIDE INITIALIZATION                 ║
╚══════════════════════════════════════╝ 
*******************************************/
    let monthlySplide, quarterlySplide, extraSplide, extraSplide2;

    function initSplides() {
        const isMobile = window.innerWidth <= 992;

        const splideInstances = [
            { selector: ".splide-monthly", instance: monthlySplide },
            { selector: ".splide-quarterly", instance: quarterlySplide },
            { selector: ".splide-extra", instance: extraSplide },
            { selector: ".splide-extra2", instance: extraSplide2 },
        ];

        splideInstances.forEach(({ selector, instance }) => {
            const splideElement = document.querySelector(selector);
            if (!splideElement) return;

            const splideContainer = splideElement.closest(".splide");
            if (!splideContainer) return;

            if (isMobile) {
                if (!splideContainer.classList.contains("is-initialized")) {
                    instance = new Splide(splideContainer, {
                        type: "slide",
                        perPage: 1,
                        focus: "center",
                        start: 1,
                        arrows: false,
                        pagination: false,
                        gap: "1rem",
                        padding: "10%",
                        flickPower: 100,
                        flickMaxPages: 1,
                        speed: 600,
                    });
                    instance.mount();
                    splideContainer.classList.add("is-initialized");
                }
            } else {
                if (splideContainer.classList.contains("is-initialized")) {
                    instance.destroy();
                    splideContainer.classList.remove("is-initialized");
                }
            }
        });
    }

    initSplides();
    window.addEventListener("resize", initSplides);

    /******************************************* 
╔══════════════════════════════════════╗ 
║ GLOBAL VARIABLES & REDUCED MOTION     ║
╚══════════════════════════════════════╝ 
*******************************************/
    const colors = ["#0AE448", "#FFFF55", "#FDAA48", "#FF7575"];
    let mySplitText;
    let isWindAnimating = false;
    let isHovering = false;

    const mm = gsap.matchMedia();
    let reducedMotion = false;
    mm.add("(prefers-reduced-motion: reduce)", () => {
        reducedMotion = true;
    });

    /******************************************* 
╔══════════════════════════════════════╗ 
║ UTILITY FUNCTIONS                    ║
╚══════════════════════════════════════╝ 
*******************************************/
    const debounce = (func, wait) => {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    /******************************************* 
╔══════════════════════════════════════╗ 
║ ANIMATION FUNCTIONS                  ║
╚══════════════════════════════════════╝ 
*******************************************/

    // -------------------- Wind Animation --------------------//
    function triggerWindAnimation(charsArray, initialWeight, hoverWeight) {
        if (isWindAnimating || isHovering) return;
        isWindAnimating = true;
        const nonSpaceChars = Array.from(charsArray).filter((char) => char.textContent.trim() !== "");
        const groupSize = reducedMotion ? 10 : 5;
        const totalChars = nonSpaceChars.length;
        const timeline = gsap.timeline({
            onComplete: () => {
                isWindAnimating = false;
            },
        });

        for (let i = 0; i < totalChars; i += groupSize) {
            const groupChars = nonSpaceChars.slice(i, i + groupSize);
            timeline.to(
                groupChars,
                {
                    fontVariationSettings: `'wght' ${hoverWeight}`,
                    color: reducedMotion ? "" : () => gsap.utils.random(colors),
                    rotation: reducedMotion ? 0 : () => gsap.utils.random(-10, 10),
                    scale: reducedMotion ? 1.1 : 1.3,
                    zIndex: 5,
                    duration: reducedMotion ? 0.1 : 0.2,
                    ease: "power2.out",
                    stagger: { each: reducedMotion ? 0.1 : 0.05, from: "start" },
                },
                i === 0 ? 0 : "-=0.15"
            );

            timeline.to(
                groupChars,
                {
                    fontVariationSettings: `'wght' ${initialWeight}`,
                    color: "",
                    rotation: 0,
                    scale: 1,
                    zIndex: 0,
                    duration: reducedMotion ? 0.1 : 0.2,
                    ease: "power2.in",
                    stagger: { each: reducedMotion ? 0.1 : 0.05, from: "start" },
                },
                "-=0.1"
            );
        }
    }

    // -------------------- Marquee Initialization --------------------//
    function initMarquee(marquee) {
        if (!marquee) return;

        // Custom attributes
        const isDraggable = marquee.getAttribute("data-marquee") === "draggable";
        const speed = parseFloat(marquee.getAttribute("data-speed")) || 20;
        const direction = marquee.getAttribute("data-direction") || "normal";

        // Get marquee items and calculate dimensions
        const marqueeItems = Array.from(marquee.querySelectorAll(".marquee-item"));
        if (!marqueeItems.length) return;

        // Clone items for seamless loop
        marqueeItems.forEach((item) => {
            const clone = item.cloneNode(true);
            marquee.appendChild(clone);
        });

        const totalWidth = marqueeItems.reduce((acc, item) => acc + item.offsetWidth, 0);
        const movementDistance = direction === "reverse" ? totalWidth : -totalWidth;

        // Main GSAP tween for continuous movement
        let marqueeTween = gsap.to(marquee, {
            x: movementDistance,
            duration: speed,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.wrap(-totalWidth, 0),
            },
        });

        // Draggable functionality
        if (isDraggable) {
            Draggable.create(marquee, {
                type: "x",
                inertia: true,
                dragResistance: 0.5,
                edgeResistance: 0.75,
                onPress: () => {
                    marqueeTween.pause(); // Pause continuous motion
                },
                onDrag: function () {
                    marquee.style.cursor = "grabbing"; // Update cursor during drag
                },
                onRelease: function () {
                    const velocity = this.getVelocity("x");
                    gsap.to(marquee, {
                        x: `+=${velocity * 2}`, // Apply inertia effect
                        duration: Math.abs(velocity) / 50,
                        ease: "power2.out",
                        onComplete: () => {
                            marqueeTween.resume(); // Resume continuous motion
                        },
                    });
                },
            });
        }

        // Resize handling to adjust for dynamic item width
        const handleResize = () => {
            const updatedTotalWidth = marqueeItems.reduce((acc, item) => acc + item.offsetWidth, 0);
            marqueeTween.kill(); // Stop existing tween
            gsap.set(marquee, { x: 0 }); // Reset position
            marqueeTween = gsap.to(marquee, {
                x: direction === "reverse" ? updatedTotalWidth : -updatedTotalWidth,
                duration: speed,
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: gsap.utils.wrap(-updatedTotalWidth, 0),
                },
            });
        };
        window.addEventListener("resize", debounce(handleResize, 300));

        // Pause/resume on hover
        marquee.addEventListener("mouseenter", () => marqueeTween.pause());
        marquee.addEventListener("mouseleave", () => marqueeTween.resume());
    }

    // -------------------- Text Animation --------------------//
    function animateText(selector, initialWeight, hoverWeight) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            const originalText = element.textContent;
            mySplitText = new SplitText(element, { type: "chars, words" });
            const chars = mySplitText.chars;

            element.setAttribute("data-original-text", originalText);

            const setCharWidths = () => {
                chars.forEach((char) => {
                    char.style.width = "auto";
                    char.style.width = `${char.offsetWidth}px`;
                });
            };

            setCharWidths();
            window.addEventListener("resize", setCharWidths);

            chars.forEach((char) => {
                char.style.display = "inline-block";
                char.style.verticalAlign = "top";
                char.style.transformOrigin = "center";
                char.style.cursor = "var(--cursor-pointer)";
            });

            gsap.from(chars, {
                opacity: reducedMotion ? 1 : 0,
                y: reducedMotion ? 0 : 15,
                stagger: reducedMotion ? 0 : 0.02,
                duration: reducedMotion ? 0 : 0.1,
                ease: "power3.inOut",
            });

            chars.forEach((char) => {
                char.addEventListener("mouseenter", () => {
                    isHovering = true;
                    gsap.to(char, {
                        fontVariationSettings: `'wght' ${hoverWeight}`,
                        color: reducedMotion ? "" : () => gsap.utils.random(colors),
                        rotation: reducedMotion ? 0 : () => gsap.utils.random(-10, 10),
                        scale: reducedMotion ? 1.1 : 1.3,
                        zIndex: 5,
                        duration: reducedMotion ? 0.1 : 0.2,
                        ease: "power2.out",
                    });
                });

                char.addEventListener("mouseleave", () => {
                    gsap.to(char, {
                        fontVariationSettings: `'wght' ${initialWeight}`,
                        color: "",
                        rotation: 0,
                        scale: 1,
                        zIndex: 0,
                        duration: reducedMotion ? 0.1 : 0.2,
                        ease: "power2.in",
                        onComplete: () => {
                            isHovering = false;
                        },
                    });
                });

                char.addEventListener("click", () => {
                    triggerWindAnimation(chars, initialWeight, hoverWeight);
                });
            });

            if (selector === '[data-text="H1-TONE"]' && !reducedMotion) {
                const windAnimation = () => {
                    triggerWindAnimation(chars, initialWeight, hoverWeight);
                };
                gsap.delayedCall(3, function repeatWind() {
                    windAnimation();
                    gsap.delayedCall(7, repeatWind);
                });
            }
        });
    }

    // -------------------- Draggable Elements --------------------//
    function makeDraggable(selector) {
        document.querySelectorAll(selector).forEach((element) => {
            const originalX = gsap.getProperty(element, "x") || 0;
            const originalY = gsap.getProperty(element, "y") || 0;

            element.classList.add("grab-element");

            Draggable.create(element, {
                type: "x,y",
                bounds: {
                    minX: 0,
                    minY: 0,
                    maxX: window.innerWidth - element.offsetWidth,
                    maxY: window.innerHeight - element.offsetHeight,
                },
                inertia: !reducedMotion,
                edgeResistance: 0.65,
                onPress: function () {
                    gsap.to(this.target, { zIndex: 999999 });
                    this.target.classList.add("is-dragging");
                },
                onDrag: function () {
                    if (!reducedMotion) {
                        gsap.to(this.target, {
                            rotation: (this.x + this.y) * 0.1,
                            duration: 0.1,
                            ease: "power1.inOut",
                        });
                    }
                },
                onRelease: function () {
                    this.target.classList.remove("is-dragging");
                    if (!reducedMotion) {
                        gsap.delayedCall(10, () => {
                            gsap.to(this.target, {
                                x: originalX,
                                y: originalY,
                                rotation: 0,
                                zIndex: 0,
                                duration: 0.5,
                                ease: "elastic.out(1, 0.3)",
                            });
                        });
                    } else {
                        gsap.set(this.target, { x: originalX, y: originalY, rotation: 0, zIndex: 0 });
                    }
                },
            });
        });
    }

    /******************************************* 
╔══════════════════════════════════════╗ 
║ INITIALIZATIONS                      ║
╚══════════════════════════════════════╝ 
*******************************************/
    // Text Animations
    animateText('[data-text="H1-TONE"]', 900, 87);
    animateText('[data-text="H2-TONE"]', 900, 87);
    animateText('[data-text="H3-TONE"]', 280, 444);
    animateText('[data-text="SEE-PLANS"]', 666, 222);
    animateText('[data-text="BUTTON-SECONDARY"]', 328, 601);
    animateText('[data-text="BUTTON-TERTIARY"]', 328, 601);
    animateText('[data-text="TEXT-STLE-TAGLINE"]', 777, 222);

    // Draggable Elements
    makeDraggable("#div-tonemaki-logo-full");
    makeDraggable('[data-draggable="true"]');

    // Marquees
    document.querySelectorAll("[data-marquee]").forEach(initMarquee);

    // Number Counting Animations
    function formatNumber(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    document.querySelectorAll(".number-tag").forEach((counter) => {
        const targetValue = parseInt(counter.getAttribute("data-count")) || 0;
        const startValue = parseInt(counter.getAttribute("data-start")) || 0;
        const duration = parseFloat(counter.getAttribute("data-duration")) || 2;
        const prefix = counter.getAttribute("data-prefix") || "";
        const suffix = counter.getAttribute("data-suffix") || "";

        const animateValue = { val: startValue };
        const tween = gsap.fromTo(
            animateValue,
            { val: startValue },
            {
                val: targetValue,
                duration: duration,
                ease: "circ.out",
                paused: true,
                onUpdate: function () {
                    counter.textContent = prefix + formatNumber(Math.floor(animateValue.val)) + suffix;
                },
            }
        );

        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            onEnter: () => tween.play(),
            onLeave: () => {
                tween.pause(0);
                animateValue.val = startValue;
                counter.textContent = prefix + formatNumber(startValue) + suffix;
            },
            onEnterBack: () => tween.play(),
            onLeaveBack: () => {
                tween.pause(0);
                animateValue.val = startValue;
                counter.textContent = prefix + formatNumber(startValue) + suffix;
            },
        });
    });

    /******************************************* 
╔══════════════════════════════════════╗ 
║ SCROLL ANIMATIONS                    ║
╚══════════════════════════════════════╝ 
*******************************************/
    const toggleActions = "play reverse play reverse";

    document.querySelectorAll('[data-scroll="mask-left"]').forEach((target) => {
        const img = target.querySelector("img");
        if (!img) return;
        gsap.set(img, { x: "-100%" });
        ScrollTrigger.create({
            trigger: target,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: toggleActions,
            onEnter: () => gsap.to(img, { x: "0%", duration: 0.5, ease: "power2.out" }),
            onLeaveBack: () => gsap.to(img, { x: "-100%", duration: 0.5, ease: "power2.in" }),
        });
    });

    document.querySelectorAll('[data-scroll="mask-right"]').forEach((target) => {
        const img = target.querySelector("img");
        if (!img) return;
        gsap.set(img, { x: "100%" });
        ScrollTrigger.create({
            trigger: target,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: toggleActions,
            onEnter: () => gsap.to(img, { x: "0%", duration: 0.5, ease: "power2.out" }),
            onLeaveBack: () => gsap.to(img, { x: "100%", duration: 0.5, ease: "power2.in" }),
        });
    });

    document.querySelectorAll('[data-scroll="slide-top"]').forEach((target) => {
        gsap.set(target, { y: "30%", opacity: 0 });
        ScrollTrigger.create({
            trigger: target,
            start: "top 80%",
            toggleActions: toggleActions,
            onEnter: () => gsap.to(target, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }),
            onLeaveBack: () => gsap.to(target, { y: "30%", opacity: 0, duration: 0.5, ease: "power2.in" }),
        });
    });

    document.querySelectorAll('[data-scroll="slide-right"]').forEach((target) => {
        gsap.set(target, { x: "100%", opacity: 0 });
        ScrollTrigger.create({
            trigger: target,
            start: "top 80%",
            toggleActions: toggleActions,
            onEnter: () => gsap.to(target, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }),
            onLeaveBack: () => gsap.to(target, { x: "100%", opacity: 0, duration: 0.5, ease: "power2.in" }),
        });
    });

    /******************************************* 
╔══════════════════════════════════════╗ 
║ VIDEO CONTROL LOGIC                  ║
╚══════════════════════════════════════╝ 
*******************************************/
    const videosControl = document.querySelectorAll("video[data-scroll-trigger], video[data-scroll-frame-by-frame], video[data-hover-play]");

    const videoObserverOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
    };

    const videoPlayPauseObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const video = entry.target;
            if (entry.isIntersecting) {
                if (video.dataset.scrollTrigger === "true") {
                    video.play();
                }
            } else {
                if (video.dataset.scrollTrigger === "true") {
                    video.pause();
                }
            }
        });
    }, videoObserverOptions);

    videosControl.forEach((video) => {
        video.pause();
        video.muted = true;

        if (video.dataset.scrollTrigger === "true") {
            videoPlayPauseObserver.observe(video);
        }

        if (video.dataset.scrollFrameByFrame === "true") {
            const scrollTriggerInstance = ScrollTrigger.create({
                trigger: video.closest(".video-container"),
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                onUpdate: (self) => {
                    if (!video.isHovering) {
                        const duration = video.duration;
                        video.currentTime = duration * self.progress;
                    }
                },
            });
            video.scrollTriggerInstance = scrollTriggerInstance;
        }

        if (video.dataset.hoverPlay === "true") {
            video.isHovering = false;

            video.addEventListener("mouseenter", () => {
                video.isHovering = true;
                video.play();
            });

            video.addEventListener("mouseleave", () => {
                video.isHovering = false;
                video.pause();
            });

            video.addEventListener("click", () => {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }
    });

    /******************************************* 
╔══════════════════════════════════════╗ 
║ CLEANUP (ON PAGE UNLOAD)             ║
╚══════════════════════════════════════╝ 
*******************************************/
    window.addEventListener("beforeunload", () => {
        videoPlayPauseObserver.disconnect();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    });
});
