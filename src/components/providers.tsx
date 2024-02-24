'use client'
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { Toaster } from 'react-hot-toast'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <NextThemesProvider {...themeProps}>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
              duration: 2000,
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }}
          />
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  )
}
