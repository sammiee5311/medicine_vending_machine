from typing import List, Dict
import typing
import time
import json
import os
from pyfirmata import Arduino


class MotorModule:
    try:
        if os.name == 'nt': # window os
            BOARD = Arduino('') # COM number
        else:
            BOARD = Arduino('/dev/ttyACM0')
    except:
        BOARD = None


    def __init__(self) -> None:
        self.motors = self.set_pins()
    
    def set_pins(self) -> Dict[str, Arduino]:
        motors = {}
        with open("./util/python/medicine_location.json", "r") as medi_pins:
            medicine_pins = json.load(medi_pins)
        try:
            for key, val in medicine_pins.items():
                if val['pinNumber']:
                    motors[key] = self.BOARD.get_pin(val['pinNumber'])
        except AttributeError:
            print('Arduino is not connected to your device.')
        
        return motors

    def move_motors(self, name: str) -> None:
        try:
            self.motors[name].write(0.6)
            time.sleep(1)
            self.motors[name].write(0)
            time.sleep(0.5)

        except KeyError:
            print('%s ID is not contained in medicine list.' %name)

    @staticmethod
    def success() -> None:
        print('success')

    @staticmethod
    def fail() -> None:
        print('fail')


if __name__ == '__main__':
    motor = MotorModule()
    if motor.BOARD:
        motor.move_motors('')
        motor.move_motors('')