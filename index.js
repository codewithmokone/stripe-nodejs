require('dotenv').config()
const express = require('express');
const cors =require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());


app.post('/pay', async (req, res) => {
    try {
        const {name, amount} = req.body;
        if(!name) return res.status(400).json({message: 'Please enter a name'});
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'zar',
            automatic_payment_methods: {enabled: true},
        });
        const clientSecret = paymentIntent.client_secret;
        res.json({ message: 'Payment initiated', clientSecret })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error'})
    }
})

app.listen(PORT, () => console.log(`Sever runnig on port ${PORT}`))