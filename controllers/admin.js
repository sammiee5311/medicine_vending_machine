const Database = require('../models/database');
const Machine = require('../models/machine');

export const getAddMedicineInMachine = async (req, res, next) => {
  const curMachine = req.machine;
  try{
    const machinByPopulatedMedicines = await curMachine
      .populate('medicines.medicineId cart.medicines.medicineId')
      .execPopulate();
    const medicines = machinByPopulatedMedicines.medicines;
      res.render('admin/add-medicine', {
        pageTitle: 'Add Medicine',
        medicines: medicines,
        path: '/admin/add-medicine'
      });
  } catch (err) {
    res.status(500).json({message: 'Fail'});
  }
};

export const postAddMedicineInMachine = async (req, res, next) => {
  const curMachine = req.machine;
  const medicineId = req.body.medicineId;
  const medicineQuantity = req.body.quantity;

  try{
      const machinByPopulatedMedicines = await curMachine
        .populate('medicines.medicineId cart.medicines.medicineId')
          .execPopulate();
      const medicines = machinByPopulatedMedicines.medicines;
      await req.machine.addMedicine(medicineId, medicineQuantity);

      res.render('admin/add-medicine', {
        pageTitle: 'admin',
        medicines: medicines,
        path: '/admin/add-medicine'
      });
  } catch (err) {
    res.status(500).json({message: 'Fail'});
  }
};