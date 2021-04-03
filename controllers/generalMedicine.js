const Database = require('../models/database');
const Machine = require('../models/machine');


exports.indexPage = (req, res, next) =>{
    res.render('machine/pharmacist', {
        pageTitle: 'pharmacist',
        path: '/pharmacist'
    })
}
