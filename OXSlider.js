/**
 * The O-X Axis Slider requires a single motor.
 * @constructor
 */
var OXSlider = function() {
    var Nema17Motor,
        maxSteps = 1176 * 8,
        currentStep = 0;

    /**
     * Sets the motor.
     * @param motor
     * @returns {OXSlider}
     */
    this.setNema17Motor = function(motor) {
        Nema17Motor = motor;
        return this;
    };

    /**
     * Fetches the set motor.
     * @returns {*}
     */
    this.getNema17Motor = function() {
        return Nema17Motor;
    };

    /**
     * Positions slider in the middle of the axis.
     */
    this.center = function() {
        var steps = currentStep > maxSteps / 2 ? currentStep - maxSteps / 2 : maxSteps / 2 - currentStep ;
        this.getNema17Motor().step(steps);
        currentStep = currentStep + steps;
    };

    /**
     * Moves slider at position 0 - inner edge.
     */
    this.home = function() {
        this.getNema17Motor().step(0 - currentStep);
        currentStep = 0;
    };

    /**
     * Moves slider at max position - outer edge.
     */
    this.edge = function() {
        this.getNema17Motor().step(maxSteps - currentStep);
        currentStep = maxSteps;
    };

    /**
     * Moves slider at given coordinate.
     * @param pos
     */
    this.stepAt = function(pos) {
        var steps = pos - currentStep;
        this.getNema17Motor().step(steps);
        currentStep = currentStep + steps;
    };
};

module.exports = OXSlider;