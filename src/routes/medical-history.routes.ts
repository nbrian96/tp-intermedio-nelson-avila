
import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';
import { createMedicalHistoryValidator, updateMedicalHistoryValidator } from '../validator/medical-history.validator';
import {
    getMedicalHistories,
    getMedicalHistoryById,
    createMedicalHistory,
    updateMedicalHistory,
    deleteMedicalHistory
} from '../controllers/medical-history.controller';

const router = Router();

router.use(protect);

router.get('/', getMedicalHistories);
router.post('/', createMedicalHistoryValidator, createMedicalHistory);
router.get('/:id', getMedicalHistoryById);
router.put('/:id', updateMedicalHistoryValidator, updateMedicalHistory);
router.delete('/:id', deleteMedicalHistory);

export default router;
