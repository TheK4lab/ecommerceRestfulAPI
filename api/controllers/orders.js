const Order = require("../models/order");

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    console.log(orders);
    res.status(200).json({
      message: "Orders were fetched",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.postOrders = async (req, res, next) => {
  try {
    const order = new Order({
      quantity: req.body.quantity,
      product: req.body.productId,
    });
    console.log(order);
    await order.save();
    res.status(201).json({
      message: "Order was created",
      order,
    });
  } catch (error) {
    console.log(error);
    res.statuts(500).json({ error });
  }
};

exports.getSingleOrder = async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const order = await Order.findById(id);
    if (!order) {
      console.log("UNABLE TO FIND THE ORDER!");
      return res.status(400).json({ message: "UNABLE TO FIND THE ORDER!" });
    }
    console.log("ORDER FOUNDED", order);
    res.status(201).json({
      message: "Order founded",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      console.log("UNABLE TO FIND THE ORDER!");
      return res.status(400).json({ message: "UNABLE TO FIND THE ORDER!" });
    }
    console.log("ORDER DELETED", order);
    res.status(201).json({
      message: "Order deleted",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
