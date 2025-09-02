/**
 * A class to handle states in the program, just the basics of
 * create and update
 */
class State {
    /**
     * May need some basic stuff in here?
     */
    constructor() {

    }

    /**
     * Call this when we want to create the state for display
     */
    create() {

    }

    /**
     * Called every frame the state is running
     */
    update() {

    }

    /**
     * All states should probably override handle mouse pressed since it's
     * the key interaction
     */
    mousePressed() {
        // If this gets called then that would be bad because it would mean
        // the child state isn't dealing with the key interaction.
        console.error("mousePressed went unhandled")
    }
}