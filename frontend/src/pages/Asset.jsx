import MCAR from '../assets/MCAR.png'
import ProgressBar from '../components/ProgressBar'
import Loading from '../components/Loading'
import './styles/Asset.css'
import { useEffect, useState } from 'react'
import { getFormattedDate } from '../utils/date'
export default function Asset () {

  const [data, setData] = useState({loading:true})

  useEffect(()=>{
    async function getData () {
      try{
        const data = await fetch('http://localhost:3000/assets')
        const res = await data.json()
        setData({
          name: res[0].name,
          cost: res[0].assetCost,
          type: res[0].type,
          date: res[0].purchaseDate,
          incomes: res[0].totalIncomes,
          earnings: res[0].realEarnings,
          progress: res[0].investmentRecoveryProgress,
          loading: false
        })
      }catch(e){
        setData({
          error: "error",
          loading: true
        })
      }
    }
    getData()
  },[])

  const assetPage =
  (
  <div className="content">
      <div className="card asset-page-wrapper">
          <div className="asset-page-column flex-column">
            <div className="data-tag">
              <h2>{data.name}</h2>
              <p>{data.type}</p>
              <p className='red-tag'>{
                getFormattedDate(data.date)
              }</p>
            </div>
            <img src={MCAR} className="asset-img"></img>
            <div className="info-tag">
              <span>Inversión</span> <span className="red-tag">${data.cost}</span>
            </div>
          </div>

          <div className="asset-page-column flex-column column-two">
            <div className="info-tag">
              <span>Ingresos</span> <span className="big-tag">${data.incomes}</span>
            </div>
            <div className="info-tag">
              <span>Inversión</span> <span className="big-tag">${data.earnings}</span>
            </div>
            <div className="info-tag">
              <ProgressBar progress={data.progress}></ProgressBar>
            </div>
          </div>
      </div>
  </div>
  )

  if (data.loading) {
    return <Loading></Loading>
  }
  return assetPage
}