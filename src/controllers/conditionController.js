// src/controllers/conditionController.js

const conditionModel = require('../models/conditionModel');

// ==============================
// Controlador para manejo de CONDITION (Patologías)
// ==============================

// Obtener todas las patologías
exports.getConditions = async (req, res) => {
    try {
        const conditions = await conditionModel.getConditions();
        res.json(conditions);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Crear una nueva patología
exports.createCondition = async (req, res) => {
    try {
        const condition = req.body;
        await conditionModel.createCondition(condition);
        res.json({ message: 'Patología creada correctamente.' });
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Actualizar una patología existente
exports.updateCondition = async (req, res) => {
    try {
        const condition = req.body;
        await conditionModel.updateCondition(condition);
        res.json({ message: 'Patología actualizada correctamente.' });
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Eliminar una patología
exports.deleteCondition = async (req, res) => {
    try {
        const { conditionId } = req.params;
        await conditionModel.deleteCondition(conditionId);
        res.json({ message: 'Patología eliminada correctamente.' });
    } catch (error) {
        res.json({ error: error.message });
    }
};
