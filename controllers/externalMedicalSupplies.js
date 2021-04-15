const Database = require('../models/database');
const Machine = require('../models/machine');
const Order = require('../models/order');

let medicineCategory = "all";

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
        const medicines = machine.medicines;
        return res.render('machine/vending', {
            medicines: medicines,
            category: medicineCategory,
            pageTitle: 'machine',
            path: '/vending',
        });
    })
    .then(() => {
      req.machine.cart.medicines = [];
      return req.machine.save();
    })
    .then(() => {
      errorMessage = null;
    })
    .catch(err =>{
        console.log(err);
    });  
}

exports.postGetMedicinesSortByTag = (req, res, next) =>{
  medicineCategory = req.body.medicineTag;
  res.redirect('/vending');
}

exports.patchMedicineInCart = (req, res, next) => {
  const medicineId = req.params.medicineId;
  let errorMessage = null;
  let addedMedicine;

  Database.Medicine.findById(medicineId)
    .then(medicine => {
      const idx = req.machine.medicines.findIndex(medi => {
        return medi.medicineId.toString() === medicine._id.toString();
      });
      if (req.machine.medicines[idx].quantity < 1){
        flag = false;
        errorMessage = "물품이 없습니다.";
      }
      else{
        addedMedicine = medicine;
        return req.machine.addToCart(medicine); 
      }
    })
    .then(result => {
      if(!result && !errorMessage){
        errorMessage = '물품이 장바구니에 있습니다.';
        res.status(200).json([null, errorMessage]);
      } else
        res.status(200).json([addedMedicine, errorMessage]);
    })
    .catch(err => {
      res.status(500).json({message: 'Fail.'});
    });
};

exports.deleteMedicineFromCart = (req, res, next) => {
  const medicineId = req.params.medicineId;
  let price = 0;
  Database.Medicine.findById(medicineId)
  .then(medicine => {
    return price = medicine.price;
  })
  .then(result => {
    req.machine
    .removeFromCart(medicineId)
    .then(result => {
      res.status(200).json({price: price});
    })
    .catch(err => 
        console.log(err)
    );
  })
  .catch(err => 
    console.log(err)
  );
}

exports.postOrder = (req, res, next) => {
  medicineCategory = "all";
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
      // req.machine.changeMedicineStock(medicines);
      return order.save();
    })
    .then(result => {
      return req.machine.clearCart();
    })
    .then(() => {
      Machine.dischargeMedicines();
      Machine.resetMedicines();
      res.redirect('/');
    })
    .catch(err => console.log(err));
};

exports.getOrderPopup = (req, res, next) => {
  req.machine
  .populate('cart.medicines.medicineId')
  .execPopulate()
  .then(machine => {
      let totalPrice = 0;
      const orderMedicines = machine.cart.medicines.map(medi =>{
        totalPrice += medi.medicineId.price;
        return {quantity: medi.quantity, medicine: { ...medi.medicineId._doc }}
      });
      res.status(200).json(orderMedicines);
  })
}