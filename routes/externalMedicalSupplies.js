const path = require('path');

const express = require('express');

const externalMed = require('../controllers/externalMedicalSupplies');

const router = express.Router(); 

router.get('/', externalMed.indexPage);

router.get('/vending', externalMed.getMedicineList)

module.exports = router;