import sys
import typing
import json
from typing import List, Dict, Union, Generator

####################################
from motor_module import MotorModule
####################################

class PythonModule():
    def __init__(self, data: List[str]):
        self.data_from_nodejs = data

    def __repr__(self) -> str:
        return "Data = " + str([med for med in self.data_from_nodejs])

    def __len__(self) -> int:
        return len(self.data_from_nodejs)

    def __iter__(self) -> Generator[str, None, None]:
        for medicine in self.data_from_nodejs:
            yield medicine
        self.data_from_nodejs = []

    def has_gotten_all(self) -> bool:
        return not self.data_from_nodejs

if __name__ == '__main__':
    # with open("./util/python/medicine_location.json", "r") as medi_loc:
    #     medicine_location = json.load(medi_loc)
        
    medicine_data = PythonModule(sys.argv[1:])
    machine = MotorModule()
    
    for medicine in medicine_data:
        machine.move_motors(medicine)

    machine.reset_motor_location()

    try: 
        if medicine_data.has_gotten_all():
            machine.send_confirmation()
    except:
        print("fail")