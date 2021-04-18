import express from 'express';

import { indexPage, getMedicineList, postGetMedicinesSortByTag, patchMedicineInCart, deleteMedicineFromCart, postOrder, getOrderPopup } from '../controllers/externalMedicalSupplies';

const router = express.Router(); 

router.get('/', indexPage);

router.get('/vending', getMedicineList);

router.patch('/vending-add-medicine-in-cart/:medicineId', patchMedicineInCart);

router.delete('/vending-delete-medicine-from-cart/:medicineId', deleteMedicineFromCart);

router.get('/vending-clear-cart', postOrder);

router.put('/vending-order-medicine', getOrderPopup);

router.post('/vending-sort-by-tag', postGetMedicinesSortByTag);


export default router;