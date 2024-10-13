const express = require('express');
const jwtMiddleware = require('../middlewares/auth')
const userController = require('../controllers/pacientes.controller.js');
const permission = require('../services/permissions/profissionais.permissions.services')
const router = express.Router()

router.get('/consultas/paciente/:cpf', userController.getConsultas);

router.get('/consulta/paciente/:cpf', userController.getConsultas);
router.get('/consultasAba/paciente/:cpf', userController.getConsultasAba);

router.post('/consulta/registrar', [jwtMiddleware, permission.postConsulta], userController.postConsulta);
router.post('/consultaAba/registrar', [jwtMiddleware, permission.postConsulta], userController.postConsultaAba);

module.exports = router;

