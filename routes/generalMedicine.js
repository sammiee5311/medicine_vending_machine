import express from 'express';

import { getIndexPage, postMedicineInCart, postOrder, getOrderPopup, getPharmacistId } from '../controllers/generalMedicine';

const router = express.Router();

router.get('/pharmacist', getIndexPage);

router.get('/pharmacist-get-medicines/:medicineIds', postMedicineInCart);

router.get('/pharmacist-clear-cart', postOrder);

router.get('/pharmacist-get-pharmacist-id/:pharmacistDBNumber', getPharmacistId);

router.put('/pharmacist-order-medicine', getOrderPopup);

export default router;