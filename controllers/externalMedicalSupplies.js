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
// exports.addMedicine = (req, res, next) => {
//     const name = 'C';
//     const imageUrl = '';
//     const price = 6.99;
//     const description = 'digestion';
//     const dosageMethod = "Take one pill a day."
//     const medicine = new Database.Medicine({ 
//         name: name, 
//         price: price, 
//         description: description, 
//         dosageMethod: dosageMethod,
//         imageUrl: imageUrl
//      });
//      medicine
//       .save()
//       .then(result => {
//         // console.log(result);
//         console.log('Created Medicine');
//         res.redirect('/');
//       })
//       .catch(err => {
//         console.log(err);
//       });
// }