import { useState } from 'react'
import './styles/Menu.css'

export default function Menu ({menu}) {

  console.log(menu)
  const [menuShown, setMenuShown] = useState(false)
  const [historyShown, setHistoryShown] = useState(false)

  function showMenu(){
    setMenuShown(!menuShown)
    setHistoryShown(false)
  }
  
  return(
    <div className='container'>
      <button onClick={showMenu}>
        <span class="material-symbols-outlined icon">
        menu
        </span>
      </button>
      
      <div className={'menu '+ (menuShown?'open':'closed')}>
          <ul>

            <li className='menu-element'>
              <span class="material-symbols-outlined">info</span>
              <span>Activo</span>
            </li>

            <li className='menu-element'>
              <span class="material-symbols-outlined">add</span>
              <span>Agregar Cuenta</span>
            </li>

            <li className='menu-element'>
              <span class="material-symbols-outlined">attach_money</span>
              <span>Agregar Gasto</span>
            </li>

            <li className='menu-element' onClick={()=>setHistoryShown(!historyShown)}>
              <span class="material-symbols-outlined">history</span>
              <span>Historial</span>
              <span class="material-symbols-outlined">arrow_drop_down</span>
            </li>
            <ul className={'submenu '+(historyShown?'submenu-open':'submenu-closed')}>
              <li className='menu-element'>
                <span class="material-symbols-outlined">add</span>
                <span>Cuentas</span>
              </li>
              <li className='menu-element'>
                <span class="material-symbols-outlined">remove</span>
                <span>Gastos</span>
              </li>
            </ul>

          </ul>
      </div>
    </div>
  )
}