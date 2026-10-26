export type ShoppingItemDto = {
  id: string;
  name: string;
  bought: boolean;
};

export type CreateShoppingItemDto = Pick<ShoppingItemDto, 'name'>

export type UpdateShoppingItemDto = Pick<ShoppingItemDto, 'bought'>
