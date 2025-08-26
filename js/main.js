/**
 * Let's Play: Ancient Greek Punishment: 1D Edition
 * Pippin Barr
 * 
 * Uses:
 * p5.js (for now)
*/

"use strict";

let canvas = undefined; // A reference to the canvas for scaling with CSS


/**
 * Create the canvas, probably more
 */
function setup() {
    canvas = createCanvas(9 * 64, 16 * 64);
    windowResized();
    console.log(width, height);
}

/**
 * For now we're just making the canvas visible while I mess with CSS
 */
function draw() {
    background(0);
}

function windowResized() {
    // canvas.style("display", "inline-block");

    // Compare the ratios to figure out which was to stretch the canvas proportionally
    if (windowWidth / windowHeight > 9 / 16 && windowHeight / windowWidth < 16 / 9) {
        // Prioritize the vertical dimension
        canvas.style("height", "100vh");
        canvas.style("width", "auto");
    }
    else {
        // Prioritize the horizontal
        canvas.style("width", "100vw");
        canvas.style("height", "auto");
    }

    console.log(window.innerWidth, window.innerHeight);
    console.log(windowWidth, windowHeight);
    console.log(canvas.width, canvas.height);
}