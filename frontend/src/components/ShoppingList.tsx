'use client';

import { Box } from '@mui/material';
import Header from './Header';
import CreateItem from './CreateItem';
import ItemList from './ItemList';
import { useShoppingList } from '@/hooks/useShoppingList';

export default function ShoppingList() {
  const { items, loading, error, create, toggle, remove, clearError } = useShoppingList();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100' }}>
      <Header />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'minmax(0, 1fr) minmax(0, 3fr)',
          },
          gap: 2,
          p: { xs: 2, md: 3 },
          alignItems: 'start',
        }}
      >
        <CreateItem onCreate={create} />
        <ItemList
          items={items}
          loading={loading}
          error={error}
          onToggle={toggle}
          onDelete={remove}
          onClearError={clearError}
        />
      </Box>
    </Box>
  );
}
