const path = require('path');

const express = require('express');

const admin = require('../controllers/admin');

const router = express.Router();

router.get('/add-medicine', admin.getAddMedicine);

router.post('/add-medicine', admin.postAddMedicine);

module.exports = router;
