import path from 'path'

import express from 'express'
import mailpkg from 'nodemailer'

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

const nodemailer = mailpkg;

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))
app.get('/api/config/contentfultoken', (req, res) => res.send(process.env.CONTENTFUL_TOKEN))
app.get('/api/config/contentfulspace', (req, res) => res.send(process.env.CONTENTFUL_SPACE))
app.get('/api/config/smtphost', (req, res) => res.send(process.env.SMTP_HOST))
app.get('/api/config/smtpport', (req, res) => res.send(process.env.SMTP_PORT))
app.get('/api/config/smtpuser', (req, res) => res.send(process.env.SMTP_USER))
app.get('/api/config/smtppassword', (req, res) => res.send(process.env.SMTP_PASSWORD))
app.get('/api/config/fromemail', (req, res) => res.send(process.env.FROM_EMAIL))
console.log(process.env.SMTP_PASSWORD)
console.log(process.env.SMTP_USER)
console.log(process.env.SMTP_PORT)

app.get("/mail", async (req, res) => {
    const mailInfo = {
        from: '"Test" <test@example.com>',
        to: "sgriesel@gmail.com",
        subject: "Test email",
        text: "Sending test email 123456",
    }
    try {
        await transporter.sendMail(mailInfo)
        res.send("email sent")
    } catch (e) {
        res.status(500).send("Something broke!")
    }
})

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