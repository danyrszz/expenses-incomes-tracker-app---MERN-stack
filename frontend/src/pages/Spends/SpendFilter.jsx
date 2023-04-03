
import "./styles/SpendFilter.css"

export default function SpendFilter ({children, visible, changeVisible}){

  return(
    <>
      <div className="filter-bar-container">
        <span onClick={changeVisible} className={'filter-toggle-button ' + (visible&&'filter-toggle-button-selected') }>
          { !visible ? 'Abrir filtro' : 'Cerrar filtro'}
        </span>
      </div>

      <div className={'filter-container ' + (!visible&&'filter-closed') }>
        <p> Filtrar todos los gastos por:</p>
        {children}
      </div>
    </>
  )
}