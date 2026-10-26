import { useState } from 'react';
import type { FormEvent } from 'react';
import { Paper, Typography, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type CreateItemProps = {
  onCreate: (name: string) => Promise<boolean>;
};

export default function CreateItem({ onCreate }: CreateItemProps) {
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName || saving) {
      return;
    }

    setSaving(true);

    try {
      // On failure ItemList shows the error message; the input is kept for another attempt
      if (await onCreate(trimmedName)) {
        setName('');
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <Paper
      component='form'
      onSubmit={handleSubmit}
      sx={{ p: 2 }}
    >
      <Typography variant='h6' gutterBottom>
        Artikel hinzufügen
      </Typography>
      <TextField
        label='Artikelname'
        value={name}
        onChange={(event) => setName(event.target.value)}
        fullWidth
        size='small'
        slotProps={{
          htmlInput: { maxLength: 100 },
        }}
      />
      <Button
        type='submit'
        variant='contained'
        startIcon={<AddIcon />}
        fullWidth
        disabled={!name.trim() || saving}
        sx={{ mt: 2 }}
      >
        {saving ? 'Speichert …' : 'Hinzufügen'}
      </Button>
    </Paper>
  );
}
