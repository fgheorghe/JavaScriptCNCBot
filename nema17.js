// Load module and motors.
var NumatoLab32ChannelUSBGPIOModule = new (require("./NumatoLab32ChannelUSBGPIOModule.js"))(),
    Nema17_1 = new (require('./NEMA17.js'))(),
    Nema17_2 = new (require('./NEMA17.js'))(),
    Nema17_3 = new (require('./NEMA17.js'))(),
    OXSLider = new (require('./OXSlider.js'))(),
    OYSLider = new (require('./OYSlider.js'))();

// Configure NUMATO controller.
NumatoLab32ChannelUSBGPIOModule
    .setDevicePath("/dev/ttyACM0")
    .init();

// Set OY motors.
Nema17_1
    .setNumatoLab32ChannelUSBGPIOModule(NumatoLab32ChannelUSBGPIOModule)
    .setControllerPins({
        CW: 3,
        CLK: 1
    });

Nema17_2
    .setNumatoLab32ChannelUSBGPIOModule(NumatoLab32ChannelUSBGPIOModule)
    .setControllerPins({
        CW: "U",
        CLK: "V"
    });

// Set OX Motors.
Nema17_3
    .setNumatoLab32ChannelUSBGPIOModule(NumatoLab32ChannelUSBGPIOModule)
    .setControllerPins({
        CW: 9,
        CLK: 8
    });

// Add them to controllers.
OYSLider.addNema17Motor(Nema17_1);
OYSLider.addNema17Motor(Nema17_2);
OXSLider.setNema17Motor(Nema17_3);

// Test some movement.
for (var i = 0; i < 1; i++) {
    OXSLider.stepAt(2400);
    OYSLider.stepAt(2400);
    OXSLider.home();
    OYSLider.home();
}