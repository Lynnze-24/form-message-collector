import React, { FC } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import palette from './assets/palette';
import { ToastProvider } from './hooks/useToast/useToast';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/store';

interface ProviderProps {
  children?: React.ReactNode;
}

const queryClient = new QueryClient();

const theme = createTheme({
  palette,
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 18,
  },
});

const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>{children}</ToastProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default Provider;
