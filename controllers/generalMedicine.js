const Database = require('../models/database');
const Machine = require('../models/machine');
const Order = require('../models/order');

exports.getIndexPage = (req, res, next) =>{
    res.render('machine/pharmacist', {
        pageTitle: 'pharmacist',
        path: '/pharmacist'
    })
}

exports.postConnectWebSocketIo = (req, res, next) => {
    let medicineIds = req.body.medicineIds;
    medicineIds = medicineIds.split(',');
    Database.Medicine.find({_id: medicineIds})
    .then(medicineInfos => {
        const medicines = medicineInfos.map(info => {
            return {quantity: 1, medicine: info._doc}
        });
        const order = new Order({
            machine:{ machineId: req.machine },
            medicines: medicines
        });
        Machine.addMedicines(medicines);
        return order.save();
    })
    .then(result => {
        Machine.dischargeMedicines();
        Machine.resetMedicines();
        res.redirect('/vending');
    })
    .catch(err => {
        console.log(err);
    })
};
