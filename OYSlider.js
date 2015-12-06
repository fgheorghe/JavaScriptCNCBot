/**
 * The O-Y Axis Slider requires two motors.
 *
 * @constructor
 */
var OYSlider = function() {
    var Nema17Motors = [],
        maxSteps = 1176 * 8,
        currentStep = 0;

    /**
     * Adds a new motor.
     * @param motor
     * @returns {OYSlider}
     */
    this.addNema17Motor = function(motor) {
        if (Nema17Motors.length === 2) {
            throw "The OYSlider supports a maximum of 2 motors.";
        }
        Nema17Motors.push(motor);
        return this;
    };

    /**
     * Fetches the set motors.
     * @returns {Array}
     */
    this.getNema17Motors = function() {
        return Nema17Motors;
    };

    /**
     * Positions slider in the middle of the axis.
     */
    this.center = function() {
        this.stepAt(maxSteps / 2);
    };

    /**
     * Moves slider at position 0 - inner edge.
     */
    this.home = function() {
        this.stepAt(0);
    };

    /**
     * Moves slider at max position - outer edge.
     */
    this.edge = function() {
        this.stepAt(maxSteps);
    };

    /**
     * Moves slider at given coordinate.
     * @param pos
     */
    this.stepAt = function(pos) {
        var steps = pos - currentStep,
            dir = steps >= 0 ? -1 : 1,
            i, motors = this.getNema17Motors();

        while (pos !== currentStep) {
            for (i = 0; i < motors.length; i++) {
               motors[i].step(dir);
            }
            currentStep = currentStep + -1 * dir;
        }
    };
};

module.exports = OYSlider;