// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ==============================
// Rutas para manejo de APP_USER
// ==============================

router.post('/', userController.getUsers);
router.post('/create', userController.createUser);
router.put('/update', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

// ==============================
// Rutas para manejo de USER_CONDITION
// ==============================

router.get('/check-session', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.status(401).json({ loggedIn: false });
    }
});

// Obtener todas las condiciones asociadas a un usuario
router.get('/conditions/:userId', userController.getUserConditions);

// Asignar una condición a un usuario
router.post('/conditions', userController.assignUserCondition);

// Eliminar una condición de un usuario
router.delete('/conditions', userController.removeUserCondition);

module.exports = router;
