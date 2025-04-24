// src/controllers/orderController.js

const orderModel = require("../models/orderModel");

// ==============================
// Manejo de APP_ORDER
// ==============================

// Obtener todas las órdenes con filtro opcional
exports.getOrders = async (req, res) => {
    try {
        const filter = req.body;
        const orders = await orderModel.getOrders(filter);
        res.json(orders);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Crear una nueva orden
exports.createOrder = async (req, res) => {
    try {
        const order = req.body;
        await orderModel.createOrder(order);
        res.json({ message: 'Orden creada correctamente.' });
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Actualizar una orden existente
exports.updateOrder = async (req, res) => {
    try {
        const order = req.body;
        await orderModel.updateOrder(order);
        res.json({ message: 'Orden actualizada correctamente.' });
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Eliminar una orden
exports.deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        await orderModel.deleteOrder(orderId);
        res.json({ message: 'Orden eliminada correctamente.' });
    } catch (error) {
        res.json({ error: error.message });
    }
};

// ==============================
// Manejo de ORDER_PRODUCT
// ==============================

// Obtener productos de una orden
exports.getOrderProducts = async (req, res) => {
    try {
        const { orderId } = req.params;
        const products = await orderModel.getOrderProducts(orderId);
        res.json(products);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Asociar un producto a una orden
exports.addProductToOrder = async (req, res) => {
    try {
        const { orderId, productId, quantity } = req.body;
        await orderModel.addProductToOrder(orderId, productId, quantity);
        res.json({ message: 'Producto agregado a la orden correctamente.' });
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Eliminar un producto de una orden
exports.removeProductFromOrder = async (req, res) => {
    try {
        const { orderId, productId } = req.body;
        await orderModel.removeProductFromOrder(orderId, productId);
        res.json({ message: 'Producto eliminado de la orden correctamente.' });
    } catch (error) {
        res.json({ error: error.message });
    }
};