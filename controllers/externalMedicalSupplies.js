const Database = require('../models/database');
const Machine = require('../models/machine');


exports.indexPage = (req, res, next) =>{
    res.render('machine/index', {
        pageTitle: 'machine',
        path: '/index'
    })
}

exports.getMedicineList = (req, res, next) =>{
    Database.Machine.findOne({_id: req.machine.id})
    .then(machinceInfo =>{
        res.render('machine/vending', {
            medicines: machinceInfo.medicines,
            pageTitle: 'machine',
            path: '/vending'
        });
    })
    .catch(err =>{
        console.log(err);
    });
}

// exports.dischargeMedicine = (res, res, next) =>{
//     Machine
// }
// 