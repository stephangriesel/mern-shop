import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import sgMail from '@sendgrid/mail'

// @description     Create new order
// @route           POST /api/orders
// @access          Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body
    console.log("add order items test", req.body)

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save()

        // send: start transactional mail >>>

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        // console.log("test sendgrid header", sgMail)

        const msg = {
            to: 'demorecipient@consulitate.com', // Change to your recipient
            from: 'demo@consulitate.com', // Change to your verified sender
            subject: 'Product Order Sendgrid Test',
            text: 'yes this is working in plain text',
            html: `<strong>TEST</strong>`,
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

        // <<< send:end transactional mail 

        res.status(201).json(createdOrder)
    }
})

// @description     Get order by ID
// @route           GET /api/orders/:id
// @access          Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)

    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @description     Update order to paid
// @route           GET /api/orders/:id/pay
// @access          Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            // Review for other payment gateways

            // Paypal:
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)

    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @description     Update order to delivered
// @route           GET /api/orders/:id/deliver
// @access          Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)

    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @description     Get logged in user orders
// @route           GET /api/orders/myorders
// @access          Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

// @description     Get all orders
// @route           GET /api/orders/myorders
// @access          Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id, name')
    res.json(orders)
})

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders
}