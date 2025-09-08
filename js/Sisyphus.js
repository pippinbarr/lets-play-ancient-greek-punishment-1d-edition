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
            size: 0.03, // The size of his dot
            label: "S",
            fill: "#000000",
            alpha: 255,
            progress: 1
        };
        // The point that is the boulder
        this.boulder = {
            x: 0,
            size: 0.03,
            label: "B",
            fill: "#a86832",
            alpha: 255,
            progress: 1
        };

        this.points = [this.sisyphus, this.boulder];

        this.figure = new Figure(this.line, this.points);
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
        this.figure.display();
    }

    /**
     * What happens when you click? A little push.
     */
    mousePressed() {
        this.sisyphus.x = constrain(this.sisyphus.x + 0.015, 0, 1);
        this.boulder.x = this.sisyphus.x + (this.sisyphus.size / 2 + this.boulder.size / 2);
    }
}