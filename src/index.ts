import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';

import veterinarianRoutes from './routes/veterinarian.routes';
import authRoutes from './routes/auth.routes';
import appointmentRoutes from './routes/appointment.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost`;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/veterinarians', veterinarianRoutes);
app.use('/api/appointments', appointmentRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${BASE_URL}:${PORT}`);
});