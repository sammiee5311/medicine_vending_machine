const path = require('path');

const express = require('express');

const generalMed = require('../controllers/generalMedicine');

const router = express.Router();

router.get('/pharmacist', generalMed.getIndexPage);

router.post('/pharmacist', generalMed.postConnectWebSocketIo);

module.exports = router;