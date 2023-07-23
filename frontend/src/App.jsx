
import './App.css'
import HeaderBar from './components/HeaderBar'
import { Outlet } from 'react-router-dom'

import Login from './pages/Login'
import useAuth from './utils/useAuth'

function App() {

  const {login, logout, loggingIn, loggedIn} = useAuth()

  return (
    <div className="App">
      <HeaderBar logout={logout} isLogged={loggedIn}/>
      {loggedIn ? <Outlet/> : <Login login={login} loading={loggingIn}/>}
    </div>
  )
}

export default App
