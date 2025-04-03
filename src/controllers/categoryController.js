// src/controllers/categoryController.js

const categoryModel = require('../models/categoryModel');

// ==============================
// Controlador para manejo de APP_CATEGORY
// ==============================

// Obtener todas las categorías
exports.getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.getCategories();
        res.json(categories);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Crear una nueva categoría
exports.createCategory = async (req, res) => {
    try {
        const category = req.body;
        await categoryModel.createCategory(category);
        res.json({ message: 'Categoría creada correctamente.' });
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Actualizar una categoría existente
exports.updateCategory = async (req, res) => {
    try {
        const category = req.body;
        await categoryModel.updateCategory(category);
        res.json({ message: 'Categoría actualizada correctamente.' });
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Eliminar una categoría
exports.deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        await categoryModel.deleteCategory(categoryId);
        res.json({ message: 'Categoría eliminada correctamente.' });
    } catch (error) {
        res.json({ error: error.message });
    }
};
