const Database = require('../models/database');
const Machine = require('../models/machine');


exports.indexPage = (req, res, next) =>{
    res.render('machine/index', {
        pageTitle: 'machine',
        path: '/index'
    })
}

exports.getMedicineList = (req, res, next) =>{
    Database.medicines.findAll()
    .then(medicines =>{
        console.log(medicines);
        res.render('machine/vending', {
            medi: medicines,
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