// src/routes/orderRoutes.js

const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// ==============================
// Manejo de APP_ORDER
// ==============================

// Obtener todas las órdenes con filtro opcional
router.post("/", orderController.getOrders);

// Crear una nueva orden
router.post("/create", orderController.createOrder);

// Actualizar una orden existente
router.put("/update", orderController.updateOrder);

// Eliminar una orden
router.delete("/delete/:orderId", orderController.deleteOrder);

// ==============================
// Manejo de ORDER_PRODUCT
// ==============================

// Obtener productos de una orden
router.get("/:orderId/products", orderController.getOrderProducts);

// Agregar un producto a una orden con cantidad
router.post("/add-product", orderController.addProductToOrder);

// Eliminar un producto de una orden
router.delete("/remove-product", orderController.removeProductFromOrder);

module.exports = router;

