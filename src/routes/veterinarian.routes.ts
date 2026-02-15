import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';
import {
    getSpecialists,
    createVeterinarian,
    getVeterinarianById,
    updateVeterinarian,
    deleteVeterinarian
} from '../controllers/veterinarian.controller';
import { createVeterinarianValidator, updateVeterinarianValidator } from '../validator/veterinarian.validator';

const router = Router();

router.get('/', getSpecialists);

router.post('/', protect, createVeterinarianValidator, createVeterinarian);
router.get('/:id', protect, getVeterinarianById);
router.put('/:id', protect, updateVeterinarianValidator, updateVeterinarian);
router.delete('/:id', protect, deleteVeterinarian);

export default router;
