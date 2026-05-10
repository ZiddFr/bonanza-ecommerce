export function randomizer(categorias,catLimit){
  if(catLimit >= 5) return 4
  const clon = [...categorias]
  for(let i = clon.length - 1; i>0 ; i--){
    const j = Math.floor(Math.random() * (i+1))
    ;[clon[i], clon[j]] = [clon[j], clon[i]]
  }
  return clon.slice(0,catLimit)
}