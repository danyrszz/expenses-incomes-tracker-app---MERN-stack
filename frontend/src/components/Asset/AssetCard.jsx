import './AssetCard.css'
export default function AssetCard(props){
  return(
    <div className="card">
    {props.children}
    </div>
  )
}