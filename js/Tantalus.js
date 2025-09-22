/**
 * Handles the Tantalus minigame.
 * 
 * Let's see. Reach reach.
 */
class Tantalus extends State {
    constructor() {
        super();

        // Meta information about the figure
        this.figureData = {
            caption: "Figure 3. Tantalus",
            lineRotation: -PI / 2 // 90 degrees
        };
        // The number line everything happens on
        this.lineData = {
            x: 0.1,
            y: 0.5,
            weight: 0.004, // For strokeWeight
            length: 0.8,
            capLength: 0.015, // For the flat end caps
            labelsMatchLineRotation: false,
        };
        // The point that is Tantalus
        this.tantalus = {
            x: 0.5, // How far along the line he is
            size: 0.03, // The size of his dot <- shoudl be standardized?
            label: "T",
            fill: "#000000",
            alpha: 255,
            progress: 0, // <- how will this work...
            visible: true
        };
        // The point that is the apple
        this.apple = {
            x: 0.75,
            size: 0.03,
            label: "A",
            fill: "#ff0000",
            alpha: 255,
            visible: true
        };
        // The point that is the water
        this.water = {
            x: 0.25,
            size: 0.03,
            label: "W",
            fill: "#0000ff",
            alpha: 255,
            visible: true
        };

        this.pointsData = [this.tantalus, this.apple, this.water];

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
        // Display the line and points
        this.display();

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

    }
}