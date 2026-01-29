import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import publicRoutes from './routes/public.routes';
import protectedRoutes from './routes/protected.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

// Documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Montar rutas
app.use('/api', publicRoutes);
app.use('/api', protectedRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}/api/docs`);
});