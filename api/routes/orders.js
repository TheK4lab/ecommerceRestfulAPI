const express = require("express");

const router = express.Router();

const orderController = require('../controllers/orders');

const checkAuth = require('../middleware/check-auth');

router.get("/", checkAuth, orderController.getOrders);

router.post("/", checkAuth, orderController.postOrders);

router.get("/:orderId", checkAuth, orderController.getSingleOrder);

router.delete("/:orderId", checkAuth, orderController.deleteOrder);

module.exports = router;
