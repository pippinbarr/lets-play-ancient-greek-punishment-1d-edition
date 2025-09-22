/**
 * Handles the Zeno minigame.
 * 
 * Let's see. Run run.
 */
class Zeno extends State {
    constructor() {
        super();

        // Meta information about the figure
        this.figureData = {
            caption: "Figure 5. Zeno",
            lineRotation: 0
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
        // The point that is Zeno
        this.zeno = {
            x: 0, // How far along the line he is
            size: 0.03, // The size of his dot <- shoudl be standardized?
            label: "Z",
            fill: "#000000",
            alpha: 255,
            progress: 0, // <- how will this work...
            visible: true
        };

        this.pointsData = [this.zeno];

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