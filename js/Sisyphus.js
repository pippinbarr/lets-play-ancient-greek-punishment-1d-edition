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
            pushVX: 0.005,
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
            x: 0.2,
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
        console.log(this.sisyphus.x, this.sisyphus.vx, this.sisyphus.ax);
        // Display the line and points
        this.display();

        this.moveSisyphus();
        this.moveBoulder();

        // If the boulder touches sisyphus on this frame then it's in contact
        // and transfers its acceleration to him (e.g. should push him down the hill depending on how fast it was moving at the time)
        // And so the boulder stops (he stops it? Hmmm...)
        if (this.boulder.x < this.sisyphus.x + this.sisyphus.size) {
            this.boulder.x = this.sisyphus.x + this.sisyphus.size;
            this.sisyphus.contact = true;
            // this.sisyphus.ax += this.boulder.ax;
            this.boulder.vx = 0;
            this.boulder.ax = 0;
        }
        // If it's not touching sisyphus and reached the top it should stop
        // Unclear how useful this is...
        else if (this.boulder.x === 1) {
            this.boulder.vx = 0;
            this.boulder.ax = 0;
        }
    }

    moveSisyphus() {
        // Sisyphus loses acceleration from fatigue (e.g. accelerates 
        // backwards) -- this is what we're fighting with clicking when
        // he's walking up the hill and why we have to keep clicking to give
        // him forwards acceleration
        this.sisyphus.ax = constrain(this.sisyphus.ax + this.sisyphus.fatigue, -this.sisyphus.maxAX, this.sisyphus.maxAX);
        // Sisyphus moves according to his acceleration in the usual way
        // Except that we don't want him to slide backwards unless he's in contact with the boulder right?
        this.sisyphus.vx = constrain(this.sisyphus.vx + this.sisyphus.ax, 0, this.sisyphus.maxVX);
        // Sisyphus moves in the standard way with current velocity
        this.sisyphus.x = constrain(this.sisyphus.x + this.sisyphus.vx, 0, 1);
    }

    moveBoulder() {
        // Boulder loses acceleration from gravity
        this.boulder.ax = constrain(this.boulder.ax + this.boulder.gravity, -this.boulder.maxAX, this.boulder.maxAX);
        // Boulder velocity changes according to acceleration in the normal 
        // way
        this.boulder.vx = constrain(this.boulder.vx + this.boulder.ax, -this.boulder.maxVX, this.boulder.maxVX);
        // Boulder moves according to velocity in th enormal way
        this.boulder.x = constrain(this.boulder.x + this.boulder.vx, 0, 1);
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
        // this.sisyphus.x = constrain(this.sisyphus.x + 0.015, 0, 1);
        // this.boulder.x = this.sisyphus.x + (this.sisyphus.size / 2 + this.boulder.size / 2);

        // If sisyphus is touching the boulder on click, then push it
        // up the hill using velocity
        if (this.sisyphus.contact) {
            this.boulder.vx = this.sisyphus.pushVX;
            this.sisyphus.contact = false;
        }
        // If not, then sisyphus should accelerate up the hill based
        // on the click
        else {
            this.sisyphus.ax = constrain(this.sisyphus.ax + this.sisyphus.walkAX, 0, this.sisyphus.maxAX);
        }
    }
}