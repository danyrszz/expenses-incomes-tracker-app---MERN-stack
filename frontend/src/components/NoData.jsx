import './styles/NoData.css'
export default function NoData({children}){
  return (
      <div className="no-data flex-centered">
        {children}
      </div>
  )
}