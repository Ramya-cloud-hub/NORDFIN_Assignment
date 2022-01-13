const DELIVERY_PERIOD = 14;
const EXTERNAL_DELAY = 5;


async function getDeliveryDates(postalCode, products){
  const orderDate = new Date((new Date()).setHours(0,0,0,0))
  const results = [];
  for(let i=0; i < products.length; i++){
    
    results.push(getProductDeliveryDates(orderDate, products[i]));
  }

  return results
  .flatMap(dates => dates)
  .sort((a,b)=>a-b)
  .map(delivaryDate => { return {postalCode, delivaryDate}})

}


function getProductDeliveryDates(orderDate, product){
  // delivery day logic
  const allDays = deliveryDays(orderDate)


  if(product.productType == "temporary"){
    const endOfWeekIndex = allDays.findIndex(date => date.getDay() === 0)
    allDays.splice(endOfWeekIndex, allDays.length - endOfWeekIndex)
  }

  // advance days logic
  const daysInAdvance = product.productType == "external"
  ? product.daysInAdvance  + EXTERNAL_DELAY
  : product.daysInAdvance

  //remove advance days
  allDays.splice(0,daysInAdvance)
  let possibleDays = allDays.filter(date => product.deliveryDays.includes(date.getDay()))
  return possibleDays;
}

//generate date
function deliveryDays(orderDate){
  let days = []
  for (let i = 0; i < DELIVERY_PERIOD; i++){
    const tempDate = new Date(orderDate)
    tempDate.setHours(1,0,0,0);
    days.push(new Date(tempDate.setDate(tempDate.getDate() + i)))
  }
  return days
}

module.exports = {getProductDeliveryDates, getDeliveryDates}