import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className='max-w-[100vw] max-h-[100vh]'>
      <Outlet />
    </div>
  )
}

export default App
