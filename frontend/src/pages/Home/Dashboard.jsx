import './Dashboard.css'
import useGetAssets from '../Assets/useGetAssets'
import useGetLastBills from './useGetLastBills'
import useGetLastSpends from './useGetLastSpends'
import { getDashedShortDate } from '../../utils/date'
import reduceTo from '../../utils/misc'

export default function Dashboard(){

  const [data] = useGetAssets()
  const {lastBills} = useGetLastBills(5)
  const {lastSpends} = useGetLastSpends(5)

  return (
    <div className="flex-centered">
      <div className="dashboard-grid-container">

        <div className='dashboard-asset-overview'>
          <div className="card card-height-complete flex-row">
            <div className="asset-name-percent dashboard-asset-block flex-centered flex-column">
              <p className='dashboard-progress flex-centered dashboard-text-enormous dashboard-text-bold'>{Math.round(data.progress)} %</p>
              <p className='investment-title'>Recuperación de la inversión</p>
              <p className='dashboard-name flex-centered dashboard-text-small'>{data.name}</p>
            </div>
            <div className="asset-money dashboard-asset-block flex-centered">
              <span className='dashboard-text-title dashboard-text-green '>$ {data.incomes}</span>
            </div>
          </div>
        </div>

        <div className='card card-details card-height-complete dashboard-bills-overview flex-column'>
          <div className="detailed-info-row detailed-info-bordered flex-centered dashboard-text-bold dashboard-text-small">
            Últimas Cuentas
          </div>
          {
            lastBills.map(e=>{
              return (
                <div className="detailed-info-row flex-centered dashboard-text-small mobile-bills-info-row">
                  <span className='dashboard-text-red dashboard-text-bold'> {getDashedShortDate(e.date)} </span>
                  <span className='dashboard-text-green dashboard-text-bold'> $ {e.amount} </span>
                </div>
                )
            })
          }
        </div>

        <div className='card card-details card-height-complete dashboard-bills-overview flex-column'>
          <div className="detailed-info-row detailed-info-bordered  flex-centered  dashboard-text-bold dashboard-text-small">
            Últimos Gastos
          </div>

          {
            lastSpends.map(e=>{
              return (
                <div className="detailed-info-row flex-centered dashboard-text-small" key={e._id} >
                  <span className='dashboard-text-red dashboard-text-bold'> {getDashedShortDate(e.date)} </span>
                  <span className=' dashboard-text-bold dashboard-text-mini'> {reduceTo(e.name,15)} </span>
                  <span className='dashboard-text-red dashboard-text-bold'> - $ {e.amount} </span>
                </div>
                )
            })
          }

        </div>

      </div>
    </div>
  )
}