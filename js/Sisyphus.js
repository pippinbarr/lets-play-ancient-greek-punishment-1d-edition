/**
 * Handles the Sisyphus minigame.
 * It may be that I want an intermediary class that handles common
 * gameplay functions? We'll see. It's weird doing this in p5.
 */
class Sisyphus extends State {
    constructor() {
        super();

        this.line = {
            x: 0.1,
            y: 0.5,
            weight: 0.004,
            length: 0.8,
            capLength: 0.015
        };
        this.sisyphus = {
            x: 0.4,
            size: 0.03
        };
        this.boulder = {
            x: 0,
            size: 0.03
        };
    }

    create() {

    }

    update() {
        this.display();

        this.sisyphus.x = constrain(this.sisyphus.x - 0.001, 0, 1);
        this.boulder.x = this.sisyphus.x + (this.sisyphus.size / 2 + this.boulder.size / 2);
    }

    display() {
        background(255);

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

    mousePressed() {
        this.sisyphus.x = constrain(this.sisyphus.x + 0.015, 0, 1);
        this.boulder.x = this.sisyphus.x + (this.sisyphus.size / 2 + this.boulder.size / 2);
    }
}