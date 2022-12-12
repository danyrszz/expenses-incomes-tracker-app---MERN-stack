import './BillCard.css'

export default function BillCard({amount,date}){
  const d = new Date(date)
  d.setMinutes(d.getMinutes() + d.getTimezoneOffset())
  console.log(d.getDate())

  function handleEdit(){}
  function handleDelete(){}
  
  return(
    <div className="card flex-column">
      <div className="flex-column card-block-container">
        <span className='card-amount-label'>$1500</span>
        <span className='card-date-label'>10 diciembre 2022</span>
      </div>
      <div className="flex-row card-button-container">
        <button className="card-button edit-button">
          <span class="material-symbols-outlined">
            edit
          </span>        
        </button>
        <button className="card-button delete-button">
          <span class="material-symbols-outlined">
            delete
          </span>
        </button>
      </div>
    </div>
  )
}