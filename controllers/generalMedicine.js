const Database = require('../models/database');
const MachineModule = require('../models/machine');
const Order = require('../models/order');

const io = require('../socket');

const sleep = ms => {
    const wakeUpTime = Date.now() + ms
    while (Date.now() < wakeUpTime) {}
};

export const getIndexPage = (req, res, next) =>{
    res.render('machine/pharmacist', {
        pageTitle: 'pharmacist',
        isCallButtonClicked: false,
        path: '/pharmacist'
    })
};

export const postMedicineInCart = async (req, res, next) => {
    const medicineIds = req.params.medicineIds.split(',');
    const medicinesInMachine = req.machine.medicines;
    let medicineList = [];

    try{
        const medicines = await Database.Medicine.find({ '_id': { $in: medicineIds } });
        medicines.forEach(async medicine => {
            try{
                const idx = medicinesInMachine.findIndex(medi => {
                    return medi.medicineId.toString() === medicine._id.toString();
                });            
                if (medicinesInMachine[idx].quantity) {
                    medicineList.push(medicine);
                    const result = await req.machine.addToCart(medicine);
                    await sleep(1000);
                }
            } catch (err) {
                console.log(err);
            }
        });
        res.status(200).json(medicineList);

    } catch (err){
        res.status(500).json({message: 'Fail'});
    }
};

export const postOrder = async (req, res, next) => {
    const curMachine = req.machine;
  
    try{
      const machinByPopulatedMedicines =  await curMachine.populate('cart.medicines.medicineId').execPopulate();
      const medicines = machinByPopulatedMedicines.cart.medicines.map(medi => {
        return {quantity: medi.quantity, medicine: { ...medi.medicineId._doc }}
      });
      const order = new Order({
        machine:{ machineId: curMachine },
        medicines: medicines
      });
      
      MachineModule.addMedicines(medicines);
      
      const result = await order.save();
  
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