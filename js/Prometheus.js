/**
 * Handles the Prometheus minigame.
 * 
 * Let's see. Caw caw.
 */
class Prometheus extends State {
    constructor() {
        super();

        // Meta information about the figure
        this.figureData = {
            caption: "Figure 2. Prometheus",
            lineRotation: -PI / 2 // 90 degrees
        };
        // The number line everything happens on
        this.lineData = {
            x: 0.1,
            y: 0.5,
            weight: 0.004, // For strokeWeight
            length: 0.75,
            capLength: 0.015, // For the flat end caps
            labelsMatchLineRotation: false,
        };
        // The point that is Prometheus
        this.prometheus = {
            x: 0, // How far along the line he is
            size: 0.03, // The size of his dot
            label: "P",
            fill: "#000000",
            alpha: 255,
            progress: 1,
            visible: true
        };
        // The point that is the eagle
        this.eagle = {
            x: 1,
            size: 0.03,
            label: "E",
            fill: "#aaaaaa",
            alpha: 255,
            progress: 1,
            state: "inbound",
            visible: true
        };

        this.pointsData = [this.prometheus, this.eagle];

        this.figure = new Figure(this.figureData, this.lineData, this.pointsData);

        // Just trying out a tween...
        p5.tween.EASINGS.test = (t) => t + 0.25;
        this.eagleTween = p5.tween.manager.addTween(this.eagle, "inbound");
        this.eagleTween.addMotion('x', 0, 1000, 'test');
        this.eagleTween.startTween();
        // It works
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

        return;
        switch (this.eagle.state) {
            case "done":
                break;

            case "inbound":
                this.eagle.x = constrain(this.eagle.x - 0.025, 0 + this.prometheus.size, 1);
                if (this.eagle.x === this.prometheus.size) {
                    this.eagle.state = "landed";
                }
                break;

            case "landed":
                // A poor simulation of the eagle pecking for a bit
                if (!this.eagle.timeout) {
                    this.eagle.timeout = setTimeout(() => {
                        this.eagle.state = "outbound";
                        this.eagle.timeout = null;
                    }, 1000);
                }
                break;

            case "outbound":
                this.eagle.x = constrain(this.eagle.x + 0.025, 0 + this.prometheus.size, 1);
                if (this.eagle.x === 1) {
                    this.eagle.state = "done";
                    this.eagle.visible = false;
                    this.figure.invert();
                    this.eagle.timeout = setTimeout(() => {
                        this.figure.invert();
                        this.eagle.state = "inbound";
                        this.eagle.visible = true;
                        this.eagle.timeout = null;
                    }, 5000);
                }
                break;
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

    }
}