makerbit.onIrButton(IrButton.Any, IrButtonAction.Released, function () {
    maqueen.motorStop(maqueen.Motors.All)
})
makerbit.onIrButton(IrButton.Any, IrButtonAction.Pressed, function () {
    if (makerbit.irButton() == 120) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    } else if (makerbit.irButton() == 96) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 100)
    } else if (makerbit.irButton() == 128) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 100)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 100)
    } else if (makerbit.irButton() == 192) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
    } else if (makerbit.irButton() == 248) {
        maqueen.servoRun(maqueen.Servos.S1, 120)
        basic.pause(100)
        maqueen.servoRun(maqueen.Servos.S1, 60)
        basic.pause(100)
        maqueen.servoRun(maqueen.Servos.S1, 120)
        basic.pause(100)
        maqueen.servoRun(maqueen.Servos.S1, 0)
        basic.pause(100)
    } else if (makerbit.irButton() == 64) {
        maqueen.motorStop(maqueen.Motors.All)
    } else if (makerbit.irButton() == 56) {
        on_remote = 1
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
    } else if (makerbit.irButton() == 200) {
        on_remote = 0
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    } else {
        maqueen.motorStop(maqueen.Motors.All)
        basic.showNumber(makerbit.irButton())
    }
})
let on_remote = 0
let speed = 40
makerbit.connectIrReceiver(DigitalPin.P16, IrProtocol.Keyestudio)
on_remote = 1
maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
basic.forever(function () {
    if (!(on_remote)) {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, speed - 40)
            maqueen.motorStop(maqueen.Motors.All)
            basic.pause(100)
        } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 70)
            basic.pause(75)
        } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed - 40)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed)
            basic.pause(75)
        } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed - 40)
            basic.pause(75)
        }
    }
})
