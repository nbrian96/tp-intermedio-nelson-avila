import { Router } from 'express';
import { EnrollmentController } from '../controllers/enrollment.controller';
import { protect } from '../middlewares/auth.middleware';
import {
    enrollmentCreateValidator,
    enrollmentUpdateValidator,
    statusQueryValidator,
    enrollmentIdValidator,
    enrollmentBulkValidator
} from '../validator/enrollment.validator';

const router = Router();
const enrollmentController = new EnrollmentController();

router.use(protect);

router.get('/', enrollmentController.getAll);
router.get('/status', statusQueryValidator, enrollmentController.getByStatus);
router.get('/eligible', enrollmentController.getEligible);
router.get('/:id', enrollmentIdValidator, enrollmentController.getById);

router.post('/', enrollmentCreateValidator, enrollmentController.create);
router.post('/bulk', enrollmentBulkValidator, enrollmentController.bulkCreate);
router.put('/:id', enrollmentUpdateValidator, enrollmentController.update);
router.delete('/:id', enrollmentIdValidator, enrollmentController.delete);

export default router;
