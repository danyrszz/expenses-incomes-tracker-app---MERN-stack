
export default function Multiple ({list, placeholder, handleSelection, value}){

  function determineSelected (userValue, currentListValue) {
    if(userValue && userValue===currentListValue) return true
  }
  return(
    <div className="input-wrapper">
      <span class="material-symbols-outlined form-icon">
        arrow_drop_down
      </span>
      <select name="multiple" id="multiple" onChange={e=>handleSelection(e.target.value)}>
        <option value="" disabled selected={value?false:true}>{placeholder}</option>
        {list.map(e=>{
          return <option value={e} key={e} selected={determineSelected(value,e)} >{e}</option>
        })}
      </select>
    </div>
  )
}