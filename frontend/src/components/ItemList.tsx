import { Paper, Typography, List, Box, CircularProgress, Alert } from '@mui/material';
import ItemRow from './ItemRow';
import type { ShoppingItemDto } from '@/types/shoppingItem';

type ItemListProps = {
  items: ShoppingItemDto[];
  loading: boolean;
  error: string;
  onToggle: (item: ShoppingItemDto) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onClearError: () => void;
};

export default function ItemList({ items, loading, error, onToggle, onDelete, onClearError }: ItemListProps)
{
  return (
    <Paper sx={{ p: 2, minWidth: 0 }}>
      <Typography variant='h6' gutterBottom>
        Artikel
      </Typography>

      {error && (
        <Alert severity='error' onClose={onClearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress size={28} />
        </Box>
      ) : items.length === 0 ? (
        !error && (
          <Typography color='text.secondary'>
            Deine Einkaufsliste ist noch leer.
          </Typography>
        )
      ) : (
        <List disablePadding>
          {items.map((item, index) => (
            <ItemRow
              key={item.id}
              item={item}
              divider={index < items.length - 1}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </List>
      )}
    </Paper>
  );
}
