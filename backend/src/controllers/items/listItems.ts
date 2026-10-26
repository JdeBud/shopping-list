import type { Request, Response } from 'express';
import ShoppingItem, { toItemDto } from '../../database/models/ShoppingItem.ts';

export async function listItems(_req: Request, res: Response) {
  const items = await ShoppingItem.find().sort({ createdAt: -1 }).lean();

  res.json(items.map(toItemDto));
}
