import { Router } from 'express';
import { listItems } from '../controllers/items/listItems.ts';
import { createItem } from '../controllers/items/createItem.ts';
import { updateItem } from '../controllers/items/updateItem.ts';
import { deleteItem } from '../controllers/items/deleteItem.ts';

const router = Router();

router.get('/', listItems);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
