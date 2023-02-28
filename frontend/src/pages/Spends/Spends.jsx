import useGetLastSpends from '../Home/useGetLastSpends'
import './styles/Spends.css'
import {getFormattedDate} from '../../utils/date'
import { useNavigate } from 'react-router-dom'

export default function Spends () {
  const spends = useGetLastSpends(10)
  const navigate = useNavigate()
  return (
    <table className='spends-table'>
      <tr>
        <th>Nombre</th>
        <th>Descripcion</th>
        <th>Categoria</th>
        <th>Cantidad</th>
        <th>Fecha</th>
      </tr>
      {
        spends.lastSpends.map(e=>{
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
  )
}