const Database = require('../models/database');

export const getAddMedicine = (req, res, next) => {
    res.render('admin/add-medicine', {
      pageTitle: 'Add Product',
      path: '/admin/add-medicine',
      editing: false
    });
};

export const postAddMedicine = async (req, res, next) => {
    const medicineId = req.machine.id;
    const name = req.body.name;
    const quantity = req.body.quantity;
    try{
        const medicineInfo = await Database.Medicine.findOne({name:name});
        const machine = await Database.Machine.findById(medicineId);
        const result = await req.machine.addMedicine(medicineInfo, name, quantity);
        res.redirect('/');

    } catch (err) {
        console.log(err);
    }
};