import { Schema, model } from 'mongoose';
import type { Types } from 'mongoose';

const shoppingItemMongoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    bought: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  },
);

const ShoppingItem = model('ShoppingItem', shoppingItemMongoSchema);

export const toItemDto = ({ _id, name, bought }: { _id: Types.ObjectId; name: string; bought: boolean }) => ({
  id: _id.toString(),
  name,
  bought,
});

export default ShoppingItem;
