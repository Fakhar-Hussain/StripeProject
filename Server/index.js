const express = require("express");
const bodyParser = require("body-parser");
const stripe = require('stripe')('sk_test_51NDKmABoVTaXgprYpvPpgJVJNylsFPaicvA12EIKslT8ldOrs2vkw0xLl1Bd5c9HALfhoW1upPOmATn9NYVE8PQH00uiWloy0E')

const app = express();

app.use(bodyParser.json());

app.get("/" , (req,res) => {
    res.send("Hello World")
})

app.post('/payment', async (req, res) => {
    const {amount, currency} = req.body;  
      
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2022-11-15'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  });

app.listen(4000 , () => {
    console.log("Server Connected on Port: 4000")
})



