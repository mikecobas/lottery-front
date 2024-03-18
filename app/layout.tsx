import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';
import { AuthProvider } from '@/contexts/AuthContext';
import { ContestProvider } from '@/contexts/ContestContext';
import { PrizesContext, PrizesProvider } from '@/contexts/PrizesContext';

export const metadata = {
  title: 'Sorteos app',
  description: 'Sorteos app DevTalles',
};

export default function RootLayout({ children }: { children: any }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AuthProvider>
            <ContestProvider>
              <PrizesProvider>
                {children}
              </PrizesProvider>
            </ContestProvider>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
