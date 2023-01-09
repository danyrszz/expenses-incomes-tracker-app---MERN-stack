import './BillCard.css'
import { getFormattedDate } from '../../utils/date'

export default function BillCard({ amount, date, selectBillToDelete}){

  const formattedDate = getFormattedDate(date)

  function handleEdit(){
    console.log("edit")
  }

  return(
    <div className="card billcard-wrapper">

      <div className="flex-column card-block-container">
        <span className='card-amount-label'>${amount}</span>
        <span className='card-date-label'>{formattedDate}</span>
      </div>
      <div className="card-button-container">
        <button className="card-button edit-button" onClick={handleEdit}>
          <span class="material-symbols-outlined">
            edit
          </span>        
        </button>
        <button className="card-button delete-button" onClick={selectBillToDelete}>
          <span class="material-symbols-outlined">
            delete
          </span>
        </button>
      </div>
    </div>
  )
}