import useGetAssets from './useGetAssets'
import MCAR from '../../assets/MCAR.png'
import ProgressBar from '../../components/ProgressBar'
import Loading from '../../components/Loading'
import './Asset.css'
import { getFormattedDate } from '../../utils/date'

export default function Asset () {


  const [data] = useGetAssets()
  const assetPage =
  (
  <div className="flex-centered">
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
              <span>Ganancias</span> <span className="big-tag">${data.earnings}</span>
            </div>
            <div className="info-tag">
              <ProgressBar progress={data.progress}></ProgressBar>
            </div>
          </div>
      </div>
  </div>
  )

  if (data.loading) return <Loading></Loading>
  return assetPage
}