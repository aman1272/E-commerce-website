const Order = require('../models/order');
const Product = require('../models/product');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

/**
 * Create new order  => /api/v1/order/new
 */
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    });

    res.status(201).json({
        success: true,
        order
    })
});

/**
 * Get Single order  =>  /api/v1/order/:id
 */
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", 'name, email')
    if (!order) {
        return next(new ErrorHandler(`No order found with this Id: ${req.params.id}`, 404))
    }
    res.status(200).json({
        success: true,
        order
    })
});

/**
 * Get Logged in user orders  =>  /api/v1/orders/me
 */

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        orders
    })
})

/**
 * Admin Routes-Get All orders   =>   /api/v1/admin/orders
 */
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
});

/**
 * Admin Routes-Update/Proces order   =>   /api/v1/admin/order/:id
 */
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`No order found with this Id: ${req.params.id}`, 404))
    };
    if (order.orderStatus === 'Dilivered') {
        return next(new ErrorHandler("You have already delivered this order"));
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    });
    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();
    await order.save()
    res.status(200).json({
        success: true
    })
});

//Update product stock
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false });
}

/**
 * Admin routes-Delete order   =>  /api/v1/admin/order/:id
 */

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler(`No order found with this Id: ${req.params.id}`, 404))
    };
    await order.remove();
    res.status(200).json({
        success: true
    })
})