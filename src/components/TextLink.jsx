export function TextLink({linkTo,linkId,textInsideLink, onClick}){
  return(
    <>
      <p className="form__text">
        <a href={linkTo} id={linkId} className="form__link" rel="noopener noreferrer" onClick={onClick}>{textInsideLink}</a>
      </p>
    </>
  )
}