/**
 * Handles the Danaids minigame.
 * 
 * Let's see. Pour pour.
 */
class Danaids extends State {
    constructor() {
        super();

        // Meta information about the figure
        this.figureData = {
            caption: "Figure 4. Danaids",
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
        // The point that is the Danaid
        this.danaid = {
            x: 0.5, // How far along the line he is
            size: 0.03, // The size of his dot <- shoudl be standardized?
            label: "D",
            fill: "#000000",
            alpha: 255,
            progress: 0, // <- how will this work...
            visible: true
        };
        // The point that is the fountain... colour?
        this.fountain = {
            x: 0, // How far along the line it is
            size: 0.03, // The size of his dot <- shoudl be standardized?
            label: "F",
            fill: "#000000", // <- what colour? how does it work?
            alpha: 255,
            progress: 0, // <- how will this work...
            visible: true
        };
        // The point that is the bath... colour?
        this.bath = {
            x: 1, // How far along the line it is
            size: 0.03, // The size of his dot <- shoudl be standardized?
            label: "B",
            fill: "#000000", // <- what colour? how does it work?
            alpha: 255,
            progress: 0, // <- how will this work...
            visible: true
        };

        this.pointsData = [this.danaid, this.fountain, this.bath];

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