// Recibe un arreglo cualquiera y un límite de cuántos elementos se retornarán.
export function randomizer(arreglo,limit){
  if(limit >= 16) limit = 15
  const clon = [...arreglo]
  for(let i = clon.length - 1; i>0 ; i--){
    const j = Math.floor(Math.random() * (i+1))
    ;[clon[i], clon[j]] = [clon[j], clon[i]]
  }
  return clon.slice(0,limit)
}