import { useState } from 'react';
import { ListItem, Checkbox, IconButton, FormControlLabel } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import type { ShoppingItemDto } from '@/types/shoppingItem';

type ItemRowProps = {
  item: ShoppingItemDto;
  divider: boolean;
  onToggle: (item: ShoppingItemDto) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function ItemRow({ item, divider, onToggle, onDelete }: ItemRowProps) {
  const [busy, setBusy] = useState(false);

  async function run(action: () => Promise<void>) {
    setBusy(true);

    try {
      await action();
    } finally {
      setBusy(false);
    }
  }

  return (
    <ListItem
      disableGutters
      divider={divider}
      secondaryAction={
        <IconButton
          edge='end'
          aria-label={`${item.name} löschen`}
          onClick={() => run(() => onDelete(item.id))}
          disabled={busy}
        >
          <DeleteOutlineIcon />
        </IconButton>
      }
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={item.bought}
            onChange={() => run(() => onToggle(item))}
          />
        }
        label={item.name}
        disabled={busy}
        sx={{ flex: 1, ml: 0, mr: 0 }}
        slotProps={{
          typography: {
            sx: {
              overflowWrap: 'anywhere',
              textDecoration: item.bought
                ? 'line-through'
                : 'none',
              color: item.bought
                ? 'text.secondary'
                : 'text.primary',
            },
          },
        }}
      />
    </ListItem>
  );
}
