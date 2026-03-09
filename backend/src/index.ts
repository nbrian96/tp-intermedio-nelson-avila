import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import morgan from 'morgan';
import { validateJWTConfig } from './utils/token.util';
import { seedCareers } from './utils/seeder';

import authRoutes from './routes/auth.routes';
import enrollmentRoutes from './routes/enrollment.routes';
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

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/enrollments', enrollmentRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    await seedCareers();

    app.listen(PORT, () => {
      console.log(`Server listening on ${BASE_URL}:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();