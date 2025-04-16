// src/models/brandModel.js

const database = require('../services/database');

// ==============================
// Funciones para manejo de BRAND (Marcas)
// ==============================

// Obtener todas las marcas
exports.getBrands = async () => {
    const sql = `SELECT * FROM brand`;
    return database.executeQuery(sql);
};

// Crear una nueva marca
exports.createBrand = async (brand) => {
    const sql = `INSERT INTO brand (brand_name) VALUES (:brand_name)`;
    return database.executeQuery(sql, [brand.brand_name]);
};

// Actualizar una marca existente
exports.updateBrand = async (brand) => {
    const sql = `UPDATE brand SET brand_name = :brand_name WHERE brand_id = :brand_id`;
    return database.executeQuery(sql, [brand.brand_name, brand.brand_id]);
};

// Eliminar una marca
exports.deleteBrand = async (brandId) => {
    const sql = `DELETE FROM brand WHERE brand_id = :brandId`;
    return database.executeQuery(sql, [brandId]);
};
