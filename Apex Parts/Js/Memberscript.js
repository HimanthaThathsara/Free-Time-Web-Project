document.addEventListener("DOMContentLoaded", function () {
    // Check if there's a hash in the URL
    if (window.location.hash) {
        // Get the target element
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Scroll to the target element
            targetElement.scrollIntoView({ behavior: "smooth" });

            // Remove the hash after a short delay (to allow scrolling to complete)
            setTimeout(function () {
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }, 100);
        }
    }

    // Add click event listeners to all internal links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });

                // Remove the hash after a short delay (to allow scrolling to complete)
                setTimeout(function () {
                    history.pushState("", document.title, window.location.pathname + window.location.search);
                }, 100);
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const hoverTabElements = document.querySelectorAll('[ms-code-onhover="click"]');

    hoverTabElements.forEach((hoverTabElement) => {
        hoverTabElement.addEventListener("mouseenter", () => {
            hoverTabElement.click();
        });
    });
});
