// src/routes/brandRoutes.js

const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

// ==============================
// Rutas para manejo de BRAND (Marcas)
// ==============================

// Obtener todas las marcas
router.get('/', brandController.getBrands);

// Crear una nueva marca
router.post('/create', brandController.createBrand);

// Actualizar una marca existente
router.put('/update', brandController.updateBrand);

// Eliminar una marca
router.delete('/delete/:brandId', brandController.deleteBrand);

module.exports = router;