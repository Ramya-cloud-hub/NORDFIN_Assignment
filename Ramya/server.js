const express = require('express');
const app = express();
const port = 9000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const {getDeliveryDates} = require("./delivery-calculator");


app.post('/order', function (req, res) {
  //get posted data from frontend
  const {postalCode, products} = req.body;
  try {
    getDeliveryDates(postalCode, products)
    .then( results => res.json(results).send());     
  } catch (error) {
    res.statusCode(500).send()
  }

});


app.listen(port, () =>{
  console.log("listening to port : ", port)
});