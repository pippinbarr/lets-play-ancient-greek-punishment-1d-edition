class Menu extends State {
    constructor() {
        super();
    }

    create() {
        super.create();
    }

    update() {
        super.update();

        push();
        fill("#ff0000");
        text("menu", 100, 100);
        pop();
    }
}