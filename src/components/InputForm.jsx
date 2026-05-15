export function InputForm({inputType,name,inputId,focused,textPlaceholder,readOnly,onChange,onClick,value,defaultChecked}){
  return(
    <>
      <div className="form__input-group">
        <input type={inputType} className="form__input" name={name} readOnly={readOnly} id={inputId} autoFocus={focused} placeholder={textPlaceholder} onChange={onChange} value={value} onClick={onClick} defaultChecked={defaultChecked} />
        <div className="form__input-error-message"></div>
      </div>
    </>
  )
}