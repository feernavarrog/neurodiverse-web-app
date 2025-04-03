// src/controllers/productController.js

const productModel = require('../models/productModel');
const database = require('./../services/database');

// ==============================
// Controlador para manejo de PRODUCT (Productos)
// ==============================

// Obtener todos los productos con filtro opcional
exports.getProducts = async (req, res) => {
    try {
        const filter = req.body;
        const products = await productModel.getProducts(filter);
        res.json(products);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const product = req.body;
        await productModel.createProduct(product);
        res.json({ message: 'Producto creado correctamente.' });
    } catch (error) {
        if (error.message.includes('ORA-00001')) {
            return res.status(400).json({ error: 'El código del producto ya existe.' });
        }
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un producto existente
exports.updateProduct = async (req, res) => {
    try {
        const product = req.body;
        await productModel.updateProduct(product);
        res.json({ message: 'Producto actualizado correctamente.' });
    } catch (error) {
        if (error.message.includes('ORA-00001')) {
            return res.status(400).json({ error: 'El código del producto ya existe.' });
        }
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        await productModel.deleteProduct(productId);
        res.json({ message: 'Producto eliminado correctamente.' });
    } catch (error) {
        res.json({ error: error.message });
    }
};

exports.applyDiscountByCategory = async (req, res) => {
    try {
        const { category, discount } = req.body;

        // Validar que se enviaron los datos necesarios
        if (!category || isNaN(discount) || discount < 0 || discount > 100) {
            return res.status(400).json({ error: "Datos inválidos. Verifique la categoría y el descuento." });
        }

        // Ejecutar el procedimiento almacenado en la base de datos
        const sql = `CALL apply_discount_by_category(:category_id, :discount_value)`;
        const binds = { category_id: category, discount_value: discount };

        await database.executeQuery(sql, binds);

        res.json({ message: "Descuento aplicado correctamente." });
    } catch (error) {
        console.error("Error aplicando descuento:", error);
        res.status(500).json({ error: error.message });
    }
};
