import { request } from '@/api/request';
import type { ShoppingItemDto, CreateShoppingItemDto, UpdateShoppingItemDto } from '@/types/shoppingItem';

export function getItems(): Promise<ShoppingItemDto[]> {
  return request<ShoppingItemDto[]>('/items');
}

export function createItem(data: CreateShoppingItemDto): Promise<ShoppingItemDto> {
  return request<ShoppingItemDto>(
    '/items',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
}

export function updateItem(id: string, data: UpdateShoppingItemDto): Promise<ShoppingItemDto> {
  return request<ShoppingItemDto>(
    `/items/${encodeURIComponent(id)}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
    },
  );
}

export function deleteItem(id: string): Promise<void> {
  return request<void>(
    `/items/${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
    },
  );
}
