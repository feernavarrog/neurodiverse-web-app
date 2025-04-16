// src/controllers/userController.js
const userModel = require('../models/userModel');

// ==============================
// Controlador para manejo de APP_USER
// ==============================

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.getUsers(req.body);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = { ...req.body };

        const newUser = await userModel.createUser(user);
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = { ...req.body };

        const updatedUser = await userModel.updateUser(user);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userModel.deleteUser(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ==============================
// Controlador para manejo de USER_CONDITION
// ==============================

// Obtener todas las condiciones asociadas a un usuario
exports.getUserConditions = async (req, res) => {
    try {
        const { userId } = req.params;
        const conditions = await userModel.getUserConditions(userId);
        res.json(conditions);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Asignar una condición a un usuario
exports.assignUserCondition = async (req, res) => {
    try {
        const { userId, conditionId } = req.body;
        await userModel.assignUserCondition(userId, conditionId);
        res.json({ message: 'Condición asignada correctamente.' });
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Eliminar una condición de un usuario
exports.removeUserCondition = async (req, res) => {
    try {
        const { userId, conditionId } = req.body;
        await userModel.removeUserCondition(userId, conditionId);
        res.json({ message: 'Condición eliminada correctamente.' });
    } catch (error) {
        res.json({ error: error.message });
    }
};
