

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());


// Routes


const stripe = require('stripe')('sk_test_51QEIiGCRwZ65hD9OQXlpO0fVv30YNMnibAFUlVJXogAgAHVRpMhP9CToRmo3WMLfA3uDyaZwZ2RbBLaWFVZIVlbQ00eNaXpQPq');
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.
app.get('/pubkey', async(req, res) => {
    res.json({key:"pk_test_51QEIiGCRwZ65hD9Onm8DbIIWq0L7dU4nY9tA2UiGz02kkFEVQC8QxGdYUHXKvurk1uApOjCYZtIFrSBUt1cMV8DH00XzShCn9k"})

})


app.post('/payment-sheet', async (req, res) => {
  const total=req.body.total;
  console.log(total);
  console.log("HIT")
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2024-09-30.acacia'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    
    // amount: 45000,
    amount: parseInt(total),
    currency: 'pkr',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });
  console.log({paymentIntent});
// console.log(paymentIntent+ephemeralKey+customer);


  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51QEIiGCRwZ65hD9Onm8DbIIWq0L7dU4nY9tA2UiGz02kkFEVQC8QxGdYUHXKvurk1uApOjCYZtIFrSBUt1cMV8DH00XzShCn9k'
  });
});




app.listen(3000, () => {
 
  console.log('Listening on http://localhost:3000');
});



