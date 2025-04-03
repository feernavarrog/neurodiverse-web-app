// src/routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// ==============================
// Rutas para manejo de APP_CATEGORY
// ==============================

// Obtener todas las categorías
router.get('/', categoryController.getCategories);

// Crear una nueva categoría
router.post('/create', categoryController.createCategory);

// Actualizar una categoría existente
router.put('/update', categoryController.updateCategory);

// Eliminar una categoría
router.delete('/delete/:categoryId', categoryController.deleteCategory);

module.exports = router;
