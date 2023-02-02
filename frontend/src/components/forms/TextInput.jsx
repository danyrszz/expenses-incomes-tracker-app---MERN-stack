import './styles/TextInput.css'
export default function TextInput ({placeholder,name,icon, value, changeVal}){

  return(
    <div className="input-wrapper">

      <span class="material-symbols-outlined form-icon">
        {icon}
      </span>

      <input 
        name={name}
        placeholder={placeholder} 
        className='input-styled' 
        value={value}
        onChange={(e)=>changeVal(e.target.value)}
        />
    </div>
  )
}