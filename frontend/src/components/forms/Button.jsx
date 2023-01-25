import './styles/Button.css'
export default function Button ({icon,title,action}){

  return(
    <button className="button" onClick={action}>
      <div className="button-elements">
        <span class="material-symbols-outlined">
        {icon}
        </span>
        <span> {title}</span>
      </div>
    </button>
  )
}