// src/models/orderModel.js

// ==============================
// Manejo de APP_ORDER
// ==============================

const database = require("../services/database");

// Obtener todas las órdenes con el RUT del usuario en lugar de user_id
exports.getOrders = async (filter) => {
    let sql = `
        SELECT 
            o.order_id, 
            o.subtotal, 
            o.shipping_address, 
            o.total, 
            o.status, 
            o.card_last_four, 
            o.user_id, 
            o.order_date, 
            o.active, 
            u.rut AS rut_user
        FROM app_order o
        JOIN app_user u ON o.user_id = u.user_id
    `;
    
    const binds = [];
    if (filter && filter.column && filter.value) {
        sql += ` WHERE ${filter.column} = :value`;
        binds.push(filter.value);
    }

    sql += ` ORDER BY o.order_id DESC`; // Agregamos orden descendente para obtener la última orden primero

    return database.executeQuery(sql, binds);
};

// Crear una nueva orden
exports.createOrder = async (order) => {
    const sql = `INSERT INTO app_order (subtotal, shipping_address, total, status, card_last_four, user_id, order_date, active)
                 VALUES (:subtotal, :shipping_address, :total, :status, :card_last_four, :user_id, SYSDATE, :active)`;
    const binds = {
        subtotal: order.subtotal,
        shipping_address: order.shipping_address,
        total: order.total,
        status: order.status,
        card_last_four: order.card_last_four,
        user_id: order.user_id,
        active: order.active
    };
    return database.executeQuery(sql, binds);
};

// Actualizar una orden
exports.updateOrder = async (order) => {
    const sql = `UPDATE app_order SET subtotal = :subtotal, shipping_address = :shipping_address, 
                 total = :total, status = :status, card_last_four = :card_last_four, user_id = :user_id, 
                 order_date = TO_DATE(:order_date, 'YYYY-MM-DD'), active = :active
                 WHERE order_id = :order_id`;
    const binds = {
        order_id: order.order_id,
        subtotal: order.subtotal,
        shipping_address: order.shipping_address,
        total: order.total,
        status: order.status,
        card_last_four: order.card_last_four,
        user_id: order.user_id,
        order_date: order.order_date,
        active: order.active
    };
    return database.executeQuery(sql, binds);
};

// Eliminar una orden
exports.deleteOrder = async (orderId) => {
    const sql = `DELETE FROM app_order WHERE order_id = :orderId`;
    return database.executeQuery(sql, [orderId]);
};

// ==============================
// Manejo de ORDER_PRODUCT
// ==============================

// Obtener productos de una orden (incluyendo todos los datos del producto y cantidad)
exports.getOrderProducts = async (orderId) => {
    const sql = `SELECT op.product_id, p.code, p.product_name, p.product_description, p.price, p.discount, p.stock, 
                        p.reference_photo, p.brand_id, b.brand_name, c.category_name, p.active, op.quantity 
                 FROM order_product op
                 JOIN product p ON op.product_id = p.product_id
                 JOIN app_category c ON p.category_id = c.category_id
                 JOIN brand b ON p.brand_id = b.brand_id
                 WHERE op.order_id = :orderId`;
    return database.executeQuery(sql, [orderId]);
};

// Asociar un producto a una orden con cantidad
exports.addProductToOrder = async (orderId, productId, quantity) => {
    const sql = `INSERT INTO order_product (order_id, product_id, quantity) VALUES (:orderId, :productId, :quantity)`;
    return database.executeQuery(sql, { orderId, productId, quantity });
};

// Eliminar un producto de una orden
exports.removeProductFromOrder = async (orderId, productId) => {
    const sql = `DELETE FROM order_product WHERE order_id = :orderId AND product_id = :productId`;
    return database.executeQuery(sql, { orderId, productId });
};
