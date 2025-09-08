class Figure {
    constructor(line, points) {
        this.line = line;
        this.points = points;
    }

    create() {

    }

    update() {
        this.display();
    }

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

        // Points
        for (let point of this.points) {
            push();
            // Point
            noStroke();
            fill(point.fill);
            translate(point.x * (this.line.length * width), 0);
            circle(0, 0, point.size * (this.line.length * width));
            // Label

            translate(0, -this.line.capLength * 2 * width);
            textAlign(CENTER, BOTTOM);
            textSize(this.line.capLength * 2 * width);
            text(point.label, 0, 0);
            pop();
        }
    }
}