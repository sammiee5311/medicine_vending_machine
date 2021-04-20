const Database = require('../models/database');
const Machine = require('../models/machine');

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
        const pharmacist = new Database.Pharmacists({ 
            name: '세종대왕',
            isLoggedIn: true 
        });
      
        pharmacist.save()
        .then(result => {
          res.redirect('/');
        });
        // const medicineInfo = await Database.Medicine.findOne({name:name});
        // const machine = await Database.Machine.findById(medicineId);
        // const result = await req.machine.addMedicine(medicineInfo, name, quantity);
        // res.redirect('/');

    } catch (err) {
        console.log(err);
    }


    // Database.Medicine.findOne({name: name})
    // .then(medicineInfo => {
    //     if(medicineInfo){
    //         Database.Machine.findById(medicineId)
    //         .then(machine => {
    //             req.machine.addMedicine(medicineInfo, name, quantity)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //     }
    // })
    // .then(result => {
    //     res.redirect('/');
    // })
    // .catch(err => {
    //     console.log(err);
    // });
};

export const getAddMedicineInMachine = (req, res, next) => {
    res.render('admin/add-medicine', {
      pageTitle: 'Add Product',
      path: '/admin/add-medicine-in-machine'
    });
};

export const postAddMedicineInMachine = (req, res, next) => {
    const name = 'A';
    const imageUrl = 'images/gagrin.jpg';
    const price = 6.99;
    const description = 'digestion';
    const dosageMethod = "Take one pill a day.";
    const category = 'all,toothache';

    const pharmacist = new Database.Pharmacists({ 
      name: '홍길동',
      isLoggedIn: false 
   });

   pharmacist.save()
   .then(result => {
     res.redirect('/');
   });

    // const medicine = new Database.Medicine({ 
    //     name: name, 
    //     price: price, 
    //     description: description, 
    //     dosageMethod: dosageMethod,
    //     imageUrl: imageUrl,
    //     category: category
    //  });

    //  medicine
    //   .save()
    //   .then(result => {
    //     console.log('Created Medicine');
    //     res.redirect('/');
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
};