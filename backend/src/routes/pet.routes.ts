import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';
import { createPetValidator, updatePetValidator } from '../validator/pet.validator';
import {
    getPets,
    getPetById,
    createPet,
    updatePet,
    deletePet
} from '../controllers/pet.controller';

const router = Router();

router.use(protect);

router.get('/', getPets);
router.post('/', createPetValidator, createPet);
router.get('/:id', getPetById);
router.put('/:id', updatePetValidator, updatePet);
router.delete('/:id', deletePet);

export default router;
