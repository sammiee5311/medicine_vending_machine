import express from 'express';

import { getAddMedicine, postAddMedicine, getAddMedicineInMachine, postAddMedicineInMachine } from '../controllers/admin';

const router = express.Router();

router.get('/add-medicine', getAddMedicine);

router.post('/add-medicine', postAddMedicine);

router.get('/add-medicine-in-machine', getAddMedicineInMachine);

router.post('/add-medicine-in-machine', postAddMedicineInMachine);

export default router;
