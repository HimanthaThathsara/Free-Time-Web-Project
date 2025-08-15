let halftoneSketch = function (p) {
    let p5Container;
    let w, h;

    // Default settings
    let rows = 40; // Reduced for performance
    let columns = 60; // Reduced for performance
    let xSpace, ySpace;

    let yWaveSize;
    let yWaveLength = 5;
    let yWaveSpeed = 0.5; // Adjusted for smoother movement
    let yWaveOffset = 0.1;
    let xWaveSize;
    let xWaveLength = 5;
    let xWaveSpeed = 0.5; // Adjusted for smoother movement
    let xWaveOffset = 1;

    let animationPeriod = 5; // Increased for smoother animation

    // Expanded Tonemaki color palette
    const tonemakiColors = ["#75ff9c", "#103729", "#bbbaad", "#141414", "#dad6c8", "#dddddd", "#fa233b", "#fa3c23", "#fefce1", "#ff7145", "#ff7575", "#fffbea", "#222222", "#454545", "#50ff6c", "#575757"];

    let inactivityTimeout; // To store the timeout ID

    // Variables for Fade-In Effect
    let startTime;
    let fadeDuration = 6000; // 10 seconds in milliseconds
    let fadeProgress = 0; // Progress of fade-in (0 to 1)

    p.setup = function () {
        p5Container = p.select("#wave-container");
        w = p5Container.width;
        h = p5Container.height;

        let cnv = p.createCanvas(w, h);
        cnv.parent("wave-container");
        p.noStroke();

        // Initial grid calculation
        calculateGrid();

        // Optimize performance
        p.frameRate(10); // Increased frame rate for smoother fade-in

        // Initialize Fade-In
        startTime = p.millis();
        p.loop(); // Start the draw loop for fade-in

        // Define the handler for user interaction
        function handleUserInteraction() {
            p.loop(); // Start the draw loop

            // Clear any existing timeout
            if (inactivityTimeout) {
                window.clearTimeout(inactivityTimeout);
            }

            // Set a timeout to stop the loop after 2 seconds of inactivity
            inactivityTimeout = window.setTimeout(function () {
                p.noLoop();
            }, 600); // Increased timeout duration for better user experience
        }

        // Add event listeners for mousemove and scroll
        window.addEventListener("mousemove", handleUserInteraction);
        window.addEventListener("scroll", handleUserInteraction);
    };

    p.draw = function () {
        p.clear(); // Clears to transparent background

        // Update Fade-In Progress
        let elapsed = p.millis() - startTime;
        fadeProgress = p.constrain(elapsed / fadeDuration, 0, 1);

        // Calculate the looping phase based on frame count
        let loopPhase = (p.frameCount % animationPeriod) / animationPeriod;

        p.push();
        p.translate(p.width / 2, p.height / 2);
        p.translate((-columns * xSpace) / 2, (-rows * ySpace) / 2);

        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                // Use a smoother function for dot size variation
                let sinValue = p.sin(p.TWO_PI * loopPhase + i * 0.5 + j * 0.5);
                // Map the sinValue to skew towards smaller sizes
                let baseSize = p.map(p.pow(sinValue, 5), -1, 1, 0.25, 2.5);
                // Reduce particle size by 75%
                baseSize *= 1;
                // Ensure sizes don't go below minimum
                baseSize = p.constrain(baseSize, 0.19, 1.875); // 0.25 * 0.75 ≈ 0.19 and 2.5 * 0.75 = 1.875

                // Apply Fade-In Scale to Size
                let currentSize = baseSize * fadeProgress;

                // Assign colors from Tonemaki palette
                let colorIndex = (i + j) % tonemakiColors.length;
                let baseColor = p.color(tonemakiColors[colorIndex]);
                baseColor.setAlpha(100 * fadeProgress); // Adjust opacity for blending
                p.fill(baseColor);

                // Calculate wave offsets for X and Y directions
                let yWave = p.sin(p.frameCount * yWaveSpeed + i * yWaveLength + j * yWaveOffset) * yWaveSize;
                let xWave = p.cos(p.frameCount * xWaveSpeed + i * xWaveLength + j * xWaveOffset) * xWaveSize;

                // Position of the dot
                let xPos = i * xSpace + xWave;
                let yPos = j * ySpace + yWave;

                // Draw the distorted dot
                p.ellipse(xPos, yPos, currentSize, currentSize);
            }
        }

        p.pop();

        // Stop the loop after fade-in completes
        if (fadeProgress >= 1) {
            p.noLoop();
        }
    };

    function calculateGrid() {
        rows = Math.floor(rows * 0.75);
        columns = Math.floor(columns * 0.75);
        xSpace = w / columns;
        ySpace = h / rows;
        yWaveSize = h * 0.3;
        xWaveSize = w * 0.3;
    }

    p.windowResized = function () {
        w = p5Container.width;
        h = p5Container.height;
        p.resizeCanvas(w, h);
        calculateGrid();
    };
};

new p5(halftoneSketch);