import './styles/InformativeMessage.css'
export default function InformativeMessage ({message}) {
  return (
    <div className="informative-msg-wrapper flex-row">
      <span class="material-symbols-outlined">
      info
      </span>
      <span className='informative-msg-text'>
        {message}
      </span>
    </div>
  )
}
