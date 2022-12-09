import { useState } from 'react'
import Menu from './Menu';
import './styles/HeaderBar.css'

export default function HeaderBar () {
  const [title, setTitle] = useState('Home');
  return(
    <div className='header'>
      <Menu
        menu = {[
          {title:'Activo', icon:'', link:'', submenu:null},
          {title:'Agregar Cuenta', icon:'', link:'', submenu:null},
          {title:'Agregar Gasto', icon:'', link:'', submenu:null},
          {title:'Historial', icon:'', link:null, submenu:[
            {title:'Cuentas', icon:'', link:null},
            {title:'Gastos', icon:'', link:null},
          ]},
        ]}
      />
      <p>{title}</p>
    </div>
  )
}