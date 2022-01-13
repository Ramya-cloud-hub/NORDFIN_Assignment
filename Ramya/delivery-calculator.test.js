const {getDeliveryDate} = require("./delivery-calculator")

const product1 = {
  productId : 1,
  name : "crisp",
  deliveryDays : [1, 5],
  productType : "normal",
  daysInAdvance : 10
}

describe("getDeliveryDate", ()=>{
  test("days in advance", ()=>{

    const orderDate = new Date((new Date()).setHours(0,0,0,0))
    const delvaryDates = getProductDeliveryDates(orderDate, product1);

    // expect(delvaryDates).toContain(expected)
    expect(delvaryDates.length).toBe(1)
  })
})


// {
//   postalCode,
//   [
//     { productId : 1, name : "crisp", deliveryDays : [1, 5], productType : "normal", daysInAdvance : 10 }
//   ]
// }