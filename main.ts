let Soil_Moisture = 0
esp8266.init(SerialPin.P16, SerialPin.P15, BaudRate.BaudRate115200)
if (esp8266.isESP8266Initialized()) {
    basic.showIcon(IconNames.Yes)
} else {
    basic.showIcon(IconNames.No)
}
esp8266.connectWiFi("Beg", "26122004")
if (esp8266.isWifiConnected()) {
    basic.showIcon(IconNames.Happy)
} else {
    basic.showIcon(IconNames.Sad)
}
basic.forever(function () {
    Soil_Moisture = pins.analogReadPin(AnalogPin.P2)
    serial.writeValue("moisture", Soil_Moisture)
    esp8266.writeBlynk("hkwNUJmdoTekbvu9kfLCPMbjcSCHsGh1", "V0", convertToText(Soil_Moisture))
    if (input.buttonIsPressed(Button.A)) {
        basic.showNumber(Soil_Moisture)
    }
    if (Soil_Moisture > 650) {
        rekabit.setAllRgbPixelsColor(0xff0000)
        basic.showIcon(IconNames.Heart)
        rekabit.runMotor(MotorChannel.M2, MotorDirection.Forward, 255)
        basic.pause(5000)
        rekabit.brakeMotor(MotorChannel.M2)
    } else {
        rekabit.setAllRgbPixelsColor(0x00ff00)
        basic.showIcon(IconNames.SmallHeart)
    }
})
