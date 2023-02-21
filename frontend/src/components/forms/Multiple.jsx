
export default function Multiple ({list, placeholder, handleSelection}){

  return(
    <div className="input-wrapper">
      <span class="material-symbols-outlined form-icon">
        arrow_drop_down
      </span>
      <select name="multiple" id="multiple" onChange={e=>handleSelection(e.target.value)}>
        <option value="" disabled selected>{placeholder}</option>
        {list.map(e=>{
          return <option value={e} key={e}>{e}</option>
        })}
      </select>
    </div>
  )
}