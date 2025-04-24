const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Ruta para obtener el informe de condiciones clínicas
router.get('/conditions', reportController.getReportConditions);

module.exports = router;

router.get('/conditions/view', (req, res) => {res.render('report_conditions');});