import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';

const router = Router();

// Rutas de Autenticación
router.use('/auth', authRoutes);

// Otros endpoints públicos
/**
 * @swagger
 * /api:
 *   get:
 *     summary: Verify server status
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Servidor funcionando 🚀
 */
router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Servidor funcionando 🚀' });
});

/**
 * @swagger
 * /api/saludo:
 *   get:
 *     summary: Get a greeting message
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Returns a greeting
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 saludo:
 *                   type: string
 *                   example: Hola desde Node.js + Express + TypeScript
 */
router.get('/saludo', (req: Request, res: Response) => {
    res.json({ saludo: 'Hola desde Node.js + Express + TypeScript' });
});

export default router;
