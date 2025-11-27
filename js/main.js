/**
 * Let's Play: Ancient Greek Punishment: 1D Edition
 * Pippin Barr
 * 
 * Uses:
 * p5.js (for now)
*/

"use strict";

let canvas = undefined; // A reference to the canvas for scaling with CSS

let state = undefined; // This will be our state handling
const states = [Sisyphus, Prometheus, Tantalus, Danaids, Zeno];
let stateIndex = 1; // Just for switching between them quickly for now

/**
 * Create the canvas, probably more
 */
function setup() {
    // Create the canvas at our aspect ratio
    canvas = createCanvas(8 * 64, 8 * 64);
    // Trigger window resizing so it scales
    windowResized();

    // Starting state
    state = new states[stateIndex];
}

/**
 * For now we're just making the canvas visible while I mess with CSS
 */
function draw() {
    background(0);

    state.update();
}

/**
 * Feed the mouse pressed even through to the state
 */
function mousePressed() {
    state.mousePressed();
}

/**
 * For testing purposes if we press any key we will switch to the next game
 */
function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        stateIndex = (stateIndex + 1) % states.length;
        state = new states[stateIndex];
    }
}

/**
 * Called when there's any change to the window size and scales the canvas
 * to fit with its aspect ratio preserved. Doing this so I don't have an actually
 * size-changing canvas, just scaling in CSS
 */
function windowResized() {
    // Compare the ratios to figure out which was to stretch the canvas proportionally
    if (windowWidth / windowHeight > 9 / 16 && windowHeight / windowWidth < 16 / 9) {
        // Prioritize the vertical dimension
        canvas.style("min-height", "100vh");
        canvas.style("width", "auto");
    }
    else {
        // Prioritize the horizontal
        canvas.style("min-width", "100vw");
        canvas.style("height", "auto");
    }
}