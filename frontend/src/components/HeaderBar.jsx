import { useState } from 'react'
import Menu from './Menu';
import './styles/HeaderBar.css'

export default function HeaderBar () {
  const [title, setTitle] = useState('Home');
  const printTitle = (title)=> setTitle(title)
  return(
    <div className='header'>
      <Menu
        menu = {[
          {title:'Home', icon:'home', link:'/', submenu:null},
          {title:'Activo', icon:'info', link:'/asset', submenu:null},
          {title:'Agregar Cuenta', icon:'add', link:'/addbill', submenu:null},
          {title:'Agregar Gasto', icon:'attach_money', link:'/addspend', submenu:null},
          {title:'Historial', icon:'history', link:'/', submenu:[
            {title:'Cuentas', icon:'add', link:'/Bills'},
            {title:'Gastos', icon:'remove', link:'/Spends'},
          ]},
        ]}
        currentTitle = {(title)=>printTitle(title)}
      />
      <p>{title}</p>
    </div>
  )
}