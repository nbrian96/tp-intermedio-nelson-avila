import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import publicRoutes from './routes/public.routes';
import protectedRoutes from './routes/protected.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost`;

connectDB();

app.use(express.json());

// Montar rutas
app.use('/api', publicRoutes);
app.use('/api', protectedRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${BASE_URL}:${PORT}`);
});