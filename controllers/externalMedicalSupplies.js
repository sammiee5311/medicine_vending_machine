const Database = require('../models/database');
const Machine = require('../models/machine');
const Order = require('../models/order');

const resetTag = (req) => {
  req.machine.sortByMedicine = "all";
}

exports.indexPage = (req, res, next) =>{
  res.render('machine/index', {
      pageTitle: 'machine',
      path: '/index'
  })
}

exports.getMedicineList = (req, res, next) =>{
  console.log(req.machine.sortByMedicine);
    req.machine
    .populate('medicines.medicineId cart.medicines.medicineId')
    .execPopulate()
    .then(machine => {
        let price = 0;
        cartMedicines = machine.cart.medicines;
        const medicines = []
        machine.medicines.forEach(medi => {
          if(medi.medicineId.category.includes(req.machine.sortByMedicine)){
            medicines.push(medi);
          }
        })
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

exports.postGetMedicinesSortByTag = (req, res, next) =>{
  const medicineTag = req.body.medicineTag;
  req.machine.sortByMedicine = medicineTag;
  req.machine.save(err => {
    res.redirect('/vending');
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
  resetTag(req);
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