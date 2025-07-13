document.addEventListener("DOMContentLoaded", async () => {
    // Check connection speed using Navigation API
    const getConnectionSpeed = () => {
        if ("connection" in navigator) {
            const conn = navigator.connection;
            if (conn.effectiveType === "4g" && !conn.saveData) {
                return "high";
            }
        }
        return "low";
    };
    // Load appropriate version based on connection
    const loadAppropriateVersion = async () => {
        const speed = getConnectionSpeed();
        const splineViewer = document.querySelector("spline-viewer");

        if (speed === "low") {
            // Create transparent div instead of image
            const fallbackDiv = document.createElement("div");
            fallbackDiv.style.width = "100%";
            fallbackDiv.style.height = "100vh";
            fallbackDiv.style.background = "transparent";
            fallbackDiv.setAttribute("aria-hidden", "true");
            splineViewer.parentNode.replaceChild(fallbackDiv, splineViewer);
            return;
        }
        // For high-speed connections, load Spline with optimization
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const script = document.createElement("script");
                    script.type = "module";
                    script.src = "https://unpkg.com/@splinetool/viewer@1.9.46/build/spline-viewer.js";
                    document.body.appendChild(script);
                    observer.disconnect();
                }
            });
        });
        if (splineViewer) {
            observer.observe(splineViewer);
        }
    };
    // Initial load
    await loadAppropriateVersion();
    // Handle scroll visibility
    const handleScroll = () => {
        const splineViewer = document.querySelector("spline-viewer");
        const fallbackDiv = document.querySelector('div[aria-hidden="true"]');
        const element = splineViewer || fallbackDiv;

        if (!element) return;
        const triggerHeight = window.innerHeight;
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        element.style.display = scrollPosition > triggerHeight ? "none" : "block";
    };
    window.addEventListener("scroll", handleScroll);
});