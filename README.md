# Medicine Vending Machine

[detail](https://sammiee5311.github.io/capston/Medicine-Vending-Machine/)

## Motivation

Many people complain about not only getting medicine at working hours but also hard to get it in underdeveloped areas.

## How it works

<img src="./images/3.png" width="720">

## Images (Examples)

webpage 1 | webpage 2 |
:------------: | :-----------: |
<img src="/images/webpage1.png">  | <img src="/images/webpage2.png"> |

machine 1 | machine 2 |
:------------: | :-----------: |
<img src="/images/machine1.jpg">  | <img src="/images/machine2.jpg"> |

## File directory tree

``` python
MedicineVendingMachine
 ┣ controllers
 ┃ ┣ admin.js
 ┃ ┣ error.js
 ┃ ┣ externalMedicalSupplies.js
 ┃ ┗ generalMedicine.js
 ┣ models
 ┃ ┣ database.js
 ┃ ┣ machine.js
 ┃ ┣ order.js
 ┃ ┗ pharmacist.js
 ┣ public
 ┃ ┣ css
 ┃ ┃ ┣ forms.css
 ┃ ┃ ┣ main.css
 ┃ ┃ ┗ medicine.css
 ┃ ┣ images
 ┃ ┃ ┣ band.jpg
 ┃ ┗ js
 ┃ ┃ ┣ checkout.js
 ┃ ┃ ┣ pharmacistOrder.js
 ┃ ┃ ┣ socket.io.js
 ┃ ┃ ┗ vendingOrder.js
 ┣ routes
 ┃ ┣ admin.js
 ┃ ┣ externalMedicalSupplies.js
 ┃ ┗ generalMedicine.js
 ┣ util
 ┃ ┣ python
 ┃ ┃ ┣ StandardFirmata
 ┃ ┃ ┃ ┗ StandardFirmata.ino
 ┃ ┃ ┣ main.py
 ┃ ┃ ┣ make_json_file.py
 ┃ ┃ ┣ medicine_location.json
 ┃ ┃ ┗ motor_module.py
 ┃ ┣ database.js
 ┃ ┗ path.js
 ┣ views
 ┃ ┣ admin
 ┃ ┃ ┗ add-medicine.ejs
 ┃ ┣ includes
 ┃ ┃ ┣ end.ejs
 ┃ ┃ ┗ head.ejs
 ┃ ┣ machine
 ┃ ┃ ┣ checkout.ejs
 ┃ ┃ ┣ index.ejs
 ┃ ┃ ┣ pharmacist.ejs
 ┃ ┃ ┣ popup.html
 ┃ ┃ ┣ socketIo.ejs
 ┃ ┃ ┗ vending.ejs
 ┃ ┗ 404.ejs
 ┣ app.js
 ┣ LICENSE
 ┣ package-lock.json
 ┣ package.json
 ┣ README.md
 ┗ socket.js
```

## Todo

### Hardward
- [x] control motors
- [x] make a frame with acrylic plates
- [x] complete the machine

### Software
- [x] make a User Interface
- [x] connect to AWS
- [x] complete client-side
- [x] complete server-side

## Reference
