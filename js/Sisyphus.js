/**
 * Handles the Sisyphus minigame.
 * It may be that I want an intermediary class that handles common
 * gameplay functions? We'll see. It's weird doing this in p5.
 * 
 * Basically all the dimensions involved are relative to the width (or height
 * since right now the canvas is a square) as a way to control for my
 * fears about scaling, and it also feels kind of more correct in terms of the
 * math anyway
 */
class Sisyphus extends State {
    constructor() {
        super();

        // The number line everything happens on
        this.line = {
            x: 0.1,
            y: 0.5,
            weight: 0.004, // For strokeWeight
            length: 0.8,
            capLength: 0.015 // For the flat end caps
        };
        // The point that is Sisyphus
        this.sisyphus = {
            x: 0.4, // How far along the line he is
            size: 0.03 // The size of his dot
        };
        // The point that is the boulder
        this.boulder = {
            x: 0,
            size: 0.03
        };
    }

    /**
     * Unsure if I'll really use this, was mimicking Phaser
     */
    create() {

    }

    /**
     * Once per frame, updates it all
     */
    update() {
        // Display the line and points
        this.display();

        // Ugly but updating sisyphus and the boulder for "gravity"
        this.sisyphus.x = constrain(this.sisyphus.x - 0.001, 0, 1);
        this.boulder.x = this.sisyphus.x + (this.sisyphus.size / 2 + this.boulder.size / 2);
    }

    /**
     * Display the whole thing
     */
    display() {
        background(255);

        // Some pretty gross translation stuff I don't feel amazing about
        // in here. But mostly it just draws stuff. I used translation
        // thinking that might just be easier and I think on the balance
        // it probably was.

        translate(width / 2, height / 2);
        rotate(-PI / 4);
        translate(-width / 2, -height / 2);

        push();
        translate(this.line.x * width, this.line.y * height);

        push();
        strokeWeight(this.line.weight * width);
        stroke(0);
        strokeCap(SQUARE);
        // Main line
        line(0, 0, this.line.length * width, 0);
        // Left cap
        line(0, -this.line.capLength * width, 0, this.line.capLength * width);

        // Left label
        push();
        textStyle(NORMAL);
        strokeWeight(0);
        textAlign(CENTER, TOP);
        textSize(this.line.capLength * 2 * width);
        text("0", 0, this.line.capLength * 2 * width);
        pop();

        // Right cap
        translate(this.line.length * width, 0);
        line(0, -this.line.capLength * width, 0, this.line.capLength * width);

        // Right label
        push();
        textStyle(NORMAL);
        strokeWeight(0);
        textAlign(CENTER, TOP);
        textSize(this.line.capLength * 2 * width);
        text("1", 0, this.line.capLength * 2 * width);
        pop();

        pop();

        // Sisyphus
        push();
        noStroke();
        fill(0);
        translate(this.sisyphus.x * (this.line.length * width), 0);
        circle(0, 0, this.sisyphus.size * (this.line.length * width));
        pop();

        // Boulder
        push();
        noStroke();
        fill(120, 74, 71);
        translate(this.boulder.x * (this.line.length * width), 0);
        circle(0, 0, this.boulder.size * (this.line.length * width));
        pop();
    }

    /**
     * What happens when you click? A little push.
     */
    mousePressed() {
        this.sisyphus.x = constrain(this.sisyphus.x + 0.015, 0, 1);
        this.boulder.x = this.sisyphus.x + (this.sisyphus.size / 2 + this.boulder.size / 2);
    }
}