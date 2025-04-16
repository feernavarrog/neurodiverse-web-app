// src/models/categoryModel.js

const database = require('../services/database');

// ==============================
// Funciones para manejo de APP_CATEGORY
// ==============================

// Obtener todas las categorías
exports.getCategories = async () => {
    const sql = `SELECT * FROM app_category`;
    return database.executeQuery(sql);
};

// Crear una nueva categoría
exports.createCategory = async (category) => {
    const sql = `INSERT INTO app_category (category_name, category_description) VALUES (:category_name, :category_description)`;
    return database.executeQuery(sql, [category.category_name, category.category_description]);
};

// Actualizar una categoría existente
exports.updateCategory = async (category) => {
    const sql = `UPDATE app_category SET category_name = :category_name, category_description = :category_description WHERE category_id = :category_id`;
    return database.executeQuery(sql, [category.category_name, category.category_description, category.category_id]);
};

// Eliminar una categoría
exports.deleteCategory = async (categoryId) => {
    const sql = `DELETE FROM app_category WHERE category_id = :categoryId`;
    return database.executeQuery(sql, [categoryId]);
};
