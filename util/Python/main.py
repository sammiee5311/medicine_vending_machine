import sys
import collections

### motor_module

class PythonModule:
    def __init__(self, data):
        self.data_from_nodejs = collections.deque(data)

    def __repr__(self):
        return "Data = " + str([med for med in self.data_from_nodejs])

    def __len__(self):
        return len(self.data_from_nodejs)

    def pop_data(self):
        for data in self.data_from_nodejs:
            yield data
    
    def move_motors(self):
        pass

    def send_confirmation(self):
        pass

    def has_gotten_all(self) -> bool:
        return True


if __name__ == '__main__':
    py_module = PythonModule(sys.argv[1:])
    
    # for data in py_module.pop_data():
    #     print(data)

    try: 
        if py_module.has_gotten_all():
            print("done")
    except:
        print("fail")