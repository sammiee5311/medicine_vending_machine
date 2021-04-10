const path = require('path');

const express = require('express');

const generalMed = require('../controllers/generalMedicine');

const router = express.Router();

router.get('/pharmacist', generalMed.getIndexPage);

router.post('/pharmacist-call', generalMed.postCallPharmacist);

router.post('/pharmacist-end-call', generalMed.postEndCallPharmacist);

router.post('/pharmacist-get-medicines', generalMed.postConnectWebSocketIo);

module.exports = router;