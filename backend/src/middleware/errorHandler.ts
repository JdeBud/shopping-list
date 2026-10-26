import type { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import * as z from 'zod';
import { HttpError } from '../errors/HttpError.ts';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Custom HTTP errors (NotFoundError, …)
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });

    return;
  }

  // Validation errors from schema.parse() in the controllers -> 400 with a readable message
  if (err instanceof z.ZodError) {
    res.status(400).json({ error: z.prettifyError(err) });

    return;
  }

  // Invalid MongoDB ID (e.g., /items/abc)
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ error: `Invalid MongoDB id '${err.value}'` });

    return;
  }

  // Client errors from Express middleware, e.g. invalid JSON from express.json()
  // (http-errors sets `status` and `expose: true` for all 4xx errors)
  if (err.expose && typeof err.status === 'number') {
    res.status(err.status).json({ error: err.message });

    return;
  }

  console.error(err);

  res.status(500).json({ error: 'Internal Server Error' });
};
