const path = require('path');

const express = require('express');

const admin = require('../controllers/admin');

const router = express.Router();

router.get('/add-medicine', admin.getAddMedicine);

router.post('/add-medicine', admin.postAddMedicine);

router.get('/add-medicine-in-machine', admin.getAddMedicineInMachine);

router.post('/add-medicine-in-machine', admin.postAddMedicineInMachine);

module.exports = router;
