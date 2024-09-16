import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { ThemeProvider } from '@/components/provider/theme.tsx'

import { router } from './routes'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='theme-key'>
      <RouterProvider router={router} fallbackElement={<>Error</>} />
    </ThemeProvider>
  </React.StrictMode>
)
