import { useEffect, useState } from 'react';
import { getItems, createItem, updateItem, deleteItem } from '@/api/shoppingList';
import type { ShoppingItemDto } from '@/types/shoppingItem';

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getItems()
      .then(setItems)
      .catch(() => setError('Artikel konnten nicht geladen werden.'))
      .finally(() => setLoading(false));
  }, []);

  async function create(name: string): Promise<boolean> {
    setError('');

    try {
      const item = await createItem({ name });

      setItems((current) => [item, ...current]);

      return true;
    } catch {
      setError('Artikel konnte nicht gespeichert werden.');

      return false;
    }
  }

  async function toggle(item: ShoppingItemDto) {
    setError('');

    try {
      const updated = await updateItem(item.id, { bought: !item.bought });

      setItems((current) =>
        current.map((entry) => (entry.id === updated.id ? updated : entry))
      );
    } catch {
      setError('Kaufstatus konnte nicht geändert werden.');
    }
  }

  async function remove(id: string) {
    setError('');

    try {
      await deleteItem(id);

      setItems((current) => current.filter((item) => item.id !== id));
    } catch {
      setError('Artikel konnte nicht gelöscht werden.');
    }
  }

  return {
    items,
    loading,
    error,
    create,
    toggle,
    remove,
    clearError: () => setError(''),
  };
}
