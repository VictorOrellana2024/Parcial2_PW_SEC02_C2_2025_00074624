const express = require('express');
const router = express.Router();
const controller = require('../controllers/cuentasController');

// Lista todas las cuentas
router.get('/cuentas', controller.listarCuentas);

// Obtiene una cuenta por ID
router.get('/cuenta/:id', controller.obtenerCuentaPorId);

// Calcula balance total de cuentas activas
router.get('/cuentasBalance', controller.obtenerBalanceTotal);

module.exports = router;
