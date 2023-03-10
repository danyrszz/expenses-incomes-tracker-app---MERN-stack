import './styles/SpendsTable.css'
import {getFormattedDate} from '../../utils/date'
import { useNavigate } from 'react-router-dom'

export default function Table(data){
  const navigate = useNavigate()
  const spends = data.spends.lastSpends
  return (
    <div className="spends-table-wrapper">
      <table className='spends-table'>
        <tr>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Categoria</th>
          <th>Cantidad</th>
          <th>Fecha</th>
        </tr>
        {
          spends.map(e=>{
            return (
            <tr key={e._id} onClick={()=>navigate(`/addspend/${e._id}`)}>
              <td>{e.name}</td>
              <td>{e.description}</td>
              <td>{e.category}</td>
              <td className='spends-table-quantity'>${e.amount}</td>
              <td>{getFormattedDate(e.date)}</td>
            </tr>)
          })
        }
      </table>
    </div>
  )
}