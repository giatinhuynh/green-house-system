/**
 * Press button A to manually activate the water pump for 5 seconds.
 */
/**
 * Set up ESP8266 module and check initialization.
 */
/**
 * Connect to WiFi and check connection status.
 */
/**
 * Connect to WiFi and check connection status.
 */
/**
 * Connect to WiFi and check connection status.
 */
// BUTTON A
input.onButtonPressed(Button.A, function () {
    // Run Motor M2 forward at max speed
    rekabit.runMotor(MotorChannel.M2, MotorDirection.Forward, 255)
    // Wait for 5 seconds
    basic.pause(5000)
    // Stop Motor M2
    rekabit.brakeMotor(MotorChannel.M2)
})
/**
 * Press button B to manually turn on the fan for 10 seconds.
 */
// BUTTON B
input.onButtonPressed(Button.B, function () {
    // Run Motor M1 forward at max speed
    rekabit.runMotor(MotorChannel.M1, MotorDirection.Forward, 255)
    // Wait for 10 seconds
    basic.pause(10000)
    // Stop Motor M1
    rekabit.brakeMotor(MotorChannel.M1)
})
/**
 * Connect to Wi-Fi and check connection status.
 */
let Water_Level = 0
let Humidity = 0
let Temperature = 0
let Soil_Moisture = 0
// SETUP ESP8266
esp8266.init(SerialPin.P16, SerialPin.P15, BaudRate.BaudRate115200)
// ESP8266 Initialization Check
if (esp8266.isESP8266Initialized()) {
    basic.showIcon(IconNames.Yes)
} else {
    basic.showIcon(IconNames.No)
}
// WIFI CONNECTION
esp8266.connectWiFi("Beg", "26122004")
// WiFi Connection Check
if (esp8266.isWifiConnected()) {
    basic.showIcon(IconNames.Happy)
} else {
    basic.showIcon(IconNames.Sad)
}
/**
 * Continuously read sensors, send data to Blynk, and control devices based on conditions.
 */
/**
 * Automatically control fan based on the temperature readings.
 */
/**
 * Automatically activate water pump or update RGB colors based on soil moisture readings
 */
// MONITOR SENSORS & CONTROL
basic.forever(function () {
    // Read Soil Moisture
    Soil_Moisture = pins.analogReadPin(AnalogPin.P2)
    // Send to Blynk
    esp8266.writeBlynk("token_here", "V0", convertToText(Soil_Moisture))
    // Read Temperature
    Temperature = Environment.dht11value(Environment.DHT11Type.DHT11_temperature_C, DigitalPin.P13)
    // Send to Blynk
    esp8266.writeBlynk("token_here", "V1", convertToText(Temperature))
    // Read Humidity
    Humidity = Environment.dht11value(Environment.DHT11Type.DHT11_humidity, DigitalPin.P13)
    // Send to Blynk
    esp8266.writeBlynk("token_here", "V2", convertToText(Humidity))
    // Read Water Level
    Water_Level = Environment.ReadWaterLevel(AnalogPin.P0)
    // Send to Blynk
    esp8266.writeBlynk("token_here", "V3", convertToText(Water_Level))
    // Temperature-based Motor Control
    if (Temperature > 30) {
        rekabit.runMotor(MotorChannel.M1, MotorDirection.Forward, 255)
    } else {
        rekabit.runMotor(MotorChannel.M1, MotorDirection.Backward, 255)
    }
    // Soil Moisture-based Actions
    if (Soil_Moisture > 650) {
        // Turn RGB Red
        rekabit.setAllRgbPixelsColor(0xff0000)
        // Run Motor M2 forward
        rekabit.runMotor(MotorChannel.M2, MotorDirection.Forward, 255)
        // Wait for 5 seconds
        basic.pause(5000)
        // Stop Motor M2
        rekabit.brakeMotor(MotorChannel.M2)
    } else {
        // Turn RGB Green
        rekabit.setAllRgbPixelsColor(0x00ff00)
    }
})
