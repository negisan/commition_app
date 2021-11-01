const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// route
router.post('/create-payment-intent', createPaymentIntent)

module.exports = router

async function createPaymentIntent(req, res, next) {
  try {
    const { order } = req.body
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.order_price,
      currency: 'jpy',
    })

    res.status(200).send(paymentIntent.client_secret)
  } catch (err) {
    res.status(500).json({statusCode: 500, message: err.message})
  }
}
