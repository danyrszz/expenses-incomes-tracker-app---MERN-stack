import { useState } from 'react'
import Menu from './Menu';
import './styles/HeaderBar.css'

export default function HeaderBar () {
  const [title, setTitle] = useState('Home');
  return(
    <div className='header'>
      <Menu
        menu = {[
          {title:'Activo', icon:'info', link:'/', submenu:null},
          {title:'Agregar Cuenta', icon:'add', link:'/', submenu:null},
          {title:'Agregar Gasto', icon:'attach_money', link:'/', submenu:null},
          {title:'Historial', icon:'history', link:'/', submenu:[
            {title:'Cuentas', icon:'add', link:'/'},
            {title:'Gastos', icon:'remove', link:'/'},
          ]},
        ]}
      />
      <p>{title}</p>
    </div>
  )
}