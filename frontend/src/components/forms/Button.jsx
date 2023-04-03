import './styles/Button.css'
export default function Button ({icon,title,action, type}){

  const styles = {
    regular : 'button',
    delete : 'button button-delete',
    inverted : 'button button-inverted'
  }

  return( 
    <button className={styles[type]} onClick={action}>
      <div className="button-elements">
        <span class="material-symbols-outlined">
        {icon}
        </span>
        <span> {title}</span>
      </div>
    </button>
  )
}