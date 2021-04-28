import sys
import collections
import typing
import json
from typing import List, Dict, Union

####################################
from motor_module import MotorModule
####################################

class PythonModule(MotorModule):
    def __init__(self, data: List[str]):
        self.data_from_nodejs = collections.deque(data)

    def __repr__(self) -> str:
        return "Data = " + str([med for med in self.data_from_nodejs])

    def __len__(self) -> int:
        return len(self.data_from_nodejs)

    def pop_data(self, medicine_location: Union[str, int] ) -> None:
        while self.data_from_nodejs:
            cur_medicine = self.data_from_nodejs.pop()
            location = medicine_location[cur_medicine]['location']
            self.move_motors(location)
        self.reset_motor_location()

    def has_gotten_all(self) -> bool:
        return not self.data_from_nodejs

    @staticmethod
    def send_confirmation() -> None:
        print('success')

if __name__ == '__main__':
    with open("./util/python/medicine_location.json", "r") as medi_loc:
        medicine_location = json.load(medi_loc)

    py_module = PythonModule(sys.argv[1:])
    # py_module = PythonModule(['606b0ec24bfa6841ec0e270d','60798ad7d0941130281ecffd','60798b15d0941130281ecffe','60798b44d0941130281ecfff'])
    py_module.pop_data(medicine_location)

    try: 
        if py_module.has_gotten_all():
            py_module.send_confirmation()
    except:
        print("fail")