require('dotenv').config()
const express = require('express');
const cors =require('cors');
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
console.log(process.env.STRIPE_SECRET_KEY)
// console.log(stripe);
console.log(stripe.paymentIntents)

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.json(stripe)
}) 
app.post('/pay', async (req, res) => {
    try {
        const {name} = req.body;
        if(!name) return res.status(400).json({message: 'Please enter a name'});
        const paymentIntent = await stripe.paymentIntents.create({
            amount:Math.round(1000),
            currency: 'ZAR',
            payment_method_types: ["card"],
            metadata: {name}
        });
        const clientSecret = paymentIntent.client_secret;
        res.json({ message: 'Payment initiated', clientSecret })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error'})
    }
})

app.listen(PORT, () => console.log(`Sever runnig on port ${PORT}`))