// src/controllers/brandController.js

const brandModel = require('../models/brandModel');

// ==============================
// Controlador para manejo de BRAND (Marcas)
// ==============================

// Obtener todas las marcas
exports.getBrands = async (req, res) => {
    try {
        const brands = await brandModel.getBrands();
        res.json(brands);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Crear una nueva marca
exports.createBrand = async (req, res) => {
    try {
        const brand = req.body;
        await brandModel.createBrand(brand);
        res.json({ message: 'Marca creada correctamente.' });
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Actualizar una marca existente
exports.updateBrand = async (req, res) => {
    try {
        const brand = req.body;
        await brandModel.updateBrand(brand);
        res.json({ message: 'Marca actualizada correctamente.' });
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Eliminar una marca
exports.deleteBrand = async (req, res) => {
    try {
        const { brandId } = req.params;
        await brandModel.deleteBrand(brandId);
        res.json({ message: 'Marca eliminada correctamente.' });
    } catch (error) {
        res.json({ error: error.message });
    }
};
