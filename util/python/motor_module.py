from typing import List
import typing

class MotorModule:
    def __init__(self) -> None:
        pass

    def move_motors(self, location: List[tuple]) -> None:
        print(location)
        self.move_left()
        self.move_right()
        self.move_up()
        self.move_down()

    def move_left(self) -> None:
        print('move left')

    def move_right(self) -> None:
        print('move right')

    def move_up(self) -> None:
        print('move up')

    def move_down(self) -> None:
        print('move dwon')

    def reset_motor_location(self) -> None:
        print('reset motor location')

    @staticmethod
    def send_confirmation() -> None:
        print('success')

if __name__ == '__main__':
    motor = MotorModule()