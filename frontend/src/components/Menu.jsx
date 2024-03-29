import { useState } from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import './styles/Menu.css'
import useActiveModal from '../components/Snacks/useActiveModal'

export default function Menu ({menu}) {

  const [menuShown, setMenuShown] = useState(false)
  useActiveModal(menuShown)

  const showMenu = () =>setMenuShown(!menuShown)
  
  return(
    <div className='button-container'>
      <button onClick={showMenu}>
        <span className="material-symbols-outlined icon">
        menu
        </span>
      </button>

      <div className={"menu-wrapper " +(menuShown?'menu-wrapper-opened':'menu-wrapper-closed')} >
        <div className='themenu'>
          <ul>
            {
              menu.map((element,i)=>{
                if(element.submenu === null){
                  return(
                    <Link to={element.link} key={element.title} onClick={()=>setMenuShown(!menuShown)}>
                      <li className='single-element'>
                        <div className="element-container">
                          <span className="material-symbols-outlined">{element.icon}</span>
                          <span>{element.title}</span>
                        </div>
                      </li>
                    </Link>
                  )
                }else{
                  i = useRef()
                  return(
                    <li className='submenu-parent' ref={i} onClick={()=>{
                      if(i.current.children[1].className == "submenu submenu-closed"){
                        i.current.children[1].className = "submenu submenu-open"
                        return
                      }
                      if(i.current.children[1].className == "submenu submenu-open"){
                        i.current.children[1].className = "submenu submenu-closed"
                        return
                      }
                    }} key={element.title}>
                      <div className="element-container">
                        <span className="material-symbols-outlined">{element.icon}</span>
                        <span>{element.title}</span>           
                      </div>
                      <ul className='submenu submenu-closed'>
                        {element.submenu.map((submenu,i)=>{
                          return(
                            <Link to={submenu.link} key={submenu.title} onClick={()=>setMenuShown(!menuShown)}>
                            <li >
                            <div className="element-container">
                              <span className="material-symbols-outlined">{submenu.icon}</span>
                              <span>{submenu.title}</span>
                            </div>
                            </li>
                            </Link>
                          )
                        })}
                      </ul>
                    </li>
                  )
                }
              })
            }
          </ul>
        </div>
        <div className="rest" onClick={showMenu}>
        </div>
      </div>
    </div>
  )
}