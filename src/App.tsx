import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className='min-w-[100vw] min-h-[100vh]'>
      <Outlet />
    </div>
  )
}

export default App
