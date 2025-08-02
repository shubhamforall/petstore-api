import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
import { errorHandler } from './utils/errorHandler';
import { UserRoutes } from './routes/UserRoutes';
import { AuthRoutes } from './routes/AuthRoutes';
import { PetRoutes } from './routes/PetRoutes';
import 'reflect-metadata';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Mount routes
new UserRoutes(app);
new PetRoutes(app);
new AuthRoutes(app);

// Health check
app.get('/health', (_req, res) => {
    res.send('PetStore API is running!');
});

// Global error handler (always last)
app.use(errorHandler);

export default app;
