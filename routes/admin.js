import express from 'express';

import { getAddMedicine, postAddMedicine } from '../controllers/admin';

const router = express.Router();

router.get('/add-medicine', getAddMedicine);

router.post('/add-medicine', postAddMedicine);

export default router;
