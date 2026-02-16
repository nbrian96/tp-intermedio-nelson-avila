import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';
import { createOwnerValidator, updateOwnerValidator } from '../validator/owner.validator';
import {
    getOwners,
    getOwnerById,
    getOwnerByDni,
    createOwner,
    updateOwner,
    deleteOwner
} from '../controllers/owner.controller';

const router = Router();

router.use(protect);

router.get('/', getOwners);
router.post('/', createOwnerValidator, createOwner);
router.get('/dni/:dni', getOwnerByDni);
router.get('/:id', getOwnerById);
router.put('/:id', updateOwnerValidator, updateOwner);
router.delete('/:id', deleteOwner);

export default router;
