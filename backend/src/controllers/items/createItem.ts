import type { Request, Response } from 'express';
import * as z from 'zod';
import ShoppingItem, { toItemDto } from '../../database/models/ShoppingItem.ts';

const createItemSchema = z.object({ name: z.string().trim().min(1).max(100) });

export async function createItem(req: Request, res: Response) {
  const { name } = createItemSchema.parse(req.body);

  const shoppingItem = await ShoppingItem.create({ name });

  res.status(201).json(toItemDto(shoppingItem));
}
