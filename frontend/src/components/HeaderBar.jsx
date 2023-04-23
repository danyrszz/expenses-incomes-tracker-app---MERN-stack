import { useEffect, useState } from 'react'
import Menu from './Menu';
import './styles/HeaderBar.css'
import { useLocation } from 'react-router-dom';
import useVerifyLogin from '../utils/useVerifyLogin';
import useAuth from '../utils/useAuth';

function changeTitle(route){
  const routes = [
    {route:'/$', title:'Dashboard'},
    {route:'/asset$', title:'Información del auto'},
    {route:'/addbill$', title:'Añadir nueva cuenta'},
    {route:'/login$', title:'Iniciar Sesión'},
    {route:'/addspend$', title:'Añadir nuevo gasto'},
    {route:'/addspend/[a-z0-9]*$', title:'Editando gasto'},
    {route:'/bills$', title:'Información de las cuentas'},
    {route:'/spends$', title:'Información de los gastos'},
  ]
  return routes.find(el=>{
    const reg = new RegExp (el.route)
    return reg.test(route)
  })
}

export default function HeaderBar () {
  const {logout} = useAuth()
  const [isLoggedIn, setIsLoggedIn] = useState (false)
  const token = localStorage.getItem("token")
  const {checkLogin} = useVerifyLogin(token);

  const [title, setTitle] = useState('Dashboard');
  const location = useLocation()

  useEffect(()=>{
    setTitle(changeTitle(location.pathname).title)
  },[location])

  useEffect(()=>{
    checkLogin(token).then(resp=>{
      resp ? setIsLoggedIn(true) : setIsLoggedIn(false)
    })
  },[checkLogin])

  return(
    <div className='header'>
      <Menu
        menu = {[
          {title:'Home', icon:'home', link:'/', submenu:null},
          {title:'Activo', icon:'info', link:'/asset', submenu:null},
          {title:'Agregar Cuenta', icon:'add', link:'/addbill', submenu:null},
          {title:'Agregar Gasto', icon:'attach_money', link:'/addspend', submenu:null},
          {title:'Historial', icon:'history', link:'/', submenu:[
            {title:'Cuentas', icon:'add', link:'/bills'},
            {title:'Gastos', icon:'remove', link:'/spends'},
          ]},
        ]}
      />
      <div className="header-ex">
        <p>{title}</p>
        {
          isLoggedIn && <a onClick={logout} className='logout-click' > Cerrar Sesión </a>
        }
      </div>
    </div>
  )
}