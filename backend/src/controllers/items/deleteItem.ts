import type { Request, Response } from 'express';
import ShoppingItem from '../../database/models/ShoppingItem.ts';
import { NotFoundError } from '../../errors/HttpError.ts';

export async function deleteItem(req: Request, res: Response) {
  const result = await ShoppingItem.deleteOne({ _id: req.params.id });

  if (result.deletedCount === 0) {
    throw new NotFoundError(`Item with id '${req.params.id}' not found`);
  }

  res.status(204).end();
}
