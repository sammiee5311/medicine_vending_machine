const Database = require('../models/database');
const MachineModule = require('../models/machine');
const Order = require('../models/order');

let medicineCategory = "all";

export const indexPage = (req, res, next) =>{
  res.render('machine/index', {
      pageTitle: 'machine',
      path: '/index'
  });
}

export const getMedicineList = async (req, res, next) =>{
  const curMachine = req.machine;
  const categories = {
    categoryInKorean: ['모두','두통','치통','복통'], 
    categoryInEnglish: ['all', 'headache', 'toothache','stomachache']};

  try{
    const machinByPopulatedMedicines = await curMachine
                    .populate('medicines.medicineId cart.medicines.medicineId')
                    .execPopulate();
    const medicines = machinByPopulatedMedicines.medicines;

    curMachine.cart.medicines = [];
    curMachine.save();

    res.render('machine/vending', {
      medicines: medicines,
      categories: categories,
      pageTitle: 'machine',
      path: '/vending'
    });
    
  } catch(err){
    console.log(err);
  }
}

export const patchGetMedicineSortByTag = async (req, res, next) =>{
  const curMachine = req.machine;
  try{
    const machinByPopulatedMedicines = await curMachine
                    .populate('medicines.medicineId cart.medicines.medicineId')
                    .execPopulate();
    const medicines = machinByPopulatedMedicines.medicines;
    res.status(200).json(medicines);
  } catch (err){
    console.log(err);
  }
}

export const patchMedicineInCart = async (req, res, next) => {
  const medicineId = req.params.medicineId;
  const medicinesInMachine = req.machine.medicines;
  let errorMessage = null, result = null;
  let addedMedicine;
  
  try{
    const medicine = await Database.Medicine.findById(medicineId);
    const idx = medicinesInMachine.findIndex(medi => {
      return medi.medicineId.toString() === medicine._id.toString();
    });

    if (medicinesInMachine[idx].quantity < 1) errorMessage = "물품이 없습니다.";
    else{
      addedMedicine = medicine;
      result = await req.machine.addToCart(medicine); 
    }

    if(!result && !errorMessage){
      errorMessage = '물품이 장바구니에 있습니다.';
      res.status(200).json([null, errorMessage]);
    } else res.status(200).json([addedMedicine, errorMessage]);

    errorMessage = null;

  } catch (err){
    res.status(500).json({message: 'Fail'});
  }
};

export const deleteMedicineFromCart = async (req, res, next) => {
  const medicineId = req.params.medicineId;
  try{
    const medicine = await Database.Medicine.findById(medicineId);
    const price = medicine.price;

    await req.machine.removeFromCart(medicineId);

    res.status(200).json({price: price});
  } catch (err){
    console.log(err);
  }
}

export const postOrder = async (req, res, next) => {
  const curMachine = req.machine;

  try{
    medicineCategory = "all";
    const machinByPopulatedMedicines =  await curMachine.populate('cart.medicines.medicineId').execPopulate();
    const medicines = machinByPopulatedMedicines.cart.medicines.map(medi => {
      return {quantity: medi.quantity, medicine: { ...medi.medicineId._doc }}
    });
    const order = new Order({
      machine:{ machineId: curMachine },
      medicines: medicines
    });
    
    MachineModule.addMedicines(medicines);
    
    await order.save();

    curMachine.clearCart();
    MachineModule.dischargeMedicines();
    MachineModule.resetMedicines();
    res.redirect('/');

  } catch (err){
    console.log(err);
  }
};

export const getOrderPopup = async (req, res, next) => {
  const curMachine = req.machine;
  
  try{
    const machinByPopulatedMedicines = await curMachine.populate('cart.medicines.medicineId').execPopulate();
    const orderMedicines = machinByPopulatedMedicines.cart.medicines.map(medi => {
      return {quantity: medi.quantity, medicine: { ...medi.medicineId._doc }};
    })
    res.status(200).json(orderMedicines);
  } catch (err) {
    console.log(err);
  }
};