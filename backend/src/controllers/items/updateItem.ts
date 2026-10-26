import type { Request, Response } from 'express';
import * as z from 'zod';
import ShoppingItem, { toItemDto } from '../../database/models/ShoppingItem.ts';
import { NotFoundError } from '../../errors/HttpError.ts';

const updateItemSchema = z.object({ bought: z.boolean() });

export async function updateItem(req: Request, res: Response) {
  const update = updateItemSchema.parse(req.body);

  const shoppingItem = await ShoppingItem.findByIdAndUpdate(req.params.id, update, { returnDocument: 'after' });

  if (!shoppingItem) {
    throw new NotFoundError(`Item with id '${req.params.id}' not found`);
  }

  res.json(toItemDto(shoppingItem));
}
