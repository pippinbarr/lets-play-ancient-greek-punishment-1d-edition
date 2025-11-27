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
            subcaption: "Click rapidly to make point P (Prometheus) writhe to scare off point E (the eagle) for a little while.",
            lineRotation: -PI / 2 // 90 degrees
        };
        // The number line everything happens on
        this.lineData = {
            x: 0.2,
            y: 0.5,
            weight: 0.004, // For strokeWeight
            length: 0.66,
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
            visible: true,
        };
        // The point that is the eagle
        this.eagle = {
            x: 1,
            size: 0.03,
            label: "E",
            fill: "#000000",
            alpha: 255,
            progress: 1,
            state: "inbound",
            visible: true
        };

        this.writheMin = 2;
        this.writhe = false;


        this.pointsData = [this.prometheus, this.eagle];

        this.figure = new Figure(this.figureData, this.lineData, this.pointsData);

        this.inputEnabled = true;

        this.inputInterval = setInterval(() => {
            this.writhe = this.clicks >= this.writheMin;
            this.clicks = 0;
            if (!this.writhe) {
                this.prometheus.x = 0;
                this.writheDir = 1;
            }
        }, 250);

        this.writheDir = 1;
        this.writheInterval = setInterval(() => {
            if (this.writhe) {
                this.prometheus.x += this.writheDir * 0.01;
                this.writheDir *= -1;
            }
        }, 100);

        this.hoverX = 0.2;
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

        switch (this.eagle.state) {
            case "done":
                break;

            case "inbound":
                this.eagle.x = constrain(this.eagle.x - 0.025, 0 + this.prometheus.size, 1);
                if (this.writhe && this.eagle.x - this.prometheus.x < this.prometheus.size * 2) {
                    this.eagle.state = "hover-up";
                }
                else if (this.eagle.x === this.prometheus.size) {
                    this.eagle.state = "landed";
                }
                break;

            case "hover-up":
                this.eagle.x += 0.025;
                if (this.eagle.x >= this.hoverX) {
                    this.eagle.x = this.hoverX;
                    this.eagle.state = "hovering";
                    this.hoverTimeout = setTimeout(() => {
                        this.eagle.state = "inbound";
                    }, 2000);
                }
                break;

            case "hovering":
                break;

            case "landed":
                // A poor simulation of the eagle pecking for a bit
                if (!this.eagle.peckTimeout) {
                    this.eagle.peckTimeout = setTimeout(() => {
                        this.eagle.state = "outbound";
                        this.eagle.peckTimeout = null;
                    }, 5000);
                }
                if (this.writhe) {
                    clearTimeout(this.eagle.peckTimeout);
                    this.eagle.peckTimeout = null;
                    this.eagle.state = "hover-up";
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
        if (this.inputEnabled) {
            this.clicks++;
        }
    }
}