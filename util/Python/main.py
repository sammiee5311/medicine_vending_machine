import sys
import collections
import typing
from typing import List

### motor_module

class PythonModule:
    def __init__(self, data: List[str]):
        self.data_from_nodejs = collections.deque(data)

    def __repr__(self) -> str:
        return "Data = " + str([med for med in self.data_from_nodejs])

    def __len__(self) -> int:
        return len(self.data_from_nodejs)

    def pop_data(self) -> str:
        for data in self.data_from_nodejs:
            yield data
    
    def move_motors(self) -> None:
        pass

    def has_gotten_all(self) -> bool:
        return True

    @staticmethod
    def send_confirmation() -> None:
        print('success')

if __name__ == '__main__':
    py_module = PythonModule(sys.argv[1:])
    
    # for data in py_module.pop_data():
    #     print(data)

    try: 
        if py_module.has_gotten_all():
            py_module.send_confirmation()
    except:
        print("fail")