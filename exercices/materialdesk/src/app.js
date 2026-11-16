import express from 'express';
import authRoutes from './routes/auth.routes.js';
import equipmentRoutes from './routes/equipment.routes.js';
// import loansRoutes from './routes/loans.routes.js';
import { errorHandler, notFound } from './middlewares/error-handler.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/equipments', equipmentRoutes);
// app.use('/api/loans', loansRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;