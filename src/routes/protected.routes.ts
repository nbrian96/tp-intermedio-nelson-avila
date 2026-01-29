import { Router, Request, Response } from 'express';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Aplicar middleware de autenticación a todas las rutas de este router
router.use(protect);

// Endpoint de prueba protegido
/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get user profile
 *     description: This is a protected route. You need a valid JWT token to access it.
 *     tags: [Protected]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Access granted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Acceso a ruta protegida exitoso
 *                 user:
 *                   type: object
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', (req: Request, res: Response) => {
    // req.user viene del middleware protect
    res.json({
        message: 'Acceso a ruta protegida exitoso',
        user: req.user
    });
});

export default router;
