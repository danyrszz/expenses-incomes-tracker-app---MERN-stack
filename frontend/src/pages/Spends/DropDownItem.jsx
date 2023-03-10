import { useState, useRef, useEffect } from 'react'
import './styles/DropDownItem.css'
import { getFormattedDate } from '../../utils/date'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/forms/Button'

export default function DropDownItem ({data}) {

  const [visible, setVisible] = useState(false)
  const body = useRef(null)
  const navigate = useNavigate()
  const width = window.innerWidth

  useEffect(()=>{
    if(visible && width>500){
      body.current.style.height = '150px'
    }
    if(visible && width<670){
      body.current.style.height = '320px'
    }
    if(!visible){
      body.current.style.height = 0
    }
  },[visible])

  return(
    <div className="dropdown-wrapper">
      <div className="dropdown-item-head">
        {/* head */}
        <div className='dropdown-head flex-centered'>
            <div>{data.name}</div>
            <div>${data.amount}</div>
            <div className='dropdown-icon flex-centered' onClick={()=>navigate(`/addspend/${data._id}`)}>
              <span class="material-symbols-outlined">edit</span>
            </div>
            <div className='dropdown-icon flex-centered' onClick={()=>setVisible(!visible)}>
              <span class="material-symbols-outlined">{!visible?'expand_more':'expand_less'}</span>
            </div>
          </div>
      </div>
      
      <div className="dropdown-item-body" ref={body}>
        {/* body */}
        <div className="dropdown-body">
          <div>Descripción</div>
          <div>{data.description}</div>
          <div>Categoría</div>
          <div>{data.category}</div>
          <div>Fecha</div>
          <div>{getFormattedDate(data.date)}</div>
          <section className="dropdown-edit-button">
            <Button icon='edit' title='Editar' action={()=>navigate(`/addspend/${data._id}`)}/>
          </section>
        </div>
      </div>
    </div>
  )
}