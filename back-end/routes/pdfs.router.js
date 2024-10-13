const express = require('express');
const jwtMiddleware = require('../middlewares/auth')
const pdfController = require('../controllers/pdfs.controller.js');
const permission = require('../services/permissions/profissionais.permissions.services')
const router = express.Router()

router.get('/historico/consultas/:id', pdfController.getpdfConsultas);
router.post('/historico/consultas', pdfController.getpdfConsultasAba);

router.get('/pdf/consulta/:id', pdfController.getpdfConsulta);
router.get('/pdf/consultaAba/:cpf', pdfController.getpdfConsultasAba);
router.post('/pdf/pagamentos', pdfController.getpdfPagamento);

module.exports = router;