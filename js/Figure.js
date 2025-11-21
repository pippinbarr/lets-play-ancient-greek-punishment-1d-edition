class Figure {
    constructor(figure, line, points) {
        this.figure = figure;
        this.line = line;
        this.points = points;
        this.invertColor = false;
    }

    create() {

    }

    update() {
        this.display();
    }

    display() {
        background(255);

        // Display the figure's caption
        push();
        textSize(this.line.capLength * 2 * width);
        textAlign(LEFT, BOTTOM);
        textStyle(BOLDITALIC);
        text(this.figure.caption, 0.1 * width, height * 0.9);
        pop();

        // Display the figure's subcaption
        push();
        textSize(this.line.capLength * 2 * width);
        textAlign(LEFT, BOTTOM);
        rectMode(CORNER);
        text(this.figure.subcaption, 0.1 * width, height * 0.975, 0.8 * width);
        pop();

        // Some pretty gross translation stuff I don't feel amazing about
        // in here. But mostly it just draws stuff. I used translation
        // thinking that might just be easier and I think on the balance
        // it probably was.

        translate(width / 2, height / 2);
        rotate(this.figure.lineRotation);
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
        textAlign(CENTER, CENTER);
        textSize(this.line.capLength * 2 * width);
        translate(0, this.line.capLength * 3 * width);
        if (!this.line.labelsMatchLineRotation) rotate(-this.figure.lineRotation);
        text("0", 0, 0);
        pop();

        // Right cap
        translate(this.line.length * width, 0);
        line(0, -this.line.capLength * width, 0, this.line.capLength * width);

        // Right label
        push();
        textStyle(NORMAL);
        strokeWeight(0);
        textAlign(CENTER, CENTER);
        textSize(this.line.capLength * 2 * width);
        translate(0, this.line.capLength * 3 * width);
        if (!this.line.labelsMatchLineRotation) rotate(-this.figure.lineRotation);
        text("1.0", 0, 0);
        pop();

        pop();

        // Points
        for (let point of this.points) {
            if (!point.visible) continue;
            push();
            // Point
            noStroke();
            fill(point.fill);
            translate(point.x * (this.line.length * width), 0);
            circle(0, 0, point.size * (this.line.length * width));
            // Label

            translate(0, -this.line.capLength * 3 * width);
            textAlign(CENTER, CENTER);
            textSize(this.line.capLength * 2 * width);

            if (!this.line.labelsMatchLineRotation) rotate(-this.figure.lineRotation);
            text(point.label, 0, 0);
            pop();
        }

        // Invert if we are meant to
        if (this.invertColor) {
            filter(INVERT);
        }

    }

    invert() {
        this.invertColor = !this.invertColor;
    }
}