// src/routes/conditionRoutes.js

const express = require('express');
const router = express.Router();
const conditionController = require('../controllers/conditionController');

// ==============================
// Rutas para manejo de CONDITION (Patologías)
// ==============================

// Obtener todas las patologías
router.get('/', conditionController.getConditions);

// Crear una nueva patología
router.post('/create', conditionController.createCondition);

// Actualizar una patología existente
router.put('/update', conditionController.updateCondition);

// Eliminar una patología
router.delete('/delete/:conditionId', conditionController.deleteCondition);

module.exports = router;
