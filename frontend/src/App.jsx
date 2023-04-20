import './App.css'
import HeaderBar from './components/HeaderBar'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'

function App() {

  return (
    <div className="App">
      <HeaderBar/>
      <Outlet/>
    </div>
  )
}

export default App
