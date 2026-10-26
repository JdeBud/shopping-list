'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#243c2c',
    },
  },
  typography: {
    // Variable is set on <html> by next/font in layout.tsx
    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
  },
});

export default theme;
