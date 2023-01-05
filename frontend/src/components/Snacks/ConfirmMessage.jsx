import './styles/ConfirmMessage.css'

export default function ConfirmMessage({handleConfirmation, children, visible}){

  return (
    <div className={`confirm-msg-wrapper flex-centered ${visible?'confirm-msg-wrapper-opened':'confirm-msg-wrapper-closed'}`}>
      <div className="confirm-message flex-column card">
        {children}
        <div className="confirm-msg-btn-wrapper">
          <button className='confirm-msg-button confirm-msg-btn-yes' onClick={()=>handleConfirmation(true)}>Sí</button>
          <button className='confirm-msg-button confirm-msg-btn-no' onClick={()=>handleConfirmation(false)}>No</button>
        </div>
      </div>
    </div>
  )
}