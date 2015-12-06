/**
 * NEMA 17 motor controller.
 * @constructor
 */
var NEMA17 = function() {
    var pins,
        NumatoLab32ChannelUSBGPIOModule,
        sleep,
        delay = 0;

    // Convenience method used for waiting a given number of ms.
    sleep = function(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    };

    /**
     * NUMATO Controller pins for this motor.
     * @param p
     * @returns {NEMA17}
     */
    this.setControllerPins = function(p) {
        pins = p;
        return this;
    };

    /**
     * NUMATO Controller module.
     * @param module
     * @returns {NEMA17}
     */
    this.setNumatoLab32ChannelUSBGPIOModule = function(module) {
        NumatoLab32ChannelUSBGPIOModule = module;
        return this;
    };

    /**
     * Fetches controller.
     * @returns {*}
     */
    this.getNumatoLab32ChannelUSBGPIOModule = function() {
        return NumatoLab32ChannelUSBGPIOModule;
    };

    /**
     * Fetches set pins.
     * @returns {*}
     */
    this.getControllerPins = function() {
        return pins;
    };

    /**
     * Steps a given number of steps.
     * @param steps
     */
    this.step = function(steps) {
        var i;
        if (steps < 0) {
            this.getNumatoLab32ChannelUSBGPIOModule().gpioSet(this.getControllerPins().CW);
            steps = steps * -1;
        } else {
            this.getNumatoLab32ChannelUSBGPIOModule().gpioClear(this.getControllerPins().CW);
        }
        for (i = 0; i < steps; i++) {
            this.getNumatoLab32ChannelUSBGPIOModule().gpioSet(this.getControllerPins().CLK);
            sleep(delay);
            this.stop();
        }
        this.getNumatoLab32ChannelUSBGPIOModule().gpioClear(this.getControllerPins().CW);
    };

    /**
     * Stops motor - clears all pins.
     */
    this.stop = function() {
        this.getNumatoLab32ChannelUSBGPIOModule().gpioClear(this.getControllerPins().CLK);
    }
};

module.exports = NEMA17;
