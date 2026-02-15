import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import { validateJWTConfig } from './utils/token.util';

import veterinarianRoutes from './routes/veterinarian.routes';
import authRoutes from './routes/auth.routes';
import ownerRoutes from './routes/owner.routes';
import petRoutes from './routes/pet.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

try {
  validateJWTConfig();
} catch (error) {
  console.error((error as Error).message);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost`;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/veterinarians', veterinarianRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/pets', petRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${BASE_URL}:${PORT}`);
});