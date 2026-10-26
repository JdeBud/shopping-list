import express from 'express';
import cors from 'cors';
import itemRoutes from '../routes/items.ts';
import { errorHandler } from '../middleware/errorHandler.ts';
import { NotFoundError } from '../errors/HttpError.ts';

export const createApp = () => {
  const app = express();

  app.use(cors({ origin: process.env.CORS_ORIGIN }));
  app.use(express.json());
  app.use('/items', itemRoutes);
  app.use(() => {
    throw new NotFoundError('Route not found');
  });
  app.use(errorHandler);

  return app;
};
