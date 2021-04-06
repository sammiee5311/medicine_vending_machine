const Database = require('../models/database');
const Machine = require('../models/machine');

exports.getAddMedicine = (req, res, next) => {
    res.render('admin/add-medicine', {
      pageTitle: 'Add Product',
      path: '/admin/add-medicine',
      editing: false
    });
};

exports.postAddMedicine = (req, res, next) => {
    const medicineId = req.machine.id;
    const name = req.body.name;
    const quantity = req.body.quantity;
    Database.Medicine.findOne({name: name})
    .then(medicineInfo => {
        if(medicineInfo){
            Database.Machine.findById(medicineId)
            .then(machine => {
                req.machine.addMedicine(medicineInfo, machine, name, quantity)
            })
            .catch(err => {
                console.log(err);
            })
        }
    })
    .then(result => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
}

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