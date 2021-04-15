const path = require('path');

const express = require('express');

const externalMed = require('../controllers/externalMedicalSupplies');

const router = express.Router(); 

router.get('/', externalMed.indexPage);

router.get('/vending', externalMed.getMedicineList);

router.patch('/vending-add-medicine-in-cart/:medicineId', externalMed.patchMedicineInCart);

router.delete('/vending-delete-medicine-from-cart/:medicineId', externalMed.deleteMedicineFromCart);

router.get('/vending-clear-cart', externalMed.postOrder);

router.put('/vending-order-medicine', externalMed.getOrderPopup);

router.post('/vending-sort-by-tag', externalMed.postGetMedicinesSortByTag);

module.exports = router;