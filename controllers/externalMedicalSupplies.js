const Database = require('../models/database');
const Machine = require('../models/machine');
const Order = require('../models/order');


exports.indexPage = (req, res, next) =>{
    res.render('machine/index', {
        pageTitle: 'machine',
        path: '/index'
    })
}

exports.getMedicineList = (req, res, next) =>{
    req.machine
    .populate('medicines.medicineId cart.medicines.medicineId')
    .execPopulate()
    .then(machine => {
        let price = 0;
        cartMedicines = machine.cart.medicines;
        medicines = machine.medicines;
        cartMedicines.forEach(medicine => {
            price += medicine.quantity * medicine.medicineId.price;
        });
        res.render('machine/vending', {
            medicines: medicines,
            cartMedicines: cartMedicines,
            price: price,
            pageTitle: 'machine',
            path: '/vending'
        });
    })
    .catch(err =>{
        console.log(err);
    });
}

exports.postCart = (req, res, next) => {
    const medicineId = req.body.medicineId;
    Database.Medicine.findById(medicineId)
      .then(medicine => {
        req.machine.addToCart(medicine);
      })
      .then(result => {
        res.redirect('/vending');
      });
};

exports.postRemoveFromCart = (req, res, next) => {
    const medicineId = req.body.medicineIdFromCart;
    req.machine
        .removeFromCart(medicineId)
        .then(result => {
            res.redirect('/vending');
        })
        .catch(err => 
            console.log(err)
        );
}

exports.postOrder = (req, res, next) => {
  req.machine
    .populate('cart.medicines.medicineId')
    .execPopulate()
    .then(machine => {
      const medicines = machine.cart.medicines.map(medi =>{
        return {quantity: medi.quantity, medicine: { ...medi.medicineId._doc }}
      });
      const order = new Order({
        machine:{ machineId: req.machine },
        medicines: medicines
      });
      Machine.addMedicines(medicines);
      req.machine.changeMedicineStock(medicines);
      return order.save();
    })
    .then(result => {
      return req.machine.clearCart();
    })
    .then(() => {
      Machine.dischargeMedicines();
      Machine.resetMedicines();
      res.redirect('/vending');
    })
    .catch(err => console.log(err));
};

// exports.dischargeMedicine = (res, res, next) =>{
//     Machine
// }
// 