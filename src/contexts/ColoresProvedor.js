import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    aux: {
      main: '#666261',
    },
  },
});

export default function ColoresProvedor({children}) {
  return (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
  );
}