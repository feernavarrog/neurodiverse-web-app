// src/models/conditionModel.js

const database = require('../services/database');

// ==============================
// Funciones para manejo de CONDITION (Patologías)
// ==============================

// Obtener todas las patologías
exports.getConditions = async () => {
    const sql = `SELECT * FROM condition`;
    return database.executeQuery(sql);
};

// Crear una nueva patología
exports.createCondition = async (condition) => {
    const sql = `INSERT INTO condition (condition_name) VALUES (:condition_name)`;
    return database.executeQuery(sql, [condition.condition_name]);
};

// Actualizar una patología existente
exports.updateCondition = async (condition) => {
    const sql = `UPDATE condition SET condition_name = :condition_name WHERE condition_id = :condition_id`;
    return database.executeQuery(sql, [condition.condition_name, condition.condition_id]);
};

// Eliminar una patología (eliminando primero su asociación)
exports.deleteCondition = async (conditionId) => {
    // Eliminar todas las referencias en user_condition antes de eliminar la patología
    const sqlDeleteReferences = `DELETE FROM user_condition WHERE condition_id = :conditionId`;
    await database.executeQuery(sqlDeleteReferences, [conditionId]);
    
    // Ahora eliminar la patología
    const sqlDeleteCondition = `DELETE FROM condition WHERE condition_id = :conditionId`;
    return database.executeQuery(sqlDeleteCondition, [conditionId]);
};
