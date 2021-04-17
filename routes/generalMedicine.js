const path = require('path');

const express = require('express');

const generalMed = require('../controllers/generalMedicine');

const router = express.Router();

router.get('/pharmacist', generalMed.getIndexPage);

router.get('/pharmacist-get-medicines/:medicineIds', generalMed.postMedicineInCart);

router.get('/clear-cart', generalMed.postOrder);

router.put('/order-medicine', generalMed.getOrderPopup);

module.exports = router;