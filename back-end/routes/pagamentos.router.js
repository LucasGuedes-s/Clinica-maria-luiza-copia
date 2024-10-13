const express = require('express');
const jwtMiddleware = require('../middlewares/auth')
const userController = require('../controllers/pagamentos.controller.js');
const permission = require('../services/permissions/profissionais.permissions.services')
const router = express.Router()
router.post('/registrar/pagamentos', [jwtMiddleware, permission.post], userController.postPagamentos);
router.post('/alterar/pagamento', [jwtMiddleware, permission.post], userController.updatePagamento);
router.get('/pagamentos', [jwtMiddleware, permission.get], userController.getPagamentos);

module.exports = router;