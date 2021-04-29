import express from 'express';

import { getAddMedicineInMachine, postAddMedicineInMachine } from '../controllers/admin';

const router = express.Router();

router.get('/add-medicine', getAddMedicineInMachine);

router.post('/add-medicine', postAddMedicineInMachine);


export default router;
