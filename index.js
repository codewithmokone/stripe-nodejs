require('dotenv').config()
const express = require('express');
const cors =require('cors');
const stripe = require('stripe')('sk_test_51NxnC4BeSY6ufzumzretfIa7suqhZY4hk8nU7t3ntDvbAdswsUuHWQ75IfauAITSNKLVIDqnsmkE7quZxFLXhXgk00ht2ozEUb');
// const stripe = Stripe()

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.post('/pay', async (req, res) => {
    try {
        // const {name} = req.body;
        // if(!name) return res.status(400).json({message: 'Please enter a name'});
        const paymentIntent = await stripe.paymentIntents.create({
            amount:1000,
            currency: 'zar',
            payment_method_types: ["card"],
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