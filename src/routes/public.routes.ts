import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';

const router = Router();

// Rutas de Autenticación
router.use('/auth', authRoutes);

// Otros endpoints públicos

router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Servidor funcionando 🚀' });
});


router.get('/saludo', (req: Request, res: Response) => {
    res.json({ saludo: 'Hola desde Node.js + Express + TypeScript' });
});

export default router;
