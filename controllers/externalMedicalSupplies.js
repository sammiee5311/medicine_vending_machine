const Database = require('../models/database');
const Machine = require('../models/machine');
const Order = require('../models/order');

const resetTag = (req) => {
  req.machine.sortByMedicine = "all";
}

let errorMessage = null;

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
        const medicines = machine.medicines;
        cartMedicines.forEach(medicine => {
            price += medicine.quantity * medicine.medicineId.price;
        });
        return res.render('machine/vending', {
            medicines: medicines,
            cartMedicines: cartMedicines,
            category: req.machine.sortByMedicine,
            price: price,
            pageTitle: 'machine',
            path: '/vending',
            errorMessage: errorMessage
        });
    })
    .then(() => {
      errorMessage = null;
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
        const idx = req.machine.medicines.findIndex(medi => {
          return medi.medicineId.toString() === medicine._id.toString();
        });
        if (req.machine.medicines[idx].quantity < 1){
          errorMessage = "물품이 없습니다.";
          return res.redirect('/vending');
        }
        req.machine.addToCart(medicine);
        return res.redirect('/vending');
      })
      .catch(err => {
        console.log(err);
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