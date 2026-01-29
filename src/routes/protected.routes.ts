import { Router, Request, Response } from 'express';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Aplicar middleware de autenticación a todas las rutas de este router
router.use(protect);

// Endpoint de prueba protegido

router.get('/profile', (req: Request, res: Response) => {
    // req.user viene del middleware protect
    res.json({
        message: 'Acceso a ruta protegida exitoso',
        user: req.user
    });
});

export default router;
