import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import ManageApp from './pages/manage'
import { FloderManageApp } from './pages/manage/folder'
import { FrontApp } from './pages/front'

export const router = createBrowserRouter([
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
        element: <FrontApp />,
      },
      {
        path: '',
        element: <FrontApp />,
      },
    ],
  },
])
