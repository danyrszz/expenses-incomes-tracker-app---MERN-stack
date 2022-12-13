import './styles/Ribbon.css'
export default function Ribbon({ok, children}){
  return(
    <div className="modal-container">
      <div className={`ribbon ${ok?'ribbon-yes':'ribbon-no'} flex-row`}>
        <span class="material-symbols-outlined">
        {ok?'check_circle':'error'}
        </span>
        {children}
      </div>
    </div>
  )
}