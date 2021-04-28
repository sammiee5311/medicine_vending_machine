const Database = require('../models/database');
const MachineModule = require('../models/machine');
const Order = require('../models/order');

const io = require('../socket');

const sleep = ms => {
    const wakeUpTime = Date.now() + ms
    while (Date.now() < wakeUpTime) {}
};

export const getIndexPage = (req, res, next) =>{
    const curMachine = req.machine;
    res.render('machine/pharmacist', {
        pageTitle: 'pharmacist',
        isCallButtonClicked: false,
        path: '/pharmacist'
    })
    curMachine.cart.medicines = [];
    curMachine.save();
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
                    await req.machine.addToCart(medicine);
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

export const getPharmacistId = async (req, res, next) => {
    const pharmacistDBNumber = req.params.pharmacistDBNumber;

    try {
        const pharmacists = await Database.Pharmacists.find({isLoggedIn: true });
        const idx = Math.floor(Math.random() * pharmacists.length);
        res.status(200).json(pharmacists[idx]);
    } catch (err){
        console.log(err);
    }
}

export const getSaveVideo = async (req, res, next) => {
    try {
        const curMachine = req.machine;
        const videoUrl = 'url'; // needs to be a file Url from server. 
        const today = new Date();
        const hour = today.getHours();
        const date = today.getFullYear();

        const videoInfo = await Database.Video.insertMany({
            time: today.toLocaleString(),
            videoUrl: videoUrl,
            machineId: curMachine._id
        });

        await curMachine.addVideoInfo(videoInfo[0]._id);

        res.status(200).json('Saved A Video File Successfully.');

    } catch (err) {
        console.log(err);
    }
}