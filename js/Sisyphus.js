/**
 * Handles the Sisyphus minigame.
 * 
 * Basically all the dimensions involved are relative to the width (or height
 * since right now the canvas is a square) as a way to control for my
 * fears about scaling, and it also feels kind of more correct in terms of the
 * math anyway
 */
class Sisyphus extends State {
    constructor() {
        super();

        // Meta information about the figure
        this.figureData = {
            caption: "Figure 1. Sisyphus",
            subcaption: "Click rapidly to help point S (Sisyphus) move point B (Boulder) to position 1.0 on the number line (hill).",
            lineRotation: -PI / 4 // 45 degrees
        };
        // The number line everything happens on
        this.lineData = {
            x: 0.1,
            y: 0.5,
            weight: 0.004, // For strokeWeight
            length: 0.8,
            capLength: 0.015, // For the flat end caps
            labelsMatchLineRotation: true
        };
        // The point that is Sisyphus
        this.sisyphus = {
            x: 0, // How far along the line he is
            vx: 0,
            maxVX: 1,
            ax: 0,
            maxAX: 0.1,
            pushVX: 0.0025,
            walkAX: 0.001,
            fatigue: -0.0001,
            size: 0.03, // The size of his dot
            label: "S",
            fill: "#000000",
            alpha: 255,
            progress: 0,
            visible: true,
            contact: false,
            walking: false,
        };
        // The point that is the boulder
        this.boulder = {
            x: 0.03,
            vx: 0,
            maxVX: 1,
            ax: 0,
            maxAX: 0.1,
            gravity: -0.00001,
            size: 0.03,
            label: "B",
            fill: "#a86832",
            alpha: 255,
            progress: 0,
            visible: true
        };

        this.pointsData = [this.sisyphus, this.boulder];

        this.figure = new Figure(this.figureData, this.lineData, this.pointsData);

        this.clicks = 0;
        this.inputSuccess = false;
        this.inputEnabled = true;
        this.counterForce = -0.004;
        this.clickForce = 0.003;
        this.force = 0;
        this.inputInterval = setInterval(() => {
            this.force = this.clicks * this.clickForce;
            this.clicks = 0;
        }, 250);
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
        // Move
        this.move();
    }

    move() {
        this.sisyphus.x += this.force + this.counterForce;
        this.sisyphus.x = constrain(this.sisyphus.x, 0, 1 - 0.03);
        this.boulder.x = this.sisyphus.x + 0.03;

        if (this.boulder.x >= 1) {
            this.inputEnabled = false;
            this.clicks = 0;
            this.counterForce = -0.008;

        }
        else if (this.sisyphus.x === 0) {
            this.inputEnabled = true;
            this.counterForce = -0.004;
        }
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
        if (this.inputEnabled) {
            this.clicks++;
        }
    }
}