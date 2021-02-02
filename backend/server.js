import path from 'path'

import express from 'express'
import sgMail from '@sendgrid/mail'

import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleWare.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))
app.get('/api/config/contentfultoken', (req, res) => res.send(process.env.CONTENTFUL_TOKEN))
app.get('/api/config/contentfulspace', (req, res) => res.send(process.env.CONTENTFUL_SPACE))
app.get('/api/config/sendgrid', (req, res) => res.send(process.env.SENDGRID_API_KEY))

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// console.log("test sendgrid header", sgMail)

const msg = {
    to: 'demorecipient@consulitate.com', // Change to your recipient
    from: 'demo@consulitate.com', // Change to your verified sender
    subject: 'Sendgrid Test',
    text: 'yes this is working in plain text',
    html: '<strong>and in HTML</strong>',
}

// disabled for now so free limit not reached, to activate just uncomment the msg object & help libary's send method below

// sgMail
//     .send(msg)
//     .then(() => {
//         console.log('Email sent')
//     })
//     .catch((error) => {
//         console.error(error)
//     })

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('API is running');
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Running on port ${PORT} in ${process.env.NODE_ENV} mode`.yellow.bold));