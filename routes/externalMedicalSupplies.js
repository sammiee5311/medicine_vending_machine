const path = require('path');

const express = require('express');

const externalMed = require('../controllers/externalMedicalSupplies');

const router = express.Router(); 

router.get('/', externalMed.indexPage);

router.get('/vending', externalMed.getMedicineList);

router.post('/vending-add-to-cart', externalMed.postCart);

router.post('/vending-remove-from-cart', externalMed.postRemoveFromCart)

router.post('/vending-clear-cart', externalMed.postOrder);

router.post('/vending-sort-by-tag', externalMed.postGetMedicinesSortByTag);

module.exports = router;