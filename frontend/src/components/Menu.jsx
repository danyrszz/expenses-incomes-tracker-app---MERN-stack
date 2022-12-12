import { useState } from 'react'
import { useRef } from 'react'
import './styles/Menu.css'

export default function Menu ({menu}) {
  const [menuShown, setMenuShown] = useState(false)

  function showMenu(){
    setMenuShown(!menuShown)
  }
  
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
                    <a href={element.link} key={element.title}>
                      <li className='single-element'>
                        <div className="element-container">
                          <span class="material-symbols-outlined">{element.icon}</span>
                          <span>{element.title}</span>
                        </div>
                      </li>
                    </a>
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
                        <span class="material-symbols-outlined">{element.icon}</span>
                        <span>{element.title}</span>           
                      </div>
                      <ul className='submenu submenu-closed'>
                        {element.submenu.map((element,i)=>{
                          return(
                            <li key={element.title}>
                            <div className="element-container">
                              <span class="material-symbols-outlined">{element.icon}</span>
                              <span>{element.title}</span>
                            </div>
                            </li>
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