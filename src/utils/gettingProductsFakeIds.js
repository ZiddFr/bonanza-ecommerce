function randomNumber(max) {
  return Math.floor(Math.random() * max);
}
export const gettingProductsFakeIds = (ids,limit)=>{
  let idsInOffer = []
  for(let i=0;i<ids.length;i++){
    let ranNum = randomNumber(ids.length)
    if(!idsInOffer.includes(ranNum)){
      idsInOffer.push(ids[ranNum])
    } else {
      i--
    }
    if(limit == idsInOffer.length){
      break
    }
  }
  return idsInOffer
}