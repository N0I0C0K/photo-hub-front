import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { ThemeProvider } from '@/components/provider/theme.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ManageApp from './pages/manage/index.tsx'
import { FloderManageApp } from './pages/manage/folder.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'manage',
        element: <ManageApp />,
        children: [
          {
            path: 'folder',
            element: <FloderManageApp />,
          },
        ],
      },
      {
        path: 'front',
        element: <>Home</>,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='theme-key'>
      <RouterProvider router={router} fallbackElement={<>Error</>} />
    </ThemeProvider>
  </React.StrictMode>
)
